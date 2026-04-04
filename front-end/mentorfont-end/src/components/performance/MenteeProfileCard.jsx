import React from "react";
import { Mail, Trophy } from "lucide-react";

export const MenteeProfileCard = ({ performance }) => {
  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-red-500/20 hover:border-red-500/40 transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
          {/* <User className="w-6 h-6 text-white" /> */}
        </div>
        <div>
          <h2 className="text-xl font-bold text-red-400">Mentee Profile</h2>
          <p className="text-gray-400 text-sm">Personal Information</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div>
            <p className="text-sm text-gray-400">Name</p>
            <p className="font-medium">{performance.mentee.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Mail className="w-5 h-5 text-red-400" />
          <div>
            <p className="text-sm text-gray-400">Email</p>
            <p className="font-medium">{performance.mentee.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Trophy className="w-5 h-5 text-red-400" />
          <div>
            <p className="text-sm text-gray-400">Experience</p>
            <p className="font-medium">{performance.mentee?.experience}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div>
            <p className="text-sm text-gray-400">GitHub</p>
            <p className="font-medium text-blue-400">
              {performance.mentee?.github}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div>
            <p className="text-sm text-gray-400">LinkedIn</p>
            <p className="font-medium text-blue-400">
              {performance.mentee?.linked}
            </p>
          </div>
        </div>
      </div>

      {/* Bio Section */}
      <div className="mt-6 pt-6 border-t border-gray-700">
        <p className="text-sm text-gray-400 mb-2">Bio</p>
        <p className="text-gray-300 leading-relaxed">
          {performance?.mentee.bio}
        </p>
      </div>
    </div>
  );
};
