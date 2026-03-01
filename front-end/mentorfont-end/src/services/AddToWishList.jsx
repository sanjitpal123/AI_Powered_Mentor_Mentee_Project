import axiosInstance from "./AxiosInstance";
import axios from "axios";
async function WishListSer(mentorId, token) {
  try {
    console.log("tokens", token);
    const res = await axiosInstance.post(
      "wishlist/savenunsave",
      { mentorId },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}
export default WishListSer;
