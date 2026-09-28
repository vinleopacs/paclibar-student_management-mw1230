<div align="center">

# 🎓 Student Management System

**A full-stack CRUD mini system with a terminal-style UI and a password-protected admin panel.**

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

</div>

---

## ✨ Features

- 🖥️ **Hacker-style terminal UI** with a dark blue theme, glowing green text, and blinking cursor
- 📋 **Public page** to view and add students
- 🔐 **Admin panel** protected by a password login
- ✏️ **Full CRUD** in the admin panel: create, read, update, and delete students
- 🔑 **Token-based authentication**, so admin routes reject requests without a valid login
- 🛡️ **Safe queries** using parameterized SQL to prevent SQL injection
- 📱 **Responsive layout** that works on desktop and mobile

---

## 🧰 Tech Stack

| Layer      | Technology                    |
| ---------- | ----------------------------- |
| Frontend   | HTML, CSS, Vanilla JavaScript |
| Backend    | Node.js, Express              |
| Database   | MySQL (via XAMPP)             |
| DB Driver  | mysql2                        |

---

## 📁 Project Structure

```
paclibar-student_management-mw1230/
├── server.js         # Express server + API routes
├── index.html        # Public page (view + add students)
├── admin.html        # Admin panel (login + full CRUD)
├── student_db.sql    # Database export (import this first)
├── package.json      # Dependencies
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [XAMPP](https://www.apachefriends.org/) (for MySQL and phpMyAdmin)

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/vinleopacs/paclibar-student_management-mw1230.git
cd paclibar-student_management-mw1230
```

**2. Start MySQL**

Open the XAMPP Control Panel and click **Start** on **Apache** and **MySQL**.

**3. Import the database**

1. Go to `http://localhost/phpmyadmin`
2. Click **Import** and choose `student_db.sql`
3. Click **Import**. If the database doesn't exist yet, create one named `student_db` first, select it, then import.

**4. Install dependencies**

```bash
npm install
```

If there's no `package.json` in your copy, run this instead:

```bash
npm install express mysql2
```

**5. Run the server**

```bash
node server.js
```

You should see:

```
Server running at http://localhost:3000
Connected to MySQL database
```

**6. Open the app**

| Page        | URL                              |
| ----------- | -------------------------------- |
| Public page | http://localhost:3000            |
| Admin panel | http://localhost:3000/admin      |

---

## 🔐 Admin Access

Open the admin panel from the **[ Admin ]** button on the main page, or go to `/admin`.

> **Default password:** `admin123`
> Change `ADMIN_PASSWORD` at the top of `server.js` before using this anywhere real.

---

## 🔌 API Endpoints

### Public

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| GET    | `/api/students`  | Get all students  |
| POST   | `/api/students`  | Add a new student |

### Admin (requires login token)

| Method | Endpoint                    | Description        |
| ------ | --------------------------- | ------------------ |
| POST   | `/api/admin/login`          | Log in, get token  |
| POST   | `/api/admin/logout`         | Log out            |
| POST   | `/api/admin/students`
