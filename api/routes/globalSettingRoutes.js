const express = require("express");
const router = express.Router();
const { isAuthorized } = require("../middleware/authMiddleware");
const {
  adminSettings,
  updateAdminSettings,
  addBrandSettings,
  getBrandSettings,
  getFeesGlobal,
  updateFeesGlobal,
} = require("../controllers/globalSettingController");

router.get("/admin/settings/global", isAuthorized, adminSettings);
router.put("/admin/settings/global", isAuthorized, updateAdminSettings);

// brand setting
router.put("/admin/settings/brands/:brandId", isAuthorized, addBrandSettings);
router.get("/admin/settings/brands/:brandId", isAuthorized, getBrandSettings);

// fees setting
router.get("/admin/settings/fees/global", isAuthorized, getFeesGlobal);
router.put("/admin/settings/fees/global", isAuthorized, updateFeesGlobal);

module.exports = router;
