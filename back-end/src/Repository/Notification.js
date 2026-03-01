import Notification from "../Model/Notification.js";

export const CreateNotificationRepo = async (data) => {
  try {
    const res = await Notification.create(data);
    return res;
  } catch (error) {
    throw error;
  }
};

export const GetUserNotificationRepo = async (userId) => {
  try {
    const res = await Notification.find({ receiver: userId }).populate(
      "sessionId"
    );
    return res;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

export const UpdateNotificationIsRead = async (userId) => {
  try {
    const res = await Notification.updateMany(
      { receiver: userId },
      { $set: { isRead: true } }
    );
    return res;
  } catch (error) {
    throw error;
  }
};
