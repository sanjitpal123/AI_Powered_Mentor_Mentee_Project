import React from "react";
import { 
  TrendingUp, Zap, Brain, Target, Plus, Calendar, Clock, Video, 
  ChevronRight, Trophy, Flame, CheckCircle2, AlertCircle, XCircle 
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

export const MenteeOverviewTab = ({
  advancedProgressData,
  skillsData,
  upcomingSessionsMock,
  recentActivitiesMock,
  goals,
  badges,
  menteeData,
  setSelectedGoal
}) => {
  const handleProgressPrediction = () => console.log("Progress Prediction feature");
  const handleSkillAssessment = () => console.log("Skill Assessment feature");

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High": return "text-red-400 bg-red-900/20 border-red-800";
      case "Medium": return "text-yellow-400 bg-yellow-900/20 border-yellow-800";
      case "Low": return "text-green-400 bg-green-900/20 border-green-800";
      default: return "text-gray-400 bg-gray-900/20 border-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed": return CheckCircle2;
      case "In Progress": return AlertCircle;
      case "Pending": return Clock;
      default: return XCircle;
    }
  };

  const getBadgeRarityColor = (rarity) => {
    switch (rarity) {
      case "Common": return "from-gray-600 to-gray-700 border-gray-500";
      case "Rare": return "from-blue-600 to-blue-700 border-blue-500";
      case "Epic": return "from-purple-600 to-purple-700 border-purple-500";
      case "Legendary": return "from-yellow-600 to-yellow-700 border-yellow-500";
      case "Mythic": return "from-red-600 to-red-700 border-red-500";
      default: return "from-gray-600 to-gray-700 border-gray-500";
    }
  };

  return (
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
              <div className="text-3xl font-bold text-blue-400 mb-2 group-hover:text-blue-300 transition-colors duration-300">92%</div>
              <div className="text-sm text-gray-300 font-medium">Overall Progress</div>
              <div className="w-full bg-blue-900/20 rounded-full h-2 mt-3">
                <div className="bg-gradient-to-r from-blue-400 to-blue-500 h-2 rounded-full w-[92%] animate-pulse"></div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-600/30 to-green-700/30 rounded-2xl p-6 border border-green-500/40 hover:border-green-400 transition-all duration-300 hover:scale-105 group">
              <div className="text-3xl font-bold text-green-400 mb-2 group-hover:text-green-300 transition-colors duration-300">96%</div>
              <div className="text-sm text-gray-300 font-medium">Focus Score</div>
              <div className="w-full bg-green-900/20 rounded-full h-2 mt-3">
                <div className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full w-[96%] animate-pulse"></div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-600/30 to-purple-700/30 rounded-2xl p-6 border border-purple-500/40 hover:border-purple-400 transition-all duration-300 hover:scale-105 group">
              <div className="text-3xl font-bold text-purple-400 mb-2 group-hover:text-purple-300 transition-colors duration-300">98%</div>
              <div className="text-sm text-gray-300 font-medium">Engagement</div>
              <div className="w-full bg-purple-900/20 rounded-full h-2 mt-3">
                <div className="bg-gradient-to-r from-purple-400 to-purple-500 h-2 rounded-full w-[98%] animate-pulse"></div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-yellow-600/30 to-yellow-700/30 rounded-2xl p-6 border border-yellow-500/40 hover:border-yellow-400 transition-all duration-300 hover:scale-105 group">
              <div className="text-3xl font-bold text-yellow-400 mb-2 group-hover:text-yellow-300 transition-colors duration-300">91%</div>
              <div className="text-sm text-gray-300 font-medium">Skill Growth</div>
              <div className="w-full bg-yellow-900/20 rounded-full h-2 mt-3">
                <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-2 rounded-full w-[91%] animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="h-80 bg-gray-800/30 rounded-2xl border border-gray-700/50 p-4 hover:border-red-500/30 transition-all duration-300">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={advancedProgressData}>
                <defs>
                  <linearGradient id="progressGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="focusGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
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
                <Area type="monotone" dataKey="progress" stroke="#EF4444" strokeWidth={3} fill="url(#progressGradient)" />
                <Area type="monotone" dataKey="focus" stroke="#3B82F6" strokeWidth={2} fill="url(#focusGradient)" />
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
                <p className="text-gray-400 text-lg">Technology proficiency levels</p>
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
              <div key={skill.skill} className="group hover:scale-[1.02] transition-transform duration-300">
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
            {upcomingSessionsMock.slice(0, 3).map((session, index) => (
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
                    <div className="text-sm text-red-400 mb-1 font-medium">{session.topic}</div>
                    <div className="text-xs text-gray-400">{session.sessionType}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-white">{session.time}</div>
                    <div className="text-xs text-gray-400">{session.duration}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-gray-400" />
                    <span className="text-sm text-gray-300">{session.date}</span>
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
            {recentActivitiesMock.map((activity, index) => {
              const IconComponent = activity.icon;
              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-800/40 transition-all duration-300 hover:scale-[1.02] group/item cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`p-3 rounded-lg bg-gray-800/60 ${activity.color} border border-gray-700/50 group-hover/item:border-red-500/40 transition-all duration-300`}>
                    <IconComponent size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-white mb-1 group-hover/item:text-red-200 transition-colors duration-300">
                      {activity.title}
                    </div>
                    <div className="text-xs text-gray-400">{activity.time}</div>
                  </div>
                  <ChevronRight className="text-gray-600 group-hover/item:text-red-400 transition-colors duration-300" size={16} />
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
                  onClick={() => setSelectedGoal && setSelectedGoal(goal)}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <StatusIcon
                      className={`${
                        goal.status === "Completed"
                          ? "text-green-400"
                          : goal.status === "In Progress"
                          ? "text-blue-400"
                          : "text-gray-500"
                      } group-hover/goal:scale-110 transition-transform duration-300`}
                      size={18}
                    />
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${getPriorityColor(goal.priority)} hover:scale-105 transition-transform duration-200`}>
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
                    <span>{goal.completedHours}h / {goal.estimatedHours}h</span>
                  </div>
                </div>
              );
            })}
          </div>

          <button className="w-full mt-6 bg-gray-800/60 hover:bg-gray-800/90 text-gray-300 hover:text-white py-4 rounded-xl border border-gray-700/60 hover:border-red-500/40 transition-all duration-300 flex items-center justify-center gap-2 font-semibold hover:scale-[1.02] group/btn">
            <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
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
                  className={`relative text-center p-4 rounded-xl transition-all duration-300 hover:scale-110 border cursor-pointer group/badge ${
                    badge.earned
                      ? `bg-gradient-to-br ${getBadgeRarityColor(badge.rarity)} shadow-lg hover:shadow-xl`
                      : "bg-gray-800/40 border-gray-700/60 text-gray-500 hover:bg-gray-800/60"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <IconComponent size={24} className="mx-auto mb-2 group-hover/badge:animate-bounce" />
                  <div className="text-xs font-bold">{badge.name}</div>
                  {badge.earned && (
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-900 animate-pulse"></div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="bg-gradient-to-r from-red-600/30 to-red-700/30 rounded-2xl p-6 border border-red-500/40 hover:border-red-400 transition-all duration-300 hover:scale-105 group/streak">
            <div className="text-center">
              <div className="mb-4">
                <Flame size={52} className="mx-auto text-red-400 group-hover/streak:text-red-300 transition-colors duration-300 animate-pulse" />
              </div>
              <div className="text-5xl font-bold text-white mb-2 group-hover/streak:text-red-100 transition-colors duration-300">
                {menteeData.currentStreak}
              </div>
              <div className="text-red-300 font-semibold text-lg mb-2">Day Learning Streak</div>
              <div className="text-xs text-gray-400 bg-gray-800/50 px-3 py-1 rounded-lg inline-block">
                Keep it up! 2 days to beat your record
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
