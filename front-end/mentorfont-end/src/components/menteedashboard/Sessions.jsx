import React, { useState, useEffect, useContext } from "react";
import { Calendar, Clock, Video, FileText, MessageCircle, Users, Edit3 } from "lucide-react";
import { GlobalContext } from "../../ContextApiStore/ContextStore";
import { GetAllSessionSer } from "../../services/Session";
import { CreateConvo } from "../../services/Convo";
import { useNavigate } from "react-router-dom";

export const Sessions = () => {
  const [upcomingSessions, setupcomingSessions] = useState([]);
  const { User } = useContext(GlobalContext);
  const Navigator = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  async function GetAllSessions() {
    try {
      if (!user?.token) return;
      const res = await GetAllSessionSer(user.token);
      setupcomingSessions(res.response);
      console.log("response to get upcoming sessions", res);
    } catch (error) {
      console.log("error to get sessions", error);
    }
  }

  async function handleNavigateToChat(mentorId) {
    try {
      const res = await CreateConvo(mentorId, user.token);
      console.log("responsive while creating convo in navigatetochat");
      // Transaction(e, res); // defined upstream?
    } catch (error) {
      console.log("error in responsive while creating", error);
      if (error.response?.data?.existed?._id) {
        Navigator(`/chat/${error.response.data.existed._id}`);
      }
    }
  }

  function RescheduleSession(session) {
    Navigator(`/createsession`, { state: session });
  }

  useEffect(() => {
    GetAllSessions();
  }, []);

  return (
    <div className="space-y-8">
      {/* Sessions Header */}
      <div className="bg-gray-900/90 backdrop-blur-xl rounded-3xl p-8 border border-gray-800/60 shadow-2xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Mentoring Sessions
            </h2>
            <p className="text-gray-400 text-lg">
              Manage your upcoming and past sessions with expert mentors
            </p>
          </div>
          <div className="flex gap-4">
            <button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-2xl hover:shadow-red-500/30 hover:scale-105 hover:-translate-y-1">
              <Users className="inline mr-2" size={20} />
              Find Mentor
            </button>
            <button className="bg-gray-800/80 hover:bg-gray-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 border border-gray-700/60 hover:border-red-500 hover:scale-105 hover:-translate-y-1">
              <Edit3 className="inline mr-2" size={20} />
              Whiteboard
            </button>
          </div>
        </div>
      </div>

      {/* Detailed Sessions List */}
      <div className="space-y-6">
        {upcomingSessions?.map((session, index) => (
          <div
            key={session?._id}
            className="bg-gray-900/90 backdrop-blur-xl rounded-3xl p-8 border border-gray-800/60 hover:border-red-500/40 transition-all duration-500 shadow-2xl hover:shadow-blue-500/20 hover:scale-[1.01] hover:-translate-y-1 group"
            style={{ animationDelay: `${index * 200}ms` }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8">
                <div className="flex items-start gap-6">
                  <div className="relative">
                    <img
                      src={session?.mentorAvatar || "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150"}
                      alt={session.mentor?.name}
                      className="w-24 h-24 rounded-2xl object-cover border-2 border-gray-600 hover:border-red-500 transition-all duration-300 hover:scale-110 shadow-lg"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg animate-pulse">
                      Online
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold text-white group-hover:text-red-200 transition-colors duration-300">
                        {session.Title}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-lg text-xs font-bold border ${
                          session?.status === "Confirmed"
                            ? "bg-green-600/30 text-green-400 border-green-500/40"
                            : "bg-yellow-600/30 text-yellow-400 border-yellow-500/40"
                        }`}
                      >
                        {session?.status || "Pending"}
                      </span>
                    </div>
                    <p className="text-red-400 font-semibold mb-3 text-lg">
                      with {session.mentor?.name}
                    </p>
                    <p className="text-gray-400 text-sm mb-4 font-medium">
                      {session?.type || "Video Call"}
                    </p>

                    <div className="flex flex-wrap gap-6 text-sm text-gray-300 mb-4">
                      <span className="flex items-center gap-2 hover:text-white transition-colors duration-200">
                        <Calendar size={16} className="text-red-400" />
                        <span className="font-medium">
                          Due Date:{" "}
                          {new Date(session?.date).toLocaleString([], {
                            year: "2-digit",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </span>
                      </span>
                      <span className="flex items-center gap-2 hover:text-white transition-colors duration-200">
                        <Clock size={16} className="text-red-400" />
                        <span className="font-medium">
                          Created At:{" "}
                          {new Date(session.createdAt).toLocaleDateString([], {
                            day: "2-digit",
                            month: "2-digit",
                            year: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </span>
                      <span className="flex items-center gap-2 hover:text-white transition-colors duration-200">
                        <Video size={16} className="text-red-400" />
                        <span className="font-medium">{session?.type || "Video Call"}</span>
                      </span>
                    </div>

                    {session?.preparationMaterials && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-400 mb-3 font-medium">
                          Preparation Materials:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {session?.preparationMaterials.map(
                            (material, matIndex) => (
                              <span
                                key={matIndex}
                                className="px-3 py-2 bg-gray-800/60 text-gray-300 text-xs rounded-lg border border-gray-700/60 font-medium hover:bg-gray-700/60 hover:text-white transition-all duration-200 hover:scale-105"
                              >
                                <FileText className="inline mr-1" size={12} />
                                {material}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white py-4 rounded-xl font-semibold transition-all duration-300 shadow-2xl hover:shadow-red-500/30 flex items-center justify-center gap-2 hover:scale-105 hover:-translate-y-1">
                    <Video size={20} />
                    Join Session
                  </button>
                  <button
                    onClick={() => RescheduleSession(session)}
                    className="w-full bg-gray-800/60 hover:bg-gray-800/90 text-gray-300 hover:text-white py-4 rounded-xl border border-gray-700/60 hover:border-red-500/40 transition-all duration-300 flex items-center justify-center gap-2 font-semibold hover:scale-105 hover:-translate-y-1"
                  >
                    <Calendar size={20} />
                    Reschedule
                  </button>
                  <button
                    onClick={() => handleNavigateToChat(session.mentor._id)}
                    className="w-full bg-gray-800/60 hover:bg-gray-800/90 text-gray-300 hover:text-white py-4 rounded-xl border border-gray-700/60 hover:border-red-500/40 transition-all duration-300 flex items-center justify-center gap-2 font-semibold hover:scale-105 hover:-translate-y-1"
                  >
                    <MessageCircle size={20} />
                    Message Mentor
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
