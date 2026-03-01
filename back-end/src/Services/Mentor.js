import {
  FilterByLowToHighRepo,
  FilterMentorRepo,
  GetAllMentorRepo,
  GetMentorByIdRepo,
  SearchMentorRepo,
  GetMentorByIdReposite,
} from "../Repository/Mentor.js";

export const SearchMentorService = async (query) => {
  try {
    console.log("resposdfdlsQuery", query);
    const result = await SearchMentorRepo(query);
    return result;
  } catch (error) {
    throw error;
  }
};

export const GetAllMentorsService = async () => {
  try {
    const getAll = await GetAllMentorRepo();
    return getAll;
  } catch (error) {
    throw error;
  }
};
export const FilterMentorService = async (query, limit, offset) => {
  try {
    const mentors = await FilterMentorRepo(query, limit, offset);
    return mentors;
  } catch (error) {
    throw error;
  }
};

export const FilterMentorsByLowToHighService = async () => {
  try {
    const mentors = await FilterByLowToHighRepo();
    return mentors;
  } catch (error) {
    throw error;
  }
};

export const GetMentorById = async (MentorId, MenteeId) => {
  try {
    const mentor = await GetMentorByIdRepo(MentorId, MenteeId);
    return mentor;
  } catch (error) {
    throw error;
  }
};

export const GetMentorProfileService = async (MentorId) => {
  try {
    const res = await GetMentorByIdReposite(MentorId);
    return res;
  } catch (error) {
    throw error;
  }
};
