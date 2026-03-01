import React, { useState, useRef, useEffect } from "react";
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

const AiDoubtSolver = () => {
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      content:
        "Welcome to MentorAI! I'm your intelligent mentoring assistant. What mentoring challenge can I help you with today?",
      timestamp: "10:30 AM",
    },
    {
      id: 2,
      type: "user",
      content:
        "I'm struggling with how to motivate a mentee who seems disengaged in our sessions",
      timestamp: "10:32 AM",
    },
    {
      id: 3,
      type: "ai",
      content:
        "That's a common mentoring challenge! Disengagement often stems from unclear goals or mismatched expectations. Let me provide you with proven strategies to re-energize your mentoring relationship.",
      timestamp: "10:33 AM",
    },
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickActions = [
    { icon: Users, text: "Mentee Engagement" },
    { icon: Target, text: "Goal Setting" },
    { icon: Lightbulb, text: "Solution Strategies" },
    { icon: Award, text: "Performance Tips" },
    { icon: BookOpen, text: "Learning Plans" },
    { icon: HelpCircle, text: "Quick Advice" },
  ];

  const handleSend = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: "user",
        content: inputValue,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, newMessage]);
      setInputValue("");
      setIsTyping(true);

      setTimeout(() => {
        const aiResponse = {
          id: messages.length + 2,
          type: "ai",
          content:
            "I understand your mentoring concern! Let me provide you with a comprehensive solution with actionable strategies and best practices.",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setMessages((prev) => [...prev, aiResponse]);
        setIsTyping(false);
      }, 1500);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickAction = (actionText) => {
    setInputValue(`Help me with ${actionText.toLowerCase()}`);
  };

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
              <h1 className="text-2xl font-bold text-white">MentorAI</h1>
              <p className="text-gray-400 text-sm">
                Your intelligent mentoring assistant
              </p>
            </div>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((message) => (
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

          {isTyping && (
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gray-700 border border-red-600 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-red-400" />
              </div>
              <div className="bg-gray-800 border border-gray-700 rounded-2xl px-4 py-3">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="px-6 py-4 border-t border-gray-800">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => handleQuickAction(action.text)}
                className="p-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-red-600 rounded-lg transition-colors group"
              >
                <div className="flex flex-col items-center space-y-2">
                  <action.icon className="w-5 h-5 text-gray-400 group-hover:text-red-400" />
                  <span className="text-xs text-gray-400 group-hover:text-red-400 text-center">
                    {action.text}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-6 border-t border-gray-800">
          <div className="flex items-end space-x-4">
            <div className="flex-1">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about mentoring strategies..."
                rows="1"
                className="w-full bg-gray-800 border border-gray-700 focus:border-red-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 resize-none focus:outline-none"
                style={{ minHeight: "48px" }}
              />
            </div>
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="bg-red-600 hover:bg-red-700 disabled:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
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

export default AiDoubtSolver;
