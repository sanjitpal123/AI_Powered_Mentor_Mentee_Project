import User from "../Model/UserSchema.js";

export const RegisterUser = async (data) => {
  try {
    const user = await User.create(data);
    user.save();
    return user;
  } catch (error) {
    throw error;
  }
};

export const UserExist = async (email) => {
  try {
    const user = await User.findOne({ email })
      .populate("sessions")
      .populate("feedback");
    return user;
  } catch (error) {
    throw error;
  }
};

//Getting mentee by Id
export const GetMenteeByIdRepo = async (id) => {
  try {
    const user = await User.findById(id)
      .select("-password")
      .populate("wishlist");

    console.log(JSON.stringify(user, null, 2));

    return user;
  } catch (error) {
    throw error;
  }
};

export const UpdateProfileById = async (data, id) => {
  try {
    const updatedProfile = await User.findByIdAndUpdate(id, data, {
      new: true,
    });
    return updatedProfile;
  } catch (error) {
    throw error;
  }
};

export const GetUser = async () => {
  try {
    const users = await User.find({});
    return users;
  } catch (error) {
    throw error;
  }
};
