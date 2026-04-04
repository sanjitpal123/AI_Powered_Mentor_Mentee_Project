import { MoreVertical, Video, Clock } from "lucide-react";
import { useContext } from "react";
import { GlobalContext } from "../../ContextApiStore/ContextStore";

export const LiveSession = () => {
  const { User, sessions } = useContext(GlobalContext);

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Upcoming Sessions</h2>
        <button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/30">
          View All Sessions
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sessions?.slice(0, 3)?.map((session, i) => (
          <div
            key={i}
            className="group relative overflow-hidden bg-gradient-to-br from-gray-900/90 to-black/70 p-6 rounded-2xl border border-red-500/30 hover:border-red-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    session?.status === "live"
                      ? "bg-red-600/20 text-red-300 border border-red-500/30"
                      : "bg-yellow-600/20 text-yellow-300 border border-yellow-500/30"
                  }`}
                >
                  {session?.status === "live" && (
                    <div className="w-2 h-2 bg-red-400 rounded-full inline-block mr-2 animate-pulse"></div>
                  )}
                  {session?.status?.toUpperCase()}
                </div>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <MoreVertical size={16} />
                </button>
              </div>
              <h3 className="font-bold text-white text-lg mb-2">
                {session?.title}
              </h3>
              <div className="flex items-center gap-3 mb-4">
                {session?.mentee?.profile ? (
                  <img
                    src={session?.avatar}
                    alt={session?.mentee?.profile}
                    className="w-8 h-8 rounded-full border-2 border-red-500/30"
                  />
                ) : (
                  <div
                    className="w-10 h-10 flex justify-center items-center 
                bg-gradient-to-br from-red-500 to-pink-600 
                text-white text-xl font-bold 
                rounded-full border-2 border-white/30 
                shadow-lg hover:scale-110 transition-transform duration-300 
                cursor-pointer"
                  >
                    {session?.mentee?.name?.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="text-red-200 font-medium text-sm">
                    {session?.mentee?.name}
                  </p>
                  <p className="text-gray-400 text-xs">{session?.time}</p>
                </div>
              </div>
              <button
                className={`w-full py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                  session?.status === "live"
                    ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white hover:shadow-lg hover:shadow-red-500/30"
                    : "bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white"
                }`}
              >
                {session?.status === "live" ? (
                  <div className="flex items-center justify-center gap-2">
                    <Video size={18} />
                    Join Session
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Clock size={18} />
                    View Details
                  </div>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
