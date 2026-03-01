import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      {/* Navigation */}
      <nav className="bg-black shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link
                to="/"
                className="text-2xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent"
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
                  className="bg-gradient-to-r from-red-600 to-red-800 text-white px-6 py-2 rounded-lg text-sm font-medium hover:from-red-700 hover:to-red-900 transition-all transform hover:scale-105 shadow-lg"
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
