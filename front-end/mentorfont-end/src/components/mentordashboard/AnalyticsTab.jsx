import { Calendar, Users, Star, DollarSign, TrendingUp } from "lucide-react";

export const AnalyticsTab = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent">
          Analytics Dashboard
        </h1>
        <p className="text-gray-400 mt-2">
          Track your mentoring performance and growth
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            label: "Total Sessions",
            value: "156",
            change: "+23%",
            icon: Calendar,
            color: "from-red-600 to-red-700",
          },
          {
            label: "Active Mentees",
            value: "24",
            change: "+12%",
            icon: Users,
            color: "from-red-700 to-red-800",
          },
          {
            label: "Avg Rating",
            value: "4.9",
            change: "+0.3",
            icon: Star,
            color: "from-red-800 to-red-900",
          },
          {
            label: "Total Earnings",
            value: "$8,420",
            change: "+18%",
            icon: DollarSign,
            color: "from-red-600 to-red-800",
          },
        ].map((metric, i) => (
          <div
            key={i}
            className="group relative overflow-hidden bg-[#0a0a0a] p-6 rounded-2xl border border-white/5 hover:border-red-500/30 transition-all duration-500 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-red-500/10"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div
                className={`w-12 h-12 bg-gradient-to-r ${metric.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <metric.icon size={24} className="text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-1">
                {metric.value}
              </h3>
              <p className="text-gray-400 text-sm mb-2">{metric.label}</p>
              <div className="flex items-center gap-1">
                <TrendingUp size={14} className="text-green-400" />
                <span className="text-green-400 text-sm font-medium">
                  {metric.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-white/5">
          <h3 className="text-xl font-bold text-white mb-4">Session Trends</h3>
          <div className="h-64 bg-[#050505] rounded-xl border border-white/5 flex items-center justify-center">
            <p className="text-gray-500">Chart visualization would go here</p>
          </div>
        </div>
        <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-white/5">
          <h3 className="text-xl font-bold text-white mb-4">
            Rating Distribution
          </h3>
          <div className="h-64 bg-[#050505] rounded-xl border border-white/5 flex items-center justify-center">
            <p className="text-gray-500">Chart visualization would go here</p>
          </div>
        </div>
      </div>
    </div>
  );
};
