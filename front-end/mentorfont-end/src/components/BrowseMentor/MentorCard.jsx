import React from "react";
import { Star, MapPin, Clock, Heart, MessageCircle } from "lucide-react";
import { gsap } from "gsap";

export const MentorCard = ({ mentor, Suser, handleButtonClick, NavigateToChat }) => {
  return (
    <div
      className="bg-[#0a0a0a] rounded-2xl shadow-xl hover:shadow-red-500/10 transition-all duration-500 overflow-hidden group border border-white/5 hover:border-red-500/30 transform hover:-translate-y-1"
      onMouseEnter={(e) => {
        gsap.to(e.currentTarget, {
          boxShadow: "0 10px 30px -10px rgba(239, 68, 68, 0.15)",
          duration: 0.3,
          ease: "power2.out",
        });
      }}
      onMouseLeave={(e) => {
        gsap.to(e.currentTarget, {
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          duration: 0.3,
          ease: "power2.out",
        });
      }}
    >
      <div className="p-6 relative">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Header */}
        <div className="flex items-start gap-4 mb-4 relative z-10">
          <div className="relative flex-shrink-0">
            <img
              src={mentor?.avatar}
              alt={mentor?.name}
              className="w-16 h-16 rounded-full object-cover ring-2 ring-white/10 transition-all duration-300 group-hover:ring-red-500/50"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-red-400 transition-colors duration-300">
              {mentor?.name}
            </h3>
            <p className="text-gray-400 text-sm mb-2 group-hover:text-gray-300 transition-colors duration-300">
              {mentor?.title}
            </p>
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-red-500 text-red-500 animate-pulse" />
                <span className="font-semibold text-white">
                  {mentor?.rating}
                </span>
                <span className="text-gray-400">
                  ({mentor?.reviews} reviews)
                </span>
              </div>
            </div>
          </div>
          <button
            className="p-2 rounded-full hover:bg-red-600/20 transition-all duration-300 group"
            onClick={(e) => handleButtonClick(e, mentor._id)}
          >
            <Heart
              className={`w-5 h-5  ${
                Suser?.wishlist?.some((item) => item._id === mentor._id)
                  ? "text-red-500"
                  : "text-gray-400"
              } transition-colors duration-300`}
            />
          </button>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-4 leading-relaxed relative z-10">
          {mentor?.description}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4 text-center relative z-10">
          <div className="bg-[#050505] rounded-xl p-3 border border-white/5 hover:border-red-500/30 transition-all duration-300 group">
            <div className="text-lg font-bold text-white group-hover:text-red-400 transition-colors duration-300">
              {mentor?.mentees || "0"}
            </div>
            <div className="text-xs text-gray-500">Mentees</div>
          </div>
          <div className="bg-[#050505] rounded-xl p-3 border border-white/5 hover:border-red-500/30 transition-all duration-300 group">
            <div className="text-lg font-bold text-white group-hover:text-red-400 transition-colors duration-300">
              {mentor?.sessions || "0"}
            </div>
            <div className="text-xs text-gray-500">Sessions</div>
          </div>
          <div className="bg-[#050505] rounded-xl p-3 border border-white/5 hover:border-red-500/30 transition-all duration-300 group">
            <div className="text-lg font-bold text-white group-hover:text-red-400 transition-colors duration-300">
              5+
            </div>
            <div className="text-xs text-gray-500">Years Exp</div>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-2 mb-6 relative z-10">
          <div className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-300 transition-colors duration-300">
            <MapPin className="w-4 h-4 text-red-500" />
            <span>{mentor?.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-300 transition-colors duration-300">
            <Clock className="w-4 h-4 text-red-500" />
            <span>{mentor?.responseTime || "2 hours"}</span>
          </div>
        </div>

        {/* Price and Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5 relative z-10">
          <div className="flex items-center gap-1">
            <span className="text-2xl font-bold text-white tracking-tight">
              ${mentor?.price}
            </span>
            <span className="text-gray-500 text-sm">/session</span>
          </div>
          <div className="flex gap-2">
            <button
              className="p-2 rounded-xl border border-white/10 hover:bg-red-600/10 hover:border-red-500/50 transition-all duration-300 group"
              onClick={(e) => NavigateToChat(e, mentor._id)}
            >
              <MessageCircle className="w-5 h-5 text-gray-400 group-hover:text-red-400 transition-colors duration-300" />
            </button>
            <button
              className="px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-300 font-medium"
              onClick={(e) => NavigateToChat(e, mentor._id)}
            >
              Book Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
