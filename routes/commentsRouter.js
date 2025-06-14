const express = require('express');
const router = express.Router();
const { verifyToken } = require('../utils/authMiddleware');
const { createComment } = require('../controllers/commentsController');

router.post('/', verifyToken, createComment);

module.exports = router;
