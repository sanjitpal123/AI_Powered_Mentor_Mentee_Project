import axiosInstance from "./AxiosInstance";

async function GetAllMentosService(token) {
  try {
    console.log("token here ", token);
    const res = await axiosInstance.post(
      "/ai-features/match-mentor",
      {},
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("resposnve to get mentor by ai ", res);
    return res.data;
  } catch (error) {
    console.log("error to get mentor by ai", error);
    throw error;
  }
}

export default GetAllMentosService;

export const GetAllMentorser = async () => {
  try {
    const res = await axiosInstance.get("/mentor/allmentor");
    console.log("all mentors", res);
    return res.data;
  } catch (error) {
    console.log("error", error);
  }
};
