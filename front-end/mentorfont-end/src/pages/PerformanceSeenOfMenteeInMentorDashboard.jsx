import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Mail,
  Trophy,
  Target,
  // User AS userIcon,
  CheckCircle,
  XCircle,
  MessageSquare,
  Bot,
} from "lucide-react";
import AiAsk from "../services/AIQuestionAndAnswer";
import { GlobalContext } from "../ContextApiStore/ContextStore";
import { SubmitFeedback } from "../services/Feedback";
import { toast } from "react-toastify";
function PerformanceMentee() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const { User } = useContext(GlobalContext);
  const wholeobj = JSON.parse(localStorage.getItem("user"));
  const { performance } = location.state || {};
  const [feedBackOFAi, setFeedBackOfAi] = useState(null);
  const [feedback2, setFeedback2] = useState("");
  const [ClickedOnWriteFeedback, setClickedOnWriteFeedback] = useState(false);

  async function handleAiFeedback() {
    console.log("click");
    setFeedBackOfAi("");
    setIsLoading(true);

    try {
      const content = `
You are an expert mentor. Generate a **short, attractive, and motivational feedback for a mentee based on the following data. 
Do **not** and also don't need !**\n \n add any preamble like "Here is the feedback" or "Written below is feedback". 
Do **not** include the words "feedback" or "score" in your response. 
Make it positive,but also give reality , it should be reality feedback not that fake with simple words  
Mentee Name: ${performance.mentee.name}
Correct Answers: ${performance.correctanswer}
Wrong Answers: ${performance.wronganswer}
Total Questions: ${performance.totalquestion}
Score: ${performance.score}

Output **only the feedback text**.
`;
      const res = await AiAsk(content);
      console.log("response to write feedback by ai", res);
      setFeedBackOfAi(res.parts[0].text);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("error to write feedback by ai", error);
    }
  }
  function handleWriteFeedbackClick() {
    setClickedOnWriteFeedback(true);
  }

  async function handleSubmitFeedback() {
    try {
      const data = {
        mentee: performance.mentee._id,
        mentor: wholeobj._id,
        comment: feedBackOFAi,
      };
      const res = await SubmitFeedback(wholeobj.token, data);
      console.log("response to submit feedback", res);
      toast.success("Submitted feedback successfully");
      setFeedBackOfAi("");
    } catch (error) {
      console.log("responsive to submit feedback", error);
    }
  }
  async function handleFeedByManual() {
    console.log("click");
    try {
      const data = {
        mentee: performance.mentee._id,
        mentor: wholeobj._id,
        comment: feedback2,
      };
      const response = await SubmitFeedback(wholeobj.token, data);
      toast.success("Submitted Feedback Successfully");
      setFeedback2("");
      setClickedOnWriteFeedback(false);
    } catch (error) {
      console.log("error to send feedback ", error);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-red-500 mb-2">
            Mentee Performance Dashboard
          </h1>
          <p className="text-gray-300">
            Detailed performance analysis and feedback options
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Mentee Profile Section */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-xl p-6 border border-red-500/20 hover:border-red-500/40 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                  {/* <User className="w-6 h-6 text-white" /> */}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-red-400">
                    Mentee Profile
                  </h2>
                  <p className="text-gray-400 text-sm">Personal Information</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  {/* <User className="w-5 h-5 text-red-400" /> */}
                  <div>
                    <p className="text-sm text-gray-400">Name</p>
                    <p className="font-medium">{performance.mentee.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-red-400" />
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="font-medium">{performance.mentee.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Trophy className="w-5 h-5 text-red-400" />
                  <div>
                    <p className="text-sm text-gray-400">Experience</p>
                    <p className="font-medium">
                      {performance.mentee?.experience}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* <Github className="w-5 h-5 text-red-400" /> */}
                  <div>
                    <p className="text-sm text-gray-400">GitHub</p>
                    <p className="font-medium text-blue-400">
                      {performance.mentee?.github}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-sm text-gray-400">LinkedIn</p>
                    <p className="font-medium text-blue-400">
                      {performance.mentee?.linked}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bio Section */}
              <div className="mt-6 pt-6 border-t border-gray-700">
                <p className="text-sm text-gray-400 mb-2">Bio</p>
                <p className="text-gray-300 leading-relaxed">
                  {performance?.mentee.bio}{" "}
                </p>
              </div>
            </div>
          </div>

          {/* Performance Metrics Section */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 rounded-xl p-6 border border-red-500/20 hover:border-red-500/40 transition-all duration-300 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-red-400">
                    Performance Metrics
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Task completion analysis
                  </p>
                </div>
              </div>

              {/* Score Display */}
              <div className="text-center mb-8">
                <div className="relative inline-block">
                  <div className="w-32 h-32 rounded-full border-8 border-gray-700 flex items-center justify-center relative">
                    <div className="text-center z-10">
                      <div className="text-3xl font-bold text-red-400">
                        {performance?.score}
                      </div>
                      <div className="text-sm text-gray-400">Score %</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-black/50 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                    <div>
                      <p className="text-2xl font-bold text-green-400">
                        {performance.correctanswer}
                      </p>
                      <p className="text-sm text-gray-400">Correct Answers</p>
                    </div>
                  </div>
                </div>

                <div className="bg-black/50 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center gap-3">
                    <XCircle className="w-8 h-8 text-red-500" />
                    <div>
                      <p className="text-2xl font-bold text-red-400">
                        {performance.wronganswer}
                      </p>
                      <p className="text-sm text-gray-400">Wrong Answers</p>
                    </div>
                  </div>
                </div>

                <div className="bg-black/50 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center gap-3">
                    <Target className="w-8 h-8 text-blue-500" />
                    <div>
                      <p className="text-2xl font-bold text-blue-400">
                        {performance.totalquestion}
                      </p>
                      <p className="text-sm text-gray-400">Total Questions</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Task Information */}
              <div className="bg-black/30 rounded-lg p-4 border border-gray-700">
                <h3 className="font-semibold text-gray-300 mb-2">
                  Task Information
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Task ID:</span>
                    <span className="text-gray-300 font-mono">
                      {performance.task}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Completed At:</span>
                    <span className="text-gray-300">
                      {new Date(performance.createdAt).toLocaleDateString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit",
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Last Updated:</span>
                    <span className="text-gray-300">
                      {new Date(performance.updatedAt).toLocaleDateString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feedback Section */}
            <div className="bg-gray-900 rounded-xl p-6 border border-red-500/20 hover:border-red-500/40 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-red-400">
                    Feedback Options
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Provide or generate feedback
                  </p>
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
                    Write personalized feedback based on the mentee's
                    performance
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
                    Generate intelligent feedback using AI based on performance
                    data
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
                      onClick={() => handleAiFeedback()}
                      className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Bot className="w-4 h-4" />
                      {`${
                        isLoading ? "Generating..." : "Generate AI Feedback"
                      }`}
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default PerformanceMentee;
