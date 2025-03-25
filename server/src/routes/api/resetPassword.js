const express = require('express');
const resetPassword = require('../../controllers/authController').resetPassword;
const router = express.Router();

router.post('^/$|/index(.html)?', resetPassword);

module.exports = router;
