import { Search } from "lucide-react";
import { useContext, useEffect, useState, useRef } from "react";
import { GlobalContext } from "../../ContextApiStore/ContextStore";
import { GetMentorConvo } from "../../services/MentorDashBoard/MentorDashBoardsApi";
import { socket } from "../../utils/socket";
import {
  DeleteForMeSer,
  DeleteMessageForEveryoneService,
  EditMessage,
  GetAllMessageSer,
  SeenMessageMessage,
  sendMessage,
} from "../../services/Message";

export const MessagesFromMentee = () => {
  const scroll = useRef();
  const { User } = useContext(GlobalContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const [Mentees, setMentees] = useState([]);
  const [OnlyMentees, SetOnlyMentees] = useState([]);
  const [MenteeToPass, setMenteeToPass] = useState(null);
  const [Message, setMessage] = useState("");
  const [Convoid, setConvoId] = useState(null);
  const [AllMessage, setAllMessage] = useState([]);
  const [isTyping, setisTyping] = useState(false);
  const [updatedMessage, setUpdatedMessage] = useState([]);
  const [OpenId, setOpenId] = useState(null);
  const [Open, setisOpen] = useState(false);
  const [EditClick, setEditClick] = useState(false);
  const [UpdatedText, setUpdatedText] = useState("");

  // ✅ Fetch all conversations of mentor
  async function GetMentorConversation() {
    try {
      const convo = await GetMentorConvo(user?.token);
      setMentees(convo);

      const mentee = convo.map((c) =>
        c.participants.find((p) => p._id !== user._id)
      );

      SetOnlyMentees(mentee);
      console.log("All mentor conversations:", convo);
    } catch (error) {
      console.log("Error fetching mentor conversations:", error);
    }
  }

  // ✅ Handle mentee selection + set conversation ID
  function HandleNavigate(id) {
    setMenteeToPass(id);

    const convo = Mentees.find((c) =>
      c.participants.some((participantId) => participantId === id)
    );

    setConvoId(convo ? convo._id : null);
  }

  // ✅ Update seen status API
  async function UpdateMessage() {
    try {
      const res = await SeenMessageMessage(Convoid, user?.token);
      setUpdatedMessage(res.allMessage);
      console.log("Seen status updated:", res);
    } catch (error) {
      console.log("Error updating message status:", error);
    }
  }

  // ✅ Send message API
  async function handleSubmit() {
    if (!Message.trim()) return;
    try {
      const data = {
        conversation: Convoid,
        text: Message,
        isRead: false,
      };
      const res = await sendMessage(data, user?.token);
      console.log("Message sent:", res);
      setMessage("");

      // Emit new message to socket
      socket.emit("sendMessage", res.data);

      GetMessages();
    } catch (error) {
      console.log("Error sending message:", error);
    }
  }

  // ✅ Fetch all messages of current conversation
  async function GetMessages() {
    if (!Convoid) return;
    try {
      const res = await GetAllMessageSer(Convoid, user?.token);
      setAllMessage(res);
      console.log("Fetched messages:", res);
    } catch (error) {
      console.log("Error fetching messages:", error);
    }
  }

  // ✅ Typing event handler
  let timeout;
  function handleSetMessage(e) {
    setMessage(e.target.value);
    socket.emit("typing", MenteeToPass._id);

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      socket.emit("stop typing", MenteeToPass._id);
    }, 3000);
  }

  // handle Edit message change
  function handleSetMessage1(e) {
    setUpdatedText(e.target.value);
  }

  // ✅ On conversation change → Fetch messages & emit "seen"
  useEffect(() => {
    GetMessages();

    if (Convoid && MenteeToPass?._id) {
      socket.emit("seen", {
        convoId: Convoid,
        receiverId: MenteeToPass._id,
      });
      UpdateMessage();
    }
  }, [Convoid, MenteeToPass]);

  // ✅ On first render → Get all mentor conversations
  useEffect(() => {
    GetMentorConversation();
  }, []);

  // ✅ Listen for incoming messages
  useEffect(() => {
    const handler = async (sms) => {
      setAllMessage((prev) => [...prev, sms]);

      // Mark messages as seen if open chat matches
      if (Convoid && MenteeToPass?._id) {
        console.log("sending message after receving");
        socket.emit("seen", {
          convoId: Convoid,
          receiverId: MenteeToPass._id,
        });
      }
      await UpdateMessage();
      await GetMessages();
    };

    socket.on("receiveMessage", handler);

    return () => {
      socket.off("receiveMessage", handler);
    };
  }, [Convoid, MenteeToPass]);

  // ✅ Listen for "seenMessage" → Update DB & UI
  useEffect(() => {
    const handleSeenMessage = async (convoId) => {
      console.log(`Messages in convo ${convoId} are seen ✅`);

      if (Convoid === convoId) {
        try {
          await UpdateMessage();
          await GetMessages();
        } catch (error) {
          console.error("Error updating seen status:", error);
        }
      }
    };

    socket.on("seenMessage", handleSeenMessage);

    return () => {
      socket.off("seenMessage", handleSeenMessage);
    };
  }, [Convoid, user?.token]);

  // ✅ Typing listener
  useEffect(() => {
    socket.on("typing", () => {
      setisTyping(true);
    });

    socket.on("stop typing", () => {
      setisTyping(false);
    });

    return () => {
      socket.off("typing");
      socket.off("stop typing");
    };
  }, [MenteeToPass]);

  // open menu to delete and edit
  function handleOpen(id) {
    console.log("opening", id);
    setOpenId(id);
    setisOpen((prev) => !prev);
    setMessage("");
  }

  // handle Edit message
  function handleEdit(id, value) {
    setUpdatedText(value);
    setisOpen(false);
    setEditClick(true);
  }

  async function handleSubmitOfEdit() {
    try {
      const res = await EditMessage(OpenId, UpdatedText, user.token);
      console.log("edit message response", res);
      setUpdatedText("");
      GetMessages();
      socket.emit("EditMessage", { receiverId: MenteeToPass._id });
    } catch (error) {
      console.log("error to edit message", error);
    }
  }

  async function DeleteMessageForEveryone() {
    try {
      const res = await DeleteMessageForEveryoneService(OpenId);
      setisOpen(false);
      GetMessages();
      socket.emit("EditMessage", { receiverId: MenteeToPass._id });
      console.log("deleted Message", res);
    } catch (error) {
      console.log("error to delete", error);
    }
  }

  async function DeleteForMe() {
    try {
      const res = await DeleteForMeSer(OpenId, user.token);
      setisOpen(false);
      GetMessages();
      console.log("responsive to delete for me ", res);
    } catch (error) {
      console.log("error to delete for me", error);
    }
  }

  // scroll to last message
  useEffect(() => {
    if (scroll.current) {
      scroll.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [AllMessage]);

  return (
    <div className="h-full flex">
      {/* Chat List */}
      <div className="w-1/3 bg-gradient-to-br from-gray-900/90 to-black/70 border-r border-red-500/30">
        <div className="p-6 border-b border-red-500/30">
          <h2 className="text-xl font-bold text-white mb-4">Messages</h2>
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50 transition-colors"
            />
          </div>
        </div>

        <div className="overflow-y-auto max-h-[100vh]">
          {OnlyMentees?.map((mentee, i) => (
            <div
              key={i}
              className="p-4 border-b border-gray-800/50 hover:bg-red-600/10 cursor-pointer transition-all duration-300"
              onClick={() => HandleNavigate(mentee)}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  {mentee?.profilePicture ? (
                    <img
                      src=""
                      alt={mentee?.name}
                      className="w-12 h-12 rounded-full"
                    />
                  ) : (
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-600 text-white text-lg font-bold">
                      {mentee?.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-white truncate">
                      {mentee?.name}
                    </h3>
                    <span className="text-xs text-gray-400">
                      {mentee?.time}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 truncate">
                    {mentee?.message}
                  </p>
                </div>
                {mentee?.unread > 0 && (
                  <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-medium">
                      {mentee?.unread}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="p-6 border-b border-red-500/30 bg-gradient-to-r from-gray-900/50 to-black/30">
          <div className="flex items-center gap-3">
            <img
              src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=50&h=50"
              alt="Sarah"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h3 className="font-medium text-white">{MenteeToPass?.name}</h3>
              <p className="text-sm text-green-400">Online</p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {/* All messages */}
          <div className="space-y-3 px-3 py-2">
            {AllMessage?.map((msg, i) => {
              const isSender =
                msg.sender?._id?.toString() === user?._id?.toString();

              return (
                <div
                  key={i}
                  className={`flex ${
                    isSender ? "justify-end" : "justify-start"
                  } mb-4`}
                >
                  <div
                    className={`relative group px-4 py-3 rounded-2xl shadow-lg max-w-[70%] break-words 
                    transition-all duration-300 transform hover:scale-[1.03] hover:shadow-2xl ${
                      isSender
                        ? "bg-gradient-to-r from-red-600 to-red-700 text-white"
                        : "bg-gradient-to-r from-gray-900 to-gray-800 text-white border border-red-600/30"
                    }`}
                  >
                    {/* Dropdown (only for sender) */}
                    {Open && OpenId === msg._id && (
                      <div className="absolute right-10 top-[-4rem] w-52 bg-white/95 border border-gray-200 rounded-2xl shadow-2xl z-30 animate-fade-in">
                        <button
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-2xl transition-colors"
                          onClick={() => handleEdit(msg._id, msg.text)}
                        >
                          Edit
                        </button>
                        <button
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          onClick={DeleteMessageForEveryone}
                        >
                          Delete for Everyone
                        </button>
                        <button
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-b-2xl transition-colors"
                          onClick={DeleteForMe}
                        >
                          Delete for Me
                        </button>
                      </div>
                    )}

                    {/* Message + Options */}
                    {msg.text !== "" && !msg.deletedBy?.includes(user._id) ? (
                      <div className="text-base leading-relaxed flex items-start gap-3">
                        <p className="whitespace-pre-wrap">{msg.text}</p>
                        {isSender && (
                          <div
                            className="cursor-pointer text-white/70 hover:text-white transition-colors z-50"
                            role="button"
                            onClick={() => handleOpen(msg._id)}
                          >
                            ⋮
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                        <i className="text-gray-500 italic">
                          This message was deleted
                        </i>
                      </div>
                    )}

                    {/* Time + Seen */}
                    <div className="flex items-center gap-2 mt-2 justify-end">
                      <span
                        className={`text-xs ${
                          isSender ? "text-red-200" : "text-gray-400"
                        }`}
                      >
                        {msg.updatedAt &&
                          new Date(msg.updatedAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                      </span>

                      {isSender &&
                      msg.text !== "" &&
                      !msg.deletedBy?.includes(user._id) ? (
                        <span
                          className={`text-xs font-semibold ${
                            msg.isRead ? "text-blue-400" : "text-gray-400"
                          }`}
                        >
                          {msg.isRead ? "✓✓" : "✓"}
                        </span>
                      ) : null}
                    </div>

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 bg-white transition duration-300 pointer-events-none"></div>
                  </div>
                </div>
              );
            })}
            <div ref={scroll}></div>

            {/* Typing indicator */}
            {isTyping && (
               <div className="flex justify-start">
                 <div className="px-4 py-2 bg-gray-700 text-white rounded-2xl text-sm animate-pulse">
                   Typing...
                 </div>
               </div>
            )}
          </div>
        </div>

        <div className="p-6 border-t border-red-500/30">
          {!EditClick ? (
            <div className="flex gap-3">
              <input
                type="text"
                onChange={handleSetMessage}
                value={Message}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50 transition-colors"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
              />
              <button
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-xl font-medium transition-all duration-300 hover:scale-105"
                onClick={handleSubmit}
              >
                Send
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <input
                type="text"
                onChange={handleSetMessage1}
                value={UpdatedText}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50 transition-colors"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmitOfEdit();
                  }
                }}
              />
              <button
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-xl font-medium transition-all duration-300 hover:scale-105"
                onClick={handleSubmitOfEdit}
              >
                Send
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
