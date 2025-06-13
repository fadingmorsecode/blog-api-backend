const bcrypt = require('bcryptjs');
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();
exports.userCreatePost = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: hashedPassword,
        role: req.body.role,
      },
    });
    res.send(user);
  } catch (err) {
    console.error('Create post error', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
