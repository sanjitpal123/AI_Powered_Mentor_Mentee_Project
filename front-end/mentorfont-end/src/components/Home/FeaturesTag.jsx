function FeaturedTag() {
  return (
    <div className="flex flex-wrap justify-center gap-3 text-sm">
      <span className="bg-white/80 backdrop-blur-sm text-gray-700 px-5 py-3 rounded-full shadow-lg border border-gray-200 hover:shadow-xl transition-all cursor-pointer">
        🔥 Software Engineering
      </span>
      <span className="bg-white/80 backdrop-blur-sm text-gray-700 px-5 py-3 rounded-full shadow-lg border border-gray-200 hover:shadow-xl transition-all cursor-pointer">
        ⚡ Product Management
      </span>
      <span className="bg-white/80 backdrop-blur-sm text-gray-700 px-5 py-3 rounded-full shadow-lg border border-gray-200 hover:shadow-xl transition-all cursor-pointer">
        🚀 Data Science & AI
      </span>
      <span className="bg-white/80 backdrop-blur-sm text-gray-700 px-5 py-3 rounded-full shadow-lg border border-gray-200 hover:shadow-xl transition-all cursor-pointer">
        🎨 UX Design
      </span>
    </div>
  );
}
export default FeaturedTag;
