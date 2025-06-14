const express = require('express');
const router = express.Router();
const userRouter = require('./usersRouter');
const postRouter = require('./postsRouter');

router.use('/user', userRouter);
router.use('/post', postRouter);

router.get('/', (req, res) => {
  res.send('Hello World');
});

module.exports = router;
