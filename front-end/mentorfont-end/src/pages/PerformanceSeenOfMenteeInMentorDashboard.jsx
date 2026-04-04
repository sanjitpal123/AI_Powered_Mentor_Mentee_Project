import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import AiAsk from "../services/AIQuestionAndAnswer";
import { SubmitFeedback } from "../services/Feedback";
import { GlobalContext } from "../ContextApiStore/ContextStore";

import { MenteeProfileCard } from "../components/performance/MenteeProfileCard";
import { PerformanceMetricsCard } from "../components/performance/PerformanceMetricsCard";
import { FeedbackOptionsCard } from "../components/performance/FeedbackOptionsCard";

function PerformanceMentee() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const { User } = useContext(GlobalContext);
  const wholeobj = JSON.parse(localStorage.getItem("user"));
  const { performance } = location.state || {};

  const [feedBackOFAi, setFeedBackOfAi] = useState("");
  const [feedback2, setFeedback2] = useState("");
  const [ClickedOnWriteFeedback, setClickedOnWriteFeedback] = useState(false);

  async function handleAiFeedback() {
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
      toast.success("Submitted feedback successfully");
      setFeedBackOfAi("");
    } catch (error) {
      console.log("responsive to submit feedback", error);
    }
  }

  async function handleFeedByManual() {
    try {
      const data = {
        mentee: performance.mentee._id,
        mentor: wholeobj._id,
        comment: feedback2,
      };
      await SubmitFeedback(wholeobj.token, data);
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
          <div className="lg:col-span-1">
            <MenteeProfileCard performance={performance} />
          </div>

          <div className="lg:col-span-2">
            <PerformanceMetricsCard performance={performance} />
            <FeedbackOptionsCard
              feedback2={feedback2}
              setFeedback2={setFeedback2}
              feedBackOFAi={feedBackOFAi}
              setFeedBackOfAi={setFeedBackOfAi}
              ClickedOnWriteFeedback={ClickedOnWriteFeedback}
              handleWriteFeedbackClick={handleWriteFeedbackClick}
              handleFeedByManual={handleFeedByManual}
              handleAiFeedback={handleAiFeedback}
              handleSubmitFeedback={handleSubmitFeedback}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PerformanceMentee;
