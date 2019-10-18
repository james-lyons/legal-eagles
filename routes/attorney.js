const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const authRequired = require('../middleware/authRequired');

// Attorney Routes
router.get('/search', ctrl.attorney.indexAttorneys);
router.get('/search/specialty/:specialty', ctrl.attorney.indexAttorneysBySpecialty);
router.get('/search/zipcode/:zipcode', ctrl.attorney.indexAttorneysByZipcode);
router.get('/:id', ctrl.attorney.showAttorney);
router.put('/:id', ctrl.attorney.editAccount);
router.delete('/:id', ctrl.attorney.deleteAccount);

module.exports = router;