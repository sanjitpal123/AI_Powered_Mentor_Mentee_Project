import React, { useState } from "react";
import { Brain, Search, Bell, Settings, MapPin, Globe, Calendar } from "lucide-react";

export const MenteeHeaderProfile = ({ 
  menteeData, 
  searchQuery, 
  setSearchQuery, 
  notifications, 
  currentTime 
}) => {
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);

  // Placeholder functions
  const AiProfileAnalize = () => {
    // navigate("/profile-analize");
    console.log("AI Profile Analyze via route placeholder");
  };

  return (
    <>
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
                      Joined {new Date(menteeData.joinDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center p-6 bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-700/60 hover:border-red-500/60 transition-all duration-300 group hover:scale-105 hover:bg-gray-800/80">
                    <div className="text-4xl font-bold text-red-400 mb-2 group-hover:text-red-300 transition-colors duration-300">
                      {menteeData.sessionsCompleted}
                    </div>
                    <div className="text-sm text-gray-300 font-medium">Sessions</div>
                    <div className="text-xs text-gray-500 mt-1">{menteeData.totalHours}h total</div>
                  </div>
                  <div className="text-center p-6 bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-700/60 hover:border-red-500/60 transition-all duration-300 group hover:scale-105 hover:bg-gray-800/80">
                    <div className="text-4xl font-bold text-red-400 mb-2 group-hover:text-red-300 transition-colors duration-300">
                      {menteeData.goalsAchieved}
                    </div>
                    <div className="text-sm text-gray-300 font-medium">Goals</div>
                    <div className="text-xs text-gray-500 mt-1">5 in progress</div>
                  </div>
                  <div className="text-center p-6 bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-700/60 hover:border-red-500/60 transition-all duration-300 group hover:scale-105 hover:bg-gray-800/80">
                    <div className="text-4xl font-bold text-red-400 mb-2 group-hover:text-red-300 transition-colors duration-300">
                      {menteeData.currentStreak}
                    </div>
                    <div className="text-sm text-gray-300 font-medium">Day Streak</div>
                    <div className="text-xs text-gray-500 mt-1">Personal best!</div>
                  </div>
                  <div className="text-center p-6 bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-700/60 hover:border-red-500/60 transition-all duration-300 group hover:scale-105 hover:bg-gray-800/80">
                    <div className="text-4xl font-bold text-red-400 mb-2 group-hover:text-red-300 transition-colors duration-300">
                      {menteeData.skillScore}
                    </div>
                    <div className="text-sm text-gray-300 font-medium">Skill Score</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {menteeData.nextMilestone - menteeData.skillScore} to next level
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <button
                  onClick={AiProfileAnalize}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-2xl hover:shadow-red-500/30 hover:scale-105 hover:-translate-y-1 group"
                >
                  <Brain className="inline mr-2 group-hover:animate-pulse" size={20} />
                  AI Insights
                </button>
                <div
                  className="bg-gray-800/80 hover:bg-gray-700 text-center text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 border border-gray-700/60 hover:border-red-500 hover:scale-105 hover:-translate-y-1 group cursor-pointer"
                >
                  <Calendar className="inline mr-2 group-hover:text-red-400 transition-colors duration-200" size={20} />
                  Schedule
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
