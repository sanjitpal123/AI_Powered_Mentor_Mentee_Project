import User from "../Model/UserSchema.js";

export const GetAllMenteeRepo = async () => {
  try {
    const result = await User.find({
      role: { $regex: "mentee", $options: "i" },
    });
    return result;
  } catch (error) {
    throw error;
  }
};

export const GetMenteeByIdRepo = async (id) => {
  try {
    const user = await User.findById(id)
      .select("-password")
      .populate("wishlist")
      .populate({
        path: "feedback",
        populate: {
          path: "mentor",
          select: "-password ",
        },
      });

    console.log(JSON.stringify(user, null, 2));
    console.log("helloe mentors", user);

    return user;
  } catch (error) {
    throw error;
  }
};
