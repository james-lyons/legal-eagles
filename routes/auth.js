const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

// Authentication Routes
router.post('/clientRegister', ctrl.auth.registerClient);
router.post('/attorneyRegister', ctrl.auth.registerAttorney);
router.post('/attorneyLogin', ctrl.auth.attorneyLogin);
router.post('/clientLogin', ctrl.auth.clientLogin);
router.post('/logout', ctrl.auth.logout);

module.exports = router;