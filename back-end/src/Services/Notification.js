import {
  CreateNotificationRepo,
  GetUserNotificationRepo,
  UpdateNotificationIsRead,
} from "../Repository/Notification.js";

export const CreateNotificationService = async (data) => {
  try {
    const res = await CreateNotificationRepo(data);
    return res;
  } catch (error) {
    throw error;
  }
};

export const GetAUserNotificationById = async (user) => {
  try {
    const res = await GetUserNotificationRepo(user);
    return res;
  } catch (error) {
    throw error;
  }
};

export const UpdateNotificationIsReadService = async (userId) => {
  try {
    const res = await UpdateNotificationIsRead(userId);
    return res;
  } catch (error) {
    throw error;
  }
};
