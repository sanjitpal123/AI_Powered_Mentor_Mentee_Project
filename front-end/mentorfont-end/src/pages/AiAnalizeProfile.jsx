import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../ContextApiStore/ContextStore";
import { GetMenteeProfileAnalizedByAI } from "../services/GetMenteeProfile";
import { motion } from "framer-motion";

export const AiAnalizeProfile = () => {
  const { User } = useContext(GlobalContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const [responseText, setResponseText] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [loading, setLoading] = useState(true);
  const [fetchingNew, setFetchingNew] = useState(false);

  // 🧠 Fetch the AI analysis
  async function GetAnalizeData(isNewInsight = false) {
    try {
      if (isNewInsight) {
        setFetchingNew(true);
        setDisplayedText("");
      } else {
        setLoading(true);
      }

      const res = await GetMenteeProfileAnalizedByAI(user.token);
      console.log("analyze response from AI", res);
      setResponseText(res.response);
    } catch (error) {
      console.log("get mentee profile", error);
      setResponseText(
        "⚠️ Unable to fetch AI analysis. Please try again later.",
      );
    } finally {
      setLoading(false);
      setFetchingNew(false);
    }
  }

  useEffect(() => {
    GetAnalizeData();
  }, []);

  // 🎬 Typewriter animation
  useEffect(() => {
    if (!responseText) return;
    let index = 0;
    setDisplayedText("");

    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + responseText.charAt(index));
      index++;
      if (index >= responseText.length) clearInterval(interval);
    }, 30);

    return () => clearInterval(interval);
  }, [responseText]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl w-full bg-gradient-to-br from-black via-gray-900 to-red-900 rounded-2xl shadow-2xl p-8 border border-red-600"
      >
        <h1 className="text-3xl font-extrabold text-red-500 text-center mb-6">
          🔥 AI Profile Analysis
        </h1>

        {loading ? (
          <div className="text-center text-gray-400 animate-pulse">
            Analyzing your profile...
          </div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg leading-relaxed text-gray-100 bg-black/40 rounded-xl p-6 border border-red-700 shadow-inner font-mono"
            >
              {displayedText || "No analysis found."}
              {displayedText.length < responseText.length && (
                <span className="animate-pulse text-red-500">|</span>
              )}
            </motion.div>

            {/* 🔁 Get New Insight Button */}
            <div className="mt-6 text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => GetAnalizeData(true)}
                disabled={fetchingNew}
                className={`px-6 py-3 rounded-xl font-semibold shadow-lg transition duration-300 ${
                  fetchingNew
                    ? "bg-red-800 cursor-not-allowed text-gray-300"
                    : "bg-red-600 hover:bg-red-700 text-white"
                }`}
              >
                {fetchingNew
                  ? "✨ Getting new insight..."
                  : "🔁 Get New Insight"}
              </motion.button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};
