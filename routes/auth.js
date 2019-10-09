const express = require('express');
const router = express.Router();
ctrl = require('../controllers');

// Authentication Routes
router.post('/registerClient', ctrl.auth.registerClient);
router.post('/registerAttorny', ctrl.auth.registerAttorny);
router.post('/login', ctrl.auth.login);
router.post('/logout', ctrl.auth.logout);