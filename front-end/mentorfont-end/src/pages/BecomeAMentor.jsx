import React from "react";
import {
  ArrowRight,
  Star,
  Users,
  TrendingUp,
  Award,
  Clock,
  DollarSign,
  CheckCircle,
  MessageSquare,
  Globe,
  Shield,
  BookOpen,
  Target,
  Zap,
  ChevronDown,
  ChevronUp,
  User,
  Mail,
  Phone,
  Briefcase,
} from "lucide-react";

const faqs = [
  {
    question: "How much can I earn as a mentor?",
    answer:
      "Our mentors earn between $50-$200 per hour depending on their expertise and experience. Top mentors make over $5,000 per month.",
  },
  {
    question: "What qualifications do I need?",
    answer:
      "We look for professionals with 3+ years of industry experience, strong communication skills, and a passion for helping others grow.",
  },
  {
    question: "How does the application process work?",
    answer:
      "After submitting your application, we'll review your profile within 2-3 business days. If approved, you'll complete a brief interview and background check.",
  },
  {
    question: "Can I mentor part-time?",
    answer:
      "Absolutely! Most of our mentors work part-time, setting their own schedule and availability. You have complete control over your mentoring hours.",
  },
];

function BecomeMentor() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Hero Section */}
      <section className="text-center py-20 bg-black">
        <h2 className="text-4xl font-extrabold mb-4">
          Share Your Expertise.{" "}
          <span className="text-red-500">Inspire Growth.</span>
        </h2>
        <p className="text-lg text-gray-300 max-w-xl mx-auto mb-8">
          Join a thriving community of mentors empowering the next generation of
          talent. Set your own schedule, earn income, and make a lasting impact.
        </p>
        <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full flex items-center mx-auto shadow-lg">
          Get Started <ArrowRight className="ml-2 w-5 h-5" />
        </button>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center bg-black">
        <div>
          <Users className="w-10 h-10 mx-auto text-red-500" />
          <h3 className="text-xl font-semibold mt-4">1,200+ Mentors</h3>
          <p className="text-gray-400">
            From top companies like Google, Meta, and Amazon.
          </p>
        </div>
        <div>
          <Star className="w-10 h-10 mx-auto text-yellow-400" />
          <h3 className="text-xl font-semibold mt-4">4.9/5 Rating</h3>
          <p className="text-gray-400">
            Average mentee rating across all sessions.
          </p>
        </div>
        <div>
          <TrendingUp className="w-10 h-10 mx-auto text-green-500" />
          <h3 className="text-xl font-semibold mt-4">$2M+ Earned</h3>
          <p className="text-gray-400">
            In payouts to our amazing mentors last year.
          </p>
        </div>
      </section>

      {/* Why Mentor */}
      <section className="py-20 px-6 bg-black border-t border-white/10">
        <h2 className="text-3xl font-bold text-center text-red-500 mb-12">
          Why Mentor With Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: Award,
              title: "Build Your Brand",
              desc: "Get featured, grow your online presence, and establish credibility as an industry expert.",
            },
            {
              icon: Clock,
              title: "Flexible Hours",
              desc: "Work on your own terms. Set availability that fits your schedule.",
            },
            {
              icon: DollarSign,
              title: "Earn Income",
              desc: "Monetize your knowledge and get paid for each session you conduct.",
            },
            {
              icon: CheckCircle,
              title: "Curated Matches",
              desc: "We connect you with mentees aligned to your skills and interests.",
            },
            {
              icon: MessageSquare,
              title: "Engaging Community",
              desc: "Join a network of passionate mentors exchanging ideas and advice.",
            },
            {
              icon: Globe,
              title: "Global Reach",
              desc: "Make an impact on mentees from around the world.",
            },
          ].map(({ icon: Icon, title, desc }, index) => (
            <div
              key={index}
              className="bg-white/5 p-6 rounded-lg shadow hover:shadow-xl border border-white/10 transition"
            >
              <Icon className="w-8 h-8 text-red-500 mb-4" />
              <h4 className="text-lg font-semibold mb-2 text-white">{title}</h4>
              <p className="text-gray-400">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-gradient-to-b from-black via-zinc-900 to-black">
        <h2 className="text-3xl font-bold text-center mb-12 text-red-500">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
          {[
            {
              icon: Shield,
              title: "Apply Online",
              desc: "Tell us about your background, experience, and motivation to mentor.",
            },
            {
              icon: BookOpen,
              title: "Onboarding",
              desc: "Complete a short training and set up your profile and availability.",
            },
            {
              icon: Target,
              title: "Start Mentoring",
              desc: "Get matched with mentees and begin making a difference.",
            },
          ].map(({ icon: Icon, title, desc }, index) => (
            <div
              key={index}
              className="bg-white/5 p-6 rounded-lg shadow border border-white/10"
            >
              <Icon className="w-8 h-8 text-red-500 mb-4 mx-auto" />
              <h4 className="text-xl font-semibold mb-2 text-white">{title}</h4>
              <p className="text-gray-400">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 px-6 bg-black border-t border-white/10">
        <h2 className="text-3xl font-bold text-center mb-12 text-red-500">
          Apply to Become a Mentor
        </h2>
        <form className="max-w-4xl mx-auto bg-white/5 p-8 rounded-lg shadow border border-white/10 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "First Name", name: "firstName", icon: User },
              { label: "Last Name", name: "lastName", icon: User },
              { label: "Email", name: "email", icon: Mail },
              { label: "Phone Number", name: "phone", icon: Phone },
              {
                label: "Years of Experience",
                name: "experience",
                icon: Briefcase,
              },
              { label: "Area of Expertise", name: "expertise", icon: Zap },
              { label: "Current Company", name: "company", icon: Briefcase },
              { label: "LinkedIn Profile URL", name: "linkedIn", icon: Globe },
            ].map(({ label, name, icon: Icon }) => (
              <div key={name}>
                <label className="block mb-1 font-semibold text-white">
                  {label}
                </label>
                <div className="flex items-center border border-gray-600 rounded px-3 py-2 bg-black">
                  <Icon className="w-4 h-4 text-red-500 mr-2" />
                  <input
                    type="text"
                    name={name}
                    className="w-full outline-none bg-black text-white placeholder-gray-400"
                    placeholder={label}
                    required
                  />
                </div>
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full flex items-center mx-auto"
          >
            Submit Application <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </form>
      </section>

      {/* FAQs */}
      <section className="py-20 px-6 bg-black">
        <h2 className="text-3xl font-bold text-center mb-10 text-red-500">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-white/10 rounded-lg p-4 bg-white/5"
            >
              <button className="flex justify-between items-center w-full text-left">
                <span className="font-semibold text-white">{faq.question}</span>
                {index === 0 ? (
                  <ChevronDown className="w-5 h-5 text-red-500" />
                ) : (
                  <ChevronUp className="w-5 h-5 text-red-500" />
                )}
              </button>
              {index !== 0 && (
                <p className="mt-2 text-gray-400">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default BecomeMentor;
