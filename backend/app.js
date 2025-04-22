const express = require("express");
const taskRoutes = require("./src/routes/tasks");
const authRoutes = require("./src/routes/auth");
const userRoutes = require("./src/routes/users");
const statusPriorityRoutes = require("./src/routes/statusPriorities");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/tasks", taskRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/", statusPriorityRoutes);

const BACK_HOST = process.env.BACK_HOST;

app.listen(BACK_HOST, () => {
  console.log(`Сервер запущен на http://${BACK_HOST}`);
});
