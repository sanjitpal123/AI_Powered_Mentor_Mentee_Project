import { Plus, MoreVertical, Star, Eye } from "lucide-react";

export const MenteesTab = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent">
            My Mentees
          </h1>
          <p className="text-gray-400 mt-2">
            Track progress and manage relationships
          </p>
        </div>
        <button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/30">
          <Plus size={20} />
          Add Mentee
        </button>
      </div>

      {/* Mentees Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            name: "Sarah Johnson",
            role: "Frontend Developer",
            progress: 85,
            sessions: 12,
            rating: 4.9,
            avatar:
              "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150",
            status: "active",
          },
          {
            name: "Mike Chen",
            role: "Full Stack Developer",
            progress: 72,
            sessions: 8,
            rating: 4.7,
            avatar:
              "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150",
            status: "active",
          },
          {
            name: "Emily Davis",
            role: "UI/UX Designer",
            progress: 90,
            sessions: 15,
            rating: 5.0,
            avatar:
              "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150",
            status: "completed",
          },
          {
            name: "Alex Kim",
            role: "Backend Developer",
            progress: 45,
            sessions: 5,
            rating: 4.8,
            avatar:
              "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150",
            status: "active",
          },
        ].map((mentee, i) => (
          <div
            key={i}
            className="group relative overflow-hidden bg-[#0a0a0a] p-6 rounded-2xl border border-white/5 hover:border-red-500/30 transition-all duration-500 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-red-500/10"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    mentee.status === "active"
                      ? "bg-green-600/20 text-green-300 border border-green-500/30"
                      : "bg-blue-600/20 text-blue-300 border border-blue-500/30"
                  }`}
                >
                  {mentee.status.toUpperCase()}
                </div>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <MoreVertical size={16} />
                </button>
              </div>

              <div className="text-center mb-6">
                <img
                  src={mentee.avatar}
                  alt={mentee?.name}
                  className="w-20 h-20 mx-auto rounded-full border-3 border-red-500/30 mb-4"
                />
                <h3 className="text-xl font-bold text-white mb-1">
                  {mentee?.name}
                </h3>
                <p className="text-red-200 text-sm">{mentee.role}</p>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400 text-sm">Progress</span>
                    <span className="text-white font-medium">
                      {mentee.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-red-600 to-red-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${mentee.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">
                      {mentee.sessions}
                    </p>
                    <p className="text-gray-400 text-xs">Sessions</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Star size={16} className="text-yellow-400" />
                      <p className="text-xl font-bold text-white">
                        {mentee.rating}
                      </p>
                    </div>
                    <p className="text-gray-400 text-xs">Rating</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105">
                  Message
                </button>
                <button className="px-4 py-3 bg-gray-700/50 hover:bg-gray-600/50 rounded-xl text-gray-300 hover:text-white transition-all duration-300">
                  <Eye size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
