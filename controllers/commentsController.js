const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

exports.createComment = async (req, res) => {
  try {
    await prisma.comment.create({
      data: {
        postId: req.body.postId,
        userId: req.user.id,
        body: req.body.body,
      },
    });
    res.json({ message: 'Comment successfully created' });
  } catch (err) {
    console.error('Comment create error', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await prisma.comment.findUnique({
      where: {
        id: req.body.id,
      },
    });
    const commentAuthor = comment.userId;
    if (commentAuthor === req.user.id || req.user.role === 'AUTHOR') {
      await prisma.comment.delete({
        where: {
          id: req.body.id,
        },
      });
    } else {
      throw Error('Not authorized to delete this comment');
    }
    res.json({ message: 'Comment successfully deleted' });
  } catch (err) {
    console.error('Comment delete error', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
