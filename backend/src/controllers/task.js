const connection = require("../config/db");

const getTasks = async (req, res) => {
  const userId = req.user.userId;
  const groupBy = req.query.groupBy;
  const sql = `
  SELECT 
    t.id,
    t.title,
    t.description,
    t.end_date,
    t.author_id,
    t.created_at,
    t.updated_at,
    p.name AS priority,
    s.name AS status,
    CONCAT(a.first_name, ' ', a.last_name) AS author,
    CONCAT(r.first_name, ' ', r.last_name) AS responsible,
    t.responsible_id
  FROM tasks t
  LEFT JOIN priorities p ON t.priority_id = p.id
  LEFT JOIN statuses s ON t.status_id = s.id
  LEFT JOIN users a ON t.author_id = a.id
  LEFT JOIN users r ON t.responsible_id = r.id
  `;

  try {
    if (groupBy === "responsible") {
      const [rows] = await connection.query(
        `${sql}
        WHERE r.manager_id = ?
        ORDER BY t.updated_at DESC
        `,
        [userId]
      );

      const grouped = rows.reduce((acc, task) => {
        const name = task.responsible || "Не назначен";
        if (!acc[name]) acc[name] = [];
        acc[name].push(task);
        return acc;
      }, {});

      return res.json(grouped);
    }

    if (groupBy === "date") {
      const [rows] = await connection.query(
        `${sql}
        WHERE t.responsible_id = ?
        ORDER BY t.updated_at DESC
        `,
        [userId]
      );

      return res.json(rows);
    }
    if (groupBy === "all") {
      const [rows] = await connection.query(
        `${sql}
        ORDER BY t.updated_at DESC
        `
      );
      return res.json(rows);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

const getTaskById = async (req, res) => {
  try {
    const [rows] = await connection.query(
      `
      SELECT * FROM tasks WHERE id = ?`,
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "Задача не найдена" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

const createTask = async (req, res) => {
  const {
    title,
    description,
    end_date,
    priority_id,
    status_id,
    responsible_id,
  } = req.body;

  const author_id = req.user.userId;

  try {
    const [rows] = await connection.query(
      `
      INSERT INTO tasks (title, description, end_date, priority_id, status_id, author_id, responsible_id) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        description,
        end_date,
        priority_id,
        status_id,
        author_id,
        responsible_id,
      ]
    );

    res.json({ id: rows.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

const updateTask = async (req, res) => {
  const {
    title,
    description,
    end_date,
    priority_id,
    status_id,
    responsible_id,
  } = req.body;

  const userId = req.user.userId;

  try {
    const [task] = await connection.query(
      `
      SELECT author_id, responsible_id FROM tasks WHERE id = ?`,
      [req.params.id]
    );

    if (task.length === 0) {
      return res.status(404).json({ message: "Задача не найдена" });
    }

    const isAuthor = task[0].author_id === userId;
    const isResponsible = task[0].responsible_id === userId;

    if (!isAuthor && !isResponsible) {
      return res
        .status(403)
        .json({ message: "Вы не можете обновлять эту задачу" });
    }

    if (!isAuthor && isResponsible) {
      if (status_id === undefined) {
        return res.status(400).json({
          message: "Вы можете изменять только статус задачи",
        });
      }

      await connection.query(
        `
        UPDATE tasks SET status_id = ?, updated_at = NOW() WHERE id = ?`,
        [status_id, req.params.id]
      );

      return res.status(200).json({ message: "Статус задачи обновлён" });
    }

    await connection.query(
      `
      UPDATE tasks 
         SET title = ?, description = ?, end_date = ?, priority_id = ?, 
             status_id = ?, responsible_id = ?, updated_at = NOW() 
         WHERE id = ?`,
      [
        title,
        description,
        end_date,
        priority_id,
        status_id,
        responsible_id,
        req.params.id,
      ]
    );

    res.status(200).json({ message: "Задача обновлена" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
const deleteTask = async (req, res) => {
  const userId = req.user.userId;
  try {
    const [task] = await connection.query(
      `
      SELECT author_id FROM tasks WHERE id = ?`,
      [req.params.id]
    );
    console.log(task[0].author_id);
    if (task.length === 0) {
      return res.status(404).json({ message: "Задача не найдена" });
    }
    if (task[0].author_id !== userId) {
      return res
        .status(403)
        .json({ message: "Вы не можете удалять эту задачу" });
    }

    const [rows] = await connection.query(
      `
      DELETE FROM tasks WHERE id = ?`,
      [req.params.id]
    );
    res.json({ message: "Задача удалена" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
