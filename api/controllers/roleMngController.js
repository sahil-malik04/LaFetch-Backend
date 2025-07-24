const { getRolesUser } = require("../services/roleMngServices");

const getRoles = async (req, res) => {
  try {
    const result = await getRolesUser();
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

module.exports = {
  getRoles,
};
