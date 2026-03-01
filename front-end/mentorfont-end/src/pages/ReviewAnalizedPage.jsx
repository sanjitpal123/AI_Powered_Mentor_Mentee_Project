import { useEffect, useState, useContext } from "react";
import ReviewAnalized from "../services/ReviewAnalized";
import { GlobalContext } from "../ContextApiStore/ContextStore";

function ReviewAnalizedPage() {
  const { User } = useContext(GlobalContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const [ResponseData, setResponseData] = useState(null);

  async function GetReviewSummary() {
    try {
      const res = await ReviewAnalized(user.token);
      console.log("Raw AI Response:", res);

      // ✅ Parse stringified JSON safely
      const parsed =
        typeof res.resonse === "string" ? JSON.parse(res.resonse) : res.resonse;

      setResponseData(parsed);
    } catch (error) {
      console.error("Error fetching review analysis:", error);
    }
  }

  useEffect(() => {
    GetReviewSummary();
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <h1 className="text-3xl font-bold text-red-500 mb-6 tracking-wide">
        Review Sentiment Analysis
      </h1>

      {ResponseData ? (
        <div className="bg-gray-900 border border-red-500 p-6 rounded-2xl shadow-xl max-w-xl w-full text-center transition-all duration-300 hover:scale-105">
          <div className="flex justify-around mb-6">
            <div className="flex flex-col items-center">
              <span className="text-red-400 text-xl font-semibold">
                Positive
              </span>
              <span className="text-2xl font-bold text-white">
                {ResponseData.positive}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-red-400 text-xl font-semibold">
                Neutral
              </span>
              <span className="text-2xl font-bold text-white">
                {ResponseData.neutral}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-red-400 text-xl font-semibold">
                Negative
              </span>
              <span className="text-2xl font-bold text-white">
                {ResponseData.negative}
              </span>
            </div>
          </div>

          <p className="text-lg text-gray-200 leading-relaxed italic border-t border-gray-700 pt-4">
            {ResponseData.summary}
          </p>
        </div>
      ) : (
        <p className="text-gray-400 animate-pulse">Analyzing feedback...</p>
      )}
    </div>
  );
}

export default ReviewAnalizedPage;
