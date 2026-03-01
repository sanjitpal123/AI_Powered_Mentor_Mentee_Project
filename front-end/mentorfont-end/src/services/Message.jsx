import axiosInstance from "./AxiosInstance";

export const sendMessage = async (data, token) => {
  try {
    const res = await axiosInstance.post("/message", data, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const GetAllMessageSer = async (id, token) => {
  try {
    const res = await axiosInstance.post(
      "message/getconvomessage",
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
export const SeenMessageMessage = async (convoId, token) => {
  try {
    const res = await axiosInstance.post(
      "/message/mark_seen",
      { convoId },
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

export const EditMessage = async (id, text, token) => {
  try {
    const res = await axiosInstance.put(
      `/message/editmessage/${id}`,
      { text: text },
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

export const DeleteMessageForEveryoneService = async (id) => {
  try {
    const res = await axiosInstance.delete(`/message/deleteforeveryone/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const DeleteForMeSer = async (id, token) => {
  try {
    const res = await axiosInstance.delete(`/message/deleteforme/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
