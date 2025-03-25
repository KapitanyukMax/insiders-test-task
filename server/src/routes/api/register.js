const express = require('express');
const register = require('../../controllers/authController').register;
const router = express.Router();

router.post('^/$|/index(.html)?', register);

module.exports = router;
