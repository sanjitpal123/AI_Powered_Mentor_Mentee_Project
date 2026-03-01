import React from "react";
import {
  Star,
  MapPin,
  Calendar,
  Clock,
  Users,
  MessageCircle,
  Video,
  CheckCircle,
  Award,
  Briefcase,
  GraduationCap,
  Heart,
  Share2,
  Globe,
  Linkedin,
  Twitter,
  Github,
} from "lucide-react";

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
            {/* About Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                About Me
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed mb-4">
                  I'm a passionate software engineer with 6+ years of experience
                  building scalable web applications at top tech companies.
                  Currently, I lead frontend architecture at Meta's Instagram
                  team, where I mentor junior developers and drive technical
                  decisions for products used by billions of users.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  My expertise spans modern frontend technologies, system
                  design, and engineering leadership. I've helped 80+ engineers
                  advance their careers, from landing their first job to getting
                  promoted to senior roles at FAANG companies.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  I believe in practical, hands-on mentoring that focuses on
                  real-world skills and career growth. Whether you're preparing
                  for technical interviews, looking to level up your skills, or
                  planning your next career move, I'm here to help you succeed.
                </p>
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Skills & Expertise
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-700">
                      React & Next.js
                    </span>
                    <span className="text-sm text-gray-500">95%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-teal-500 h-2 rounded-full w-[95%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-700">
                      TypeScript
                    </span>
                    <span className="text-sm text-gray-500">90%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-teal-500 h-2 rounded-full w-[90%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-700">Node.js</span>
                    <span className="text-sm text-gray-500">88%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-teal-500 h-2 rounded-full w-[88%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-700">
                      System Design
                    </span>
                    <span className="text-sm text-gray-500">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-teal-500 h-2 rounded-full w-[85%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-700">
                      Leadership
                    </span>
                    <span className="text-sm text-gray-500">92%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-teal-500 h-2 rounded-full w-[92%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-700">
                      Product Strategy
                    </span>
                    <span className="text-sm text-gray-500">87%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-teal-500 h-2 rounded-full w-[87%]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Specializations */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                I can help you with
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-teal-50 hover:bg-teal-100 transition-colors">
                  <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0" />
                  <span className="text-gray-700">
                    Technical Interview Preparation
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-teal-50 hover:bg-teal-100 transition-colors">
                  <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0" />
                  <span className="text-gray-700">System Design Reviews</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-teal-50 hover:bg-teal-100 transition-colors">
                  <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0" />
                  <span className="text-gray-700">
                    Code Architecture & Best Practices
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-teal-50 hover:bg-teal-100 transition-colors">
                  <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0" />
                  <span className="text-gray-700">
                    Career Planning & Strategy
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-teal-50 hover:bg-teal-100 transition-colors">
                  <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0" />
                  <span className="text-gray-700">
                    Leadership & Team Management
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-teal-50 hover:bg-teal-100 transition-colors">
                  <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0" />
                  <span className="text-gray-700">
                    Frontend Performance Optimization
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-teal-50 hover:bg-teal-100 transition-colors">
                  <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0" />
                  <span className="text-gray-700">
                    React & Next.js Development
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-teal-50 hover:bg-teal-100 transition-colors">
                  <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0" />
                  <span className="text-gray-700">Salary Negotiation</span>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Professional Experience
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4 pb-6 border-b border-gray-100">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-teal-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Senior Software Engineer
                    </h3>
                    <p className="text-teal-600 font-medium mb-1">Meta</p>
                    <p className="text-sm text-gray-500 mb-3">2021 - Present</p>
                    <p className="text-gray-600">
                      Leading frontend architecture for Instagram web platform,
                      mentoring 8+ junior developers
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 pb-6 border-b border-gray-100">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-teal-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Software Engineer
                    </h3>
                    <p className="text-teal-600 font-medium mb-1">Google</p>
                    <p className="text-sm text-gray-500 mb-3">2019 - 2021</p>
                    <p className="text-gray-600">
                      Built scalable web applications for Google Cloud Console,
                      improved performance by 40%
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-teal-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Frontend Engineer
                    </h3>
                    <p className="text-teal-600 font-medium mb-1">Airbnb</p>
                    <p className="text-sm text-gray-500 mb-3">2017 - 2019</p>
                    <p className="text-gray-600">
                      Developed booking flow components, contributed to design
                      system used across 50+ teams
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Student Reviews
                </h2>
                <div className="flex items-center gap-2">
                  <div className="flex">{renderStars(5)}</div>
                  <span className="text-lg font-semibold">4.9</span>
                  <span className="text-gray-500">(127 reviews)</span>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-6 bg-gray-50 rounded-lg">
                  <div className="flex items-start gap-4">
                    <img
                      src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2"
                      alt="Sarah Chen"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            Sarah Chen
                          </h4>
                          <div className="flex items-center gap-2">
                            <div className="flex">{renderStars(5)}</div>
                            <span className="text-sm text-gray-500">
                              2 weeks ago
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        Amazing mentor! Helped me land my dream job at a FAANG
                        company. His technical guidance and career advice were
                        invaluable.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gray-50 rounded-lg">
                  <div className="flex items-start gap-4">
                    <img
                      src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2"
                      alt="Michael Rodriguez"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            Michael Rodriguez
                          </h4>
                          <div className="flex items-center gap-2">
                            <div className="flex">{renderStars(5)}</div>
                            <span className="text-sm text-gray-500">
                              1 month ago
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        Incredibly knowledgeable and patient. The system design
                        sessions completely changed how I approach technical
                        interviews.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gray-50 rounded-lg">
                  <div className="flex items-start gap-4">
                    <img
                      src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2"
                      alt="Emily Johnson"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            Emily Johnson
                          </h4>
                          <div className="flex items-center gap-2">
                            <div className="flex">{renderStars(5)}</div>
                            <span className="text-sm text-gray-500">
                              2 months ago
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        Best investment in my career! Went from junior to senior
                        engineer in 8 months with his guidance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 sticky top-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Book a Session
              </h3>

              <div className="space-y-4 mb-6">
                <div className="p-4 border border-gray-200 rounded-lg hover:border-teal-300 hover:shadow-sm transition-all cursor-pointer group">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
                      1-on-1 Mentoring
                    </h4>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">$150</p>
                      <p className="text-sm text-gray-500">60 min</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Deep dive into your career goals, technical challenges, and
                    personalized roadmap
                  </p>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg hover:border-teal-300 hover:shadow-sm transition-all cursor-pointer group">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
                      Code Review
                    </h4>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">$100</p>
                      <p className="text-sm text-gray-500">45 min</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Detailed review of your code with actionable feedback and
                    best practices
                  </p>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg hover:border-teal-300 hover:shadow-sm transition-all cursor-pointer group">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
                      Mock Interview
                    </h4>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">$200</p>
                      <p className="text-sm text-gray-500">90 min</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    System design or coding interview practice with detailed
                    feedback
                  </p>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg hover:border-teal-300 hover:shadow-sm transition-all cursor-pointer group">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
                      Career Strategy
                    </h4>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">$75</p>
                      <p className="text-sm text-gray-500">30 min</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Quick consultation on career moves, salary negotiation, or
                    job search strategy
                  </p>
                </div>
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
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Quick Stats
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Response Time</span>
                  <span className="font-semibold text-teal-600">2 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Success Rate</span>
                  <span className="font-semibold text-teal-600">96%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Repeat Students</span>
                  <span className="font-semibold text-teal-600">74%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Available Hours</span>
                  <span className="font-semibold text-gray-900">
                    20+ hrs/week
                  </span>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Education
              </h3>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-teal-600" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    Master of Science in Computer Science
                  </h4>
                  <p className="text-teal-600 font-medium">
                    Stanford University
                  </p>
                  <p className="text-sm text-gray-500">2015 - 2017</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MentorView;
