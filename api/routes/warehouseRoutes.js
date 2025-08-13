const express = require("express");
const router = express.Router();
const { isAuthorized } = require("../middleware/authMiddleware");
const {
  getWarehouses,
  addWarehouse,
  updateWarehouse,
  deleteWarehouse,
} = require("../controllers/warehouseController");

router.get("/warehouses", isAuthorized, getWarehouses);
router.post("/warehouse", isAuthorized, addWarehouse);
router.put("/warehouse/:warehouseId", isAuthorized, updateWarehouse);
router.delete("/warehouse/:warehouseId", isAuthorized, deleteWarehouse);

module.exports = router;
