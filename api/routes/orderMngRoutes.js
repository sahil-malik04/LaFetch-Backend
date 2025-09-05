const express = require("express");
const router = express.Router();
const { isAuthorized } = require("../middleware/authMiddleware");
const {
  placeOrder,
  orderHistory,
  requestReturn,
  returnHistory,
  requestExchange,
  exchangeHistory,
} = require("../controllers/orderMngController");

router.post("/place-order", isAuthorized, placeOrder);
router.get("/order-history/:userId", isAuthorized, orderHistory);

// return order
router.post("/request-return", isAuthorized, requestReturn);
router.get("/return-history/:userId", isAuthorized, returnHistory);

// return order
router.post("/request-exchange", isAuthorized, requestExchange);
router.get("/exchange-history/:userId", isAuthorized, exchangeHistory);

module.exports = router;
