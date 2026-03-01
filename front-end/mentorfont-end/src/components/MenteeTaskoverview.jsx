import { useContext } from "react";
import { getTask } from "../services/Task";
import { GlobalContext } from "../ContextApiStore/ContextStore";

function MenteeTaskOverViewForMentorDashBoard() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}

      {/* Mentees List */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <h2 className="text-xl font-bold text-white mb-6">All Mentees</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* {mentees?.map((mentee) => (
            <div
              key={mentee.id}
              className="bg-gray-800 rounded-lg border border-gray-700 p-6 hover:border-gray-600 transition-colors"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {mentee.avatar}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{mentee.name}</h3>
                  <span className="text-sm text-gray-400">{mentee.type}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-400">
                    {mentee.tasksCompleted}
                  </p>
                  <p className="text-xs text-gray-400">Completed</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-400">
                    {mentee.tasksActive}
                  </p>
                  <p className="text-xs text-gray-400">Active</p>
                </div>
              </div>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
}
export default MenteeTaskOverViewForMentorDashBoard;
