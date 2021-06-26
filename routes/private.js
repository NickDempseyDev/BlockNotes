const express = require('express');
const router = express.Router();
const { getPrivateData } = require('../controllers/private');
const { createNote, getAllNotes,  getNoteById, updateNote, deleteNote } = require('../controllers/note');
const { protect } = require('../middleware/auth');

// this is where private routes that need to be protected go
router.route("/temp").get(protect, getPrivateData);
router.route("/createnote").put(protect, createNote);
router.route("/updatenote").put(protect, updateNote);
router.route("/getnotebyid").get(protect, getNoteById);
router.route("/getallnotes").get(protect, getAllNotes)
router.route("/deletenote").delete(protect, deleteNote);

module.exports = router;