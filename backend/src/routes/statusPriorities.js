const express = require("express");
const { getStatuses, getPriorities } = require("../controllers/statusPriority");
const router = express.Router();

router.get("/statuses", getStatuses);
router.get("/priorities", getPriorities);

module.exports = router;
