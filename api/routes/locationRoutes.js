const express = require("express");
const router = express.Router();
const { isAuthorized } = require("../middleware/authMiddleware");
const {
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
} = require("../controllers/locationController");

// countries
router.post("/country", isAuthorized, addCountry);
router.put("/country/:countryId", isAuthorized, editCountry);
router.delete("/country/:countryId", isAuthorized, deleteCountry);

// states
router.post("/state", isAuthorized, addState);
router.put("/state/:stateId", isAuthorized, editState);
router.delete("/state/:stateId", isAuthorized, deleteState);

// cities
router.post("/city", isAuthorized, addCity);
router.put("/city/:cityId", isAuthorized, editCity);
router.delete("/city/:cityId", isAuthorized, deleteCity);

router.get("/", fetchLocations);

module.exports = router;
