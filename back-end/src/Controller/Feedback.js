import message from "../Model/Message.js";
import { CreateFeedbackService } from "../Services/FeedBack.js";
import { GetMenteeByIdService } from "../Services/Mentee.js";

export const CreateFeedBack = async (req, res) => {
  try {
    const { mentee, mentor, comment } = req.body;
    if (!mentee || !mentor || !comment) {
      return res.status(201).json({
        message: "fields are missing , please fill all the field",
      });
    }

    const created = await CreateFeedbackService({ mentee, mentor, comment });
    const menteeexist = await GetMenteeByIdService(mentee);
    if (!menteeexist) {
      return res.status(404).json({
        message: "Could find mentee with this id",
        success: false,
      });
    }

    if (!created) {
      return res.status(403).json({
        message: "Could not create feedback",
        success: true,
      });
    }
    menteeexist.feedback.push(created._id);
    await menteeexist.save();
    return res.status(201).json({
      message: "Created Feedback",
      created,
      success: true,
    });
  } catch (error) {
    console.log("error", error);
  }
};
