const users = require("../models/userModel");
const { getRandomNumber, generateToken } = require("../utils/commonFunc");
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
        const code = getRandomNumber(1000, 9999);
        const data = {
          sentOtp: code,
          updatedAt: new Date(),
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
          if (payload?.type === "login") {
            const tokenData = {
              id: isPhoneExist?.id,
              fullName: isPhoneExist?.fullName,
              email: isPhoneExist?.email,
              phone: isPhoneExist?.phone,
            };
            const generateTokenResult = generateToken(tokenData);
            tokenData.token = generateTokenResult;
            return successResponse(
              StatusCode.SUCCESS.OK,
              "OTP verified successfully!",
              tokenData
            );
          } else {
            return successResponse(
              StatusCode.SUCCESS.OK,
              "OTP verified successfully!"
            );
          }
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
            updatedAt: new Date(),
          };
          const updateUser = await findUser.update(data);
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
          updatedAt: new Date(),
        };
        const updateUser = await findUser.update(data);
        if (updateUser) {
          if (payload?.type === "signup") {
            const tokenData = {
              id: updateUser?.id,
              fullName: updateUser?.fullName,
              email: updateUser?.email,
              phone: updateUser?.phone,
            };
            const generateTokenResult = generateToken(tokenData);
            tokenData.token = generateTokenResult;
            return successResponse(
              StatusCode.SUCCESS.OK,
              "Profile created Successfully",
              tokenData
            );
          } else {
            return successResponse(
              StatusCode.SUCCESS.OK,
              "Profile updated Successfully"
            );
          }
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

const signInSendOtpUser = async (payload) => {
  try {
    const { phone } = payload;
    if (!phone) {
      return rejectResponse(
        StatusCode.CLIENT_ERROR.NOT_FOUND,
        "Phone is required!"
      );
    } else {
      const isPhoneExist = await users.findOne({
        where: {
          phone,
          isActive: false,
        },
      });
      if (isPhoneExist) {
        return rejectResponse(
          StatusCode.CLIENT_ERROR.CONFLICT,
          "Your profile is incomplete. Please complete your signup to proceed."
        );
      } else {
        const isActivePhoneExist = await users.findOne({
          where: {
            phone,
            isActive: true,
          },
        });

        if (isActivePhoneExist) {
          const code = getRandomNumber(100000, 900000);
          const data = {
            sentOtp: code,
            updatedAt: new Date(),
          };
          const isMessageSent = await sendCodeInNumber(code, phone);
          if (isMessageSent?.code === 200) {
            const updateUser = await isActivePhoneExist.update(data);
            if (updateUser) {
              return successResponse(
                StatusCode.SUCCESS.OK,
                "OTP has been sent successfully."
              );
            }
          }
        } else {
          return rejectResponse(
            StatusCode.CLIENT_ERROR.UNAUTHORIZED,
            "Unauthorized! Your account is not active."
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

module.exports = {
  signUpSendOtpUser,
  verifyOtpUser,
  resendOtpUser,
  updateUserProfileService,
  signInSendOtpUser,
};
