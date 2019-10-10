const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

// Review Routes
router.get('/', ctrl.review.indexReviews);
router.post('/', ctrl.review.createReview);
router.put('/:id', ctrl.review.editReview);
router.delete('/:id', ctrl.review.deleteReview);

module.exports = router;