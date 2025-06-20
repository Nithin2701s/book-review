const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const Book = require("./models/Book");
const User = require("./models/User");
const Review = require("./models/Review");

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI not found in .env");
  process.exit(1);
}

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");

    await Book.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();

    // 🔐 Hash passwords
    const hashedPassword1 = await bcrypt.hash("password123", 10);
    const hashedPassword2 = await bcrypt.hash("admin456", 10);

    const users = await User.insertMany([
      {
        name: "Alice Smith",
        email: "alice@example.com",
        password: hashedPassword1,
        isAdmin: false,
      },
      {
        name: "Bob Johnson",
        email: "bob@example.com",
        password: hashedPassword2,
        isAdmin: true,
      },
    ]);

    const books = await Book.insertMany([
      {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Classic",
        description: "A novel set in the Jazz Age exploring themes of wealth and excess.",
        coverImage: "https://covers.openlibrary.org/b/id/7222246-L.jpg",
      },
      {
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian",
        description: "A chilling prediction of totalitarian government surveillance and control.",
        coverImage: "https://covers.openlibrary.org/b/id/7222241-L.jpg",
      },
      {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Classic",
        description: "A story of racial injustice in the Deep South through the eyes of a child.",
        coverImage: "https://covers.openlibrary.org/b/id/8228691-L.jpg",
      },
      {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        genre: "Fantasy",
        description: "Bilbo Baggins embarks on an epic quest to reclaim treasure guarded by a dragon.",
        coverImage: "https://covers.openlibrary.org/b/id/6979861-L.jpg",
      },
    ]);

    const reviews = await Review.insertMany([
      {
        userId: users[0]._id,
        bookId: books[0]._id,
        rating: 5,
        comment: "A timeless classic. Absolutely loved it!",
      },
      {
        userId: users[1]._id,
        bookId: books[0]._id,
        rating: 4,
        comment: "Great writing but a bit slow in the middle.",
      },
      {
        userId: users[0]._id,
        bookId: books[2]._id,
        rating: 5,
        comment: "A moving story with powerful themes.",
      },
      {
        userId: users[1]._id,
        bookId: books[3]._id,
        rating: 4,
        comment: "A fun adventure through Middle Earth!",
      },
    ]);

    // 🧮 Update average ratings
    for (let book of books) {
      const bookReviews = reviews.filter(
        (r) => r.bookId.toString() === book._id.toString()
      );
      const avg =
        bookReviews.reduce((acc, r) => acc + r.rating, 0) /
        (bookReviews.length || 1);
      await Book.findByIdAndUpdate(book._id, { averageRating: avg });
    }

    console.log("🌱 Seed data inserted successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    process.exit(1);
  }
};

seed();
