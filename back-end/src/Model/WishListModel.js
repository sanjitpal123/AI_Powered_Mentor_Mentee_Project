import mongoose from "mongoose";
const wishList = mongoose.Schema({
  mentorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const WishList = mongoose.model("WishList", wishList);
export default WishList;
