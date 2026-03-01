import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    skills: [String],
    profile: {
      type: String,
    },
    role: {
      type: String,
      enum: ["mentor", "mentee"],
      required: true,
    },
    bio: { type: String },
    picture: { type: String },
    lastActive: {
      type: Date,
    },
    linked: { type: String },
    website: { type: String },
    github: { type: String },
    experience: { type: Number },
    price: { type: Number },
    notication: [{ type: mongoose.Schema.Types.ObjectId, ref: "Notice" }],
    feedback: [{ type: mongoose.Schema.Types.ObjectId, ref: "Feedback" }],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        comment: String,
        review: Number,
      },
    ],
    sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Session" }],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    mentees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true } // ✅ fixed
);

// ✅ Fixed Pre-save Hook
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // avoid re-hashing

  try {
    const salt = await bcrypt.genSalt(10); // ✅ await here
    this.password = await bcrypt.hash(this.password, salt); // ✅ proper inputs
    next(); // ✅ just next()
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);
export default User;
