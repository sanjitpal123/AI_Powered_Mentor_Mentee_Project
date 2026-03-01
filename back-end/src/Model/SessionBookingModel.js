import mongoose from "mongoose";
const SessionBooking = new mongoose.Schema(
  {
    mentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mentee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    date: {
      type: Date,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "confirm", "complete", "calcalled"],
      default: "pending",
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

const Session = mongoose.model("Session", SessionBooking);
export default Session;
