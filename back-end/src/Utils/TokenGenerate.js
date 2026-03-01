import jwt from "jsonwebtoken";
import dotenv from "dotenv";
export const GenerateToken = async (user) => {
  try {
    const expireIn = 90 * 24 * 60 * 60;
    const token = jwt.sign({ userId: user._id }, process.env.SECRET, {
      expiresIn: expireIn,
    });
    const expire = new Date(Date.now() + expireIn * 1000);
    console.log("expire now", expire);
    return { token, expire };
  } catch (error) {
    throw error;
  }
};
