import React from "react";
import { Calendar, MessageCircle, Award, Users } from "lucide-react";

export const MentorSidebar = () => {
  return (
    <>
      {/* Booking Card */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 sticky top-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Book a Session</h3>

        <div className="space-y-4 mb-6">
          {[
            {
              title: "1-on-1 Mentoring",
              price: "$150",
              duration: "60 min",
              desc: "Deep dive into your career goals, technical challenges, and personalized roadmap",
            },
            {
              title: "Code Review",
              price: "$100",
              duration: "45 min",
              desc: "Detailed review of your code with actionable feedback and best practices",
            },
            {
              title: "Mock Interview",
              price: "$200",
              duration: "90 min",
              desc: "System design or coding interview practice with detailed feedback",
            },
            {
              title: "Career Strategy",
              price: "$75",
              duration: "30 min",
              desc: "Quick consultation on career moves, salary negotiation, or job search strategy",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg hover:border-teal-300 hover:shadow-sm transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
                  {item.title}
                </h4>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">{item.price}</p>
                  <p className="text-sm text-gray-500">{item.duration}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <button className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-teal-700 transition-colors flex items-center justify-center gap-2">
            <Calendar className="w-5 h-5" />
            Schedule Session
          </button>
          <button className="w-full border border-teal-600 text-teal-600 py-3 px-4 rounded-lg font-semibold hover:bg-teal-50 transition-colors flex items-center justify-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Send Message
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-5 h-5 text-yellow-500" />
            <span className="text-sm font-medium text-gray-700">
              Top Mentor Badge
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-teal-500" />
            <span className="text-sm text-gray-600">
              89 mentees helped successfully
            </span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mt-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h3>
        <div className="space-y-4">
          {[
            { label: "Response Time", value: "2 hours", valueClass: "text-teal-600" },
            { label: "Success Rate", value: "96%", valueClass: "text-teal-600" },
            { label: "Repeat Students", value: "74%", valueClass: "text-teal-600" },
            { label: "Available Hours", value: "20+ hrs/week", valueClass: "text-gray-900" },
          ].map((stat, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-gray-600">{stat.label}</span>
              <span className={`font-semibold ${stat.valueClass}`}>
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
