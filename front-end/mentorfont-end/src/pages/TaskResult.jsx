import TaskAttendPage from "./TaskAtttendPage";
import { useLocation } from "react-router-dom";

function TaskResultPage() {
  const location = useLocation();
  const { total, correct } = location.state;
  const percentage = ((correct / total) * 100).toFixed(2);
  const wrong = total - correct;
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-black via-zinc-950 to-red-950 text-white flex flex-col items-center justify-center p-8">
      <div className="bg-black/40 backdrop-blur-lg p-10 rounded-3xl border border-red-600 shadow-xl w-[90%] md:w-[50%] text-center">
        <h1 className="text-4xl font-extrabold text-red-500 mb-6">
          🎯 Task Result
        </h1>

        <p className="text-lg mb-3">Total Questions: {total}</p>
        <p className="text-lg text-green-400 mb-3">
          Correct Answers: {correct}
        </p>
        <p className="text-lg text-red-400 mb-3">Wrong Answers: {wrong}</p>
        <p className="text-2xl font-bold text-yellow-400 mb-6">
          Score: {percentage}%
        </p>

        <button
          onClick={() => navigate("/")}
          className="bg-red-700 hover:bg-red-600 text-white font-bold text-xl px-6 py-3 rounded-xl shadow-lg shadow-red-900/50 transition-all duration-300 hover:scale-105"
        >
          🔙 Back to Home
        </button>
      </div>
    </div>
  );
}
export default TaskResultPage;
