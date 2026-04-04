import { Plus, Send } from "lucide-react";
import { useEffect, useState, useContext } from "react";
import MenteeListedInTaskMangementOfMentorDashboard from "./SelectedMentee";
import { GlobalContext } from "../ContextApiStore/ContextStore";
import { CreateTaskSer } from "../services/Task";
import { socket } from "../utils/socket";
import AiCreatedTask from "../services/AiTaskCreation";

import { QuestionGeneratorForm } from "./createtask/QuestionGeneratorForm";

function CreateTask() {
  const { selectedMentees } = useContext(GlobalContext);
  const user = JSON.parse(localStorage.getItem("user"));
  
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState("");
  const [choice1, setChoice1] = useState("");
  const [choice2, setChoice2] = useState("");
  const [choice3, setChoice3] = useState("");
  const [choice4, setchoice4] = useState("");
  const [answer, setAnswer] = useState("");
  const [Generating, setGenerating] = useState(false);
  
  const [FormData, setFormData] = useState({
    Title: "",
    Description: "",
    Duedate: null,
    Questions: [],
    Mentees: [],
  });

  useEffect(() => {
    setFormData((prev) => ({ ...prev, Mentees: selectedMentees }));
  }, [selectedMentees]);

  function handleAddQuestion() {
    if (!question || !choice1 || !choice2 || !choice3 || !choice4 || !answer) {
      alert("Please fill all choices and select an answer.");
      return;
    }
    const data = {
      question,
      choice1,
      choice2,
      choice3,
      choice4,
      answer,
    };
    setQuestions((prev) => [...prev, data]);
    // Optionally reset fields here
    setQuestion("");
    setChoice1("");
    setChoice2("");
    setChoice3("");
    setchoice4("");
    setAnswer("");
  }

  async function handleTaskToMentee() {
    try {
      const res = await CreateTaskSer(FormData, user.token);
      console.log("response to create task", res);
      socket.emit("NotifyAboutTask", { receiverIds: FormData.Mentees });
      alert("Task Assigned Successfully!");
    } catch (error) {
      console.log("error to create task", error);
    }
  }

  async function CreateTaskByAi(Title) {
    if (!Title) {
      alert("Please provide a Title first to generate AI Questions.");
      return;
    }
    try {
      setGenerating(true);
      const res = await AiCreatedTask(Title);
      setQuestions(res.task);
      setGenerating(false);
    } catch (error) {
      console.log("error", error);
      setGenerating(false);
    }
  }

  useEffect(() => {
    setFormData((prev) => ({ ...prev, Questions: questions }));
  }, [questions]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Task Creation Form */}
      <div className="lg:col-span-2">
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center">
            <Plus className="w-5 h-5 mr-2 text-red-400" />
            Create New Task
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Task Title
              </label>
              <input
                type="text"
                value={FormData.Title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, Title: e.target.value }))
                }
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Enter task title..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={FormData.Description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    Description: e.target.value,
                  }))
                }
                rows={4}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                placeholder="Describe the task in detail..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Due Date
                </label>
                <input
                  type="date"
                  value={FormData.Duedate || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      Duedate: e.target.value,
                    }))
                  }
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Priority
                </label>
                <select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent">
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Mentee Type
                </label>
                <select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent">
                  <option value="All">All Types</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            {/* AI Generator Button */}
            <div className="w-full gap-10 items-center flex justify-between bg-black/40 p-4 rounded-lg border border-red-900/40">
              <div className="font-semibold text-gray-300">Make Question And Answer</div>
              <button
                className="bg-red-700 hover:bg-red-600 transition-colors py-2 px-4 rounded text-sm text-white shadow-xl min-w-[200px]"
                onClick={() => CreateTaskByAi(FormData.Title)}
                disabled={Generating}
              >
                {Generating ? "Generating..." : "Create Questions By AI"}
              </button>
            </div>

            <QuestionGeneratorForm
              question={question} setQuestion={setQuestion}
              choice1={choice1} setChoice1={setChoice1}
              choice2={choice2} setChoice2={setChoice2}
              choice3={choice3} setChoice3={setChoice3}
              choice4={choice4} setchoice4={setchoice4}
              answer={answer} setAnswer={setAnswer}
              questions={questions}
              handleAddQuestion={handleAddQuestion}
            />

            <button
              onClick={handleTaskToMentee}
              disabled={questions.length === 0 || FormData.Mentees.length === 0}
              className={`w-full text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center
                ${(questions.length === 0 || FormData.Mentees.length === 0) ? 'bg-gray-600 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'}`
              }
            >
              <Send className="w-5 h-5 mr-2" />
              Assign Task to Selected Mentees
            </button>
          </div>
        </div>
      </div>

      <MenteeListedInTaskMangementOfMentorDashboard />
    </div>
  );
}

export default CreateTask;
