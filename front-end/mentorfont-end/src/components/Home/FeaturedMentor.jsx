import { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import GetAllMentosService from "../../services/GetAllmentors";
import { GlobalContext } from "../../ContextApiStore/ContextStore";
import { Link } from "react-router-dom";
function FeaturedMentor() {
  const { mentorCount, setMentorCount, User } = useContext(GlobalContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    async function fetchMentors() {
      try {
        const res = await GetAllMentosService(user.token);
        setMentorCount(res.mentorsbyai.length);
        console.log("response to get mentor by ai", res);
        setMentors(res.mentorsbyai);
      } catch (error) {
        console.log("error", error);
      }
    }
    fetchMentors();
  }, []);

  return (
    <section className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-red-500 mb-4">
            Ai Recomended Mentors
          </h2>
          <p className="text-xl text-gray-400">
            Learn from industry legends who've built the products you use daily
          </p>
        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {mentors?.map((mentor) => (
            <SwiperSlide key={mentor.id}>
              <div className="bg-gray-900 rounded-2xl shadow-lg hover:shadow-red-500/30 transition-all transform hover:-translate-y-2 p-6 border border-gray-800 group h-full flex flex-col justify-between">
                <div className="text-center mb-4">
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-red-500/20 group-hover:ring-red-500 transition-all"
                  />
                  <h3 className="text-xl font-bold text-white mb-1">
                    {mentor.name}
                  </h3>
                  <p className="text-sm text-gray-400 mb-3 font-medium">
                    {mentor.role}
                  </p>

                  <div className="flex items-center justify-center mb-3">
                    <svg
                      className="w-4 h-4 text-red-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-base font-bold text-white ml-1">
                      {mentor.rating}
                    </span>
                    <span className="text-sm text-gray-400 ml-1">
                      ({mentor.reviews} reviews)
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-1 justify-center">
                    {mentor?.skills?.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="text-xs bg-red-600/10 text-red-400 px-3 py-1 rounded-full font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                    {mentor.skills.length > 3 && (
                      <span className="text-xs text-gray-500 font-medium">
                        +{mentor.skills.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-center mt-4">
                  <div className="text-2xl font-bold text-red-500 mb-2">
                    ${mentor?.price}/session
                  </div>
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-xl transition-all transform hover:scale-105 font-medium shadow-lg">
                    Book Session
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="text-center mt-12">
          <Link
            to="/browse-mentor"
            className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-xl transition-all inline-flex items-center font-medium shadow-lg transform hover:scale-105"
          >
            {`View All ${mentorCount}+ Mentors`}
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedMentor;
