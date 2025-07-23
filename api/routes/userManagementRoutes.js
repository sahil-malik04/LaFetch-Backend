const express = require("express");
const router = express.Router();
const { isAuthorized } = require("../middleware/authMiddleware");
const {
  getInternalUsers,
  getCustomers,
  onboardInternalUser,
} = require("../controllers/userManagementController");

router.get("/internal-users", isAuthorized, getInternalUsers);
router.get("/customers", isAuthorized, getCustomers);
router.post("/onboard-internal-user", isAuthorized, onboardInternalUser);

module.exports = router;
