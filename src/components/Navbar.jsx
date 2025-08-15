import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
  Search,
  Heart,
  Sparkles,
  MapPin,
  Car,
  Phone
} from "lucide-react";
import { storage } from "../utils/storage";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu and search when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  // Check auth status, load user data, and update wishlist count
  useEffect(() => {
    const updateAuthAndUserData = () => {
      const userData = storage.getUserProfile();
      setIsLoggedIn(storage.isAuthenticated());
      setUser(userData);
      setWishlistCount(storage.getWishlist().length);
    };
    updateAuthAndUserData();
    window.addEventListener("storage", updateAuthAndUserData);
    return () => {
      window.removeEventListener("storage", updateAuthAndUserData);
    };
  }, []);

  // Handle click outside dropdown and search bar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    storage.logout();
    setIsLoggedIn(false);
    setUser(null);
    setWishlistCount(0);
    setIsDropdownOpen(false);
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      storage.addSearchQuery(searchQuery.trim());
      navigate(
        `/tour-packages?search=${encodeURIComponent(searchQuery.trim())}`
      );
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  };

  const navItems = [
    { path: "/", label: "Home", icon: Sparkles },
    { path: "/about", label: "About Us", icon: User },
    { path: "/tour-packages", label: "Tour Packages", icon: MapPin },
    { path: "/rental-service", label: "Rental Service", icon: Car },
    { path: "/contact", label: "Contact Us", icon: Phone }
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background-light/95 backdrop-blur-lg border-b border-primary-200/50 shadow-elegant"
          : "bg-gray-800/30 backdrop-blur-lg"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center group">
              <div className="relative">
                <img
                  className="h-10 w-auto sm:h-12 transition-transform duration-300 group-hover:scale-105"
                  src={logo}
                  alt="Sri Vinayaka Tours"
                />
                <div className="absolute -inset-2 bg-elegant-gradient opacity-0 group-hover:opacity-20 rounded-full blur-xl transition-opacity duration-300"></div>
              </div>
              <div className="ml-3">
                <span className="font-playfair text-xl sm:text-2xl font-bold bg-elegant-gradient bg-clip-text text-transparent">
                  Sri Vinayaka Tours
                </span>
                <div className="text-xs text-secondary-100 font-poppins hidden sm:block">
                  Elegant Journeys
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`group px-4 py-2 text-sm font-medium transition-all duration-300 rounded-xl relative overflow-hidden ${
                  location.pathname === item.path
                    ? "text-primary-400"
                    : scrolled
                    ? "text-secondary-700 hover:text-primary-500"
                    : "text-primary-100 hover:text-primary-300"
                }`}
              >
                <div
                  className={`absolute inset-0 bg-elegant-gradient opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${
                    location.pathname === item.path ? "opacity-10" : ""
                  }`}
                ></div>
                <div className="relative flex items-center">
                  <item.icon className="w-4 h-4 mr-2 opacity-80" />
                  {item.label}
                </div>
              </Link>
            ))}
          </div>

          {/* Desktop Search and Actions */}
          <div className="hidden md:flex md:items-center md:space-x-3">
            {/* Search */}
            <div className="relative" ref={searchRef}>
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`p-2 rounded-xl transition-all duration-300 ${
                  scrolled
                    ? "text-secondary-600 hover:text-primary-600 hover:bg-primary-50"
                    : "text-primary-100 hover:text-primary-300 hover:bg-white/10"
                }`}
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
              {isSearchOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-background-light rounded-2xl shadow-elegant border border-primary-200 overflow-hidden animate-scale-in">
                  <form onSubmit={handleSearch} className="p-4">
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search tours, destinations..."
                        className="w-full px-4 py-3 pr-12 bg-white border border-primary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent font-poppins"
                        autoFocus
                      />
                      <button
                        type="submit"
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-primary-600 hover:text-primary-700"
                      >
                        <Search className="h-4 w-4" />
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* Wishlist */}
            {isLoggedIn && (
              <Link
                to="/profile?tab=wishlist"
                className={`relative p-2 rounded-xl transition-all duration-300 group ${
                  scrolled
                    ? "text-secondary-600 hover:text-primary-600 hover:bg-primary-50"
                    : "text-primary-100 hover:text-primary-300 hover:bg-white/10"
                }`}
                aria-label={`Wishlist with ${wishlistCount} items`}
              >
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-coral text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium animate-pulse-gentle">
                    {wishlistCount > 9 ? "9+" : wishlistCount}
                  </span>
                )}
              </Link>
            )}

            {/* User Menu */}
            {isLoggedIn ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="inline-flex items-center px-4 py-2 bg-elegant-gradient text-white font-medium rounded-xl hover:shadow-elegant transition-all duration-300 transform hover:scale-105"
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="true"
                >
                  <User className="mr-2 h-4 w-4" />
                  <span className="hidden sm:block">
                    {user?.name?.split(" ")[0] || "Profile"}
                  </span>
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl shadow-elegant bg-background-light border border-primary-200 animate-scale-in">
                    <div className="py-2">
                      <Link
                        to="/profile?tab=user"
                        className="flex items-center px-4 py-3 text-sm text-secondary-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <User className="inline mr-3 h-4 w-4" />
                        My Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full text-left px-4 py-3 text-sm text-secondary-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                      >
                        <LogOut className="inline mr-3 h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 bg-elegant-gradient text-white font-medium rounded-xl hover:shadow-elegant transition-all duration-300 transform hover:scale-105"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button and actions */}
          <div className="flex items-center space-x-2 md:hidden">
            {/* Mobile Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`p-2 rounded-xl transition-all duration-300 ${
                scrolled
                  ? "text-secondary-600 hover:text-primary-600 hover:bg-primary-50"
                  : "text-primary-100 hover:text-primary-300 hover:bg-white/10"
              }`}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Mobile Wishlist */}
            {isLoggedIn && (
              <Link
                to="/profile?tab=wishlist"
                className={`relative p-2 rounded-xl transition-all duration-300 ${
                  scrolled
                    ? "text-secondary-600 hover:text-primary-600 hover:bg-primary-50"
                    : "text-primary-100 hover:text-primary-300 hover:bg-white/10"
                }`}
                aria-label={`Wishlist with ${wishlistCount} items`}
              >
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-coral text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">
                    {wishlistCount > 9 ? "9+" : wishlistCount}
                  </span>
                )}
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              type="button"
              className={`inline-flex items-center justify-center p-2 rounded-xl transition-all duration-300 ${
                scrolled
                  ? "text-secondary-700 hover:text-primary-600 hover:bg-primary-50"
                  : "text-primary-100 hover:text-primary-300 hover:bg-white/10"
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <div className="relative w-6 h-6">
                <span
                  className={`absolute top-1 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                    isMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                ></span>
                <span
                  className={`absolute top-3 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                    isMenuOpen ? "opacity-0" : ""
                  }`}
                ></span>
                <span
                  className={`absolute top-5 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                    isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="md:hidden border-t border-primary-200/50 bg-background-light/95 backdrop-blur-lg">
          <form onSubmit={handleSearch} className="p-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tours, destinations..."
                className="w-full px-4 py-3 pr-12 bg-white border border-primary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 font-poppins"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-primary-600"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background-light/98 backdrop-blur-xl border-t border-primary-200/50 animate-fade-in">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                  location.pathname === item.path
                    ? "bg-elegant-gradient text-white shadow-elegant"
                    : "text-secondary-700 hover:bg-primary-50 hover:text-primary-600"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </Link>
            ))}

            {/* Mobile Auth Section */}
            <div className="border-t border-primary-200 pt-4 mt-6">
              {isLoggedIn ? (
                <div className="space-y-2">
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-3 rounded-xl text-base font-medium bg-elegant-gradient text-white shadow-elegant"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="mr-3 h-5 w-5" />
                    {user?.name || "My Profile"}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left flex items-center px-4 py-3 rounded-xl text-base font-medium text-coral hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="mr-3 h-5 w-5" />
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center px-4 py-3 rounded-xl text-base font-medium bg-elegant-gradient text-white shadow-elegant"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
