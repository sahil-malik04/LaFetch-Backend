const users = require("../models/userModel");
const {
  getRandomNumber,
  generateToken,
  verifyToken,
} = require("../utils/commonFunc");
const {
  otpStartRange,
  otpEndRange,
  responseMessages,
} = require("../utils/dataUtils");
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
      const isAccountDeleted = await users.findOne({
        where: {
          phone,
          isAccountDeleted: true,
        },
      });
      if (isAccountDeleted) {
        return rejectResponse(
          StatusCode.CLIENT_ERROR.FORBIDDEN,
          responseMessages.ACCOUNT_DELETED
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
            responseMessages.PHONE_ALREADY_EXIST
          );
        } else {
          const code = getRandomNumber(otpStartRange, otpEndRange);
          const data = {
            sentOtp: code,
            updatedAt: new Date(),
          };
          // const isMessageSent = await sendCodeInNumber(code, phone);

          // if (isMessageSent?.code === 200) {
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
                responseMessages.OTP_SENT
              );
            }
          } else {
            data.phone = phone;

            const createUser = await users.create(data);
            if (createUser) {
              return successResponse(
                StatusCode.SUCCESS.OK,
                responseMessages.OTP_SENT
              );
            }
          }
          // }
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
          responseMessages.PHONE_NOT_EXIST
        );
      } else {
        if (isPhoneExist.isAccountDeleted) {
          return rejectResponse(
            StatusCode.CLIENT_ERROR.FORBIDDEN,
            responseMessages.ACCOUNT_DELETED
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
              const generateTokenResult = generateToken(tokenData, "1h");
              const generateRefreshTokenResult = generateToken(tokenData, "7d");
              if (generateToken) tokenData.token = generateTokenResult;
              if (generateRefreshTokenResult) {
                const data = {
                  refreshToken: generateRefreshTokenResult,
                };
                const updateUser = await isPhoneExist.update(data);
                if (updateUser) {
                  tokenData.refreshToken = generateRefreshTokenResult;
                }
              }
              return successResponse(
                StatusCode.SUCCESS.OK,
                responseMessages.OTP_VERIFIED,
                tokenData
              );
            } else {
              return successResponse(
                StatusCode.SUCCESS.OK,
                responseMessages.OTP_VERIFIED
              );
            }
          } else {
            return rejectResponse(
              StatusCode.CLIENT_ERROR.NOT_FOUND,
              responseMessages.INCORRECT_OTP
            );
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

const resendOtpUser = async (payload) => {
  try {
    const { phone } = payload;
    if (!phone) {
      return rejectResponse(
        StatusCode.CLIENT_ERROR.NOT_FOUND,
        "Phone is required!"
      );
    } else {
      const code = getRandomNumber(otpStartRange, otpEndRange);

      const findUser = await users.findOne({
        where: {
          phone,
        },
      });
      if (findUser) {
        if (findUser.isAccountDeleted) {
          return rejectResponse(
            StatusCode.CLIENT_ERROR.FORBIDDEN,
            responseMessages.ACCOUNT_DELETED
          );
        } else {
          // const isMessageSent = await sendCodeInNumber(code, phone);
          // if (isMessageSent?.code === 200) {
          const data = {
            sentOtp: code,
            updatedAt: new Date(),
          };
          const updateUser = await findUser.update(data);
          if (updateUser) {
            return successResponse(
              StatusCode.SUCCESS.OK,
              responseMessages.OTP_SENT
            );
          }
          // }
        }
      } else {
        return rejectResponse(
          StatusCode.CLIENT_ERROR.NOT_FOUND,
          responseMessages.PHONE_NOT_EXIST
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
        if (findUser.isAccountDeleted) {
          return rejectResponse(
            StatusCode.CLIENT_ERROR.FORBIDDEN,
            responseMessages.ACCOUNT_DELETED
          );
        } else {
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
              const generateTokenResult = generateToken(tokenData, "1h");
              const generateRefreshTokenResult = generateToken(tokenData, "7d");
              if (generateTokenResult) tokenData.token = generateTokenResult;
              if (generateRefreshTokenResult) {
                const data = {
                  refreshToken: generateRefreshTokenResult,
                };
                const updateUser = await findUser.update(data);
                if (updateUser) {
                  tokenData.refreshToken = generateRefreshTokenResult;
                }
              }
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
        }
      } else {
        return rejectResponse(
          StatusCode.CLIENT_ERROR.NOT_FOUND,
          responseMessages.PHONE_NOT_EXIST
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
          responseMessages.INCOMPLETE_USER_PROFILE
        );
      } else {
        const isActivePhoneExist = await users.findOne({
          where: {
            phone,
            isActive: true,
          },
        });

        if (isActivePhoneExist) {
          if (isActivePhoneExist.isAccountDeleted) {
            return rejectResponse(
              StatusCode.CLIENT_ERROR.FORBIDDEN,
              responseMessages.ACCOUNT_DELETED
            );
          } else {
            const code = getRandomNumber(otpStartRange, otpEndRange);
            const data = {
              sentOtp: code,
              updatedAt: new Date(),
            };
            // const isMessageSent = await sendCodeInNumber(code, phone);
            // if (isMessageSent?.code === 200) {
            const updateUser = await isActivePhoneExist.update(data);
            if (updateUser) {
              return successResponse(
                StatusCode.SUCCESS.OK,
                responseMessages.OTP_SENT
              );
            }
            // }
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

const deleteAccountUser = async (payload) => {
  try {
    const isUserExist = await users.findOne({
      id: payload?.userId,
    });
    if (isUserExist) {
      const data = {
        isAccountDeleted: true,
        updatedAt: new Date(),
      };
      const result = await isUserExist.update(data);
      if (result) {
        return successResponse(
          StatusCode.SUCCESS.OK,
          "Your account has been deleted successfully!"
        );
      }
    } else {
      return rejectResponse(
        StatusCode.CLIENT_ERROR.NOT_FOUND,
        responseMessages.USER_NOT_EXIST
      );
    }
  } catch (err) {
    throw rejectResponse(
      StatusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const signOutUser = async (payload) => {
  try {
    const isUserExist = await users.findOne({
      id: payload?.userId,
    });
    if (isUserExist) {
      const data = {
        isLoggedIn: false,
        updatedAt: new Date(),
      };
      const result = await isUserExist.update(data);
      if (result) {
        return successResponse(StatusCode.SUCCESS.OK, "Logout success!");
      }
    } else {
      return rejectResponse(
        StatusCode.CLIENT_ERROR.NOT_FOUND,
        responseMessages.USER_NOT_EXIST
      );
    }
  } catch (err) {
    throw rejectResponse(
      StatusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const refreshTokenUser = async (payload) => {
  const { refreshToken } = payload;

  if (!refreshToken)
    return rejectResponse(
      StatusCode.CLIENT_ERROR.UNAUTHORIZED,
      "Missing refresh token"
    );

  try {
    const userData = verifyToken(refreshToken);

    const findUser = await users.findOne({
      where: {
        phone: userData?.phone,
        isActive: true,
      },
    });

    if (!findUser || findUser.refreshToken !== refreshToken) {
      return rejectResponse(
        StatusCode.CLIENT_ERROR.FORBIDDEN,
        "Invalid refresh token"
      );
    }

    const tokenData = {
      id: findUser?.id,
      fullName: findUser?.fullName,
      email: findUser?.email,
      phone: findUser?.phone,
    };
    const generateTokenResult = generateToken(tokenData, "1h");
    const generateRefreshTokenResult = generateToken(tokenData, "7d");
    if (generateToken) tokenData.token = generateTokenResult;
    if (generateRefreshTokenResult) {
      const data = {
        refreshToken: generateRefreshTokenResult,
      };
      const updateUser = await findUser.update(data);
      if (updateUser) {
        tokenData.refreshToken = generateRefreshTokenResult;
      }
      return successResponse(
        StatusCode.SUCCESS.OK,
        "Refresh token generated successfully!",
        tokenData
      );
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
  deleteAccountUser,
  signOutUser,
  refreshTokenUser,
};
