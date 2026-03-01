import axiosInstance from "./AxiosInstance";
async function LowToHighFiltering() {
  try {
    const res = await axiosInstance.get("mentor/lowtohigh");
    return res.data;
  } catch (error) {
    throw error;
  }
}
export default LowToHighFiltering;
