import {
  CreateNotificationService,
  GetAUserNotificationById,
  UpdateNotificationIsReadService,
} from "../Services/Notification.js";

import User from "../Model/UserSchema.js";
import message from "../Model/Message.js";
export const CreateNotice = async (req, res) => {
  try {
    const { receiver, message, type, isRead, title, convoId, sessionId } =
      req.body;
    const sender = req.user.userId;
    const Created = await CreateNotificationService({
      receiver,
      message,
      sender,
      convoId,
      sessionId,
      title,
      type,
      isRead,
    });

    if (!Created) {
      return res.status(401).json({
        message: "Notification is not created ",
        success: false,
      });
    }

    const user = await User.findById(receiver);
    console.log("mentor", user);
    if (!user) {
      return res.status(404).json({
        message: "Can not user with this id ",
        success: false,
      });
    }
    user.notication.push(Created._id);
    await user.save();
    return res.status(201).json({
      message: "Notification is created ",
      notification: Created,
      success: false,
    });
  } catch (error) {
    console.log("notification error", error);
    return res.status(501).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const GetAUserNotification = async (req, res) => {
  try {
    const receiver = req.user.userId;
    const notification = await GetAUserNotificationById(receiver);
    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Can not get notifications",
      });
    }
    return res.status(201).json({
      success: true,
      notification,
    });
  } catch (error) {
    console.group("error", error);
    return res.status(501).json({
      message: "Internal server error",
    });
  }
};

export const UpdateIsRead = async (req, res) => {
  try {
    const user = req.user.userId;

    const response = await UpdateNotificationIsReadService(user);
    if (!response) {
      return res.status(403).json({
        message: "Could not update ",
      });
    }
    return res.status(201).json({
      success: true,
      message: "updated successfully",
      response,
    });
  } catch (error) {
    return res.status(501).json({
      message: "Internal server error ",
      success: false,
    });
  }
};
