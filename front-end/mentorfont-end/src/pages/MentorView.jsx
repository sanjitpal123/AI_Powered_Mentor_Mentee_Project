import React from "react";
import {
  Star,
  MapPin,
  Clock,
  CheckCircle,
  Heart,
  Share2,
  Globe,
  Linkedin,
  Twitter,
  Github,
} from "lucide-react";

import {
  MentorProfileInfo,
  MentorSpecializations,
  MentorSidebar,
  MentorReviews,
} from "../components/mentorview";

function MentorView() {
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Profile Image & Basic Info */}
            <div className="flex flex-col sm:flex-row gap-6 lg:gap-8">
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2"
                  alt="Mentor Profile"
                  className="w-32 h-32 lg:w-40 lg:h-40 rounded-full object-cover shadow-lg"
                />
                <div className="absolute -bottom-2 -right-2 bg-teal-500 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                      Alex Thompson
                    </h1>
                    <p className="text-xl text-gray-600 mb-3">
                      Senior Software Engineer at Meta
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        San Francisco, CA
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Usually responds in 2 hours
                      </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-3 mb-4">
                      <button className="p-2 rounded-full bg-gray-100 hover:bg-teal-100 transition-colors">
                        <Linkedin className="w-4 h-4 text-gray-600 hover:text-teal-600" />
                      </button>
                      <button className="p-2 rounded-full bg-gray-100 hover:bg-teal-100 transition-colors">
                        <Twitter className="w-4 h-4 text-gray-600 hover:text-teal-600" />
                      </button>
                      <button className="p-2 rounded-full bg-gray-100 hover:bg-teal-100 transition-colors">
                        <Github className="w-4 h-4 text-gray-600 hover:text-teal-600" />
                      </button>
                      <button className="p-2 rounded-full bg-gray-100 hover:bg-teal-100 transition-colors">
                        <Globe className="w-4 h-4 text-gray-600 hover:text-teal-600" />
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="p-2 rounded-full border border-gray-300 hover:bg-teal-50 hover:border-teal-300 transition-colors">
                      <Heart className="w-5 h-5 text-gray-600 hover:text-teal-600" />
                    </button>
                    <button className="p-2 rounded-full border border-gray-300 hover:bg-teal-50 hover:border-teal-300 transition-colors">
                      <Share2 className="w-5 h-5 text-gray-600 hover:text-teal-600" />
                    </button>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      {renderStars(5)}
                    </div>
                    <p className="text-2xl font-bold text-gray-900">4.9</p>
                    <p className="text-sm text-gray-500">Rating</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-teal-600">127</p>
                    <p className="text-sm text-gray-500">Sessions</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-teal-600">89</p>
                    <p className="text-sm text-gray-500">Students</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">6+</p>
                    <p className="text-sm text-gray-500">Years Exp</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <MentorProfileInfo />
            <MentorSpecializations />
            <MentorReviews />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <MentorSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MentorView;
