# CoreConcepts — Institute Management Platform

> A full-stack web application for managing students, attendance, and courses at a coaching institute — built with React, Node.js, Express, and MongoDB.

🌐 **Live Demo:** [core-concepts-one.vercel.app](https://core-concepts-one.vercel.app)

---

## 📌 About The Project

CoreConcepts is an institute management system designed for coaching centres that teach **Coding & AI, JEE/NEET preparation, and Board exam students**.

The platform has two types of users:

- **Admin** — can add students, manage batches, and mark attendance
- **Student** — can view their own attendance records and study materials

The idea came from the need to digitize attendance tracking and student management for small to mid-sized coaching institutes — replacing manual registers with a clean, fast, and modern web app.

---

## ✨ Features

### 🏠 Homepage
- Modern dark-themed landing page
- Three learning tracks — Coding/AI, JEE/NEET, Board Exams
- AI features showcase section
- Student testimonials
- FAQ accordion
- Fully responsive design

### 🛡️ Admin Panel
- Secure login with JWT authentication
- Add new students with name, email, phone, and batch
- View all enrolled students in a table
- Mark daily attendance (present/absent) for each student
- Logout with session clearing

### 🎒 Student Portal
- Separate student login
- View personal attendance history
- See attendance percentage with 75% threshold warning
- Access study materials (PDF downloads)
- Clean dashboard with stats cards

### 🔐 Authentication
- Admin registration and login
- Student self-registration
- JWT tokens stored in localStorage
- Protected routes — unauthorized users redirected automatically
- Password hashing with bcryptjs

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, React Router v6, Vite |
| **Styling** | Tailwind CSS, Custom CSS variables |
| **HTTP Client** | Axios with interceptors |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas, Mongoose ODM |
| **Authentication** | JWT (jsonwebtoken), bcryptjs |
| **Deployment** | Vercel (frontend), Render (backend) |
| **Version Control** | Git, GitHub |

---


## 🚀 Getting Started Locally

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (or local MongoDB)
- Git

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/core-concepts.git
cd core-concepts
```

### 2. Setup Backend
```bash
cd backend
cp .env.example .env
# Fill in your MONGO_URI and JWT_SECRET in .env
npm install
node server.js
# Backend runs on http://localhost:5000
```

### 3. Setup Frontend
```bash
cd institute-frontend
npm install
npm run dev
# Frontend runs on http://localhost:5173
```

### 4. Create your first Admin
Open browser console (F12) and run:
```js
fetch('http://localhost:5000/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'admin@core.com', password: 'admin123' })
}).then(r => r.json()).then(console.log)
```

---

## 🌍 Deployment

| Service | Purpose | URL |
|---|---|---|
| **Vercel** | Frontend hosting | Auto-deploys on `git push` |
| **Render** | Backend hosting | Auto-deploys on `git push` |
| **MongoDB Atlas** | Cloud database | Always-on cluster |

### Environment Variables

**Backend (Render dashboard):**
```
MONGO_URI     = mongodb+srv://...
JWT_SECRET    = your_secret_key
PORT          = 5000
```

**Frontend (Vercel dashboard):**
```
VITE_API_URL  = https://your-render-url.onrender.com
```


## 👨‍💻 Author

**Murli** — Full Stack Developer  
Built with React + Node.js + MongoDB

---

## 📄 License

This project is for educational and portfolio purposes.

---

> *"Built to learn. Deployed to showcase."*
