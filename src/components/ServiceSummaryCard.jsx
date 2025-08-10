import { useState } from "react"
import { ChevronLeft, ChevronRight, MapPin, Users, Clock, CheckCircle, XCircle } from "lucide-react"

const ServiceSummaryCard = ({ bookingData }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!bookingData) return null

  const { type, selectedPlan } = bookingData
  const service = type === "vehicle" ? bookingData.vehicle : bookingData.tour
  const images = service.images || []

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6 border border-gray-100">
      <h3 className="text-2xl font-bold text-gray-800 mb-5">Booking Summary</h3>

      {/* Image Carousel */}
      {images.length > 0 && (
        <div className="relative h-48 rounded-xl overflow-hidden mb-5 shadow-md">
          <img
            src={images[currentImageIndex] || "/placeholder.svg"}
            alt={service.name || service.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />

          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-all"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-all"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1">
                {images.map((_, idx) => (
                  <span
                    key={idx}
                    className={`block w-2 h-2 rounded-full ${idx === currentImageIndex ? "bg-white" : "bg-white/50"}`}
                  ></span>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Service Details */}
      <div className="space-y-4">
        <h4 className="font-bold text-xl text-gray-900">{service.name || service.title}</h4>

        {type === "tour" && (
          <>
            <div className="flex items-center text-gray-700 text-base">
              <MapPin className="h-5 w-5 mr-2 text-blue-500" />
              <span>{service.location}</span>
            </div>
            <div className="flex items-center text-gray-700 text-base">
              <Clock className="h-5 w-5 mr-2 text-blue-500" />
              <span>{service.duration}</span>
            </div>
          </>
        )}
        {type === "vehicle" && (
          <div className="flex items-center text-gray-700 text-base">
            <Users className="h-5 w-5 mr-2 text-blue-500" />
            <span>Capacity: {service.capacity}</span>
          </div>
        )}

        {/* Selected Plan */}
        {selectedPlan && (
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-gray-700">Selected Plan:</span>
              <span className="text-blue-600 font-semibold text-lg">{selectedPlan.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Price:</span>
              <span className="text-2xl font-bold text-blue-600">₹{selectedPlan.price.toLocaleString()}</span>
            </div>
          </div>
        )}

        {/* Driver Info (for buses) */}
        {bookingData.selectedDriver && (
          <div className="bg-green-50 p-4 rounded-xl border border-green-100">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">Driver:</span>
              <span className="text-green-600 font-semibold text-lg">{bookingData.selectedDriver.name}</span>
            </div>
            <div className="text-sm text-gray-600 mt-1">Experience: {bookingData.selectedDriver.experience} years</div>
          </div>
        )}

        {/* Quick Inclusions/Exclusions */}
        <div className="text-sm space-y-3 pt-2">
          {service.inclusions && service.inclusions.length > 0 && (
            <div>
              <span className="font-semibold text-green-700 flex items-center mb-1">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                Includes:
              </span>
              <ul className="list-disc list-inside text-gray-600 space-y-1 pl-2">
                {service.inclusions.slice(0, 3).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
                {service.inclusions.length > 3 && <li>{"...and more"}</li>}
              </ul>
            </div>
          )}
          {service.exclusions && service.exclusions.length > 0 && (
            <div>
              <span className="font-semibold text-red-700 flex items-center mb-1">
                <XCircle className="h-4 w-4 mr-2 text-red-500" />
                Excludes:
              </span>
              <ul className="list-disc list-inside text-gray-600 space-y-1 pl-2">
                {service.exclusions.slice(0, 3).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
                {service.exclusions.length > 3 && <li>{"...and more"}</li>}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ServiceSummaryCard
