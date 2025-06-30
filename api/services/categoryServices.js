const category = require("../models/categoryModel");
const { successResponse, rejectResponse } = require("../utils/response");
const { statusCode } = require("../utils/statusCode");

const getCategoriesUser = async (query) => {
  try {
    const gender = Number(query.gender);
    const catType = query.type;

    const result = await category.findAll({
      where: {
        parentId: gender,
        type: catType,
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

const addCategoryUser = async (payload) => {
  try {
    const data = {
      name: payload?.name,
      slug: payload?.slug,
      parentId: payload?.parentId,
      type: payload?.type,
      image: "",
      banner: "",
    };
    const result = await category.create(data);

    if (result) return successResponse(statusCode.SUCCESS.CREATED, "Success!");
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const updateCategoryUser = async (params, payload) => {
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
        image: "",
        banner: "",
      };
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
  addCategoryUser,
  updateCategoryUser,
  deleteCategoryUser,
};
