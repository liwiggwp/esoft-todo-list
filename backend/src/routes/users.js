const express = require("express");
const { getSubordinatesUsers } = require("../controllers/user");
const router = express.Router();
const { authenticate } = require("../controllers/auth");

router.get("/subordinates-users", authenticate, getSubordinatesUsers);

module.exports = router;
