import Conversation from "../Model/Conversation.js";
import mongoose from "mongoose";
export const createConversationRepo = async (data) => {
  try {
    const created = await Conversation.create(data);
    return created;
  } catch (error) {
    throw error;
  }
};

export const GetConvoById = async (id) => {
  try {
    if (!id) throw new Error("ID is required");

    console.log("raw id:", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid ObjectId");
    }

    const convo = await Conversation.findById(id).populate("participants");

    if (!convo) {
      console.log("⚠️ No conversation found with ID:", id);
      return null;
    }

    return convo;
  } catch (error) {
    console.error("Error fetching conversation by ID:", error.message);
    throw error;
  }
};

export const ExistingConvo = async (data) => {
  try {
    const { senderId, receiverId } = data;
    const existed = await Conversation.findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    });

    return existed;
  } catch (error) {
    throw error;
  }
};

export const GetConvoOfUser = async (senderId) => {
  try {
    const convo = await Conversation.find({
      participants: { $in: [senderId] },
    }).populate("participants");
    return convo;
  } catch (error) {
    throw error;
  }
};

export const GetAllConvo = async () => {
  try {
    const convo = await Conversation.find({});
    return convo;
  } catch (error) {
    throw error;
  }
};

export const GetConvoByMentorIdRepo = async (id) => {
  try {
    const res = await Conversation.find({
      participants: { $in: [id] },
    }).populate("participants");
    return res;
  } catch (error) {
    throw error;
  }
};
