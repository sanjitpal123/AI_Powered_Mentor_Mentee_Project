import Session from "../Model/SessionBookingModel.js";

export const CreateSessionRepo = async (data) => {
  try {
    const res = await Session.create(data);
    return res;
  } catch (error) {
    throw error;
  }
};

export const GetASessionByIdRepo = async (id) => {
  try {
    const session = await Session.findById(id);
    return session;
  } catch (error) {
    throw error;
  }
};

export const RescheduleRepo = async (id, data) => {
  try {
    const updated = await Session.findByIdAndUpdate(
      id,
      { $set: data }, // wrap in object
      { new: true }
    );
    return updated;
  } catch (error) {
    throw error;
  }
};
export const CancelledSessionRepo = async (id) => {
  try {
    const datedone = await Session.findByIdAndDelete(id);
    return datedone;
  } catch (error) {
    throw error;
  }
};

export const UpdateSessionByIdRepo = async (id, status) => {
  try {
    const res = await Session.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true }
    );
    return res;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

export const GetAllSessionRepo = async (userId) => {
  try {
    const res = await Session.find({
      $or: [{ mentor: userId }, { mentee: userId }],
    })
      .populate("mentor")
      .populate("mentee");
    return res;
  } catch (error) {
    throw error;
  }
};

export const sessionSearchRepo = async (query) => {
  try {
    const res = await Session.find({ topic: { $regex: query, $options: "i" } });
    return res;
  } catch (error) {
    throw error;
  }
};

export const SearchSessionByCategoryRepo = async (userId, category) => {
  try {
    console.log("userId", userId);
    const result = await Session.find({
      $or: [{ mentee: userId }, { mentor: userId }],
      status: category,
    });
    console.log("result to get sessionby category in back-end", result);
    return result;
  } catch (error) {
    throw error;
  }
};
