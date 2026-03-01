function Footer() {
  return (
    <footer className="bg-black py-12 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand + Description */}
          <div>
            <div className="text-2xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent mb-4">
              MentorVault
            </div>
            <p className="text-white mb-4">
              Empowering careers through world-class mentorship. Connect with
              industry legends and unlock your potential.
            </p>
          </div>

          {/* For Mentees */}
          <div>
            <h3 className="text-red-500 font-semibold mb-4">For Mentees</h3>
            <ul className="space-y-2 text-white">
              <li>
                <a href="#" className="hover:text-red-400 transition-colors">
                  Find a Mentor
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-400 transition-colors">
                  How it Works
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-400 transition-colors">
                  Success Stories
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-400 transition-colors">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* For Mentors */}
          <div>
            <h3 className="text-red-500 font-semibold mb-4">For Mentors</h3>
            <ul className="space-y-2 text-white">
              <li>
                <a href="#" className="hover:text-red-400 transition-colors">
                  Become a Mentor
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-400 transition-colors">
                  Mentor Resources
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-400 transition-colors">
                  Community
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-400 transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-red-500 font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-white">
              <li>
                <a href="#" className="hover:text-red-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-400 transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-400 transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-red-900 mt-8 pt-8 text-center text-white">
          <p>
            &copy; 2024 MentorVault. All rights reserved. Built with ❤️ for
            ambitious professionals.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
