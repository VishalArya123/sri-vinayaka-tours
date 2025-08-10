"use client";
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
} from "lucide-react";
import { storage } from "../utils/storage";
import { tourPackages } from "../data/mockData"; // Ensure 'vehicles' is imported
import { useLocation } from "react-router-dom";

const ProfileSection = ({ initialActiveTab = "profile" }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tab = queryParams.get("tab"); // "wishlist"
  const [user, setUser] = useState(storage.getUserProfile());
  const [bookings, setBookings] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  // const [recentViews, setRecentViews] = useState([]);
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
      // const userRecentViews = storage.getRecentViews();
      const userSearchHistory = storage.getSearchHistory();
      console.log("wishlist data", userWishlist);
      setUser(profileData);
      setEditForm(profileData);
      setBookings(bookingHistory);
      setWishlist(userWishlist);
      // setRecentViews(userRecentViews);
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
        setTimeout(() => setImageUploadSuccess(false), 3000); // Hide success after 3 seconds
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

  // const clearRecentViews = () => {
  //   if (confirm("Are you sure you want to clear your recently viewed items?")) {
  //     storage.save("recentViews", []);
  //     setRecentViews([]);
  //   }
  // };

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
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col lg:flex-row min-h-[calc(100vh-64px)] bg-gray-50 rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      {/* Mobile Sidebar Toggle */}
      <button
        className="lg:hidden absolute top-4 right-4 z-10 p-2 rounded-full bg-blue-600 text-white shadow-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle profile menu"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-4 left-0 z-40 bg-white border-r border-gray-200 shadow-lg
        transform ${
          isSidebarOpen ? "translate-x-0 w-full" : "-translate-x-full w-64"
        }
        lg:relative lg:translate-x-0 lg:flex lg:flex-col lg:w-64 transition-all duration-300 ease-in-out`}
      >
        <div className="p-6 border-b border-gray-200 flex items-center justify-between lg:justify-start pt-16 lg:pt-6">
          <h2 className="text-2xl font-bold text-gray-800">My Account</h2>
          <button
            className="lg:hidden p-1 text-gray-600 hover:text-gray-800"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>
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
                className={`flex items-center w-full px-4 py-3 rounded-lg text-left font-medium transition-colors duration-200
                  ${
                    activeTab === tab.id
                      ? "bg-blue-100 text-blue-700 shadow-sm"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                  }`}
                aria-current={activeTab === tab.id ? "page" : undefined}
              >
                <IconComponent size={20} className="mr-3" />
                {tab.name}
              </button>
            );
          })}
        </nav>
      </aside>
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 transition-all duration-300 ease-in-out">
        <div className="lg:pt-0 pt-12 sm:pt-0">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div
              key="profile-tab-content"
              className="space-y-6 transition-opacity duration-300 ease-in-out opacity-100"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
                Personal Information
              </h2>
              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-blue-200 shadow-md">
                    <img
                      src={
                        editForm.profileImage ||
                        "/placeholder.svg?height=150&width=150&text=Profile" ||
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
                        className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer transition-opacity hover:opacity-75"
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
                  </div>
                  <button
                    onClick={handleEditToggle}
                    className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg transition-colors text-base font-medium shadow-md"
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
                <div className="flex-1 space-y-4 w-full">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-gray-500 text-sm mb-1"
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
                          className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          placeholder="Enter your full name"
                          aria-label="Full Name"
                        />
                      ) : (
                        <p className="text-gray-800 font-medium flex items-center text-lg">
                          <User size={18} className="mr-2 text-gray-500" />
                          {user.name || "Not provided"}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-gray-500 text-sm mb-1"
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
                          className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                          placeholder="your@example.com"
                          required
                          aria-label="Email Address"
                        />
                      ) : (
                        <p className="text-gray-800 font-medium flex items-center text-lg">
                          <Mail size={18} className="mr-2 text-gray-500" />
                          {user.email || "Not provided"}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-gray-500 text-sm mb-1"
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
                          className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          placeholder="Enter your phone number"
                          aria-label="Phone Number"
                        />
                      ) : (
                        <p className="text-gray-800 font-medium flex items-center text-lg">
                          <Phone size={18} className="mr-2 text-gray-500" />
                          {user.phone || "Not provided"}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="gender"
                        className="block text-gray-500 text-sm mb-1"
                      >
                        Gender
                      </label>
                      {isEditing ? (
                        <select
                          id="gender"
                          name="gender"
                          value={editForm.gender || ""}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                          aria-label="Select Gender"
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      ) : (
                        <p className="text-gray-800 font-medium text-lg">
                          {user.gender || "Not provided"}
                        </p>
                      )}
                    </div>
                    <div className="lg:col-span-2">
                      <label
                        htmlFor="address"
                        className="block text-gray-500 text-sm mb-1"
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
                          className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          placeholder="Enter your address"
                          aria-label="Address"
                        />
                      ) : (
                        <p className="text-gray-800 font-medium flex items-start text-lg">
                          <MapPin
                            size={18}
                            className="mr-2 text-gray-500 mt-0.5 flex-shrink-0"
                          />
                          {user.address || "Not provided"}
                        </p>
                      )}
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
              className="space-y-6 transition-opacity duration-300 ease-in-out opacity-100"
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center mb-6">
                <Package size={24} className="mr-3 text-blue-600" />
                My Bookings ({bookings.length})
              </h3>
              {bookings.length === 0 ? (
                <div className="bg-gray-50 p-8 rounded-xl text-center border border-gray-200">
                  <Package className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-4 text-lg">
                    You don't have any bookings yet.
                  </p>
                  <Link
                    to="/tour-packages"
                    className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md"
                  >
                    Browse Tours
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking, index) => {
                    // Handle different booking types
                    let bookingItem = {};
                    let bookingType = "";
                    let bookingImage = "";
                    let bookingTitle = "";
                    let bookingLocation = "";
                    if (booking.type === "vehicle" && booking.vehicle) {
                      // Vehicle rental booking
                      bookingItem = booking.vehicle;
                      bookingType = "Vehicle Rental";
                      bookingImage = bookingItem.images?.[0];
                      bookingTitle = bookingItem.name;
                      bookingLocation = "Rental Service";
                    } else if (booking.tour) {
                      // Tour package booking
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
                      // Fallback for other booking types
                      bookingType = booking.type || "Service";
                      bookingTitle = booking.name || "Booking";
                      bookingLocation = "Service Location";
                    }
                    return (
                      <div
                        key={booking.id || index}
                        className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow bg-white"
                      >
                        <div className="flex flex-col sm:flex-row gap-4 items-start">
                          {bookingImage && (
                            <div className="w-full sm:w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                              <img
                                src={bookingImage || "/placeholder.svg"}
                                alt={bookingTitle || "Booking Image"}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1 space-y-2">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                              <h4 className="text-lg font-bold text-gray-800">
                                {bookingTitle || "Service Booking"}
                              </h4>
                              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full w-fit">
                                {bookingType}
                              </span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Calendar
                                  size={16}
                                  className="mr-2 text-blue-500"
                                />
                                <span>
                                  {booking.formData?.serviceDate ||
                                    booking.date ||
                                    "Date not set"}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <MapPin
                                  size={16}
                                  className="mr-2 text-blue-500"
                                />
                                <span>
                                  {bookingLocation || "Location not set"}
                                </span>
                              </div>
                              {booking.type === "vehicle" && booking.vehicle ? (
                                <div className="flex items-center">
                                  <Users
                                    size={16}
                                    className="mr-2 text-blue-500"
                                  />
                                  <span>
                                    Capacity: {booking.vehicle.capacity}
                                  </span>
                                </div>
                              ) : (
                                <div className="flex items-center">
                                  <Users
                                    size={16}
                                    className="mr-2 text-blue-500"
                                  />
                                  <span>
                                    {booking.formData?.adultCount || 0} Adults,{" "}
                                    {booking.formData?.childCount || 0} Children
                                  </span>
                                </div>
                              )}
                              {booking.selectedDriver && (
                                <div className="flex items-center">
                                  <User
                                    size={16}
                                    className="mr-2 text-blue-500"
                                  />
                                  <span>
                                    Driver: {booking.selectedDriver.name}
                                  </span>
                                </div>
                              )}
                            </div>
                            {booking.selectedPlan && (
                              <div className="text-sm text-gray-600">
                                <span className="font-medium">Plan:</span>{" "}
                                {booking.selectedPlan.name}
                              </div>
                            )}
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pt-2 border-t border-gray-100 mt-2">
                              <span className="font-bold text-xl text-blue-600">
                                ₹
                                {(
                                  booking.selectedPlan?.price ||
                                  booking.price ||
                                  0
                                ).toLocaleString()}
                              </span>
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  booking.status === "completed"
                                    ? "bg-green-100 text-green-800"
                                    : booking.status === "confirmed"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-yellow-100 text-yellow-800"
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
              className="space-y-6 transition-opacity duration-300 ease-in-out opacity-100"
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center mb-6">
                <Bookmark size={24} className="mr-3 text-red-500" />
                My Wishlist ({wishlist.length})
              </h3>
              {wishlist.length === 0 ? (
                <div className="bg-gray-50 p-8 rounded-xl text-center border border-gray-200">
                  <Heart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-4 text-lg">
                    Your wishlist is empty.
                  </p>
                  <Link
                    to="/tour-packages"
                    className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md"
                  >
                    Browse Tours
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {wishlist.map((item) => {
                    // Determine the correct link based on item type
                    const itemLink =
                      item.type === "car" || item.type === "bus" // Check for specific types
                        ? `/rental-service?modal=open&vehicleId=${item.id}&vehicleType=${item.type}`
                        : `/tour/${item.id}`;

                    return (
                      <div
                        key={`${item.type}-${item.id}`}
                        className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow bg-white"
                      >
                        <div className="relative h-40">
                          <img
                            src={
                              item.image ||
                              "/placeholder.svg?height=160&width=240&text=Wishlist+Item" ||
                              "/placeholder.svg"
                            }
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                          <button
                            onClick={() =>
                              removeFromWishlist(item.id, item.type)
                            }
                            className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
                            title="Remove from wishlist"
                            aria-label={`Remove ${item.name} from wishlist`}
                          >
                            <Heart
                              size={18}
                              className="text-red-500 fill-red-500"
                            />
                          </button>
                          {/* Item type badge */}
                          <div className="absolute top-3 left-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs font-medium">
                            {item.type === "car" || item.type === "bus"? "Vehicle" : "Tour"}
                          </div>
                        </div>
                        <div className="p-4">
                          <h4 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1">
                            {item.name}
                          </h4>
                          {/* Show different details based on item type */}
                          {item.type === "vehicle" && item.capacity && (
                            <div className="flex items-center text-gray-600 mb-2 text-sm">
                              <Users size={14} className="mr-1" />
                              <span>Capacity: {item.capacity}</span>
                            </div>
                          )}
                          {item.location && item.type === "tour" ? (
                            <div className="flex items-center text-gray-600 mb-2 text-sm">
                              <MapPin size={14} className="mr-1" />
                              <span>{item.location}</span>
                            </div>
                          ) : (
                            <div className="flex items-center text-gray-600 mb-2 text-sm">
                              <Users size={14} className="mr-1" />
                              <span>Capacity : {item.capacity}</span>
                            </div>
                          )}
                          <div className="flex justify-between items-center mt-2">
                            <span className="font-bold text-blue-600 text-lg">
                              ₹{item.price?.toLocaleString() || "N/A"}
                            </span>
                            <span className="text-xs text-gray-500">
                              Added{" "}
                              {new Date(
                                item.addedAt || item.savedOn
                              ).toLocaleDateString()}
                            </span>
                          </div>
                          <Link
                            to={itemLink}
                            className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg transition-colors text-sm font-medium flex items-center justify-center"
                            aria-label={`View details for ${item.name}`}
                          >
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
              className="space-y-6 transition-opacity duration-300 ease-in-out opacity-100"
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center mb-6">
                <History size={24} className="mr-3 text-gray-700" />
                Activity History
              </h3>
              {/* Recent Views */}
              {/* <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                    <Eye size={18} className="mr-2 text-blue-500" />
                    Recently Viewed ({searchHistory.length})
                  </h4>
                  {recentViews.length > 0 && (
                    <button
                      onClick={clearRecentViews}
                      className="text-red-600 hover:text-red-800 text-sm flex items-center font-medium"
                      aria-label="Clear all recently viewed items"
                    >
                      <Trash2 size={14} className="mr-1" />
                      Clear All
                    </button>
                  )}
                </div>
                {recentViews.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {recentViews.slice(0, 6).map((item) => (
                      <Link
                        to={`/tour-details/${item.id}`}
                        key={`${item.type}-${item.id}`}
                        className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        aria-label={`View ${item.name}`}
                      >
                        <img
                          src={
                            item.image ||
                            "/placeholder.svg?height=48&width=48&text=View" ||
                            "/placeholder.svg"
                          }
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(item.viewedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 text-sm">No recent views</p>
                )}
              </div> */}
              {/* Search History */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                    <Search size={18} className="mr-2 text-blue-500" />
                    Search History ({searchHistory.length})
                  </h4>
                  {searchHistory.length > 0 && (
                    <button
                      onClick={clearSearchHistory}
                      className="text-red-600 hover:text-red-800 text-sm flex items-center font-medium"
                      aria-label="Clear all search history"
                    >
                      <Trash2 size={14} className="mr-1" />
                      Clear All
                    </button>
                  )}
                </div>
                {searchHistory.length > 0 ? (
                  <div className="space-y-2">
                    {searchHistory.slice(0, 10).map((search) => (
                      <Link
                        to={`/tour-packages?search=${encodeURIComponent(
                          search.query
                        )}`}
                        key={search.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                        aria-label={`Search for ${search.query}`}
                      >
                        <div className="flex items-center space-x-2">
                          <ExternalLink
                            size={16}
                            className="text-gray-500 group-hover:text-blue-500"
                          />
                          <span className="text-sm text-gray-800 font-medium group-hover:text-blue-600">
                            {search.query}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1 text-gray-400 text-xs">
                          <Calendar size={12} />
                          <span>
                            {new Date(search.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center text-gray-600 text-sm">
                    <Clock size={16} className="mr-2" />
                    No search history
                  </div>
                )}
              </div>
            </div>
          )}
          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div
              key="settings-tab-content"
              className="space-y-6 transition-opacity duration-300 ease-in-out opacity-100"
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center mb-6">
                <Settings size={24} className="mr-3 text-gray-700" />
                Account Settings
              </h3>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 shadow-sm">
                  <div>
                    <h4 className="font-medium text-gray-800 text-lg">
                      Export My Data
                    </h4>
                    <p className="text-sm text-gray-600">
                      Download all your profile data, bookings, and preferences.
                    </p>
                  </div>
                  <button
                    onClick={exportUserData}
                    className="flex items-center bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors text-base font-medium mt-3 sm:mt-0"
                    aria-label="Export all user data"
                  >
                    <Download size={18} className="mr-2" />
                    Export Data
                  </button>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 shadow-sm">
                  <div>
                    <h4 className="font-medium text-gray-800 text-lg">
                      Clear Local Cache
                    </h4>
                    <p className="text-sm text-gray-600">
                      Clear temporary data like recent views and old search
                      history.
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
                    className="flex items-center bg-yellow-600 text-white px-5 py-2.5 rounded-lg hover:bg-yellow-700 transition-colors text-base font-medium mt-3 sm:mt-0"
                    aria-label="Clear local cache"
                  >
                    <Trash2 size={18} className="mr-2" />
                    Clear Cache
                  </button>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-medium text-gray-800 text-lg mb-2">
                    Storage Usage
                  </h4>
                  <div className="text-sm text-gray-600">
                    {(() => {
                      const size = storage.getStorageSize();
                      return `Currently using ${size.kb} KB of local storage.`;
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
