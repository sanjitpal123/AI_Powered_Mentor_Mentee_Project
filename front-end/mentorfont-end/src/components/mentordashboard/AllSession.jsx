import { Plus, Search, Filter, Edit3, MoreVertical, Calendar, Clock, Activity, Star, Download } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../ContextApiStore/ContextStore";
import { useSearchParams } from "react-router-dom";
import {
  GetAllSessionSer,
  searchSession,
  SearchSessionByCategorySer,
  UpdateStatus,
} from "../../services/Session";
import { socket } from "../../utils/socket";
import NotFound from "../NotFoundCompo";

export const AllSession = () => {
  const [sessions, setSession] = useState([]);
  const [query, setQuery] = useState("");
  const [debouncingQuery, setdebouncingQuery] = useState("");
  const { User } = useContext(GlobalContext);
  const wholeobject = JSON.parse(localStorage.getItem("user"));
  const [filterText, setFilterText] = useState("All");
  const [searchParams, setSearchParams] = useSearchParams();
  const [showCreateSession, setShowCreateSession] = useState(false); // Make sure it doesn't break

  const GetAllSession = async () => {
    try {
      const res = await GetAllSessionSer(wholeobject.token);
      setSession(res.response);
      console.log("responsive to get all session", res);
    } catch (error) {
      console.log("error to get session", error);
    }
  };

  useEffect(() => {
    const handle = setTimeout(() => {
      setdebouncingQuery(query);
    }, 1000);
    return () => {
      clearTimeout(handle);
    };
  }, [query]);

  async function searchSessions() {
    try {
      const res = await searchSession(wholeobject.token, debouncingQuery);
      console.log("response to get all search session", res);
      if (Array.isArray(res.session) && res.session.length > 0) {
        setSession(res.session);
      } else {
        setSession([]);
      }
    } catch (error) {
      console.log("error to get session", error);
    }
  }

  useEffect(() => {
    searchSessions();
    const params = {};
    if (debouncingQuery) {
      params.q = debouncingQuery;
    }
    setSearchParams(params);
  }, [debouncingQuery]);

  const handleCancel = async (session) => {
    try {
      const data = {
        status: "calcalled", // Note: The old component had this typo
        id: session._id,
        mentor: wholeobject._id,
      };
      const res = await UpdateStatus(data, wholeobject.token);
      socket.emit("NotifySessionStatusUpdate", {
        receiverId: session.mentee,
      });
      console.log("status to cancel", res);
      GetAllSession();
    } catch (error) {
      console.log("response to cancel status", error);
    }
  };

  // handle filter button
  function handleFilterClick(text) {
    if (text == "All") {
      setFilterText("All");
      GetAllSession();
    } else {
      setFilterText(text);
    }
  }

  async function handleFilterByCategory() {
    try {
      const result = await SearchSessionByCategorySer(wholeobject.token, {
        category: filterText.toLowerCase(),
      });
      if (result.result.length > 0) {
        setSession(result.result);
      } else {
        setSession([]);
      }
      console.log("result to get handle filter category  ", result);
    } catch (error) {
      console.log("error to filter by category ", error);
    }
  }

  async function handleAccept(session) {
    try {
      const data = {
        status: "confirm",
        id: session._id,
        mentor: wholeobject._id,
      };
      const res = await UpdateStatus(data, wholeobject.token);
      console.log("status to update", res);
      socket.emit("NotifySessionStatusUpdate", {
        receiverId: session.mentee,
      });
      GetAllSession();
    } catch (error) {
      console.log("error to get update status of session", error);
    }
  }

  useEffect(() => {
    handleFilterByCategory();
    const params = {};
    if (filterText) {
      params.category = filterText;
    }
    setSearchParams(params);
  }, [filterText]);

  useEffect(() => {
    GetAllSession();
    console.log("sesion", sessions);
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent">
            Session Management
          </h1>
          <p className="text-gray-400 mt-2">
            Manage your mentoring sessions and track progress
          </p>
        </div>
        <button
          onClick={() => setShowCreateSession(true)}
          className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/30"
        >
          <Plus size={20} />
          Create Session
        </button>
      </div>

      {/* Session Filters */}
      <div className="bg-gradient-to-br from-gray-900/80 to-black/60 p-6 rounded-2xl border border-red-500/20">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-2">
            {["All", "Live", "Upcoming", "Completed", "Confirm", "Pending"].map(
              (filter) => (
                <button
                  key={filter}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-600/20 to-red-700/20 text-red-200 hover:from-red-600/30 hover:to-red-700/30 transition-all duration-300 border border-red-500/30"
                  onClick={() => handleFilterClick(filter)}
                >
                  {filter}
                </button>
              )
            )}
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search sessions..."
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50 transition-colors"
              />
            </div>
            <button className="p-2 bg-gray-800/50 border border-gray-600/50 rounded-lg text-gray-400 hover:text-white hover:border-red-500/50 transition-colors">
              <Filter size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Sessions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sessions && sessions.length > 0 ? (
          sessions?.map((session) => (
            <div
              key={session?.id || session?._id}
              className="group relative overflow-hidden bg-gradient-to-br from-gray-900/90 to-black/70 p-6 rounded-2xl border border-red-500/30 hover:border-red-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      session?.status === "live"
                        ? "bg-red-600/20 text-red-300 border border-red-500/30"
                        : session?.status === "pending"
                        ? "bg-yellow-600/20 text-yellow-300 border border-yellow-500/30"
                        : "bg-green-600/20 text-green-300 border border-green-500/30"
                    }`}
                  >
                    {session?.status === "live" && (
                      <div className="w-2 h-2 bg-red-400 rounded-full inline-block mr-2 animate-pulse"></div>
                    )}
                    {session?.status?.toUpperCase()}
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-400 hover:text-white hover:bg-red-600/20 rounded-lg transition-all duration-300">
                      <Edit3 size={16} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-600/20 rounded-lg transition-all duration-300">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                  {session.topic || session.title}
                </h3>
                <p className="text-red-200 font-medium mb-4">
                  {session?.mentee?.name}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-gray-400" />
                    <span className="text-gray-300 text-sm">
                      {session?.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-gray-400" />
                    <span className="text-gray-300 text-sm">
                      {session?.date ? new Date(session?.date).toLocaleTimeString() : ""}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity size={16} className="text-gray-400" />
                    <span className="text-gray-300 text-sm">
                      {session?.duration}
                    </span>
                  </div>
                  {session?.rating && (
                    <div className="flex items-center gap-2">
                      <Star size={16} className="text-yellow-400" />
                      <span className="text-yellow-400 text-sm font-medium">
                        {session?.rating}/5
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  {session.status === "pending" ? (
                    <>
                      <button
                        className="flex-1 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 py-3 rounded-xl font-medium transition-all duration-300 text-white"
                        onClick={() => handleAccept(session)}
                      >
                        Accept
                      </button>
                      <button
                        className="px-4 py-3 bg-red-600/20 hover:bg-red-600/30 rounded-xl text-red-300 transition-all duration-300"
                        onClick={() => handleCancel(session)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="flex-1 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 py-3 rounded-xl font-medium transition-all duration-300 text-white">
                        View Summary
                      </button>
                      <button className="px-4 py-3 bg-green-600/20 hover:bg-green-600/30 rounded-xl text-green-300 transition-all duration-300">
                        <Download size={18} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full">
            <NotFound
              heading="Could Not Find Session"
              text="The session you are searching for is not available. Please search for a valid session."
              type="session"
              fullPage={false} // 👈 makes it fit inside grid
            />
          </div>
        )}
      </div>
    </div>
  );
};
