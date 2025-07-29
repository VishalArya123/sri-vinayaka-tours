// src/components/VehicleCard.jsx
import React from 'react';
import { Users, Settings } from 'lucide-react';

const VehicleCard = ({ vehicle, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect(vehicle)}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={vehicle.images[0]} 
          alt={vehicle.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{vehicle.name}</h3>
        
        <div className="flex items-center text-gray-600 mb-4">
          <Users className="h-5 w-5 mr-2" />
          <span>Capacity: {vehicle.capacity}</span>
        </div>
        
        <div className="flex items-center text-blue-600 hover:text-blue-800">
          <Settings className="h-5 w-5 mr-2" />
          <span className="font-medium">View Details</span>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
