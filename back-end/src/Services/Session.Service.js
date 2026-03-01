import {
  CancelledSessionRepo,
  CreateSessionRepo,
  GetAllSessionRepo,
  GetASessionByIdRepo,
  RescheduleRepo,
  SearchSessionByCategoryRepo,
  sessionSearchRepo,
  UpdateSessionByIdRepo,
} from "../Repository/sessionRepo.js";

export const CreateSessionService = async (data) => {
  try {
    const session = await CreateSessionRepo(data);
    return session;
  } catch (error) {
    throw error;
  }
};

export const GetASessionByid = async (id) => {
  try {
    const session = await GetASessionByIdRepo(id);
    return session;
  } catch (error) {
    throw error;
  }
};
export const RescheduleService = async (id, data) => {
  try {
    const updated = await RescheduleRepo(id, data);
    return updated;
  } catch (error) {
    throw error;
  }
};
export const CancelledSessionService = async (id) => {
  try {
    const deleted = await CancelledSessionRepo(id);
    return deleted;
  } catch (error) {
    throw error;
  }
};

export const UpdateSessionByIdService = async (id, status) => {
  try {
    const updated = await UpdateSessionByIdRepo(id, status);
    return updated;
  } catch (error) {
    throw error;
  }
};

export const GetAllSessions = async (userid) => {
  try {
    const getall = await GetAllSessionRepo(userid);
    return getall;
  } catch (error) {
    cons;
  }
};

export const sessionSearchService = async (query) => {
  try {
    const res = await sessionSearchRepo(query);
    return res;
  } catch (error) {
    throw error;
  }
};

export const SearchSessionByCategoryService = async (userId, category) => {
  try {
    const res = await SearchSessionByCategoryRepo(userId, category);
    return res;
  } catch (error) {
    throw error;
  }
};
