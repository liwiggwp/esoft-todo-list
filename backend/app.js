const express = require("express");
const taskRoutes = require("./src/routes/tasks");
const authRoutes = require("./src/routes/auth");
const userRoutes = require("./src/routes/users");
const statusPriorityRoutes = require("./src/routes/statusPriorities");

const app = express();

app.use(express.json());
app.use("/tasks", taskRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/", statusPriorityRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
