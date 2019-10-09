const express = require('express');
const router = express.Router();
ctrl = require('../controllers');

// Authentication Routes
router.post('/registerClient', ctrl.auth.registerClient);
router.post('/registerAttorney', ctrl.auth.registerAttorney);
router.post('/login', ctrl.auth.attorneyLogin);
router.post('/login', ctrl.auth.clientLogin);
router.post('/logout', ctrl.auth.logout);

module.exports = router;