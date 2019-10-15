const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const authRequired = require('../middleware/authRequired');

// Attorney Routes
router.get('/search/:search', ctrl.attorney.indexAttorneys);
router.get('/:id', ctrl.attorney.showAttorney);
router.put('/:id', ctrl.attorney.editAccount);
router.delete('/:id', ctrl.attorney.deleteAccount);

module.exports = router;