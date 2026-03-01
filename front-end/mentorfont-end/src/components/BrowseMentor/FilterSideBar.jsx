import {
  Filter,
  ChevronDown,
  Code,
  Palette,
  Briefcase,
  Users,
} from "lucide-react";
import { useContext, useEffect, useState, useRef } from "react";
import GetMentorsBySkills from "../../services/FilterMentor";
import { GlobalContext } from "../../ContextApiStore/ContextStore";
import { useSearchParams } from "react-router-dom";
import gsap from "gsap";

const skillCategories = [
  {
    name: "Technology",
    icon: Code,
    skills: ["React", "Node.js", "Python", "Machine Learning", "System Design"],
  },
  {
    name: "Design",
    icon: Palette,
    skills: [
      "UI/UX Design",
      "Brand Strategy",
      "Creative Leadership",
      "Product Design",
    ],
  },
  {
    name: "Business",
    icon: Briefcase,
    skills: [
      "Product Strategy",
      "Growth Marketing",
      "Business Strategy",
      "Fundraising",
    ],
  },
  {
    name: "Leadership",
    icon: Users,
    skills: ["Team Leadership", "Management", "Mentoring", "Communication"],
  },
];

function FilterSideBar() {
  const { pages, setFilterMentors } = useContext(GlobalContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterSkills, setFilterSkills] = useState([]);
  const [Price, setPrice] = useState(null);
  const [Experience, setExperience] = useState();
  const sidebarRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      sidebarRef.current,
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  function handleChange(skill) {
    setFilterSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  }

  async function FilterMentor() {
    const filters = {};
    let limit = 5;
    let offset = (pages - 1) * 10;

    if (filterSkills.length > 0) filters.skills = filterSkills;
    if (Price) filters.price = Price;
    if (Experience) filters.experience = Experience;
    filters.limit = limit;
    filters.offset = offset;

    try {
      const res = await GetMentorsBySkills(filters);
      setFilterMentors(res);
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    const params = {};
    if (filterSkills.length > 0) params.skills = filterSkills;
    if (Price) params.price = Price;
    if (Experience) params.experience = Experience;
    setSearchParams(params);

    FilterMentor();
  }, [Price, Experience, filterSkills, pages]);

  return (
    <div
      ref={sidebarRef}
      className="lg:w-80 flex-shrink-0 sticky top-8 max-h-[170vh] overflow-y-auto scrollbar-hide"
    >
      <div className="bg-gray-900 rounded-2xl shadow-2xl border border-red-600/30 p-6 sticky top-8">
        <button className="lg:hidden w-full flex items-center justify-between mb-4 p-3 bg-gray-800 text-white rounded-xl hover:bg-red-700/20 transition">
          <span className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </span>
          <ChevronDown className="w-5 h-5 transform transition-transform" />
        </button>

        <div className="block text-white">
          <h3 className="text-xl font-bold mb-6">Filter Mentors</h3>

          {/* Skills */}
          <div className="mb-8">
            <h4 className="font-semibold mb-4 text-red-500">
              Skills & Expertise
            </h4>
            {skillCategories.map((category) => (
              <div key={category.name} className="mb-4">
                <div className="flex items-center gap-2 mb-2 text-sm text-gray-300 font-medium">
                  <category.icon className="w-4 h-4 text-red-500" />
                  {category.name}
                </div>
                <div className="pl-6 space-y-2">
                  {category.skills.map((skill) => (
                    <label
                      key={skill}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={filterSkills.includes(skill)}
                        onChange={() => handleChange(skill)}
                        className="rounded border-gray-600 text-red-500 focus:ring-red-500"
                      />
                      <span className="text-sm text-gray-400">{skill}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Price */}
          <div className="mb-8">
            <h4 className="font-semibold mb-4 text-red-500">
              Price Range (per session)
            </h4>
            <div className="space-y-2 text-gray-300">
              {["under-100", "100-200", "200+"].map((val, i) => (
                <div key={val} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="price"
                    className="text-red-500"
                    onChange={() => setPrice(val)}
                  />
                  <span className="text-sm">
                    {i === 0 ? "Under $100" : i === 1 ? "$100 - $200" : "$200+"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="mb-8">
            <h4 className="font-semibold mb-4 text-red-500">
              Experience Level
            </h4>
            <select
              className="w-full p-3 bg-gray-800 border border-gray-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
              onChange={(e) => setExperience(e.target.value)}
            >
              <option>All Levels</option>
              <option>5+ years</option>
              <option>8+ years</option>
              <option>10+ years</option>
              <option>15+ years</option>
            </select>
          </div>

          {/* Location */}
          <div className="mb-6">
            <h4 className="font-semibold mb-4 text-red-500">Location</h4>
            <select className="w-full p-3 bg-gray-800 border border-gray-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500">
              <option>All Locations</option>
              <option>Remote</option>
              <option>San Francisco, CA</option>
              <option>New York, NY</option>
              <option>Seattle, WA</option>
              <option>Austin, TX</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterSideBar;
