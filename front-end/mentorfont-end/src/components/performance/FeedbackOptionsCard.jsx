import React from "react";
import { MessageSquare, Bot } from "lucide-react";

export const FeedbackOptionsCard = ({
  feedback2,
  setFeedback2,
  feedBackOFAi,
  setFeedBackOfAi,
  ClickedOnWriteFeedback,
  handleWriteFeedbackClick,
  handleFeedByManual,
  handleAiFeedback,
  handleSubmitFeedback,
  isLoading,
}) => {
  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-red-500/20 hover:border-red-500/40 transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
          <MessageSquare className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-red-400">Feedback Options</h2>
          <p className="text-gray-400 text-sm">Provide or generate feedback</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Manual Feedback */}
        <div className="bg-black/50 rounded-lg p-6 border border-gray-700 hover:border-red-500/50 transition-all duration-300">
          {ClickedOnWriteFeedback && (
            <textarea
              placeholder="Write feedback here..."
              value={feedback2}
              onChange={(e) => setFeedback2(e.target.value)}
              className="w-full h-40 p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
            ></textarea>
          )}
          <div className="flex items-center gap-3 mb-4">
            <MessageSquare className="w-6 h-6 text-red-400" />
            <h3 className="font-semibold text-white">Give Feedback</h3>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            Write personalized feedback based on the mentee's performance
          </p>
          {feedback2 ? (
            <button
              className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition-colors duration-300"
              onClick={handleFeedByManual}
            >
              Submit
            </button>
          ) : (
            <button
              onClick={handleWriteFeedbackClick}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              Write Feedback
            </button>
          )}
        </div>

        {/* AI Feedback */}
        <div className="bg-black/50 rounded-lg p-6 border border-gray-700 hover:border-red-500/50 transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <Bot className="w-6 h-6 text-red-400" />
            <h3 className="font-semibold text-white">AI Feedback</h3>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            Generate intelligent feedback using AI based on performance data
          </p>
          {!isLoading && feedBackOFAi && (
            <textarea
              placeholder="Write feedback here..."
              value={feedBackOFAi && feedBackOFAi}
              onChange={(e) => setFeedBackOfAi(e.target.value)}
              className="w-full h-40 p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
            ></textarea>
          )}
          {!feedBackOFAi ? (
            <button
              onClick={handleAiFeedback}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Bot className="w-4 h-4" />
              {`${isLoading ? "Generating..." : "Generate AI Feedback"}`}
            </button>
          ) : (
            <button
              onClick={handleSubmitFeedback}
              className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition-colors duration-300"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
