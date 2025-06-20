const Book = require('../models/Book');

exports.getBooks = async (req, res) => {
  const books = await Book.find().limit(20); // add pagination logic
  res.json(books);
};

exports.getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.json(book);
};

exports.addBook = async (req, res) => {
  const newBook = new Book(req.body);
  await newBook.save();
  res.status(201).json(newBook);
};
