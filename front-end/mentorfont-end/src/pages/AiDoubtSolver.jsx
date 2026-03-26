import React, { useContext, useState } from "react";
import {
  Send,
  Bot,
  User,
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
  const messages = [];
  const { User } = useContext(GlobalContext);
  const [Query, setQuery] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  async function send(query) {
    try {
      const respon = await SendMessageAndGetAnswer(query, user.token);
      console.log("response getting after sending chat", respon);
    } catch (error) {
      throw error;
    }
  }
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex flex-col h-screen max-w-4xl mx-auto">
        {/* Header */}
        <header className="p-6 border-b border-gray-800">
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
              className={`flex items-start space-x-4 ${
                message.type === "user"
                  ? "flex-row-reverse space-x-reverse"
                  : ""
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  message.type === "user"
                    ? "bg-red-600"
                    : "bg-gray-700 border border-red-600"
                }`}
              >
                {message.type === "user" ? (
                  <User className="w-5 h-5 text-white" />
                ) : (
                  <Bot className="w-5 h-5 text-red-400" />
                )}
              </div>

              <div
                className={`max-w-md ${
                  message.type === "user" ? "ml-auto" : "mr-auto"
                }`}
              >
                <div
                  className={`px-4 py-3 rounded-2xl ${
                    message.type === "user"
                      ? "bg-red-600 text-white"
                      : "bg-gray-800 border border-gray-700 text-gray-100"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
                <div
                  className={`mt-2 text-xs text-gray-500 ${
                    message.type === "user" ? "text-right" : "text-left"
                  }`}
                >
                  {message.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-6 border-t border-gray-800">
          <div className="flex items-end space-x-4">
            <div className="flex-1">
              <textarea
                placeholder="Ask me about mentoring strategies..."
                rows="1"
                className="w-full bg-gray-800 border border-gray-700 focus:border-red-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 resize-none focus:outline-none"
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
