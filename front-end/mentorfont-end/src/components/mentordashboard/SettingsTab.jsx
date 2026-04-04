import { Camera, Star, Award, Edit3 } from "lucide-react";
import { useState } from "react";

export const SettingsTab = () => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent">
          Settings
        </h1>
        <p className="text-gray-400 mt-2">Manage your account and preferences</p>
      </div>

      {/* Profile Settings */}
      <div className="bg-gradient-to-br from-red-900/40 via-red-800/30 to-black/50 p-8 rounded-2xl border border-red-500/30">
        <h2 className="text-2xl font-bold text-white mb-6">
          Profile Information
        </h2>

        {!isEditingProfile ? (
          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150"
                  alt="profile"
                  className="w-24 h-24 rounded-full border-3 border-red-500/30"
                />
                <button className="absolute bottom-0 right-0 bg-red-600 p-2 rounded-full hover:bg-red-700 transition-colors shadow-lg">
                  <Camera size={16} />
                </button>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Hardik Singh</h3>
                <p className="text-red-200">
                  Senior Software Engineer & Mentor
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1">
                    <Star size={16} className="text-yellow-400" />
                    <span className="text-white font-medium">4.9</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Award size={16} className="text-green-400" />
                    <span className="text-green-400 font-medium">
                      Top Mentor
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsEditingProfile(true)}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all duration-300 hover:scale-105"
            >
              <Edit3 size={18} />
              Edit Profile
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue="Hardik Singh"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:border-red-500/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  defaultValue="Senior Software Engineer & Mentor"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:border-red-500/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue="hardik@example.com"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:border-red-500/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  defaultValue="+1 (555) 123-4567"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:border-red-500/50 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Bio
              </label>
              <textarea
                rows={4}
                defaultValue="Experienced software engineer with 8+ years in full-stack development. Passionate about mentoring and helping others grow in their tech careers."
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:border-red-500/50 transition-colors resize-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setIsEditingProfile(false)}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditingProfile(false)}
                className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-xl font-medium transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Notification Settings */}
      <div className="bg-gradient-to-br from-gray-900/90 to-black/70 p-8 rounded-2xl border border-red-500/30">
        <h2 className="text-2xl font-bold text-white mb-6">
          Notification Preferences
        </h2>
        <div className="space-y-4">
          {[
            {
              label: "Email notifications for new messages",
              enabled: true,
            },
            {
              label: "Push notifications for session reminders",
              enabled: true,
            },
            { label: "Weekly performance reports", enabled: false },
            { label: "New mentee requests", enabled: true },
          ].map((setting, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl"
            >
              <span className="text-white">{setting.label}</span>
              <button
                className={`w-12 h-6 rounded-full transition-all duration-300 ${
                  setting.enabled ? "bg-red-600" : "bg-gray-600"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
                    setting.enabled ? "translate-x-6" : "translate-x-1"
                  }`}
                ></div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
