import mongoose, { Schema, Types } from "mongoose";

const questionsSchema = new mongoose.Schema({
  question: {
    type: String,
  },
  choice1: {
    type: String,
  },
  choice2: {
    type: String,
  },
  choice3: {
    type: String,
  },
  choice4: {
    type: String,
  },
  answer: {
    type: String,
  },
});
const TaskSchema = new mongoose.Schema(
  {
    Title: {
      type: String,
      requireq: true,
    },
    Description: {
      type: String,
      required: true,
    },
    Duedate: {
      type: Date,
      required: true,
    },

    AttendedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    CreatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    Questions: [questionsSchema],
    Mentees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", TaskSchema);

export default Task;
