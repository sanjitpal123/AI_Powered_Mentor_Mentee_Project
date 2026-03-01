import axiosInstance from "./AxiosInstance";

async function CreateSessionSer(FormData, token) {
  try {
    console.log("toekn to create session", token);
    const res = await axiosInstance.post("/session/create", FormData, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}

export default CreateSessionSer;

export const UpdateStatus = async (formdata, token) => {
  try {
    const res = await axiosInstance.post("/session/updatesession", formdata, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const GetAllSessionSer = async (token) => {
  try {
    const res = await axiosInstance.get("/session/getallsession", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const searchSession = async (token, query) => {
  try {
    console.log("session token", token);
    const res = await axiosInstance.post(
      "/session/search",
      { query }, // request body
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

export const SearchSessionByCategorySer = async (token, data) => {
  try {
    const res = await axiosInstance.post("/session/searchbycategory", data, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const RescheduleSessionSer = async (token, data, sessionId) => {
  try {
    const res = await axiosInstance.put(
      `/session/reschedule/${sessionId}`,
      data,
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
