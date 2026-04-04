import { Clock } from "lucide-react";
import { useContext } from "react";
import { GlobalContext } from "../../ContextApiStore/ContextStore";

export const WelcomeMessage = () => {
  const { User } = useContext(GlobalContext);
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-red-900/40 via-red-800/30 to-black/50 p-8 rounded-3xl border border-red-500/30 backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-transparent"></div>
      <div className="relative z-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent mb-2">
          {`Welcome Back, ${user?.name} 👋`}
        </h1>
        <p className="text-red-200/80 text-lg">
          Ready to inspire and guide your mentees today?
        </p>
        <div className="flex items-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-300">Online</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-red-300" />
            <span className="text-sm text-red-200">5 sessions today</span>
          </div>
        </div>
      </div>
    </div>
  );
};
