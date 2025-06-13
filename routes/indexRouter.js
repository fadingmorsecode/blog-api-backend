const express = require('express');
const router = express.Router();
const userRouter = require('./usersRouter');

router.use('/user', userRouter);

router.get('/', (req, res) => {
  res.send('Hello World');
});

module.exports = router;
