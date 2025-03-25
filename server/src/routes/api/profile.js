const express = require('express');
const profile = require('../../controllers/authController').profile;
const authMiddleware = require('../../middleware/authMiddleware');
const router = express.Router();

router.get('^/$|/index(.html)?', authMiddleware, profile);

module.exports = router;
