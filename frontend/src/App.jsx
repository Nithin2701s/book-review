import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Books from "./pages/Books";
import BookDetails from "./pages/BookDetails";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import { BookProvider } from "./context/BookContext";
import Login from './pages/Login';
import { useEffect, useState } from 'react';

function App() {
  
  return (
    <BookProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/login" element={<Login  />} />
        </Routes>
      </BrowserRouter>
    </BookProvider>
  );
}

export default App;
