const express = require('express');
const router = express.Router();
const { verifyToken } = require('../utils/authMiddleware');
const {
  createComment,
  deleteComment,
  getComment,
} = require('../controllers/commentsController');

router.post('/', verifyToken, createComment);
router.delete('/', verifyToken, deleteComment);

module.exports = router;
