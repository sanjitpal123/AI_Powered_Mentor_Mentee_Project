import { Trophy, Target, CheckCircle2, XCircle, TrendingUp } from "lucide-react";

export const ParticipantsList = ({ scores }) => {
  const getAccuracyColor = (score) => {
    if (score >= 80) return "text-emerald-400";
    if (score >= 50) return "text-yellow-400";
    return "text-rose-400";
  };

  return (
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
  );
};
