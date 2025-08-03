// src/utils/storage.js

export const storage = {
  // Save data to localStorage
  save: (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return false;
    }
  },

  // Get data from localStorage
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error getting from localStorage:', error);
      return defaultValue;
    }
  },

  // Remove data from localStorage
  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing from localStorage:', error);
      return false;
    }
  },

  // Clear all localStorage
  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  },

  // User Management Functions
  saveUser: (userData) => {
    return storage.save('user', {
      ...userData,
      lastLogin: new Date().toISOString(),
      id: userData.id || Date.now()
    });
  },

  getUser: () => {
    return storage.get('user', null);
  },

  updateUser: (updates) => {
    const currentUser = storage.getUser();
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        ...updates,
        lastUpdated: new Date().toISOString()
      };
      return storage.save('user', updatedUser);
    }
    return false;
  },

  removeUser: () => {
    return storage.remove('user');
  },

  isUserLoggedIn: () => {
    const user = storage.getUser();
    return user !== null;
  },

  // User Preferences
  saveUserPreferences: (preferences) => {
    const currentPrefs = storage.getUserPreferences();
    return storage.save('userPreferences', {
      ...currentPrefs,
      ...preferences,
      updatedAt: new Date().toISOString()
    });
  },

  getUserPreferences: () => {
    return storage.get('userPreferences', {
      theme: 'light',
      language: 'en',
      currency: 'INR',
      notifications: true,
      emailUpdates: true
    });
  },

  // Profile Management
  saveUserProfile: (profileData) => {
    const user = storage.getUser();
    if (user) {
      const updatedUser = {
        ...user,
        profile: {
          ...user.profile,
          ...profileData,
          lastUpdated: new Date().toISOString()
        }
      };
      return storage.save('user', updatedUser);
    }
    return false;
  },

  getUserProfile: () => {
    const user = storage.getUser();
    return user?.profile || {
      name: '',
      email: '',
      phone: '',
      address: '',
      profileImage: '',
      dateOfBirth: '',
      gender: '',
      emergencyContact: ''
    };
  },

  // Booking Management
  saveBookingData: (bookingData) => {
    const bookingId = `booking_${Date.now()}`;
    const booking = {
      ...bookingData,
      id: bookingId,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    return storage.save('currentBooking', booking);
  },

  getBookingData: () => {
    return storage.get('currentBooking', null);
  },

  clearBookingData: () => {
    return storage.remove('currentBooking');
  },

  // Booking History
  saveCompletedBooking: (bookingData) => {
    const bookings = storage.getBookingHistory();
    const completedBooking = {
      ...bookingData,
      completedAt: new Date().toISOString(),
      status: 'completed'
    };
    bookings.unshift(completedBooking);
    return storage.save('bookingHistory', bookings.slice(0, 50)); // Keep only last 50 bookings
  },

  getBookingHistory: () => {
    return storage.get('bookingHistory', []);
  },

  updateBookingStatus: (bookingId, status) => {
    const bookings = storage.getBookingHistory();
    const updatedBookings = bookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status, lastUpdated: new Date().toISOString() }
        : booking
    );
    return storage.save('bookingHistory', updatedBookings);
  },

  // Wishlist Management
  saveWishlist: (wishlist) => {
    return storage.save('wishlist', wishlist.map(item => ({
      ...item,
      addedAt: item.addedAt || new Date().toISOString()
    })));
  },

  getWishlist: () => {
    return storage.get('wishlist', []);
  },

  addToWishlist: (item) => {
    const wishlist = storage.getWishlist();
    const exists = wishlist.find(w => w.id === item.id && w.type === item.type);
    if (!exists) {
      const wishlistItem = {
        ...item,
        addedAt: new Date().toISOString(),
        wishlistId: Date.now()
      };
      wishlist.unshift(wishlistItem);
      return storage.saveWishlist(wishlist);
    }
    return false;
  },

  removeFromWishlist: (id, type) => {
    const wishlist = storage.getWishlist();
    const updatedWishlist = wishlist.filter(w => !(w.id === id && w.type === type));
    return storage.saveWishlist(updatedWishlist);
  },

  clearWishlist: () => {
    return storage.save('wishlist', []);
  },

  // Search History
  saveSearchQuery: (query) => {
    const searches = storage.getSearchHistory();
    const newSearch = {
      query: query.trim(),
      timestamp: new Date().toISOString(),
      id: Date.now()
    };
    
    // Remove if already exists and add to beginning
    const filteredSearches = searches.filter(s => s.query !== newSearch.query);
    filteredSearches.unshift(newSearch);
    
    return storage.save('searchHistory', filteredSearches.slice(0, 20)); // Keep only last 20 searches
  },

  getSearchHistory: () => {
    return storage.get('searchHistory', []);
  },

  clearSearchHistory: () => {
    return storage.save('searchHistory', []);
  },

  // Recent Views
  addToRecentViews: (item) => {
    const recentViews = storage.getRecentViews();
    const newView = {
      ...item,
      viewedAt: new Date().toISOString(),
      id: item.id,
      type: item.type
    };
    
    // Remove if already exists and add to beginning
    const filteredViews = recentViews.filter(v => !(v.id === item.id && v.type === item.type));
    filteredViews.unshift(newView);
    
    return storage.save('recentViews', filteredViews.slice(0, 15)); // Keep only last 15 views
  },

  getRecentViews: () => {
    return storage.get('recentViews', []);
  },

  // App Settings
  saveAppSettings: (settings) => {
    const currentSettings = storage.getAppSettings();
    return storage.save('appSettings', {
      ...currentSettings,
      ...settings,
      lastUpdated: new Date().toISOString()
    });
  },

  getAppSettings: () => {
    return storage.get('appSettings', {
      autoSave: true,
      darkMode: false,
      notifications: true,
      location: true,
      analytics: true
    });
  },

  // Contact Management
  saveContactSubmission: (contactData) => {
    const contacts = storage.getContactSubmissions();
    const newContact = {
      ...contactData,
      id: Date.now(),
      submittedAt: new Date().toISOString(),
      status: 'submitted'
    };
    contacts.unshift(newContact);
    return storage.save('contactSubmissions', contacts.slice(0, 10)); // Keep only last 10 submissions
  },

  getContactSubmissions: () => {
    return storage.get('contactSubmissions', []);
  },

  // Data Export/Import
  exportAllData: () => {
    try {
      const allData = {};
      for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          allData[key] = storage.get(key);
        }
      }
      return {
        success: true,
        data: allData,
        exportedAt: new Date().toISOString()
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  importData: (data) => {
    try {
      Object.keys(data).forEach(key => {
        if (key !== 'exportedAt') {
          storage.save(key, data[key]);
        }
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Memory Management
  getStorageSize: () => {
    let total = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += localStorage[key].length;
      }
    }
    return {
      bytes: total,
      kb: (total / 1024).toFixed(2),
      mb: (total / (1024 * 1024)).toFixed(2)
    };
  },

  cleanupOldData: () => {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    // Cleanup old search history
    const searches = storage.getSearchHistory();
    const recentSearches = searches.filter(s => new Date(s.timestamp) > oneMonthAgo);
    storage.save('searchHistory', recentSearches);

    // Cleanup old recent views
    const views = storage.getRecentViews();
    const recentViews = views.filter(v => new Date(v.viewedAt) > oneMonthAgo);
    storage.save('recentViews', recentViews);

    return true;
  }
};
