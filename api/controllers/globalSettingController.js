const {
  adminSettingsUser,
  updateAdminSettingsUser,
  addBrandSettingsUser,
  getBrandSettingsUser,
  getFeesGlobalUser,
  updateFeesGlobalUser,
} = require("../services/globalSettingServices");

const adminSettings = async (req, res) => {
  try {
    const result = await adminSettingsUser();
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const updateAdminSettings = async (req, res) => {
  try {
    const payload = req.body;
    const result = await updateAdminSettingsUser(payload);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const addBrandSettings = async (req, res) => {
  try {
    const params = req.params;
    const payload = req.body;
    const result = await addBrandSettingsUser(params, payload);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const getBrandSettings = async (req, res) => {
  try {
    const params = req.params;
    const result = await getBrandSettingsUser(params);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const getFeesGlobal = async (req, res) => {
  try {
    const params = req.params;
    const result = await getFeesGlobalUser(params);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const updateFeesGlobal = async (req, res) => {
  try {
    const payload = req.body;
    const result = await updateFeesGlobalUser(payload);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

module.exports = {
  adminSettings,
  updateAdminSettings,
  addBrandSettings,
  getBrandSettings,
  getFeesGlobal,
  updateFeesGlobal,
};
