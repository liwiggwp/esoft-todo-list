const express = require("express");
const {getTasks, getTaskById} = require("../controllers/task");
const router = express.Router();
const { authenticate } = require("../auth/auth");

router.get("/", authenticate, getTasks);
router.get("/:id", authenticate, getTaskById);

module.exports = router;