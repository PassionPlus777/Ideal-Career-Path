import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

interface HeaderProps {
  variant?: "default" | "simple";
}

const Header: React.FC<HeaderProps> = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const handleBack = () => {
    if (location.pathname !== "/") {
      navigate(-1);
    }
  };

  // Get the appropriate logo and title based on the path
  const getLogoAndTitle = () => {
    switch (location.pathname) {
      case "/":
        return {
          logo: "/images/icons/logo-symbols.svg",
          title: "IdealCareerPath",
        };
      case "/decision":
        return {
          logo: "/images/icons/circle-only.svg",
          title: "Decision",
        };
      case "/pathway":
        return {
          logo: "/images/icons/square-only.svg",
          title: "Pathway",
        };
      default:
        return {
          logo: "/images/icons/logo-symbols.svg",
          title: "IdealCareerPath",
        };
    }
  };

  const { logo, title } = getLogoAndTitle();

  // Default header with full navigation
  return (
    <header className="h-16">
      <div className="flex justify-between items-center h-full">
        {/* Logo with back button */}
        <div className="flex-shrink-0">
          <div
            onClick={handleBack}
            className="flex items-center space-x-3 cursor-pointer"
          >
            {location.pathname !== "/" && (
              <svg
                className="h-5 w-5 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            )}
            <img src={logo} alt={title} className="h-8 w-auto" />
            <div className="flex flex-col">
              <h1 className="text-[#1976d2] text-lg font-semibold leading-tight tracking-wide">
                {title}
              </h1>
            </div>
          </div>
        </div>

        {/* Hamburger Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop CTA Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/pricing"
            className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
          >
            Pricing
          </Link>
          <Link
            to="/profile"
            className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
          >
            Profile
          </Link>
          <Link
            to="/decision"
            className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 text-sm font-medium rounded-md"
          >
            Start
          </Link>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:hidden border-t border-gray-200 bg-white`}
      >
        <div className="pt-2 pb-3 space-y-1">
          <Link
            to="/pricing"
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            onClick={() => setIsMenuOpen(false)}
          >
            Pricing
          </Link>
          <Link
            to="/profile"
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            onClick={() => setIsMenuOpen(false)}
          >
            Profile
          </Link>
          <Link
            to="/decision"
            className="block px-3 py-2 text-base font-medium bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => setIsMenuOpen(false)}
          >
            Start
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
