const express = require("express");
const router = express.Router();
const authRoutes = require("./authRoutes");
const userProfileRoutes = require("./userProfileRoutes");
const productRoutes = require("./productRoutes");
const wishlistRoutes = require("./wishlistRoutes");
const brandRoutes = require("./brandRoutes");
const cartRoutes = require("./cartRoutes");
const reviewRoutes = require("./reviewRoutes");
const taxesRoutes = require("./taxesRoutes");
const locationRoutes = require("./locationRoutes");
const returnPolicyRoutes = require("./returnPolicyRoutes");
const categoryRoutes = require("./categoryRoutes");
const userManagementRoutes = require("./userManagementRoutes");
const marketingMngRoutes = require("./marketingMngRoutes");
const vendorRoutes = require("./vendorRoutes");
const roleMngRoutes = require("./roleMngRoutes");

router.get("/", (req, res) => {
  res.send("Welcome to la-fetch backend");
});
router.use("/auth", authRoutes);
router.use("/profile", userProfileRoutes);
router.use("/", productRoutes);
router.use("/", wishlistRoutes);
router.use("/", brandRoutes);
router.use("/", cartRoutes);
router.use("/", reviewRoutes);
router.use("/", taxesRoutes);
router.use("/location", locationRoutes);
router.use("/", returnPolicyRoutes);
router.use("/", categoryRoutes);
router.use("/", userManagementRoutes);
router.use("/", marketingMngRoutes);
router.use("/", vendorRoutes);
router.use("/", roleMngRoutes);

module.exports = router;
