const express = require('express');
const {
  userCreate,
  userLogin,
  editUser,
} = require('../controllers/usersController');
const { verifyToken } = require('../utils/authMiddleware');
const router = express.Router();

router.post('/', userCreate);
router.post('/login', userLogin);
router.put('/', verifyToken, editUser);

module.exports = router;
