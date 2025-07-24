const express = require("express");
const router = express.Router();
const { isAuthorized } = require("../middleware/authMiddleware");
const { getRoles } = require("../controllers/roleMngController");

router.get("/roles", isAuthorized, getRoles);

module.exports = router;
