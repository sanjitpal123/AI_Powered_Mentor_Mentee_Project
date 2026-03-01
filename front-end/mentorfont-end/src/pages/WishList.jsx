import { useState } from "react";
import { motion } from "framer-motion";
import { useContext } from "react";
import { GlobalContext } from "../ContextApiStore/ContextStore";
import { useEffect } from "react";
import GetMenteeprofileser from "../services/GetMenteeProfile";
import WishListSer from "../services/AddToWishList";

export default function Wishlist() {
  const { Suser, GetMenteeProfile, User } = useContext(GlobalContext);

  const [mentors, setMentors] = useState([]);
  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      name: "John Doe",
      role: "Senior Software Engineer",
      image: "https://randomuser.me/api/portraits/men/11.jpg",
      price: 50,
      rating: 4.8,
      skills: ["React", "Node.js", "System Design"],
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Product Designer",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      price: 60,
      rating: 4.9,
      skills: ["Figma", "UX", "Branding"],
    },
  ]);

  const user = JSON.parse(localStorage.getItem("user"));

  /// get mentee profile
  async function GetUserProfile() {
    try {
      const res = await GetMenteeprofileser(user._id);
      setMentors(res.wishlist);
    } catch (error) {
      console.log("error", error);
    }
  }

  // remove mentor from wishlist
  async function removeFromWishlist(id) {
    try {
      console.log("mentors id", id);
      const res = await WishListSer(id, user.token);
      console.log("resxzcz", res);
      GetUserProfile();
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    console.log("usersdjfjsjf", mentors);

    GetUserProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-black py-12 px-4">
      <h1 className="text-3xl font-bold text-white text-center mb-10">
        ❤️ Your Wishlist
      </h1>

      {mentors?.length === 0 ? (
        <p className="text-center text-white">No mentors in your wishlist.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {mentors?.map((mentor) => (
            <motion.div
              key={mentor.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition"
            >
              <div className="text-center mb-4">
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  className="w-24 h-24 mx-auto rounded-full border-4 border-red-500 object-cover mb-3"
                />
                <h2 className="text-xl font-bold text-gray-900">
                  {mentor.name}
                </h2>
                <p className="text-sm text-gray-500">{mentor.role}</p>
              </div>

              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {mentor.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-red-100 text-red-700 text-xs px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="text-center mb-3">
                <p className="text-lg font-semibold text-red-700">
                  ${mentor.price}/session
                </p>
                <p className="text-sm text-gray-600">
                  ⭐ {mentor?.rating?.toFixed(1)} Rating
                </p>
              </div>

              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => removeFromWishlist(mentor._id)}
                  className="bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded"
                >
                  Remove
                </button>
                <button className="bg-black hover:bg-red-700 text-white px-4 py-2 rounded">
                  Book Session
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
