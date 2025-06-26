const express = require("express");
const router = express.Router();
const { isAuthorized } = require("../middleware/authMiddleware");
const {
  getReturnPolicies,
  addReturnPolicy,
  updateReturnPolicy,
  deleteReturnPolicy,
} = require("../controllers/returnPolicyController");

router.get("/return-policies", isAuthorized, getReturnPolicies);
router.post("/return-policy", isAuthorized, addReturnPolicy);
router.put("/return-policy/:policyId", isAuthorized, updateReturnPolicy);
router.delete("/return-policy/:policyId", isAuthorized, deleteReturnPolicy);

module.exports = router;
