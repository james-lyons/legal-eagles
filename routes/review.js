const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const authRequired = require('../middleware/authRequired');

// Review Routes
router.get('/', authRequired, ctrl.review.indexReviews);
router.post('/', authRequired, ctrl.review.createReview);
router.put('/:id', authRequired, ctrl.review.editReview);
router.delete('/:id', authRequired, ctrl.review.deleteReview);

module.exports = router;