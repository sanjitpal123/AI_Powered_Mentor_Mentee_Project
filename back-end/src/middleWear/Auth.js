import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const Auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("token", authHeader);
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({
        message: "Could not provided token",
        success: false,
      });
    }

    const token = authHeader.split(" ")[1];
    console.log("token", token);
    const decode = jwt.verify(token, process.env.SECRET);
    req.user = decode;
    console.log("req.user", req.user);
    next();
  } catch (error) {
    console.log("error", error);
    return res.status(501).json({
      message: "Invalid token or expired token",
    });
  }
};
