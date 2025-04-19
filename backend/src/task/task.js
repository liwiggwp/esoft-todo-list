const express = require("express");
const connection = require("../config/db");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [rows] = await connection.query(`
          SELECT 
            t.id,
            t.title,
            t.description,
            t.end_date,
            t.created_at,
            t.updated_at,
            p.name AS priority,
            s.name AS status,
            CONCAT(a.first_name, ' ', a.last_name) AS author,
            CONCAT(r.first_name, ' ', r.last_name) AS responsible
          FROM tasks t
          LEFT JOIN priorities p ON t.priority_id = p.id
          LEFT JOIN statuses s ON t.status_id = s.id
          LEFT JOIN users a ON t.author_id = a.id
          LEFT JOIN users r ON t.responsible_id = r.id
        `);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const [rows] = await connection.query("SELECT * FROM tasks WHERE id = ?", [
      req.params.id,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Задача не найдена" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

module.exports = router;