const express = require('express');
const { postCreate } = require('../controllers/postsController');
const router = express.Router();
const { verifyToken } = require('../utils/authMiddleware');

router.post('/', verifyToken, postCreate);

module.exports = router;
