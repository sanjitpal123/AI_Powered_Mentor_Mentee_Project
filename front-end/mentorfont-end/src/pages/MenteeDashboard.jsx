import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { socket } from "../utils/socket";
import { GlobalContext } from "../ContextApiStore/ContextStore";
import { toast } from "react-toastify";
import { Plus, Home, BookOpen, Video, Bell, Users } from "lucide-react";

import { 
  MenteeHeaderProfile, 
  MenteeOverviewTab, 
  MenteeLearningTab, 
  Sessions, 
  Notification, 
  Feedback, 
  Task 
} from "../components/menteedashboard";

import { 
  menteeData, 
  advancedProgressData, 
  skillsData, 
  goals, 
  upcomingSessionsMock, 
  badges, 
  learningPaths, 
  recentActivitiesMock 
} from "../data/menteeMockData";

const MenteeDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications, setNotifications] = useState(3);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGoal, setSelectedGoal] = useState(null);
  const { User } = useContext(GlobalContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?._id) return;

    socket.emit("join", user._id);

    const handleStatusUpdate = () => {
      console.log("✅ Status update received from mentor");
      toast.dismiss();
      toast.info("New Session Has Been Created");
    };

    const handleTaskNotification = () => {
      toast.dismiss();
      toast.info("Task notification received");
    };

    socket.on("StatusUpdateOfSession", handleStatusUpdate);
    socket.on("NotifyingAboutTask", handleTaskNotification);

    return () => {
      socket.off("StatusUpdateOfSession", handleStatusUpdate);
      socket.off("NotifyingAboutTask", handleTaskNotification);
    };
  }, [user?._id]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] relative overflow-hidden">
      {/* Floating particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-red-500/30 rounded-full animate-bounce" style={{ animationDelay: '500ms' }}></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-blue-500/40 rounded-full animate-bounce" style={{ animationDelay: '1000ms' }}></div>
        <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-purple-500/35 rounded-full animate-bounce" style={{ animationDelay: '1500ms' }}></div>
        <div className="absolute bottom-20 right-40 w-2 h-2 bg-yellow-500/25 rounded-full animate-bounce" style={{ animationDelay: '2000ms' }}></div>
      </div>

      <div className="relative z-10 max-w-8xl mx-auto p-4 lg:p-8">
        
        {/* Header and Profile */}
        <MenteeHeaderProfile 
          menteeData={menteeData}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          notifications={notifications}
          currentTime={currentTime}
        />

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="bg-gray-900/90 backdrop-blur-xl rounded-2xl p-2 border border-gray-800/60 shadow-xl">
            <div className="flex space-x-2">
              {[
                { id: "overview", label: "Overview", icon: Home },
                { id: "learning", label: "Learning Paths", icon: BookOpen },
                { id: "sessions", label: "Sessions", icon: Video },
                { id: "notification", label: "Notification", icon: Bell },
                { id: "feedback", label: "Community", icon: Users },
                { id: "task", label: "Task", icon: BookOpen },
              ].map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105 group ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-500/30"
                        : "text-gray-400 hover:text-white hover:bg-gray-800/60"
                    }`}
                  >
                    <IconComponent size={18} className="group-hover:animate-pulse" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="transition-all duration-500">
          {activeTab === "overview" && (
            <MenteeOverviewTab 
              advancedProgressData={advancedProgressData}
              skillsData={skillsData}
              upcomingSessionsMock={upcomingSessionsMock}
              recentActivitiesMock={recentActivitiesMock}
              goals={goals}
              badges={badges}
              menteeData={menteeData}
              setSelectedGoal={setSelectedGoal}
            />
          )}

          {activeTab === "learning" && (
            <MenteeLearningTab learningPaths={learningPaths} />
          )}

          {activeTab === "sessions" && <Sessions />}

          {activeTab === "notification" && <Notification />}

          {activeTab === "feedback" && <Feedback />}
          
          {activeTab === "task" && <Task />}
        </div>

        {/* Floating Action Button */}
        <div className="fixed bottom-8 right-8 z-50">
          <button className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-2xl shadow-2xl shadow-red-500/30 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-90 group">
            <Plus size={28} className="group-hover:animate-spin" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default MenteeDashboard;
