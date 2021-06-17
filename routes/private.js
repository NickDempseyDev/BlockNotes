const express = require('express');
const router = express.Router();
const { getPrivateData } = require('../controllers/private');
const { protect } = require('../middleware/auth');

// this is where private routes that need to be protected go
router.route("/").get(protect, getPrivateData);

module.exports = router;