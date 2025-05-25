# 📝 Todo-FullStack-App

A full-stack **Todo Progress Tracker Web App** that allows users to manage their daily tasks with priority, deadlines, and collaboration features.

## 🚀 Features

- User Registration & Login
- JWT-based Authentication
- Profile Management (Edit & View)
- Add tasks with:
  - Title
  - Description
  - Priority (Low / Medium / High)
  - Due Date
  - Assignee (Assign tasks to yourself or others)
- View tasks in a clean UI
- Update or delete tasks
- Responsive frontend using Vite + React
- Backend built with Express and MongoDB

---

## 🔧 Tech Stack

| Tech           | Usage               |
|----------------|---------------------|
| **Frontend**   | React, Vite, Axios  |
| **Backend**    | Node.js, Express    |
| **Database**   | MongoDB             |
| **Authentication** | JWT, bcryptjs |
| **Dev Tools**  | Docker, Docker Compose, .env support |

---

## 🐳 Run Locally with Docker

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/Todo-FullStack-app.git
cd Todo-FullStack-app
cd frontend
npm install
node index.js

cd frontend
npm install
npm run dev
