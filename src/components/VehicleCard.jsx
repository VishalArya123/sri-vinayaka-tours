import React from 'react';
import { Users, Star, ArrowRight, Sparkles } from 'lucide-react';

const VehicleCard = ({ vehicle, onSelect }) => {
  return (
    <div 
      className="group bg-white rounded-3xl shadow-warm hover:shadow-float transition-all duration-500 transform hover:-translate-y-2 overflow-hidden cursor-pointer"
      onClick={() => onSelect(vehicle)}
    >
      
      {/* Vehicle Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={vehicle.images[0] || "/placeholder.svg"}
          alt={vehicle.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Vehicle Type Badge */}
        <div className="absolute top-4 left-4 bg-elegant-gradient text-white px-3 py-1 rounded-full text-sm font-medium animate-fade-in">
          {vehicle.type === 'car' ? 'Car' : 'Bus'}
        </div>

        {/* Sparkle Effect */}
        <div className="absolute bottom-4 right-4 animate-pulse-gentle opacity-80">
          <Sparkles className="w-5 h-5 text-accent-yellow" />
        </div>
      </div>

      {/* Vehicle Info */}
      <div className="p-6">
        <h3 className="font-playfair text-xl font-bold text-secondary-800 mb-2 group-hover:text-primary-600 transition-colors duration-300">
          {vehicle.name}
        </h3>
        
        {/* Vehicle Details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-secondary-600">
            <Users className="w-4 h-4 text-primary-500 mr-2" />
            <span className="font-poppins text-sm">
              Capacity: {vehicle.capacity}
            </span>
          </div>
        </div>

        {/* Plans Preview */}
        <div className="mb-6">
          <div className="text-sm text-secondary-500 mb-2 font-poppins">Available Plans:</div>
          <div className="flex flex-wrap gap-2">
            {vehicle.plans.slice(0, 2).map((plan, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary-50 text-primary-600 text-xs rounded-full font-poppins"
              >
                {plan.name}
              </span>
            ))}
            {vehicle.plans.length > 2 && (
              <span className="px-3 py-1 bg-secondary-100 text-secondary-600 text-xs rounded-full font-poppins">
                +{vehicle.plans.length - 2} more
              </span>
            )}
          </div>
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between">
          <div>
            <span className="font-playfair text-2xl font-bold text-primary-600">
              ₹{vehicle.plans[0]?.price?.toLocaleString()}
            </span>
            <span className="font-poppins text-sm text-secondary-500 block">
              starting from
            </span>
          </div>
          
          <button className="group/btn inline-flex items-center px-6 py-3 bg-elegant-gradient text-white font-semibold rounded-xl hover:shadow-elegant transition-all duration-300 transform hover:scale-105">
            <span className="mr-2">View Details</span>
            <ArrowRight className="w-4 h-4 transform transition-transform duration-300 group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-elegant-gradient transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
    </div>
  );
};

export default VehicleCard;
