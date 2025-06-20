import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getBook, getReviews } from "../api";
import ReviewForm from "../components/ReviewForm";
import { BookContext } from "../context/BookContext";

const BookDetails = () => {
  const { id } = useParams();
  const { userId } = useContext(BookContext);
  const [book, setBook] = useState({});
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getBook(id).then(res => setBook(res.data));
    getReviews(id).then(res => setReviews(res.data));
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      {/* Book Image */}
      <div className="flex justify-center mb-6">
        <img
          src={book.coverImage || "https://via.placeholder.com/200x280"}
          alt={book.title}
          className="w-48 h-64 object-cover rounded-md shadow-lg"
        />
      </div>

      <h2 className="text-3xl font-bold mb-2 text-gray-900">{book.title}</h2>
      <p className="text-lg text-gray-700 mb-4">By {book.author}</p>
      <p className="text-gray-800 mb-6 whitespace-pre-line">{book.description}</p>
      <p className="font-semibold mb-8 text-yellow-500">
        Rating: {book.averageRating?.toFixed(1) || "N/A"} ⭐
      </p>

      <h3 className="text-2xl font-semibold mb-4 border-b pb-2">Reviews</h3>
      {reviews.length === 0 && (
        <p className="text-gray-500 mb-4">No reviews yet.</p>
      )}
      <div className="space-y-4 mb-8">
        {reviews.map(r => (
          <div key={r._id} className="border rounded p-4 bg-gray-50">
            <strong className="block text-gray-900">{r.userId?.name}</strong>
            <p className="text-gray-700">{r.comment}</p>
            <span className="text-yellow-500 font-semibold">{"⭐".repeat(r.rating)}</span><span className="font-semibold">{"(" + r.rating + ")"}</span>
          </div>
        ))}
      </div>

      <ReviewForm
        bookId={id}
        userId={userId}
        onSuccess={() =>
          getReviews(id).then(res => setReviews(res.data))
        }
      />
    </div>
  );  
};

export default BookDetails;
