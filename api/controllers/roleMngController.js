const {
  getRolesUser,
  updateRoleUser,
  deleteRoleUser,
  createRoleUser,
} = require("../services/roleMngServices");

const getRoles = async (req, res) => {
  try {
    const result = await getRolesUser();
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const updateRole = async (req, res) => {
  try {
    const params = req.params;
    const payload = req.body;
    const result = await updateRoleUser(params, payload);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const deleteRole = async (req, res) => {
  try {
    const params = req.params;
    const result = await deleteRoleUser(params);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const createRole = async (req, res) => {
  try {
    const body = req.body;
    const result = await createRoleUser(body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

module.exports = {
  getRoles,
  updateRole,
  deleteRole,
  createRole,
};
