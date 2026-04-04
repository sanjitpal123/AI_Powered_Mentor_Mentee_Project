// Mock Data for Mentee Dashboard

export const menteeData = {
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

export const advancedProgressData = [
  { week: "W1", progress: 15, focus: 85, engagement: 92, skills: 20 },
  { week: "W2", progress: 28, focus: 78, engagement: 88, skills: 35 },
  { week: "W3", progress: 42, focus: 82, engagement: 94, skills: 48 },
  { week: "W4", progress: 58, focus: 89, engagement: 91, skills: 62 },
  { week: "W5", progress: 71, focus: 94, engagement: 96, skills: 75 },
  { week: "W6", progress: 83, focus: 91, engagement: 93, skills: 84 },
  { week: "W7", progress: 92, focus: 96, engagement: 98, skills: 91 },
];

export const skillsData = [
  { skill: "React", level: 85, color: "#EF4444" },
  { skill: "JavaScript", level: 92, color: "#DC2626" },
  { skill: "Node.js", level: 68, color: "#B91C1C" },
  { skill: "Python", level: 74, color: "#991B1B" },
  { skill: "Database", level: 56, color: "#7F1D1D" },
  { skill: "DevOps", level: 43, color: "#450A0A" },
];

export const goals = [
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

export const upcomingSessionsMock = [
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

export const mentorFeedbackMock = [
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

import { Video, Target, Award, Users, Flame, Brain, CheckCircle2, TrendingUp, MessageCircle } from "lucide-react";

export const badges = [
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

export const learningPaths = [
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

export const recentActivitiesMock = [
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
