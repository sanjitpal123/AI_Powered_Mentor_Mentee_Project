import { Send, Phone, Video, MoreVertical, Smile } from "lucide-react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import { GlobalContext } from "../ContextApiStore/ContextStore";
import { FetchConvoById } from "../services/Convo";
import { useState } from "react";
import {
  GetAllMessageSer,
  SeenMessageMessage,
  sendMessage,
} from "../services/Message";

import { socket } from "../utils/socket";
function ChatBox() {
  const { User } = useContext(GlobalContext);
  const [Receiver, setReceiver] = useState([]);
  const [Message, setMessage] = useState("");
  const [ChatMessages, setChatMessages] = useState([]);
  const [Convoid, setConvoid] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const { id } = useParams();

  const user = JSON.parse(localStorage.getItem("user"));
  // ✅ Fetch conversation details
  async function getConvoById() {
    try {
      const res = await FetchConvoById(id, user.token);
      setReceiver(res.convo.participants[0]);
      setConvoid(res.convo._id);
    } catch (error) {
      console.error("Error fetching convo:", error);
    }
  }

  // ✅ Fetch all messages
  async function GetAllMessages() {
    try {
      const res = await GetAllMessageSer(Convoid, user.token);
      setChatMessages(res);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }

  // ✅ Update message as seen
  async function UpdateMessage() {
    try {
      const updated = await SeenMessageMessage(Convoid, user.token);
      console.log("message is udpated", updated);
    } catch (error) {
      console.error("Error updating seen:", error);
    }
  }

  // ✅ Send message handler
  async function handleSendMessage() {
    try {
      const data = {
        conversation: Convoid,
        text: Message,
        isRead: false,
      };

      const res = await sendMessage(data, user.token);

      // Update UI immediately

      // Emit event to server
      socket.emit("sendMessage", res.data);
      socket.emit("stop typing", Receiver._id);
      GetAllMessages();

      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }

  // ✅ Handle typing event
  let timenout;
  function handleMessageChange(e) {
    setMessage(e.target.value);

    socket.emit("typing", Receiver._id);
    clearTimeout(timenout);

    timenout = setTimeout(() => {
      socket.emit("stop typing");
    }, 3000);
  }

  // ✅ Fetch conversation and messages on mount
  useEffect(() => {
    getConvoById();
  }, [id]);

  useEffect(() => {
    if (Convoid) {
      GetAllMessages();
      if (Receiver._id) {
        socket.emit("seen", { convoId: Convoid, receiverId: Receiver._id });
        UpdateMessage();
      }
    }
  }, [Convoid, Receiver._id]);

  // ✅ Join socket room
  useEffect(() => {
    if (user?._id) {
      socket.emit("join", user._id);
    }
  }, [user?._id]);

  // ✅ Handle receiving new messages
  useEffect(() => {
    const handleReceiveMessage = async (message) => {
      if (Convoid) {
        socket.emit("seen", {
          convoId: Convoid,
          receiverId: Receiver._id,
        });
        await UpdateMessage();
        await GetAllMessages();
      }
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [Convoid, Receiver]);

  /// handle UpdatedMessage Listen

  useEffect(() => {
    const handleReceiveEditedMessage = async () => {
      console.log("ekldfls");
      await GetAllMessages();
    };
    socket.on("getEditMessage", handleReceiveEditedMessage);
    return () => {
      socket.off("getEditMessage", handleReceiveEditedMessage);
    };
  }, [socket, Convoid]);

  // ✅ Handle "seen" messages
  useEffect(() => {
    async function handleSeen({ convoId }) {
      await GetAllMessages();

      if (Convoid == convoId) {
        console.log("seeng message sdk");
        console.log("seen message");
        await UpdateMessage();
        await GetAllMessages();
      }
    }

    socket.on("seenMessage", handleSeen);
    return () => {
      socket.off("seenMessage", handleSeen);
    };
  }, [Convoid, user.token]);

  // ✅ Typing indicator listener
  useEffect(() => {
    function handleTyping() {
      setIsTyping(true);
    }
    function handleStopTyping() {
      setIsTyping(false);
    }

    socket.on("typing", handleTyping);
    socket.on("stop typing", handleStopTyping);

    return () => {
      socket.off("typing", handleTyping);
      socket.off("stop typing", handleStopTyping);
    };
  }, [Receiver]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4">
      <div className="w-[80%] h-[120vh] bg-black rounded-2xl shadow-2xl overflow-hidden border border-red-900/30 flex flex-col">
        {/* Header */}
        <div className="flex items-center p-6 bg-gradient-to-r from-black to-gray-900 border-b border-red-900/30 flex-shrink-0">
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2"
              alt="profile"
              className="w-16 h-16 rounded-full border-2 border-red-600 object-cover"
            />
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-black"></div>
          </div>
          <div className="ml-4 flex-1">
            <h2 className="font-semibold text-white text-2xl">
              {Receiver?.name}
            </h2>
            <p className="text-lg text-red-400">Online • Last seen 2:02pm</p>
          </div>
          <div className="flex gap-3">
            <button className="p-3 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-full transition-all duration-200">
              <Phone className="w-7 h-7" />
            </button>
            <button className="p-3 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-full transition-all duration-200">
              <Video className="w-7 h-7" />
            </button>
            <button className="p-3 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-full transition-all duration-200">
              <MoreVertical className="w-7 h-7" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-6 space-y-6 overflow-y-auto bg-gradient-to-b from-black via-gray-900 to-black pb-20">
          {ChatMessages?.map((message, index) => {
            const senderId =
              typeof message.sender === "string"
                ? message.sender
                : message.sender?._id;

            const isSender = senderId === user._id;

            return (
              <div key={index} className="w-full mb-3">
                {isSender ? (
                  // Sender's message
                  <div className="flex justify-end">
                    <div className="relative group rounded-2xl px-5 py-3 max-w-[70%] bg-gradient-to-r from-red-600 to-red-800 text-white shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-red-500/30">
                      {/* Message Text */}
                      <p className="text-base leading-relaxed break-words pr-16">
                        {message.text}
                      </p>

                      {/* Timestamp + Seen */}
                      <div className="absolute bottom-2 right-3 flex items-center gap-2 opacity-80">
                        <span className="text-xs text-red-100">
                          {message?.updatedAt &&
                            new Date(message.updatedAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                        </span>
                        <span
                          className={`text-xs ${
                            message.isRead ? "text-blue-400" : "text-gray-300"
                          }`}
                        >
                          {message.isRead ? "✓✓" : "✓"}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Receiver's message
                  <div className="flex justify-start">
                    <div className="relative group rounded-2xl px-5 py-3 max-w-[70%] bg-gray-800 text-white shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-gray-600/30">
                      {/* Message Text */}
                      <p className="text-base leading-relaxed break-words pr-14">
                        {message.text}
                      </p>

                      {/* Timestamp */}
                      <span className="absolute bottom-2 right-3 text-xs text-gray-400 opacity-80">
                        {message?.updatedAt &&
                          new Date(message.updatedAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="px-4 py-2 bg-gray-700 text-white rounded-2xl text-sm animate-pulse">
                Typing...
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="flex items-center p-6 bg-gradient-to-r from-black to-gray-900 border-t border-red-900/30 flex-shrink-0">
          <button className="text-red-400 hover:text-red-300 mr-4 p-3 hover:bg-red-900/20 rounded-full transition-all duration-200">
            <Smile className="w-7 h-7" />
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Type your message..."
              onChange={handleMessageChange}
              value={Message}
              className="w-full bg-gray-800 border border-red-900/30 rounded-full px-6 py-4 text-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          <button
            className="ml-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-full p-4 transition-all duration-200 shadow-lg hover:shadow-red-500/25 transform hover:scale-105"
            onClick={handleSendMessage}
          >
            <Send className="w-7 h-7" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
