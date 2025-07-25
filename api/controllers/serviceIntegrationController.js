const {
  getServicesIntegrationUser,
} = require("../services/serviceIntegrationServices");

const getServicesIntegration = async (req, res) => {
  try {
    const result = await getServicesIntegrationUser();
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

module.exports = {
  getServicesIntegration,
};
