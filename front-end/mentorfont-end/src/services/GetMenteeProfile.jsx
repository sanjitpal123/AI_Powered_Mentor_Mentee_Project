import axiosInstance from "./AxiosInstance";

async function GetMenteeprofileser(id) {
  try {
    console.log("id si hrer", id);
    const res = await axiosInstance.get(`mentee/getamentee/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}
export default GetMenteeprofileser;

export const GetMenteeProfileAnalizedByAI = async (token) => {
  console.log("token to get analize", token);
  try {
    const res = await axiosInstance.post(
      "/ai-features/mentee-profile-analize",
      {},
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
