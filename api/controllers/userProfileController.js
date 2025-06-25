const {
  getUserProfileService,
  addAddressUser,
  getAddressUser,
  updateAddressUser,
  deleteAddressUser,
} = require("../services/userProfileServices");

const getUserProfile = async (req, res) => {
  try {
    const payload = req.params;
    const result = await getUserProfileService(payload);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const addAddress = async (req, res) => {
  try {
    const payload = req.body;
    const result = await addAddressUser(payload);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const getAddress = async (req, res) => {
  try {
    const payload = req.params;
    const result = await getAddressUser(payload);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const updateAddress = async (req, res) => {
  try {
    const payload = req.body;
    const result = await updateAddressUser(payload);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const deleteAddress = async (req, res) => {
  try {
    const payload = req.params;
    const result = await deleteAddressUser(payload);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

module.exports = {
  getUserProfile,
  addAddress,
  getAddress,
  updateAddress,
  deleteAddress,
};
