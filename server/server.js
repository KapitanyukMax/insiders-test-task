const express = require('express');
const cors = require('cors');
const corsOptions = require('./config/corsOptions.js');
const errorHandler = require('./src/middleware/errorHandler.js');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3500;

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/register', require('./src/routes/api/register.js'));
app.use('/login', require('./src/routes/api/login.js'));
app.use('/profile', require('./src/routes/api/profile.js'));
app.use('/logout', require('./src/routes/api/logout.js'));
app.use('/reset-password', require('./src/routes/api/resetPassword.js'));

app.all('*', (req, res, next) => {
  try {
    res.status(404).send('404 - Not Found');
  } catch (error) {
    next(error);
  }
});

app.use(errorHandler);

app.listen(port, (error) => {
  if (error) {
      const message = error?.message ?? 'Unknown server error';
      res.status(500).json({ message });
  }
  console.log(`Server is running on http://localhost:${port}`);
});
