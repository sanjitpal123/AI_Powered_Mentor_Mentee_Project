import axiosInstance from "./AxiosInstance";

const SearchMentorService = async (query) => {
  try {
    const res = await axiosInstance.post("mentor/search", { query });
    console.log("reqdfdsfs", query);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export default SearchMentorService;
