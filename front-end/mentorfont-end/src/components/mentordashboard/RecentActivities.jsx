import { Video, Users, Star, Edit3, ChevronRight } from "lucide-react";

export const RecentActivities = () => {
  return (
    <section>
      <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
      <div className="bg-gradient-to-br from-gray-900/80 to-black/60 p-6 rounded-2xl border border-red-500/20">
        <div className="space-y-6">
          {[
            {
              action: "Completed session with Sarah Johnson",
              time: "2 hours ago",
              type: "session",
            },
            {
              action: "New mentee request from Alex Kim",
              time: "4 hours ago",
              type: "request",
            },
            {
              action: "Received 5-star rating from Mike Chen",
              time: "1 day ago",
              type: "rating",
            },
            {
              action: "Updated profile information",
              time: "2 days ago",
              type: "profile",
            },
          ].map((activity, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-red-600/5 to-transparent hover:from-red-600/10 transition-all duration-300"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.type === "session"
                    ? "bg-green-600/20 text-green-400"
                    : activity.type === "request"
                    ? "bg-blue-600/20 text-blue-400"
                    : activity.type === "rating"
                    ? "bg-yellow-600/20 text-yellow-400"
                    : "bg-red-600/20 text-red-400"
                }`}
              >
                {activity.type === "session" && <Video size={16} />}
                {activity.type === "request" && <Users size={16} />}
                {activity.type === "rating" && <Star size={16} />}
                {activity.type === "profile" && <Edit3 size={16} />}
              </div>
              <div className="flex-1">
                <p className="text-white font-medium">{activity.action}</p>
                <p className="text-gray-400 text-sm">{activity.time}</p>
              </div>
              <ChevronRight size={16} className="text-gray-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
