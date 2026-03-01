import axiosInstance from "./AxiosInstance";
export const SubmitFeedback = async (token, obj) => {
  try {
    const res = await axiosInstance.post("/feedback/create", obj, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
