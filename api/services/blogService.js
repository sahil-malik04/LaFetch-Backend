const blogCategoriesModel = require("../models/blogCategoryModel");
const blogs = require("../models/blogModel");
const { rejectResponse, successResponse } = require("../utils/response");
const { statusCode } = require("../utils/statusCode");
const { uploadToS3 } = require("../utils/s3Uploader");

const getBlogsUser = async (query) => {
  try {
    const whereCondition = {
      isActive: true,
      ...(query.status ? { status: query.status } : {}),
    };

    const result = await blogs.findAll({
      where: whereCondition,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: blogCategoriesModel,
          as: "category",
          attributes: ["id", "name"],
        },
      ],
    });
    return successResponse(statusCode.SUCCESS.OK, "Success!", result);
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const addBlogUser = async (payload, reqFiles) => {
  try {
    const parsedTags = JSON.parse(payload?.tags || "[]");
    const parsedMetaTags = JSON.parse(payload?.meta_tags || "[]");
    const parsedMetaKeywords = JSON.parse(payload?.meta_keywords || "[]");
    const data = {
      slug: payload?.slug,
      title: payload?.title,
      category_id: payload?.category_id,
      status: payload?.status,
      is_featured: payload?.is_featured,

      meta_description: payload?.meta_description,
      meta_keywords: parsedMetaKeywords,
      tags: parsedTags,
      meta_tags: parsedMetaTags,
      content: payload?.content,
    };
    if (Object.keys(reqFiles).length) {
      const image = reqFiles?.image[0];
      if (image) {
        const url = await uploadToS3(
          image.buffer,
          image.originalname,
          image.mimetype,
          "blog-assets"
        );
        data.image_url = url;
      }
    }
    const result = await blogs.create(data);
    if (result) {
      return successResponse(
        statusCode.SUCCESS.CREATED,
        "Blog Added Successfully!"
      );
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const deleteBlogUser = async (payload) => {
  try {
    const isBlogExist = await blogs.findOne({
      where: {
        id: payload?.blogId,
      },
    });
    if (isBlogExist) {
      const data = {
        isActive: false,
        updatedAt: new Date(),
      };
      const updateBlog = await isBlogExist.update(data);
      if (updateBlog) {
        return successResponse(
          statusCode.SUCCESS.OK,
          "Blog deleted successfully!"
        );
      }
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "Blog not found!"
      );
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const updateBlogUser = async (payload, file) => {
  try {
    const isBlogExist = await blogs.findOne({
      where: {
        id: payload?.blogId,
      },
    });
    if (isBlogExist) {
      const parsedTags = JSON.parse(payload?.tags || "[]");
      const parsedMetaTags = JSON.parse(payload?.meta_tags || "[]");
      const parsedMetaKeywords = JSON.parse(payload?.meta_keywords || "[]");
      const data = {
        slug: payload?.slug,
        title: payload?.title,
        category_id: payload?.category_id,
        status: payload?.status,
        is_featured: payload?.is_featured,

        meta_description: payload?.meta_description,
        meta_keywords: parsedMetaKeywords,
        tags: parsedTags,
        meta_tags: parsedMetaTags,
        content: payload?.content,
        updatedAt: new Date(),
      };
      const updateBlog = await isBlogExist.update(data);
      if (updateBlog) {
        return successResponse(
          statusCode.SUCCESS.OK,
          "Blog updated successfully!"
        );
      }
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "Blog not found!"
      );
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const getBlogByIdUser = async (payload) => {
  try {
    const result = await blogs.findOne({
      where: {
        id: payload?.blogId,
        isActive: true,
      },
      include: [
        {
          model: blogCategoriesModel,
          as: "category",
          attributes: ["id", "name"],
        },
      ],
    });
    return successResponse(statusCode.SUCCESS.OK, "Success!", result);
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const getBlogCategoriesUser = async () => {
  try {
    const result = await blogCategoriesModel.findAll();
    return successResponse(statusCode.SUCCESS.OK, "Success!", result);
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const addBlogCategoryUser = async (payload) => {
  try {
    const { name, page } = payload;

    const isCategoryExist = await blogCategoriesModel.findOne({
      where: {
        name,
      },
    });
    if (isCategoryExist) {
      return rejectResponse(
        statusCode.CLIENT_ERROR.CONFLICT,
        "Category Already Exist!"
      );
    } else {
      const data = {
        name,
        page,
      };
      const result = await blogCategoriesModel.create(data);
      if (result) {
        return successResponse(
          statusCode.SUCCESS.CREATED,
          "Category Added Successfully!"
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

const updateBlogCategoryUser = async (params, body) => {
  try {
    const { name, page } = body;

    const isCategoryExist = await blogCategoriesModel.findOne({
      where: {
        id: params?.categoryId,
      },
    });
    if (isCategoryExist) {
      const data = {
        name,
        page,
        updatedAt: new Date(),
      };
      const result = await isCategoryExist.update(data);
      if (result) {
        return successResponse(
          statusCode.SUCCESS.OK,
          "Category Updated Successfully!"
        );
      }
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "Category doesn't Exist!"
      );
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const deleteBlogCategoryUser = async (params) => {
  try {
    const isCategoryExist = await blogCategoriesModel.findOne({
      where: {
        id: params?.categoryId,
      },
    });
    if (isCategoryExist) {
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
        "Category doesn't exist!"
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
  getBlogsUser,
  addBlogUser,
  deleteBlogUser,
  updateBlogUser,
  getBlogByIdUser,
  getBlogCategoriesUser,
  addBlogCategoryUser,
  updateBlogCategoryUser,
  deleteBlogCategoryUser,
};
