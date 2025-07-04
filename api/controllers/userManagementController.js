const {
  getInternalUsersService,
  getCustomersService,
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

module.exports = {
  getInternalUsers,
  getCustomers
};
