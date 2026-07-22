# 🚀 CodePilot AI

An AI-powered coding assistant built with the MERN stack and the Groq API. CodePilot AI helps developers generate code reviews, debug issues, optimize code, and maintain a history of previous AI interactions through a clean and intuitive interface.

---

## 📖 Overview

CodePilot AI is a full-stack web application that allows users to submit code snippets and receive AI-generated feedback in real time. The platform securely manages user authentication using JWT, stores previous prompts and AI responses in MongoDB, and allows users to edit or delete past reviews.

---

## ✨ Features

- 🔐 JWT Authentication & Authorization
- 👤 User Registration and Login
- 🤖 AI-powered code review using Groq API
- 📝 Generate code explanations and optimization suggestions
- 🐞 Detect bugs and receive debugging recommendations
- 💾 Store AI conversations and code reviews in MongoDB
- 📜 View review history
- ✏️ Edit previously submitted code and regenerate reviews
- 🗑️ Delete unwanted review history
- ⚡ Responsive and modern React UI
- 🔒 Protected routes for authenticated users

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router
- Axios
- CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Authentication
- JWT (JSON Web Token)
- bcrypt

### AI
- Groq API

### Tools
- Git
- GitHub
- Postman

---

## 📂 Project Structure

```
CodePilot-AI/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── config/
│   ├── utils/
│   └── server.js
│
└── README.md
```

---

## 🚀 Installation

### Clone the repository

```bash
git clone https://github.com/yourusername/CodePilot-AI.git
```

### Navigate to the project

```bash
cd CodePilot-AI
```

---

### Install Frontend Dependencies

```bash
cd client
npm install
```

---

### Install Backend Dependencies

```bash
cd ../server
npm install
```


---

## ▶️ Running the Project

### Start Backend

```bash
cd server
npm run dev
```

### Start Frontend

```bash
cd client
npm run dev
```

Visit

```
http://localhost:5173
```

---

## 📸 Application Flow

1. Register a new account.
2. Login securely using JWT authentication.
3. Paste your source code.
4. Submit the code for AI review.
5. Receive:
   - Bug detection
   - Code optimization
   - Best practices
   - Explanation
6. Save review history automatically.
7. Edit previous prompts and regenerate reviews.
8. Delete old reviews if no longer needed.

---

## 🔒 Authentication

- User Registration
- User Login
- JWT Token Authentication
- Protected API Routes
- Password Hashing using bcrypt

---

## 📡 API Endpoints

### Authentication

```
POST /auth/register

POST /auth/login
```

### AI Review

```
POST /ai/review

GET /ai/past-prompts

PUT /ai/past-prompts/:id

DELETE /ai/past-prompts/:id
```

---

## 📈 Future Improvements

- Syntax highlighting
- Multiple programming language support
- Export review as PDF
- Dark/Light mode
- AI chat assistant
- Code comparison
- Favorite reviews
- Search review history

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch

```
git checkout -b feature-name
```

3. Commit your changes

```
git commit -m "Add new feature"
```

4. Push to GitHub

```
git push origin feature-name
```

5. Open a Pull Request

---

## 👨‍💻 Author

**Mohd Zaid**

- GitHub: https://github.com/Zaid32-ux
- LeetCode: https://leetcode.com/u/zaid_gour/

---

## ⭐ If you like this project

Give it a ⭐ on GitHub and feel free to contribute!
