import React from "react";
import { Briefcase, GraduationCap } from "lucide-react";

export const MentorProfileInfo = () => {
  return (
    <>
      {/* About Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About Me</h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 leading-relaxed mb-4">
            I'm a passionate software engineer with 6+ years of experience
            building scalable web applications at top tech companies. Currently,
            I lead frontend architecture at Meta's Instagram team, where I
            mentor junior developers and drive technical decisions for products
            used by billions of users.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            My expertise spans modern frontend technologies, system design, and
            engineering leadership. I've helped 80+ engineers advance their
            careers, from landing their first job to getting promoted to senior
            roles at FAANG companies.
          </p>
          <p className="text-gray-600 leading-relaxed">
            I believe in practical, hands-on mentoring that focuses on
            real-world skills and career growth. Whether you're preparing for
            technical interviews, looking to level up your skills, or planning
            your next career move, I'm here to help you succeed.
          </p>
        </div>
      </div>

      {/* Skills */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          Skills & Expertise
        </h3>
        <div className="space-y-4">
          {[
            { skill: "React & Next.js", proficiency: "95%" },
            { skill: "TypeScript", proficiency: "90%" },
            { skill: "Node.js", proficiency: "88%" },
            { skill: "System Design", proficiency: "85%" },
            { skill: "Leadership", proficiency: "92%" },
            { skill: "Product Strategy", proficiency: "87%" },
          ].map((item, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-700">{item.skill}</span>
                <span className="text-sm text-gray-500">{item.proficiency}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-teal-500 h-2 rounded-full"
                  style={{ width: item.proficiency }}
                />
              </div>
            </div>
          ))}
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
                Developed booking flow components, contributed to design system
                used across 50+ teams
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Education */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Education</h3>
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
            <p className="text-teal-600 font-medium">Stanford University</p>
            <p className="text-sm text-gray-500">2015 - 2017</p>
          </div>
        </div>
      </div>
    </>
  );
};
