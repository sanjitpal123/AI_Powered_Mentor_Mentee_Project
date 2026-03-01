import { GetMenteeByIdRepo } from "../Repository/Mentee.js";
import {
  GetUser,
  RegisterUser,
  UpdateProfileById,
  UserExist,
} from "../Repository/userRepo.js";
export const RegisterUserService = async (data) => {
  try {
    const user = await RegisterUser(data);
    return user;
  } catch (error) {
    throw error;
  }
};

export const IsExist = async (email) => {
  try {
    const isExist = UserExist(email);
    return isExist;
  } catch (error) {
    throw error;
  }
};

// getting mentee by id

export const GettingMenteeById = async (id) => {
  try {
    const mentee = await GetMenteeByIdRepo(id);
    return mentee;
  } catch (error) {
    throw error;
  }
};
export const UpdateProfile = async (data, id) => {
  try {
    const profile = await UpdateProfileById(data, id);
    return profile;
  } catch (error) {
    throw error;
  }
};

export const Users = async () => {
  try {
    const users = await GetUser();
    return users;
  } catch (error) {
    throw error;
  }
};
