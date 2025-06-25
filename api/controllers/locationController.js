const {
  addCountryUser,
  editCountryUser,
  deleteCountryUser,
  addStateUser,
  editStateUser,
  deleteStateUser,
  addCityUser,
  editCityUser,
  deleteCityUser,
  fetchLocationsUser,
} = require("../services/locationServices");

const addCountry = async (req, res) => {
  try {
    const body = req.body;
    const result = await addCountryUser(body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const editCountry = async (req, res) => {
  try {
    const params = req.params;
    const body = req.body;
    const result = await editCountryUser(params, body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const deleteCountry = async (req, res) => {
  try {
    const params = req.params;
    const result = await deleteCountryUser(params);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const addState = async (req, res) => {
  try {
    const body = req.body;
    const result = await addStateUser(body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const editState = async (req, res) => {
  try {
    const params = req.params;
    const body = req.body;
    const result = await editStateUser(params, body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const deleteState = async (req, res) => {
  try {
    const params = req.params;
    const result = await deleteStateUser(params);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const addCity = async (req, res) => {
  try {
    const body = req.body;
    const result = await addCityUser(body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const editCity = async (req, res) => {
  try {
    const params = req.params;
    const body = req.body;
    const result = await editCityUser(params, body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const deleteCity = async (req, res) => {
  try {
    const params = req.params;
    const result = await deleteCityUser(params);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const fetchLocations = async (req, res) => {
  try {
    const query = req.query;
    const result = await fetchLocationsUser(query);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

module.exports = {
  addCountry,
  editCountry,
  deleteCountry,
  addState,
  editState,
  deleteState,
  addCity,
  editCity,
  deleteCity,
  fetchLocations,
};
