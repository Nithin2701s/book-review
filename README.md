
# 📚 Book Review Platform

A full-stack web application where users can browse books, read and write reviews, register/login, and manage their profiles. Built with **React**, **Node.js**, **Express**, and **MongoDB**.

---

## 🛠️ Tech Stack

**Frontend**  
- React (Vite)
- Tailwind CSS
- React Router
- Axios
- Context API for auth state

**Backend**  
- Node.js
- Express
- MongoDB + Mongoose
- JWT for authentication
- bcryptjs for password hashing

---

## ✨ Features

### Public:
- View all books
- View individual book details and reviews

### Authenticated Users:
- Register and login
- Add reviews with rating
- View your own profile

### Admin:
- Add new books (via API/postman)

---

## 📁 Project Structure

```
book-review-platform/
├── frontend/              # React frontend
│   ├── components/      # Reusable UI components
│   ├── pages/           # Page views (Home, Login, BookDetails, etc.)
│   ├── context/         # BookContext for user state
│   ├── api.js           # API handlers using Axios
│   └── App.jsx
├── backend/              # Node.js + Express backend
│   ├── models/          # Mongoose schemas
│   ├── controllers/     # Route logic
│   ├── routes/          # Express route handlers
│   ├── middleware/      # JWT auth, error handling
│   ├── seed.js          # Sample data seeder
│   └── server.js
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js
- MongoDB
- npm or yarn

### 1. Clone the repo

```bash
git clone https://github.com/Nithin2701s/book-review-platform.git
cd book-review-platform
```

### 2. Setup Backend

```bash
cd server
npm install
```

Create `.env` file in `server/`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/bookreview
JWT_SECRET=your_jwt_secret
```

Seed the database (optional):

```bash
node seed.js
```

Start backend:

```bash
npm run dev
```

### 3. Setup Frontend

```bash
cd ../client
npm install
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173)

---

## 🔐 API Endpoints (Backend)

### Auth
- `POST /auth/register` – Register new user
- `POST /auth/login` – Login and get token

### Books
- `GET /books` – Get all books
- `GET /books/:id` – Get book details
- `POST /books` – Add book (admin only)

### Reviews
- `GET /reviews?bookId=123` – Get reviews for book
- `POST /reviews` – Submit a review

### Users
- `GET /users/:id` – Get user profile
- `PUT /users/:id` – Update user profile

---

## 👥 Authors

- [Your Name](https://github.com/yourusername)

---

## 📌 TODO

- Admin dashboard
- Edit/Delete reviews
- Like/Dislike reviews
- Add genres filter
- Deploy to Vercel / Render / MongoDB Atlas

---

## 📄 License

MIT License
