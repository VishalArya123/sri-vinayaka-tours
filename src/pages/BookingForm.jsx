// src/pages/BookingForm.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Calendar, User, Users, MapPin, Phone, Mail, CheckCircle, Info, CreditCard } from 'lucide-react';
import ServiceSummaryCard from '../components/ServiceSummaryCard';
import { storage } from '../utils/storage';

const BookingForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state || storage.getBookingData();

  // Form states
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Details
    serviceDate: '',
    adultCount: 1,
    childCount: 0,
    boardingPoint: '',
    droppingPoint: '',
    
    // Contact Information
    contactName: '',
    contactGender: '',
    contactAge: '',
    contactMobile: '',
    contactAlternateMobile: '',
    contactEmail: '',
    
    // Passenger Details (will be populated dynamically)
    adultPassengers: [{ name: '', gender: '', age: '' }],
    childPassengers: [],
    
    // Payment Option
    paymentOption: 'minimum'
  });

  // Redirect if no booking data
  useEffect(() => {
    if (!bookingData) {
      navigate('/');
      return;
    }
  }, [bookingData, navigate]);

  // Dummy data for dropdown options
  const boardingPoints = [
    { id: 1, name: 'Central Station - 8:00 AM', time: '8:00 AM' },
    { id: 2, name: 'Airport Terminal - 8:30 AM', time: '8:30 AM' },
    { id: 3, name: 'City Center - 9:00 AM', time: '9:00 AM' },
  ];

  // Update passenger arrays when counts change
  useEffect(() => {
    // Update adult passengers
    if (formData.adultCount > formData.adultPassengers.length) {
      const newAdultPassengers = [...formData.adultPassengers];
      for (let i = formData.adultPassengers.length; i < formData.adultCount; i++) {
        newAdultPassengers.push({ name: '', gender: '', age: '' });
      }
      setFormData({ ...formData, adultPassengers: newAdultPassengers });
    } else if (formData.adultCount < formData.adultPassengers.length) {
      const newAdultPassengers = formData.adultPassengers.slice(0, formData.adultCount);
      setFormData({ ...formData, adultPassengers: newAdultPassengers });
    }

    // Update child passengers
    if (formData.childCount > formData.childPassengers.length) {
      const newChildPassengers = [...formData.childPassengers];
      for (let i = formData.childPassengers.length; i < formData.childCount; i++) {
        newChildPassengers.push({ name: '', gender: '', age: '' });
      }
      setFormData({ ...formData, childPassengers: newChildPassengers });
    } else if (formData.childCount < formData.childPassengers.length) {
      const newChildPassengers = formData.childPassengers.slice(0, formData.childCount);
      setFormData({ ...formData, childPassengers: newChildPassengers });
    }
  }, [formData.adultCount, formData.childCount]);

  // Handle input changes
  const handleInputChange = (e, section, index = null) => {
    const { name, value } = e.target;

    if (section === 'basic' || section === 'contact' || section === 'payment') {
      setFormData({
        ...formData,
        [name]: value
      });
    } else if (section === 'adultPassenger' && index !== null) {
      const updatedAdultPassengers = [...formData.adultPassengers];
      updatedAdultPassengers[index] = {
        ...updatedAdultPassengers[index],
        [name]: value
      };
      setFormData({
        ...formData,
        adultPassengers: updatedAdultPassengers
      });
    } else if (section === 'childPassenger' && index !== null) {
      const updatedChildPassengers = [...formData.childPassengers];
      updatedChildPassengers[index] = {
        ...updatedChildPassengers[index],
        [name]: value
      };
      setFormData({
        ...formData,
        childPassengers: updatedChildPassengers
      });
    }
  };

  // Navigation functions
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleFinalSubmit = () => {
    // Save final booking data
    const finalBookingData = {
      ...bookingData,
      formData,
      submittedAt: new Date().toISOString()
    };
    
    storage.save('completedBooking', finalBookingData);
    
    // Simulate booking confirmation
    alert('Booking submitted successfully! You will receive a confirmation shortly.');
    navigate('/');
  };

  if (!bookingData) {
    return null;
  }

  // Render form steps
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Basic Details</h2>
            
            {/* Date Selection */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {bookingData.type === 'tour' ? 'Tour Date' : 'Service Date'} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="serviceDate"
                  value={formData.serviceDate}
                  onChange={(e) => handleInputChange(e, 'basic')}
                  className="w-full p-2 border border-gray-300 rounded-md pl-10"
                  required
                />
                <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            {/* Passenger Count */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Adults <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    name="adultCount"
                    value={formData.adultCount}
                    onChange={(e) => handleInputChange(e, 'basic')}
                    className="w-full p-2 border border-gray-300 rounded-md pl-10"
                    required
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">Children</label>
                <div className="relative">
                  <select
                    name="childCount"
                    value={formData.childCount}
                    onChange={(e) => handleInputChange(e, 'basic')}
                    className="w-full p-2 border border-gray-300 rounded-md pl-10"
                  >
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                  <Users className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
            
            {/* Boarding and Dropping Points (for tours) */}
            {bookingData.type === 'tour' && (
              <>
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Boarding Point <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="boardingPoint"
                      value={formData.boardingPoint}
                      onChange={(e) => handleInputChange(e, 'basic')}
                      className="w-full p-2 border border-gray-300 rounded-md pl-10"
                      required
                    >
                      <option value="">Select Boarding Point</option>
                      {boardingPoints.map(point => (
                        <option key={point.id} value={point.name}>{point.name}</option>
                      ))}
                    </select>
                    <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dropping Point <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="droppingPoint"
                      value={formData.droppingPoint || formData.boardingPoint}
                      onChange={(e) => handleInputChange(e, 'basic')}
                      className="w-full p-2 border border-gray-300 rounded-md pl-10"
                      required
                    >
                      <option value="">Select Dropping Point</option>
                      {boardingPoints.map(point => (
                        <option key={point.id} value={point.name}>{point.name}</option>
                      ))}
                    </select>
                    <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </>
            )}
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Contact & Passenger Details</h2>
            
            {/* Contact Information */}
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-6">
              <h3 className="font-medium text-lg mb-4">Contact Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={(e) => handleInputChange(e, 'contact')}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="contactGender"
                    value={formData.contactGender}
                    onChange={(e) => handleInputChange(e, 'contact')}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Age <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="contactAge"
                    value={formData.contactAge}
                    onChange={(e) => handleInputChange(e, 'contact')}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    min="18"
                    required
                  />
                </div>
                
                <div className="form-group relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="contactMobile"
                      value={formData.contactMobile}
                      onChange={(e) => handleInputChange(e, 'contact')}
                      className="w-full p-2 border border-gray-300 rounded-md pl-10"
                      required
                    />
                    <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Alternate Mobile Number
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="contactAlternateMobile"
                      value={formData.contactAlternateMobile}
                      onChange={(e) => handleInputChange(e, 'contact')}
                      className="w-full p-2 border border-gray-300 rounded-md pl-10"
                    />
                    <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email ID <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={(e) => handleInputChange(e, 'contact')}
                      className="w-full p-2 border border-gray-300 rounded-md pl-10"
                      required
                    />
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
              
              <div className="mt-3 text-sm text-blue-600 flex items-center">
                <Info className="h-4 w-4 mr-1" />
                <span>Booking details will be sent to your email and mobile number.</span>
              </div>
            </div>
            
            {/* Adult Passengers */}
            {formData.adultPassengers.map((passenger, index) => (
              <div 
                key={`adult-${index}`} 
                className="bg-gray-50 p-4 rounded-md border border-gray-200"
              >
                <h3 className="font-medium text-lg mb-4">Adult {index + 1}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={passenger.name}
                      onChange={(e) => handleInputChange(e, 'adultPassenger', index)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="gender"
                      value={passenger.gender}
                      onChange={(e) => handleInputChange(e, 'adultPassenger', index)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Age <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={passenger.age}
                      onChange={(e) => handleInputChange(e, 'adultPassenger', index)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      min="18"
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
            
            {/* Child Passengers */}
            {formData.childPassengers.map((passenger, index) => (
              <div 
                key={`child-${index}`} 
                className="bg-gray-50 p-4 rounded-md border border-gray-200"
              >
                <h3 className="font-medium text-lg mb-4">Child {index + 1}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={passenger.name}
                      onChange={(e) => handleInputChange(e, 'childPassenger', index)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="gender"
                      value={passenger.gender}
                      onChange={(e) => handleInputChange(e, 'childPassenger', index)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Age <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={passenger.age}
                      onChange={(e) => handleInputChange(e, 'childPassenger', index)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      min="2"
                      max="17"
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Review & Payment</h2>
            
            {/* Summary */}
            <div className="bg-gray-50 p-6 rounded-md border border-gray-200">
              <h3 className="font-medium text-lg mb-4">Booking Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Service Date</h4>
                  <p className="text-lg">{formData.serviceDate || 'Not selected'}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Contact Person</h4>
                  <p className="text-lg">{formData.contactName || 'Not provided'}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Adults</h4>
                  <p className="text-lg">{formData.adultCount}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Children</h4>
                  <p className="text-lg">{formData.childCount}</p>
                </div>
              </div>
              
              {/* Total Amount */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Total Amount:</span>
                  <span className="text-2xl font-bold text-blue-600">
                    ₹{bookingData.selectedPlan?.price || 0}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Payment Options */}
            <div className="bg-gray-50 p-6 rounded-md border border-gray-200">
              <h3 className="font-medium text-lg mb-4 flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Payment Options
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <input
                    type="radio"
                    id="minimum-payment"
                    name="paymentOption"
                    value="minimum"
                    checked={formData.paymentOption === 'minimum'}
                    onChange={(e) => handleInputChange(e, 'payment')}
                    className="mt-1 mr-2"
                  />
                  <div>
                    <label htmlFor="minimum-payment" className="font-medium">
                      Minimum Payment (10%)
                    </label>
                    <p className="text-sm text-gray-500">
                      Pay ₹{Math.ceil((bookingData.selectedPlan?.price || 0) * 0.1)} now and the remaining amount during the service.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <input
                    type="radio"
                    id="full-payment"
                    name="paymentOption"
                    value="full"
                    checked={formData.paymentOption === 'full'}
                    onChange={(e) => handleInputChange(e, 'payment')}
                    className="mt-1 mr-2"
                  />
                  <div>
                    <label htmlFor="full-payment" className="font-medium">
                      Full Payment
                    </label>
                    <p className="text-sm text-gray-500">
                      Pay ₹{bookingData.selectedPlan?.price || 0} now.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              {/* Progress Indicator */}
              <div className="flex items-center justify-between mb-8">
                {[
                  { step: 1, label: 'Basic Details' },
                  { step: 2, label: 'Passenger Details' },
                  { step: 3, label: 'Review & Payment' }
                ].map((step) => (
                  <div key={step.step} className="flex flex-col items-center">
                    <div 
                      className={`w-8 h-8 flex items-center justify-center rounded-full font-medium ${
                        currentStep === step.step
                          ? 'bg-blue-600 text-white'
                          : currentStep > step.step
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {currentStep > step.step ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        step.step
                      )}
                    </div>
                    <span 
                      className={`mt-2 text-sm ${
                        currentStep === step.step 
                          ? 'text-blue-600 font-medium' 
                          : 'text-gray-500'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Form Content */}
              <div className="mb-8">
                {renderStep()}
              </div>
              
              {/* Navigation Buttons */}
              <div className="flex justify-between pt-4 border-t border-gray-200">
                {currentStep > 1 ? (
                  <button
                    onClick={prevStep}
                    className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 mr-1" />
                    Back
                  </button>
                ) : (
                  <div></div>
                )}
                
                {currentStep < 3 ? (
                  <button
                    onClick={nextStep}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Next
                    <ChevronRight className="w-5 h-5 ml-1" />
                  </button>
                ) : (
                  <button
                    onClick={handleFinalSubmit}
                    className="flex items-center px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    Confirm Booking
                    <CheckCircle className="w-5 h-5 ml-1" />
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
  );
};

export default BookingForm;
