import mongoose from "mongoose";
const ConversationSchema = mongoose.Schema(
  {
    participants: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "message",
    },
  },
  { timestamps: true }
);
const Conversation = mongoose.model("Conversation", ConversationSchema);
export default Conversation;
