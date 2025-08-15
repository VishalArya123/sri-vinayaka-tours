import React, { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  User,
  Users,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  Info,
  CreditCard,
  Sparkles,
  ArrowLeft,
} from "lucide-react"
import ServiceSummaryCard from "../components/ServiceSummaryCard"
import { storage } from "../utils/storage"

const BookingForm = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const bookingData = location.state || storage.getBookingData()

  // Form states
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Basic Details
    serviceDate: "",
    adultCount: 1,
    childCount: 0,
    boardingPoint: "",
    droppingPoint: "",
    
    // Vehicle specific fields
    pickupLocation: "",
    dropoffLocation: "",

    // Contact Information
    contactName: "",
    contactGender: "",
    contactAge: "",
    contactMobile: "",
    contactAlternateMobile: "",
    contactEmail: "",

    // Passenger Details (will be populated dynamically)
    adultPassengers: [{ name: "", gender: "", age: "" }],
    childPassengers: [],

    // Payment Option
    paymentOption: "minimum",
  })

  // Redirect if no booking data
  useEffect(() => {
    if (!bookingData) {
      navigate("/") // Redirect to home or tour packages page
      return
    }
    // Pre-fill contact info if user is logged in
    const userProfile = storage.getUserProfile()
    if (userProfile && userProfile.name) {
      setFormData((prev) => ({
        ...prev,
        contactName: userProfile.name || "",
        contactMobile: userProfile.phone || "",
        contactEmail: userProfile.email || "",
      }))
    }
  }, [bookingData, navigate])

  // Dummy data for dropdown options
  const boardingPoints = [
    { id: 1, name: "Central Station - 8:00 AM", time: "8:00 AM" },
    { id: 2, name: "Airport Terminal - 8:30 AM", time: "8:30 AM" },
    { id: 3, name: "City Center - 9:00 AM", time: "9:00 AM" },
  ]

  // Update passenger arrays when counts change
  useEffect(() => {
    // Update adult passengers
    if (formData.adultCount > formData.adultPassengers.length) {
      const newAdultPassengers = [...formData.adultPassengers]
      for (let i = formData.adultPassengers.length; i < formData.adultCount; i++) {
        newAdultPassengers.push({ name: "", gender: "", age: "" })
      }
      setFormData((prev) => ({ ...prev, adultPassengers: newAdultPassengers }))
    } else if (formData.adultCount < formData.adultPassengers.length) {
      const newAdultPassengers = formData.adultPassengers.slice(0, formData.adultCount)
      setFormData((prev) => ({ ...prev, adultPassengers: newAdultPassengers }))
    }
    // Update child passengers
    if (formData.childCount > formData.childPassengers.length) {
      const newChildPassengers = [...formData.childPassengers]
      for (let i = formData.childPassengers.length; i < formData.childCount; i++) {
        newChildPassengers.push({ name: "", gender: "", age: "" })
      }
      setFormData((prev) => ({ ...prev, childPassengers: newChildPassengers }))
    } else if (formData.childCount < formData.childPassengers.length) {
      const newChildPassengers = formData.childPassengers.slice(0, formData.childCount)
      setFormData((prev) => ({ ...prev, childPassengers: newChildPassengers }))
    }
  }, [formData.adultCount, formData.childCount])

  // Handle input changes
  const handleInputChange = (e, section, index = null) => {
    const { name, value } = e.target
    if (section === "basic" || section === "contact" || section === "payment") {
      setFormData({
        ...formData,
        [name]: value,
      })
    } else if (section === "adultPassenger" && index !== null) {
      const updatedAdultPassengers = [...formData.adultPassengers]
      updatedAdultPassengers[index] = {
        ...updatedAdultPassengers[index],
        [name]: value,
      }
      setFormData({
        ...formData,
        adultPassengers: updatedAdultPassengers,
      })
    } else if (section === "childPassenger" && index !== null) {
      const updatedChildPassengers = [...formData.childPassengers]
      updatedChildPassengers[index] = {
        ...updatedChildPassengers[index],
        [name]: value,
      }
      setFormData({
        ...formData,
        childPassengers: updatedChildPassengers,
      })
    }
  }

  // Form validation for current step
  const validateStep = () => {
    if (currentStep === 1) {
      if (!formData.serviceDate) {
        alert("Please select a service date.")
        return false
      }
      if (bookingData.type === "tour" && (!formData.boardingPoint || !formData.droppingPoint)) {
        alert("Please select both boarding and dropping points.")
        return false
      }
      if (bookingData.type === "vehicle" && (!formData.pickupLocation || !formData.dropoffLocation)) {
        alert("Please enter both pickup and dropoff locations.")
        return false
      }
    } else if (currentStep === 2) {
      if (
        !formData.contactName ||
        !formData.contactGender ||
        !formData.contactAge ||
        !formData.contactMobile ||
        !formData.contactEmail
      ) {
        alert("Please fill in all contact information fields.")
        return false
      }
      if (formData.adultCount > 0) {
        for (const passenger of formData.adultPassengers) {
          if (!passenger.name || !passenger.gender || !passenger.age) {
            alert("Please fill in all adult passenger details.")
            return false
          }
        }
      }
      if (formData.childCount > 0) {
        for (const passenger of formData.childPassengers) {
          if (!passenger.name || !passenger.gender || !passenger.age) {
            alert("Please fill in all child passenger details.")
            return false
          }
        }
      }
    }
    return true
  }

  // Navigation functions
  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep(currentStep + 1)
    }
  }
  const prevStep = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleFinalSubmit = () => {
    if (!validateStep()) {
      return
    }
    // Save final booking data
    const finalBookingData = {
      ...bookingData,
      formData,
      submittedAt: new Date().toISOString(),
      status: "confirmed",
    }

    storage.saveCompletedBooking(finalBookingData)
    storage.clearBookingData()

    // Show success message
    alert("Booking submitted successfully! You will receive a confirmation shortly.")
    
    // Navigate based on booking type
    if (bookingData.type === "tour") {
      navigate("/tour-packages")
    } else if (bookingData.type === "vehicle") {
      navigate("/rental-service")
    } else {
      navigate("/")
    }
  }

  if (!bookingData) {
    return null // Or a loading spinner/message
  }

  // Get service name and price
  const serviceName = bookingData.type === 'tour' 
    ? bookingData.tour?.title 
    : bookingData.vehicle?.name
  
  const servicePrice = bookingData.selectedPlan?.price || 0

  // Render form steps
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="font-playfair text-2xl font-bold text-secondary-800 mb-6">Basic Details</h2>

            {/* Date Selection */}
            <div className="form-group">
              <label htmlFor="serviceDate" className="block font-poppins text-sm font-medium text-secondary-700 mb-2">
                {bookingData.type === "tour" ? "Tour Date" : "Service Date"} <span className="text-coral">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="serviceDate"
                  name="serviceDate"
                  value={formData.serviceDate}
                  onChange={(e) => handleInputChange(e, "basic")}
                  className="w-full p-3 border border-primary-200 rounded-2xl pl-12 focus:ring-2 focus:ring-primary-300 focus:border-transparent font-poppins transition-all duration-300"
                  required
                />
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-400" />
              </div>
            </div>

            {/* Passenger Count */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group">
                <label htmlFor="adultCount" className="block font-poppins text-sm font-medium text-secondary-700 mb-2">
                  Adults <span className="text-coral">*</span>
                </label>
                <div className="relative">
                  <select
                    id="adultCount"
                    name="adultCount"
                    value={formData.adultCount}
                    onChange={(e) => handleInputChange(e, "basic")}
                    className="w-full p-3 border border-primary-200 rounded-2xl pl-12 focus:ring-2 focus:ring-primary-300 focus:border-transparent font-poppins transition-all duration-300"
                    required
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-400" />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="childCount" className="block font-poppins text-sm font-medium text-secondary-700 mb-2">
                  Children
                </label>
                <div className="relative">
                  <select
                    id="childCount"
                    name="childCount"
                    value={formData.childCount}
                    onChange={(e) => handleInputChange(e, "basic")}
                    className="w-full p-3 border border-primary-200 rounded-2xl pl-12 focus:ring-2 focus:ring-primary-300 focus:border-transparent font-poppins transition-all duration-300"
                  >
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-400" />
                </div>
              </div>
            </div>

            {/* Tour specific fields - Boarding and Dropping Points */}
            {bookingData.type === "tour" && (
              <>
                <div className="form-group">
                  <label htmlFor="boardingPoint" className="block font-poppins text-sm font-medium text-secondary-700 mb-2">
                    Boarding Point <span className="text-coral">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="boardingPoint"
                      name="boardingPoint"
                      value={formData.boardingPoint}
                      onChange={(e) => handleInputChange(e, "basic")}
                      className="w-full p-3 border border-primary-200 rounded-2xl pl-12 focus:ring-2 focus:ring-primary-300 focus:border-transparent font-poppins transition-all duration-300"
                      required
                    >
                      <option value="">Select Boarding Point</option>
                      {boardingPoints.map((point) => (
                        <option key={point.id} value={point.name}>
                          {point.name}
                        </option>
                      ))}
                    </select>
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-400" />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="droppingPoint" className="block font-poppins text-sm font-medium text-secondary-700 mb-2">
                    Dropping Point <span className="text-coral">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="droppingPoint"
                      name="droppingPoint"
                      value={formData.droppingPoint || formData.boardingPoint}
                      onChange={(e) => handleInputChange(e, "basic")}
                      className="w-full p-3 border border-primary-200 rounded-2xl pl-12 focus:ring-2 focus:ring-primary-300 focus:border-transparent font-poppins transition-all duration-300"
                      required
                    >
                      <option value="">Select Dropping Point</option>
                      {boardingPoints.map((point) => (
                        <option key={point.id} value={point.name}>
                          {point.name}
                        </option>
                      ))}
                    </select>
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-400" />
                  </div>
                </div>
              </>
            )}

            {/* Vehicle specific fields - Pickup and Dropoff locations */}
            {bookingData.type === "vehicle" && (
              <>
                <div className="form-group">
                  <label htmlFor="pickupLocation" className="block font-poppins text-sm font-medium text-secondary-700 mb-2">
                    Pickup Location <span className="text-coral">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="pickupLocation"
                      name="pickupLocation"
                      value={formData.pickupLocation}
                      onChange={(e) => handleInputChange(e, "basic")}
                      placeholder="Enter pickup address"
                      className="w-full p-3 border border-primary-200 rounded-2xl pl-12 focus:ring-2 focus:ring-primary-300 focus:border-transparent font-poppins transition-all duration-300"
                      required
                    />
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-400" />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="dropoffLocation" className="block font-poppins text-sm font-medium text-secondary-700 mb-2">
                    Dropoff Location <span className="text-coral">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="dropoffLocation"
                      name="dropoffLocation"
                      value={formData.dropoffLocation}
                      onChange={(e) => handleInputChange(e, "basic")}
                      placeholder="Enter dropoff address"
                      className="w-full p-3 border border-primary-200 rounded-2xl pl-12 focus:ring-2 focus:ring-primary-300 focus:border-transparent font-poppins transition-all duration-300"
                      required
                    />
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-400" />
                  </div>
                </div>
              </>
            )}
          </div>
        )

      case 2:
        return (
          <div className="space-y-8">
            <h2 className="font-playfair text-2xl font-bold text-secondary-800 mb-6">Contact & Passenger Details</h2>

            {/* Contact Information */}
            <div className="bg-gradient-to-br from-primary-50 to-accent-peach/20 p-6 rounded-3xl border border-primary-200 shadow-warm">
              <h3 className="font-playfair font-bold text-xl text-secondary-800 mb-6 flex items-center">
                <Info className="h-6 w-6 mr-3 text-primary-600" />
                Your Contact Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label htmlFor="contactName" className="block font-poppins text-sm font-medium text-secondary-700 mb-2">
                    Full Name <span className="text-coral">*</span>
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    value={formData.contactName}
                    onChange={(e) => handleInputChange(e, "contact")}
                    className="w-full p-3 border border-primary-200 rounded-2xl focus:ring-2 focus:ring-primary-300 focus:border-transparent font-poppins transition-all duration-300"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contactGender" className="block font-poppins text-sm font-medium text-secondary-700 mb-2">
                    Gender <span className="text-coral">*</span>
                  </label>
                  <select
                    id="contactGender"
                    name="contactGender"
                    value={formData.contactGender}
                    onChange={(e) => handleInputChange(e, "contact")}
                    className="w-full p-3 border border-primary-200 rounded-2xl focus:ring-2 focus:ring-primary-300 focus:border-transparent font-poppins transition-all duration-300"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="contactAge" className="block font-poppins text-sm font-medium text-secondary-700 mb-2">
                    Age <span className="text-coral">*</span>
                  </label>
                  <input
                    type="number"
                    id="contactAge"
                    name="contactAge"
                    value={formData.contactAge}
                    onChange={(e) => handleInputChange(e, "contact")}
                    className="w-full p-3 border border-primary-200 rounded-2xl focus:ring-2 focus:ring-primary-300 focus:border-transparent font-poppins transition-all duration-300"
                    min="18"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contactMobile" className="block font-poppins text-sm font-medium text-secondary-700 mb-2">
                    Mobile Number <span className="text-coral">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="contactMobile"
                      name="contactMobile"
                      value={formData.contactMobile}
                      onChange={(e) => handleInputChange(e, "contact")}
                      className="w-full p-3 border border-primary-200 rounded-2xl pl-12 focus:ring-2 focus:ring-primary-300 focus:border-transparent font-poppins transition-all duration-300"
                      required
                    />
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-400" />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="contactAlternateMobile" className="block font-poppins text-sm font-medium text-secondary-700 mb-2">
                    Alternate Mobile Number
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="contactAlternateMobile"
                      name="contactAlternateMobile"
                      value={formData.contactAlternateMobile}
                      onChange={(e) => handleInputChange(e, "contact")}
                      className="w-full p-3 border border-primary-200 rounded-2xl pl-12 focus:ring-2 focus:ring-primary-300 focus:border-transparent font-poppins transition-all duration-300"
                    />
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-400" />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="contactEmail" className="block font-poppins text-sm font-medium text-secondary-700 mb-2">
                    Email ID <span className="text-coral">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="contactEmail"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={(e) => handleInputChange(e, "contact")}
                      className="w-full p-3 border border-primary-200 rounded-2xl pl-12 focus:ring-2 focus:ring-primary-300 focus:border-transparent font-poppins transition-all duration-300"
                      required
                    />
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-400" />
                  </div>
                </div>
              </div>

              <div className="mt-6 text-sm text-primary-700 flex items-center bg-primary-100 p-4 rounded-2xl">
                <Info className="h-5 w-5 mr-2 flex-shrink-0" />
                <span className="font-poppins">Booking details will be sent to your email and mobile number.</span>
              </div>
            </div>

            {/* Adult Passengers */}
            {formData.adultPassengers.map((passenger, index) => (
              <div key={`adult-${index}`} className="bg-secondary-50 p-6 rounded-3xl border border-secondary-200 shadow-warm">
                <h3 className="font-playfair font-bold text-xl text-secondary-800 mb-6">Adult Passenger {index + 1}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="form-group">
                    <label htmlFor={`adult-name-${index}`} className="block font-poppins text-sm font-medium text-secondary-700 mb-2">
                      Name <span className="text-coral">*</span>
                    </label>
                    <input
                      type="text"
                      id={`adult-name-${index}`}
                      name="name"
                      value={passenger.name}
                      onChange={(e) => handleInputChange(e, "adultPassenger", index)}
                      className="w-full p-3 border border-primary-200 rounded-2xl focus:ring-2 focus:ring-primary-300 focus:border-transparent font-poppins transition-all duration-300"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor={`adult-gender-${index}`} className="block font-poppins text-sm font-medium text-secondary-700 mb-2">
                      Gender <span className="text-coral">*</span>
                    </label>
                    <select
                      id={`adult-gender-${index}`}
                      name="gender"
                      value={passenger.gender}
                      onChange={(e) => handleInputChange(e, "adultPassenger", index)}
                      className="w-full p-3 border border-primary-200 rounded-2xl focus:ring-2 focus:ring-primary-300 focus:border-transparent font-poppins transition-all duration-300"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor={`adult-age-${index}`} className="block font-poppins text-sm font-medium text-secondary-700 mb-2">
                      Age <span className="text-coral">*</span>
                    </label>
                    <input
                      type="number"
                      id={`adult-age-${index}`}
                      name="age"
                      value={passenger.age}
                      onChange={(e) => handleInputChange(e, "adultPassenger", index)}
                      className="w-full p-3 border border-primary-200 rounded-2xl focus:ring-2 focus:ring-primary-300 focus:border-transparent font-poppins transition-all duration-300"
                      min="18"
                      required
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* Child Passengers */}
            {formData.childPassengers.map((passenger, index) => (
              <div key={`child-${index}`} className="bg-accent-peach/10 p-6 rounded-3xl border border-accent-peach/30 shadow-warm">
                <h3 className="font-playfair font-bold text-xl text-secondary-800 mb-6">Child Passenger {index + 1}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="form-group">
                    <label htmlFor={`child-name-${index}`} className="block font-poppins text-sm font-medium text-secondary-700 mb-2">
                      Name <span className="text-coral">*</span>
                    </label>
                    <input
                      type="text"
                      id={`child-name-${index}`}
                      name="name"
                      value={passenger.name}
                      onChange={(e) => handleInputChange(e, "childPassenger", index)}
                      className="w-full p-3 border border-primary-200 rounded-2xl focus:ring-2 focus:ring-primary-300 focus:border-transparent font-poppins transition-all duration-300"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor={`child-gender-${index}`} className="block font-poppins text-sm font-medium text-secondary-700 mb-2">
                      Gender <span className="text-coral">*</span>
                    </label>
                    <select
                      id={`child-gender-${index}`}
                      name="gender"
                      value={passenger.gender}
                      onChange={(e) => handleInputChange(e, "childPassenger", index)}
                      className="w-full p-3 border border-primary-200 rounded-2xl focus:ring-2 focus:ring-primary-300 focus:border-transparent font-poppins transition-all duration-300"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor={`child-age-${index}`} className="block font-poppins text-sm font-medium text-secondary-700 mb-2">
                      Age <span className="text-coral">*</span>
                    </label>
                    <input
                      type="number"
                      id={`child-age-${index}`}
                      name="age"
                      value={passenger.age}
                      onChange={(e) => handleInputChange(e, "childPassenger", index)}
                      className="w-full p-3 border border-primary-200 rounded-2xl focus:ring-2 focus:ring-primary-300 focus:border-transparent font-poppins transition-all duration-300"
                      min="2"
                      max="17"
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )

      case 3:
        const totalAmount = servicePrice
        const minimumPayment = Math.ceil(totalAmount * 0.1)
        return (
          <div className="space-y-8">
            <h2 className="font-playfair text-2xl font-bold text-secondary-800 mb-6">Review & Payment</h2>

            {/* Summary */}
            <div className="bg-gradient-to-br from-primary-50 to-accent-peach/20 p-6 rounded-3xl border border-primary-200 shadow-warm">
              <h3 className="font-playfair font-bold text-xl text-secondary-800 mb-6 flex items-center">
                <Info className="h-6 w-6 mr-3 text-primary-600" />
                Your Booking Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-poppins text-sm font-medium text-secondary-600 mb-1">Service Date</h4>
                  <p className="font-playfair text-lg font-semibold text-secondary-900">{formData.serviceDate || "Not selected"}</p>
                </div>
                <div>
                  <h4 className="font-poppins text-sm font-medium text-secondary-600 mb-1">Contact Person</h4>
                  <p className="font-playfair text-lg font-semibold text-secondary-900">{formData.contactName || "Not provided"}</p>
                </div>
                <div>
                  <h4 className="font-poppins text-sm font-medium text-secondary-600 mb-1">Adults</h4>
                  <p className="font-playfair text-lg font-semibold text-secondary-900">{formData.adultCount}</p>
                </div>
                <div>
                  <h4 className="font-poppins text-sm font-medium text-secondary-600 mb-1">Children</h4>
                  <p className="font-playfair text-lg font-semibold text-secondary-900">{formData.childCount}</p>
                </div>
                
                {/* Tour specific fields */}
                {bookingData.type === "tour" && (
                  <>
                    <div>
                      <h4 className="font-poppins text-sm font-medium text-secondary-600 mb-1">Boarding Point</h4>
                      <p className="font-playfair text-lg font-semibold text-secondary-900">{formData.boardingPoint || "N/A"}</p>
                    </div>
                    <div>
                      <h4 className="font-poppins text-sm font-medium text-secondary-600 mb-1">Dropping Point</h4>
                      <p className="font-playfair text-lg font-semibold text-secondary-900">{formData.droppingPoint || "N/A"}</p>
                    </div>
                  </>
                )}
                
                {/* Vehicle specific fields */}
                {bookingData.type === "vehicle" && (
                  <>
                    <div>
                      <h4 className="font-poppins text-sm font-medium text-secondary-600 mb-1">Pickup Location</h4>
                      <p className="font-playfair text-lg font-semibold text-secondary-900">{formData.pickupLocation || "N/A"}</p>
                    </div>
                    <div>
                      <h4 className="font-poppins text-sm font-medium text-secondary-600 mb-1">Dropoff Location</h4>
                      <p className="font-playfair text-lg font-semibold text-secondary-900">{formData.dropoffLocation || "N/A"}</p>
                    </div>
                    {bookingData.selectedDriver && (
                      <div className="md:col-span-2">
                        <h4 className="font-poppins text-sm font-medium text-secondary-600 mb-1">Selected Driver</h4>
                        <p className="font-playfair text-lg font-semibold text-secondary-900">{bookingData.selectedDriver.name}</p>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Service Details */}
              <div className="border-t border-primary-200 pt-6">
                <div className="mb-4">
                  <h4 className="font-poppins text-sm font-medium text-secondary-600 mb-1">
                    {bookingData.type === 'tour' ? 'Tour Package' : 'Vehicle'}
                  </h4>
                  <p className="font-playfair text-lg font-semibold text-secondary-900">{serviceName}</p>
                </div>
                <div className="mb-4">
                  <h4 className="font-poppins text-sm font-medium text-secondary-600 mb-1">Selected Plan</h4>
                  <p className="font-playfair text-lg font-semibold text-secondary-900">{bookingData.selectedPlan?.name}</p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-playfair text-xl font-bold text-secondary-800">Total Amount:</span>
                  <span className="font-playfair text-3xl font-bold text-primary-600">₹{totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Payment Options */}
            <div className="bg-secondary-50 p-6 rounded-3xl border border-secondary-200 shadow-warm">
              <h3 className="font-playfair font-bold text-xl text-secondary-800 mb-6 flex items-center">
                <CreditCard className="h-6 w-6 mr-3 text-secondary-700" />
                Payment Options
              </h3>

              <div className="space-y-5">
                <label
                  htmlFor="minimum-payment"
                  className="flex items-start cursor-pointer p-4 border border-primary-200 rounded-2xl hover:border-primary-400 transition-all duration-300 hover:shadow-warm"
                >
                  <input
                    type="radio"
                    id="minimum-payment"
                    name="paymentOption"
                    value="minimum"
                    checked={formData.paymentOption === "minimum"}
                    onChange={(e) => handleInputChange(e, "payment")}
                    className="mt-1 mr-3 h-5 w-5 text-primary-600 focus:ring-primary-500"
                  />
                  <div>
                    <span className="font-playfair font-semibold text-secondary-800 text-lg">Minimum Payment (10%)</span>
                    <p className="font-poppins text-sm text-secondary-600 mt-1">
                      Pay ₹{minimumPayment.toLocaleString()} now and the remaining amount during the service.
                    </p>
                  </div>
                </label>

                <label
                  htmlFor="full-payment"
                  className="flex items-start cursor-pointer p-4 border border-primary-200 rounded-2xl hover:border-primary-400 transition-all duration-300 hover:shadow-warm"
                >
                  <input
                    type="radio"
                    id="full-payment"
                    name="paymentOption"
                    value="full"
                    checked={formData.paymentOption === "full"}
                    onChange={(e) => handleInputChange(e, "payment")}
                    className="mt-1 mr-3 h-5 w-5 text-primary-600 focus:ring-primary-500"
                  />
                  <div>
                    <span className="font-playfair font-semibold text-secondary-800 text-lg">Full Payment</span>
                    <p className="font-poppins text-sm text-secondary-600 mt-1">Pay ₹{totalAmount.toLocaleString()} now.</p>
                  </div>
                </label>
              </div>
            </div>
          </div>
        )

      default:
        return <div>Unknown step</div>
    }
  }

  return (
    <div className="min-h-screen bg-background-light pt-16 sm:pt-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-secondary-900 via-secondary-800 to-primary-800 text-white py-8 sm:py-12 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-8 animate-float">
            <Sparkles className="w-8 h-8 text-accent-yellow" />
          </div>
          <div className="absolute bottom-4 left-8 animate-bounce-gentle" style={{animationDelay: '1s'}}>
            <CreditCard className="w-6 h-6 text-accent-peach" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center text-white/90 hover:text-white font-poppins font-medium transition-colors duration-300 group mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2 transform transition-transform duration-300 group-hover:-translate-x-1" />
              Back
            </button>
            <h1 className="font-playfair text-3xl sm:text-4xl font-bold mb-4">Complete Your Booking</h1>
            <p className="font-poppins text-white/90 text-lg">Fill in the details to confirm your reservation</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-float p-6 sm:p-8 border border-primary-100">
              {/* Progress Indicator */}
              <div className="flex items-center justify-between mb-10 relative">
                {[
                  { step: 1, label: "Basic Details" },
                  { step: 2, label: "Passenger Details" },
                  { step: 3, label: "Review & Payment" },
                ].map((stepItem, index) => (
                  <React.Fragment key={stepItem.step}>
                    <div className="flex flex-col items-center flex-1 z-10">
                      <div
                        className={`w-10 h-10 flex items-center justify-center rounded-2xl font-semibold text-lg transition-all duration-300 ease-in-out ${
                          currentStep === stepItem.step
                            ? "bg-elegant-gradient text-white shadow-elegant"
                            : currentStep > stepItem.step
                              ? "bg-green-500 text-white shadow-warm"
                              : "bg-secondary-200 text-secondary-600"
                        }`}
                      >
                        {currentStep > stepItem.step ? <CheckCircle className="h-6 w-6" /> : stepItem.step}
                      </div>
                      <span
                        className={`mt-3 text-sm text-center font-poppins ${
                          currentStep === stepItem.step ? "text-primary-700 font-semibold" : "text-secondary-600"
                        }`}
                      >
                        {stepItem.label}
                      </span>
                    </div>
                    {index < 2 && (
                      <div
                        className={`absolute top-5 h-0.5 w-[calc(50%-4rem)] transition-all duration-300 ease-in-out ${
                          currentStep > stepItem.step ? "bg-green-500" : "bg-secondary-200"
                        }`}
                        style={{ left: `${(index + 0.5) * (100 / 3)}%`, transform: "translateX(-50%)" }}
                      ></div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Form Content */}
              <div className="mb-8">{renderStep()}</div>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t border-primary-200">
                {currentStep > 1 ? (
                  <button
                    onClick={prevStep}
                    className="flex items-center px-6 py-3 bg-secondary-100 text-secondary-700 rounded-2xl hover:bg-secondary-200 transition-all duration-300 font-medium font-poppins transform hover:scale-105"
                  >
                    <ChevronLeft className="w-5 h-5 mr-2" />
                    Back
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 3 ? (
                  <button
                    onClick={nextStep}
                    className="flex items-center px-6 py-3 bg-elegant-gradient text-white rounded-2xl hover:shadow-elegant transition-all duration-300 font-semibold shadow-warm transform hover:scale-105 font-poppins"
                  >
                    Next
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </button>
                ) : (
                  <button
                    onClick={handleFinalSubmit}
                    className="flex items-center px-8 py-3 bg-green-600 text-white rounded-2xl hover:bg-green-700 hover:shadow-elegant transition-all duration-300 font-semibold shadow-warm transform hover:scale-105 font-poppins"
                  >
                    Confirm Booking
                    <CheckCircle className="w-5 h-5 ml-2" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Service Summary */}
          <div className="lg:col-span-1">
            <ServiceSummaryCard bookingData={bookingData} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingForm
