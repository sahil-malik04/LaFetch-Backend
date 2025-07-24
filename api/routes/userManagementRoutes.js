const express = require("express");
const router = express.Router();
const { isAuthorized } = require("../middleware/authMiddleware");
const {
  getInternalUsers,
  getCustomers,
  onboardInternalUser,
  updateInternalUser,
  deleteInternalUser,
} = require("../controllers/userManagementController");

router.get("/internal-users", isAuthorized, getInternalUsers);
router.get("/customers", isAuthorized, getCustomers);
router.post("/onboard-internal-user", isAuthorized, onboardInternalUser);
router.put("/internal-user/:userId", isAuthorized, updateInternalUser);
router.delete("/internal-user/:userId", isAuthorized, deleteInternalUser);

module.exports = router;
