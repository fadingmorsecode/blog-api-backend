const express = require('express');
const {
  postCreate,
  getPublishedPosts,
  getPost,
  getAllUserPosts,
  deletePost,
  updatePost,
} = require('../controllers/postsController');
const router = express.Router();
const { verifyToken } = require('../utils/authMiddleware');

router.post('/', verifyToken, postCreate);
router.get('/', getPost);
router.get('/me', verifyToken, getAllUserPosts);
router.get('/published', getPublishedPosts);
router.delete('/', verifyToken, deletePost);
router.put('/', verifyToken, updatePost);

module.exports = router;
