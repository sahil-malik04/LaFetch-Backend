const users = require("../models/userModel");
const { getRandomNumber } = require("../utils/commonFunc");
const { rejectResponse, successResponse } = require("../utils/response");
const StatusCode = require("../utils/statusCode");
const { sendCodeInNumber } = require("./bulkSMSService");

const signUpSendOtpUser = async (payload) => {
  try {
    const { phone } = payload;
    if (!phone) {
      return rejectResponse(
        StatusCode.CLIENT_ERROR.NOT_FOUND,
        "Phone is required!"
      );
    } else {
      const isActivePhoneExist = await users.findOne({
        where: {
          phone,
          isActive: true,
        },
      });
      if (isActivePhoneExist) {
        return rejectResponse(
          StatusCode.CLIENT_ERROR.CONFLICT,
          "This phone number is already registered. Please log in instead."
        );
      } else {
        const code = getRandomNumber(100000, 900000);
        const data = {
          sentOtp: code,
        };
        const isMessageSent = await sendCodeInNumber(code, phone);

        if (isMessageSent?.code === 200) {
          const isPhoneExist = await users.findOne({
            where: {
              phone,
            },
          });
          if (isPhoneExist) {
            const updateUser = await isPhoneExist.update(data);
            if (updateUser) {
              return successResponse(
                StatusCode.SUCCESS.OK,
                "OTP has been sent successfully."
              );
            }
          } else {
            data.phone = phone;

            const createUser = await users.create(data);
            if (createUser) {
              return successResponse(
                StatusCode.SUCCESS.OK,
                "OTP has been sent successfully."
              );
            }
          }
        }
      }
    }
  } catch (err) {
    throw rejectResponse(
      StatusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const verifyOtpUser = async (payload) => {
  try {
    const { phone, otp } = payload;
    if (!phone || !otp) {
      return rejectResponse(
        StatusCode.CLIENT_ERROR.NOT_FOUND,
        "Phone and otp is required!"
      );
    } else {
      const isPhoneExist = await users.findOne({
        where: {
          phone,
        },
      });
      if (!isPhoneExist) {
        return rejectResponse(
          StatusCode.CLIENT_ERROR.NOT_FOUND,
          "Phone No. doesn't Exist! Please check your Phone No. and try again!"
        );
      } else {
        if (Number(isPhoneExist?.sentOtp) === Number(otp)) {
          return successResponse(
            StatusCode.SUCCESS.OK,
            "OTP verified successfully!"
          );
        } else {
          return rejectResponse(
            StatusCode.CLIENT_ERROR.NOT_FOUND,
            "Incorrect OTP, Please try again!"
          );
        }
      }
    }
  } catch (err) {
    throw rejectResponse(
      StatusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const resendOtpUser = async (payload) => {
  try {
    const { phone } = payload;
    if (!phone) {
      return rejectResponse(
        StatusCode.CLIENT_ERROR.NOT_FOUND,
        "Phone is required!"
      );
    } else {
      const code = getRandomNumber(100000, 900000);
      const isMessageSent = await sendCodeInNumber(code, phone);
      if (isMessageSent?.code === 200) {
        const findUser = await users.findOne({
          where: {
            phone,
          },
        });
        if (findUser) {
          const data = {
            sentOtp: code,
          };
          const updateUser = findUser.update(data);
          if (updateUser) {
            return successResponse(
              StatusCode.SUCCESS.OK,
              "OTP has been sent successfully."
            );
          }
        } else {
          return rejectResponse(
            StatusCode.CLIENT_ERROR.NOT_FOUND,
            "Phone No. doesn't Exist! Please check your Phone No. and try again!"
          );
        }
      }
    }
  } catch (err) {
    throw rejectResponse(
      StatusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const updateUserProfileService = async (payload) => {
  try {
    const { phone, email, gender, fullName } = payload;
    if (!phone || !email || !gender || !fullName) {
      return rejectResponse(
        StatusCode.CLIENT_ERROR.BAD_REQUEST,
        "Validation Error!"
      );
    } else {
      const findUser = await users.findOne({
        where: {
          phone,
        },
      });
      if (findUser) {
        const data = {
          fullName,
          email,
          gender,
          isActive: true,
          isLoggedIn: true,
        };
        const updateUser = findUser.update(data);
        if (updateUser) {
          return successResponse(
            StatusCode.SUCCESS.OK,
            "Profile created Successfully"
          );
        }
      } else {
        return rejectResponse(
          StatusCode.CLIENT_ERROR.NOT_FOUND,
          "Phone No. doesn't Exist! Please check your Phone No. and try again!"
        );
      }
    }
  } catch (err) {
    throw rejectResponse(
      StatusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

module.exports = {
  signUpSendOtpUser,
  verifyOtpUser,
  resendOtpUser,
  updateUserProfileService,
};
