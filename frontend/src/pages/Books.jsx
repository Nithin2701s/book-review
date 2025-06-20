import { useEffect, useState } from "react";
import { getBooks } from "../api";
import BookCard from "../components/BookCard";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBooks().then(res => {
      setBooks(res.data);
      setLoading(false);
    });
  }, []);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold my-6 text-gray-900">Books</h1>
      <input
        type="text"
        placeholder="Search books"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mb-6 mx-auto block border-2 border-gray-300 p-2 px-4 rounded-full outline-none w-full max-w-md focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex flex-wrap justify-start gap-6">
        {loading ? (
          <p className="text-gray-600 text-center w-full">Loading...</p>
        ) : filteredBooks.length === 0 ? (
          <p className="text-gray-600 text-center w-full">No books found.</p>
        ) : (
          filteredBooks.map(book => (
            <BookCard key={book._id} book={book} />
          ))
        )}
      </div>
    </div>
  );
};

export default Books;
