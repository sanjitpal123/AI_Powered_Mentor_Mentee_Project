import { CreateFeedBackRepo } from "../Repository/FeedBack.js";

export const CreateFeedbackService = async (obj) => {
  try {
    const res = await CreateFeedBackRepo(obj);
    return res;
  } catch (error) {
    throw error;
  }
};
