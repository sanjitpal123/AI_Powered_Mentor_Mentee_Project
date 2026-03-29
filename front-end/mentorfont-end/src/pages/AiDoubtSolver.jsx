import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Send,
  Bot,
  Users,
  Target,
  Lightbulb,
  Award,
  BookOpen,
  HelpCircle,
  Brain,
} from "lucide-react";
import SendMessageAndGetAnswer from "../services/AiSolver";
import { GlobalContext } from "../ContextApiStore/ContextStore";

const AiDoubtSolverUI = () => {
  const { User } = useContext(GlobalContext);
  const [Query, setQuery] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const [messages, setMessages] = useState([]);
  const myRef = useRef(null);
  const executeScroll = () =>
    myRef?.current?.scrollIntoView({ behavior: "smooth" });

  async function send(query) {
    if (!query.trim()) return;

    try {
      const humanmessage = {
        id: Date.now(),
        type: "user",
        message: query,
      };

      setMessages((prev) => [...prev, humanmessage]);
      setQuery("");

      const respon = await SendMessageAndGetAnswer(query, user.token);

      const aimessage = {
        id: Date.now() + 1,
        type: "ai",
        message: respon?.message || "No response",
      };
      console.log("ai mesage", aimessage);

      setMessages((prev) => [...prev, aimessage]);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    executeScroll();
  }, [messages]);
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="flex flex-col h-screen max-w-4xl mx-auto">
        {/* Header */}
        <header className="p-6 border-b border-white/5">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Doubt Solver</h1>
              <p className="text-gray-400 text-sm">
                Your intelligent mentoring assistant
              </p>
            </div>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages?.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-4 ${message.type === "user"
                  ? "flex-row-reverse space-x-reverse"
                  : ""
                }`}
            >
              <div
                className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center ${message.type === "user"
                    ? "bg-red-600"
                    : "bg-[#111111] border border-white/10"
                  }`}
              >
                {message.type === "user" ? (
                  <Bot className="w-5 h-5 text-white" />
                ) : (
                  <Bot className="w-5 h-5 text-red-400" />
                )}
              </div>

              <div
                className={`max-w-md ${message.type === "user" ? "ml-auto" : "mr-auto"
                  }`}
                ref={myRef}
              >
                <div
                  className={`px-4 py-3 rounded-2xl ${message.type === "user"
                      ? "bg-red-600 text-white shadow-md shadow-red-900/20"
                      : "bg-[#111111] border border-white/10 text-gray-200"
                    }`}
                >
                  <p className="text-sm leading-relaxed">{message.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-6 border-t border-white/5 bg-[#050505] pb-8">
          <div className="flex items-end space-x-4">
            <div className="flex-1">
              <textarea
                placeholder="Ask me anything..."
                rows="1"
                className="w-full bg-[#0a0a0a] border border-white/10 focus:border-red-600 focus:ring-1 focus:ring-red-600/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 resize-none focus:outline-none transition-colors overflow-hidden"
                style={{ minHeight: "48px" }}
                value={Query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <button
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              onClick={() => send(Query)}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-3 text-xs text-gray-500">
            Press Enter to send • Shift + Enter for new line
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiDoubtSolverUI;
