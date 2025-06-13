const express = require('express');
const { userCreatePost } = require('../controllers/usersController');
const router = express.Router();

router.post('/', userCreatePost);

module.exports = router;
