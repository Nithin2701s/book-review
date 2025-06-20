import { useState } from "react";
import { postReview } from "../api";

const Star = ({ filled, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`text-3xl ${filled ? "text-yellow-400" : "text-gray-300"} focus:outline-none`}
    aria-label={filled ? "Filled star" : "Empty star"}
  >
    ★
  </button>
);

const ReviewForm = ({ bookId, userId, onSuccess }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postReview({ rating, comment, bookId, userId });
    setRating(5);
    setComment("");
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded shadow-md">
      <h4 className="text-xl font-semibold mb-4">Submit a Review</h4>

      <label className="block mb-2 font-medium text-gray-700">Rating</label>
      <div className="flex space-x-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            filled={star <= rating}
            onClick={() => setRating(star)}
          />
        ))}
      </div>

      <label className="block mb-2 font-medium text-gray-700" htmlFor="comment">
        Review
      </label>
      <textarea
        id="comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Your review..."
        className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="4"
        required
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Post Review
      </button>
    </form>
  );
};

export default ReviewForm;
