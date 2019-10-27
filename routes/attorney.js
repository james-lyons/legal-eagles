const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const authRequired = require('../middleware/authRequired');

// Attorney Routes
router.get('/search', ctrl.attorney.indexAttorneys);
router.get('/search/id/:id', ctrl.attorney.showAttorneyById);
router.get('/search/url/:url', ctrl.attorney.showAttorneyByURL);
router.put('/:id', ctrl.attorney.editAccount);
router.delete('/:id', ctrl.attorney.deleteAccount);

module.exports = router;