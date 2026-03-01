import Feedback from "../Model/Feedback.js";

export const CreateFeedBackRepo = async (obj) => {
  try {
    const result = await Feedback.create(obj);
    result.save();
    return result;
  } catch (error) {
    throw error;
  }
};
