const express = require('express');
const router = express.Router();
ctrl = require('../controllers');

// Authentication Routes
router.post('/register', ctrl.auth.register);
router.post('/login', ctrl.auth.login);
router.post('/logout', ctrl.auth.logout);