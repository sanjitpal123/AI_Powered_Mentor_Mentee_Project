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
import { Link, useNavigate } from "react-router-dom";
import { socket } from "../utils/socket";
import { GlobalContext } from "../ContextApiStore/ContextStore";
import { toast } from "react-toastify";
import {
  Feedback,
  Notification,
  Sessions,
  Task,
} from "../components/MenteeDashBoard";
import { GetMenteeProfileAnalizedByAI } from "../services/GetMenteeProfile";
const MenteeDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications, setNotifications] = useState(3);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGoal, setSelectedGoal] = useState(null);
  const { User } = useContext(GlobalContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);
  const navigate = useNavigate();

  // Placeholder functions for future implementation
  const AiProfileAnalize = async () => {
    navigate("/profile-analize");
  };

  const handleProgressPrediction = () =>
    console.log("Progress Prediction feature");
  const handlePersonalizedLearning = () =>
    console.log("Personalized Learning Path feature");
  const handleMentorMatching = () =>
    console.log("Advanced Mentor Matching feature");
  const handleSkillAssessment = () => console.log("Skill Assessment feature");
  const handleCareerPathAnalysis = () =>
    console.log("Career Path Analysis feature");
  const handleNetworkingHub = () => console.log("Networking Hub feature");
  const handleVirtualWhiteboard = () =>
    console.log("Virtual Whiteboard feature");
  const handleCodeReviewAI = () => console.log("AI Code Review feature");

  useEffect(() => {
    if (!user?._id) return;

    // join room using menteeId
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

  // useEffect(() => {
  //   const handleStatusUpdate = () => {
  //     console.log("status is updated from mentor");
  //   };
  //   const handleTaskNotification = () => {
  //     console.log("status is updated from mentor");
  //   };

  //   // attach socket listener
  //   socket.on("StatusUpdateOfSession", handleStatusUpdate);

  //   // listen for task
  //   socket.on("NotifyingAboutTask", handleTaskNotification);

  //   // start timer
  //   const timer = setInterval(() => setCurrentTime(new Date()), 1000);

  //   // cleanup both socket listener & timer
  //   return () => {
  //     socket.off("StatusUpdateOfSession", handleStatusUpdate);
  //     socket.off("NotifyingAboutTask", handleTaskNotification);
  //     clearInterval(timer);
  //   };
  // }, [socket]);

  useEffect(() => {
    const handleNotification = () => {
      toast.dismiss();
      toast.info("New Session Has Been Created");
    };
    socket.on("StatusUpdateOfSession", handleNotification);
    return () => {
      socket.off("StatusUpdateOfSession", handleNotification);
    };
  }, []);
  // Enhanced mock data

  const menteeData = {
    name: "Alexandra Chen",
    avatar:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150",
    role: "Full-Stack Developer Mentee",
    level: "Intermediate",
    joinDate: "2024-09-15",
    sessionsCompleted: 47,
    goalsAchieved: 23,
    currentStreak: 28,
    totalHours: 156,
    skillScore: 847,
    nextMilestone: 1000,
    location: "San Francisco, CA",
    timezone: "PST",
    preferredLanguages: ["JavaScript", "Python", "TypeScript"],
    learningStyle: "Visual & Hands-on",
  };

  const advancedProgressData = [
    { week: "W1", progress: 15, focus: 85, engagement: 92, skills: 20 },
    { week: "W2", progress: 28, focus: 78, engagement: 88, skills: 35 },
    { week: "W3", progress: 42, focus: 82, engagement: 94, skills: 48 },
    { week: "W4", progress: 58, focus: 89, engagement: 91, skills: 62 },
    { week: "W5", progress: 71, focus: 94, engagement: 96, skills: 75 },
    { week: "W6", progress: 83, focus: 91, engagement: 93, skills: 84 },
    { week: "W7", progress: 92, focus: 96, engagement: 98, skills: 91 },
  ];

  const skillsData = [
    { skill: "React", level: 85, color: "#EF4444" },
    { skill: "JavaScript", level: 92, color: "#DC2626" },
    { skill: "Node.js", level: 68, color: "#B91C1C" },
    { skill: "Python", level: 74, color: "#991B1B" },
    { skill: "Database", level: 56, color: "#7F1D1D" },
    { skill: "DevOps", level: 43, color: "#450A0A" },
  ];

  const goals = [
    {
      id: 1,
      title: "Master React Ecosystem",
      status: "Completed",
      progress: 100,
      priority: "High",
      deadline: "2025-01-10",
      category: "Frontend",
      estimatedHours: 40,
      completedHours: 40,
      difficulty: "Advanced",
    },
    {
      id: 2,
      title: "Build Full-Stack E-commerce App",
      status: "In Progress",
      progress: 73,
      priority: "High",
      deadline: "2025-02-15",
      category: "Project",
      estimatedHours: 80,
      completedHours: 58,
      difficulty: "Expert",
    },
    {
      id: 3,
      title: "Learn GraphQL & Apollo",
      status: "In Progress",
      progress: 45,
      priority: "Medium",
      deadline: "2025-01-30",
      category: "Backend",
      estimatedHours: 30,
      completedHours: 14,
      difficulty: "Intermediate",
    },
    {
      id: 4,
      title: "Docker & Kubernetes Mastery",
      status: "Pending",
      progress: 0,
      priority: "Low",
      deadline: "2025-03-01",
      category: "DevOps",
      estimatedHours: 50,
      completedHours: 0,
      difficulty: "Advanced",
    },
    {
      id: 5,
      title: "System Design Fundamentals",
      status: "Pending",
      progress: 0,
      priority: "Medium",
      deadline: "2025-02-28",
      category: "Architecture",
      estimatedHours: 60,
      completedHours: 0,
      difficulty: "Expert",
    },
  ];

  const upcomingSessions = [
    {
      id: 1,
      date: "2025-01-15",
      time: "2:00 PM",
      duration: "90 min",
      mentor: "Dr. Sarah Chen",
      mentorAvatar:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150",
      topic: "Advanced React Patterns",
      type: "Video Call",
      status: "Confirmed",
      sessionType: "Technical Deep Dive",
      preparationMaterials: ["React Hooks Guide", "Performance Optimization"],
      meetingLink: "https://meet.example.com/session-1",
    },
    {
      id: 2,
      date: "2025-01-17",
      time: "10:00 AM",
      duration: "60 min",
      mentor: "Mike Rodriguez",
      mentorAvatar:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150",
      topic: "API Architecture Review",
      type: "Screen Share",
      status: "Pending",
      sessionType: "Code Review",
      preparationMaterials: ["API Documentation", "Current Project Code"],
      meetingLink: "https://meet.example.com/session-2",
    },
    {
      id: 3,
      date: "2025-01-20",
      time: "3:30 PM",
      duration: "120 min",
      mentor: "Emily Davis",
      mentorAvatar:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
      topic: "Career Strategy Planning",
      type: "In-Person",
      status: "Confirmed",
      sessionType: "Career Guidance",
      preparationMaterials: ["Resume", "Portfolio Projects"],
      meetingLink: null,
    },
  ];

  const mentorFeedback = [
    {
      id: 1,
      mentor: "Dr. Sarah Chen",
      avatar:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150",
      feedback:
        "Outstanding progress on React architecture! Your component design patterns show deep understanding. Ready for advanced state management concepts.",
      rating: 5,
      date: "2025-01-10",
      category: "Technical Skills",
      sessionType: "Code Review",
      actionItems: [
        "Practice Redux Toolkit",
        "Build complex forms",
        "Optimize performance",
      ],
    },
    {
      id: 2,
      mentor: "Mike Rodriguez",
      avatar:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150",
      feedback:
        "Excellent problem-solving approach during our debugging session. Your systematic thinking and attention to detail are impressive.",
      rating: 5,
      date: "2025-01-08",
      category: "Problem Solving",
      sessionType: "Debugging",
      actionItems: [
        "Learn advanced debugging tools",
        "Practice error handling",
        "Study testing strategies",
      ],
    },
    {
      id: 3,
      mentor: "Emily Davis",
      avatar:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
      feedback:
        "Strong grasp of Git workflows and collaboration practices. Communication skills during pair programming are exceptional.",
      rating: 4,
      date: "2025-01-05",
      category: "Collaboration",
      sessionType: "Pair Programming",
      actionItems: [
        "Advanced Git strategies",
        "Code documentation",
        "Team leadership skills",
      ],
    },
  ];

  const badges = [
    {
      id: 1,
      name: "First Session",
      icon: Video,
      earned: true,
      rarity: "Common",
      earnedDate: "2024-09-20",
    },
    {
      id: 2,
      name: "Goal Crusher",
      icon: Target,
      earned: true,
      rarity: "Rare",
      earnedDate: "2024-10-15",
    },
    {
      id: 3,
      name: "Code Ninja",
      icon: Award,
      earned: true,
      rarity: "Epic",
      earnedDate: "2024-11-22",
    },
    {
      id: 4,
      name: "Team Leader",
      icon: Users,
      earned: true,
      rarity: "Rare",
      earnedDate: "2024-12-05",
    },
    {
      id: 5,
      name: "Streak Master",
      icon: Flame,
      earned: false,
      rarity: "Legendary",
      earnedDate: null,
    },
    {
      id: 6,
      name: "Innovation Pioneer",
      icon: Brain,
      earned: false,
      rarity: "Mythic",
      earnedDate: null,
    },
  ];

  const learningPaths = [
    {
      id: 1,
      title: "Frontend Mastery",
      progress: 78,
      totalModules: 12,
      completedModules: 9,
      estimatedCompletion: "3 weeks",
      difficulty: "Intermediate",
      technologies: ["React", "TypeScript", "Next.js"],
    },
    {
      id: 2,
      title: "Backend Excellence",
      progress: 34,
      totalModules: 15,
      completedModules: 5,
      estimatedCompletion: "8 weeks",
      difficulty: "Advanced",
      technologies: ["Node.js", "PostgreSQL", "Docker"],
    },
    {
      id: 3,
      title: "DevOps Journey",
      progress: 12,
      totalModules: 10,
      completedModules: 1,
      estimatedCompletion: "12 weeks",
      difficulty: "Expert",
      technologies: ["AWS", "Kubernetes", "Terraform"],
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "session_completed",
      title: "Completed React Hooks Deep Dive",
      time: "2 hours ago",
      icon: CheckCircle2,
      color: "text-green-400",
    },
    {
      id: 2,
      type: "goal_updated",
      title: "Updated E-commerce App progress to 73%",
      time: "5 hours ago",
      icon: TrendingUp,
      color: "text-blue-400",
    },
    {
      id: 3,
      type: "feedback_received",
      title: "Received feedback from Dr. Sarah Chen",
      time: "1 day ago",
      icon: MessageCircle,
      color: "text-purple-400",
    },
    {
      id: 4,
      type: "badge_earned",
      title: 'Earned "Code Ninja" badge',
      time: "2 days ago",
      icon: Award,
      color: "text-yellow-400",
    },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "text-red-400 bg-red-900/20 border-red-800";
      case "Medium":
        return "text-yellow-400 bg-yellow-900/20 border-yellow-800";
      case "Low":
        return "text-green-400 bg-green-900/20 border-green-800";
      default:
        return "text-gray-400 bg-gray-900/20 border-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return CheckCircle2;
      case "In Progress":
        return AlertCircle;
      case "Pending":
        return Clock;
      default:
        return XCircle;
    }
  };

  const getBadgeRarityColor = (rarity) => {
    switch (rarity) {
      case "Common":
        return "from-gray-600 to-gray-700 border-gray-500";
      case "Rare":
        return "from-blue-600 to-blue-700 border-blue-500";
      case "Epic":
        return "from-purple-600 to-purple-700 border-purple-500";
      case "Legendary":
        return "from-yellow-600 to-yellow-700 border-yellow-500";
      case "Mythic":
        return "from-red-600 to-red-700 border-red-500";
      default:
        return "from-gray-600 to-gray-700 border-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/8 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      {/* Floating particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-red-500/30 rounded-full animate-bounce animation-delay-500"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-blue-500/40 rounded-full animate-bounce animation-delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-purple-500/35 rounded-full animate-bounce animation-delay-1500"></div>
        <div className="absolute bottom-20 right-40 w-2 h-2 bg-yellow-500/25 rounded-full animate-bounce animation-delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-8xl mx-auto p-4 lg:p-8 animate-fade-in">
        {/* Top Navigation Bar */}
        <div className="mb-8 animate-slide-down">
          <div className="bg-[#0a0a0a] rounded-2xl border border-white/5 p-4 shadow-xl hover:shadow-red-500/10 transition-all duration-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg hover:shadow-red-500/50 transition-all duration-300 hover:scale-110">
                    <Brain className="text-white" size={24} />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      MentorSpace
                    </h1>
                    <p className="text-xs text-gray-400 font-medium">
                      Advanced Learning Platform
                    </p>
                  </div>
                </div>

                <div className="hidden md:flex items-center gap-4">
                  <div className="relative group">
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-red-400 transition-colors duration-200"
                      size={18}
                    />
                    <input
                      type="text"
                      placeholder="Search goals, sessions, mentors..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-gray-800/80 border border-gray-700/60 rounded-xl pl-12 pr-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 w-80 hover:bg-gray-800 focus:bg-gray-800"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-medium text-white">
                    {currentTime.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                  <div className="text-xs text-gray-400">
                    {currentTime.toLocaleDateString()}
                  </div>
                </div>

                <button className="relative p-3 bg-gray-800/80 rounded-xl border border-gray-700/60 hover:border-red-500 hover:bg-gray-800 transition-all duration-300 hover:scale-105 group">
                  <Bell
                    className="text-gray-400 group-hover:text-red-400 transition-colors duration-200"
                    size={20}
                  />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse font-bold">
                      {notifications}
                    </span>
                  )}
                </button>

                <button className="p-3 bg-gray-800/80 rounded-xl border border-gray-700/60 hover:border-red-500 hover:bg-gray-800 transition-all duration-300 hover:scale-105 group">
                  <Settings
                    className="text-gray-400 group-hover:text-red-400 transition-colors duration-200"
                    size={20}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Header Profile */}
        <div className="mb-8 animate-slide-up">
          <div className="bg-[#0a0a0a] rounded-3xl border border-white/5 p-8 relative overflow-hidden shadow-xl hover:shadow-red-500/10 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent opacity-50"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-red-600"></div>

            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                <div
                  className="relative group cursor-pointer hover:scale-105 transition-transform duration-300"
                  onClick={() => setIsProfileExpanded(!isProfileExpanded)}
                >
                  <div className="w-36 h-36 rounded-3xl overflow-hidden border-4 border-red-500/40 group-hover:border-red-500 transition-all duration-300 shadow-2xl hover:shadow-red-500/30">
                    <img
                      src={menteeData.avatar}
                      alt={menteeData.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm px-4 py-2 rounded-full font-bold shadow-lg">
                    {menteeData.level}
                  </div>
                  <div className="absolute top-3 right-3 w-5 h-5 bg-green-400 rounded-full border-2 border-gray-900 animate-pulse"></div>
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-red-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="flex-1 text-center lg:text-left">
                  <div className="mb-6">
                    <h1 className="text-5xl font-bold text-white mb-3 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent hover:from-red-200 hover:via-white hover:to-red-200 transition-all duration-500">
                      {menteeData.name}
                    </h1>
                    <p className="text-red-400 text-xl font-semibold mb-3 hover:text-red-300 transition-colors duration-300">
                      {menteeData.role}
                    </p>
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-400">
                      <span className="flex items-center gap-2 hover:text-gray-300 transition-colors duration-200">
                        <MapPin size={16} className="text-red-400" />
                        {menteeData.location}
                      </span>
                      <span className="flex items-center gap-2 hover:text-gray-300 transition-colors duration-200">
                        <Globe size={16} className="text-red-400" />
                        {menteeData.timezone}
                      </span>
                      <span className="flex items-center gap-2 hover:text-gray-300 transition-colors duration-200">
                        <Calendar size={16} className="text-red-400" />
                        Joined{" "}
                        {new Date(menteeData.joinDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center p-6 bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-700/60 hover:border-red-500/60 transition-all duration-300 group hover:scale-105 hover:bg-gray-800/80">
                      <div className="text-4xl font-bold text-red-400 mb-2 group-hover:text-red-300 transition-colors duration-300">
                        {menteeData.sessionsCompleted}
                      </div>
                      <div className="text-sm text-gray-300 font-medium">
                        Sessions
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {menteeData.totalHours}h total
                      </div>
                    </div>
                    <div className="text-center p-6 bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-700/60 hover:border-red-500/60 transition-all duration-300 group hover:scale-105 hover:bg-gray-800/80">
                      <div className="text-4xl font-bold text-red-400 mb-2 group-hover:text-red-300 transition-colors duration-300">
                        {menteeData.goalsAchieved}
                      </div>
                      <div className="text-sm text-gray-300 font-medium">
                        Goals
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        5 in progress
                      </div>
                    </div>
                    <div className="text-center p-6 bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-700/60 hover:border-red-500/60 transition-all duration-300 group hover:scale-105 hover:bg-gray-800/80">
                      <div className="text-4xl font-bold text-red-400 mb-2 group-hover:text-red-300 transition-colors duration-300">
                        {menteeData.currentStreak}
                      </div>
                      <div className="text-sm text-gray-300 font-medium">
                        Day Streak
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Personal best!
                      </div>
                    </div>
                    <div className="text-center p-6 bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-700/60 hover:border-red-500/60 transition-all duration-300 group hover:scale-105 hover:bg-gray-800/80">
                      <div className="text-4xl font-bold text-red-400 mb-2 group-hover:text-red-300 transition-colors duration-300">
                        {menteeData.skillScore}
                      </div>
                      <div className="text-sm text-gray-300 font-medium">
                        Skill Score
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {menteeData.nextMilestone - menteeData.skillScore} to
                        next level
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-col gap-4">
                  <button
                    onClick={AiProfileAnalize}
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-2xl hover:shadow-red-500/30 hover:scale-105 hover:-translate-y-1 group"
                  >
                    <Brain
                      className="inline mr-2 group-hover:animate-pulse"
                      size={20}
                    />
                    AI Insights
                  </button>
                  <Link
                    to="/createsession"
                    className="bg-gray-800/80 hover:bg-gray-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 border border-gray-700/60 hover:border-red-500 hover:scale-105 hover:-translate-y-1 group"
                  >
                    <Calendar
                      className="inline mr-2 group-hover:text-red-400 transition-colors duration-200"
                      size={20}
                    />
                    Schedule
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Tabs */}
        <div className="mb-8 animate-slide-up animation-delay-200">
          <div className="bg-gray-900/90 backdrop-blur-xl rounded-2xl p-2 border border-gray-800/60 shadow-xl">
            <div className="flex space-x-2">
              {[
                { id: "overview", label: "Overview", icon: Home },
                { id: "learning", label: "Learning Paths", icon: BookOpen },
                { id: "sessions", label: "Sessions", icon: Video },
                { id: "notification", label: "Notification", icon: Bell },
                { id: "feedback", label: "feedback", icon: Users },
                { id: "task", label: "Task", icon: BookOpen },
              ].map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105 group ${activeTab === tab.id
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

        {/* Tab Content */}
        <div
          className={`transition-all duration-500 ${activeTab ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
        >
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
              {/* Main Progress Section */}
              <div className="xl:col-span-8 space-y-8">
                {/* Advanced Progress Tracker */}
                <div className="bg-gray-900/90 backdrop-blur-xl rounded-3xl p-8 border border-gray-800/60 hover:border-red-500/40 transition-all duration-500 shadow-2xl hover:shadow-red-500/20 hover:scale-[1.02] hover:-translate-y-2 group">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-red-500/50 transition-all duration-300">
                        <TrendingUp className="text-white" size={28} />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-white group-hover:text-red-100 transition-colors duration-300">
                          Learning Analytics
                        </h3>
                        <p className="text-gray-400 text-lg">
                          Multi-dimensional progress tracking
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleProgressPrediction}
                      className="bg-red-600/20 hover:bg-red-600/40 text-red-400 px-6 py-3 rounded-xl border border-red-500/40 transition-all duration-300 hover:scale-105 font-semibold hover:shadow-lg hover:shadow-red-500/20"
                    >
                      <Zap className="inline mr-2" size={18} />
                      AI Predict
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-blue-600/30 to-blue-700/30 rounded-2xl p-6 border border-blue-500/40 hover:border-blue-400 transition-all duration-300 hover:scale-105 group">
                      <div className="text-3xl font-bold text-blue-400 mb-2 group-hover:text-blue-300 transition-colors duration-300">
                        92%
                      </div>
                      <div className="text-sm text-gray-300 font-medium">
                        Overall Progress
                      </div>
                      <div className="w-full bg-blue-900/20 rounded-full h-2 mt-3">
                        <div className="bg-gradient-to-r from-blue-400 to-blue-500 h-2 rounded-full w-[92%] animate-pulse"></div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-green-600/30 to-green-700/30 rounded-2xl p-6 border border-green-500/40 hover:border-green-400 transition-all duration-300 hover:scale-105 group">
                      <div className="text-3xl font-bold text-green-400 mb-2 group-hover:text-green-300 transition-colors duration-300">
                        96%
                      </div>
                      <div className="text-sm text-gray-300 font-medium">
                        Focus Score
                      </div>
                      <div className="w-full bg-green-900/20 rounded-full h-2 mt-3">
                        <div className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full w-[96%] animate-pulse"></div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-600/30 to-purple-700/30 rounded-2xl p-6 border border-purple-500/40 hover:border-purple-400 transition-all duration-300 hover:scale-105 group">
                      <div className="text-3xl font-bold text-purple-400 mb-2 group-hover:text-purple-300 transition-colors duration-300">
                        98%
                      </div>
                      <div className="text-sm text-gray-300 font-medium">
                        Engagement
                      </div>
                      <div className="w-full bg-purple-900/20 rounded-full h-2 mt-3">
                        <div className="bg-gradient-to-r from-purple-400 to-purple-500 h-2 rounded-full w-[98%] animate-pulse"></div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-yellow-600/30 to-yellow-700/30 rounded-2xl p-6 border border-yellow-500/40 hover:border-yellow-400 transition-all duration-300 hover:scale-105 group">
                      <div className="text-3xl font-bold text-yellow-400 mb-2 group-hover:text-yellow-300 transition-colors duration-300">
                        91%
                      </div>
                      <div className="text-sm text-gray-300 font-medium">
                        Skill Growth
                      </div>
                      <div className="w-full bg-yellow-900/20 rounded-full h-2 mt-3">
                        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-2 rounded-full w-[91%] animate-pulse"></div>
                      </div>
                    </div>
                  </div>

                  <div className="h-80 bg-gray-800/30 rounded-2xl border border-gray-700/50 p-4 hover:border-red-500/30 transition-all duration-300">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={advancedProgressData}>
                        <defs>
                          <linearGradient
                            id="progressGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#EF4444"
                              stopOpacity={0.4}
                            />
                            <stop
                              offset="95%"
                              stopColor="#EF4444"
                              stopOpacity={0}
                            />
                          </linearGradient>
                          <linearGradient
                            id="focusGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#3B82F6"
                              stopOpacity={0.4}
                            />
                            <stop
                              offset="95%"
                              stopColor="#3B82F6"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="week" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1F2937",
                            border: "1px solid #EF4444",
                            borderRadius: "12px",
                            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="progress"
                          stroke="#EF4444"
                          strokeWidth={3}
                          fill="url(#progressGradient)"
                        />
                        <Area
                          type="monotone"
                          dataKey="focus"
                          stroke="#3B82F6"
                          strokeWidth={2}
                          fill="url(#focusGradient)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Skills Radar */}
                <div className="bg-gray-900/90 backdrop-blur-xl rounded-3xl p-8 border border-gray-800/60 hover:border-red-500/40 transition-all duration-500 shadow-2xl hover:shadow-red-500/20 hover:scale-[1.02] hover:-translate-y-2 group">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300">
                        <Brain className="text-white" size={28} />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-white group-hover:text-purple-100 transition-colors duration-300">
                          Skill Mastery
                        </h3>
                        <p className="text-gray-400 text-lg">
                          Technology proficiency levels
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleSkillAssessment}
                      className="bg-purple-600/20 hover:bg-purple-600/40 text-purple-400 px-6 py-3 rounded-xl border border-purple-500/40 transition-all duration-300 hover:scale-105 font-semibold hover:shadow-lg hover:shadow-purple-500/20"
                    >
                      <Target className="inline mr-2" size={18} />
                      Assess Skills
                    </button>
                  </div>

                  <div className="space-y-6">
                    {skillsData.map((skill, index) => (
                      <div
                        key={skill.skill}
                        className="group hover:scale-[1.02] transition-transform duration-300"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-semibold text-white text-lg group-hover:text-red-200 transition-colors duration-300">
                            {skill.skill}
                          </span>
                          <span className="text-sm text-gray-400 font-bold bg-gray-800/50 px-3 py-1 rounded-lg">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="relative">
                          <div className="w-full bg-gray-700/60 rounded-full h-4 shadow-inner">
                            <div
                              className="h-4 rounded-full bg-gradient-to-r from-red-500 to-red-600 relative overflow-hidden transition-all duration-1000 shadow-lg"
                              style={{ width: `${skill.level}%` }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="xl:col-span-4 space-y-8">
                {/* Upcoming Sessions */}
                <div className="bg-gray-900/90 backdrop-blur-xl rounded-3xl p-6 border border-gray-800/60 hover:border-red-500/40 transition-all duration-500 shadow-2xl hover:shadow-blue-500/20 hover:scale-[1.02] hover:-translate-y-2 group">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300">
                        <Calendar className="text-white" size={22} />
                      </div>
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-100 transition-colors duration-300">
                        Next Sessions
                      </h3>
                    </div>
                    <button className="text-blue-400 hover:text-blue-300 transition-colors duration-200 hover:scale-110 p-2 rounded-lg hover:bg-blue-600/20">
                      <Plus size={22} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {upcomingSessions.slice(0, 3).map((session, index) => (
                      <div
                        key={session.id}
                        className="group bg-gray-800/60 rounded-2xl p-5 hover:bg-gray-800/90 transition-all duration-300 border border-gray-700/60 hover:border-red-500/40 hover:scale-[1.02] hover:-translate-y-1 cursor-pointer"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex items-start gap-4 mb-3">
                          <div className="relative">
                            <img
                              src={session.mentorAvatar}
                              alt={session.mentor}
                              className="w-14 h-14 rounded-xl object-cover border-2 border-gray-600 group-hover:border-red-500 transition-all duration-300 hover:scale-110"
                            />
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-900 animate-pulse"></div>
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-white mb-1 group-hover:text-red-200 transition-colors duration-300">
                              {session.mentor}
                            </div>
                            <div className="text-sm text-red-400 mb-1 font-medium">
                              {session.topic}
                            </div>
                            <div className="text-xs text-gray-400">
                              {session.sessionType}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold text-white">
                              {session.time}
                            </div>
                            <div className="text-xs text-gray-400">
                              {session.duration}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Clock size={14} className="text-gray-400" />
                            <span className="text-sm text-gray-300">
                              {session.date}
                            </span>
                          </div>
                          <button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-red-500/30 hover:scale-105">
                            <Video className="inline mr-1" size={14} />
                            Join
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-gray-900/90 backdrop-blur-xl rounded-3xl p-6 border border-gray-800/60 hover:border-red-500/40 transition-all duration-500 shadow-2xl hover:shadow-green-500/20 hover:scale-[1.02] hover:-translate-y-2 group">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-green-500/50 transition-all duration-300">
                      <Zap className="text-white" size={22} />
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-green-100 transition-colors duration-300">
                      Recent Activity
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => {
                      const IconComponent = activity.icon;
                      return (
                        <div
                          key={activity.id}
                          className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-800/40 transition-all duration-300 hover:scale-[1.02] group/item cursor-pointer"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div
                            className={`p-3 rounded-lg bg-gray-800/60 ${activity.color} border border-gray-700/50 group-hover/item:border-red-500/40 transition-all duration-300`}
                          >
                            <IconComponent size={18} />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-white mb-1 group-hover/item:text-red-200 transition-colors duration-300">
                              {activity.title}
                            </div>
                            <div className="text-xs text-gray-400">
                              {activity.time}
                            </div>
                          </div>
                          <ChevronRight
                            className="text-gray-600 group-hover/item:text-red-400 transition-colors duration-300"
                            size={16}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Goals & Achievements */}
              <div className="xl:col-span-4 space-y-8">
                {/* Quick Goals Overview */}
                <div className="bg-gray-900/90 backdrop-blur-xl rounded-3xl p-6 border border-gray-800/60 hover:border-red-500/40 transition-all duration-500 shadow-2xl hover:shadow-yellow-500/20 hover:scale-[1.02] hover:-translate-y-2 group">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-yellow-500/50 transition-all duration-300">
                        <Target className="text-white" size={22} />
                      </div>
                      <h3 className="text-xl font-bold text-white group-hover:text-yellow-100 transition-colors duration-300">
                        Active Goals
                      </h3>
                    </div>
                    <span className="text-sm text-gray-400 bg-gray-800/50 px-3 py-1 rounded-lg font-medium">
                      5 total
                    </span>
                  </div>

                  <div className="space-y-4">
                    {goals.slice(0, 3).map((goal, index) => {
                      const StatusIcon = getStatusIcon(goal.status);
                      return (
                        <div
                          key={goal.id}
                          className="bg-gray-800/60 rounded-xl p-4 hover:bg-gray-800/90 transition-all duration-300 cursor-pointer border border-gray-700/60 hover:border-red-500/40 hover:scale-[1.02] hover:-translate-y-1 group/goal"
                          onClick={() => setSelectedGoal(goal)}
                          style={{ animationDelay: `${index * 150}ms` }}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <StatusIcon
                              className={`${goal.status === "Completed"
                                  ? "text-green-400"
                                  : goal.status === "In Progress"
                                    ? "text-blue-400"
                                    : "text-gray-500"
                                } group-hover/goal:scale-110 transition-transform duration-300`}
                              size={18}
                            />
                            <span
                              className={`px-3 py-1 rounded-lg text-xs font-bold border ${getPriorityColor(
                                goal.priority
                              )} hover:scale-105 transition-transform duration-200`}
                            >
                              {goal.priority}
                            </span>
                          </div>
                          <h4 className="font-semibold text-white text-sm mb-3 group-hover/goal:text-red-200 transition-colors duration-300">
                            {goal.title}
                          </h4>
                          <div className="w-full bg-gray-700/60 rounded-full h-3 mb-2 shadow-inner">
                            <div
                              className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full transition-all duration-1000 shadow-lg relative overflow-hidden"
                              style={{ width: `${goal.progress}%` }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                            </div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-400 font-medium">
                            <span>{goal.progress}%</span>
                            <span>
                              {goal.completedHours}h / {goal.estimatedHours}h
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <button className="w-full mt-6 bg-gray-800/60 hover:bg-gray-800/90 text-gray-300 hover:text-white py-4 rounded-xl border border-gray-700/60 hover:border-red-500/40 transition-all duration-300 flex items-center justify-center gap-2 font-semibold hover:scale-[1.02] group/btn">
                    <ChevronRight
                      size={18}
                      className="group-hover/btn:translate-x-1 transition-transform duration-300"
                    />
                    View All Goals
                  </button>
                </div>

                {/* Achievement Showcase */}
                <div className="bg-gray-900/90 backdrop-blur-xl rounded-3xl p-6 border border-gray-800/60 hover:border-red-500/40 transition-all duration-500 shadow-2xl hover:shadow-yellow-500/20 hover:scale-[1.02] hover:-translate-y-2 group">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-yellow-500/50 transition-all duration-300">
                      <Trophy className="text-white" size={22} />
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-yellow-100 transition-colors duration-300">
                      Achievements
                    </h3>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {badges.slice(0, 6).map((badge, index) => {
                      const IconComponent = badge.icon;
                      return (
                        <div
                          key={badge.id}
                          className={`relative text-center p-4 rounded-xl transition-all duration-300 hover:scale-110 border cursor-pointer group/badge ${badge.earned
                              ? `bg-gradient-to-br ${getBadgeRarityColor(
                                badge.rarity
                              )} shadow-lg hover:shadow-xl`
                              : "bg-gray-800/40 border-gray-700/60 text-gray-500 hover:bg-gray-800/60"
                            }`}
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <IconComponent
                            size={24}
                            className="mx-auto mb-2 group-hover/badge:animate-bounce"
                          />
                          <div className="text-xs font-bold">{badge.name}</div>
                          {badge.earned && (
                            <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-900 animate-pulse"></div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Enhanced Streak Counter */}
                  <div className="bg-gradient-to-r from-red-600/30 to-red-700/30 rounded-2xl p-6 border border-red-500/40 hover:border-red-400 transition-all duration-300 hover:scale-105 group/streak">
                    <div className="text-center">
                      <div className="mb-4">
                        <Flame
                          size={52}
                          className="mx-auto text-red-400 group-hover/streak:text-red-300 transition-colors duration-300 animate-pulse"
                        />
                      </div>
                      <div className="text-5xl font-bold text-white mb-2 group-hover/streak:text-red-100 transition-colors duration-300">
                        {menteeData.currentStreak}
                      </div>
                      <div className="text-red-300 font-semibold text-lg mb-2">
                        Day Learning Streak
                      </div>
                      <div className="text-xs text-gray-400 bg-gray-800/50 px-3 py-1 rounded-lg inline-block">
                        Keep it up! 2 days to beat your record
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "learning" && (
            <div className="space-y-8">
              {/* Learning Paths Header */}
              <div className="bg-gray-900/90 backdrop-blur-xl rounded-3xl p-8 border border-gray-800/60 shadow-2xl">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                  <div>
                    <h2 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent">
                      Personalized Learning Paths
                    </h2>
                    <p className="text-gray-400 text-lg">
                      AI-curated curriculum tailored to your goals and learning
                      style
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={handlePersonalizedLearning}
                      className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-2xl hover:shadow-red-500/30 hover:scale-105 hover:-translate-y-1"
                    >
                      <Brain className="inline mr-2" size={20} />
                      AI Optimize
                    </button>
                    <button
                      onClick={handleCareerPathAnalysis}
                      className="bg-gray-800/80 hover:bg-gray-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 border border-gray-700/60 hover:border-red-500 hover:scale-105 hover:-translate-y-1"
                    >
                      <TrendingUp className="inline mr-2" size={20} />
                      Career Analysis
                    </button>
                  </div>
                </div>
              </div>

              {/* Learning Paths Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {learningPaths.map((path, index) => (
                  <div
                    key={path.id}
                    className="bg-gray-900/90 backdrop-blur-xl rounded-3xl p-6 border border-gray-800/60 hover:border-red-500/40 transition-all duration-500 shadow-2xl hover:shadow-red-500/20 hover:scale-[1.02] hover:-translate-y-2 group cursor-pointer"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-white group-hover:text-red-200 transition-colors duration-300">
                          {path.title}
                        </h3>
                        <span
                          className={`px-3 py-2 rounded-lg text-xs font-bold border hover:scale-105 transition-transform duration-200 ${path.difficulty === "Expert"
                              ? "bg-red-600/30 text-red-400 border-red-500/40"
                              : path.difficulty === "Advanced"
                                ? "bg-yellow-600/30 text-yellow-400 border-yellow-500/40"
                                : "bg-green-600/30 text-green-400 border-green-500/40"
                            }`}
                        >
                          {path.difficulty}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mb-4 font-medium">
                        {path.completedModules} of {path.totalModules} modules
                        completed
                      </p>

                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-300 font-medium">
                            Progress
                          </span>
                          <span className="text-red-400 font-bold">
                            {path.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-700/60 rounded-full h-4 shadow-inner">
                          <div
                            className="bg-gradient-to-r from-red-500 to-red-600 h-4 rounded-full relative overflow-hidden shadow-lg transition-all duration-1000"
                            style={{ width: `${path.progress}%` }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {path.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-gray-800/60 text-gray-300 text-xs rounded-lg border border-gray-700/60 font-medium hover:bg-gray-700/60 hover:text-white transition-all duration-200 hover:scale-105"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="text-xs text-gray-400 mb-4 flex items-center gap-2">
                        <Clock size={14} className="text-red-400" />
                        Est. completion:{" "}
                        <span className="font-medium">
                          {path.estimatedCompletion}
                        </span>
                      </div>
                    </div>

                    <button className="w-full bg-gradient-to-r from-red-600/30 to-red-700/30 hover:from-red-600/50 hover:to-red-700/50 text-red-400 hover:text-red-300 py-4 rounded-xl border border-red-500/40 hover:border-red-500/60 transition-all duration-300 font-semibold hover:scale-[1.02] group/btn">
                      Continue Learning
                      <ChevronRight
                        className="inline ml-2 group-hover/btn:translate-x-1 transition-transform duration-300"
                        size={18}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "sessions" && <Sessions />}

          {activeTab === "notification" && <Notification />}

          {activeTab === "feedback" && <Feedback />}
          {activeTab === "task" && <Task />}
        </div>

        {/* Floating Action Button */}
        <div className="fixed bottom-8 right-8 z-50 animate-bounce-in animation-delay-1000">
          <button className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-2xl shadow-2xl shadow-red-500/30 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-90 group">
            <Plus size={28} className="group-hover:animate-spin" />
          </button>
        </div>

        {/* Goal Detail Modal */}
        {selectedGoal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
            <div
              className="bg-gray-900/95 backdrop-blur-xl rounded-3xl p-8 border border-gray-800/60 max-w-2xl w-full shadow-2xl animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-3xl font-bold text-white bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent">
                  {selectedGoal.title}
                </h3>
                <button
                  onClick={() => setSelectedGoal(null)}
                  className="text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-gray-800/50 hover:scale-110"
                >
                  <X size={28} />
                </button>
              </div>
              <p className="text-gray-400 mb-6 text-lg">
                Goal details and management interface would be implemented here.
              </p>
              <div className="flex gap-4">
                <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
                  Edit Goal
                </button>
                <button className="bg-gray-800/80 hover:bg-gray-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 border border-gray-700/60 hover:scale-105">
                  View Details
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes bounce-in {
          from {
            opacity: 0;
            transform: scale(0) rotate(180deg);
          }
          to {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        .animate-slide-down {
          animation: slide-down 0.8s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }
        .animate-bounce-in {
          animation: bounce-in 1s ease-out;
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        .animation-delay-500 {
          animation-delay: 500ms;
        }
        .animation-delay-1000 {
          animation-delay: 1000ms;
        }
        .animation-delay-1500 {
          animation-delay: 1500ms;
        }
        .animation-delay-2000 {
          animation-delay: 2000ms;
        }
      `}</style> */}
    </div>
  );
};

export default MenteeDashboard;
