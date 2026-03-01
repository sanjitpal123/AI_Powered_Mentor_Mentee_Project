// src/pages/ScheduleSession.jsx
import { use, useContext, useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import GetAllMentosService, {
  GetAllMentorser,
} from "../services/GetAllmentors";
import CreateSessionSer, { RescheduleSessionSer } from "../services/Session";
import { GlobalContext } from "../ContextApiStore/ContextStore";
import { useLocation, useNavigate } from "react-router-dom";
import { socket } from "../utils/socket";
import { CreateNotificationSer } from "../services/Notification";

export default function ScheduleSession() {
  const { User } = useContext(GlobalContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const Navigate = useNavigate();
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [Mentors, setMentors] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const location = useLocation();
  const session = location.state;
  const [FormData, setFormData] = useState({
    mentor: null,
    date: session?.date || "",
    notes: session?.notes || "",
    topic: session?.topic || "",
  });

  // create notification
  async function CreateNotification(sessionid) {
    console.log("session id is coming", sessionid);
    try {
      const data = {
        receiver: FormData.mentor,
        title: `A New Session Is Created by ${user.name}`,
        message: `A new session has been created by ${user.name} if you are available and if you think that you can be available so accepts otherwise cancel it `,
        sender: user._id,
        sessionId: sessionid,
        isRead: false,
        type: "session",
      };
      const res = await CreateNotificationSer(data, user.token);
      console.log("response to create notification", res);
    } catch (error) {
      console.log("error to create notification", error);
    }
  }
  async function GetAllMentor() {
    try {
      const res = await GetAllMentorser();
      console.log("getting all mentors in schedule page", res);
      setMentors(res);
    } catch (error) {
      console.log("error to get all mentors in schedule page", error);
    }
  }
  async function handleReschedule() {
    try {
      const res = await RescheduleSessionSer(user.token, FormData, session._id);
      console.log("response to reschedule", res);
      Navigate("/mentee/dashboard");
    } catch (error) {
      console.log("error to reschedule", error);
    }
  }

  async function handleCreateSchedule() {
    try {
      const res = await CreateSessionSer(FormData, user.token);
      console.log("response to create session", res);
      socket.emit("NotifySessionCreation", { receiverId: FormData.mentor });
      CreateNotification(res.session._id);
      Navigate("/mentee/dashboard");
    } catch (error) {
      console.log("error to create session", error);
    }
  }

  useEffect(() => {
    setFormData((prev) => ({ ...prev, mentor: selectedMentor?._id }));
  }, [selectedMentor]);

  useEffect(() => {
    GetAllMentor();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left column: Form */}
        <div className="bg-gradient-to-br from-[#13080a] to-[#2b0e11] border border-red-900/30 rounded-2xl p-6 shadow-xl">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Calendar size={22} className="text-red-500" />
            {`${session ? "Reschedule Session" : "Schedule a Session"}`}
          </h2>

          <div className="space-y-4">
            {/* Date & Time */}
            <div>
              <label className="block text-gray-300 text-sm mb-1">
                Date & Time
              </label>
              <input
                type="datetime-local"
                name="date"
                value={FormData.date}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                className="w-full bg-gray-900/60 border border-gray-700/60 px-3 py-2 rounded-md"
              />
            </div>

            {/* Topic */}
            <div>
              <label className="block text-gray-300 text-sm mb-1">Topic</label>
              <input
                type="text"
                name="topic"
                placeholder="What will be the topic"
                value={FormData.topic}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                className="w-full bg-gray-900/60 border border-gray-700/60 px-3 py-2 rounded-md"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-300 text-sm mb-1">
                Description
              </label>
              <textarea
                rows={4}
                name="notes"
                placeholder="Describe the session goals..."
                value={FormData.notes}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                className="w-full bg-gray-900/60 border border-gray-700/60 px-3 py-2 rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Right column: Mentor selection */}
        <div className="bg-gradient-to-br from-[#0f1416] to-[#231213] border border-red-900/20 rounded-2xl p-6 shadow-xl">
          <h3 className="text-lg font-bold mb-4">Choose a Mentor</h3>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-h-[65vh] overflow-y-auto pr-2">
            {Mentors?.map((m) => (
              <div
                key={m._id}
                onClick={() => setSelectedMentor(m)}
                className={`p-4 rounded-2xl border transition cursor-pointer shadow-sm ${
                  selectedMentor?._id === m._id
                    ? "border-red-500 bg-red-900/10"
                    : "border-gray-800 hover:border-red-600"
                }`}
              >
                {/* Avatar / initials */}
                <div className="flex items-center gap-3">
                  {m.profile ? (
                    <img
                      src={m.profile}
                      alt={m.name}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-gray-800 flex items-center justify-center text-red-400 font-bold text-lg">
                      {m.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  )}
                  <div>
                    <div className="font-semibold text-lg">{m.name}</div>
                    <div className="text-sm text-gray-400">{m.title}</div>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-3 text-gray-300 text-sm line-clamp-2">
                  {m.description || "No description available."}
                </p>

                {/* Skills */}
                {m.skills && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {m.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs rounded-full bg-red-500/10 text-red-400 border border-red-500/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-gray-800 pt-4">
            <h4 className="text-sm text-gray-300 mb-2">Selected Mentor</h4>
            {selectedMentor ? (
              <div className="flex items-center gap-3">
                {selectedMentor?.profile ? (
                  <img
                    src={selectedMentor.profile}
                    alt={selectedMentor.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-red-400 font-bold">
                    {selectedMentor?.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                )}
                <div>
                  <div className="font-semibold">{selectedMentor.name}</div>
                  <div className="text-xs text-gray-400">
                    {selectedMentor.title}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No mentor selected</p>
            )}
          </div>

          <div>
            {session ? (
              <button
                className="w-full mt-10 bg-red-600 hover:bg-red-700 py-3 rounded-lg font-semibold"
                onClick={handleReschedule}
              >
                Reschedule Session
              </button>
            ) : (
              <button
                className="w-full mt-10 bg-red-600 hover:bg-red-700 py-3 rounded-lg font-semibold"
                onClick={handleCreateSchedule}
              >
                Schedule Session
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
