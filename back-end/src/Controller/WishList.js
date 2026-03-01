import { AddToWishListService } from "../Services/WishList.js";

export const AddToWishList = async (req, res) => {
  try {
    const user = req.user.userId;
    const mentorId = req.body;
    const FavoriteIt = await AddToWishListService({ user, mentorId });
    if (!FavoriteIt) {
      return res.status(401).json({
        message: "Can not make it favorite",
        success: false,
      });
    }
    return res.status(201).json({
      message: "Mentor is added to your wishList",
      success: false,
    });
  } catch (error) {
    console.log("error", error);
  }
};
