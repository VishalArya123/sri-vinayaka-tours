import React from 'react';
import { MapPin, Clock, Users, Calendar, Car, Bus, Sparkles, Award, Shield } from 'lucide-react';

const ServiceSummaryCard = ({ bookingData }) => {
  if (!bookingData) return null;

  const isVehicleBooking = bookingData.type === 'vehicle';
  const item = isVehicleBooking ? bookingData.vehicle : bookingData.tour;
  const selectedPlan = bookingData.selectedPlan;

  return (
    <div className="bg-white rounded-3xl shadow-warm border border-primary-100 p-6 sticky top-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="inline-flex items-center px-3 py-1 bg-elegant-gradient rounded-full text-white text-sm font-medium font-poppins">
          {isVehicleBooking ? <Car className="w-4 h-4 mr-2" /> : <Calendar className="w-4 h-4 mr-2" />}
          Booking Summary
        </div>
        <div className="animate-pulse-gentle opacity-80">
          <Sparkles className="w-5 h-5 text-accent-yellow" />
        </div>
      </div>

      {/* Service Image */}
      <div className="relative h-32 rounded-2xl overflow-hidden mb-6 shadow-warm">
        <img
          src={item.images?.[0] || item.image || "/placeholder.svg"}
          alt={item.name || item.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute bottom-2 right-2">
          <div className="w-8 h-8 bg-elegant-gradient rounded-2xl flex items-center justify-center">
            <Award className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>

      {/* Service Details */}
      <div className="space-y-4">
        {/* Title */}
        <div>
          <h3 className="font-playfair text-lg font-bold text-secondary-800 mb-1">
            {item.name || item.title}
          </h3>
          <div className="flex items-center text-secondary-600 text-sm">
            <span className="font-poppins">
              {isVehicleBooking ? 'Vehicle Rental' : 'Tour Package'}
            </span>
          </div>
        </div>

        {/* Key Information */}
        <div className="bg-gradient-to-br from-primary-50 to-accent-peach/20 rounded-2xl p-4 space-y-3">
          {item.location && (
            <div className="flex items-center">
              <MapPin className="w-4 h-4 text-primary-500 mr-3" />
              <span className="font-poppins text-sm text-secondary-700">{item.location}</span>
            </div>
          )}
          
          {item.duration && (
            <div className="flex items-center">
              <Clock className="w-4 h-4 text-primary-500 mr-3" />
              <span className="font-poppins text-sm text-secondary-700">{item.duration}</span>
            </div>
          )}
          
          {item.capacity && (
            <div className="flex items-center">
              <Users className="w-4 h-4 text-primary-500 mr-3" />
              <span className="font-poppins text-sm text-secondary-700">Capacity: {item.capacity}</span>
            </div>
          )}
          
          {item.groupSize && (
            <div className="flex items-center">
              <Users className="w-4 h-4 text-primary-500 mr-3" />
              <span className="font-poppins text-sm text-secondary-700">Group: {item.groupSize}</span>
            </div>
          )}
        </div>

        {/* Selected Plan */}
        {selectedPlan && (
          <div className="bg-white border-2 border-primary-200 rounded-2xl p-4">
            <h4 className="font-playfair font-semibold text-secondary-800 mb-3 flex items-center">
              <Shield className="w-4 h-4 text-primary-500 mr-2" />
              Selected Plan
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-poppins text-sm text-secondary-600">Plan:</span>
                <span className="font-poppins text-sm font-medium text-secondary-800">
                  {selectedPlan.name}
                </span>
              </div>
              {selectedPlan.description && (
                <div className="text-xs text-secondary-500 font-poppins">
                  {selectedPlan.description}
                </div>
              )}
              {selectedPlan.maxPersons && (
                <div className="flex justify-between items-center">
                  <span className="font-poppins text-sm text-secondary-600">Max Persons:</span>
                  <span className="font-poppins text-sm font-medium text-secondary-800">
                    {selectedPlan.maxPersons}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Driver Information (for vehicles) */}
        {bookingData.selectedDriver && (
          <div className="bg-secondary-50 rounded-2xl p-4">
            <h4 className="font-playfair font-semibold text-secondary-800 mb-3">Selected Driver</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-poppins text-sm text-secondary-600">Name:</span>
                <span className="font-poppins text-sm font-medium text-secondary-800">
                  {bookingData.selectedDriver.name}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-poppins text-sm text-secondary-600">Experience:</span>
                <span className="font-poppins text-sm font-medium text-secondary-800">
                  {bookingData.selectedDriver.experience}
                </span>
              </div>
              {bookingData.selectedDriver.rating && (
                <div className="flex justify-between items-center">
                  <span className="font-poppins text-sm text-secondary-600">Rating:</span>
                  <div className="flex items-center">
                    <span className="font-poppins text-sm font-medium text-secondary-800 mr-1">
                      {bookingData.selectedDriver.rating}
                    </span>
                    <div className="w-3 h-3 bg-accent-yellow rounded-full"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Price Summary */}
        <div className="border-t border-primary-200 pt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-playfair text-lg font-semibold text-secondary-800">Total Amount:</span>
            <span className="font-playfair text-2xl font-bold text-primary-600">
              ₹{selectedPlan?.price.toLocaleString() || '0'}
            </span>
          </div>
          <div className="text-center">
            <span className="font-poppins text-xs text-secondary-500">
              Includes taxes and fees
            </span>
          </div>
        </div>

        {/* Security Note */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-3">
          <div className="flex items-center text-green-700 text-sm">
            <Shield className="w-4 h-4 mr-2" />
            <span className="font-poppins font-medium">Secure Booking</span>
          </div>
          <p className="font-poppins text-xs text-green-600 mt-1">
            Your booking is protected and confirmed instantly
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceSummaryCard;
