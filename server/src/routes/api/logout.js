const express = require('express');
const logout = require('../../controllers/authController').logout;
const router = express.Router();

router.post('^/$|/index(.html)?', logout);

module.exports = router;
