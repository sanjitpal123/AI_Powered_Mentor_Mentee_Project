import {
  Trophy,
  Medal,
  Target,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Award,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { GetAllScoresOfMenteesOfATask } from "../services/Performance";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../ContextApiStore/ContextStore";

function TaskWinningPage() {
  // Mock data based on your structure
  const { id } = useParams();
  const { User } = useContext(GlobalContext);
  const wholeObj = JSON.parse(localStorage.getItem("user"));
  const [scores, setScores] = useState([]);

  async function GetAllScore() {
    try {
      const response = await GetAllScoresOfMenteesOfATask(wholeObj.token, id);
      setScores(response); // backend already sorted
    } catch (error) {
      console.log("error to get scores", error);
    }
  }

  useEffect(() => {
    GetAllScore();
    // eslint-disable-next-line
  }, [id]);
  const getRankBadge = (rank) => {
    switch (rank) {
      case 1:
        return (
          <div className="absolute -top-4 -right-4 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full w-16 h-16 flex items-center justify-center shadow-2xl border-4 border-yellow-300 animate-pulse">
            <Trophy className="w-8 h-8 text-white" />
          </div>
        );
      case 2:
        return (
          <div className="absolute -top-4 -right-4 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full w-14 h-14 flex items-center justify-center shadow-xl border-4 border-gray-200">
            <Medal className="w-7 h-7 text-white" />
          </div>
        );
      case 3:
        return (
          <div className="absolute -top-4 -right-4 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full w-14 h-14 flex items-center justify-center shadow-xl border-4 border-orange-300">
            <Award className="w-7 h-7 text-white" />
          </div>
        );
      default:
        return null;
    }
  };

  const getAccuracyColor = (score) => {
    if (score >= 80) return "text-emerald-400";
    if (score >= 50) return "text-yellow-400";
    return "text-rose-400";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="max-w-5xl mx-auto mb-12 text-center">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-lg">
            <Trophy className="w-10 h-10 text-white" />
          </div>
        </div>
        <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 text-transparent bg-clip-text">
          Task Leaderboard
        </h1>
        <p className="text-slate-400 text-lg">
          Top performers ranked by accuracy and speed
        </p>
      </div>

      {/* Podium Section (Top 3) */}
      <div className="max-w-5xl mx-auto mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {scores.slice(0, 3).map((item, index) => {
            const rank = index + 1;
            const accuracy = parseFloat(item.score);

            return (
              <div
                key={item._id}
                className={`relative ${
                  rank === 1
                    ? "md:order-2 md:scale-110"
                    : rank === 2
                    ? "md:order-1"
                    : "md:order-3"
                }`}
              >
                <div
                  className={`relative overflow-hidden rounded-3xl p-6 shadow-2xl border-2 backdrop-blur-sm ${
                    rank === 1
                      ? "bg-gradient-to-br from-red-700/30 via-red-900/30 to-black border-red-500"
                      : rank === 2
                      ? "bg-gradient-to-br from-black/70 to-red-800/40 border-red-400"
                      : "bg-gradient-to-br from-red-600/20 to-black border-red-400"
                  }`}
                >
                  {getRankBadge(rank)}

                  {/* Rank Number */}
                  <div className="text-center mb-4">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-full font-bold text-2xl mb-3 ${
                        rank === 1
                          ? "bg-red-600 text-white border-2 border-red-400"
                          : rank === 2
                          ? "bg-black text-red-400 border-2 border-red-500"
                          : "bg-red-500 text-black border-2 border-red-600"
                      }`}
                    >
                      {rank}
                    </div>
                  </div>

                  {/* Avatar */}
                  <div className="flex justify-center mb-4">
                    <div
                      className={`w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-3xl shadow-xl ${
                        rank === 1
                          ? "bg-gradient-to-br from-red-500 to-black"
                          : rank === 2
                          ? "bg-gradient-to-br from-black to-red-700"
                          : "bg-gradient-to-br from-red-700 to-black"
                      }`}
                    >
                      {item.mentee?.name?.charAt(0).toUpperCase() || "?"}
                    </div>
                  </div>

                  {/* Name & Email */}
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold mb-1 text-red-400">
                      {item.mentee?.name}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {item.mentee?.email}
                    </p>
                  </div>

                  {/* Score */}
                  <div className="text-center mb-4">
                    <div
                      className={`text-4xl font-extrabold text-red-500 mb-1`}
                    >
                      {item.score}%
                    </div>
                    <p className="text-xs text-gray-400">Accuracy</p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="bg-black/50 border border-red-600 rounded-xl p-3">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                        <span className="text-lg font-bold text-green-400">
                          {item.correctanswer}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400">Correct</p>
                    </div>
                    <div className="bg-black/50 border border-red-600 rounded-xl p-3">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <XCircle className="w-4 h-4 text-red-400" />
                        <span className="text-lg font-bold text-red-400">
                          {item.wronganswer}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400">Wrong</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Leaderboard */}
      <div className="max-w-5xl mx-auto">
        <div className="bg-slate-800/30 backdrop-blur-sm rounded-3xl p-6 border border-slate-700 shadow-2xl">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-orange-400" />
            All Participants
          </h2>

          <div className="space-y-4">
            {scores.slice(3).map((item, index) => {
              const rank = index + 4;
              const accuracy = parseFloat(item.score);

              return (
                <div
                  key={item._id}
                  className={`relative overflow-hidden rounded-2xl p-5 border transition-all hover:scale-[1.02] hover:shadow-xl ${
                    rank === 1
                      ? "bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/30"
                      : rank === 2
                      ? "bg-gradient-to-r from-gray-500/10 to-gray-600/10 border-gray-500/30"
                      : rank === 3
                      ? "bg-gradient-to-r from-orange-500/10 to-rose-500/10 border-orange-500/30"
                      : "bg-slate-800/40 border-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-6">
                    {/* Rank */}
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl ${
                        rank === 1
                          ? "bg-yellow-400 text-yellow-900"
                          : rank === 2
                          ? "bg-gray-300 text-gray-900"
                          : rank === 3
                          ? "bg-orange-400 text-orange-900"
                          : "bg-slate-700 text-slate-300"
                      }`}
                    >
                      {rank}
                    </div>

                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                        {item.mentee?.name?.charAt(0).toUpperCase() || "?"}
                      </div>
                    </div>

                    {/* User Info */}
                    <div className="flex-grow">
                      <h3 className="text-lg font-bold mb-1">
                        {item.mentee?.name}
                      </h3>
                      <p className="text-sm text-slate-400">
                        {item.mentee?.email}
                      </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="hidden md:flex items-center gap-4">
                      {/* Total Questions */}
                      <div className="text-center bg-slate-700/50 rounded-xl px-4 py-2">
                        <div className="flex items-center gap-1 mb-1">
                          <Target className="w-4 h-4 text-blue-400" />
                          <span className="font-bold text-blue-400">
                            {item.totalquestion}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">Total</p>
                      </div>

                      {/* Correct */}
                      <div className="text-center bg-emerald-500/10 rounded-xl px-4 py-2">
                        <div className="flex items-center gap-1 mb-1">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span className="font-bold text-emerald-400">
                            {item.correctanswer}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">Correct</p>
                      </div>

                      {/* Wrong */}
                      <div className="text-center bg-rose-500/10 rounded-xl px-4 py-2">
                        <div className="flex items-center gap-1 mb-1">
                          <XCircle className="w-4 h-4 text-rose-400" />
                          <span className="font-bold text-rose-400">
                            {item.wronganswer}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">Wrong</p>
                      </div>
                    </div>

                    {/* Score */}
                    <div className="flex-shrink-0 text-right">
                      <div
                        className={`text-3xl font-extrabold ${getAccuracyColor(
                          accuracy
                        )}`}
                      >
                        {item.score}%
                      </div>
                      <p className="text-xs text-slate-400">Accuracy</p>
                    </div>
                  </div>

                  {/* Mobile Stats */}
                  <div className="md:hidden mt-4 grid grid-cols-3 gap-3">
                    <div className="text-center bg-slate-700/50 rounded-xl py-2">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Target className="w-4 h-4 text-blue-400" />
                        <span className="font-bold text-blue-400">
                          {item.totalquestion}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">Total</p>
                    </div>
                    <div className="text-center bg-emerald-500/10 rounded-xl py-2">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span className="font-bold text-emerald-400">
                          {item.correctanswer}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">Correct</p>
                    </div>
                    <div className="text-center bg-rose-500/10 rounded-xl py-2">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <XCircle className="w-4 h-4 text-rose-400" />
                        <span className="font-bold text-rose-400">
                          {item.wronganswer}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">Wrong</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {scores.length === 0 && (
            <div className="text-center py-12">
              <Trophy className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 text-lg">No scores available yet</p>
              <p className="text-slate-500 text-sm mt-2">
                Participants will appear here once they complete the task
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskWinningPage;
