import { useContext } from "react";
import FeaturedMentor from "../components/Home/FeaturedMentor";
import HeroSection from "../components/Home/Hero";
import { GlobalContext } from "../ContextApiStore/ContextStore";

function HomePage() {
  const { countMentor } = useContext(GlobalContext);

  const categories = [
    { name: "Software Engineering", mentors: 3247, color: "bg-red-600" },
    { name: "Product Management", mentors: 1843, color: "bg-red-600" },
    { name: "Data Science & AI", mentors: 2156, color: "bg-red-600" },
    { name: "UX/UI Design", mentors: 1234, color: "bg-red-600" },
    { name: "Digital Marketing", mentors: 956, color: "bg-red-600" },
    { name: "Sales & Business", mentors: 823, color: "bg-red-600" },
    { name: "Finance & Investing", mentors: 634, color: "bg-red-600" },
    { name: "Leadership & Management", mentors: 1429, color: "bg-red-600" },
  ];

  const testimonials = [
    {
      name: "Isabella Rodriguez",
      role: "Senior Software Engineer at Google",
      content:
        "My mentor didn't just help me land my dream job at Google - they transformed how I think about my entire career trajectory. The ROI was incredible!",
      rating: 5,
    },
    {
      name: "David Kim",
      role: "Product Lead at Spotify",
      content:
        "From struggling PM to leading a team of 12 in 18 months. My mentor's real-world insights and network connections were game-changing.",
      rating: 5,
    },
    {
      name: "Priya Patel",
      role: "Design Director at Airbnb",
      content:
        "My mentor helped me negotiate a 40% salary increase and transition into design leadership. Best investment I've ever made in myself.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <HeroSection />
      <FeaturedMentor />

      {/* Success Steps Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Your Success Journey
          </h2>
          <p className="text-red-500 mb-16 text-xl">
            Transform your career in 3 powerful steps
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              "Discover Your Perfect Match",
              "Schedule & Connect",
              "Accelerate Your Growth",
            ].map((step, i) => (
              <div
                key={i}
                className="bg-white/5 rounded-2xl p-8 border border-white/10 shadow-xl"
              >
                <div className="w-16 h-16 rounded-full bg-red-600 mx-auto mb-6 flex items-center justify-center text-white text-2xl font-bold">
                  {i + 1}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  {step}
                </h3>
                <p className="text-gray-400 text-base">
                  {i === 0 &&
                    "Find mentors tailored to your industry, goals, and skills."}
                  {i === 1 &&
                    "Book flexible 1:1 sessions with top industry experts."}
                  {i === 2 &&
                    "Apply real-world insights and strategies to grow fast."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Paths */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Explore Career Paths
          </h2>
          <p className="text-xl text-red-500 mb-16">
            Find expert mentors across the most in-demand fields
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <div
                key={i}
                className="bg-white/5 rounded-2xl p-6 border border-white/10 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all"
              >
                <div
                  className={`w-12 h-12 ${cat.color} text-white text-xl font-bold rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  {cat.name.charAt(0)}
                </div>
                <h3 className="text-lg font-bold text-white mb-1">
                  {cat.name}
                </h3>
                <p className="text-sm text-gray-400">
                  {cat.mentors.toLocaleString()} mentors
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Life-Changing Results
          </h2>
          <p className="text-red-500 mb-16 text-xl">
            Real stories from professionals who transformed their careers
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white/10 p-6 rounded-2xl text-left shadow-md border border-white/10"
              >
                <div className="flex items-center mb-3">
                  {[...Array(t.rating)].map((_, idx) => (
                    <svg
                      key={idx}
                      className="w-4 h-4 text-amber-400 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034 1.07 3.292c.3.921-.755 1.688-1.54 1.118L10 13.347l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292L3.93 8.72c-.783-.57-.38-1.81.588-1.81h3.461l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-white/80 mb-4">"{t.content}"</p>
                <h4 className="font-bold text-white">{t.name}</h4>
                <p className="text-sm text-gray-400">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-r from-black to-red-900 text-center">
        <h2 className="text-5xl font-bold text-white mb-6">
          Ready to 10x Your Career?
        </h2>
        <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
          Join 50,000+ professionals accelerating their careers through expert
          mentorship.
        </p>
        <div className="flex justify-center gap-6 flex-wrap">
          <button className="bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold px-10 py-4 rounded-xl hover:scale-105 transition shadow-lg">
            Start Your Journey
          </button>
          <button className="border border-white text-white px-10 py-4 rounded-xl hover:bg-white hover:text-black transition">
            Become a Mentor
          </button>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
