import UserToken from "../Model/UserToken.js";

export const GetAllToken = async (req, res) => {
  try {
    const getallToken = await UserToken.find({});
    if (!getallToken) {
      return res.status(404).json({
        message: "Can not find any token ",
      });
    }
    return res.status(201).json({
      success: "Get all token",
      getallToken,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(501).json({
      success: false,
      message: "Internal server error",
    });
  }
};
