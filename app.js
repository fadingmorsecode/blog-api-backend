const express = require('express');
const app = express();
require('dotenv').config();
const router = require('./routes/indexRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

app.listen(process.env.PORT, () => {
  console.log(`App listening on ${process.env.PORT}`);
});
