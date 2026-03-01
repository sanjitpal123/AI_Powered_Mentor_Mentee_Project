import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Attended, GetTaskById } from "../services/Task";
import { GlobalContext } from "../ContextApiStore/ContextStore";
import { Clock, CheckCircle, Trophy, Target, Timer, Award } from "lucide-react";
import { StoreScore } from "../services/Performance";
import { socket } from "../utils/socket";
import { CreateNotificationSer } from "../services/Notification";

function TaskAttendPage() {
  const { id } = useParams();
  const { User } = useContext(GlobalContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const [Task, setTask] = useState(null);
  const navigator = useNavigate();
  const [correctedAnswer, setCorrectedAnswer] = useState(0);
  const [answers, setAnswers] = useState({});
  const [attendedQuestion, setAttendedQuestion] = useState([]);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [IsAnswerTrue, SetIsAnswerTrue] = useState(false);
  const [QuestionIndex, setQuestionIndex] = useState([]);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  async function GetATask() {
    try {
      const res = await GetTaskById(user.token, id);
      setTask(res);
    } catch (error) {
      console.log("error to get a task ", error);
    }
  }

  async function GenerateNotification() {
    try {
      const data = {
        receiver: Task?.CreatedBy?._id || Task?.CreatedBy,
        message: `${user.name} has attended a task which was given to him `,
        type: "info",
        isRead: false,
        title: `${Task.Title}  task has attended by  ${user.name}  `,
        convoId: null,
        sessionId: null,
      };
      const res = await CreateNotificationSer(data, user.token);
      console.log("response to create notificatin  ", res);
    } catch (error) {
      console.log("error to generate notification", error);
    }
  }

  async function handleSubmit() {
    try {
      setIsSubmitting(true);

      const Attenedby = await Attended(user.token, {
        task_id: id,
        AttendedBy: user._id,
      });
      console.log("responsive to store attend ", Attenedby);
      const result = await StoreScore(user.token, {
        totalquestion: Task.Questions.length,
        score: ((correctedAnswer / Task.Questions.length) * 100).toFixed(2),
        mentee: user._id,
        correctanswer: correctedAnswer,
        wronganswer: Task.Questions.length - correctedAnswer,
        task: id,
      });
      console.log("response to score performance", result);
      socket.emit("notifyAboutAttendingtask", {
        mentorId: Task?.CreatedBy?._id || Task?.CreatedBy,
      });

      Task.AttendedBy.map((mentee) => {
        console.log("menttes", mentee);
        if (mentee.toString() !== user._id.toString()) {
          GenerateNotification();
        }
      });

      navigator("/result", {
        state: {
          total: Task.Questions.length,
          correct: correctedAnswer,
        },
      });
    } catch (error) {
      setIsSubmitting(false);

      console.log("error to store score", error);
    }
  }

  function handleAnswering(question, selectedanswer, questionIndex) {
    // Update answers state
    const newAnswers = { ...answers };
    const previousAnswer = newAnswers[questionIndex];
    newAnswers[questionIndex] = selectedanswer;
    setAnswers(newAnswers);
    setAttendedQuestion((prev) => [...prev, questionIndex]);

    // Update correct answer count
    if (previousAnswer && previousAnswer === question.answer) {
      setCorrectedAnswer((prev) => prev - 1);
    }
    if (selectedanswer === question.answer) {
      setCorrectedAnswer((prev) => prev + 1);
      SetIsAnswerTrue(true);
      setQuestionIndex((prev) => [...prev, questionIndex]);
    }
  }

  useEffect(() => {
    GetATask();
  }, [id]);
  useEffect(() => {
    console.log("user", user.token);
  }, []);

  if (!Task) {
    return (
      <div className="w-full min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
          <p className="text-white text-xl">Loading quiz...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-red-400 mb-2">
              {Task.Title}
            </h1>
            <p className="text-gray-300 text-lg max-w-3xl">
              {Task.Description}
            </p>
          </div>

          <div className="flex items-center space-x-6">
            <div className="bg-gray-700 rounded-lg px-4 py-2 flex items-center space-x-2">
              <Timer className="w-5 h-5 text-red-400" />
              <span className="text-white font-mono text-lg">
                {/* {formatTime(timeElapsed)} */}
              </span>
            </div>
            <div className="bg-gray-700 rounded-lg px-4 py-2 flex items-center space-x-2">
              <Award className="w-5 h-5 text-red-400" />
              <span className="text-white font-semibold">
                {correctedAnswer}/{Task.Questions.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full gap-8 p-8">
        {/* Questions Section */}
        <div className="space-y-6 w-[70%]">
          {Task.Questions.map((q, index) => (
            <div
              key={index}
              className={`bg-gray-800 border rounded-xl p-6 transition-all duration-300 ${
                answers[index]
                  ? "border-red-500"
                  : "border-gray-700 hover:border-gray-600"
              }`}
            >
              <div className="flex items-start justify-between mb-6">
                <h2 className="text-xl font-semibold text-white leading-relaxed flex-1">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-red-500 text-white rounded-lg mr-3 text-sm font-bold">
                    {index + 1}
                  </span>
                  {q.question}
                </h2>
                {answers[index] && (
                  <CheckCircle className="w-6 h-6 text-green-400 ml-4" />
                )}
              </div>

              <div className="space-y-3">
                {[q.choice1, q.choice2, q.choice3, q.choice4].map(
                  (choice, i) => {
                    const isSelected = answers[index] === choice;
                    const choiceLabels = ["A", "B", "C", "D"];

                    return (
                      <label
                        key={i}
                        className={`flex items-center gap-4 cursor-pointer p-4 rounded-lg transition-all duration-200 ${
                          IsAnswerTrue === true &&
                          QuestionIndex.includes(index) &&
                          choice === q.answer
                            ? "bg-green-500/20 border border-red-500"
                            : "bg-gray-700/50 hover:bg-gray-700"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value={choice}
                          checked={isSelected}
                          className="sr-only"
                          onClick={() => handleAnswering(q, choice, index)}
                        />
                        <div
                          disabled={QuestionIndex === index}
                          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm ${
                            QuestionIndex === index && choice === q.answer
                              ? "bg-green-500 border-red-500 text-white"
                              : " bg-red-500 border-gray-500 text-gray-400"
                          }`}
                        >
                          {choiceLabels[i]}
                        </div>
                        <span
                          className={`text-lg ${
                            isSelected
                              ? "text-white font-medium"
                              : "text-gray-300"
                          }`}
                        >
                          {choice}
                        </span>
                      </label>
                    );
                  }
                )}
              </div>
            </div>
          ))}

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`bg-red-600 hover:bg-red-700 text-white font-bold text-xl px-8 py-4 rounded-xl 
                         transition-all duration-300 flex items-center space-x-3 ${
                           isSubmitting
                             ? "cursor-not-allowed opacity-70"
                             : "hover:scale-105"
                         }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Trophy className="w-6 h-6" />
                  <span>Submit Quiz</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-[30%] space-y-6">
          {/* Question Navigator */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 sticky top-8">
            <div className="flex items-center space-x-3 mb-6">
              <Target className="w-6 h-6 text-red-400" />
              <h2 className="text-xl font-bold text-white">Navigation</h2>
            </div>

            <div className="flex flex-wrap gap-5 justify-start ">
              {Task.Questions.map((q, index) => (
                <div
                  className={`${
                    attendedQuestion.includes(index)
                      ? "bg-red-900"
                      : "bg-gray-900"
                  } py-2 px-4  text-white rounded-full`}
                >
                  {index}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskAttendPage;
