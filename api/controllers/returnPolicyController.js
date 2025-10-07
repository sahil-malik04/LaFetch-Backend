const {
  getReturnPoliciesUser,
  addReturnPolicyUser,
  updateReturnPolicyUser,
  deleteReturnPolicyUser,
} = require("../services/returnPolicyServices");

const getReturnPolicies = async (req, res) => {
  try {
    const vendorID = req.user.vendorID;
    const result = await getReturnPoliciesUser(vendorID);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const addReturnPolicy = async (req, res) => {
  try {
    const payload = req.body;
    const result = await addReturnPolicyUser(payload);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const updateReturnPolicy = async (req, res) => {
  try {
    const params = req.params;
    const body = req.body;
    const result = await updateReturnPolicyUser(params, body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const deleteReturnPolicy = async (req, res) => {
  try {
    const params = req.params;
    const result = await deleteReturnPolicyUser(params);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

module.exports = {
  getReturnPolicies,
  addReturnPolicy,
  updateReturnPolicy,
  deleteReturnPolicy,
};
