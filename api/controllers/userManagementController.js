const {
  getInternalUsersService,
  getCustomersService,
  onboardInternalUserService,
  updateInternalUserService,
  deleteInternalUserService,
} = require("../services/userManagementServices");

const getInternalUsers = async (req, res) => {
  try {
    const result = await getInternalUsersService();
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const getCustomers = async (req, res) => {
  try {
    const result = await getCustomersService();
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const onboardInternalUser = async (req, res) => {
  try {
    const payload = req.body;
    const result = await onboardInternalUserService(payload);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const updateInternalUser = async (req, res) => {
  try {
    const params = req.params;
    const body = req.body;
    const result = await updateInternalUserService(params, body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const deleteInternalUser = async (req, res) => {
  try {
    const params = req.params;
    const result = await deleteInternalUserService(params);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

module.exports = {
  getInternalUsers,
  getCustomers,
  onboardInternalUser,
  updateInternalUser,
  deleteInternalUser,
};
