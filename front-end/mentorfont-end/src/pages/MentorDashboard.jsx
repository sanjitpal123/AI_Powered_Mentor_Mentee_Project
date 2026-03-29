import { useContext, useEffect, useState } from "react";
import {
  LiveSession,
  RecentActivities,
  States,
  WelcomeMessage,
  MessagesFromMentee,
  AllSession,
  TaskManagementOfMentorDashboard,
} from "../components/mentordashboard";
import {
  Home,
  MessageSquare,
  Users,
  Settings,
  LogOut,
  Calendar,
  BarChart3,
  BookOpen,
  Plus,
  Edit3,
  Camera,
  Star,
  Award,
  Clock,
  Video,
  Phone,
  Mail,
  MapPin,
  TrendingUp,
  DollarSign,
  Target,
  Activity,
  Search,
  Filter,
  Bell,
  ChevronRight,
  Play,
  Pause,
  MoreVertical,
  Download,
  Share,
  Heart,
  Eye,
  Bookmark,
} from "lucide-react";

import { socket } from "../utils/socket";
import Notification from "../components/Notification";
import { toast } from "react-toastify";
import { GlobalContext } from "../ContextApiStore/ContextStore";
import { GetNotification, UpdateIsRead } from "../services/Notification";
export default function MentorDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [showCreateSession, setShowCreateSession] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const { setAllNotification, User, unSeenNotification } =
    useContext(GlobalContext);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const handleNotification = () => {
      toast.dismiss();
      toast.info("New Session Has Been Created");
    };
    const handleTaskAttendingNotification = () => {
      toast.dismiss();
      toast.success("Someone Has Attended Task");
    };
    socket.on(
      "GetNotificationAboutTaskAttendedBy",
      handleTaskAttendingNotification
    );
    socket.on("Notification", handleNotification);
    return () => {
      socket.off("Notification", handleNotification);
      socket.off(
        "GetNotificationAboutTaskAttendedBy",
        handleTaskAttendingNotification
      );
    };
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-8">
            {/* Welcome Header with Gradient */}
            <WelcomeMessage />
            {/* Stats Cards with Enhanced Design */}
            <States />

            {/* Live Sessions with Enhanced Cards */}
            <LiveSession />

            {/* Recent Activity with Timeline */}
            <RecentActivities />
          </div>
        );

      case "sessions":
        return <AllSession />;

      case "mentees":
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent">
                  My Mentees
                </h1>
                <p className="text-gray-400 mt-2">
                  Track progress and manage relationships
                </p>
              </div>
              <button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/30">
                <Plus size={20} />
                Add Mentee
              </button>
            </div>

            {/* Mentees Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Frontend Developer",
                  progress: 85,
                  sessions: 12,
                  rating: 4.9,
                  avatar:
                    "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150",
                  status: "active",
                },
                {
                  name: "Mike Chen",
                  role: "Full Stack Developer",
                  progress: 72,
                  sessions: 8,
                  rating: 4.7,
                  avatar:
                    "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150",
                  status: "active",
                },
                {
                  name: "Emily Davis",
                  role: "UI/UX Designer",
                  progress: 90,
                  sessions: 15,
                  rating: 5.0,
                  avatar:
                    "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150",
                  status: "completed",
                },
                {
                  name: "Alex Kim",
                  role: "Backend Developer",
                  progress: 45,
                  sessions: 5,
                  rating: 4.8,
                  avatar:
                    "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150",
                  status: "active",
                },
              ].map((mentee, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden bg-[#0a0a0a] p-6 rounded-2xl border border-white/5 hover:border-red-500/30 transition-all duration-500 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-red-500/10"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-medium ${mentee.status === "active"
                            ? "bg-green-600/20 text-green-300 border border-green-500/30"
                            : "bg-blue-600/20 text-blue-300 border border-blue-500/30"
                          }`}
                      >
                        {mentee.status.toUpperCase()}
                      </div>
                      <button className="text-gray-400 hover:text-white transition-colors">
                        <MoreVertical size={16} />
                      </button>
                    </div>

                    <div className="text-center mb-6">
                      <img
                        src={mentee.avatar}
                        alt={mentee?.name}
                        className="w-20 h-20 mx-auto rounded-full border-3 border-red-500/30 mb-4"
                      />
                      <h3 className="text-xl font-bold text-white mb-1">
                        {mentee?.name}
                      </h3>
                      <p className="text-red-200 text-sm">{mentee.role}</p>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-400 text-sm">
                            Progress
                          </span>
                          <span className="text-white font-medium">
                            {mentee.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-red-600 to-red-500 h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${mentee.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-white">
                            {mentee.sessions}
                          </p>
                          <p className="text-gray-400 text-xs">Sessions</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Star size={16} className="text-yellow-400" />
                            <p className="text-xl font-bold text-white">
                              {mentee.rating}
                            </p>
                          </div>
                          <p className="text-gray-400 text-xs">Rating</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105">
                        Message
                      </button>
                      <button className="px-4 py-3 bg-gray-700/50 hover:bg-gray-600/50 rounded-xl text-gray-300 hover:text-white transition-all duration-300">
                        <Eye size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "messages":
        return <MessagesFromMentee />;

      case "analytics":
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent">
                Analytics Dashboard
              </h1>
              <p className="text-gray-400 mt-2">
                Track your mentoring performance and growth
              </p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  label: "Total Sessions",
                  value: "156",
                  change: "+23%",
                  icon: Calendar,
                  color: "from-red-600 to-red-700",
                },
                {
                  label: "Active Mentees",
                  value: "24",
                  change: "+12%",
                  icon: Users,
                  color: "from-red-700 to-red-800",
                },
                {
                  label: "Avg Rating",
                  value: "4.9",
                  change: "+0.3",
                  icon: Star,
                  color: "from-red-800 to-red-900",
                },
                {
                  label: "Total Earnings",
                  value: "$8,420",
                  change: "+18%",
                  icon: DollarSign,
                  color: "from-red-600 to-red-800",
                },
              ].map((metric, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden bg-[#0a0a0a] p-6 rounded-2xl border border-white/5 hover:border-red-500/30 transition-all duration-500 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-red-500/10"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${metric.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <metric.icon size={24} className="text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-1">
                      {metric.value}
                    </h3>
                    <p className="text-gray-400 text-sm mb-2">{metric.label}</p>
                    <div className="flex items-center gap-1">
                      <TrendingUp size={14} className="text-green-400" />
                      <span className="text-green-400 text-sm font-medium">
                        {metric.change}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-white/5">
                <h3 className="text-xl font-bold text-white mb-4">
                  Session Trends
                </h3>
                <div className="h-64 bg-[#050505] rounded-xl border border-white/5 flex items-center justify-center">
                  <p className="text-gray-500">
                    Chart visualization would go here
                  </p>
                </div>
              </div>
              <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-white/5">
                <h3 className="text-xl font-bold text-white mb-4">
                  Rating Distribution
                </h3>
                <div className="h-64 bg-[#050505] rounded-xl border border-white/5 flex items-center justify-center">
                  <p className="text-gray-500">
                    Chart visualization would go here
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case "settings":
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent">
                Settings
              </h1>
              <p className="text-gray-400 mt-2">
                Manage your account and preferences
              </p>
            </div>

            {/* Profile Settings */}
            <div className="bg-gradient-to-br from-red-900/40 via-red-800/30 to-black/50 p-8 rounded-2xl border border-red-500/30">
              <h2 className="text-2xl font-bold text-white mb-6">
                Profile Information
              </h2>

              {!isEditingProfile ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <img
                        src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150"
                        alt="profile"
                        className="w-24 h-24 rounded-full border-3 border-red-500/30"
                      />
                      <button className="absolute bottom-0 right-0 bg-red-600 p-2 rounded-full hover:bg-red-700 transition-colors shadow-lg">
                        <Camera size={16} />
                      </button>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        Hardik Singh
                      </h3>
                      <p className="text-red-200">
                        Senior Software Engineer & Mentor
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1">
                          <Star size={16} className="text-yellow-400" />
                          <span className="text-white font-medium">4.9</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Award size={16} className="text-green-400" />
                          <span className="text-green-400 font-medium">
                            Top Mentor
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all duration-300 hover:scale-105"
                  >
                    <Edit3 size={18} />
                    Edit Profile
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        defaultValue="Hardik Singh"
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:border-red-500/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        defaultValue="Senior Software Engineer & Mentor"
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:border-red-500/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        defaultValue="hardik@example.com"
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:border-red-500/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        defaultValue="+1 (555) 123-4567"
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:border-red-500/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Bio
                    </label>
                    <textarea
                      rows={4}
                      defaultValue="Experienced software engineer with 8+ years in full-stack development. Passionate about mentoring and helping others grow in their tech careers."
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:border-red-500/50 transition-colors resize-none"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setIsEditingProfile(false)}
                      className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setIsEditingProfile(false)}
                      className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-xl font-medium transition-all duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Notification Settings */}
            <div className="bg-gradient-to-br from-gray-900/90 to-black/70 p-8 rounded-2xl border border-red-500/30">
              <h2 className="text-2xl font-bold text-white mb-6">
                Notification Preferences
              </h2>
              <div className="space-y-4">
                {[
                  {
                    label: "Email notifications for new messages",
                    enabled: true,
                  },
                  {
                    label: "Push notifications for session reminders",
                    enabled: true,
                  },
                  { label: "Weekly performance reports", enabled: false },
                  { label: "New mentee requests", enabled: true },
                ].map((setting, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl"
                  >
                    <span className="text-white">{setting.label}</span>
                    <button
                      className={`w-12 h-6 rounded-full transition-all duration-300 ${setting.enabled ? "bg-red-600" : "bg-gray-600"
                        }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full transition-transform duration-300 ${setting.enabled ? "translate-x-6" : "translate-x-1"
                          }`}
                      ></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case "notification": {
        return <Notification />;
      }

      case "task": {
        return <TaskManagementOfMentorDashboard />;
      }
      default:
        return <div className="text-white">Content for {activeTab}</div>;
    }
  };

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      {/* Enhanced Sidebar */}
      <div className="w-72 bg-[#0a0a0a] border-r border-white/5 flex flex-col justify-between">
        <div>
          {/* Enhanced Profile Section */}
          <div className="p-8 text-center border-b border-white/5 bg-[#050505]">
            <div className="relative inline-block mb-4">
              <img
                src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=120&h=120"
                alt="profile"
                className="w-20 h-20 mx-auto rounded-full border-3 border-white/30 shadow-xl"
              />
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-400 rounded-full border-2 border-red-800 animate-pulse"></div>
            </div>
            <h2 className="text-xl font-bold text-white mb-1">Hardik Singh</h2>
            <p className="text-red-200/80 text-sm mb-3">Senior Mentor</p>
            <div className="flex items-center justify-center gap-4 text-xs">
              <div className="flex items-center gap-1">
                <Star size={14} className="text-yellow-400" />
                <span className="text-white font-medium">4.9</span>
              </div>
              <div className="flex items-center gap-1">
                <Users size={14} className="text-blue-400" />
                <span className="text-white font-medium">24</span>
              </div>
            </div>
          </div>

          {/* Enhanced Navigation */}
          <nav className="mt-8 px-4 space-y-2">
            {[
              { id: "dashboard", icon: Home, label: "Dashboard" },
              { id: "notification", icon: Home, label: "Notification" },
              { id: "sessions", icon: Video, label: "Sessions" },
              { id: "task", icon: BookOpen, label: "Task Management" },

              { id: "mentees", icon: Users, label: "Mentees" },
              { id: "messages", icon: MessageSquare, label: "Messages" },
              { id: "analytics", icon: BarChart3, label: "Analytics" },
              { id: "calendar", icon: Calendar, label: "Calendar" },
              { id: "resources", icon: BookOpen, label: "Resources" },
              { id: "settings", icon: Settings, label: "Settings" },
            ].map((item) => (
              <button
                key={item.id}
                className={`flex items-center gap-4 px-6 py-4 w-full text-left rounded-2xl font-medium transition-all duration-300 hover:scale-105 ${activeTab === item.id
                    ? "bg-gradient-to-r from-red-700 to-red-600 text-white shadow-lg shadow-red-500/30 border border-red-400/30"
                    : "text-red-100 hover:bg-red-700/30 hover:text-white"
                  }`}
                onClick={() => setActiveTab(item.id)}
              >
                <item.icon size={20} />
                {item.label}
                {item.id === "messages" && (
                  <div className="ml-auto w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-bold">3</span>
                  </div>
                )}
                {item.id === "notification" && unSeenNotification > 0 && (
                  <div className="ml-auto w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-bold">
                      {unSeenNotification}
                    </span>
                  </div>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Enhanced Logout Section */}
        <div className="p-6 border-t border-white/5 bg-[#050505]">
          <button className="flex items-center gap-4 w-full text-left text-gray-400 hover:text-red-500 transition-all duration-300 hover:scale-105 px-4 py-3 rounded-xl hover:bg-white/5">
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Enhanced Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto bg-[#050505]">
          <div className="p-8">{renderContent()}</div>
        </div>
      </div>

      {/* Enhanced Modals */}
      {showCreateSession && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-3xl border border-red-500/30 w-full max-w-2xl mx-4 shadow-2xl shadow-red-500/20">
            <h2 className="text-2xl font-bold text-white mb-6">
              Create New Session
            </h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Session Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., React Fundamentals"
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Mentee
                  </label>
                  <select className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:border-red-500/50 transition-colors">
                    <option>Select mentee...</option>
                    <option>Sarah Johnson</option>
                    <option>Mike Chen</option>
                    <option>Emily Davis</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:border-red-500/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Duration
                  </label>
                  <select className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:border-red-500/50 transition-colors">
                    <option>30 minutes</option>
                    <option>45 minutes</option>
                    <option>60 minutes</option>
                    <option>90 minutes</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  rows={4}
                  placeholder="Session objectives and topics to cover..."
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50 transition-colors resize-none"
                />
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowCreateSession(false)}
                  className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/30"
                >
                  Create Session
                </button>
                <button
                  onClick={() => setShowCreateSession(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 py-3 rounded-xl font-medium transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
