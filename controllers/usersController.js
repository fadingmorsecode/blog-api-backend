const bcrypt = require('bcryptjs');
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.userCreate = async (req, res) => {
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
    console.error('Create user error', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.userLogin = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: req.body.username,
      },
    });
    if (!user) {
      throw Error('User not found');
    }
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      throw Error('Password is incorrect');
    }
    jwt.sign(
      { user: user },
      process.env.SECRETKEY,
      { expiresIn: '7d' },
      (err, token) => {
        res.json({
          token: token,
        });
      }
    );
  } catch (err) {
    console.error('Login error', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// exports.userEditPassword = async (req, res) => {
//     try {

//     } catch (err) {
//         console.error('Edit user error', err);
//         res.status(500).json({ error: 'Internal server error'});
//     }
// };
