import React from "react";
import { Target, CheckCircle, XCircle } from "lucide-react";

export const PerformanceMetricsCard = ({ performance }) => {
  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-red-500/20 hover:border-red-500/40 transition-all duration-300 mb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
          <Target className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-red-400">Performance Metrics</h2>
          <p className="text-gray-400 text-sm">Task completion analysis</p>
        </div>
      </div>

      {/* Score Display */}
      <div className="text-center mb-8">
        <div className="relative inline-block">
          <div className="w-32 h-32 rounded-full border-8 border-gray-700 flex items-center justify-center relative">
            <div className="text-center z-10">
              <div className="text-3xl font-bold text-red-400">
                {performance?.score}
              </div>
              <div className="text-sm text-gray-400">Score %</div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-black/50 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <div>
              <p className="text-2xl font-bold text-green-400">
                {performance.correctanswer}
              </p>
              <p className="text-sm text-gray-400">Correct Answers</p>
            </div>
          </div>
        </div>

        <div className="bg-black/50 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-3">
            <XCircle className="w-8 h-8 text-red-500" />
            <div>
              <p className="text-2xl font-bold text-red-400">
                {performance.wronganswer}
              </p>
              <p className="text-sm text-gray-400">Wrong Answers</p>
            </div>
          </div>
        </div>

        <div className="bg-black/50 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-3">
            <Target className="w-8 h-8 text-blue-500" />
            <div>
              <p className="text-2xl font-bold text-blue-400">
                {performance.totalquestion}
              </p>
              <p className="text-sm text-gray-400">Total Questions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Task Information */}
      <div className="bg-black/30 rounded-lg p-4 border border-gray-700">
        <h3 className="font-semibold text-gray-300 mb-2">Task Information</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Task ID:</span>
            <span className="text-gray-300 font-mono">{performance.task}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Completed At:</span>
            <span className="text-gray-300">
              {new Date(performance.createdAt).toLocaleDateString([], {
                hour: "2-digit",
                minute: "2-digit",
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
              })}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Last Updated:</span>
            <span className="text-gray-300">
              {new Date(performance.updatedAt).toLocaleDateString([], {
                hour: "2-digit",
                minute: "2-digit",
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
