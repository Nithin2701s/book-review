import { useEffect, useState } from "react";
import { getBooks } from "../api";
import BookCard from "../components/BookCard";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBooks().then(res => {
      setBooks(res.data);
      setLoading(false);
    });
  }, []);

  if (loading)
    return (
      <p className="text-center text-gray-500 mt-10 text-lg">Loading...</p>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-extrabold mb-6 text-gray-900">Featured Books</h1>
      <div className="book-grid flex flex-wrap gap-10 p-5">
        {books.slice(0, 4).map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Home;
