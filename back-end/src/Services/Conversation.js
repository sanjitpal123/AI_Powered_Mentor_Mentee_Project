import {
  createConversationRepo,
  ExistingConvo,
  GetAllConvo,
  GetConvoById,
  GetConvoByMentorIdRepo,
  GetConvoOfUser,
} from "../Repository/Conversation.js";

export const CreateConversationService = async (data) => {
  try {
    const create = await createConversationRepo(data);
    return create;
  } catch (error) {
    throw error;
  }
};
export const ExistedConvo = async (data) => {
  try {
    const Existed = await ExistingConvo(data);
    return Existed;
  } catch (error) {
    throw error;
  }
};

export const GetConvoByIdService = async (id) => {
  try {
    const convo = await GetConvoById(id);
    return convo;
  } catch (error) {
    throw error;
  }
};

export const GetUserConvoService = async (senderId) => {
  try {
    const convo = await GetConvoOfUser(senderId);
    return convo;
  } catch (error) {
    throw error;
  }
};

export const GetAllConvoService = async () => {
  try {
    const getConvo = await GetAllConvo();
    return getConvo;
  } catch (error) {
    throw error;
  }
};

export const GetConvoByMentorId = async (id) => {
  try {
    const res = await GetConvoByMentorIdRepo(id);

    return res;
  } catch (error) {
    throw error;
  }
};
