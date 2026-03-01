import axiosInstance from "./AxiosInstance";

export const CreateNotificationSer = async (data, token) => {
  console.log("tokenwhile createing ", token);

  try {
    const res = await axiosInstance.post("/notification/create", data, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const GetNotification = async (token) => {
  try {
    console.log("token to get notification", token);
    const res = await axiosInstance.get("/notification/getnotfication", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log("error in getting notification", error);
    throw error;
  }
};

export const UpdateIsRead = async (token) => {
  try {
    console.log("token", token);

    const res = await axiosInstance.put(
      "/notification/update-isread",
      {}, // empty body
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
