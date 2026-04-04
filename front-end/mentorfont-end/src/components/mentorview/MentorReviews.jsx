import React from "react";
import { Star } from "lucide-react";

export const MentorReviews = () => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  const reviews = [
    {
      name: "Sarah Chen",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      rating: 5,
      time: "2 weeks ago",
      text: "Amazing mentor! Helped me land my dream job at a FAANG company. His technical guidance and career advice were invaluable.",
    },
    {
      name: "Michael Rodriguez",
      avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      rating: 5,
      time: "1 month ago",
      text: "Incredibly knowledgeable and patient. The system design sessions completely changed how I approach technical interviews.",
    },
    {
      name: "Emily Johnson",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      rating: 5,
      time: "2 months ago",
      text: "Best investment in my career! Went from junior to senior engineer in 8 months with his guidance.",
    },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Student Reviews</h2>
        <div className="flex items-center gap-2">
          <div className="flex">{renderStars(5)}</div>
          <span className="text-lg font-semibold">4.9</span>
          <span className="text-gray-500">(127 reviews)</span>
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map((rec, index) => (
          <div key={index} className="p-6 bg-gray-50 rounded-lg">
            <div className="flex items-start gap-4">
              <img
                src={rec.avatar}
                alt={rec.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900">{rec.name}</h4>
                    <div className="flex items-center gap-2">
                      <div className="flex">{renderStars(rec.rating)}</div>
                      <span className="text-sm text-gray-500">{rec.time}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">{rec.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
