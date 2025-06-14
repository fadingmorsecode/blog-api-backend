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
    console.log(req.user);
    const posts = await prisma.post.findMany({
      where: {
        userId: req.user.id,
      },
    });
    res.send(posts);
  } catch (err) {
    console.error('All user posts get error', err);
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
    console.error('Post get error', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await prisma.post.update({
      data: {
        title: req.body.title,
        body: req.body.body,
        isPublished: req.body.isPublished,
      },
      where: {
        id: req.body.id,
        userId: req.user.id,
      },
    });
    res.send(post);
  } catch (err) {
    console.error('Post update error', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await prisma.post.delete({
      where: {
        id: req.body.id,
        userId: req.user.id,
      },
    });
    res.send(post);
  } catch (err) {
    console.error('Post delete error', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
