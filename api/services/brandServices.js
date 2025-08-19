const { successResponse, rejectResponse } = require("../utils/response");
const { statusCode } = require("../utils/statusCode");
const brands = require("../models/brandsModel");
const products = require("../models/productsModel");
const { uploadToS3 } = require("../utils/s3Uploader");
const vendors = require("../models/vendorsModel");
const vendorBrands = require("../models/vendorBrandsModel");
const { fn, col, where } = require("sequelize");
const warehouse = require("../models/warehouseModel");
const brandWarehouses = require("../models/brandWarehouses");
const { sequelize } = require("../db/dbConfig");
const users = require("../models/userModel");

const getBrandsUser = async (query) => {
  try {
    let whereClause = {};

    if (query?.isFeatured === "true") {
      whereClause.isFeatured = true;
    } else if (query?.isFeatured === "false") {
      whereClause.isFeatured = false;
    }

    const result = await brands.findAll({
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

const viewBrandUser = async (params) => {
  try {
    const brandInfo = await brands.findOne({
      where: { id: params?.brandId },
    });

    const productList = await products.findAll({
      where: { brandId: params?.brandId },
    });

    return successResponse(statusCode.SUCCESS.OK, "Success!", {
      brandInfo,
      products: productList,
    });
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const makeBrandFeaturedUser = async (params, query) => {
  try {
    const featured = query?.featured;
    if (featured !== "true" && featured !== "false") {
      return rejectResponse(
        statusCode.CLIENT_ERROR.CONFLICT,
        "query param must be boolean!"
      );
    }
    const isBrandExist = await brands.findOne({
      where: { id: params?.brandId },
    });
    if (isBrandExist) {
      const result = await isBrandExist.update({
        isFeatured: featured === "true",
      });

      if (result) {
        return successResponse(
          statusCode.SUCCESS.OK,
          "Brand updated successfully!!"
        );
      }
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "Brand not found!"
      );
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const brandOnboardUser = async (body, reqFiles) => {
  try {
    const isVendorExist = await vendors.findOne({
      where: {
        id: body?.vendorId,
        isVerified: true,
      },
    });
    if (!isVendorExist) {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "Vendor doesn't exist!"
      );
    } else {
      const isBrandExist = await brands.findOne({
        where: where(fn("LOWER", col("name")), body?.name?.toLowerCase()),
      });
      if (isBrandExist) {
        return rejectResponse(
          statusCode.CLIENT_ERROR.CONFLICT,
          "Brand already exist!"
        );
      } else {
        const data = {
          name: body?.name,
          description: body?.name,
          businessName: body?.businessName,
          tradeName: body?.tradeName,
          brandEmail: body?.brandEmail,
          codAvailable: body?.codAvailable,
          websiteLink: body?.websiteLink,
          isFeatured: body?.isFeatured,
          deliveryType: JSON.parse(body?.deliveryType),
          commission: body?.commission,
        };

        const uploadedFiles = {};

        for (const [fieldName, files] of Object.entries(reqFiles)) {
          const file = files[0];
          const url = await uploadToS3(
            file.buffer,
            file.originalname,
            file.mimetype,
            "brand-assets"
          );
          uploadedFiles[fieldName] = url;
        }
        data.logo = uploadedFiles?.logo;
        data.video = uploadedFiles?.video;
        data.PAN = uploadedFiles?.PAN;
        data.GST = uploadedFiles?.GST;
        data.incorporationCertificate = uploadedFiles?.incorporationCertificate;
        data.udhyamAadhar = uploadedFiles?.udhyamAadhar;
        data.trademarkCertificate = uploadedFiles?.trademarkCertificate;
        data.authorizedSignatoryIDProof =
          uploadedFiles?.authorizedSignatoryIDProof;
        data.qualityAssuranceCertificate =
          uploadedFiles?.qualityAssuranceCertificate;

        const result = await brands.create(data);
        if (result) {
          const data = {
            vendorId: body?.vendorId,
            brandId: result?.id,
          };
          const createVendorBrand = await vendorBrands.create(data);
          if (createVendorBrand) {
            let createdResult;

            const warehouseIDs = JSON.parse(body?.warehouseIDs);
            if (warehouseIDs.length > 0) {
              const records = warehouseIDs.map((whId) => ({
                brandId: result?.id,
                warehouseId: whId,
              }));
              createdResult = await brandWarehouses.bulkCreate(records);
            } else if (body?.warehouses) {
              let warehousesArray = [];

              // Parse only once
              try {
                warehousesArray = JSON.parse(body.warehouses);
              } catch (err) {
                return rejectResponse(
                  statusCode.CLIENT_ERROR.BAD_REQUEST,
                  "Invalid warehouses JSON format"
                );
              }

              if (
                Array.isArray(warehousesArray) &&
                warehousesArray.length > 0
              ) {
                // transaction
                const transaction = await sequelize.transaction();
                try {
                  const warehousesData = warehousesArray.map((wh) => ({
                    name: wh.warehouseName,
                    address: wh.address,
                    city: wh.city,
                    state: wh.state,
                    postalCode: wh.postalCode,
                    capacity: wh.capacity,
                    contactNo: wh.contactNo,
                  }));

                  // Bulk create
                  const createdWarehouses = await warehouse.bulkCreate(
                    warehousesData,
                    {
                      returning: true,
                      transaction,
                    }
                  );

                  // Prepare brand-warehouse links
                  const brandWarehouseLinks = createdWarehouses.map((w) => ({
                    brandId: result?.id,
                    warehouseId: w.id,
                  }));

                  // Bulk create links
                  createdResult = await brandWarehouses.bulkCreate(
                    brandWarehouseLinks,
                    {
                      transaction,
                    }
                  );

                  // Commit transaction
                  await transaction.commit();
                } catch (err) {
                  await transaction.rollback();
                  return rejectResponse(
                    statusCode.SERVER_ERROR.INTERNAL,
                    "Failed to create warehouses"
                  );
                }
              }
            }

            if (createdResult) {
              return successResponse(
                statusCode.SUCCESS.CREATED,
                "Brand onboarded successfully!!"
              );
            }
          }
        } else {
          return rejectResponse(
            statusCode.CLIENT_ERROR.NOT_FOUND,
            "There's some issue in onboarding the brand!"
          );
        }
      }
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const editBrandUser = async (params, body, reqFiles) => {
  try {
    const isBrandExist = await brands.findOne({
      where: {
        id: params?.brandId,
      },
    });
    if (!isBrandExist) {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "Brand doesn't exist!"
      );
    } else {
      const data = {
        name: body?.name,
        description: body?.name,
        businessName: body?.businessName,
        tradeName: body?.tradeName,
        brandEmail: body?.brandEmail,
        codAvailable: body?.codAvailable,
        websiteLink: body?.websiteLink,
        isFeatured: body?.isFeatured,
        deliveryType: JSON.parse(body?.deliveryType),
        commission: body?.commission,
      };

      // Parse warehouse IDs array
      const newWarehouseIds = JSON.parse(body?.warehouseIDs || "[]");

      if (newWarehouseIds.length > 0) {
        // Fetch existing warehouse links
        const existingLinks = await brandWarehouses.findAll({
          where: { brandId: params?.brandId },
        });

        const existingWarehouseIds = existingLinks.map(
          (link) => link.warehouseId
        );

        // Find warehouses to add
        const toAdd = newWarehouseIds.filter(
          (id) => !existingWarehouseIds.includes(id)
        );

        // Find warehouses to remove
        const toRemove = existingWarehouseIds.filter(
          (id) => !newWarehouseIds.includes(id)
        );

        // Add new associations
        if (toAdd.length > 0) {
          const records = toAdd.map((whId) => ({
            brandId: params?.brandId,
            warehouseId: whId,
          }));
          await brandWarehouses.bulkCreate(records);
        }

        // Remove outdated associations
        if (toRemove.length > 0) {
          await brandWarehouses.destroy({
            where: {
              brandId: params?.brandId,
              warehouseId: toRemove,
            },
          });
        }
      }

      const uploadedFiles = {};

      for (const [fieldName, files] of Object.entries(reqFiles)) {
        const file = files[0];
        const url = await uploadToS3(
          file.buffer,
          file.originalname,
          file.mimetype,
          "brand-assets"
        );
        uploadedFiles[fieldName] = url;
      }
      data.logo = uploadedFiles?.logo;
      data.video = uploadedFiles?.video;
      data.PAN = uploadedFiles?.PAN;
      data.GST = uploadedFiles?.GST;
      data.incorporationCertificate = uploadedFiles?.incorporationCertificate;
      data.udhyamAadhar = uploadedFiles?.udhyamAadhar;
      data.trademarkCertificate = uploadedFiles?.trademarkCertificate;
      data.authorizedSignatoryIDProof =
        uploadedFiles?.authorizedSignatoryIDProof;
      data.qualityAssuranceCertificate =
        uploadedFiles?.qualityAssuranceCertificate;

      const result = await isBrandExist.update(data);
      if (result) {
        return successResponse(
          statusCode.SUCCESS.OK,
          "Brand updated successfully!!"
        );
      } else {
        return rejectResponse(
          statusCode.CLIENT_ERROR.NOT_FOUND,
          "There's some issue in onboarding the brand!"
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

const deleteBrandUser = async (params) => {
  try {
    const isBrandExist = await brands.findOne({
      where: {
        id: params?.brandId,
      },
    });
    if (!isBrandExist) {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "Brand doesn't exist!"
      );
    } else {
      // delete all warehouses associate to brand
      await brandWarehouses.destroy({
        where: { brandId: params?.brandId },
      });

      // delete all vendors associate to brand
      await vendorBrands.destroy({
        where: { brandId: params?.brandId },
      });

      // delete brand
      const deleteBrand = await isBrandExist.destroy();
      if (deleteBrand) {
        return successResponse(
          statusCode.SUCCESS.OK,
          "Brand deleted successfully!!"
        );
      } else {
        return rejectResponse(
          statusCode.CLIENT_ERROR.NOT_FOUND,
          "There's some issue in deleting the brand!"
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

const getBrandLinkedWarehousesUser = async (params) => {
  try {
    const result = await brands.findOne({
      where: { id: params?.brandId },
      include: [
        {
          model: warehouse,
          through: { attributes: [] }, // hides brandWarehouses join table
        },
        {
          model: vendors,
          through: { attributes: [] }, // hides vendorBrands join table
          include: [{ model: users, attributes: ["id", "fullName", "email"] }],
          attributes: ["userId"],
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

module.exports = {
  getBrandsUser,
  viewBrandUser,
  makeBrandFeaturedUser,
  brandOnboardUser,
  editBrandUser,
  deleteBrandUser,
  getBrandLinkedWarehousesUser,
};
