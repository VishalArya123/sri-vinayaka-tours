"use client";

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
  const [wishlistCount, setWishlistCount] = useState(0); // State for wishlist count

  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  // Close mobile menu and search when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  // Check auth status, load user data, and update wishlist count
  useEffect(() => {
    const updateAuthAndUserData = () => {
      const userData = storage.getUserProfile(); // Use getUserProfile for comprehensive user data
      setIsLoggedIn(storage.isAuthenticated());
      setUser(userData);
      setWishlistCount(storage.getWishlist().length);
    };

    updateAuthAndUserData(); // Initial check

    // Listen for changes in local storage (e.g., login/logout from other tabs)
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
    storage.logout(); // Use the comprehensive logout function
    setIsLoggedIn(false);
    setUser(null);
    setWishlistCount(0); // Reset wishlist count on logout
    setIsDropdownOpen(false);
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      storage.addSearchQuery(searchQuery.trim()); // Corrected function name
      navigate(
        `/tour-packages?search=${encodeURIComponent(searchQuery.trim())}`
      );

      setSearchQuery("");
      setIsSearchOpen(false);
    }
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                className="h-10 w-auto sm:h-11"
                src={logo}
                alt="Sri Vinayaka Tours"
              />
              <span className="ml-2 text-lg sm:text-xl font-bold text-blue-800 hidden sm:block">
                Sri Vinayaka Tours
              </span>
              <span className="ml-2 text-lg font-bold text-blue-800 sm:hidden">
                SVT
              </span>
            </Link>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            <Link
              to="/"
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                location.pathname === "/"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-600"
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                location.pathname === "/about"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-600"
              }`}
            >
              About Us
            </Link>
            <Link
              to="/tour-packages"
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                location.pathname === "/tour-packages"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-600"
              }`}
            >
              Tour Packages
            </Link>
            <Link
              to="/rental-service"
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                location.pathname === "/rental-service"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-600"
              }`}
            >
              Rental Service
            </Link>
            <Link
              to="/contact"
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                location.pathname === "/contact"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-600"
              }`}
            >
              Contact Us
            </Link>
          </div>
          {/* Desktop Search and Actions */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {/* Search */}
            <div className="relative" ref={searchRef}>
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-gray-400 hover:text-gray-600"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
              {isSearchOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                  <form onSubmit={handleSearch} className="p-4">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search tours, destinations..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      autoFocus
                    />
                  </form>
                </div>
              )}
            </div>
            {/* Wishlist */}
            {isLoggedIn && (
              <Link
                to="/profile?tab=wishlist"
                className="relative p-2 text-gray-400 hover:text-gray-600"
                aria-label={`Wishlist with ${wishlistCount} items`}
              >
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
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
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none transition-colors"
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="true"
                >
                  <User className="mr-1 h-4 w-4" />
                  <span className="hidden sm:block">
                    {user?.name?.split(" ")[0] || "Profile"}
                  </span>
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                    >
                      <Link
                        to="/profile?tab=user"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                        role="menuitem"
                      >
                        <User className="inline mr-2 h-4 w-4" />
                        My Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        <LogOut className="inline mr-2 h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none transition-colors"
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
              className="p-2 text-gray-400 hover:text-gray-600"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            {/* Mobile Wishlist */}
            {isLoggedIn && (
              <Link
                to="/profile?tab=wishlist"
                className="relative p-2 text-gray-400 hover:text-gray-600"
                aria-label={`Wishlist with ${wishlistCount} items`}
              >
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {wishlistCount > 9 ? "9+" : wishlistCount}
                  </span>
                )}
              </Link>
            )}
            {/* Mobile menu button */}
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="md:hidden border-t border-gray-200 bg-gray-50 p-4">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tours, destinations..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          </form>
        </div>
      )}
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                location.pathname === "/"
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                location.pathname === "/about"
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/tour-packages"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                location.pathname === "/tour-packages"
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Tour Packages
            </Link>
            <Link
              to="/rental-service"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                location.pathname === "/rental-service"
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Rental Service
            </Link>
            <Link
              to="/contact"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                location.pathname === "/contact"
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </Link>
            {/* Mobile Auth Section */}
            <div className="border-t border-gray-200 pt-3">
              {isLoggedIn ? (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white mb-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="mr-2 h-5 w-5" />
                    {user?.name || "My Profile"}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left flex items-center px-3 py-2 rounded-md text-base font-medium bg-red-600 text-white"
                  >
                    <LogOut className="mr-2 h-5 w-5" />
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white"
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
