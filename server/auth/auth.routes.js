const express = require('express');
const router = express.Router();

const authController = require('./auth.controllers');

router.post('/register', authController.register);

module.exports = router;