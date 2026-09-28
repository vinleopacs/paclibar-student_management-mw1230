const express = require("express");
const mysql = require("mysql2");
const crypto = require("crypto");

const app = express();
const PORT = 3000;

// ========================================
// CHANGE THIS PASSWORD
// ========================================
const ADMIN_PASSWORD = "vinleopacs060903";

// Allow JSON data
app.use(express.json());

// Serve index.html and admin.html
app.use(express.static(__dirname));

// Short URL for the admin page
app.get("/admin", (req, res) => {
    res.sendFile(__dirname + "/admin.html");
});

// ========================================
// Database Connection
// ========================================
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "student_db"
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err.message);
        return;
    }
    console.log("Connected to MySQL database");
});

// ========================================
// Public Routes (used by index.html)
// ========================================

// RETRIEVE
app.get("/api/students", (req, res) => {
    db.query("SELECT * FROM students", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// INSERT
app.post("/api/students", (req, res) => {
    const { name, course, year_level } = req.body;
    db.query(
        "INSERT INTO students (name, course, year_level) VALUES (?, ?, ?)",
        [name, course, year_level],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: result.insertId, name, course, year_level });
        }
    );
});

// ========================================
// Admin Auth
// ========================================
const tokens = new Set();

app.post("/api/admin/login", (req, res) => {
    if (req.body.password !== ADMIN_PASSWORD) {
        return res.status(401).json({ error: "Wrong password" });
    }
    const token = crypto.randomBytes(24).toString("hex");
    tokens.add(token);
    res.json({ token });
});

function requireAdmin(req, res, next) {
    if (!tokens.has(req.headers["x-admin-token"])) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    next();
}

app.post("/api/admin/logout", requireAdmin, (req, res) => {
    tokens.delete(req.headers["x-admin-token"]);
    res.json({ message: "Logged out" });
});

// ========================================
// Admin Routes (password required)
// ========================================

// CREATE
app.post("/api/admin/students", requireAdmin, (req, res) => {
    const { name, course, year_level } = req.body;
    db.query(
        "INSERT INTO students (name, course, year_level) VALUES (?, ?, ?)",
        [name, course, year_level],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: result.insertId, name, course, year_level });
        }
    );
});

// UPDATE
app.put("/api/admin/students/:id", requireAdmin, (req, res) => {
    const { name, course, year_level } = req.body;
    db.query(
        "UPDATE students SET name = ?, course = ?, year_level = ? WHERE id = ?",
        [name, course, year_level, req.params.id],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Student updated" });
        }
    );
});

// DELETE
app.delete("/api/admin/students/:id", requireAdmin, (req, res) => {
    db.query("DELETE FROM students WHERE id = ?", [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Student deleted" });
    });
});

// ========================================
// Start Server
// ========================================
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
