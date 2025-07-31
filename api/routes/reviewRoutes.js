const express = require("express");
const router = express.Router();
const { isAuthorized } = require("../middleware/authMiddleware");
const { addReview, getReviews } = require("../controllers/reviewController");

router.post("/review", isAuthorized, addReview);
router.get("/reviews", isAuthorized, getReviews);

module.exports = router;
