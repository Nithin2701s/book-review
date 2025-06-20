import React from "react";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  return (
    <div className="book-card border border-gray-300 shadow-2xl p-5 py-7  rounded-md bg-white w-1/5">
      <img
        src={book.coverImage || "https://via.placeholder.com/150"}
        alt={book.title}
        className="book-card__image w-32 h-36 object-cover mx-auto mb-4 rounded"
      />
      <div className="book-card__info text-center">
        <h3 className="book-card__title text-lg font-semibold text-gray-900 mb-1">
          {book.title}
        </h3>
        <p className="book-card__author text-gray-600 mb-2">by {book.author}</p>
        <p className="book-card__rating text-yellow-500 font-medium mb-3">
          ⭐ {book.averageRating?.toFixed(1) || "N/A"}
        </p>
        <Link
          to={`/books/${book._id}`}
          className="book-card__link inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
