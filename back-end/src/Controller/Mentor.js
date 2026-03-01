import message from "../Model/Message.js";
import {
  FilterMentorsByLowToHighService,
  FilterMentorService,
  GetAllMentorsService,
  GetMentorById,
  GetMentorProfileService,
} from "../Services/Mentor.js";

export const GetAllMentos = async (req, res) => {
  try {
    const GetAll = await GetAllMentorsService();
    if (!GetAll) {
      return res.status(404).json({
        message: "Can not get message",
        success: false,
      });
    }

    return res.status(201).json(GetAll);
  } catch (error) {
    console.log("error", error);
    return res.status(501).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const FilterMentor = async (req, res) => {
  try {
    const { skills, price, experience, limit = 5, offset = 0 } = req.body;
    console.log(
      "skills",
      skills,
      "price",
      price,
      "experience",
      experience,
      "offset",
      offset,
      "limit",
      limit
    );
    const query = {};
    if (skills) {
      query.skills = { $in: Array.isArray(skills) ? skills : [skills] };
    }
    if (price) {
      if (price == "under-100") query.price = { $lt: 100 };
      if (price == "100-200") query.price = { $gte: 100, $lte: 200 };
      if (price == "200+") query.price = { $gt: 200 };
    }
    let experiencevalue = parseInt(experience);
    if (experience) {
      query.experience = { $gte: experiencevalue };
    }
    query.role = "mentor";
    console.log("query", query);
    const mentors = await FilterMentorService(query, limit, offset);
    if (!mentors) {
      return res.status(404).json({
        message: "Could not get any mentors",
        success: false,
      });
    }
    return res.status(201).json(mentors);
  } catch (error) {
    console.log("error", error);
    return res.status(501).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const FilterPriceLowToHigh = async (req, res) => {
  try {
    const mentors = await FilterMentorsByLowToHighService();
    if (!mentors) {
      return res.status(404).json({
        message: "Can not get any mentors",
        success: false,
      });
    }
    return res.status(201).json(mentors);
  } catch (error) {
    return res.status(501).json({
      message: "Internal service error",
      success: false,
    });
  }
};

export const GetMentorByIdCon = async (req, res) => {
  try {
    const { id } = req.body;
    const response = await GetMentorById(id);
    if (!response) {
      return response.status(404).json({
        message: "Can not get message",
        success: false,
      });
    }
    return res.status(201).json(response);
  } catch (error) {
    return res.status(501).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const GetMentorProfile = async (req, res) => {
  try {
    const { id } = req.body;
    const result = await GetMentorProfileService(id);
    if (!result) {
      return res.status(404).json({
        message: "Can not get mentor Profile",
        success: false,
      });
    }
    return res.status(201).json({
      success: true,
      result,
    });
  } catch (error) {
    console.log("error to get mentor profile", error);
    return res.status(501).json({
      success: false,
      message: "Internal server error",
    });
  }
};
