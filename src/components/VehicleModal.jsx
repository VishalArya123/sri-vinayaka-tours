// src/components/VehicleModal.jsx
import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, CheckCircle, XCircle, User, Award, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../utils/storage';

const VehicleModal = ({ vehicle, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const navigate = useNavigate();

  if (!isOpen || !vehicle) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % vehicle.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + vehicle.images.length) % vehicle.images.length);
  };

  const handleBookNow = () => {
    if (!selectedPlan) {
      alert('Please select a plan first');
      return;
    }

    const bookingData = {
      type: 'vehicle',
      vehicle,
      selectedPlan,
      selectedDriver: vehicle.type === 'bus' ? selectedDriver : null,
      timestamp: new Date().toISOString()
    };

    storage.saveBookingData(bookingData);
    navigate('/booking-form', { state: bookingData });
  };

  const handleSaveTour = () => {
    const wishlistItem = {
      id: vehicle.id,
      type: 'vehicle',
      name: vehicle.name,
      image: vehicle.images[0],
      price: selectedPlan?.price || vehicle.plans[0]?.price,
      savedOn: new Date().toLocaleDateString()
    };

    const success = storage.addToWishlist(wishlistItem);
    if (success) {
      alert('Vehicle saved to wishlist!');
    } else {
      alert('Vehicle already in wishlist!');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">{vehicle.name}</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Image Carousel */}
          <div className="relative h-80 rounded-lg overflow-hidden mb-6">
            <img 
              src={vehicle.images[currentImageIndex]} 
              alt={`${vehicle.name} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
            
            {vehicle.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-70 rounded-full p-2"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-70 rounded-full p-2"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
                
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                  {vehicle.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Plans */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Select Plan</h3>
                <div className="grid gap-3">
                  {vehicle.plans.map((plan) => (
                    <div
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedPlan?.id === plan.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">{plan.name}</h4>
                          <p className="text-sm text-gray-600">{plan.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-blue-600">₹{plan.price}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Driver Selection for Buses */}
              {vehicle.type === 'bus' && vehicle.drivers && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Select Driver</h3>
                  <div className="grid gap-3">
                    {vehicle.drivers.map((driver) => (
                      <div
                        key={driver.id}
                        onClick={() => setSelectedDriver(driver)}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          selectedDriver?.id === driver.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <User className="h-10 w-10 bg-gray-200 rounded-full p-2 mr-3" />
                            <div>
                              <h4 className="font-medium">{driver.name}</h4>
                              <p className="text-sm text-gray-600">License: {driver.license}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center mb-1">
                              <Award className="h-4 w-4 text-yellow-500 mr-1" />
                              <span className="text-sm">{driver.rating}</span>
                            </div>
                            <p className="text-sm text-gray-600">{driver.experience}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Inclusions & Exclusions */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Inclusions
                  </h3>
                  <ul className="space-y-2">
                    {vehicle.inclusions.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <XCircle className="h-5 w-5 text-red-500 mr-2" />
                    Exclusions
                  </h3>
                  <ul className="space-y-2">
                    {vehicle.exclusions.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <XCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Notes */}
              {vehicle.notes && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-medium text-yellow-800 mb-2">Important Notes</h4>
                  <p className="text-yellow-700">{vehicle.notes}</p>
                </div>
              )}
            </div>

            {/* Right Column - Booking */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 sticky top-6">
                <h3 className="text-xl font-semibold mb-4">Booking Summary</h3>
                
                {selectedPlan && (
                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <span>Selected Plan:</span>
                      <span className="font-medium">{selectedPlan.name}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Price:</span>
                      <span className="text-xl font-bold text-blue-600">₹{selectedPlan.price}</span>
                    </div>
                  </div>
                )}

                {selectedDriver && (
                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <span>Driver:</span>
                      <span className="font-medium">{selectedDriver.name}</span>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <button
                    onClick={handleBookNow}
                    disabled={!selectedPlan}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                      selectedPlan
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Book Now
                  </button>
                  
                  <button
                    onClick={handleSaveTour}
                    className="w-full py-3 px-4 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                  >
                    Save Vehicle
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleModal;
