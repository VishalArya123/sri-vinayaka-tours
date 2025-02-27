import { Link } from 'react-router-dom'
import { Clock, MapPin, Star } from 'lucide-react'

const TourCard = ({ tour }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative">
        <img 
          src={tour.image} 
          alt={tour.title} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-0 right-0 bg-blue-600 text-white px-2 py-1 m-2 rounded-md text-sm font-medium flex items-center">
          <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
          {tour.rating}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{tour.title}</h3>
        
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{tour.location}</span>
        </div>
        
        <div className="flex items-center text-gray-600 mb-3">
          <Clock className="h-4 w-4 mr-1" />
          <span className="text-sm">{tour.duration}</span>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <div>
            <span className="text-blue-600 font-bold">₹{tour.discountedPrice}</span>
            <span className="text-gray-500 text-sm line-through ml-2">₹{tour.actualPrice}</span>
          </div>
          
          <Link 
            to={`/tour/${tour.id}`}
            className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}

export default TourCard