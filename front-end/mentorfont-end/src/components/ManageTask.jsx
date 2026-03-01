import { GlobalContext } from "../ContextApiStore/ContextStore";
import { getTask } from "../services/Task";
import { useContext, useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import { GetPerformanceOfMentee } from "../services/Performance";
import { useNavigate } from "react-router-dom";
function ManageTask() {
  const { User } = useContext(GlobalContext);
  const navigator = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [performance, setPerformance] = useState(null);
  console.log("user", user);
  const [tasks, setTasks] = useState([]);
  async function GetAllTask() {
    try {
      const res = await getTask(user.token);
      console.log("response to get task", res);
      setTasks(res);
    } catch (error) {
      console.log("error to get task", error);
    }
  }
  async function handleSeePerformance(mentee, task) {
    try {
      const result = await GetPerformanceOfMentee(user.token, {
        mentee,
        task,
      });

      console.log("result of performance in managetask ", result);

      navigator("/performance-seen-of-mentee", {
        state: { performance: result.isExisted },
      });
    } catch (error) {
      console.log("error to see performance", error);
    }
  }
  function handleNavigate(id) {
    console.log("click");
    navigator(`/taskwinning/${id}`);
  }
  useEffect(() => {
    GetAllTask();
    console.log("task", tasks);
  }, []);
  return (
    <div className="space-y-6">
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <select className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500">
              <option>All Status</option>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
            <select className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500">
              <option>All Types</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks?.map((task) => (
          <div
            key={task.id}
            className="bg-gray-900 rounded-xl border border-gray-800 p-6 hover:border-gray-700 transition-colors"
            onClick={() => handleNavigate(task._id)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">{task.status}</span>
              </div>
            </div>

            <h3 className="text-lg font-bold text-white mb-2">{task.Title}</h3>
            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
              {task.Description}
            </p>

            <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(task.updatedAt).toLocaleTimeString([], {
                  day: "2-digit",
                  month: "2-digit",

                  year: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <span className="bg-gray-800 px-2 py-1 rounded">
                <p className="text-red-500">Due Date</p>
                {new Date(task.Duedate).toLocaleTimeString([], {
                  day: "2-digit",
                  month: "2-digit",
                  year: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <div className="flex gap-4 items-center">
              <h4>Attended By</h4>
              <div className="flex  items-center">
                {task.AttendedBy?.map((mentee) => (
                  <div
                    className="w-[50px] ml-[-5px] bg-red-900 text-white flex justify-center items-center h-[50px] rounded-full"
                    onClick={() => handleSeePerformance(mentee._id, task._id)}
                  >
                    {mentee?.profile
                      ? mentee?.profile
                      : mentee?.name.charAt(0).toUpperCase() +
                        mentee?.name
                          .charAt(mentee.name.length - 1)
                          .toUpperCase()}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageTask;
