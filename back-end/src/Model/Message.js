import mongoose from "mongoose";
const MessageSchema = mongoose.Schema(
  {
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isDeletedForEveryone: {
      type: Boolean,
      default: false,
    },
    deletedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    text: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);
const message = mongoose.model("message", MessageSchema);
export default message;
