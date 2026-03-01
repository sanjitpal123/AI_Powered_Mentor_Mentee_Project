import {
  GetAllMenteeService,
  GetMenteeByIdService,
} from "../Services/Mentee.js";

export const GetAllMentee = async (req, res) => {
  try {
    const getAll = await GetAllMenteeService();
    if (!getAll) {
      return res.status(404).json({
        message: "Can not get mentee",
        success: false,
      });
    }
    return res.status(201).json(getAll);
  } catch (error) {
    console.log("error", error);
    return res.status(501).json({
      message: "Internal server error",
      success: false,
    });
  }
};

import mongoose from "mongoose";

export const AddMentorToWishList = async (req, res) => {
  // try {
  //   let { mentorId } = req.body;
  //   const userId = req.user.userId;
  //   // Make sure mentorId is a string
  //   mentorId = mentorId.toString().trim();
  //   const existedUser = await GetMenteeByIdService(userId);
  //   if (!existedUser) {
  //     return res.status(404).json({
  //       message: "Cannot get user",
  //       success: false,
  //     });
  //   }
  //   // Convert wishlist IDs to strings
  //   const wishlistIds = existedUser.wishlist
  //     .filter((id) => id)
  //     .map((id) => id.toString());
  //   if (wishlistIds.includes(mentorId)) {
  //     // Remove mentor
  //     existedUser.wishlist = existedUser.wishlist.filter(
  //       (id) => id.toString() !== mentorId
  //     );
  //     await existedUser.save();
  //     return res.status(200).json({
  //       message: "Mentor unsaved successfully",
  //       success: true,
  //     });
  //   } else {
  //     // Only push if NOT already present
  //     existedUser.wishlist.push(new mongoose.Types.ObjectId(mentorId));
  //     await existedUser.save();
  //     return res.status(200).json({
  //       message: "Mentor saved successfully",
  //       success: true,
  //     });
  //   }
  // } catch (error) {
  //   console.error("Wishlist toggle error:", error);
  //   return res.status(500).json({
  //     message: "Internal server error",
  //     success: false,
  //   });
  // }
};

export const GetMenteeById = async (req, res) => {
  try {
    const id = req.params.id;
    const mentee = await GetMenteeByIdService(id);
    if (!mentee) {
      return res.status(404).json({
        message: "Can not found any mentee",
        success: false,
      });
    }
    return res.status(201).json(mentee);
  } catch (error) {
    return res.status(501).json({
      message: "Internal server error",
      success: false,
    });
  }
};
