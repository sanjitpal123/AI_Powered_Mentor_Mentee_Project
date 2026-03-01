import mongoose from "mongoose";

const userTokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    token: {
      type: String,
      required: true,
      index: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    loginAt: {
      type: Date,
      default: Date.now,
    },

    logoutAt: {
      type: Date,
      default: null,
    },

    expireAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("UserToken", userTokenSchema);
