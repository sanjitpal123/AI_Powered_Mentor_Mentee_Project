import { Trophy } from "lucide-react";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../ContextApiStore/ContextStore";

import { GetAllScoresOfMenteesOfATask } from "../services/Performance";
import { TopThreePodium } from "../components/leaderboard/TopThreePodium";
import { ParticipantsList } from "../components/leaderboard/ParticipantsList";

function TaskWinningPage() {
  const { id } = useParams();
  const { User } = useContext(GlobalContext);
  const wholeObj = JSON.parse(localStorage.getItem("user"));
  const [scores, setScores] = useState([]);

  async function GetAllScore() {
    try {
      const response = await GetAllScoresOfMenteesOfATask(wholeObj.token, id);
      setScores(response); // backend already sorted
    } catch (error) {
      console.log("error to get scores", error);
    }
  }

  useEffect(() => {
    GetAllScore();
    // eslint-disable-next-line
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="max-w-5xl mx-auto mb-12 text-center">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-lg">
            <Trophy className="w-10 h-10 text-white" />
          </div>
        </div>
        <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 text-transparent bg-clip-text">
          Task Leaderboard
        </h1>
        <p className="text-slate-400 text-lg">
          Top performers ranked by accuracy and speed
        </p>
      </div>

      <TopThreePodium scores={scores} />
      <ParticipantsList scores={scores} />
    </div>
  );
}

export default TaskWinningPage;
