const express = require("express");
const router = express.Router();
const { isAuthorized } = require("../middleware/authMiddleware");
const {
  getShopifyAccounts,
  addShopifyAccount,
  updateShopifyAccount,
  deleteShopifyAccount,
} = require("../controllers/shopifyMngController");

router.get("/shopify-accounts", isAuthorized, getShopifyAccounts);
router.post("/shopify-account", isAuthorized, addShopifyAccount);
router.put("/shopify-account/:accountId", isAuthorized, updateShopifyAccount);
router.delete("/shopify-account/:accountId", isAuthorized, deleteShopifyAccount);

module.exports = router;
