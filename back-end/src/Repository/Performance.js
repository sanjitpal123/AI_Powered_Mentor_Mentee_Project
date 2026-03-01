import Performance from "../Model/Performance.js";
import mongoose from "mongoose";
export const CreatePerformanceRepo = async (data) => {
  try {
    const res = await Performance.create(data);
    return res;
  } catch (error) {
    throw error;
  }
};

export const CheckIsExisted = async (mentee, task) => {
  try {
    console.log("mentee", mentee, "and task", task);
    const isExisted = await Performance.findOne({ mentee, task }).populate(
      "mentee"
    );
    console.log("isExisted", isExisted);

    return isExisted; // null if not found, doc if found
  } catch (error) {
    throw error;
  }
};

export const UpdateScore = async (taskid, menteeid, data) => {
  try {
    // menteeid must be a valid ObjectId string
    const res = await Performance.findOneAndUpdate(
      { mentee: menteeid }, // filter
      { $set: data }, // must be an object with fields to update
      { new: true, upsert: true } // return updated doc, don't create new
    );

    console.log("response to update score", res);
    return res;
  } catch (error) {
    console.error("error to update performance", error);
    throw error;
  }
};

export const getPerformanceOfAllMenteeInATaskRepo = async (taskId) => {
  try {
    const performances = await Performance.find({ task: taskId })
      .populate("mentee", "-password")
      .sort({ score: -1 });
    return performances;
  } catch (error) {
    throw error;
  }
};
