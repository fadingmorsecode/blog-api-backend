const express = require('express');
const router = express.Router();
const userRouter = require('./usersRouter');
const postRouter = require('./postsRouter');
const commentRouter = require('./commentsRouter');

router.use('/user', userRouter);
router.use('/post', postRouter);
router.use('/comment', commentRouter);

router.get('/', (req, res) => {
  res.send('Hello World');
});

module.exports = router;
