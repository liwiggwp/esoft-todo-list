const express = require("express");
const { tasks } = require("./data/task");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.get("/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id, 10));
  if (task) {
    res.json(task);
  } else {
    return res.status(404).json({ message: "Задача не найдена" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
