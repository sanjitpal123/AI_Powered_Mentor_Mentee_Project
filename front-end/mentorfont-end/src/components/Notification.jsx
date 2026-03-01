// src/pages/Notification.jsx
import React, { useContext, useEffect, useState } from "react";
import {
  Bell,
  Clock,
  Info,
  CheckCircle,
  AlertCircle,
  Diff,
} from "lucide-react";
import { GetNotification, UpdateIsRead } from "../services/Notification";
import { GlobalContext } from "../ContextApiStore/ContextStore";
import { UpdateStatus } from "../services/Session";
import { socket } from "../utils/socket";
import FormatTime from "../utils/DateFormat";

function Notification() {
  const [Notifications, setNotifications] = useState([]);
  const {
    User,
    AllNotification,
    setAllNotification,
    setCountUnseenNotification,
  } = useContext(GlobalContext);
  const user = JSON.parse(localStorage.getItem("user"));

  async function GetAllNotification() {
    try {
      const res = await GetNotification(user.token);
      setNotifications(res.notification || []);
      setAllNotification(res.notification || []);
      console.log("response to get notification", res);
      UpdateAllIsRead();
    } catch (error) {
      console.log("error to get notification", error);
    }
  }
  async function UpdateAllIsRead() {
    try {
      const updated = await UpdateIsRead(user.token);
      console.log("udpated", updated);
    } catch (error) {
      console.log("error to update", error);
    }
  }

  useEffect(() => {
    GetAllNotification();
    UpdateAllIsRead();
  }, []);

  async function handleAccept(note) {
    try {
      console.log("id to update", note);
      const data = {
        status: "confirm",
        id: note.sessionId._id,
        mentor: user._id,
      };
      const res = await UpdateStatus(data, user.token);
      console.log("status to update", res);
      socket.emit("NotifySessionStatusUpdate", {
        receiverId: note.sessionId.mentee,
      });
      GetAllNotification();
    } catch (error) {
      console.log("error to get update status of session", error);
    }
  }

  const getIcon = (type) => {
    switch (type) {
      case "info":
        return <Info className="text-blue-400 w-6 h-6" />;
      case "success":
        return <CheckCircle className="text-green-400 w-6 h-6" />;
      case "warning":
        return <AlertCircle className="text-yellow-400 w-6 h-6" />;
      default:
        return <Bell className="text-gray-400 w-6 h-6" />;
    }
  };

  const handleCancel = async (note) => {
    try {
      console.log("id to update", note);
      const data = {
        status: "calcalled",
        id: note.sessionId._id,
        mentor: user._id,
      };
      const res = await UpdateStatus(data, user.token);
      socket.emit("NotifySessionStatusUpdate", {
        receiverId: note.sessionId.mentee,
      });
      console.log("status to cancel", res);
      GetAllNotification();
    } catch (error) {
      console.log("response to cancel status", error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-10 px-4">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-10">
        <Bell className="w-10 h-10 text-red-500" />
        <h1 className="text-4xl font-bold text-red-500">Notifications</h1>
      </div>

      {/* Notifications List */}
      <div className="w-full max-w-2xl space-y-6">
        {AllNotification.length > 0 ? (
          AllNotification.map((note) => (
            <div
              key={note._id}
              className={`flex items-start gap-4 p-5 rounded-xl shadow-lg transition-all duration-300 
              ${
                note.isRead
                  ? "bg-gray-800"
                  : "bg-gray-900 border-l-4 border-red-500"
              }`}
            >
              {/* Icon */}
              <div className="flex-shrink-0">{getIcon(note.type)}</div>

              {/* Content */}
              <div className="flex-1">
                <p className="text-lg font-semibold">{note.title}</p>
                <p className="text-sm text-gray-400 mt-1">{note.message}</p>
                <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                  <Clock className="w-4 h-4" /> {FormatTime(note.createdAt)}
                  {note.type == "session" &&
                    note.sessionId.status == "pending" && (
                      <div className="flex gap-2 ml-10">
                        <button
                          className="py-2 px-4 bg-green-400 text-white rounded-md"
                          onClick={() => handleAccept(note)}
                        >
                          Accept
                        </button>
                        <button
                          className="py-2 px-4 bg-red-400 text-white rounded-md"
                          onClick={() => handleCancel(note)}
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400">No notifications yet</div>
        )}
      </div>
    </div>
  );
}

export default Notification;
