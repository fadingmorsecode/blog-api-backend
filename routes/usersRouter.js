const express = require('express');
const { userCreate, userLogin } = require('../controllers/usersController');
const router = express.Router();

router.post('/', userCreate);
router.post('/login', userLogin);

module.exports = router;
