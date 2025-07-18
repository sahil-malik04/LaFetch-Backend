const banks = require("../models/bankModel");
const users = require("../models/userModel");
const vendors = require("../models/vendorsModel");
const { generatePassword, encryptText } = require("../utils/commonFunc");
const { responseMessages } = require("../utils/dataUtils");
const { successResponse, rejectResponse } = require("../utils/response");
const { uploadToS3 } = require("../utils/s3Uploader");
const { statusCode } = require("../utils/statusCode");

const onboardVendorUser = async (payload) => {
  try {
    const { name, email, phone } = payload;

    const isVendorExist = await users.findOne({
      where: {
        email,
      },
    });
    if (isVendorExist) {
      return rejectResponse(
        statusCode.CLIENT_ERROR.CONFLICT,
        "Vendor Already Exist!"
      );
    } else {
      const password = generatePassword();
      const vendorCredentials = {
        email,
        password,
      };

      const userData = {
        fullName: name,
        email,
        password: encryptText(password),
        roleId: 2,
      };
      const createUser = await users.create(userData);
      await vendors.create({
        userId: createUser?.id,
      });

      if (createUser) {
        return successResponse(
          statusCode.SUCCESS.OK,
          "Success!",
          vendorCredentials
        );
      } else {
        return rejectResponse(
          statusCode.CLIENT_ERROR.NOT_FOUND,
          responseMessages.USER_NOT_EXIST
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

const updateVendorUser = async (params, payload, reqFiles) => {
  try {
    const isVendorExist = await vendors.findOne({
      where: {
        userId: params?.userId,
      },
    });

    if (isVendorExist) {
      const { businessEmail, phone, alternateContact } = payload;
      const vendorData = {
        businessEmail,
        phone,
        alternateContact,
      };

      if (payload?.accountNumber) {
        const { accountHolderName, accountNumber, IFSC, bankName } = payload;
        const bankData = {
          accountHolderName,
          accountNumber,
          IFSC,
          bankName,
        };
        const createBank = await banks.create(bankData);
        if (createBank) {
          vendorData.bankId = createBank.id;
        }
      }

      const uploadedFiles = {};

      for (const [fieldName, files] of Object.entries(reqFiles)) {
        const file = files[0];
        const url = await uploadToS3(
          file.buffer,
          file.originalname,
          file.mimetype,
          "vendor-assets"
        );
        uploadedFiles[fieldName] = url;
      }

      vendorData.PAN = uploadedFiles?.PAN;
      vendorData.cancelledChequeOrPassbook = uploadedFiles?.cancelledCheque;
      vendorData.businessRegistrationCertificate =
        uploadedFiles?.businessRCertificate;
      if (payload?.isFormSubmitted) {
        vendorData.isDocumentsSubmitted = true;
      }

      const updateVendor = isVendorExist.update(vendorData);
      if (updateVendor) {
        return successResponse(statusCode.SUCCESS.OK, "Success!");
      }
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "Vendor doesn't exist"
      );
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const getVendorsUser = async () => {
  try {
    const findVendor = await vendors.findAll({
      include: [
        {
          model: users,
          attributes: ["id", "fullName", "email", "phone", "isActive"],
        },
      ],

      attributes: [
        "id",
        "businessEmail",
        "onBoardingCompletedAt",
        "isVerified",
        "isDocumentsSubmitted",
      ],
    });
    return successResponse(statusCode.SUCCESS.OK, "Success!", findVendor);
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const vendorStatusUser = async (query, params) => {
  try {
    const findVendorUser = await users.findOne({
      where: {
        id: params?.userId,
      },
    });
    if (findVendorUser) {
      const data = {
        isActive: query?.isActive === "true",
      };
      const result = await findVendorUser.update(data);
      if (result) return successResponse(statusCode.SUCCESS.OK, "Success!");
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        responseMessages.USER_NOT_EXIST
      );
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const vendorDocumentsUser = async (params) => {
  try {
    const findVendor = await vendors.findOne({
      where: {
        id: params?.vendorId,
      },
      attributes: [
        "id",
        "PAN",
        "cancelledChequeOrPassbook",
        "businessRegistrationCertificate",
        "isVerified",
        "isDocumentsSubmitted",
      ],
    });
    if (findVendor) {
      return successResponse(statusCode.SUCCESS.OK, "Success!", findVendor);
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        responseMessages.USER_NOT_EXIST
      );
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const vendorDocumentStatusUser = async (params, query) => {
  try {
    const findVendor = await vendors.findOne({
      where: {
        id: params?.vendorId,
      },
    });
    if (findVendor) {
      const data = {
        isVerified:
          query?.isVerified === "true"
            ? true
            : query?.isVerified === "false"
            ? false
            : null,
      };
      findVendor.update(data);
      return successResponse(statusCode.SUCCESS.OK, "Success!");
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        responseMessages.USER_NOT_EXIST
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
  onboardVendorUser,
  updateVendorUser,
  getVendorsUser,
  vendorStatusUser,
  vendorDocumentsUser,
  vendorDocumentStatusUser,
};
