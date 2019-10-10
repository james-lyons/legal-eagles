const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

// Client Routes
router.get('/:id', ctrl.client.showClient);
router.put('/:id', ctrl.client.editAccount);
router.delete('/:id', ctrl.client.deleteAccount);

module.exports = router;