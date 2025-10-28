const express = require("express");
const router = express.Router();
const { isAuthorized } = require("../middleware/authMiddleware");
const {
  createPushCompaign,
  updatePushCompaign,
  getPushCompaigns,
  deletePushCompaign,
  sendCompaignNotification,
  createFCMToken,
} = require("../controllers/pushCompaignController");

// fcm
router.post("/fcm-token", isAuthorized, createFCMToken);

router.post("/push-campaign", isAuthorized, createPushCompaign);
router.put("/push-campaign/:id", isAuthorized, updatePushCompaign);
router.get("/push-campaigns", isAuthorized, getPushCompaigns);
router.delete("/push-campaign/:id", isAuthorized, deletePushCompaign);
router.post(
  "/send-push-notification/:id",
  isAuthorized,
  sendCompaignNotification
);

module.exports = router;
