import React from "react";
import { Brain, TrendingUp, ChevronRight, Clock } from "lucide-react";

export const MenteeLearningTab = ({ learningPaths }) => {
  const handlePersonalizedLearning = () => console.log("Personalized Learning Path feature");
  const handleCareerPathAnalysis = () => console.log("Career Path Analysis feature");

  return (
    <div className="space-y-8">
      {/* Learning Paths Header */}
      <div className="bg-gray-900/90 backdrop-blur-xl rounded-3xl p-8 border border-gray-800/60 shadow-2xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent">
              Personalized Learning Paths
            </h2>
            <p className="text-gray-400 text-lg">
              AI-curated curriculum tailored to your goals and learning style
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
                  className={`px-3 py-2 rounded-lg text-xs font-bold border hover:scale-105 transition-transform duration-200 ${
                    path.difficulty === "Expert"
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
                {path.completedModules} of {path.totalModules} modules completed
              </p>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-300 font-medium">Progress</span>
                  <span className="text-red-400 font-bold">{path.progress}%</span>
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
                Est. completion: <span className="font-medium">{path.estimatedCompletion}</span>
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-red-600/30 to-red-700/30 hover:from-red-600/50 hover:to-red-700/50 text-red-400 hover:text-red-300 py-4 rounded-xl border border-red-500/40 hover:border-red-500/60 transition-all duration-300 font-semibold hover:scale-[1.02] group/btn">
              Continue Learning
              <ChevronRight className="inline ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
