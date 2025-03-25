const express = require('express');
const router = express.Router();

router.get('^/$|/index(.html)?', (req, res) => {
  try {
    res.send('Hello World!');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
