import axios from 'axios';

// Create axios instance with base URL
const API = axios.create({
  baseURL: 'http://localhost:5000',
});

// Attach token to each request if exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Public API calls
export const getBooks = (page = 1, limit = 10) => API.get(`/books?page=${page}&limit=${limit}`);
export const getBook = (id) => API.get(`/books/${id}`);
export const getReviews = (bookId) => API.get(`/reviews?bookId=${bookId}`);
export const getUser = (id) => API.get(`/users/${id}`);

// Protected API calls (require token)
export const postReview = (review) => API.post('/reviews', review);
export const updateUser = (id, data) => API.put(`/users/${id}`, data);
export const addBook = (book) => API.post('/books', book);

// Auth APIs
export const loginUser = (credentials) => API.post('/auth/login', credentials);
export const registerUser = (data) => API.post('/auth/register', data);
