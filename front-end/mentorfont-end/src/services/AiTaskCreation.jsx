import axiosInstance from "./AxiosInstance";

async function AiCreatedTask(topic) {
  try {
    const res = await axiosInstance.post("/ai-features/task-creation", {
      topic,
    });

    return res.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

export default AiCreatedTask;
