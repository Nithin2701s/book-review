const Review = require('../models/Review');
const Book = require('../models/Book');

// @desc Get reviews for a specific book
exports.getReviewsForBook = async (req, res) => {
  try {
    const { bookId } = req.query;
    const reviews = await Review.find({ bookId }).populate('userId', 'name');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Submit a new review
exports.createReview = async (req, res) => {
  try {
    const { userId, bookId, rating, comment } = req.body;

    const newReview = new Review({ userId, bookId, rating, comment });
    await newReview.save();

    // Update book's average rating
    const reviews = await Review.find({ bookId });
    const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

    await Book.findByIdAndUpdate(bookId, { averageRating: avgRating });

    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
