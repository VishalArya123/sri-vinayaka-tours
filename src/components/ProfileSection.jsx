import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Edit2,
  Save,
  Package,
  Calendar,
  MapPin,
  Bookmark,
  Phone,
  Mail,
  Camera,
  History,
  Settings,
  Download,
  Trash2,
  Eye,
  Heart,
  Users,
  Search,
  Menu,
  X,
  Loader2,
  CheckCircle,
  ExternalLink,
  Clock,
  Sparkles,
  Award,
  Shield,
  Star,
} from "lucide-react";
import { storage } from "../utils/storage";
import { tourPackages } from "../data/mockData";
import { useLocation } from "react-router-dom";

const ProfileSection = ({ initialActiveTab = "profile" }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tab = queryParams.get("tab");
  const [user, setUser] = useState(storage.getUserProfile());
  const [bookings, setBookings] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ ...storage.getUserProfile() });
  const [activeTab, setActiveTab] = useState(initialActiveTab);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [imageUploadSuccess, setImageUploadSuccess] = useState(false);

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    setActiveTab(initialActiveTab);
  }, [initialActiveTab]);

  const loadUserData = () => {
    setLoading(true);
    try {
      const profileData = storage.getUserProfile();
      const bookingHistory = storage.getBookingHistory();
      const userWishlist = storage.getWishlist();
      const userSearchHistory = storage.getSearchHistory();
      console.log("wishlist data", userWishlist);
      setUser(profileData);
      setEditForm(profileData);
      setBookings(bookingHistory);
      setWishlist(userWishlist);
      setSearchHistory(userSearchHistory);
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditToggle = () => {
    if (isEditing) {
      const success = storage.saveUser({ ...user, ...editForm });
      if (success) {
        setUser(storage.getUserProfile());
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile. Please try again.");
      }
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageUploading(true);
      setImageUploadSuccess(false);
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditForm({
          ...editForm,
          profileImage: reader.result,
        });
        setImageUploading(false);
        setImageUploadSuccess(true);
        setTimeout(() => setImageUploadSuccess(false), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeFromWishlist = (id, type) => {
    if (
      confirm("Are you sure you want to remove this item from your wishlist?")
    ) {
      const success = storage.removeFromWishlist(id, type);
      if (success) {
        setWishlist(storage.getWishlist());
      }
    }
  };

  const clearSearchHistory = () => {
    if (confirm("Are you sure you want to clear your search history?")) {
      storage.clearSearchHistory();
      setSearchHistory([]);
    }
  };

  const exportUserData = () => {
    const data = storage.exportAllData();
    if (data.success) {
      const dataStr = JSON.stringify(data.data, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `profile-data-${
        new Date().toISOString().split("T")[0]
      }.json`;
      link.click();
      URL.revokeObjectURL(url);
      alert("Your data has been exported successfully!");
    } else {
      alert("Failed to export data: " + data.error);
    }
  };

  const tabs = [
    { id: "profile", name: "Profile", icon: User },
    { id: "bookings", name: "Bookings", icon: Package },
    { id: "wishlist", name: "Wishlist", icon: Bookmark },
    { id: "history", name: "History", icon: History },
    { id: "settings", name: "Settings", icon: Settings },
  ];

  useEffect(() => {
    if (tab === "wishlist") {
      setActiveTab(tabs[2].id);
    }
    if (tab === "user") {
      setActiveTab(tabs[0].id);
    }
  }, [location]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-background-light">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-200 border-t-primary-600 mx-auto mb-4"></div>
          <p className="font-poppins text-secondary-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col lg:flex-row min-h-[calc(100vh-64px)] bg-background-light rounded-3xl shadow-float overflow-hidden border border-primary-100">
      {/* Mobile Sidebar Toggle */}
      <button
        className="lg:hidden absolute top-4 right-4 z-10 p-3 rounded-2xl bg-elegant-gradient text-white shadow-elegant transform hover:scale-105 transition-all duration-300"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle profile menu"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-4 left-0 z-40 bg-white border-r border-primary-200 shadow-float rounded-r-3xl
        transform ${
          isSidebarOpen ? "translate-x-0 w-full" : "-translate-x-full w-80"
        }
        lg:relative lg:translate-x-0 lg:flex lg:flex-col lg:w-80 transition-all duration-300 ease-in-out`}
      >
        {/* Sidebar Header */}
        <div className="relative p-6 border-b border-primary-200 flex items-center justify-between lg:justify-start pt-16 lg:pt-6 bg-gradient-to-br from-primary-50 to-secondary-50">
          <div className="absolute top-2 right-2 animate-pulse-gentle opacity-60">
            <Sparkles className="w-5 h-5 text-accent-yellow" />
          </div>
          <h2 className="font-playfair text-2xl font-bold text-secondary-800">My Account</h2>
          <button
            className="lg:hidden p-2 text-secondary-600 hover:text-secondary-800 rounded-xl hover:bg-primary-50 transition-all duration-300"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* User Info Card */}
        <div className="p-6 border-b border-primary-200 bg-gradient-to-br from-primary-50 to-accent-peach/20">
          <div className="text-center">
            <div className="relative w-20 h-20 mx-auto mb-4">
              <img
                src={
                  user.profileImage ||
                  "/placeholder.svg?height=80&width=80&text=Profile" ||
                  "/placeholder.svg"
                }
                alt={user.name ? `${user.name}'s profile` : "User profile"}
                className="w-full h-full object-cover rounded-2xl border-2 border-white shadow-warm"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-elegant-gradient rounded-full flex items-center justify-center">
                <Star className="w-3 h-3 text-white fill-current" />
              </div>
            </div>
            <h3 className="font-playfair text-lg font-bold text-secondary-800 mb-1">
              {user.name || 'User'}
            </h3>
            <p className="font-poppins text-sm text-secondary-600">
              {user.email || 'No email provided'}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsSidebarOpen(false);
                }}
                className={`flex items-center w-full px-4 py-3 rounded-2xl text-left font-medium transition-all duration-300 transform hover:scale-105 ${
                  activeTab === tab.id
                    ? "bg-elegant-gradient text-white shadow-elegant"
                    : "text-secondary-600 hover:bg-primary-50 hover:text-primary-600"
                }`}
                aria-current={activeTab === tab.id ? "page" : undefined}
              >
                <IconComponent size={20} className="mr-3" />
                <span className="font-poppins">{tab.name}</span>
                {tab.id === 'wishlist' && wishlist.length > 0 && (
                  <span className="ml-auto bg-coral text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-medium animate-bounce-gentle">
                    {wishlist.length}
                  </span>
                )}
                {tab.id === 'bookings' && bookings.length > 0 && (
                  <span className="ml-auto bg-primary-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-medium">
                    {bookings.length}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Stats Card */}
        <div className="p-6 border-t border-primary-200 bg-gradient-to-br from-secondary-50 to-primary-50">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-2xl p-3 text-center shadow-warm">
              <div className="font-playfair text-xl font-bold text-primary-600">
                {wishlist.length}
              </div>
              <div className="font-poppins text-xs text-secondary-600">Saved Items</div>
            </div>
            <div className="bg-white rounded-2xl p-3 text-center shadow-warm">
              <div className="font-playfair text-xl font-bold text-secondary-600">
                {bookings.length}
              </div>
              <div className="font-poppins text-xs text-secondary-600">Bookings</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 transition-all duration-300 ease-in-out bg-background-light">
        <div className="lg:pt-0 pt-12 sm:pt-0">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div
              key="profile-tab-content"
              className="space-y-8 transition-opacity duration-300 ease-in-out opacity-100 animate-fade-in-up"
            >
              <div className="text-center mb-8">
                <div className="inline-flex items-center px-4 py-2 bg-elegant-gradient rounded-full text-white font-medium mb-4">
                  <User className="w-4 h-4 mr-2" />
                  Personal Information
                </div>
                <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-secondary-800 mb-4">
                  My Profile
                </h2>
                <p className="font-poppins text-secondary-600">
                  Manage your personal information and preferences
                </p>
              </div>

              <div className="bg-white rounded-3xl shadow-warm border border-primary-100 p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-3xl overflow-hidden border-4 border-primary-200 shadow-elegant">
                      <img
                        src={
                          editForm.profileImage ||
                          "/placeholder.svg?height=160&width=160&text=Profile" ||
                          "/placeholder.svg"
                        }
                        alt={
                          user.name ? `${user.name}'s profile` : "User profile"
                        }
                        className="w-full h-full object-cover"
                      />
                      {isEditing && (
                        <label
                          htmlFor="profileImageUpload"
                          className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer transition-opacity hover:opacity-75 rounded-3xl"
                          aria-label="Upload new profile image"
                        >
                          {imageUploading ? (
                            <Loader2
                              className="text-white animate-spin"
                              size={24}
                            />
                          ) : imageUploadSuccess ? (
                            <CheckCircle className="text-green-400" size={24} />
                          ) : (
                            <Camera className="text-white" size={24} />
                          )}
                          <input
                            id="profileImageUpload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            disabled={imageUploading}
                          />
                        </label>
                      )}
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-elegant-gradient rounded-2xl flex items-center justify-center shadow-elegant">
                        <Award className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <button
                      onClick={handleEditToggle}
                      className="flex items-center justify-center bg-elegant-gradient hover:shadow-elegant text-white px-6 py-3 rounded-2xl transition-all duration-300 text-base font-medium shadow-warm transform hover:scale-105 font-poppins"
                      aria-label={
                        isEditing ? "Save profile changes" : "Edit profile"
                      }
                    >
                      {isEditing ? (
                        <>
                          <Save size={18} className="mr-2" />
                          Save Profile
                        </>
                      ) : (
                        <>
                          <Edit2 size={18} className="mr-2" />
                          Edit Profile
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex-1 space-y-6 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block font-poppins text-sm font-medium text-secondary-700 mb-2"
                        >
                          Full Name
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={editForm.name || ""}
                            onChange={handleInputChange}
                            className="w-full border border-primary-200 rounded-2xl p-3 focus:ring-2 focus:ring-primary-300 focus:border-transparent outline-none font-poppins transition-all duration-300"
                            placeholder="Enter your full name"
                            aria-label="Full Name"
                          />
                        ) : (
                          <div className="w-full p-3 bg-primary-50 rounded-2xl">
                            <p className="font-poppins text-secondary-800 font-medium flex items-center text-lg">
                              <User size={18} className="mr-3 text-primary-500" />
                              {user.name || "Not provided"}
                            </p>
                          </div>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block font-poppins text-sm font-medium text-secondary-700 mb-2"
                        >
                          Email Address
                        </label>
                        {isEditing ? (
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={editForm.email || ""}
                            onChange={handleInputChange}
                            className="w-full border border-primary-200 rounded-2xl p-3 focus:ring-2 focus:ring-primary-300 focus:border-transparent outline-none font-poppins transition-all duration-300"
                            placeholder="your@example.com"
                            required
                            aria-label="Email Address"
                          />
                        ) : (
                          <div className="w-full p-3 bg-primary-50 rounded-2xl">
                            <p className="font-poppins text-secondary-800 font-medium flex items-center text-lg">
                              <Mail size={18} className="mr-3 text-primary-500" />
                              {user.email || "Not provided"}
                            </p>
                          </div>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="block font-poppins text-sm font-medium text-secondary-700 mb-2"
                        >
                          Phone Number
                        </label>
                        {isEditing ? (
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={editForm.phone || ""}
                            onChange={handleInputChange}
                            className="w-full border border-primary-200 rounded-2xl p-3 focus:ring-2 focus:ring-primary-300 focus:border-transparent outline-none font-poppins transition-all duration-300"
                            placeholder="Enter your phone number"
                            aria-label="Phone Number"
                          />
                        ) : (
                          <div className="w-full p-3 bg-primary-50 rounded-2xl">
                            <p className="font-poppins text-secondary-800 font-medium flex items-center text-lg">
                              <Phone size={18} className="mr-3 text-primary-500" />
                              {user.phone || "Not provided"}
                            </p>
                          </div>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="gender"
                          className="block font-poppins text-sm font-medium text-secondary-700 mb-2"
                        >
                          Gender
                        </label>
                        {isEditing ? (
                          <select
                            id="gender"
                            name="gender"
                            value={editForm.gender || ""}
                            onChange={handleInputChange}
                            className="w-full border border-primary-200 rounded-2xl p-3 focus:ring-2 focus:ring-primary-300 focus:border-transparent outline-none bg-white font-poppins transition-all duration-300"
                            aria-label="Select Gender"
                          >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        ) : (
                          <div className="w-full p-3 bg-primary-50 rounded-2xl">
                            <p className="font-poppins text-secondary-800 font-medium text-lg">
                              {user.gender || "Not provided"}
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="lg:col-span-2">
                        <label
                          htmlFor="address"
                          className="block font-poppins text-sm font-medium text-secondary-700 mb-2"
                        >
                          Address
                        </label>
                        {isEditing ? (
                          <textarea
                            id="address"
                            name="address"
                            value={editForm.address || ""}
                            onChange={handleInputChange}
                            rows="3"
                            className="w-full border border-primary-200 rounded-2xl p-3 focus:ring-2 focus:ring-primary-300 focus:border-transparent outline-none font-poppins resize-vertical transition-all duration-300"
                            placeholder="Enter your address"
                            aria-label="Address"
                          />
                        ) : (
                          <div className="w-full p-3 bg-primary-50 rounded-2xl">
                            <p className="font-poppins text-secondary-800 font-medium flex items-start text-lg">
                              <MapPin
                                size={18}
                                className="mr-3 text-primary-500 mt-0.5 flex-shrink-0"
                              />
                              {user.address || "Not provided"}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bookings Tab */}
          {activeTab === "bookings" && (
            <div
              key="bookings-tab-content"
              className="space-y-8 transition-opacity duration-300 ease-in-out opacity-100 animate-fade-in-up"
            >
              <div className="text-center mb-8">
                <div className="inline-flex items-center px-4 py-2 bg-warm-gradient rounded-full text-white font-medium mb-4">
                  <Package className="w-4 h-4 mr-2" />
                  Booking History
                </div>
                <h3 className="font-playfair text-3xl sm:text-4xl font-bold text-secondary-800 mb-4">
                  My Bookings ({bookings.length})
                </h3>
                <p className="font-poppins text-secondary-600">
                  Track and manage all your travel bookings
                </p>
              </div>

              {bookings.length === 0 ? (
                <div className="bg-white rounded-3xl shadow-warm border border-primary-100 p-12 text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary-100 to-primary-200 mb-6">
                    <Package className="w-10 h-10 text-primary-600" />
                  </div>
                  <h4 className="font-playfair text-xl font-bold text-secondary-800 mb-4">
                    No Bookings Yet
                  </h4>
                  <p className="font-poppins text-secondary-600 mb-8 text-lg">
                    You don't have any bookings yet. Start planning your next adventure!
                  </p>
                  <Link
                    to="/tour-packages"
                    className="inline-flex items-center bg-elegant-gradient text-white px-8 py-4 rounded-2xl hover:shadow-elegant transition-all duration-300 font-medium shadow-warm transform hover:scale-105 font-poppins"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Browse Tours
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {bookings.map((booking, index) => {
                    // Handle different booking types
                    let bookingItem = {};
                    let bookingType = "";
                    let bookingImage = "";
                    let bookingTitle = "";
                    let bookingLocation = "";
                    if (booking.type === "vehicle" && booking.vehicle) {
                      bookingItem = booking.vehicle;
                      bookingType = "Vehicle Rental";
                      bookingImage = bookingItem.images?.[0];
                      bookingTitle = bookingItem.name;
                      bookingLocation = "Rental Service";
                    } else if (booking.tour) {
                      const tour =
                        tourPackages.find((t) => t.id === booking.tour?.id) ||
                        booking.tour ||
                        {};
                      bookingItem = tour;
                      bookingType = "Tour Package";
                      bookingImage = bookingItem.images?.[0];
                      bookingTitle = bookingItem.title;
                      bookingLocation = bookingItem.location;
                    } else {
                      bookingType = booking.type || "Service";
                      bookingTitle = booking.name || "Booking";
                      bookingLocation = "Service Location";
                    }
                    return (
                      <div
                        key={booking.id || index}
                        className="bg-white rounded-3xl shadow-warm border border-primary-100 p-6 hover:shadow-float transition-all duration-500 animate-fade-in-up"
                        style={{animationDelay: `${index * 0.1}s`}}
                      >
                        <div className="flex flex-col sm:flex-row gap-6 items-start">
                          {bookingImage && (
                            <div className="w-full sm:w-28 h-28 rounded-2xl overflow-hidden flex-shrink-0 shadow-warm">
                              <img
                                src={bookingImage || "/placeholder.svg"}
                                alt={bookingTitle || "Booking Image"}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1 space-y-3">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                              <h4 className="font-playfair text-xl font-bold text-secondary-800">
                                {bookingTitle || "Service Booking"}
                              </h4>
                              <span className="inline-flex items-center px-3 py-1 bg-elegant-gradient text-white rounded-full text-xs font-medium font-poppins">
                                {bookingType}
                              </span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                              <div className="flex items-center">
                                <Calendar
                                  size={16}
                                  className="mr-3 text-primary-500"
                                />
                                <span className="font-poppins text-secondary-700">
                                  {booking.formData?.serviceDate ||
                                    booking.date ||
                                    "Date not set"}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <MapPin
                                  size={16}
                                  className="mr-3 text-primary-500"
                                />
                                <span className="font-poppins text-secondary-700">
                                  {bookingLocation || "Location not set"}
                                </span>
                              </div>
                              {booking.type === "vehicle" && booking.vehicle ? (
                                <div className="flex items-center">
                                  <Users
                                    size={16}
                                    className="mr-3 text-primary-500"
                                  />
                                  <span className="font-poppins text-secondary-700">
                                    Capacity: {booking.vehicle.capacity}
                                  </span>
                                </div>
                              ) : (
                                <div className="flex items-center">
                                  <Users
                                    size={16}
                                    className="mr-3 text-primary-500"
                                  />
                                  <span className="font-poppins text-secondary-700">
                                    {booking.formData?.adultCount || 0} Adults,{" "}
                                    {booking.formData?.childCount || 0} Children
                                  </span>
                                </div>
                              )}
                              {booking.selectedDriver && (
                                <div className="flex items-center">
                                  <User
                                    size={16}
                                    className="mr-3 text-primary-500"
                                  />
                                  <span className="font-poppins text-secondary-700">
                                    Driver: {booking.selectedDriver.name}
                                  </span>
                                </div>
                              )}
                            </div>
                            {booking.selectedPlan && (
                              <div className="bg-primary-50 rounded-2xl p-3">
                                <span className="font-poppins text-sm text-secondary-600">Plan: </span>
                                <span className="font-poppins text-sm font-medium text-secondary-800">{booking.selectedPlan.name}</span>
                              </div>
                            )}
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-3 border-t border-primary-200">
                              <span className="font-playfair text-2xl font-bold text-primary-600">
                                ₹
                                {(
                                  booking.selectedPlan?.price ||
                                  booking.price ||
                                  0
                                ).toLocaleString()}
                              </span>
                              <span
                                className={`px-4 py-2 rounded-full text-xs font-medium font-poppins ${
                                  booking.status === "completed"
                                    ? "bg-green-100 text-green-800 border border-green-200"
                                    : booking.status === "confirmed"
                                    ? "bg-blue-100 text-blue-800 border border-blue-200"
                                    : "bg-yellow-100 text-yellow-800 border border-yellow-200"
                                }`}
                              >
                                {booking.status || "Pending"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Wishlist Tab */}
          {activeTab === "wishlist" && (
            <div
              key="wishlist-tab-content"
              className="space-y-8 transition-opacity duration-300 ease-in-out opacity-100 animate-fade-in-up"
            >
              <div className="text-center mb-8">
                <div className="inline-flex items-center px-4 py-2 bg-coral rounded-full text-white font-medium mb-4">
                  <Heart className="w-4 h-4 mr-2" />
                  Saved Items
                </div>
                <h3 className="font-playfair text-3xl sm:text-4xl font-bold text-secondary-800 mb-4">
                  My Wishlist ({wishlist.length})
                </h3>
                <p className="font-poppins text-secondary-600">
                  Your favorite tours and services, saved for later
                </p>
              </div>

              {wishlist.length === 0 ? (
                <div className="bg-white rounded-3xl shadow-warm border border-primary-100 p-12 text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-red-100 to-red-200 mb-6">
                    <Heart className="w-10 h-10 text-red-600" />
                  </div>
                  <h4 className="font-playfair text-xl font-bold text-secondary-800 mb-4">
                    Your Wishlist is Empty
                  </h4>
                  <p className="font-poppins text-secondary-600 mb-8 text-lg">
                    Start exploring and save your favorite tours and services.
                  </p>
                  <Link
                    to="/tour-packages"
                    className="inline-flex items-center bg-elegant-gradient text-white px-8 py-4 rounded-2xl hover:shadow-elegant transition-all duration-300 font-medium shadow-warm transform hover:scale-105 font-poppins"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Browse Tours
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlist.map((item, index) => {
                    const itemLink =
                      item.type === "car" || item.type === "bus"
                        ? `/rental-service?modal=open&vehicleId=${item.id}&vehicleType=${item.type}`
                        : `/tour/${item.id}`;

                    return (
                      <div
                        key={`${item.type}-${item.id}`}
                        className="bg-white rounded-3xl overflow-hidden shadow-warm hover:shadow-float transition-all duration-500 border border-primary-100 animate-fade-in-up"
                        style={{animationDelay: `${index * 0.1}s`}}
                      >
                        <div className="relative h-48">
                          <img
                            src={
                              item.image ||
                              "/placeholder.svg?height=192&width=320&text=Wishlist+Item" ||
                              "/placeholder.svg"
                            }
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                          <button
                            onClick={() =>
                              removeFromWishlist(item.id, item.type)
                            }
                            className="absolute top-3 right-3 bg-white rounded-2xl p-2 shadow-elegant hover:bg-red-50 transition-all duration-300 transform hover:scale-110"
                            title="Remove from wishlist"
                            aria-label={`Remove ${item.name} from wishlist`}
                          >
                            <Heart
                              size={18}
                              className="text-red-500 fill-red-500"
                            />
                          </button>
                          <div className="absolute top-3 left-3 bg-elegant-gradient text-white px-3 py-1 rounded-full text-xs font-medium font-poppins">
                            {item.type === "car" || item.type === "bus" ? "Vehicle" : "Tour"}
                          </div>
                          <div className="absolute bottom-3 right-3 animate-pulse-gentle opacity-80">
                            <Sparkles className="w-4 h-4 text-accent-yellow" />
                          </div>
                        </div>
                        <div className="p-6">
                          <h4 className="font-playfair text-lg font-bold text-secondary-800 mb-2 line-clamp-1">
                            {item.name}
                          </h4>
                          {item.type === "vehicle" && item.capacity && (
                            <div className="flex items-center text-secondary-600 mb-3 text-sm">
                              <Users size={14} className="mr-2 text-primary-500" />
                              <span className="font-poppins">Capacity: {item.capacity}</span>
                            </div>
                          )}
                          {item.location && item.type === "tour" ? (
                            <div className="flex items-center text-secondary-600 mb-3 text-sm">
                              <MapPin size={14} className="mr-2 text-primary-500" />
                              <span className="font-poppins">{item.location}</span>
                            </div>
                          ) : (
                            <div className="flex items-center text-secondary-600 mb-3 text-sm">
                              <Users size={14} className="mr-2 text-primary-500" />
                              <span className="font-poppins">Capacity: {item.capacity}</span>
                            </div>
                          )}
                          <div className="flex justify-between items-center mb-4">
                            <span className="font-playfair text-xl font-bold text-primary-600">
                              ₹{item.price?.toLocaleString() || "N/A"}
                            </span>
                            <span className="font-poppins text-xs text-secondary-500">
                              Added{" "}
                              {new Date(
                                item.addedAt || item.savedOn
                              ).toLocaleDateString()}
                            </span>
                          </div>
                          <Link
                            to={itemLink}
                            className="w-full bg-elegant-gradient hover:shadow-elegant text-white py-3 rounded-2xl transition-all duration-300 text-sm font-medium flex items-center justify-center transform hover:scale-105 shadow-warm font-poppins"
                            aria-label={`View details for ${item.name}`}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* History Tab */}
          {activeTab === "history" && (
            <div
              key="history-tab-content"
              className="space-y-8 transition-opacity duration-300 ease-in-out opacity-100 animate-fade-in-up"
            >
              <div className="text-center mb-8">
                <div className="inline-flex items-center px-4 py-2 bg-secondary-600 rounded-full text-white font-medium mb-4">
                  <History className="w-4 h-4 mr-2" />
                  Activity History
                </div>
                <h3 className="font-playfair text-3xl sm:text-4xl font-bold text-secondary-800 mb-4">
                  Activity History
                </h3>
                <p className="font-poppins text-secondary-600">
                  Your browsing and search history
                </p>
              </div>

              {/* Search History */}
              <div className="bg-white rounded-3xl shadow-warm border border-primary-100 p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="font-playfair text-xl font-bold text-secondary-800 flex items-center">
                    <Search size={20} className="mr-3 text-primary-500" />
                    Search History ({searchHistory.length})
                  </h4>
                  {searchHistory.length > 0 && (
                    <button
                      onClick={clearSearchHistory}
                      className="text-red-600 hover:text-red-800 text-sm flex items-center font-medium font-poppins bg-red-50 hover:bg-red-100 px-4 py-2 rounded-2xl transition-all duration-300 transform hover:scale-105"
                      aria-label="Clear all search history"
                    >
                      <Trash2 size={14} className="mr-2" />
                      Clear All
                    </button>
                  )}
                </div>
                {searchHistory.length > 0 ? (
                  <div className="space-y-3">
                    {searchHistory.slice(0, 10).map((search, index) => (
                      <Link
                        to={`/tour-packages?search=${encodeURIComponent(
                          search.query
                        )}`}
                        key={search.id}
                        className="flex items-center justify-between p-4 bg-primary-50 rounded-2xl hover:bg-primary-100 transition-all duration-300 group transform hover:scale-105 animate-fade-in-up"
                        aria-label={`Search for ${search.query}`}
                        style={{animationDelay: `${index * 0.1}s`}}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-elegant-gradient rounded-2xl flex items-center justify-center">
                            <Search size={16} className="text-white" />
                          </div>
                          <span className="font-poppins text-sm text-secondary-800 font-medium group-hover:text-primary-600">
                            {search.query}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 text-secondary-400 text-xs">
                          <Calendar size={12} />
                          <span className="font-poppins">
                            {new Date(search.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-br from-primary-100 to-primary-200 mb-4">
                      <Clock size={24} className="text-primary-600" />
                    </div>
                    <p className="font-poppins text-secondary-600">No search history available</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div
              key="settings-tab-content"
              className="space-y-8 transition-opacity duration-300 ease-in-out opacity-100 animate-fade-in-up"
            >
              <div className="text-center mb-8">
                <div className="inline-flex items-center px-4 py-2 bg-secondary-700 rounded-full text-white font-medium mb-4">
                  <Settings className="w-4 h-4 mr-2" />
                  Account Settings
                </div>
                <h3 className="font-playfair text-3xl sm:text-4xl font-bold text-secondary-800 mb-4">
                  Settings & Preferences
                </h3>
                <p className="font-poppins text-secondary-600">
                  Manage your account settings and data
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-3xl shadow-warm border border-primary-100 p-6 sm:p-8 hover:shadow-float transition-all duration-300">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <div className="w-12 h-12 bg-elegant-gradient rounded-2xl flex items-center justify-center mr-4">
                          <Download className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="font-playfair font-bold text-secondary-800 text-xl">
                          Export My Data
                        </h4>
                      </div>
                      <p className="font-poppins text-secondary-600">
                        Download all your profile data, bookings, and preferences in JSON format.
                      </p>
                    </div>
                    <button
                      onClick={exportUserData}
                      className="flex items-center bg-elegant-gradient text-white px-6 py-3 rounded-2xl hover:shadow-elegant transition-all duration-300 font-medium transform hover:scale-105 shadow-warm font-poppins"
                      aria-label="Export all user data"
                    >
                      <Download size={18} className="mr-2" />
                      Export Data
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-3xl shadow-warm border border-primary-100 p-6 sm:p-8 hover:shadow-float transition-all duration-300">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <div className="w-12 h-12 bg-yellow-500 rounded-2xl flex items-center justify-center mr-4">
                          <Trash2 className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="font-playfair font-bold text-secondary-800 text-xl">
                          Clear Local Cache
                        </h4>
                      </div>
                      <p className="font-poppins text-secondary-600">
                        Clear temporary data like recent views and old search history to free up space.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        if (
                          confirm(
                            "Are you sure you want to clear local cache? This will remove recent views and old search history."
                          )
                        ) {
                          storage.cleanupOldData();
                          alert("Local cache cleared successfully!");
                          loadUserData();
                        }
                      }}
                      className="flex items-center bg-yellow-600 text-white px-6 py-3 rounded-2xl hover:bg-yellow-700 hover:shadow-elegant transition-all duration-300 font-medium transform hover:scale-105 shadow-warm font-poppins"
                      aria-label="Clear local cache"
                    >
                      <Trash2 size={18} className="mr-2" />
                      Clear Cache
                    </button>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-3xl border border-primary-200 p-6 sm:p-8">
                  <div className="flex items-center mb-4">
                    <Shield className="w-6 h-6 text-primary-600 mr-3" />
                    <h4 className="font-playfair font-bold text-secondary-800 text-xl">
                      Storage Usage
                    </h4>
                  </div>
                  <div className="font-poppins text-secondary-700">
                    {(() => {
                      const size = storage.getStorageSize();
                      return `Currently using ${size.kb} KB of local storage space.`;
                    })()}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProfileSection;
