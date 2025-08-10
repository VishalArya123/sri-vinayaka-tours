import React from "react";
import { Clock, MapPin, Users, Calendar, ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";

const TourCardDetailed = ({ tour }) => {
  const {
    id,
    title,
    images,
    description,
    duration,
    location,
    price,
    originalPrice,
    rating,
    startDate,
  } = tour;

  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Image Section */}
      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
        <img
          src={images[0] || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-6">
        {/* Title and Price */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-0 line-clamp-2">
            {title}
          </h3>
          <div className="flex flex-col items-start sm:items-end">
            <div className="flex items-center space-x-2">
              <span className="text-xl sm:text-2xl font-bold text-blue-600">
                ₹{price.toLocaleString()}
              </span>
              {originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  ₹{originalPrice.toLocaleString()}
                </span>
              )}
            {/* <span className="text-xs text-gray-500 mt-1">per person</span> */}
            </div>
          </div>
        </div>
        <div className="flex justify-between m-2">
          {/* Rating Badge */}
          {rating && (
            <div className=" bg-yellow-400 text-gray-900 font-bold rounded-full px-3 py-1 text-sm flex items-center shadow-lg">
              <Star className="w-4 h-4 mr-1 fill-current" />
              {rating}
            </div>
          )}

          {/* Discount Badge */}
          {discount > 0 && (
            <div className=" bg-red-500 text-white font-bold rounded-full px-3 py-1 text-sm shadow-lg">
              {discount}% OFF
            </div>
          )}
        </div>
        {/* Description */}
        <p className="text-gray-600 text-sm sm:text-base mb-4 line-clamp-2">
          {description}
        </p>

        {/* Tour Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <div className="flex items-center text-gray-700">
            <Clock className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" />
            <span className="text-sm">{duration}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <MapPin className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" />
            <span className="text-sm">{location}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Calendar className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" />
            <span className="text-sm">{startDate}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Users className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" />
            <span className="text-sm">Group Tour</span>
          </div>
        </div>



        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to={`/tour/${id}`}
            className="flex-1 bg-blue-700 hover:bg-blue-400 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-300 flex items-center justify-center"
          >
            View Details
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
          {/* <button className="flex-1 sm:flex-initial border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-4 rounded-xl transition-colors duration-300">
            Quick Book
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default TourCardDetailed;
