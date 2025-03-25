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

app.use('/', require('./src/routes/api/root.js'));
app.use('/users', require('./src/routes/api/users.js'));

app.all('*', (req, res, next) => {
  try {
    res.status(404).send('404 - Not Found');
  } catch (error) {
    next(error);
  }
});

app.use(errorHandler);

app.listen(port, (err) => {
  if (err) {
      const message = err?.message ?? 'Unknown server error';
      res.status(500).json({ message });
  }
  console.log(`Server is running on http://localhost:${port}`);
});
