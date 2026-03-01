import axiosInstance from "./AxiosInstance";

async function GetMentorsBySkills(filters) {
  try {
    console.log("err", filters);
    const res = await axiosInstance.post("mentor/filtermentor", filters);
    return res.data;
  } catch (error) {
    throw error;
  }
}
export default GetMentorsBySkills;
