import message from "../Model/Message.js";
import {
  CreateConversationService,
  ExistedConvo,
  GetAllConvoService,
  GetConvoByIdService,
  GetConvoByMentorId,
  GetUserConvoService,
} from "../Services/Conversation.js";
import { GetMentorById } from "../Services/Mentor.js";

export const Conversation = async (req, res) => {
  try {
    const { receiverId } = req.body;
    const senderId = req.user.userId;
    console.log("sernder", senderId);
    const getMentorProfile = await GetMentorById(receiverId, senderId);
    console.log("mentor is here in conversation", getMentorProfile);

    const existed = await ExistedConvo({ receiverId, senderId });
    if (existed) {
      return res.status(401).json({
        message: "Convo is already existed between these users ",
        existed,
        success: false,
      });
    }

    const data = {
      participants: [receiverId, senderId],
    };

    const generateConvo = await CreateConversationService(data);
    if (!generateConvo) {
      return res.status(401).json({
        message: "can not create ",
        success: false,
      });
    }

    return res.status(201).json({
      message: "successfully created convo",
      generateConvo,
      success: true,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(501).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const GetConvoById = async (req, res) => {
  try {
    const { id } = req.body;
    console.log("id", id);
    if (!id) {
      return res.status(401).json({
        message: "Can not get id ",
        success: false,
      });
    }
    const convo = await GetConvoByIdService(id);
    console.log("convo", convo);
    if (!convo) {
      return res.status(403).json({
        message: "Can not get conversation",
        success: false,
      });
    }
    return res.status(201).json({
      convo,
      success: true,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(501).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const GetUserConvo = async (req, res) => {
  try {
    const senderId = req.user.userId;
    const convo = await GetUserConvoService(senderId);
    if (!convo) {
      return res.status(403).json({
        message: "Can not get convo",
        success: false,
      });
    }
    return res.status(201).json(convo);
  } catch (error) {
    return res.status(501).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const GetAllConvo = async (req, res) => {
  try {
    const convo = await GetAllConvoService();
    if (!convo) {
      return res.status(404).json({
        message: "Can not get convo",
        success: false,
      });
    }

    return res.status(201).json({ convo });
  } catch (error) {
    throw error;
  }
};

export const GetConversationByMentorId = async (req, res) => {
  try {
    const { id } = req.body;
    const getConvo = await GetConvoByMentorId(id);
    if (!getConvo) {
      return res.status(404).json({
        message: "Can not get convo",
      });
    }
    return res.status(201).json(getConvo);
  } catch (error) {
    console.log("error", error);
    return res.status(501).json({
      message: "Internal server error",
      success: false,
    });
  }
};
