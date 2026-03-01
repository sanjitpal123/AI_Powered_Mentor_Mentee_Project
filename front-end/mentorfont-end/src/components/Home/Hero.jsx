import { useContext, useEffect, useRef } from "react";
import FeaturedTag from "./FeaturesTag";
import SearchMentorInput from "./SearchMentor";
import FetchAllMentee from "../../services/GetAllMentee";
import { GlobalContext } from "../../ContextApiStore/ContextStore";
import gsap from "gsap";

function HeroSection() {
  const { setMenteeCount, menteeCount, mentorCount } =
    useContext(GlobalContext);
  const sectionRef = useRef(null);

  async function Mentee() {
    try {
      const res = await FetchAllMentee();
      setMenteeCount(res.length);
    } catch (error) {
      console.log("errorfetchmentee", error);
    }
  }

  useEffect(() => {
    Mentee();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-black text-white py-24 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-red-800/10 via-red-700/10 to-black/20 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center bg-red-900/30 border border-red-700/30 rounded-full px-6 py-2 mb-8 shadow-md">
            <svg
              className="w-4 h-4 text-red-500 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-red-300 text-sm font-medium">
              Join 50,000+ professionals accelerating their careers
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight text-white">
            Unlock Your Career{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-red-700">
              Potential
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Connect with world-class mentors from Google, Meta, Netflix & more.
            Get personalized 1:1 guidance that transforms careers and
            accelerates success.
          </p>

          <SearchMentorInput />

          <FeaturedTag />

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-500 mb-2">
                {`${menteeCount}+`}
              </div>
              <div className="text-gray-400">Active Mentees</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400 mb-2">
                {`${mentorCount}+`}
              </div>
              <div className="text-gray-400">Expert Mentors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500 mb-2">95%</div>
              <div className="text-gray-400">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">
                4.9★
              </div>
              <div className="text-gray-400">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
