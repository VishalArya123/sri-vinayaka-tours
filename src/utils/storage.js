import { useState, useEffect } from 'react';

const STORAGE_KEY_PREFIX = "travel_app_";

// Custom hook for reactive storage
export const useStorage = (key, defaultValue = null) => {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(`${STORAGE_KEY_PREFIX}${key}`);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return defaultValue;
    }
  });

  const setStoredValue = (newValue) => {
    try {
      setValue(newValue);
      localStorage.setItem(`${STORAGE_KEY_PREFIX}${key}`, JSON.stringify(newValue));
      // Dispatch custom event for cross-component updates
      window.dispatchEvent(new CustomEvent('storage-update', {
        detail: { key, value: newValue }
      }));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Listen for storage changes
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.detail?.key === key) {
        setValue(e.detail.value);
      }
    };

    window.addEventListener('storage-update', handleStorageChange);
    return () => window.removeEventListener('storage-update', handleStorageChange);
  }, [key]);

  return [value, setStoredValue];
};

export const storage = {
  // Helper to safely parse JSON
  _safeParse: (key) => {
    try {
      const item = localStorage.getItem(`${STORAGE_KEY_PREFIX}${key}`);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error(`Error parsing localStorage item "${key}":`, e);
      return null;
    }
  },

  // Helper to safely stringify and set JSON
  _safeSet: (key, value) => {
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}${key}`, JSON.stringify(value));
      // Dispatch update event
      window.dispatchEvent(new CustomEvent('storage-update', {
        detail: { key, value }
      }));
      return true;
    } catch (e) {
      console.error(`Error setting localStorage item "${key}":`, e);
      return false;
    }
  },

  // Save any data
  save: (key, data) => storage._safeSet(key, data),

  // Get any data
  get: (key) => storage._safeParse(key),

  // Remove data
  remove: (key) => {
    try {
      localStorage.removeItem(`${STORAGE_KEY_PREFIX}${key}`);
      window.dispatchEvent(new CustomEvent('storage-update', {
        detail: { key, value: null }
      }));
      return true;
    } catch (error) {
      console.error("Error removing from localStorage:", error);
      return false;
    }
  },

  // Clear all data
  clear: () => {
    try {
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const key = localStorage.key(i);
        if (key && key.startsWith(STORAGE_KEY_PREFIX)) {
          localStorage.removeItem(key);
        }
      }
      window.dispatchEvent(new CustomEvent('storage-update', {
        detail: { key: 'clear', value: null }
      }));
      return true;
    } catch (error) {
      console.error("Error clearing localStorage:", error);
      return false;
    }
  },

  // User Management
  saveUser: (userData) => storage._safeSet("userProfile", userData),
  
  getUser: () => storage._safeParse("userProfile"),

  updateUser: (updates) => {
    const currentUser = storage.getUser();
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        ...updates,
        lastUpdated: new Date().toISOString(),
      };
      return storage.saveUser(updatedUser);
    }
    return false;
  },

  removeUser: () => {
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}userProfile`);
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}userPreferences`);
  },

  getUserProfile: () => {
    return storage._safeParse("userProfile") || {
      name: "",
      email: "",
      phone: "",
      address: "",
      gender: "",
      profileImage: "",
      preferences: {
        theme: "light",
        notifications: true,
      },
    };
  },

  // Authentication
  login: (email, password) => {
    const users = storage._safeParse("registeredUsers") || [];
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      storage._safeSet("isAuthenticated", true);
      storage.saveUser(user);
      return true;
    }
    return false;
  },

  register: (userData) => {
    const users = storage._safeParse("registeredUsers") || [];
    if (users.some((u) => u.email === userData.email)) {
      return { success: false, message: "Email already registered." };
    }
    users.push(userData);
    const success = storage._safeSet("registeredUsers", users);
    if (success) {
      storage.saveUser(userData);
      storage._safeSet("isAuthenticated", true);
      return { success: true, message: "Registration successful!" };
    }
    return { success: false, message: "Failed to register user." };
  },

  logout: () => {
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}isAuthenticated`);
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}userProfile`);
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}wishlist`);
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}bookingHistory`);
    // localStorage.removeItem(`${STORAGE_KEY_PREFIX}recentViews`);
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}searchHistory`);
    window.dispatchEvent(new CustomEvent('storage-update', {
      detail: { key: 'logout', value: null }
    }));
  },

  isAuthenticated: () => storage._safeParse("isAuthenticated") === true,

  isUserLoggedIn: () => storage.isAuthenticated(),

  // Wishlist Management
  getWishlist: () => storage._safeParse("wishlist") || [],

  addToWishlist: (item) => {
    const wishlist = storage.getWishlist();
    if (!wishlist.some((w) => w.id === item.id && w.type === item.type)) {
      wishlist.push({ ...item, addedAt: new Date().toISOString() });
      return storage._safeSet("wishlist", wishlist);
    }
    return false;
  },

  removeFromWishlist: (id, type) => {
    let wishlist = storage.getWishlist();
    const initialLength = wishlist.length;
    wishlist = wishlist.filter((item) => !(item.id === id && item.type === type));
    if (wishlist.length < initialLength) {
      return storage._safeSet("wishlist", wishlist);
    }
    return false;
  },

  clearWishlist: () => storage._safeSet("wishlist", []),

  // Booking Data Management
  saveBookingData: (bookingData) => {
    return storage._safeSet("currentBooking", bookingData);
  },

  getBookingData: () => {
    return storage._safeParse("currentBooking");
  },

  clearBookingData: () => {
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}currentBooking`);
    return true;
  },

  // Completed Booking Management  
  saveCompletedBooking: (bookingData) => {
    const bookings = storage.getBookingHistory();
    const newBooking = {
      ...bookingData,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      status: "confirmed"
    };
    bookings.push(newBooking);
    return storage._safeSet("bookingHistory", bookings);
  },

  // Booking History
  getBookingHistory: () => storage._safeParse("bookingHistory") || [],

  addBooking: (booking) => {
    const bookings = storage.getBookingHistory();
    bookings.push({ 
      ...booking, 
      id: Date.now().toString(), 
      date: new Date().toISOString(), 
      status: "confirmed" 
    });
    return storage._safeSet("bookingHistory", bookings);
  },

  updateBookingStatus: (bookingId, status) => {
    const bookings = storage.getBookingHistory();
    const updatedBookings = bookings.map((booking) =>
      booking.id === bookingId 
        ? { ...booking, status, lastUpdated: new Date().toISOString() } 
        : booking
    );
    return storage._safeSet("bookingHistory", updatedBookings);
  },

  // Recent Views
  // getRecentViews: () => storage._safeParse("recentViews") || [],

  // addRecentView: (item) => {
  //   let recentViews = storage.getRecentViews();
  //   recentViews = recentViews.filter((view) => !(view.id === item.id && view.type === item.type));
  //   recentViews.unshift({ ...item, viewedAt: new Date().toISOString() });
  //   recentViews = recentViews.slice(0, 10);
  //   return storage._safeSet("recentViews", recentViews);
  // },

  // Search History
  getSearchHistory: () => storage._safeParse("searchHistory") || [],

  addSearchQuery: (query) => {
    let searchHistory = storage.getSearchHistory();
    const newSearch = { 
      id: Date.now().toString(), 
      query, 
      timestamp: new Date().toISOString() 
    };
    searchHistory = searchHistory.filter((s) => s.query !== query);
    searchHistory.unshift(newSearch);
    searchHistory = searchHistory.slice(0, 10);
    return storage._safeSet("searchHistory", searchHistory);
  },

  clearSearchHistory: () => storage._safeSet("searchHistory", []),

  // Data Export/Import
  exportAllData: () => {
    try {
      const data = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(STORAGE_KEY_PREFIX)) {
          data[key] = storage._safeParse(key.replace(STORAGE_KEY_PREFIX, ''));
        }
      }
      return { success: true, data };
    } catch (e) {
      return { success: false, error: e.message };
    }
  },

  importAllData: (data) => {
    try {
      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
          storage._safeSet(key, data[key]);
        }
      }
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  },

  // Cleanup old data
  cleanupOldData: () => {
    // localStorage.removeItem(`${STORAGE_KEY_PREFIX}recentViews`);
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}searchHistory`);
  },

  // Get storage size
  getStorageSize: () => {
    let totalBytes = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      if (value && key && key.startsWith(STORAGE_KEY_PREFIX)) {
        totalBytes += (key.length + value.length) * 2;
      }
    }
    return {
      bytes: totalBytes,
      kb: (totalBytes / 1024).toFixed(2),
      mb: (totalBytes / (1024 * 1024)).toFixed(2),
    };
  },
};