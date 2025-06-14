const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

exports.postCreate = async (req, res) => {
  try {
    const post = await prisma.post.create({
      data: {
        userId: req.user.id,
        title: req.body.title,
        body: req.body.body,
        isPublished: req.body.isPublished,
      },
    });
    res.send(post);
  } catch (err) {
    console.error('Post create error', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getPublishedPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        isPublished: true,
      },
    });
    res.send(posts);
  } catch (err) {
    console.error('Published posts get error', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllUserPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        userId: req.user.id,
      },
    });
    res.send(posts);
  } catch (err) {
    console.error('Published posts get error', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: req.body.id,
      },
      include: {
        comments: true,
      },
    });
    res.send(post);
  } catch (err) {
    console.error('Published posts get error', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
