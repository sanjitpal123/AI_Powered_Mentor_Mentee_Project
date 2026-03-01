import message from "../Model/Message.js";
import { GetConvoByIdService } from "../Services/Conversation.js";
import {
  DeletedById,
  DeleteMessageForEveryone,
  DeleteMessageService,
  EditMessageService,
  GetAllMessageOfAConvo,
  GetMessageById,
  SeenMessageService,
  SendMessageService,
} from "../Services/Message.js";

export const SendMessage = async (req, res) => {
  try {
    const { conversation, text, isRead } = req.body;
    const sender = req.user.userId;
    if (!conversation || !text) {
      return res.status(404).json({
        message: "Fill all the fields",
        success: false,
      });
    }
    const data = {
      conversation,
      text,
      isRead,
      sender,
    };
    const send = await SendMessageService(data);
    if (!send) {
      return res.status(401).json({
        message: "Can not send message",
        success: false,
      });
    }
    const convoId = conversation;
    const getConvById = await GetConvoByIdService(convoId);
    return res.status(201).json({
      success: true,
      message: "Successfully sent message",
      getConvById,
      send,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(501).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const GetUserMessage = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(401).json({
        message: "Can not find any convo id",
      });
    }
    const messages = await GetAllMessageOfAConvo(id);
    if (!messages) {
      return res.status(404).json({
        message: "Could not get any message with this convo ",
      });
    }
    return res.status(201).json(messages);
  } catch (error) {
    return res.status(501).json({
      message: "Internal server error",
      success: false,
    });
  }
};
export const DeleteMessage = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(401).json({
        message: "Id is empty",
        success: false,
      });
    }

    const deltedMessage = await DeleteMessageService(id);
    if (!deltedMessage) {
      return res.status(403)({
        message: "Can not delete",
        success: false,
      });
    }
    return res.status(201).json({
      message: "message is deleted successfully",
      deltedMessage,
    });
  } catch (error) {
    return res.status(501).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const EditMessage = async (req, res) => {
  try {
    console.log("editec", req.params.id);
    const id = req.params.id;
    const { text } = req.body;
    const EditedMessage = await EditMessageService(id, text);
    if (!EditMessage) {
      return res.status(401).json({
        message: "Can not edit message",
      });
    }
    return res.status(201).json({
      EditedMessage,
      success: "Successfullysfkskfs updated",
    });
  } catch (error) {
    console.log("error", error);
    return res.status(501).json({
      message: "Internal server error",
      success: false,
    });
  }
};
export const SeenMessage = async (req, res) => {
  try {
    const { convoId } = req.body;
    const userId = req.user.userId;
    console.log("user in before seen", userId);
    const isExist = await GetConvoByIdService(convoId);
    if (!isExist) {
      return res.status(404).json({
        message: "Can not find any message ",
        success: false,
      });
    }
    const seenMessage = await SeenMessageService(convoId, userId);
    const allMessage = await message.find({ conversation: convoId });
    if (!allMessage) {
      return res.status(401).json({
        message: "Can not get message",
        success: false,
      });
    }
    if (!seenMessage) {
      return res.status(401).json({
        message: "Can not seen message",
        success: false,
      });
    }
    return res.status(201).json({
      message: "Updated message successfully",
      seenMessage,
      allMessage,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(501).json({
      error,
      message: "Internal server error",
    });
  }
};

export const DeleteForEveryone = async (req, res) => {
  try {
    const { id } = req.params;
    const exited = await GetMessageById(id);
    if (!exited) {
      return res.status(404).json({
        message: "Can not find any message with this id",
        success: false,
      });
    }

    const deleted = await DeleteMessageForEveryone(id);
    if (!deleted) {
      return res.status(403).json({
        message: "Can not delete message",
        success: false,
      });
    }
    return res.status(201).json({
      message: "Sucessfully Delete Message",
      success: false,
    });
  } catch (error) {
    console.log("error to dlete", error);
    return res.status(501).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const DeleteForMe = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user.userId;
    const exited = await GetMessageById(id);

    if (!exited) {
      return res.status(404).json({
        message: "can not get message with this id",
        success: false,
      });
    }
    const deleted = await DeletedById(id, user);
    if (!deleted) {
      return res.status(403).json({
        message: "Can not delete message",
        success: false,
      });
    }
    return res.status(201).json({
      message: "deleted message succesfully",
      success: true,
    });
  } catch (error) {
    console.log("error to delete for everyone ", error);
  }
};
