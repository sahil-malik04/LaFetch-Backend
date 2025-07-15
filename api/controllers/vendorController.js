const {
  onboardVendorUser,
  updateVendorUser,
  getVendorsUser,
  vendorStatusUser,
} = require("../services/vendorServices");

const onboardVendor = async (req, res) => {
  try {
    const body = req.body;
    const result = await onboardVendorUser(body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const updateVendor = async (req, res) => {
  try {
    const params = req.params;
    const body = req.body;
    const result = await updateVendorUser(params, body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const getVendors = async (req, res) => {
  try {
    const result = await getVendorsUser();
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const vendorStatus = async (req, res) => {
  try {
    const query = req.query;
    const params = req.params;
    const result = await vendorStatusUser(query, params);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

module.exports = {
  onboardVendor,
  updateVendor,
  getVendors,
  vendorStatus,
};
