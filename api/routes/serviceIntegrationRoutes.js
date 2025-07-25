const express = require("express");
const router = express.Router();
const { isAuthorized } = require("../middleware/authMiddleware");
const {
  getServicesIntegration,
} = require("../controllers/serviceIntegrationController");

router.get("/services-integration", isAuthorized, getServicesIntegration);

module.exports = router;
