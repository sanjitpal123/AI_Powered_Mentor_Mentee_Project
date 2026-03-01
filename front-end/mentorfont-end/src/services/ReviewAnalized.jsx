import axiosInstance from "./AxiosInstance";

async function ReviewAnalized(token) {
  try {
    console.log("token sending while review analized", token);
    const res = await axiosInstance.post(
      "/ai-features/ai-review-analizer",
      {},

      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("response from ai review", res);
    return res.data;
  } catch (error) {
    console.log("error", error);
  }
}

export default ReviewAnalized;
