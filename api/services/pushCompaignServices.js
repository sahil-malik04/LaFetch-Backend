const { statusCode } = require("../utils/statusCode");
const { successResponse, rejectResponse } = require("../utils/response");
const pushCampaign = require("../models/pushCompaignsModel");
const userFcmTokens = require("../models/userFcmTokens");
const { sendPushNotification } = require("../utils/commonFunc");
const pushCampaignSegment = require("../models/pushCampaignSegmentModel");

const createPushCompaignUser = async (body) => {
  try {
    const data = {
      name: body?.name,
      title: body?.title,
      body: body?.body,
      richMediaUrl: body?.richMediaUrl,
      clickActionType: body?.clickActionType,
      clickActionId: body?.clickActionId,
      status: body?.status,
      sendNow: body?.sendNow,
      scheduledAt: body?.scheduledAt,
      recurring: body?.recurring,
      recurringFrequency: body?.recurringFrequency,
      recurringTime: body?.recurringTime,
      recurringEndDate: body?.recurringEndDate,
    };

    const result = await pushCampaign.create(data);
    if (result) {
      const data = {
        campaignId: result?.id,
        segmentType: body?.segmentType,
        segmentValue: body?.segmentValue,
      };
      await pushCampaignSegment.create(data);
      return successResponse(
        statusCode.SUCCESS.CREATED,
        "Compaign added successfully!"
      );
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const updatePushCompaignUser = async (params, body) => {
  try {
    const isCompaignExist = await pushCampaign.findOne({
      where: {
        id: params?.id,
      },
    });
    if (isCompaignExist) {
      const data = {
        name: body?.name,
        title: body?.title,
        body: body?.body,
        rich_media_url: body?.rich_media_url,
        click_action_type: body?.click_action_type,
        click_action_ref_id: body?.click_action_ref_id,
        send_type: body?.send_type,
        scheduled_at: body?.scheduled_at,
        segments: body?.segments,
        updatedAt: new Date(),
      };
      const result = await isCompaignExist.update(data);
      if (result) {
        return successResponse(
          statusCode.SUCCESS.OK,
          "Compaign updated successfully!"
        );
      }
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "Compaign not found!"
      );
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const getPushCompaignsUser = async () => {
  try {
    const result = await pushCampaign.findAll();
    return successResponse(statusCode.SUCCESS.OK, result);
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const deletePushCompaignUser = async (params) => {
  try {
    const isCompaignExist = await pushCampaign.findOne({
      where: {
        id: params?.id,
      },
    });
    if (isCompaignExist) {
      await isCompaignExist.destroy();
      return successResponse(
        statusCode.SUCCESS.OK,
        "Compaign deleted successfully!"
      );
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "Compaign not found!"
      );
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const sendCompaignNotificationUser = async (params) => {
  try {
    const isCompaignExist = await pushCampaign.findOne({
      where: {
        id: params?.id,
      },
    });
    if (isCompaignExist) {
      const tokensData = await userFcmTokens.findAll({
        attributes: ["token"],
      });

      const tokens = tokensData
        .map((t) => t.token)
        .filter((t) => t && t.trim() !== "");

      if (!tokens.length) {
        return rejectResponse(
          statusCode.CLIENT_ERROR.NOT_FOUND,
          "No FCM tokens found"
        );
      }

      const results = await Promise.all(
        tokens.map((token) =>
          sendPushNotification(
            token,
            isCompaignExist?.title,
            isCompaignExist?.body,
            isCompaignExist?.richMediaUrl
          )
        )
      );

      return successResponse(
        statusCode.SUCCESS.OK,
        "Promotional notifications sent successfully",
        {
          sent: results.length,
          tokensCount: tokens.length,
        }
      );
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "Compaign not found!"
      );
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const createFCMTokenUser = async (body) => {
  try {
    const data = {
      userId: body?.userId,
      token: body?.token,
      deviceType: body?.deviceType,
    };
    const isFCMExist = await userFcmTokens.findOne({
      where: data,
    });
    if (isFCMExist) {
      return rejectResponse(
        statusCode.CLIENT_ERROR.CONFLICT,
        "FCM token already exist!"
      );
    } else {
      const result = await userFcmTokens.create(data);
      if (result) {
        return successResponse(
          statusCode.SUCCESS.OK,
          "FCM token created successfully!"
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

module.exports = {
  createPushCompaignUser,
  updatePushCompaignUser,
  getPushCompaignsUser,
  deletePushCompaignUser,
  sendCompaignNotificationUser,
  createFCMTokenUser,
};
