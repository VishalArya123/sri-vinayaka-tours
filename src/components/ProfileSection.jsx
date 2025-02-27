import React, { useState } from 'react';
import { User, Edit2, Save, Package, Clock, Calendar, MapPin, Heart,Bookmark } from 'lucide-react';

const ProfileSection = () => {
  // Mock user data
  const [user, setUser] = useState({
    name: 'Arjun Kumar',
    email: 'arjun.kumar@example.com',
    phone: '+91 98765 43210',
    address: 'Bangalore, Karnataka',
    profileImage: 'https://randomuser.me/api/portraits/men/32.jpg'
  });

  // Mock booking history
  const [bookings, setBookings] = useState([
    {
      id: 1,
      tourName: 'Kerala Backwaters Explorer',
      date: '15 Oct 2024',
      status: 'Completed',
      price: 15000,
      image: 'https://images.unsplash.com/photo-1602424770373-55fff487add4'
    },
    {
      id: 2,
      tourName: 'Golden Triangle Tour',
      date: '05 Dec 2024',
      status: 'Upcoming',
      price: 18500,
      image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da'
    }
  ]);

  // Mock wishlist/favorites data
  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      tourName: 'Ladakh Adventure',
      location: 'Leh, Ladakh',
      price: 22000,
      savedOn: '18 Jan 2025',
      image: 'https://images.unsplash.com/photo-1574700655776-c1cb53a5ddb9'
    },
    {
      id: 2,
      tourName: 'Goa Beach Retreat',
      location: 'North Goa',
      price: 12500,
      savedOn: '05 Feb 2025',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2'
    },
    {
      id: 3,
      tourName: 'Andaman Island Hopping',
      location: 'Port Blair',
      price: 28000,
      savedOn: '22 Feb 2025',
      image: 'https://images.unsplash.com/photo-1589309736404-2e142a2acdf0'
    }
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ ...user });

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      setUser(editForm);
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

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter(item => item.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-600 p-6 text-white">
          <h2 className="text-2xl font-bold">My Profile</h2>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 mb-6 md:mb-0 flex flex-col items-center">
              <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4">
                <img 
                  src={user.profileImage} 
                  alt={user.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <button 
                onClick={handleEditToggle}
                className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
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
            
            <div className="md:w-2/3 md:pl-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-500 text-sm mb-1">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={editForm.name}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  ) : (
                    <p className="text-gray-800 font-medium flex items-center">
                      <User size={16} className="mr-2 text-gray-500" />
                      {user.name}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-gray-500 text-sm mb-1">Email Address</label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={editForm.email}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">{user.email}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-gray-500 text-sm mb-1">Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={editForm.phone}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">{user.phone}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-gray-500 text-sm mb-1">Address</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="address"
                      value={editForm.address}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">{user.address}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Wishlist/Favorites Section */}
          <div className="mt-12">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <Bookmark size={20} className="mr-2 text-black-500" />
              My Wishlist
            </h3>
            
            {wishlist.length === 0 ? (
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <p className="text-gray-600">You don't have any saved tours yet.</p>
                <button className="mt-2 text-blue-600 hover:text-blue-700 font-medium">
                  Browse Tours
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {wishlist.map((item) => (
                  <div 
                    key={item.id} 
                    className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="relative h-40">
                      <img 
                        src={item.image} 
                        alt={item.tourName} 
                        className="w-full h-full object-cover"
                      />
                      <button 
                        onClick={() => removeFromWishlist(item.id)}
                        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                        title="Remove from wishlist"
                      >
                        <Bookmark size={16} className="text-blue-500" fill="blue" />
                      </button>
                    </div>
                    
                    <div className="p-4">
                      <h4 className="text-lg font-bold text-gray-800 mb-1">{item.tourName}</h4>
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin size={14} className="mr-1" />
                        <span className="text-sm">{item.location}</span>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="font-medium text-gray-800">₹{item.price.toLocaleString()}</span>
                        <span className="text-xs text-gray-500">Saved on {item.savedOn}</span>
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
          
          {/* Bookings Section */}
          <div className="mt-12">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <Package size={20} className="mr-2" />
              My Bookings
            </h3>
            
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div 
                  key={booking.id} 
                  className="border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row hover:shadow-md transition-shadow"
                >
                  <div className="sm:w-1/4 h-32 mb-4 sm:mb-0">
                    <img 
                      src={booking.image} 
                      alt={booking.tourName} 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  
                  <div className="sm:w-3/4 sm:pl-6 flex flex-col justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-gray-800">{booking.tourName}</h4>
                      
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div className="flex items-center text-gray-600">
                          <Calendar size={16} className="mr-2" />
                          <span>{booking.date}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MapPin size={16} className="mr-2" />
                          <span>Tour Package</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4">
                      <span className="font-medium text-gray-800">₹{booking.price.toLocaleString()}</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        booking.status === 'Completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;