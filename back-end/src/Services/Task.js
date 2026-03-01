import {
  CreateTaskRepo,
  DeleteExpireTaskFromMentee,
  GetATaskByIdRepo,
  GetTaskForASpecificUserRepo,
  whoAttendRepo,
} from "../Repository/Task.js";

export const CreateTaskService = async (obj) => {
  try {
    const created = await CreateTaskRepo(obj);
    return created;
  } catch (error) {
    throw error;
  }
};

export const GetTaskForASpecificUserService = async (userId) => {
  try {
    const res = await GetTaskForASpecificUserRepo(userId);
    return res;
  } catch (error) {
    throw error;
  }
};
export const GetATaskByIdService = async (id) => {
  try {
    const res = await GetATaskByIdRepo(id);
    return res;
  } catch (error) {
    throw error;
  }
};

export const AttendedByService = async (id, mentee) => {
  try {
    const res = await whoAttendRepo(id, mentee);
    return res;
  } catch (error) {
    throw error;
  }
};

export const DeleteExpireOneService = async (mentee, taskid) => {
  try {
    const deleted = await DeleteExpireTaskFromMentee(mentee, taskid);
    return deleted;
  } catch (error) {
    throw error;
  }
};
