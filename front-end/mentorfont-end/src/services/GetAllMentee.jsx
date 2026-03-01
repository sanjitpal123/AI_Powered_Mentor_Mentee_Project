import axiosInstance from "./AxiosInstance";

async function FetchAllMentee() {
  try {
    const res = await axiosInstance.get("mentee/getall");
    return res.data;
  } catch (error) {
    throw error;
  }
}
export default FetchAllMentee;
