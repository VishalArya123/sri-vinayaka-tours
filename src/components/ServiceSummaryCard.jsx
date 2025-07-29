// src/components/ServiceSummaryCard.jsx
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Users, Calendar } from 'lucide-react';

const ServiceSummaryCard = ({ bookingData }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!bookingData) return null;

  const { type, selectedPlan } = bookingData;
  const service = type === 'vehicle' ? bookingData.vehicle : bookingData.tour;
  const images = service.images || [];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Booking Summary</h3>
      
      {/* Image Carousel */}
      {images.length > 0 && (
        <div className="relative h-40 rounded-lg overflow-hidden mb-4">
          <img 
            src={images[currentImageIndex]} 
            alt={service.name || service.title}
            className="w-full h-full object-cover"
          />
          
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-70 rounded-full p-1"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-70 rounded-full p-1"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      )}

      {/* Service Details */}
      <div className="space-y-3">
        <h4 className="font-semibold text-lg">{service.name || service.title}</h4>
        
        {type === 'tour' && (
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{service.location}</span>
          </div>
        )}

        {type === 'vehicle' && (
          <div className="flex items-center text-gray-600 text-sm">
            <Users className="h-4 w-4 mr-1" />
            <span>Capacity: {service.capacity}</span>
          </div>
        )}

        {/* Selected Plan */}
        {selectedPlan && (
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Selected Plan:</span>
              <span className="text-blue-600 font-semibold">{selectedPlan.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Price:</span>
              <span className="text-xl font-bold text-blue-600">₹{selectedPlan.price}</span>
            </div>
          </div>
        )}

        {/* Driver Info (for buses) */}
        {bookingData.selectedDriver && (
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-medium">Driver:</span>
              <span className="text-green-600 font-semibold">{bookingData.selectedDriver.name}</span>
            </div>
            <div className="text-sm text-gray-600 mt-1">
              Experience: {bookingData.selectedDriver.experience}
            </div>
          </div>
        )}

        {/* Quick Inclusions/Exclusions */}
        <div className="text-xs space-y-2">
          <div>
            <span className="font-medium text-green-600">Includes:</span>
            <p className="text-gray-600">{service.inclusions?.slice(0, 2).join(', ')}...</p>
          </div>
          <div>
            <span className="font-medium text-red-600">Excludes:</span>
            <p className="text-gray-600">{service.exclusions?.slice(0, 2).join(', ')}...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSummaryCard;
