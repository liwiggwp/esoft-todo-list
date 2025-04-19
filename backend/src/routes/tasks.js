const express = require("express");
const { getTasks, getTaskById, createTask, updateTask, deleteTask } = require("../controllers/task");
const router = express.Router();
const { authenticate } = require("../controllers/auth");

router.get("/", authenticate, getTasks);
router.get("/:id", authenticate, getTaskById);
router.post("/", authenticate, createTask);
router.put("/:id", authenticate, updateTask);
router.delete("/:id", authenticate, deleteTask);

module.exports = router;
