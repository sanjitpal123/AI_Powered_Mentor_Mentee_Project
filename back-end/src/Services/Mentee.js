import { GetAllMenteeRepo, GetMenteeByIdRepo } from "../Repository/Mentee.js";

export const GetAllMenteeService = async () => {
  try {
    const result = await GetAllMenteeRepo();
    return result;
  } catch (error) {
    throw error;
  }
};

export const GetMenteeByIdService = async (id) => {
  try {
    const res = await GetMenteeByIdRepo(id);
    return res;
  } catch (error) {
    throw error;
  }
};
