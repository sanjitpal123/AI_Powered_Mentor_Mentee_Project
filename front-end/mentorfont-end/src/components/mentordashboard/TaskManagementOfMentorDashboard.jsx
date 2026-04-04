import { Users, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { useState } from "react";
import CreateTask from "../CreateTaskMentorDash";
import ManageTask from "../ManageTask";
import MenteeTaskOverViewForMentorDashBoard from "../MenteeTaskoverview";

export const TaskManagementOfMentorDashboard = () => {
  const [selectedMentees, setSelectedMentees] = useState([]);
  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium",
    type: "All",
  });
  const [activeTab, setActiveTab] = useState("create");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    type: "multiple-choice",
    options: ["", "", "", ""],
    correctAnswer: 0,
    points: 10,
  });
  const [showQuestionForm, setShowQuestionForm] = useState(false);

  const mentees = [
    {
      id: "1",
      name: "Alice Johnson",
      type: "Beginner",
      avatar: "AJ",
      tasksCompleted: 5,
      tasksActive: 2,
    },
    {
      id: "2",
      name: "Bob Smith",
      type: "Intermediate",
      avatar: "BS",
      tasksCompleted: 12,
      tasksActive: 3,
    },
    {
      id: "3",
      name: "Carol Davis",
      type: "Advanced",
      avatar: "CD",
      tasksCompleted: 18,
      tasksActive: 1,
    },
    {
      id: "4",
      name: "David Wilson",
      type: "Beginner",
      avatar: "DW",
      tasksCompleted: 3,
      tasksActive: 4,
    },
    {
      id: "5",
      name: "Eva Brown",
      type: "Intermediate",
      avatar: "EB",
      tasksCompleted: 9,
      tasksActive: 2,
    },
    {
      id: "6",
      name: "Frank Miller",
      type: "Advanced",
      avatar: "FM",
      tasksCompleted: 22,
      tasksActive: 1,
    },
  ];

  const toggleMenteeSelection = (menteeId) => {
    setSelectedMentees((prev) =>
      prev.includes(menteeId)
        ? prev.filter((id) => id !== menteeId)
        : [...prev, menteeId]
    );
  };

  const getMenteesByType = (type) => {
    if (type === "All") return mentees;
    return mentees.filter((mentee) => mentee.type === type);
  };

  const addQuestion = () => {
    if (currentQuestion.question.trim()) {
      const newQuestion = {
        id: Date.now().toString(),
        question: currentQuestion.question,
        type: currentQuestion.type,
        options:
          currentQuestion.type === "multiple-choice"
            ? currentQuestion.options.filter((opt) => opt.trim())
            : undefined,
        correctAnswer:
          currentQuestion.type === "multiple-choice"
            ? currentQuestion.correctAnswer
            : "",
        points: currentQuestion.points,
      };
      setQuestions([...questions, newQuestion]);
      setCurrentQuestion({
        question: "",
        type: "multiple-choice",
        options: ["", "", "", ""],
        correctAnswer: 0,
        points: 10,
      });
      setShowQuestionForm(false);
    }
  };

  const removeQuestion = (questionId) => {
    setQuestions(questions.filter((q) => q.id !== questionId));
  };

  const updateQuestionOption = (index, value) => {
    const newOptions = [...currentQuestion.options];
    newOptions[index] = value;
    setCurrentQuestion({ ...currentQuestion, options: newOptions });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "text-red-400 bg-red-500/10";
      case "Medium":
        return "text-yellow-400 bg-yellow-500/10";
      case "Low":
        return "text-green-400 bg-green-500/10";
      default:
        return "text-gray-400 bg-gray-500/10";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "In Progress":
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case "Pending":
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Task Management
                </h1>
                <p className="text-gray-400 text-sm">Mentor Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-400">Active Mentees</p>
                <p className="text-xl font-semibold text-red-400">
                  {mentees.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-900 rounded-lg p-1 mb-8 w-fit">
          <button
            onClick={() => setActiveTab("create")}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === "create"
                ? "bg-red-500 text-white shadow-lg"
                : "text-gray-400 hover:text-white hover:bg-gray-800"
            }`}
          >
            Create Task
          </button>
          <button
            onClick={() => setActiveTab("manage")}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === "manage"
                ? "bg-red-500 text-white shadow-lg"
                : "text-gray-400 hover:text-white hover:bg-gray-800"
            }`}
          >
            Manage Tasks
          </button>
          <button
            onClick={() => setActiveTab("mentees")}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === "mentees"
                ? "bg-red-500 text-white shadow-lg"
                : "text-gray-400 hover:text-white hover:bg-gray-800"
            }`}
          >
            Mentees Overview
          </button>
        </div>

        {/* Create Task Tab */}
        {activeTab === "create" && <CreateTask />}

        {/* Manage Tasks Tab */}
        {activeTab === "manage" && <ManageTask />}

        {/* Mentees Overview Tab */}
        {activeTab === "mentees" && <MenteeTaskOverViewForMentorDashBoard />}
      </div>
    </div>
  );
};
