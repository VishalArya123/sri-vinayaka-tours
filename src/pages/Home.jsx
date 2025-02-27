import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import Banner from '../components/Banner'
import TourCard from '../components/TourCard'
import TestimonialSection from '../components/TestimonialSection'
import ContactForm from '../components/ContactForm'

// Mock data (replace with API calls)
const featuredTours = [
  {
    id: 1,
    title: "Mysore & Coorg Adventure",
    location: "Karnataka",
    duration: "3 Days & 2 Nights",
    rating: 4.8,
    discountedPrice: 5999,
    actualPrice: 7999,
    image: "https://images.unsplash.com/photo-1587922546307-776227941871"
  },
  {
    id: 2,
    title: "Kerala Backwaters",
    location: "Kerala",
    duration: "4 Days & 3 Nights",
    rating: 4.9,
    discountedPrice: 8999,
    actualPrice: 11999,
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944"
  },
  {
    id: 3,
    title: "Goa Beach Retreat",
    location: "Goa",
    duration: "3 Days & 2 Nights",
    rating: 4.7,
    discountedPrice: 6999,
    actualPrice: 9999,
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2"
  },
  {
    id: 4,
    title: "Coimbatore Temple Tour",
    location: "Tamil Nadu",
    duration: "2 Days & 1 Night",
    rating: 4.6,
    discountedPrice: 3999,
    actualPrice: 5999,
    image: "https://images.unsplash.com/photo-1518002054494-3a6f94352e9d"
  }
]

const Home = () => {
  return (
    <div>
      {/* Hero Banner Section */}
      <Banner />
      
      {/* Featured Tour Packages Section */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Popular Tour Packages</h2>
          <Link to="/tour-packages" className="flex items-center text-blue-600 hover:text-blue-800">
            View All <ChevronRight className="ml-1 h-5 w-5" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredTours.map(tour => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </section>
      
      {/* About Tourism Section with Quote */}
      <section className="py-12 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex items-center gap-12">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <img 
                src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da" 
                alt="Tourism in India" 
                className="rounded-lg shadow-lg w-full h-96 object-cover"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Discover the Beauty of India</h2>
              <div className="relative">
                <svg className="absolute top-0 left-0 transform -translate-x-6 -translate-y-8 h-16 w-16 text-blue-200" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="relative text-lg text-gray-600 italic">
                  India is a mosaic of multicultural experiences. With a rich heritage and myriad attractions, the country is among the most popular tourist destinations in the world. From the majestic Himalayas to the tropical beaches, India has a diverse landscape offering something for every traveler.
                </p>
              </div>
              <div className="mt-8">
                <Link
                  to="/about"
                  className="px-5 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
                >
                  Learn More About Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonial Section */}
      <TestimonialSection />
      
      {/* Contact Section */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Get In Touch</h2>
        <ContactForm />
      </section>
    </div>
  )
}

export default Home