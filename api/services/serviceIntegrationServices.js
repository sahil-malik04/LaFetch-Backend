const servicesIntegration = require("../models/servicesIntegrationModel");
const { rejectResponse, successResponse } = require("../utils/response");
const { statusCode } = require("../utils/statusCode");

const getServicesIntegrationUser = async () => {
  try {
    const result = await servicesIntegration.findAll();
    return successResponse(statusCode.SUCCESS.OK, "Success!", result);
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

module.exports = {
  getServicesIntegrationUser,
};
