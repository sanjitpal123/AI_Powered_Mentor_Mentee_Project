import React, { useState, useEffect, useContext } from "react";
import { Users, Eye } from "lucide-react";
import { GlobalContext } from "../../ContextApiStore/ContextStore";
import GetMenteeprofileser from "../../services/GetMenteeProfile";
import FormatTime from "../../utils/DateFormat";
import { Link } from "react-router-dom";

export const Feedback = () => {
  const [mentorFeedback, setMentorFeedback] = useState([]);
  const { User } = useContext(GlobalContext);

  const user = JSON.parse(localStorage.getItem("user"));

  async function GetProfile() {
    try {
      if (!user?._id) return;
      const res = await GetMenteeprofileser(user._id);
      console.log("response to get mentee profile ", res);
      setMentorFeedback(res.feedback || []); // safe fallback
    } catch (error) {
      console.log("error ", error);
    }
  }

  useEffect(() => {
    GetProfile();
  }, []);

  return (
    <div className="space-y-8">
      {/* Community Header */}
      <div className="bg-black/90 backdrop-blur-xl rounded-3xl p-8 border border-red-700/50 shadow-2xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <h2 className="text-4xl font-bold text-red-500 mb-2">
              Learning Community
            </h2>
            <p className="text-gray-300 text-lg">
              Connect with peers, share knowledge, and grow together
            </p>
          </div>
          <div className="flex gap-4">
            <button className="bg-red-700 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:scale-105">
              <Users className="inline mr-2" size={20} />
              Networking Hub
            </button>
            <Link
              to="/review-summary"
              className="bg-gray-800/70 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 border border-red-600 hover:scale-105"
            >
              <Eye className="inline mr-2" size={20} />
              Ai Review Summary
            </Link>
          </div>
        </div>
      </div>

      {/* Mentor Feedback Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {mentorFeedback?.length > 0 ? (
          mentorFeedback.map((fb) => (
            <div
              key={fb._id}
              className="bg-black/90 border border-red-700 rounded-3xl p-6 shadow-lg hover:shadow-red-500/50 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={fb.mentor?.avatar || "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150"}
                  alt={fb.mentor?.name || "Mentor"}
                  className="w-14 h-14 rounded-full border-2 border-red-600 object-cover"
                />
                <div>
                  <h3 className="text-red-500 font-bold text-lg">
                    {fb.mentor?.name || "Mentor Name"}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {FormatTime(fb.createdAt)}
                  </p>
                </div>
              </div>
              <p className="text-gray-300 mb-3">{fb.comment}</p>
              <div className="flex gap-3 mt-3">
                <button className="bg-red-600/50 hover:bg-red-600/70 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all">
                  Reply
                </button>
                <button className="bg-gray-800/60 hover:bg-gray-800/90 text-gray-300 px-4 py-2 rounded-lg text-sm font-semibold transition-all">
                  Bookmark
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 col-span-2 text-center">
            No feedback available yet.
          </p>
        )}
      </div>
    </div>
  );
};
