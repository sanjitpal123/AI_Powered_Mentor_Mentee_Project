import React, { useState, useEffect, useContext } from "react";
import {
  User,
  Target,
  Calendar,
  Star,
  Trophy,
  Flame,
  Clock,
  MessageCircle,
  CheckCircle2,
  XCircle,
  AlertCircle,
  TrendingUp,
  Award,
  Users,
  Video,
  ChevronRight,
  BookOpen,
  Brain,
  Zap,
  Settings,
  Bell,
  Search,
  Filter,
  MoreVertical,
  Play,
  Pause,
  BarChart3,
  PieChart,
  Calendar as CalendarIcon,
  MapPin,
  Globe,
  Smartphone,
  Laptop,
  Headphones,
  Camera,
  Mic,
  Share2,
  Download,
  Upload,
  Eye,
  Heart,
  Bookmark,
  Send,
  Plus,
  Minus,
  Edit3,
  Trash2,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Copy,
  Check,
  X,
  Menu,
  Home,
  FileText,
  Image,
  Music,
  Video as VideoIcon,
  Folder,
  Archive,
  Tag,
  Hash,
  AtSign,
  Phone,
  Mail,
  Lock,
  Unlock,
  Shield,
  Key,
  Database,
  Server,
  Cloud,
  Wifi,
  Battery,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  CloudRain,
  CloudSnow,
  Wind,
  Thermometer,
  Compass,
  Navigation,
  Anchor,
  Flag,
  Gift,
  Coffee,
  Pizza,
  Car,
  Plane,
  Train,
  Bike,
  Ship,
  Rocket,
  Gamepad2,
  Puzzle,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Cell,
  RadialBarChart,
  RadialBar,
} from "recharts";
import { GlobalContext } from "../ContextApiStore/ContextStore";
import { DeleteExpireOne, getTask } from "../services/Task";
import { Link, useNavigate } from "react-router-dom";
import { GetAllMessageSer } from "../services/Message";
import { GetAllSessionSer } from "../services/Session";
import { CreateConvo } from "../services/Convo";
import GetMenteeprofileser from "../services/GetMenteeProfile";
import FormatTime from "../utils/DateFormat";
import { GetNotification } from "../services/Notification";
function AdvancedTab() {
  return (
    <div className="mb-8 animate-slide-up animation-delay-200">
      <div className="bg-gray-900/90 backdrop-blur-xl rounded-2xl p-2 border border-gray-800/60 shadow-xl">
        <div className="flex space-x-2">
          {[
            { id: "overview", label: "Overview", icon: Home },
            { id: "learning", label: "Learning Paths", icon: BookOpen },
            { id: "sessions", label: "Sessions", icon: Video },
            { id: "analytics", label: "Analytics", icon: BarChart3 },
            { id: "community", label: "Community", icon: Users },
          ].map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105 group ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-500/30 hover:shadow-red-500/40"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/60"
                }`}
              >
                <IconComponent
                  size={18}
                  className="group-hover:animate-pulse"
                />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AdvancedTab;

export const Task = () => {
  const { User } = useContext(GlobalContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const [Tasks, setTasks] = useState([]);
  const navigator = useNavigate();

  async function FetchAllTask() {
    try {
      const res = await getTask(user.token);
      console.log("response to get all task", res);
      setTasks(res);
    } catch (error) {
      console.log("error to fetch error", error);
    }
  }

  function HandleNavigate(id) {
    navigator(`/attendtask/${id}`);
  }

  useEffect(() => {
    FetchAllTask();
  }, []);

  async function DeleteExpireTask(taskid) {
    try {
      const res = await DeleteExpireOne(user.token, taskid);
      console.log("response to delete expire task", res);
    } catch (error) {
      console.log("error to delete expire one", error);
    }
  }

  useEffect(() => {
    Tasks.forEach((task) => {
      const tasktime = new Date(task.Duedate); // convert string to Date
      const currenttime = new Date();

      if (tasktime < currenttime) {
        DeleteExpireTask(task._id);
      } else {
        console.log(`${task.Duedate} is still valid`);
      }
    });
  }, [Tasks]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-black p-6">
      <h1 className="text-3xl font-bold text-red-500 mb-6 tracking-wide">
        🚀 Your Tasks
      </h1>

      {Tasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          {Tasks.map((task) => (
            <div
              key={task._id}
              className="bg-zinc-900 border border-red-600 rounded-2xl p-5 shadow-lg hover:shadow-red-600/50 hover:scale-[1.02] transition-all duration-300"
              onClick={() => HandleNavigate(task._id)}
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-white">
                  {task.Title}
                </h2>
                {task.completed ? (
                  <CheckCircle2 className="text-green-400 w-6 h-6" />
                ) : (
                  <Clock className="text-red-500 w-6 h-6" />
                )}
              </div>

              <p className="text-gray-400 text-sm mb-4">
                {task.Description || "No description provided"}
              </p>

              <div className="flex justify-between items-center text-sm">
                <span className="px-3 py-1 rounded-full bg-red-600 text-white">
                  Due:{" "}
                  {task.Duedate ? new Date(task.Duedate).toDateString() : "NA"}
                </span>
                <span
                  className={`flex items-center gap-1 font-medium ${task.AttendedBy.map(
                    (mentee) =>
                      mentee._id === user._id
                        ? "text-green-400"
                        : "text-red-400"
                  )}`}
                >
                  {task.AttendedBy.map((mentee) =>
                    mentee._id === user._id ? "Completed" : "Pending"
                  )}
                  {task.AttendedBy.map(
                    (mentee) =>
                      mentee._id !== user._id && (
                        <AlertCircle className="w-4 h-4" />
                      )
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-400 text-lg mt-10">
          ❌ You don’t have tasks yet.
        </div>
      )}
    </div>
  );
};

export const Sessions = () => {
  const [upcomingSessions, setupcomingSessions] = useState([]);
  const { User } = useContext(GlobalContext);
  const Navigator = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  async function GetAllSessions() {
    try {
      const res = await GetAllSessionSer(user.token);
      setupcomingSessions(res.response);
      console.log("response to get upcomnig sessions", res);
    } catch (error) {
      console.log("error to get sessions", error);
    }
  }
  async function handleNavigateToChat(mentorId) {
    try {
      const res = await CreateConvo(mentorId, user.token);
      console.log("responsive while creating convo in navigatetochat");
      Transaction(e, res);
    } catch (error) {
      console.log("error in responsive while creating", error);

      Navigator(`/chat/${error.response.data.existed._id}`);
    }
  }

  async function RescheduleSession(session) {
    Navigator(`/createsession`, { state: session });
  }
  useEffect(() => {
    GetAllSessions();
  }, []);

  return (
    <div className="space-y-8">
      {/* Sessions Header */}
      <div className="bg-gray-900/90 backdrop-blur-xl rounded-3xl p-8 border border-gray-800/60 shadow-2xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Mentoring Sessions
            </h2>
            <p className="text-gray-400 text-lg">
              Manage your upcoming and past sessions with expert mentors
            </p>
          </div>
          <div className="flex gap-4">
            <button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-2xl hover:shadow-red-500/30 hover:scale-105 hover:-translate-y-1">
              <Users className="inline mr-2" size={20} />
              Find Mentor
            </button>
            <button className="bg-gray-800/80 hover:bg-gray-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 border border-gray-700/60 hover:border-red-500 hover:scale-105 hover:-translate-y-1">
              <Edit3 className="inline mr-2" size={20} />
              Whiteboard
            </button>
          </div>
        </div>
      </div>

      {/* Detailed Sessions List */}
      <div className="space-y-6">
        {upcomingSessions?.map((session, index) => (
          <div
            key={session?._id}
            className="bg-gray-900/90 backdrop-blur-xl rounded-3xl p-8 border border-gray-800/60 hover:border-red-500/40 transition-all duration-500 shadow-2xl hover:shadow-blue-500/20 hover:scale-[1.01] hover:-translate-y-1 group"
            style={{ animationDelay: `${index * 200}ms` }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8">
                <div className="flex items-start gap-6">
                  <div className="relative">
                    <img
                      src={session?.mentorAvatar}
                      alt={session.mentor?.profile}
                      className="w-24 h-24 rounded-2xl object-cover border-2 border-gray-600 hover:border-red-500 transition-all duration-300 hover:scale-110 shadow-lg"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg animate-pulse">
                      Online
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold text-white group-hover:text-red-200 transition-colors duration-300">
                        {session.Title}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-lg text-xs font-bold border ${
                          session?.status === "Confirmed"
                            ? "bg-green-600/30 text-green-400 border-green-500/40"
                            : "bg-yellow-600/30 text-yellow-400 border-yellow-500/40"
                        }`}
                      >
                        {session?.status}
                      </span>
                    </div>
                    <p className="text-red-400 font-semibold mb-3 text-lg">
                      with {session.mentor?.name}
                    </p>
                    <p className="text-gray-400 text-sm mb-4 font-medium">
                      {session?.type}
                    </p>

                    <div className="flex flex-wrap gap-6 text-sm text-gray-300 mb-4">
                      <span className="flex items-center gap-2 hover:text-white transition-colors duration-200">
                        <Calendar size={16} className="text-red-400" />
                        <span className="font-medium">
                          Due Date
                          {new Date(session?.date).toLocaleString([], {
                            year: "2-digit",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true, // optional, for AM/PM
                          })}
                        </span>
                      </span>
                      <span className="flex items-center gap-2 hover:text-white transition-colors duration-200">
                        <Clock size={16} className="text-red-400" />
                        <span className="font-medium">
                          Created At
                          {new Date(session.createdAt).toLocaleDateString([], {
                            day: "2-digit",
                            month: "2-digit",
                            year: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </span>
                      <span className="flex items-center gap-2 hover:text-white transition-colors duration-200">
                        <Video size={16} className="text-red-400" />
                        <span className="font-medium">{session?.type}</span>
                      </span>
                    </div>

                    {session?.preparationMaterials && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-400 mb-3 font-medium">
                          Preparation Materials:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {session?.preparationMaterials.map(
                            (material, matIndex) => (
                              <span
                                key={matIndex}
                                className="px-3 py-2 bg-gray-800/60 text-gray-300 text-xs rounded-lg border border-gray-700/60 font-medium hover:bg-gray-700/60 hover:text-white transition-all duration-200 hover:scale-105"
                              >
                                <FileText className="inline mr-1" size={12} />
                                {material}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white py-4 rounded-xl font-semibold transition-all duration-300 shadow-2xl hover:shadow-red-500/30 flex items-center justify-center gap-2 hover:scale-105 hover:-translate-y-1">
                    <Video size={20} />
                    Join Session
                  </button>
                  <button
                    onClick={() => RescheduleSession(session)}
                    className="w-full bg-gray-800/60 hover:bg-gray-800/90 text-gray-300 hover:text-white py-4 rounded-xl border border-gray-700/60 hover:border-red-500/40 transition-all duration-300 flex items-center justify-center gap-2 font-semibold hover:scale-105 hover:-translate-y-1"
                  >
                    <Calendar size={20} />
                    Reschedule
                  </button>
                  <button
                    onClick={() => handleNavigateToChat(session.mentor._id)}
                    className="w-full bg-gray-800/60 hover:bg-gray-800/90 text-gray-300 hover:text-white py-4 rounded-xl border border-gray-700/60 hover:border-red-500/40 transition-all duration-300 flex items-center justify-center gap-2 font-semibold hover:scale-105 hover:-translate-y-1"
                  >
                    <MessageCircle size={20} />
                    Message Mentor
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Feedback = () => {
  const [mentorFeedback, setMentorFeedback] = useState([]);
  const { User } = useContext(GlobalContext);

  const user = JSON.parse(localStorage.getItem("user"));

  async function GetProfile() {
    try {
      const res = await GetMenteeprofileser(user._id);
      console.log("response to get mentee profile ", res);
      setMentorFeedback(res.feedback || []); // safe fallback
    } catch (error) {
      console.log("error ", error);
    }
  }

  useEffect(() => {
    GetProfile();
  }, []);

  return (
    <div className="space-y-8">
      {/* Community Header */}
      <div className="bg-black/90 backdrop-blur-xl rounded-3xl p-8 border border-red-700/50 shadow-2xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <h2 className="text-4xl font-bold text-red-500 mb-2">
              Learning Community
            </h2>
            <p className="text-gray-300 text-lg">
              Connect with peers, share knowledge, and grow together
            </p>
          </div>
          <div className="flex gap-4">
            <button className="bg-red-700 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:scale-105">
              <Users className="inline mr-2" size={20} />
              Networking Hub
            </button>
            <Link
              to="/review-summary"
              className="bg-gray-800/70 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 border border-red-600 hover:scale-105"
            >
              <Eye className="inline mr-2" size={20} />
              Ai Review Summary
            </Link>
          </div>
        </div>
      </div>

      {/* Mentor Feedback Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {mentorFeedback?.length > 0 ? (
          mentorFeedback.map((fb) => (
            <div
              key={fb._id}
              className="bg-black/90 border border-red-700 rounded-3xl p-6 shadow-lg hover:shadow-red-500/50 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={fb.mentor?.avatar || "https://via.placeholder.com/60"}
                  alt={fb.mentor?.name || "Mentor"}
                  className="w-14 h-14 rounded-full border-2 border-red-600 object-cover"
                />
                <div>
                  <h3 className="text-red-500 font-bold text-lg">
                    {fb.mentor?.name || "Mentor Name"}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {FormatTime(fb.createdAt)}
                  </p>
                </div>
              </div>
              <p className="text-gray-300 mb-3">{fb.comment}</p>
              <div className="flex gap-3 mt-3">
                <button className="bg-red-600/50 hover:bg-red-600/70 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all">
                  Reply
                </button>
                <button className="bg-gray-800/60 hover:bg-gray-800/90 text-gray-300 px-4 py-2 rounded-lg text-sm font-semibold transition-all">
                  Bookmark
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 col-span-2 text-center">
            No feedback available yet.
          </p>
        )}
      </div>
    </div>
  );
};

export const Notification = () => {
  const { User } = useContext(GlobalContext);
  const user = JSON.parse(localStorage.getItem("user"));
  async function getNotification() {
    try {
      const res = await GetNotification(user.token);
      console.log("response to get notification", res);
    } catch (error) {
      console.log("error to get notification");
    }
  }
  useEffect(() => {
    getNotification();
  }, []);
  return <div></div>;
};
