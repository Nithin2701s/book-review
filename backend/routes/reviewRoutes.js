const express = require('express');
const { getReviewsForBook, createReview } = require('../controllers/reviewController');

const router = express.Router();

router.get('/', getReviewsForBook); // expects ?bookId=<id>
router.post('/', createReview);

module.exports = router;
