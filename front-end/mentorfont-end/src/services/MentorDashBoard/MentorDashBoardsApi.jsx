import axiosInstance from "../AxiosInstance";

export const GetMentorByidSer = async (id, token) => {
  try {
    const res = await axiosInstance.post(
      "/mentor/getmentorbyid",
      { id },
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

export const GetMentorConvo = async (token) => {
  try {
    const res = await axiosInstance.get("/convo/getuserconvo", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
