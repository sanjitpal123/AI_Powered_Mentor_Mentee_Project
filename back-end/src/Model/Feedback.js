import mongoose from "mongoose";

const FeedBackSchema = new mongoose.Schema(
  {
    mentee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    mentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Feedback = mongoose.model("Feedback", FeedBackSchema);
export default Feedback;
