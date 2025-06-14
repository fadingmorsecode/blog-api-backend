const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

exports.postCreate = async (req, res) => {
  try {
    const post = await prisma.post.create({
      data: {
        userId: req.user.id,
        title: req.body.title,
        body: req.body.body,
        isPublished: req.body.published,
      },
    });
    res.send(post);
  } catch (err) {
    console.error('Post create error', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
