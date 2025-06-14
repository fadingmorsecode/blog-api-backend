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
