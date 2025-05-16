const { default: axios } = require("axios");
const { rejectResponse } = require("../utils/response");
const StatusCode = require("../utils/statusCode");

// Function to send code in mobile number
const sendCodeInNumber = async (code, phone) => {
  const apiId = process.env.API_ID;
  const apiPassword = process.env.API_PASSWORD;
  const sender = process.env.SENDER;
  const number = phone;
  const otp = code;
  const message = `Your Lafetch verification code is: ${otp}. Please do not share this OTP. Regards Lafetch`;
  const templateId = process.env.TEMPLATE_ID;

  try {
    const baseURL = "https://www.bulksmsplans.com/api";
    const endPoint = `${baseURL}/send_sms?api_id=${apiId}&api_password=${apiPassword}&sms_type=Transactional&sms_encoding=text&sender=${sender}&number=${number}&message=${message}&template_id=${templateId}`;
    const result = await axios.get(endPoint);
    if (result?.data?.code === 200) {
      return result?.data;
    }
  } catch (error) {
    throw rejectResponse(
      StatusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      error.message
    );
  }
};

module.exports = {
  sendCodeInNumber,
};
