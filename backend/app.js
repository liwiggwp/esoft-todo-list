const express = require("express");
const tasks = require("./src/task/task");
const { router: auth } = require("./src/auth/auth");

const app = express();

app.use(express.json());
app.use("/tasks", tasks);
app.use("/auth", auth);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
