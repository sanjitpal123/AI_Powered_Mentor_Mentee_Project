import { useContext, useEffect, useState } from "react";
import {
  LiveSession,
  RecentActivities,
  States,
  WelcomeMessage,
  MessagesFromMentee,
  AllSession,
  TaskManagementOfMentorDashboard,
  MenteesTab,
  AnalyticsTab,
  SettingsTab,
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
        return <MenteesTab />;

      case "messages":
        return <MessagesFromMentee />;

      case "analytics":
        return <AnalyticsTab />;

      case "settings":
        return <SettingsTab />;

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
                className={`flex items-center gap-4 px-6 py-4 w-full text-left rounded-2xl font-medium transition-all duration-300 hover:scale-105 ${
                  activeTab === item.id
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
