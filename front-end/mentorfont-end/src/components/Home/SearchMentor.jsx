import { useEffect, useState } from "react";
import SearchMentorService from "../../services/SearchMentor";
import DisplaySearch from "./DisplaySearchUser";

function SearchMentorInput() {
  const [Input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const [Result, setResult] = useState([]);

  useEffect(() => {
    const handleInput = setTimeout(() => {
      setQuery(Input);
    }, 500);

    return () => {
      clearTimeout(handleInput);
    };
  }, [Input]);

  async function SearchMentor() {
    try {
      const res = await SearchMentorService(query);
      console.log("res", res);
      setResult(res);
    } catch (error) {
      console.log("error", error);
    }
  }
  function handleChange(e) {
    setInput(e.target.value);
    console.log("input", e.target.value);
  }
  function handleSumit() {
    SearchMentor();
  }

  useEffect(() => {
    if (!query || query.trim() == "") {
      setResult([]);
      return;
    }
    SearchMentor();
  }, [query]);
  return (
    <>
      <div className="max-w-3xl mx-auto mb-16">
        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search mentors by skills, companies, or roles..."
            onChange={handleChange}
            className="w-full pl-12 pr-36 py-5 text-lg border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-xl transition-all text-red-500"
          />
          <button
            onClick={handleSumit}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-red-600 to-red-800 text-white px-8 py-3 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all transform hover:scale-105 font-medium"
          >
            Find Mentors
          </button>
        </div>
      </div>
      {Result.length > 0 && <DisplaySearch result={Result} />}
    </>
  );
}

export default SearchMentorInput;
