const express = require('express');
const {
  postCreate,
  getPublishedPosts,
  getPost,
} = require('../controllers/postsController');
const router = express.Router();
const { verifyToken } = require('../utils/authMiddleware');

router.post('/', verifyToken, postCreate);
router.get('/', getPost);
router.get('/published', getPublishedPosts);

module.exports = router;
