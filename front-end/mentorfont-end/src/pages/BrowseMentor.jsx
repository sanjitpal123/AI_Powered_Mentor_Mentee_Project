import React, { useContext, useEffect, useState, useRef } from "react";
import {
  Search,
  Filter,
  Star,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Code,
  Briefcase,
  Palette,
  ChevronDown,
  Heart,
  MessageCircle,
} from "lucide-react";
import HeroSection from "../components/Home/Hero";
import GetAllMentosService from "../services/GetAllmentors";
import FilterSideBar from "../components/BrowseMentor/FilterSideBar";
import { GlobalContext } from "../ContextApiStore/ContextStore";
import LowToHighFiltering from "../services/Lowtohigh";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import WishListSer from "../services/AddToWishList";
import { Link, useNavigate } from "react-router-dom";
import { CreateConvo } from "../services/Convo";
import { socket } from "../utils/socket";
import CreatePayment from "../services/Payment";
// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

function BrowseMentor() {
  const navigate = useNavigate();
  const { User, setSUser, Suser, GetMenteeProfile } = useContext(GlobalContext);
  const { filterMentors, Setpages, pages } = useContext(GlobalContext);
  const [mentors, setMentos] = useState([]);
  const [FilterByLowToHigh, setFilterByLowToHigh] = useState("");
  const [LowToHighData, setLowToHighData] = useState([]);
  const [isWishListed, setisWishListed] = useState(null);
  const LoginUser = JSON.parse(localStorage.getItem("user"));

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
      console.log("error");
    }
  }

  function handleSelectChange(e) {
    // Animate dropdown selection
    gsap.to(e.target, {
      scale: 0.98,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.out",
    });

    console.log("er", e.target.value);
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
      console.log("error", error);
    }
  }

  useEffect(() => {
    if (FilterByLowToHigh == "Price: Low to High") {
      FilterLowToHigh();
      console.log("low", LowToHighData);
    }
  }, [FilterByLowToHigh]);

  const filteredMentors = filterMentors.length > 0 ? filterMentors : mentors;
  const Lowtohigh = LowToHighData.length > 0 ? LowToHighData : filteredMentors;

  useEffect(() => {
    console.log("low", Lowtohigh);
  }, [LowToHighData]);

  // Initial page animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth scrolling
      gsap.to("html", {
        scrollBehavior: "smooth",
      });

      // Initial load animation
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
          {
            y: 80,
            opacity: 0,
            scale: 0.9,
          },
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

  // Button click animation
  const handleButtonClick = async (e, mentorid) => {
    // const button = e.currentTarget;
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("token before action to add fav", user);
      console.log("mentorid before action to add fav", mentorid);

      const res = await WishListSer(mentorid, user.token);
      setisWishListed(res);
      console.log("wishlisted", res);
    } catch (error) {
      console.log("error", error);
    }
    // gsap.to(button, {
    //   scale: 0.95,
    //   duration: 0.1,
    //   ease: "power2.out",
    //   onComplete: () => {
    //     gsap.to(button, {
    //       scale: 1,
    //       duration: 0.1,
    //       ease: "power2.out",
    //     });
    //   },
    // });

    // const ripple = document.createElement("span");
    // const rect = button.getBoundingClientRect();
    // const size = Math.max(rect.width, rect.height);
    // const x = e.clientX - rect.left - size / 2;
    // const y = e.clientY - rect.top - size / 2;

    // ripple.style.cssText = `
    //   position: absolute;
    //   width: ${size}px;
    //   height: ${size}px;
    //   left: ${x}px;
    //   top: ${y}px;
    //   background: rgba(239, 68, 68, 0.3);
    //   border-radius: 50%;
    //   transform: scale(0);
    //   pointer-events: none;
    // `;

    // button.style.position = "relative";
    // button.style.overflow = "hidden";
    // button.appendChild(ripple);

    // gsap.to(ripple, {
    //   scale: 2,
    //   opacity: 0,
    //   duration: 0.6,
    //   ease: "power2.out",
    //   onComplete: () => ripple.remove(),
    // });

    // if (callback) callback();
  };

  // create convo and navigate to chat

  // before navigate to chat we should conform that user paid

  async function Transaction(e, res) {
    e.preventDefault();

    try {
      const data = {
        amount: 500,
        currency: "INR",
        receipt: "lsd212",
      };
      const res = await CreatePayment(data);

      console.log("resonse to pay ", res);

      var options = {
        key: "rzp_test_RPjlXkYi5KcmkQ", // Enter the Key ID generated from the Dashboard
        amount: data.amount, // Amount is in currency subunits.
        currency: data.currency,
        name: "Acme Corp", //your business name
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: res.order.id || res.order._id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: function (response) {
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature);
        },
        prefill: {
          //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
          name: "sanjit Kumar", //your customer's name
          email: "gaurav.kumar@example.com",
          contact: "+928848488382", //Provide the customer's phone number for better conversion rates
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#E43737",
        },
      };
      var rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });
      rzp1.open();
      if (res.status) {
        navigate(`/chat/${res.generateConvo._id}`);
      }
    } catch (error) {
      console.log("error to pay money", error);
    }
  }

  const user = JSON.parse(localStorage.getItem("user"));
  async function NavigateToChat(e, mentorId) {
    try {
      const res = await CreateConvo(mentorId, user.token);
      console.log("responsive while creating convo in navigatetochat");
      Transaction(e, res);
    } catch (error) {
      console.log("error in responsive while creating", error);

      navigate(`/chat/${error.response.data.existed._id}`);
    }
  }

  useEffect(() => {
    const handleStatusUpdate = () => {
      console.log("status is updated from mentor");
    };
    const handleTaskNotification = () => {
      console.log("status is updated from mentor");
    };

    // attach socket listener
    socket.on("StatusUpdateOfSession", handleStatusUpdate);

    // listen for task
    socket.on("NotifyingAboutTask", handleTaskNotification);

    // start timer

    // cleanup both socket listener & timer
    return () => {
      socket.off("StatusUpdateOfSession", handleStatusUpdate);
      socket.off("NotifyingAboutTask", handleTaskNotification);
    };
  }, [socket]);

  useEffect(() => {
    GetMenteeProfile();
    MentorFetch();
    console.log("user", Suser);
  }, [isWishListed]);

  return (
    <div ref={containerRef} className="min-h-screen bg-black">
      {/* Header Banner */}
      <HeroSection />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row  gap-8">
          {/* Sidebar */}
          <div ref={sidebarRef} className="w-[20%]">
            <FilterSideBar />
          </div>

          {/* Main Content */}
          <div className="flex flex-row ml-[10%] w-[80%] max-h-[180vh] overflow-x-scroll scrollbar-hidden">
            <div className="">
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
                  <p className="text-gray-400">
                    Showing results for all mentors
                  </p>
                </div>
                <div className="mt-4 sm:mt-0">
                  <select
                    className="px-4 py-2 bg-gray-900 border border-red-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300 hover:bg-gray-800 cursor-pointer"
                    value={FilterByLowToHigh}
                    onChange={handleSelectChange}
                  >
                    <option className="bg-gray-900 text-white">
                      Sort by: Recommended
                    </option>
                    <option className="bg-gray-900 text-white">
                      Highest Rated
                    </option>
                    <option className="bg-gray-900 text-white">
                      Most Reviews
                    </option>
                    <option className="bg-gray-900 text-white">
                      Price: Low to High
                    </option>
                    <option className="bg-gray-900 text-white">
                      Price: High to Low
                    </option>
                  </select>
                </div>
              </div>

              {/* Mentor Cards Grid */}
              <div
                ref={cardsRef}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {Lowtohigh?.map((mentor, index) => (
                  <div
                    key={mentor.id}
                    className="bg-gray-900 rounded-2xl shadow-2xl hover:shadow-red-500/20 transition-all duration-500 overflow-hidden group border border-gray-800 hover:border-red-600 transform hover:-translate-y-2"
                    onMouseEnter={(e) => {
                      gsap.to(e.currentTarget, {
                        boxShadow: "0 25px 50px -12px rgba(239, 68, 68, 0.25)",
                        duration: 0.3,
                        ease: "power2.out",
                      });
                    }}
                    onMouseLeave={(e) => {
                      gsap.to(e.currentTarget, {
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                        duration: 0.3,
                        ease: "power2.out",
                      });
                    }}
                  >
                    <div className="p-6 relative">
                      {/* Animated gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* Header */}
                      <div className="flex items-start gap-4 mb-4 relative z-10">
                        <div className="relative">
                          <img
                            src={mentor?.avatar}
                            alt={mentor?.name}
                            className="w-16 h-16 rounded-full object-cover ring-4 ring-red-600/30 transition-all duration-300 group-hover:ring-red-500"
                          />
                          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-red-400 transition-colors duration-300">
                            {mentor?.name}
                          </h3>
                          <p className="text-gray-400 text-sm mb-2 group-hover:text-gray-300 transition-colors duration-300">
                            {mentor?.title}
                          </p>
                          <div className="flex items-center gap-2 text-sm">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-red-500 text-red-500 animate-pulse" />
                              <span className="font-semibold text-white">
                                {mentor?.rating}
                              </span>
                              <span className="text-gray-400">
                                ({mentor?.reviews} reviews)
                              </span>
                            </div>
                          </div>
                        </div>
                        <button
                          className="p-2 rounded-full hover:bg-red-600/20 transition-all duration-300 group"
                          onClick={(e) => handleButtonClick(e, mentor._id)}
                        >
                          <Heart
                            className={`w-5 h-5  ${
                              Suser?.wishlist.some(
                                (item) => item._id == mentor._id
                              )
                                ? "text-red-500 "
                                : "text-gray-400"
                            } transition-colors duration-300`}
                          />
                        </button>
                      </div>

                      {/* Description */}
                      <p className="text-gray-300 text-sm mb-4 leading-relaxed relative z-10">
                        {mentor?.description}
                      </p>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-4 text-center relative z-10">
                        <div className="bg-gray-800 rounded-xl p-3 border border-gray-700 hover:border-red-600/50 transition-all duration-300 group">
                          <div className="text-lg font-bold text-white group-hover:text-red-400 transition-colors duration-300">
                            {mentor?.mentees}
                          </div>
                          <div className="text-xs text-gray-400">Mentees</div>
                        </div>
                        <div className="bg-gray-800 rounded-xl p-3 border border-gray-700 hover:border-red-600/50 transition-all duration-300 group">
                          <div className="text-lg font-bold text-white group-hover:text-red-400 transition-colors duration-300">
                            {mentor?.sessions}
                          </div>
                          <div className="text-xs text-gray-400">Sessions</div>
                        </div>
                        <div className="bg-gray-800 rounded-xl p-3 border border-gray-700 hover:border-red-600/50 transition-all duration-300 group">
                          <div className="text-lg font-bold text-white group-hover:text-red-400 transition-colors duration-300">
                            5+
                          </div>
                          <div className="text-xs text-gray-400">Years Exp</div>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="space-y-2 mb-6 relative z-10">
                        <div className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-300 transition-colors duration-300">
                          <MapPin className="w-4 h-4 text-red-500" />
                          <span>{mentor?.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-300 transition-colors duration-300">
                          <Clock className="w-4 h-4 text-red-500" />
                          <span>{mentor?.responseTime}</span>
                        </div>
                      </div>

                      {/* Price and Actions */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-700 relative z-10">
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-5 h-5 text-red-600" />
                          <span className="text-2xl font-bold text-white">
                            ${mentor?.price}
                          </span>
                          <span className="text-gray-400 text-sm">
                            /session
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            className="p-2 rounded-xl border border-gray-600 hover:bg-red-600/20 hover:border-red-500 transition-all duration-300 group"
                            onClick={(e) => NavigateToChat(e, mentor._id)}
                          >
                            <MessageCircle className="w-5 h-5 text-gray-400 group-hover:text-red-400 transition-colors duration-300" />
                          </button>
                          <button
                            className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 font-medium shadow-lg hover:shadow-red-500/25 transform hover:scale-105"
                            onClick={(e) => handleButtonClick(e)}
                          >
                            Book Session
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More */}
              <div ref={loadMoreRef} className="text-center mt-8">
                <button
                  className="px-8 py-3 bg-gray-900 border-2 border-red-600 text-red-500 rounded-xl hover:bg-red-600 hover:text-white transition-all duration-500 font-medium shadow-lg hover:shadow-red-500/25 transform hover:scale-105 relative overflow-hidden group"
                  onClick={(e) =>
                    handleButtonClick(e, () => Setpages(pages + 1))
                  }
                >
                  <span className="relative z-10">Load More Mentors</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    Load More Mentors
                  </span>
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
