const Note = require("../models/Note");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

exports.createNote = async (req, res, next) => {
  const text = req.body.text;
  const name = req.body.name;

  try {
    const id = req.user.id;

    const note = await Note.create({
      title_: name,
      blocks: text,
      user_id: id,
    });

    if (!note) {
      return next(
        new ErrorResponse("Unable to create a note at this time", 401)
      );
    }

    await User.updateOne(
      {
        _id: id,
      },
      {
        $push: {
          notes: note._id,
        },
      }
    );

    res.status(200).json({
      success: true,
      data: note,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllNotes = async (req, res, next) => {
  const id = req.user.id;

  try {
    const user = await User.findById({
      _id: id,
    });

    if (!user) {
      return next(new ErrorResponse("This account does not exist", 401));
    }

    const notesArr = [];

    for (let a in user.notes) {
      try {
        const currentNote = await Note.findById({
          _id: user.notes[a],
          user_id: id,
        });

        if (!currentNote) {
          continue;
        }

        notesArr.push(currentNote);
      } catch (error) {
        continue;
      }
    }

    res.status(200).json({
      success: true,
      data: notesArr,
    });
  } catch (error) {
    next(error);
  }
};

exports.getNoteById = async (req, res, next) => {
  const note_id = req.body.note_id;
  const id = req.user.id;

  try {
    const payload = await Note.findById({
      _id: note_id,
      user_id: id,
    });

    if (!payload || id != payload.user_id) {
      return next(
        new ErrorResponse("Could not find the note with this ID", 401)
      );
    }

    res.status(200).json({
      success: true,
      data: payload,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateNote = async (req, res, next) => {
  const text = req.body.text;
  const name = req.body.name;
  const note_id = req.body.note_id;

  try {
    const id = req.user.id;

    const payload = await Note.findById({
      _id: note_id,
      user_id: id,
    });

    if (!payload || id != payload.user_id) {
      return next(new ErrorResponse("This is not your note to update", 401));
    }

    const note = await Note.updateOne(
      {
        _id: note_id,
      },
      {
        title_: name,
        blocks: text,
        user_id: id,
      }
    );

    if (!note) {
      return next(new ErrorResponse("Unable to update note", 401));
    }

    res.status(200).json({
      success: true,
      data: note,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteNote = async (req, res, next) => {
  const note_id = req.body.note_id;

  try {
    const id = req.user.id;

    const payload = await Note.findById({
      _id: note_id,
      user_id: id,
    });

    if (!payload || id != payload.user_id) {
      return next(new ErrorResponse("This is not your note to delete", 401));
    }

    const confirmation = await Note.deleteOne({
      _id: note_id,
    });

    if (!confirmation) {
      return next(new ErrorResponse("Unable to delete note", 401));
    }

    // now delete reference from the User collections

    let tempID = [];

    const user = await User.findById({ _id: id });

    for (let index = 0; index < user.notes.length; index++) {
      if (user.notes[index] != note_id) {
        tempID.push(user.notes[index]);
      }
    }

    user.notes = tempID;

    await user.save();

    res.status(200).json({
      success: true,
      data: confirmation,
    });
  } catch (error) {
    next(error);
  }
};

// {
//   $push: {
//     blocks: text,
//   },
// }
