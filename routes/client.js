const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const authRequired = require('../middleware/authRequired');

// Client Routes
router.get('/:id', authRequired, ctrl.client.showClient);
router.put('/:id', authRequired, ctrl.client.editAccount);
router.delete('/:id', authRequired, ctrl.client.deleteAccount);

module.exports = router;