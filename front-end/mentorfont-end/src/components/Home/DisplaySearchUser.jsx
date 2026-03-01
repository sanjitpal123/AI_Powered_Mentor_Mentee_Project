function DisplaySearch({ result }) {
  if (!Array.isArray(result) || result.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-400 text-lg font-medium">
        No mentors found
      </div>
    );
  }

  return (
    <div className="space-y-4 w-full max-w-4xl mx-auto px-4 mt-10 mb-6">
      {result.map((item, idx) => (
        <div
          key={idx}
          className="flex justify-between items-start bg-white p-4 md:p-6 rounded-xl shadow-lg border border-red-200 hover:shadow-xl transition duration-200"
        >
          {/* Profile & Details */}
          <div className="flex">
            {/* Image */}
            <img
              src={item.picture || "https://via.placeholder.com/80"}
              alt={item.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-black mr-4"
            />

            {/* Text */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {item.name}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {item.role || "Mentor"} at{" "}
                <span className="font-medium text-black">
                  {item.company || "Unknown Company"}
                </span>
              </p>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 mt-3">
                {item.skills?.map((skill, i) => (
                  <span
                    key={i}
                    className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <button className="ml-4 mt-2 bg-black hover:bg-red-700 text-white text-sm px-4 py-2 rounded-md transition-all shadow-md">
            View Profile
          </button>
        </div>
      ))}
    </div>
  );
}

export default DisplaySearch;
