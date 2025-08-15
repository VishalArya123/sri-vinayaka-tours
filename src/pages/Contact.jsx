import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, AlertCircle, Sparkles, Heart, MessageCircle, User, Calendar } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    travelDate: '',
    groupSize: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        travelDate: '',
        groupSize: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone Numbers",
      details: [
        { label: "Booking & Inquiries", value: "+91 98765 43210", link: "tel:+919876543210" },
        { label: "Customer Support", value: "+91 98765 43211", link: "tel:+919876543211" }
      ],
      color: "text-primary-600"
    },
    {
      icon: Mail,
      title: "Email Addresses",
      details: [
        { label: "General Inquiries", value: "info@vinayakatravels.com", link: "mailto:info@vinayakatravels.com" },
        { label: "Support", value: "support@vinayakatravels.com", link: "mailto:support@vinayakatravels.com" }
      ],
      color: "text-accent-peach"
    },
    {
      icon: MapPin,
      title: "Office Address",
      details: [
        { label: "Head Office", value: "123 Main Road, Jubilee Hills\nHyderabad, Telangana - 500033, India" }
      ],
      color: "text-accent-yellow"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: [
        { label: "Mon - Fri", value: "9:00 AM - 6:00 PM" },
        { label: "Saturday", value: "10:00 AM - 4:00 PM" },
        { label: "Sunday", value: "Closed" }
      ],
      color: "text-primary-700"
    }
  ];

  const inquiryTypes = [
    "General Inquiry",
    "Tour Package Information", 
    "Rental Services",
    "Custom Package Request",
    "Booking Assistance",
    "Complaint/Feedback"
  ];

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
            <Heart className="w-12 h-12 text-accent-peach" />
          </div>
          <div className="absolute bottom-32 left-32 animate-float" style={{animationDelay: '2s'}}>
            <MessageCircle className="w-14 h-14 text-accent-yellow" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 bg-glass-gradient backdrop-blur-sm border border-white/20 rounded-full text-white/90 font-medium mb-6 animate-fade-in">
              <MessageCircle className="w-4 h-4 mr-2" />
              Get In Touch
            </div>
            
            <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in-up">
              We're Here to Help Plan Your
              <span className="text-accent-yellow"> Perfect Journey</span>
            </h1>
            
            <p className="font-poppins text-lg sm:text-xl text-white/90 leading-relaxed animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              Have questions about our tour packages or need assistance with your booking? 
              Our friendly team of travel experts is ready to help you create unforgettable memories.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-background-light">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div 
                key={index} 
                className="group animate-fade-in-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="bg-white rounded-3xl p-8 shadow-warm hover:shadow-float transition-all duration-500 transform hover:-translate-y-2 h-full">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 mb-6 ${info.color}`}>
                    <info.icon className="w-8 h-8" />
                  </div>
                  
                  <h3 className="font-playfair text-xl font-bold text-secondary-800 mb-4">
                    {info.title}
                  </h3>
                  
                  <div className="space-y-3">
                    {info.details.map((detail, detailIndex) => (
                      <div key={detailIndex}>
                        <p className="font-poppins text-sm text-secondary-500 mb-1">
                          {detail.label}
                        </p>
                        {detail.link ? (
                          <a
                            href={detail.link}
                            className="font-poppins text-secondary-700 hover:text-primary-600 transition-colors duration-300 whitespace-pre-line"
                          >
                            {detail.value}
                          </a>
                        ) : (
                          <p className="font-poppins text-secondary-700 whitespace-pre-line">
                            {detail.value}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-primary-50 to-secondary-50 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-20 right-10 animate-rotate-gentle opacity-10">
          <Sparkles className="w-32 h-32 text-primary-400" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="inline-flex items-center px-4 py-2 bg-elegant-gradient rounded-full text-white font-medium mb-6">
              <Send className="w-4 h-4 mr-2" />
              Send us a Message
            </div>
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-secondary-800 mb-6">
              Let's Start Planning Your
              <span className="bg-elegant-gradient bg-clip-text text-transparent"> Dream Trip</span>
            </h2>
            <p className="font-poppins text-lg text-secondary-600 max-w-3xl mx-auto">
              Fill out the form below and we'll get back to you within 24 hours with personalized recommendations
            </p>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl shadow-float p-8 sm:p-12 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block font-poppins text-sm font-medium text-secondary-700 mb-2">
                    <User className="inline w-4 h-4 mr-2 text-primary-500" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-primary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent font-poppins transition-all duration-300"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block font-poppins text-sm font-medium text-secondary-700 mb-2">
                    <Mail className="inline w-4 h-4 mr-2 text-primary-500" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-primary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent font-poppins transition-all duration-300"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              {/* Contact & Travel Info Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block font-poppins text-sm font-medium text-secondary-700 mb-2">
                    <Phone className="inline w-4 h-4 mr-2 text-primary-500" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-primary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent font-poppins transition-all duration-300"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label htmlFor="travelDate" className="block font-poppins text-sm font-medium text-secondary-700 mb-2">
                    <Calendar className="inline w-4 h-4 mr-2 text-primary-500" />
                    Preferred Travel Date
                  </label>
                  <input
                    type="date"
                    id="travelDate"
                    name="travelDate"
                    value={formData.travelDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-primary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent font-poppins transition-all duration-300"
                  />
                </div>
              </div>

              {/* Subject & Group Size Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="subject" className="block font-poppins text-sm font-medium text-secondary-700 mb-2">
                    <MessageCircle className="inline w-4 h-4 mr-2 text-primary-500" />
                    Inquiry Type *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-primary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent font-poppins transition-all duration-300"
                  >
                    <option value="">Select inquiry type</option>
                    {inquiryTypes.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="groupSize" className="block font-poppins text-sm font-medium text-secondary-700 mb-2">
                    <User className="inline w-4 h-4 mr-2 text-primary-500" />
                    Group Size
                  </label>
                  <select
                    id="groupSize"
                    name="groupSize"
                    value={formData.groupSize}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-primary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent font-poppins transition-all duration-300"
                  >
                    <option value="">Select group size</option>
                    <option value="1">Solo Traveler</option>
                    <option value="2">2 People</option>
                    <option value="3-5">3-5 People</option>
                    <option value="6-10">6-10 People</option>
                    <option value="10+">More than 10</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block font-poppins text-sm font-medium text-secondary-700 mb-2">
                  <MessageCircle className="inline w-4 h-4 mr-2 text-primary-500" />
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-primary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent font-poppins resize-vertical transition-all duration-300"
                  placeholder="Tell us about your travel preferences, destinations you're interested in, budget range, or any specific requirements..."
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group w-full bg-elegant-gradient hover:shadow-elegant text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      <span>Sending Message...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <span className="mr-3">Send Message</span>
                      <Send className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  )}
                </button>
              </div>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="flex items-center p-4 bg-green-50 border border-green-200 rounded-xl animate-fade-in">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <p className="font-poppins text-green-700">
                    Thank you! Your message has been sent successfully. We'll get back to you within 24 hours.
                  </p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="flex items-center p-4 bg-red-50 border border-red-200 rounded-xl animate-fade-in">
                  <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
                  <p className="font-poppins text-red-700">
                    Sorry, there was an error sending your message. Please try again or contact us directly.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Map Section (Optional - can be replaced with actual map integration) */}
      <section className="py-16 sm:py-20 bg-background-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-secondary-800 mb-6">
              Visit Our
              <span className="bg-elegant-gradient bg-clip-text text-transparent"> Office</span>
            </h2>
            <p className="font-poppins text-lg text-secondary-600">
              Drop by our office for a personal consultation and detailed trip planning
            </p>
          </div>

          <div className="bg-gradient-to-br from-primary-100 to-secondary-100 rounded-3xl p-8 sm:p-12 text-center animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-elegant-gradient mb-6">
              <MapPin className="w-10 h-10 text-white" />
            </div>
            <h3 className="font-playfair text-2xl font-bold text-secondary-800 mb-4">
              Sri Vinayaka Tours Head Office
            </h3>
            <p className="font-poppins text-secondary-600 text-lg mb-6 whitespace-pre-line">
              123 Main Road, Jubilee Hills{'\n'}
              Hyderabad, Telangana - 500033, India
            </p>
            <p className="font-poppins text-secondary-500">
              Easily accessible by public transport with ample parking available
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
