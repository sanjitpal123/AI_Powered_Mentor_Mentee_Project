import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      {/* Navigation */}
      <nav className="bg-[#050505] border-b border-white/5 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link
                to="/"
                className="text-2xl font-bold text-white hover:text-red-500 transition-colors tracking-tight"
              >
                MentorVault
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  to="/browse-mentor"
                  className="text-white hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Browse Mentors
                </Link>
                <Link
                  to="/wishlist"
                  className="text-white hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  WishList
                </Link>

                <a
                  href="#"
                  className="text-white hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Success Stories
                </a>
                <Link
                  to="/become-mentor"
                  className="text-white hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Become a Mentor
                </Link>
                <Link
                  to="/login"
                  className="text-white hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-red-600 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-red-700 transition-all transform hover:scale-105 shadow-[0_4px_14px_0_rgba(220,38,38,0.39)]"
                >
                  Get Started
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button className="text-white hover:text-red-500">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
