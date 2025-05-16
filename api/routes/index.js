const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes')

router.get("/", (req, res) => {
  res.send("Welcome to la-fetch backend");
});
router.use("/auth", authRoutes)

module.exports = router;