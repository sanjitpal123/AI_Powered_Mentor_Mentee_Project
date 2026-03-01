import {
  CreatePerformanceService,
  getPerformanceOfAllMenteeInATaskService,
  isCheckedExistedScoreService,
  updatedScoreService,
} from "../Services/Performance.js";

export const createPerformance = async (req, res) => {
  try {
    const { totalquestion, correctanswer, wronganswer, score, mentee, task } =
      req.body;

    // check if present mentee id and task id so update
    const isExisted = await isCheckedExistedScoreService(mentee, task);
    console.log("isexited", isExisted);
    if (isExisted) {
      const result = await updatedScoreService(isExisted._id, mentee, {
        totalquestion,
        score,
        correctanswer,
        wronganswer,
        task,
      });
      if (result) {
        return res.status(201).json({
          message: "score is updated successfully",
          result,
        });
      } else {
        return res.status(403).json({
          message: "Can not update successfully ",
          success: false,
        });
      }
    } else {
      const CreatePerformance = await CreatePerformanceService({
        totalquestion,
        score,
        mentee,
        correctanswer,
        wronganswer,
        task,
      });
      if (!createPerformance) {
        return res.status(403).json({
          message: "Can not create performance",
          success: false,
        });
      }
      return res.status(201).json({
        message: "Create performance successfully",
        CreatePerformance,
      });
    }
  } catch (error) {
    console.log("error to create performance", error);
    return res.status(501).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const getPerformanceOfAMentee = async (req, res) => {
  try {
    const { mentee, task } = req.body;
    const isExisted = await isCheckedExistedScoreService(mentee, task);
    if (!isExisted) {
      return res.status(404).json({
        message: "Can not get performance ",
        success: false,
      });
    }
    return res.status(201).json({
      success: true,
      message: "get the performance of mentee",
      isExisted,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(501).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const getPerformanceOfAllMenteeInATask = async (req, res) => {
  try {
    const { taskid } = req.body;
    const respose = await getPerformanceOfAllMenteeInATaskService(taskid);
    if (!taskid) {
      return res.status(404).json({
        success: false,
        message: "Please provide taskid",
      });
    }
    if (!respose) {
      return res.status(403).json({
        message: "Can not get performances",
        success: false,
      });
    }
    return res.status(201).json(respose);
  } catch (error) {}
};
