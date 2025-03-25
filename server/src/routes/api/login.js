const express = require('express');
const login = require('../../controllers/authController').login;
const router = express.Router();

router.post('^/$|/index(.html)?', login);

module.exports = router;
