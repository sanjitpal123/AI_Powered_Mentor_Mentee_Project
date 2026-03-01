import { SeenMessage } from "../Controller/Message.js";
import {
  DeletedMessageByidRepo,
  DeletedMessageRepo,
  DeleteMessageForEveryoneRepo,
  EditMessage,
  GetAllMessageOfAConvoRepo,
  getMessageByIdRepo,
  seenMessageRepo,
  SendMessageRepo,
} from "../Repository/Message.js";

export const SendMessageService = async (data) => {
  try {
    const created = await SendMessageRepo(data);
    return created;
  } catch (error) {
    throw error;
  }
};
export const DeleteMessageService = async (id) => {
  try {
    const deleted = await DeletedMessageRepo(id);
    return deleted;
  } catch (error) {
    throw error;
  }
};

export const EditMessageService = async (id, text) => {
  try {
    const editedMessage = await EditMessage(id, text);
    return editedMessage;
  } catch (error) {
    throw error;
  }
};

export const GetAllMessageOfAConvo = async (convoid) => {
  try {
    const messages = await GetAllMessageOfAConvoRepo(convoid);
    return messages;
  } catch (error) {
    throw error;
  }
};

export const SeenMessageService = async (convoid, userId) => {
  try {
    const res = await seenMessageRepo(convoid, userId);
    return res;
  } catch (error) {
    throw error;
  }
};
export const GetMessageById = async (id) => {
  try {
    const res = await getMessageByIdRepo(id);
    return res;
  } catch (error) {
    throw error;
  }
};

export const DeleteMessageForEveryone = async (id) => {
  try {
    const res = await DeleteMessageForEveryoneRepo(id);
    return res;
  } catch (error) {
    throw error;
  }
};

export const DeletedById = async (id, user) => {
  try {
    const res = await DeletedMessageByidRepo(id, user);
    return res;
  } catch (error) {
    throw error;
  }
};
