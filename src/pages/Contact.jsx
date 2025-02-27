import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Mail, Phone, MapPin, Send, Facebook, Twitter, Instagram, } from 'lucide-react'
import { FaYoutube } from "react-icons/fa";


const Contact = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const tourId = searchParams.get('tour')
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    tourId: tourId || '',
    message: tourId ? 'I would like to inquire about this tour package.' : '',
    submitted: false
  })
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate form submission
    setTimeout(() => {
      setFormData(prev => ({ ...prev, submitted: true }))
    }, 1000)
  }
  
  return (
    <div>
      {/* Contact Banner */}
      <div className="bg-blue-600 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-white">Contact Us</h1>
          <p className="mt-4 text-xl text-blue-100">
            We're here to help plan your perfect journey
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            {formData.submitted ? (
              <div className="text-center py-8">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="mt-3 text-lg font-medium text-gray-900">Thank you for contacting us!</h3>
                <p className="mt-2 text-sm text-gray-500">
                  We've received your message and will get back to you as soon as possible.
                </p>
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, submitted: false, message: '' }))}
                    className="inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  {tourId ? 'Book This Tour' : 'Send Us a Message'}
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  {tourId && (
                    <div className="mb-4">
                      <label htmlFor="tourId" className="block text-sm font-medium text-gray-700 mb-1">
                        Tour Package
                      </label>
                      <select
                        id="tourId"
                        name="tourId"
                        value={formData.tourId}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="1">Mysore & Coorg Adventure</option>
                        <option value="2">Kerala Backwaters</option>
                        <option value="3">Goa Beach Retreat</option>
                        <option value="4">Coimbatore Temple Tour</option>
                      </select>
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    {tourId ? 'Book Now' : 'Send Message'}
                  </button>
                </form>
              </>
            )}
          </div>
          
          {/* Contact Information */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <Phone className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Phone</h3>
                  <p className="mt-1 text-gray-600">+91 9876543210</p>
                  <p className="text-gray-600">+91 9876543211</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Email</h3>
                  <p className="mt-1 text-gray-600">info@srivinayakatours.com</p>
                  <p className="text-gray-600">bookings@srivinayakatours.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Address</h3>
                  <p className="mt-1 text-gray-600">123 Tourism Street, Bangalore</p>
                  <p className="text-gray-600">Karnataka, India - 560001</p>
                </div>
              </div>
            </div>
            
            {/* Social Media */}
            <div className="mt-8">
              <h3 className="font-medium text-gray-900 mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-400">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-600 hover:text-pink-600">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-600 hover:text-red-600">
                    <FaYoutube size={30} color="grey" />
                </a>
              </div>
            </div>
            
            {/* Map */}
            <div className="mt-8">
              <h3 className="font-medium text-gray-900 mb-4">Our Location</h3>
              <div className="h-64 bg-gray-300 rounded-lg">
                {/* Replace with actual map component */}
                <div className="h-full w-full flex items-center justify-center text-gray-500">
                  Map Placeholder
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact