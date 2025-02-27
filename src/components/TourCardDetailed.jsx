import React from 'react';
import { Clock, MapPin, Users, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const TourCardDetailed = ({ tour }) => {
  const { id, title, image, description, duration, location, price, rating, startDate } = tour;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6 flex flex-col md:flex-row hover:shadow-xl transition-shadow duration-300">
      <div className="md:w-1/3 h-60 md:h-auto relative">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        {rating && (
          <div className="absolute top-4 right-4 bg-yellow-400 text-gray-800 font-bold rounded-full p-2 text-sm flex items-center">
            {rating} ★
          </div>
        )}
      </div>
      
      <div className="p-6 md:w-2/3 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-gray-800">{title}</h3>
            <p className="text-xl font-bold text-blue-600">₹{price.toLocaleString()}</p>
          </div>
          
          <p className="text-gray-600 mb-4">{description}</p>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center text-gray-700">
              <Clock size={16} className="mr-2" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <MapPin size={16} className="mr-2" />
              <span>{location}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Calendar size={16} className="mr-2" />
              <span>{startDate}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Users size={16} className="mr-2" />
              <span>Group Tour</span>
            </div>
          </div>
        </div>
        
        <Link 
          to={`/tour/${id}`} 
          className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 mt-2"
        >
          View Details
          <ArrowRight size={16} className="ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default TourCardDetailed;