const express = require("express");
const taskRoutes = require("./src/routes/tasks");
const authRoutes = require("./src/routes/auth");

const app = express();

app.use(express.json());
app.use("/tasks", taskRoutes);
app.use("/auth", authRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
