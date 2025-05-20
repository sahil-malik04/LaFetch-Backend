const users = require("../models/userModel");
const { verifyToken } = require("../utils/commonFunc");
const { rejectResponse } = require("../utils/response");
const StatusCode = require("../utils/statusCode");

const isAuthorized = async (req, res, next) => {
  const token = req.headers?.authorization;
  if (!token) {
    res.status(StatusCode.CLIENT_ERROR.UNAUTHORIZED).send({
      status: StatusCode.CLIENT_ERROR.UNAUTHORIZED,
      message: "Unauthorized!",
    });
  } else {
    try {
      const splitToken = token?.split(" ")[1];
      const authData = verifyToken(splitToken);
      if (authData) {
        const isAccountDeleted = await users.findOne({
          where: {
            phone: authData.phone,
            isAccountDeleted: true,
          },
        });
        if (isAccountDeleted) {
          res.status(StatusCode.CLIENT_ERROR.FORBIDDEN).send({
            status: StatusCode.CLIENT_ERROR.FORBIDDEN,
            message:
              "Access denied. Your account is no longer active. Please reach out to the administrator for support.",
          });
        } else {
          const isAccountActive = await users.findOne({
            where: {
              phone: authData.phone,
              isActive: true,
            },
          });
          if (isAccountActive) {
            next();
          } else {
            res.status(StatusCode.CLIENT_ERROR.UNAUTHORIZED).send({
              status: StatusCode.CLIENT_ERROR.UNAUTHORIZED,
              message: "Unauthorized!",
            });
          }
        }
      }
    } catch (err) {
      res.send(
        rejectResponse(StatusCode.CLIENT_ERROR.UNAUTHORIZED, err?.message)
      );
    }
  }
};

module.exports = {
  isAuthorized,
};
