import React, { useState, useEffect } from 'react';
import { User, Edit2, Save, Package, Calendar, MapPin, Bookmark, Phone, Mail, Camera, History, Settings, Download, Trash2, Eye, Star, Heart } from 'lucide-react';
import { storage } from '../utils/storage';

const ProfileSection = () => {
  const [user, setUser] = useState(storage.getUserProfile());
  const [bookings, setBookings] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [recentViews, setRecentViews] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ ...user });
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = () => {
    setLoading(true);
    try {
      const userData = storage.getUser();
      const profileData = storage.getUserProfile();
      const bookingHistory = storage.getBookingHistory();
      const userWishlist = storage.getWishlist();
      const userRecentViews = storage.getRecentViews();
      const userSearchHistory = storage.getSearchHistory();

      setUser({ ...userData, ...profileData });
      setEditForm({ ...userData, ...profileData });
      setBookings(bookingHistory);
      setWishlist(userWishlist);
      setRecentViews(userRecentViews);
      setSearchHistory(userSearchHistory);
    } catch (error) {
      console.error('Error loading user data:', error);
    }
    setLoading(false);
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      const success = storage.saveUserProfile(editForm);
      if (success) {
        setUser(editForm);
        storage.updateUser(editForm);
        alert('Profile updated successfully!');
      } else {
        alert('Failed to update profile. Please try again.');
      }
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: value
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditForm({
          ...editForm,
          profileImage: e.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeFromWishlist = (id, type) => {
    const success = storage.removeFromWishlist(id, type);
    if (success) {
      setWishlist(storage.getWishlist());
    }
  };

  const clearSearchHistory = () => {
    if (confirm('Are you sure you want to clear your search history?')) {
      storage.clearSearchHistory();
      setSearchHistory([]);
    }
  };

  const exportUserData = () => {
    const data = storage.exportAllData();
    if (data.success) {
      const dataStr = JSON.stringify(data.data, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `profile-data-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'bookings', name: 'Bookings', icon: Package },
    { id: 'wishlist', name: 'Wishlist', icon: Bookmark },
    { id: 'history', name: 'History', icon: History },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 sm:p-6 text-white">
          <h2 className="text-xl sm:text-2xl font-bold">My Profile</h2>
          <p className="text-blue-100 text-sm sm:text-base">Manage your account and preferences</p>
        </div>
        
        {/* Mobile Tab Selector */}
        <div className="sm:hidden border-b">
          <select 
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
            className="w-full p-3 border-none focus:outline-none text-gray-700"
          >
            {tabs.map(tab => (
              <option key={tab.id} value={tab.id}>{tab.name}</option>
            ))}
          </select>
        </div>

        {/* Desktop Tabs */}
        <div className="hidden sm:flex border-b border-gray-200">
          {tabs.map(tab => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 lg:px-6 py-3 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <IconComponent size={16} className="mr-2" />
                {tab.name}
              </button>
            );
          })}
        </div>
        
        <div className="p-4 sm:p-6">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden">
                    <img 
                      src={editForm.profileImage || user.profileImage || 'https://via.placeholder.com/150'} 
                      alt={user.name || 'User'} 
                      className="w-full h-full object-cover"
                    />
                    {isEditing && (
                      <label className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer">
                        <Camera className="text-white" size={20} />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                  <button 
                    onClick={handleEditToggle}
                    className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm sm:text-base"
                  >
                    {isEditing ? (
                      <>
                        <Save size={16} className="mr-2" />
                        Save Profile
                      </>
                    ) : (
                      <>
                        <Edit2 size={16} className="mr-2" />
                        Edit Profile
                      </>
                    )}
                  </button>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-500 text-sm mb-1">Full Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="name"
                          value={editForm.name || ''}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          placeholder="Enter your full name"
                        />
                      ) : (
                        <p className="text-gray-800 font-medium flex items-center">
                          <User size={16} className="mr-2 text-gray-500" />
                          {user.name || 'Not provided'}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-gray-500 text-sm mb-1">Email Address</label>
                      {isEditing ? (
                        <input
                          type="email"
                          name="email"
                          value={editForm.email || ''}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          placeholder="Enter your email"
                        />
                      ) : (
                        <p className="text-gray-800 font-medium flex items-center">
                          <Mail size={16} className="mr-2 text-gray-500" />
                          {user.email || 'Not provided'}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-gray-500 text-sm mb-1">Phone Number</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          name="phone"
                          value={editForm.phone || ''}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          placeholder="Enter your phone number"
                        />
                      ) : (
                        <p className="text-gray-800 font-medium flex items-center">
                          <Phone size={16} className="mr-2 text-gray-500" />
                          {user.phone || 'Not provided'}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-gray-500 text-sm mb-1">Gender</label>
                      {isEditing ? (
                        <select
                          name="gender"
                          value={editForm.gender || ''}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      ) : (
                        <p className="text-gray-800 font-medium">{user.gender || 'Not provided'}</p>
                      )}
                    </div>
                    
                    <div className="lg:col-span-2">
                      <label className="block text-gray-500 text-sm mb-1">Address</label>
                      {isEditing ? (
                        <textarea
                          name="address"
                          value={editForm.address || ''}
                          onChange={handleInputChange}
                          rows="3"
                          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          placeholder="Enter your address"
                        />
                      ) : (
                        <p className="text-gray-800 font-medium flex items-start">
                          <MapPin size={16} className="mr-2 text-gray-500 mt-0.5 flex-shrink-0" />
                          {user.address || 'Not provided'}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bookings Tab */}
          {activeTab === 'bookings' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-800 flex items-center">
                <Package size={20} className="mr-2" />
                My Bookings ({bookings.length})
              </h3>
              
              {bookings.length === 0 ? (
                <div className="bg-gray-50 p-8 rounded-lg text-center">
                  <Package className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-4">You don't have any bookings yet.</p>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Browse Tours
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking, index) => (
                    <div 
                      key={booking.id || index} 
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col sm:flex-row gap-4">
                        {booking.tour && (
                          <div className="w-full sm:w-24 h-32 sm:h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <img 
                              src={booking.tour.images?.[0] || booking.image} 
                              alt={booking.tour.title || booking.tourName} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        
                        <div className="flex-1 space-y-2">
                          <h4 className="text-lg font-bold text-gray-800">
                            {booking.tour?.title || booking.tourName || 'Tour Package'}
                          </h4>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Calendar size={16} className="mr-2" />
                              <span>{booking.formData?.serviceDate || booking.date || 'Date not set'}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin size={16} className="mr-2" />
                              <span>{booking.tour?.location || 'Location not set'}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                            <span className="font-medium text-gray-800">
                              ₹{booking.selectedPlan?.price || booking.price || 0}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              booking.status === 'completed' 
                                ? 'bg-green-100 text-green-800' 
                                : booking.status === 'confirmed'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {booking.status || 'Pending'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Wishlist Tab */}
          {activeTab === 'wishlist' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-800 flex items-center">
                <Bookmark size={20} className="mr-2 text-red-500" />
                My Wishlist ({wishlist.length})
              </h3>
              
              {wishlist.length === 0 ? (
                <div className="bg-gray-50 p-8 rounded-lg text-center">
                  <Heart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-4">Your wishlist is empty.</p>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Browse Tours
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {wishlist.map((item) => (
                    <div 
                      key={`${item.type}-${item.id}`} 
                      className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="relative h-32 sm:h-40">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                        <button 
                          onClick={() => removeFromWishlist(item.id, item.type)}
                          className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                          title="Remove from wishlist"
                        >
                          <Bookmark size={16} className="text-red-500" fill="red" />
                        </button>
                      </div>
                      
                      <div className="p-4">
                        <h4 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1">{item.name}</h4>
                        {item.location && (
                          <div className="flex items-center text-gray-600 mb-2">
                            <MapPin size={14} className="mr-1" />
                            <span className="text-sm">{item.location}</span>
                          </div>
                        )}
                        <div className="flex justify-between items-center mt-2">
                          <span className="font-medium text-gray-800">₹{item.price?.toLocaleString() || 'N/A'}</span>
                          <span className="text-xs text-gray-500">
                            Added {new Date(item.addedAt || item.savedOn).toLocaleDateString()}
                          </span>
                        </div>
                        <button className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors text-sm font-medium">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800 flex items-center">
                <History size={20} className="mr-2" />
                Activity History
              </h3>
              
              {/* Recent Views */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <Eye size={18} className="mr-2" />
                  Recently Viewed ({recentViews.length})
                </h4>
                {recentViews.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {recentViews.slice(0, 6).map((item) => (
                      <div key={`${item.type}-${item.id}`} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(item.viewedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 text-sm">No recent views</p>
                )}
              </div>

              {/* Search History */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                    <History size={18} className="mr-2" />
                    Search History ({searchHistory.length})
                  </h4>
                  {searchHistory.length > 0 && (
                    <button
                      onClick={clearSearchHistory}
                      className="text-red-600 hover:text-red-800 text-sm flex items-center"
                    >
                      <Trash2 size={14} className="mr-1" />
                      Clear All
                    </button>
                  )}
                </div>
                {searchHistory.length > 0 ? (
                  <div className="space-y-2">
                    {searchHistory.slice(0, 10).map((search) => (
                      <div key={search.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm text-gray-800">{search.query}</span>
                        <span className="text-xs text-gray-500">
                          {new Date(search.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 text-sm">No search history</p>
                )}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800 flex items-center">
                <Settings size={20} className="mr-2" />
                Account Settings
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-800">Export My Data</h4>
                    <p className="text-sm text-gray-600">Download all your profile data</p>
                  </div>
                  <button
                    onClick={exportUserData}
                    className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    <Download size={16} className="mr-2" />
                    Export
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-800">Clear Cache</h4>
                    <p className="text-sm text-gray-600">Clear temporary data and cache</p>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to clear cache?')) {
                        storage.cleanupOldData();
                        alert('Cache cleared successfully!');
                        loadUserData();
                      }
                    }}
                    className="flex items-center bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors text-sm"
                  >
                    <Trash2 size={16} className="mr-2" />
                    Clear
                  </button>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-800 mb-2">Storage Usage</h4>
                  <div className="text-sm text-gray-600">
                    {(() => {
                      const size = storage.getStorageSize();
                      return `Using ${size.kb} KB of local storage`;
                    })()}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
