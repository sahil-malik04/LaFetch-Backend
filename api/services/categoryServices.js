const category = require("../models/categoryModel");
const { successResponse, rejectResponse } = require("../utils/response");
const { uploadToS3 } = require("../utils/s3Uploader");
const { statusCode } = require("../utils/statusCode");

const getCategoriesUser = async (query) => {
  try {
    const gender = Number(query.gender);
    const catType = query.type;

    const whereClause = {};

    if (!isNaN(gender)) {
      whereClause.parentId = gender;
    }

    if (catType) {
      whereClause.type = catType;
    }

    const result = await category.findAll({
      where: whereClause,
    });

    return successResponse(statusCode.SUCCESS.OK, "Success!", result);
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const getCategoryByIdUser = async (params) => {
  try {
    const result = await category.findOne({
      where: {
        id: params?.categoryId,
      },
    });

    return successResponse(statusCode.SUCCESS.OK, "Success!", result);
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const addCategoryUser = async (payload, reqFiles) => {
  try {
    const data = {
      name: payload?.name,
      slug: payload?.slug,
      parentId: payload?.parentId,
      type: payload?.type,
      addedBy: payload?.addedBy,
    };
    const uploadedFiles = {};

    for (const [fieldName, files] of Object.entries(reqFiles)) {
      const file = files[0];
      const url = await uploadToS3(
        file.buffer,
        file.originalname,
        file.mimetype,
        "category-assets"
      );
      uploadedFiles[fieldName] = url;
    }
    data.image = uploadedFiles?.image;
    data.banner = uploadedFiles?.banner;
    const result = await category.create(data);

    if (result) return successResponse(statusCode.SUCCESS.CREATED, "Success!");
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const updateCategoryUser = async (params, payload, reqFiles) => {
  try {
    const isCategoryExist = await category.findOne({
      where: {
        id: params?.categoryId,
      },
    });
    if (
      isCategoryExist &&
      params?.categoryId !== "1" &&
      params?.categoryId !== "2" &&
      params?.categoryId !== "3"
    ) {
      const data = {
        name: payload?.name,
        slug: payload?.slug,
        parentId: payload?.parentId,
        type: payload?.type,
      };
      const uploadedFiles = {};

      for (const [fieldName, files] of Object.entries(reqFiles)) {
        const file = files[0];
        const url = await uploadToS3(
          file.buffer,
          file.originalname,
          file.mimetype,
          "category-assets"
        );
        uploadedFiles[fieldName] = url;
      }
      data.image = uploadedFiles?.image;
      data.banner = uploadedFiles?.banner;
      const result = await isCategoryExist.update(data);

      if (result)
        return successResponse(
          statusCode.SUCCESS.OK,
          "Category updated successfully!"
        );
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "Category not found!"
      );
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const deleteCategoryUser = async (params) => {
  try {
    const isCategoryExist = await category.findOne({
      where: {
        id: params?.categoryId,
      },
    });
    if (
      isCategoryExist &&
      params?.categoryId !== "1" &&
      params?.categoryId !== "2" &&
      params?.categoryId !== "3"
    ) {
      const result = await isCategoryExist.destroy();
      if (result) {
        return successResponse(
          statusCode.SUCCESS.OK,
          "Category deleted successfully!"
        );
      }
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "Category not found!"
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
  getCategoriesUser,
  getCategoryByIdUser,
  addCategoryUser,
  updateCategoryUser,
  deleteCategoryUser,
};
