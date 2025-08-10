"use client"

import { useState, useEffect } from "react"
import { Search, Filter } from "lucide-react"
import VehicleCard from "../components/VehicleCard"
import VehicleModal from "../components/VehicleModal"
import { vehicles } from "../data/mockData"
import { useLocation } from "react-router-dom"

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Vehicle Rental Services</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Choose from our fleet of well-maintained cars and buses for your travel needs.
          </p>
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <input
              type="text"
              placeholder="Search vehicles by name or capacity..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-4 pr-12 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-lg"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600 h-5 w-5" />
          </div>
        </div>
      </section>
      {/* Filter and Vehicle Listings */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filter Sidebar */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
                  <Filter size={18} className="mr-2 text-green-600" />
                  Filter Vehicles
                </h3>
                {/* Vehicle Type Filter */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-3">Vehicle Type</h4>
                  <div className="space-y-2">
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
                          className="mr-3 text-green-600 focus:ring-green-500"
                        />
                        <label htmlFor={type.id} className="text-gray-600 hover:text-gray-800 cursor-pointer">
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
                  className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
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
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">Cars</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {vehicles.cars
                      .filter(
                        (car) =>
                          car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          car.capacity.toLowerCase().includes(searchTerm.toLowerCase()),
                      )
                      .map((car) => (
                        <VehicleCard key={car.id} vehicle={car} onSelect={handleVehicleSelect} />
                      ))}
                  </div>
                </div>
              )}
              {/* Buses Section */}
              {(selectedType === "all" || selectedType === "buses") && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">Buses</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {vehicles.buses
                      .filter(
                        (bus) =>
                          bus.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          bus.capacity.toLowerCase().includes(searchTerm.toLowerCase()),
                      )
                      .map((bus) => (
                        <VehicleCard key={bus.id} vehicle={bus} onSelect={handleVehicleSelect} />
                      ))}
                  </div>
                </div>
              )}
              {/* No Results */}
              {filteredVehicles.length === 0 && (
                <div className="bg-white rounded-lg shadow-md p-12 text-center">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">No vehicles found</h3>
                  <p className="text-gray-600 mb-6">Try adjusting your search or filters to find more results.</p>
                  <button
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedType("all")
                    }}
                    className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                  >
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
