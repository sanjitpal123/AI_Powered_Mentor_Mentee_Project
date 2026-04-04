import { Trophy, Medal, Award, CheckCircle2, XCircle } from "lucide-react";

export const TopThreePodium = ({ scores }) => {
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

  return (
    <div className="max-w-5xl mx-auto mb-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {scores.slice(0, 3).map((item, index) => {
          const rank = index + 1;

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
                  <p className="text-sm text-gray-400">{item.mentee?.email}</p>
                </div>

                {/* Score */}
                <div className="text-center mb-4">
                  <div className={`text-4xl font-extrabold text-red-500 mb-1`}>
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
  );
};
