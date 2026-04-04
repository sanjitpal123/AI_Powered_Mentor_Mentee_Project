import React from "react";
import { CheckCircle } from "lucide-react";

export const MentorSpecializations = () => {
  const specs = [
    "Technical Interview Preparation",
    "System Design Reviews",
    "Code Architecture & Best Practices",
    "Career Planning & Strategy",
    "Leadership & Team Management",
    "Frontend Performance Optimization",
    "React & Next.js Development",
    "Salary Negotiation",
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        I can help you with
      </h3>
      <div className="grid sm:grid-cols-2 gap-4">
        {specs.map((spec, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-3 rounded-lg bg-teal-50 hover:bg-teal-100 transition-colors"
          >
            <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0" />
            <span className="text-gray-700">{spec}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
