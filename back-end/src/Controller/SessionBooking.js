import message from "../Model/Message.js";
import Session from "../Model/SessionBookingModel.js";
import User from "../Model/UserSchema.js";
import { sessionSearchRepo } from "../Repository/sessionRepo.js";
import {
  CancelledSessionService,
  CreateSessionService,
  GetAllSessions,
  GetASessionByid,
  RescheduleService,
  SearchSessionByCategoryService,
  sessionSearchService,
  UpdateSessionByIdService,
} from "../Services/Session.Service.js";

export const CreateSession = async (req, res) => {
  try {
    const mentee = req.user.userId;
    const { mentor, date, notes, topic } = req.body;
    if (!mentor || !date || !topic || !notes) {
      return res.status(401).json({
        message: "please fill all the field",
        success: false,
      });
    }
    const session = await CreateSessionService({
      mentor,
      date,
      notes,
      topic,
      mentee,
    });
    const menteeProile = await User.findById(mentee);
    if (!menteeProile) {
      return res.status(404).json({
        success: false,
        message: "mentee id is not present with this id",
      });
    }
    const mentorProfile = await User.findById(mentor);
    if (!mentorProfile) {
      return res.status(404).json({
        message: "Can not get mentor ",
        success: false,
      });
    }
    if (!session) {
      return res.status(401).json({
        message: "Can not create session",
        success: false,
      });
    }

    menteeProile.sessions.push(session._id);
    mentorProfile.sessions.push(session._id);
    await menteeProile.save();
    await mentorProfile.save();
    return res.status(201).json({
      message: "Session is created successfully",
      session,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(501).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const GetASession = async (req, res) => {
  try {
    const id = req.params.id;
    const session = await GetASessionByid(id);
    if (!session) {
      return res.status(404).json({
        message: "Could not found session",
        success: false,
      });
    }
    return res.status(201).json({
      session,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(501).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const Reschedule = async (req, res) => {
  try {
    const { mentor, date, notes, topic } = req.body;
    const id = req.params.id;
    const data = {
      mentor,
      date,
      notes,
      topic,
    };
    const exist = await GetASessionByid(id);
    if (!exist) {
      return res.status(404).json({
        message: "Can not get any session with this id ",
        success: false,
      });
    }
    const reschedule = await RescheduleService(exist._id, data);
    if (!reschedule) {
      return res.status(403).json({
        message: "can not reschedule",
        success: false,
      });
    }

    return res.status(201).json({
      message: "reschedule successfully",
      reschedule,
      success: true,
    });
  } catch (error) {
    console.log("error to reschedule ", error);
    return res.status(501).json({
      message: "internal server error",
      successL: false,
    });
  }
};

export const CancelledSessions = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(401).json({
        message: "Empty id ",
        success: false,
      });
    }
    const deleted = await CancelledSessionService(id);
    if (!deleted) {
      return res.status(403).json({
        message: "Can not cancelled session",
        success: false,
      });
    }
    return res.status(201).json({
      message: "Session is successfully cancelled",
      deleted,
      success: true,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(501).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const UpdateASession = async (req, res) => {
  try {
    const { status, id, mentor } = req.body;
    const isExisted = await GetASessionByid(id);
    if (!isExisted) {
      return res.status(404).json({
        message: "Does not exist any session with this id",
        success: false,
      });
    }
    if (isExisted.mentor.toString() !== mentor.toString()) {
      return res.status(401).json({
        message: "unauthenticated",
        success: false,
      });
    }

    if (!status) {
      return res.status(403).json({
        message: "status is empty",
        success: false,
      });
    }
    const updated = await UpdateSessionByIdService(id, status);
    if (!updated) {
      return res.status(404).json({
        message: "can not update Message",
        success: false,
      });
    }
    return res.status(201).json({
      message: "Session is updated",
      success: true,
      updated,
    });
  } catch (error) {
    console.log("error to updateSession", error);
    return res.status(501).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const GetAllSession = async (req, res) => {
  try {
    const authuser = req.user.userId;
    const response = await GetAllSessions(authuser);
    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Can not find any messages from authuser",
      });
    }
    return res.status(201).json({
      success: true,
      response,
    });
  } catch (error) {
    console.log("error to get sessions", error);
  }
};

export const searchSession = async (req, res) => {
  try {
    const { query } = req.body;
    const sessions = await sessionSearchService(query);
    if (!sessions) {
      return res.status(404).json({
        message: "Can not get sessions ",
        success: false,
      });
    }
    return res.status(201).json({
      success: true,
      session: sessions,
    });
  } catch (error) {
    console.log("error to serach", error);
    return res.status(501).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const SearchSessionByCategory = async (req, res) => {
  try {
    const { category } = req.body;
    console.log("category", category);
    const userId = req.user.userId;
    const result = await SearchSessionByCategoryService(userId, category);
    if (!result) {
      return res.status(404).json({
        message: "Can not find any session",
        success: false,
      });
    }
    return res.status(201).json({
      result,
      success: true,
    });
  } catch (error) {
    console.log("error to search session by category", error);
    return res.status(501).json({
      message: "Internal server error",
      success: false,
    });
  }
};
