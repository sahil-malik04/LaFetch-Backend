const {
  addWarehouseUser,
  getWarehousesUser,
  updateWarehouseUser,
  deleteWarehouseUser,
} = require("../services/warehouseServices");

const addWarehouse = async (req, res) => {
  try {
    const body = req.body;
    const result = await addWarehouseUser(body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const getWarehouses = async (req, res) => {
  try {
    const vendorID = req.user.vendorID;
    const result = await getWarehousesUser(vendorID);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const updateWarehouse = async (req, res) => {
  try {
    const params = req.params;
    const body = req.body;
    const result = await updateWarehouseUser(params, body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const deleteWarehouse = async (req, res) => {
  try {
    const params = req.params;
    const result = await deleteWarehouseUser(params);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

module.exports = {
  addWarehouse,
  getWarehouses,
  updateWarehouse,
  deleteWarehouse,
};
