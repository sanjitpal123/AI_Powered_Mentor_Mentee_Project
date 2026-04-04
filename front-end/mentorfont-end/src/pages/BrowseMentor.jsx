import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

import HeroSection from "../components/Home/Hero";
import FilterSideBar from "../components/BrowseMentor/FilterSideBar";
import { MentorCard } from "../components/BrowseMentor/MentorCard";

import { GlobalContext } from "../ContextApiStore/ContextStore";
import GetAllMentosService from "../services/GetAllmentors";
import LowToHighFiltering from "../services/Lowtohigh";
import WishListSer from "../services/AddToWishList";
import { CreateConvo } from "../services/Convo";
import { socket } from "../utils/socket";
import { ProcessTransaction } from "../utils/transactionUtils";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

function BrowseMentor() {
  const navigate = useNavigate();
  const { User, setSUser, Suser, GetMenteeProfile, filterMentors, Setpages, pages } = useContext(GlobalContext);
  const [mentors, setMentos] = useState([]);
  const [FilterByLowToHigh, setFilterByLowToHigh] = useState("");
  const [LowToHighData, setLowToHighData] = useState([]);
  const [isWishListed, setisWishListed] = useState(null);

  // Refs for animations
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const sidebarRef = useRef(null);
  const cardsRef = useRef(null);
  const loadMoreRef = useRef(null);

  async function MentorFetch() {
    try {
      const res = await GetAllMentosService();
      setMentos(res);
    } catch (error) {
      console.log("error fetching mentors");
    }
  }

  function handleSelectChange(e) {
    gsap.to(e.target, {
      scale: 0.98,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.out",
    });
    setFilterByLowToHigh(e.target.value);
  }

  useEffect(() => {
    MentorFetch();
  }, []);

  async function FilterLowToHigh() {
    try {
      const res = await LowToHighFiltering();
      setLowToHighData(res);
    } catch (error) {
      console.log("error filtering", error);
    }
  }

  useEffect(() => {
    if (FilterByLowToHigh === "Price: Low to High") {
      FilterLowToHigh();
    }
  }, [FilterByLowToHigh]);

  const filteredMentors = filterMentors.length > 0 ? filterMentors : mentors;
  const Lowtohigh = LowToHighData.length > 0 ? LowToHighData : filteredMentors;

  // Initial page animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to("html", { scrollBehavior: "smooth" });

      const tl = gsap.timeline();
      tl.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power2.out" }
      )
        .fromTo(
          headerRef.current,
          { y: -50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          sidebarRef.current,
          { x: -100, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.6"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Animate mentor cards when they appear
  useEffect(() => {
    if (Lowtohigh.length > 0) {
      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 80, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }
  }, [Lowtohigh]);

  const handleButtonClick = async (e, mentorid) => {
    if (!mentorid) return;
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await WishListSer(mentorid, user?.token);
      setisWishListed(res);
    } catch (error) {
      console.log("error adding to wishlist", error);
    }
  };

  const NavigateToChat = async (e, mentorId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await CreateConvo(mentorId, user?.token);
      ProcessTransaction(e, res, navigate);
    } catch (error) {
      console.log("error creating convo", error);
      if (error?.response?.data?.existed?._id) {
        navigate(`/chat/${error.response.data.existed._id}`);
      }
    }
  };

  useEffect(() => {
    const handleStatusUpdate = () => console.log("status updated");
    const handleTaskNotification = () => console.log("task updated");

    socket.on("StatusUpdateOfSession", handleStatusUpdate);
    socket.on("NotifyingAboutTask", handleTaskNotification);

    return () => {
      socket.off("StatusUpdateOfSession", handleStatusUpdate);
      socket.off("NotifyingAboutTask", handleTaskNotification);
    };
  }, []);

  useEffect(() => {
    GetMenteeProfile();
    MentorFetch();
  }, [isWishListed]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050505]">
      <HeroSection />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div ref={sidebarRef} className="w-[20%]">
            <FilterSideBar />
          </div>

          {/* Main Content */}
          <div className="flex flex-row ml-[10%] w-[80%] max-h-[180vh] overflow-x-scroll scrollbar-hidden">
            <div className="w-full">
              {/* Results Header */}
              <div
                ref={headerRef}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6"
              >
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2 relative overflow-hidden">
                    <span className="inline-block">
                      {mentors.length} mentors available
                    </span>
                  </h2>
                  <p className="text-gray-400">Showing results for all mentors</p>
                </div>
                <div className="mt-4 sm:mt-0">
                  <select
                    className="px-4 py-2 bg-gray-900 border border-red-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300 hover:bg-gray-800 cursor-pointer"
                    value={FilterByLowToHigh}
                    onChange={handleSelectChange}
                  >
                    <option className="bg-gray-900 text-white">Sort by: Recommended</option>
                    <option className="bg-[#050505] text-white">Highest Rated</option>
                    <option className="bg-[#050505] text-white">Most Reviews</option>
                    <option className="bg-[#050505] text-white">Price: Low to High</option>
                    <option className="bg-[#050505] text-white">Price: High to Low</option>
                  </select>
                </div>
              </div>

              {/* Mentor Cards Grid */}
              <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full pr-4">
                {Lowtohigh?.map((mentor) => (
                  <MentorCard
                    key={mentor._id || mentor.id}
                    mentor={mentor}
                    Suser={Suser}
                    handleButtonClick={handleButtonClick}
                    NavigateToChat={NavigateToChat}
                  />
                ))}
              </div>

              {/* Load More */}
              <div ref={loadMoreRef} className="text-center mt-8">
                <button
                  className="px-8 py-3 bg-[#0a0a0a] border border-white/10 text-white rounded-xl hover:bg-red-600 hover:border-red-600 transition-all duration-500 font-medium shadow-lg transform hover:-translate-y-1 relative overflow-hidden group"
                  onClick={() => Setpages(pages + 1)}
                >
                  <span className="relative z-10">Load More Mentors</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrowseMentor;
