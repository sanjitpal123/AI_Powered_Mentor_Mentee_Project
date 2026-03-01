import { AddToWishListRepo } from "../Repository/WishList";

export const AddToWishListService = async (obj) => {
  try {
    const created = await AddToWishListRepo(obj);
    return created;
  } catch (error) {
    throw error;
  }
};
