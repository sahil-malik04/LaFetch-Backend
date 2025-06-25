const express = require("express");
const router = express.Router();
const { isAuthorized } = require("../middleware/authMiddleware");
const {
  getTaxes,
  addTax,
  updateTax,
  deleteTax,
} = require("../controllers/taxesController");

router.post("/tax", isAuthorized, addTax);
router.get("/taxes", isAuthorized, getTaxes);
router.put("/tax/:taxId", isAuthorized, updateTax);
router.delete("/tax/:taxId", isAuthorized, deleteTax);

module.exports = router;
