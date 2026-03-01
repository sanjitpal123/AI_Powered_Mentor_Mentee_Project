import mongoose, { Mongoose } from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // name of your User model
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    convoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
    },
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
    },

    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["warn", "danger", "feedback", "info", "session"],
      default: "info",
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", NotificationSchema);

export default Notification;
