const express = require("express");
const router = express.Router();
const { isAuthorized } = require("../middleware/authMiddleware");
const {
  getInternalUsers,
  getCustomers,
} = require("../controllers/userManagementController");

router.get("/internal-users", isAuthorized, getInternalUsers);
router.get("/customers", isAuthorized, getCustomers);

module.exports = router;
