import axiosInstance from "./AxiosInstance";
export const CreateConvo = async (receiverId, token) => {
  try {
    const res = await axiosInstance.post(
      "/convo",
      { receiverId },
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
};

export const FetchConvoById = async (id, token) => {
  try {
    console.log("token is here", token);
    const res = await axiosInstance.post(
      "/convo/getconvobyid",
      { id },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("res.data", res.data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
