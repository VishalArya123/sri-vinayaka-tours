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

  // Save user preferences
  saveUserPreferences: (preferences) => {
    return storage.save('userPreferences', preferences);
  },

  // Get user preferences
  getUserPreferences: () => {
    return storage.get('userPreferences', {
      theme: 'light',
      language: 'en',
      currency: 'INR'
    });
  },

  // Save booking data
  saveBookingData: (bookingData) => {
    return storage.save('currentBooking', bookingData);
  },

  // Get booking data
  getBookingData: () => {
    return storage.get('currentBooking', null);
  },

  // Save wishlist
  saveWishlist: (wishlist) => {
    return storage.save('wishlist', wishlist);
  },

  // Get wishlist
  getWishlist: () => {
    return storage.get('wishlist', []);
  },

  // Add to wishlist
  addToWishlist: (item) => {
    const wishlist = storage.getWishlist();
    const exists = wishlist.find(w => w.id === item.id && w.type === item.type);
    if (!exists) {
      wishlist.push(item);
      return storage.saveWishlist(wishlist);
    }
    return false;
  },

  // Remove from wishlist
  removeFromWishlist: (id, type) => {
    const wishlist = storage.getWishlist();
    const updatedWishlist = wishlist.filter(w => !(w.id === id && w.type === type));
    return storage.saveWishlist(updatedWishlist);
  }
};
