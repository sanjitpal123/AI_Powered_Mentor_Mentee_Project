import mongoose from "mongoose";

const PerformanceSchema = new mongoose.Schema(
  {
    totalquestion: {
      type: Number,
      required: true,
    },
    correctanswer: {
      type: Number,
      required: true,
    },
    mentee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    wronganswer: {
      type: Number,
      required: true,
    },

    score: {
      type: String,
      required: true,
    },
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
  },
  { timestamps: true }
);

const Performance = mongoose.model("Performance", PerformanceSchema);
export default Performance;
