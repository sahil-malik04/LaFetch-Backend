const express = require("express");
const router = express.Router();
const { isAuthorized } = require("../middleware/authMiddleware");
const {
  getRoles,
  updateRole,
  deleteRole,
  createRole,
} = require("../controllers/roleMngController");

router.get("/roles", isAuthorized, getRoles);
router.put("/role/:roleId", isAuthorized, updateRole);
router.delete("/role/:roleId", isAuthorized, deleteRole);
router.post("/role", isAuthorized, createRole);

module.exports = router;
