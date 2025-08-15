import { useState, useEffect } from "react"
import { Search, Filter, Car, Bus, Sparkles, Shield, Clock, Award, CheckCircle, X } from "lucide-react"
import VehicleCard from "../components/VehicleCard"
import VehicleModal from "../components/VehicleModal"
import { vehicles } from "../data/mockData"
import { useLocation } from "react-router-dom"

// Features data for the why choose us section
const features = [
  {
    icon: Shield,
    title: "Verified Drivers",
    description: "All our drivers are licensed, experienced, and background verified for your safety."
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock customer support and roadside assistance throughout your journey."
  },
  {
    icon: Award,
    title: "Well-Maintained Fleet",
    description: "Regular maintenance and sanitization of all vehicles for optimal performance."
  },
  {
    icon: CheckCircle,
    title: "Transparent Pricing",
    description: "No hidden charges. What you see is what you pay with detailed cost breakdown."
  }
];

const RentalService = () => {
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const location = useLocation()

  // Effect to open modal if URL parameters indicate
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const modalParam = queryParams.get("modal")
    const vehicleIdParam = queryParams.get("vehicleId")
    const vehicleTypeParam = queryParams.get("vehicleType") // NEW: Get vehicleType from URL

    if (modalParam === "open" && vehicleIdParam && vehicleTypeParam) {
      const targetId = Number.parseInt(vehicleIdParam)
      let vehicleToOpen = null

      // NEW: Find the vehicle based on both ID and type
      if (vehicleTypeParam === "car") {
        vehicleToOpen = vehicles.cars.find((v) => v.id === targetId)
      } else if (vehicleTypeParam === "bus") {
        vehicleToOpen = vehicles.buses.find((v) => v.id === targetId)
      }

      if (vehicleToOpen) {
        setSelectedVehicle(vehicleToOpen)
        setIsModalOpen(true)
      }
    }
  }, [location.search])

  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedVehicle(null)
    // Optionally, clear the URL parameters after closing the modal
    const newUrl = new URL(window.location.href)
    newUrl.searchParams.delete("modal")
    newUrl.searchParams.delete("vehicleId")
    newUrl.searchParams.delete("vehicleType") // NEW: Clear vehicleType
    window.history.replaceState({}, "", newUrl.toString())
  }

  const filterVehicles = (type) => {
    if (type === "all") {
      return [...vehicles.cars, ...vehicles.buses]
    }
    return vehicles[type] || []
  }

  const filteredVehicles = filterVehicles(selectedType).filter(
    (vehicle) =>
      vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.capacity.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background-light">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-32 lg:pb-24 bg-gradient-to-br from-secondary-900 via-secondary-800 to-primary-800 text-white overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 animate-float">
            <Sparkles className="w-16 h-16 text-accent-yellow" />
          </div>
          <div className="absolute top-40 right-20 animate-bounce-gentle" style={{animationDelay: '1s'}}>
            <Car className="w-12 h-12 text-accent-peach" />
          </div>
          <div className="absolute bottom-32 left-32 animate-float" style={{animationDelay: '2s'}}>
            <Bus className="w-14 h-14 text-accent-yellow" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-glass-gradient backdrop-blur-sm border border-white/20 rounded-full text-white/90 font-medium mb-6 animate-fade-in">
              <Car className="w-4 h-4 mr-2" />
              Vehicle Rental Services
            </div>
            
            <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in-up">
              Vehicle Rental
              <span className="text-accent-yellow"> Services</span>
            </h1>
            
            <p className="font-poppins text-lg sm:text-xl text-white/90 leading-relaxed mb-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              Choose from our fleet of well-maintained cars and buses for your travel needs.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search vehicles by name or capacity..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 pr-16 bg-glass-gradient backdrop-blur-lg border border-white/30 text-white placeholder-white/70 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent-yellow focus:border-transparent font-poppins text-lg"
                />
                <Search className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-primary-50 to-secondary-50 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-20 right-10 animate-rotate-gentle opacity-10">
          <Sparkles className="w-32 h-32 text-primary-400" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center px-4 py-2 bg-elegant-gradient rounded-full text-white font-medium mb-6">
              <Award className="w-4 h-4 mr-2" />
              Why Choose Us
            </div>
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-secondary-800 mb-6">
              Experience Premium
              <span className="bg-elegant-gradient bg-clip-text text-transparent"> Travel Services</span>
            </h2>
            <p className="font-poppins text-lg text-secondary-600 max-w-3xl mx-auto">
              We provide more than just vehicles - we deliver complete travel solutions with comfort, safety, and reliability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group text-center animate-fade-in-up"
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <div className="bg-white rounded-3xl p-8 shadow-warm hover:shadow-float transition-all duration-500 transform hover:-translate-y-2 h-full">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-elegant-gradient mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="font-playfair text-xl font-bold text-secondary-800 mb-4">
                    {feature.title}
                  </h3>
                  <p className="font-poppins text-secondary-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter and Vehicle Listings */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-background-light">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filter Sidebar */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="bg-white rounded-3xl shadow-warm p-6 sticky top-6 animate-fade-in-up">
                <h3 className="font-playfair text-xl font-bold text-secondary-800 mb-6 flex items-center">
                  <Filter size={18} className="mr-3 text-primary-600" />
                  Filter Vehicles
                </h3>
                
                {/* Vehicle Type Filter */}
                <div className="mb-6">
                  <h4 className="font-poppins font-medium text-secondary-700 mb-4">Vehicle Type</h4>
                  <div className="space-y-3">
                    {[
                      { id: "all", name: "All Vehicles" },
                      { id: "cars", name: "Cars" },
                      { id: "buses", name: "Buses" },
                    ].map((type) => (
                      <div key={type.id} className="flex items-center">
                        <input
                          type="radio"
                          id={type.id}
                          name="vehicleType"
                          checked={selectedType === type.id}
                          onChange={() => setSelectedType(type.id)}
                          className="mr-3 text-primary-600 focus:ring-primary-500 w-4 h-4"
                        />
                        <label htmlFor={type.id} className="font-poppins text-secondary-600 hover:text-primary-600 cursor-pointer transition-colors">
                          {type.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Clear Filters */}
                <button
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedType("all")
                  }}
                  className="w-full px-4 py-3 bg-secondary-100 text-secondary-700 rounded-xl hover:bg-secondary-200 transition-colors font-poppins font-medium"
                >
                  Clear All Filters
                </button>
              </div>
            </div>

            {/* Vehicle Listings */}
            <div className="flex-1">
              {/* Cars Section */}
              {(selectedType === "all" || selectedType === "cars") && (
                <div className="mb-12">
                  <div className="flex items-center mb-8 animate-fade-in-up">
                    <Car className="w-8 h-8 text-primary-600 mr-3" />
                    <h2 className="font-playfair text-3xl font-bold text-secondary-800">Cars</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {vehicles.cars
                      .filter(
                        (car) =>
                          car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          car.capacity.toLowerCase().includes(searchTerm.toLowerCase()),
                      )
                      .map((car, index) => (
                        <div 
                          key={car.id} 
                          className="animate-fade-in-up"
                          style={{animationDelay: `${index * 0.1}s`}}
                        >
                          <VehicleCard vehicle={car} onSelect={handleVehicleSelect} />
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Buses Section */}
              {(selectedType === "all" || selectedType === "buses") && (
                <div>
                  <div className="flex items-center mb-8 animate-fade-in-up">
                    <Bus className="w-8 h-8 text-primary-600 mr-3" />
                    <h2 className="font-playfair text-3xl font-bold text-secondary-800">Buses</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {vehicles.buses
                      .filter(
                        (bus) =>
                          bus.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          bus.capacity.toLowerCase().includes(searchTerm.toLowerCase()),
                      )
                      .map((bus, index) => (
                        <div 
                          key={bus.id} 
                          className="animate-fade-in-up"
                          style={{animationDelay: `${index * 0.1}s`}}
                        >
                          <VehicleCard vehicle={bus} onSelect={handleVehicleSelect} />
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* No Results */}
              {filteredVehicles.length === 0 && (
                <div className="text-center py-16 animate-fade-in">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-primary-100 to-primary-200 mb-6">
                    <Search className="w-12 h-12 text-primary-600" />
                  </div>
                  <h3 className="font-playfair text-2xl font-bold text-secondary-800 mb-4">
                    No vehicles found
                  </h3>
                  <p className="font-poppins text-secondary-600 mb-8 max-w-md mx-auto">
                    Try adjusting your search or filters to find more results.
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedType("all")
                    }}
                    className="inline-flex items-center px-6 py-3 bg-elegant-gradient text-white font-semibold rounded-xl hover:shadow-elegant transition-all duration-300 transform hover:scale-105"
                  >
                    <X className="w-4 h-4 mr-2" />
                    View All Vehicles
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Modal */}
      <VehicleModal vehicle={selectedVehicle} isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  )
}

export default RentalService
