import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../ContextApiStore/ContextStore";
import { Plus, Send, Users } from "lucide-react";
import { GetMentorProfile } from "../services/MentorProfile";

function MenteeListedInTaskMangementOfMentorDashboard() {
  const { User, setselectedMentees, selectedMentees } =
    useContext(GlobalContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const [mentees, setMentees] = useState([]);

  //   async function GetAllMentee() {
  //     try {
  //       const result = await ();
  //       setMentees(result);
  //       console.log("response to get all mentee", result);
  //     } catch (error) {
  //       console.log("error to fetch all mentee", error);
  //     }
  //   }
  // getting mentee id who is selected

  function toggleMenteeSelection(id) {
    if (selectedMentees.includes(id)) {
      setselectedMentees((prev) => prev.filter((menteeId) => menteeId !== id));
    } else {
      setselectedMentees((prev) => [...prev, id]);
    }
  }
  async function FetchMentorProfile() {
    try {
      const result = await GetMentorProfile(user._id);
      console.log("response to get mentee profile", result);
      setMentees(result.result.mentees);
    } catch (error) {
      console.log("error to get mentor profile", error);
    }
  }
  // calling get all mentee function
  useEffect(() => {
    FetchMentorProfile();
    console.log("mentorprofile", user);
  }, []);
  return (
    <div className="space-y-6">
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center">
          <Users className="w-5 h-5 mr-2 text-red-400" />
          Select Mentees ({mentees.length})
        </h3>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {mentees.map((mentee) => (
            <div
              key={mentee.id}
              onClick={() => toggleMenteeSelection(mentee._id)}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                selectedMentees.includes(mentee._id)
                  ? "border-red-500 bg-red-500/10"
                  : "border-gray-700 hover:border-gray-600 bg-gray-800"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-sm font-semibold">
                  {mentee.profile}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-white">{mentee.name}</p>
                  <p className="text-sm text-gray-400">{mentee.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">
                    Active: {mentee.tasksActive}
                  </p>
                  <p className="text-xs text-green-400">
                    Done: {mentee.tasksCompleted}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default MenteeListedInTaskMangementOfMentorDashboard;
