const {
  onboardVendorUser,
  updateVendorUser,
  getVendorsUser,
  vendorStatusUser,
  vendorDocumentsUser,
  vendorDocumentStatusUser,
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
    const reqFiles = req.files;
    const result = await updateVendorUser(params, body, reqFiles);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const getVendors = async (req, res) => {
  try {
    const query = req.query;
    const result = await getVendorsUser(query);
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

const vendorDocuments = async (req, res) => {
  try {
    const params = req.params;
    const result = await vendorDocumentsUser(params);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const vendorDocumentStatus = async (req, res) => {
  try {
    const params = req.params;
    const query = req.query;
    const result = await vendorDocumentStatusUser(params, query);
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
  vendorDocuments,
  vendorDocumentStatus
};
