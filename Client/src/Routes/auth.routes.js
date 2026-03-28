const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/user.controller.js');

router.post('/signup', UserController.signUp);
router.post('/signin', UserController.signIn);
router.get('/user/:email', UserController.getUser);

module.exports = router;