const { fn, col, where } = require("sequelize");
const countries = require("../models/countryModel");
const { statusCode } = require("../utils/statusCode");
const { rejectResponse, successResponse } = require("../utils/response");
const states = require("../models/stateModel");
const cities = require("../models/citiesModel");

const addCountryUser = async (body) => {
  try {
    const isCountryExist = await countries.findOne({
      where: where(fn("LOWER", col("name")), body?.name?.toLowerCase()),
    });

    if (isCountryExist) {
      return rejectResponse(
        statusCode.CLIENT_ERROR.CONFLICT,
        "Country already exist!"
      );
    } else {
      const data = {
        code: body?.code,
        name: body?.name,
      };
      const result = await countries.create(data);
      if (result) {
        return successResponse(
          statusCode.SUCCESS.CREATED,
          "Country added successfully!"
        );
      }
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const editCountryUser = async (params, body) => {
  try {
    const isCountryExist = await countries.findOne({
      where: {
        id: params?.countryId,
      },
    });

    if (isCountryExist) {
      const data = {
        code: body?.code,
        name: body?.name,
      };
      const result = await isCountryExist.update(data);
      if (result) {
        return successResponse(
          statusCode.SUCCESS.OK,
          "Country updated successfully!"
        );
      }
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "Country doesn't exist!"
      );
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const deleteCountryUser = async (params, body) => {
  try {
    const isCountryExist = await countries.findOne({
      where: {
        id: params?.countryId,
      },
    });

    if (isCountryExist) {
      const result = await isCountryExist.destroy();
      if (result) {
        return successResponse(
          statusCode.SUCCESS.OK,
          "Country deleted successfully!"
        );
      }
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "Country doesn't exist!"
      );
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const addStateUser = async (body) => {
  try {
    const isStateExist = await states.findOne({
      where: where(fn("LOWER", col("name")), body?.name?.toLowerCase()),
    });

    if (isStateExist) {
      return rejectResponse(
        statusCode.CLIENT_ERROR.CONFLICT,
        "State already exist!"
      );
    } else {
      const data = {
        stateId: body?.stateId,
        name: body?.name,
      };
      const result = await states.create(data);
      if (result) {
        return successResponse(
          statusCode.SUCCESS.CREATED,
          "State added successfully!"
        );
      }
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const editStateUser = async (params, body) => {
  try {
    const isStateExist = await states.findOne({
      where: {
        id: params?.stateId,
      },
    });

    if (isStateExist) {
      const data = {
        stateId: body?.stateId,
        name: body?.name,
      };
      const result = await isStateExist.update(data);
      if (result) {
        return successResponse(
          statusCode.SUCCESS.OK,
          "State updated successfully!"
        );
      }
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "State doesn't exist!"
      );
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const deleteStateUser = async (params, body) => {
  try {
    const isStateExist = await states.findOne({
      where: {
        id: params?.stateId,
      },
    });

    if (isStateExist) {
      const result = await isStateExist.destroy();
      if (result) {
        return successResponse(
          statusCode.SUCCESS.OK,
          "State deleted successfully!"
        );
      }
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "State doesn't exist!"
      );
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const addCityUser = async (body) => {
  try {
    const isCityExist = await cities.findOne({
      where: where(fn("LOWER", col("name")), body?.name?.toLowerCase()),
    });

    if (isCityExist) {
      return rejectResponse(
        statusCode.CLIENT_ERROR.CONFLICT,
        "City already exist!"
      );
    } else {
      const data = {
        stateId: body?.stateId,
        name: body?.name,
      };

      const result = await cities.create(data);
      if (result) {
        return successResponse(
          statusCode.SUCCESS.CREATED,
          "City added successfully!"
        );
      }
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const editCityUser = async (params, body) => {
  try {
    const isCityExist = await cities.findOne({
      where: {
        id: params?.cityId,
      },
    });

    if (isCityExist) {
      const data = {
        stateId: body?.stateId,
        name: body?.name,
      };
      const result = await isCityExist.update(data);
      if (result) {
        return successResponse(
          statusCode.SUCCESS.OK,
          "City updated successfully!"
        );
      }
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "City doesn't exist!"
      );
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const deleteCityUser = async (params, body) => {
  try {
    const isCityExist = await cities.findOne({
      where: {
        id: params?.cityId,
      },
    });

    if (isCityExist) {
      const result = await isCityExist.destroy();
      if (result) {
        return successResponse(
          statusCode.SUCCESS.OK,
          "City deleted successfully!"
        );
      }
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "City doesn't exist!"
      );
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const fetchLocationsUser = async (query) => {
  try {
    const locationModels = {
      countries,
      states,
      cities,
    };
    const dataToFetch = locationModels[query.fetch];

    if (dataToFetch) {
      const result = await dataToFetch.findAll();
      if (result) {
        return successResponse(statusCode.SUCCESS.OK, "Success!", result);
      } else {
        return rejectResponse(
          statusCode.CLIENT_ERROR.NOT_FOUND,
          responseMessages.USER_NOT_EXIST
        );
      }
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.BAD_REQUEST,
        "Invalid fetch type!"
      );
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

module.exports = {
  addCountryUser,
  editCountryUser,
  deleteCountryUser,
  addStateUser,
  editStateUser,
  deleteStateUser,
  addCityUser,
  editCityUser,
  deleteCityUser,
  fetchLocationsUser
};
