import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Users, Phone, Mail, User, CreditCard, Check, ArrowLeft, MapPin, Clock } from 'lucide-react';
import { storage } from '../utils/storage';
import { mockData } from '../data/mockData';

const BookingForm = () => {
  const { tourId } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    serviceDate: '',
    numberOfPeople: 2,
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    emergencyContact: '',
    specialRequests: '',
    paymentMethod: 'online',
    agreeToTerms: false
  });
  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const foundTour = mockData.tours.find(t => t.id === parseInt(tourId));
    if (foundTour) {
      setTour(foundTour);
      setSelectedPlan(foundTour.plans[0]);
      
      // Pre-fill user data if logged in
      const user = storage.getUser();
      if (user) {
        setFormData(prev => ({
          ...prev,
          customerName: user.name || '',
          customerEmail: user.email || '',
          customerPhone: user.phone || ''
        }));
      }
    }
  }, [tourId]);

  const steps = [
    { number: 1, title: 'Tour Details', icon: MapPin },
    { number: 2, title: 'Personal Info', icon: User },
    { number: 3, title: 'Payment', icon: CreditCard },
    { number: 4, title: 'Confirmation', icon: Check }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateStep = (step) => {
    let stepErrors = {};
    
    switch (step) {
      case 1:
        if (!formData.serviceDate) stepErrors.serviceDate = 'Date is required';
        if (formData.numberOfPeople < 1) stepErrors.numberOfPeople = 'At least 1 person required';
        break;
      case 2:
        if (!formData.customerName.trim()) stepErrors.customerName = 'Name is required';
        if (!formData.customerEmail.trim()) stepErrors.customerEmail = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.customerEmail)) stepErrors.customerEmail = 'Email is invalid';
        if (!formData.customerPhone.trim()) stepErrors.customerPhone = 'Phone is required';
        break;
      case 3:
        if (!formData.paymentMethod) stepErrors.paymentMethod = 'Payment method is required';
        if (!formData.agreeToTerms) stepErrors.agreeToTerms = 'You must agree to terms and conditions';
        break;
    }
    
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;
    
    setIsSubmitting(true);
    
    try {
      // Save booking data
      const bookingData = {
        tour,
        selectedPlan,
        formData,
        totalAmount: calculateTotal(),
        bookingDate: new Date().toISOString(),
        status: 'pending'
      };
      
      storage.saveBookingData(bookingData);
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setCurrentStep(4);
    } catch (error) {
      console.error('Booking error:', error);
      alert('Booking failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateTotal = () => {
    if (!selectedPlan) return 0;
    return selectedPlan.price * formData.numberOfPeople;
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  if (!tour) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
          <div className="flex items-center mb-4">
            <button
              onClick={() => navigate(-1)}
              className="mr-4 p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Book Your Trip</h1>
              <p className="text-gray-600 text-sm sm:text-base">{tour.title}</p>
            </div>
          </div>
          
          {/* Progress Steps - Mobile Optimized */}
          <div className="flex justify-between items-center">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              
              return (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div className={`
                      w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-base font-medium transition-colors
                      ${isCompleted ? 'bg-green-500 text-white' : 
                        isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}
                    `}>
                      {isCompleted ? <Check size={16} /> : <StepIcon size={16} />}
                    </div>
                    <span className={`mt-1 text-xs sm:text-sm font-medium text-center ${
                      isActive ? 'text-blue-600' : 'text-gray-600'
                    }`}>
                      <span className="hidden sm:inline">{step.title}</span>
                      <span className="sm:hidden">Step {step.number}</span>
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-1 mx-2 rounded ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              {/* Step 1: Tour Details */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Select Your Preferences</h2>
                  
                  {/* Plan Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Select Package Plan</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {tour.plans.map((plan) => (
                        <div
                          key={plan.id}
                          onClick={() => setSelectedPlan(plan)}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            selectedPlan?.id === plan.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <h3 className="font-medium text-gray-800">{plan.name}</h3>
                          <p className="text-2xl font-bold text-green-600 mt-1">₹{plan.price.toLocaleString()}</p>
                          <p className="text-sm text-gray-600 mt-1">per person</p>
                          <ul className="mt-2 space-y-1">
                            {plan.features.slice(0, 3).map((feature, index) => (
                              <li key={index} className="text-xs text-gray-600 flex items-center">
                                <Check size={12} className="mr-1 text-green-500" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Date Selection */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Travel Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                          type="date"
                          name="serviceDate"
                          value={formData.serviceDate}
                          onChange={handleInputChange}
                          min={getMinDate()}
                          className={`w-full pl-10 pr-3 py-3 border ${
                            errors.serviceDate ? 'border-red-500' : 'border-gray-300'
                          } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none`}
                        />
                      </div>
                      {errors.serviceDate && <p className="text-red-500 text-sm mt-1">{errors.serviceDate}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Number of People</label>
                      <div className="relative">
                        <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                          type="number"
                          name="numberOfPeople"
                          value={formData.numberOfPeople}
                          onChange={handleInputChange}
                          min="1"
                          max="20"
                          className={`w-full pl-10 pr-3 py-3 border ${
                            errors.numberOfPeople ? 'border-red-500' : 'border-gray-300'
                          } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none`}
                        />
                      </div>
                      {errors.numberOfPeople && <p className="text-red-500 text-sm mt-1">{errors.numberOfPeople}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Personal Information */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Personal Information</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          name="customerName"
                          value={formData.customerName}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-3 py-3 border ${
                            errors.customerName ? 'border-red-500' : 'border-gray-300'
                          } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none`}
                          placeholder="Enter your full name"
                        />
                      </div>
                      {errors.customerName && <p className="text-red-500 text-sm mt-1">{errors.customerName}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                          type="email"
                          name="customerEmail"
                          value={formData.customerEmail}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-3 py-3 border ${
                            errors.customerEmail ? 'border-red-500' : 'border-gray-300'
                          } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none`}
                          placeholder="your@email.com"
                        />
                      </div>
                      {errors.customerEmail && <p className="text-red-500 text-sm mt-1">{errors.customerEmail}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                          type="tel"
                          name="customerPhone"
                          value={formData.customerPhone}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-3 py-3 border ${
                            errors.customerPhone ? 'border-red-500' : 'border-gray-300'
                          } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none`}
                          placeholder="+91 XXXXX XXXXX"
                        />
                      </div>
                      {errors.customerPhone && <p className="text-red-500 text-sm mt-1">{errors.customerPhone}</p>}
                    </div>
                    
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
                      <input
                        type="tel"
                        name="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={handleInputChange}
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="Emergency contact number"
                      />
                    </div>
                    
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Special Requests</label>
                      <textarea
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="Any special requirements or requests..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Payment Information</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Payment Method</label>
                      <div className="space-y-3">
                        <div 
                          onClick={() => setFormData({...formData, paymentMethod: 'online'})}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            formData.paymentMethod === 'online'
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="online"
                              checked={formData.paymentMethod === 'online'}
                              onChange={handleInputChange}
                              className="mr-3"
                            />
                            <div>
                              <h4 className="font-medium text-gray-800">Online Payment</h4>
                              <p className="text-sm text-gray-600">Pay securely with cards, UPI, or net banking</p>
                            </div>
                          </div>
                        </div>
                        
                        <div 
                          onClick={() => setFormData({...formData, paymentMethod: 'partial'})}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            formData.paymentMethod === 'partial'
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="partial"
                              checked={formData.paymentMethod === 'partial'}
                              onChange={handleInputChange}
                              className="mr-3"
                            />
                            <div>
                              <h4 className="font-medium text-gray-800">Advance Payment (30%)</h4>
                              <p className="text-sm text-gray-600">Pay ₹{Math.round(calculateTotal() * 0.3).toLocaleString()} now, rest later</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {errors.paymentMethod && <p className="text-red-500 text-sm mt-1">{errors.paymentMethod}</p>}
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          name="agreeToTerms"
                          checked={formData.agreeToTerms}
                          onChange={handleInputChange}
                          className="mt-1 mr-3"
                        />
                        <div>
                          <p className="text-sm text-gray-700">
                            I agree to the{' '}
                            <a href="/terms" className="text-blue-600 hover:underline">
                              Terms and Conditions
                            </a>{' '}
                            and{' '}
                            <a href="/privacy" className="text-blue-600 hover:underline">
                              Privacy Policy
                            </a>
                          </p>
                        </div>
                      </div>
                      {errors.agreeToTerms && <p className="text-red-500 text-sm mt-1">{errors.agreeToTerms}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Confirmation */}
              {currentStep === 4 && (
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-10 h-10 text-white" />
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Booking Confirmed!</h2>
                    <p className="text-gray-600">
                      Your booking has been submitted successfully. You will receive a confirmation email shortly.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-800 mb-2">Booking Reference</h3>
                    <p className="text-2xl font-bold text-blue-600">VT{Date.now().toString().slice(-8)}</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={() => navigate('/profile')}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                    >
                      View My Bookings
                    </button>
                    <button
                      onClick={() => navigate('/')}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors"
                    >
                      Back to Home
                    </button>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              {currentStep < 4 && (
                <div className="flex flex-col sm:flex-row gap-3 justify-between pt-6 border-t">
                  <button
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className={`px-6 py-3 rounded-lg transition-colors ${
                      currentStep === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-600 hover:bg-gray-700 text-white'
                    }`}
                  >
                    Previous
                  </button>
                  
                  {currentStep < 3 ? (
                    <button
                      onClick={nextStep}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                    >
                      Next Step
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className={`bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      ) : (
                        <CreditCard className="mr-2" size={16} />
                      )}
                      {isSubmitting ? 'Processing...' : 'Confirm Booking'}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 sticky top-4">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Booking Summary</h3>
              
              {/* Tour Info */}
              <div className="flex space-x-3 mb-4 pb-4 border-b">
                <img
                  src={tour.images[0]}
                  alt={tour.title}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800 text-sm">{tour.title}</h4>
                  <div className="flex items-center text-gray-600 text-xs mt-1">
                    <MapPin size={12} className="mr-1" />
                    {tour.location}
                  </div>
                  <div className="flex items-center text-gray-600 text-xs mt-1">
                    <Clock size={12} className="mr-1" />
                    {tour.duration}
                  </div>
                </div>
              </div>
              
              {/* Booking Details */}
              <div className="space-y-3 mb-4">
                {selectedPlan && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Package</span>
                    <span className="font-medium">{selectedPlan.name}</span>
                  </div>
                )}
                
                {formData.serviceDate && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Date</span>
                    <span className="font-medium">
                      {new Date(formData.serviceDate).toLocaleDateString()}
                    </span>
                  </div>
                )}
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">People</span>
                  <span className="font-medium">{formData.numberOfPeople}</span>
                </div>
                
                {selectedPlan && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Price per person</span>
                    <span className="font-medium">₹{selectedPlan.price.toLocaleString()}</span>
                  </div>
                )}
              </div>
              
              {/* Total */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-bold text-gray-800">Total Amount</span>
                  <span className="text-2xl font-bold text-green-600">
                    ₹{calculateTotal().toLocaleString()}
                  </span>
                </div>
                
                {formData.paymentMethod === 'partial' && currentStep >= 3 && (
                  <div className="text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Advance Payment (30%)</span>
                      <span className="font-medium">₹{Math.round(calculateTotal() * 0.3).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Remaining Amount</span>
                      <span className="font-medium">₹{Math.round(calculateTotal() * 0.7).toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Contact Info */}
              <div className="mt-6 pt-4 border-t">
                <h4 className="font-medium text-gray-800 mb-2">Need Help?</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex items-center">
                    <Phone size={14} className="mr-2" />
                    +91 98765 43210
                  </div>
                  <div className="flex items-center">
                    <Mail size={14} className="mr-2" />
                    support@vinayakatours.com
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
