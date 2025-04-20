const connection = require("../config/db");

const getTasks = async (req, res) => {
  const userId = req.user.userId;

  try {
    const [rows] = await connection.query(
      `
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
      WHERE t.author_id = ? OR t.responsible_id = ?`,
      [userId, userId]
    );

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

const getTaskById = async (req, res) => {
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
      "INSERT INTO tasks (title, description, end_date, priority_id, status_id, author_id, responsible_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
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

  const author_id = req.user.userId;

  try {
    const [task] = await connection.query(
      "SELECT author_id FROM tasks WHERE id = ?",
      [req.params.id]
    );

    if (task.length === 0) {
      return res.status(404).json({ message: "Задача не найдена" });
    }

    if (task[0].author_id !== author_id) {
      const [subordinate] = await connection.query(
        "SELECT 1 FROM users WHERE id = ? AND manager_id = ?",
        [author_id, task[0].author_id]
      );

      if (subordinate.length === 0) {
        return res.json({ message: "Вы не можете обновлять эту задачу" });
      }

      if (status_id === undefined) {
        return res.json({
          message: "Вы можете изменять только статус задачи",
        });
      }

      await connection.query(
        "UPDATE tasks SET status_id = ?, updated_at = NOW() WHERE id = ?",
        [status_id, req.params.id]
      );

      return res.json({ message: "Статус задачи обновлён" });
    }

    const [currentTask] = await connection.query(
      "SELECT title, description, end_date, priority_id, status_id, responsible_id FROM tasks WHERE id = ?",
      [req.params.id]
    );

    const updatedTitle = title ?? currentTask[0].title;
    const updatedDescription = description ?? currentTask[0].description;
    const updatedEndDate = end_date ?? currentTask[0].end_date;
    const updatedPriorityId = priority_id ?? currentTask[0].priority_id;
    const updatedStatusId = status_id ?? currentTask[0].status_id;
    const updatedResponsibleId =
      responsible_id ?? currentTask[0].responsible_id;

    await connection.query(
      `UPDATE tasks 
       SET title = ?, description = ?, end_date = ?, priority_id = ?, 
           status_id = ?, responsible_id = ?, updated_at = NOW() 
       WHERE id = ?`,
      [
        updatedTitle,
        updatedDescription,
        updatedEndDate,
        updatedPriorityId,
        updatedStatusId,
        updatedResponsibleId,
        req.params.id,
      ]
    );

    res.json({ message: "Задача обновлена" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

const deleteTask = async (req, res) => {
  const userId = req.user.userId;
  try {
    const [task] = await connection.query(
      "SELECT author_id FROM tasks WHERE id = ?",
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

    const [rows] = await connection.query("DELETE FROM tasks WHERE id = ?", [
      req.params.id,
    ]);
    res.json({ message: "Задача удалена" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask };
