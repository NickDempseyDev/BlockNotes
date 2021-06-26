const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
	title_: String,
	blocks: [String],
	user_id: mongoose.Schema.Types.ObjectId
});

const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;