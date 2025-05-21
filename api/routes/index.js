const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes')
const userProfileRoutes = require('./userProfileRoutes')

router.get("/", (req, res) => {
  res.send("Welcome to la-fetch backend");
});
router.use("/auth", authRoutes)
router.use("/profile", userProfileRoutes)

module.exports = router;