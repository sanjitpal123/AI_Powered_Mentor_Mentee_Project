import { Users, Calendar, DollarSign, Star, TrendingUp } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../ContextApiStore/ContextStore";
import { GetMentorByidSer } from "../../services/MentorDashBoard/MentorDashBoardsApi";
import { GetAllSessionSer } from "../../services/Session";
import { socket } from "../../utils/socket";

export const States = () => {
  const { User, sessions, setsessions } = useContext(GlobalContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const [Mentees, setMentess] = useState(0);
  const [Sessions, setSessions] = useState([]);
  const [SessionsCount, setSessionsCount] = useState(0);

  // calling this api for getting mentee profile also
  async function GetMentorProfile() {
    try {
      const res = await GetMentorByidSer(user._id, user.token);
      console.log("resuser", res);
      setMentess(res.mentees.length);
    } catch (error) {
      console.log(error);
    }
  }

  async function GetAllSessions() {
    try {
      const res = await GetAllSessionSer(user.token);
      console.log("response to all all sessions", res);
      setSessions(res.response);
      setsessions(res.response);
    } catch (error) {
      console.log("errror to get all sessions", error);
    }
  }

  function SessionExtractOnlyForCurrentMonth() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const filtered = Sessions.filter((session) => {
      const sessionDate = new Date(session.date);
      return (
        sessionDate.getMonth() === currentMonth &&
        sessionDate.getFullYear() === currentYear
      );
    });
    console.log("filteted", filtered);

    setSessionsCount(filtered.length);
  }

  useEffect(() => {
    socket.emit("join", user._id);
  }, [user._id]);

  useEffect(() => {
    SessionExtractOnlyForCurrentMonth();
  }, [Sessions]);

  useEffect(() => {
    GetMentorProfile();
    GetAllSessions();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {[
        {
          icon: Users,
          label: "Active Mentees",
          value: `${Mentees}`,
          change: "+12%",
          color: "from-red-600 to-red-700",
        },
        {
          icon: Calendar,
          label: "Sessions This Month",
          value: `${SessionsCount}`,
          change: "+8%",
          color: "from-red-700 to-red-800",
        },
        {
          icon: DollarSign,
          label: "Earnings",
          value: "$2,840",
          change: "+15%",
          color: "from-red-800 to-red-900",
        },
        {
          icon: Star,
          label: "Average Rating",
          value: "4.9",
          change: "+0.2",
          color: "from-red-600 to-red-800",
        },
      ].map((stat, i) => (
        <div
          key={i}
          className="group relative overflow-hidden bg-gradient-to-br from-gray-900/80 to-black/60 p-6 rounded-2xl border border-red-500/20 hover:border-red-400/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10">
            <div
              className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
            >
              <stat.icon size={24} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
            <div className="flex items-center gap-1">
              <TrendingUp size={14} className="text-green-400" />
              <span className="text-green-400 text-sm font-medium">
                {stat.change}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
