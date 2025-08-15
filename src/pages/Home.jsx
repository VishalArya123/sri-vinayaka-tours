import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Banner from '../components/Banner';
import ServiceCard from '../components/ServiceCard';
import TourCard from '../components/TourCard';
import { MapPin, Users, Star, Calendar, Sparkles, ArrowRight, Clock, Shield, Award, Heart } from 'lucide-react';
import { storage } from '../utils/storage';
import {tourPackages,services} from '../data/mockData';

// Stats data
const stats = [
  { icon: Users, number: "5000+", label: "Happy Travelers", color: "text-primary-600" },
  { icon: MapPin, number: "150+", label: "Destinations", color: "text-accent-peach" },
  { icon: Star, number: "4.8", label: "Average Rating", color: "text-accent-yellow" },
  { icon: Calendar, number: "12+", label: "Years Experience", color: "text-primary-700" }
];

// Features data
const features = [
  {
    icon: Shield,
    title: "Secure Booking",
    description: "Safe and encrypted payment processing with full refund protection"
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock customer assistance for all your travel needs"
  },
  {
    icon: Award,
    title: "Best Price Guarantee",
    description: "Competitive pricing with no hidden costs or surprise charges"
  },
  {
    icon: Heart,
    title: "Memorable Experiences",
    description: "Curated journeys that create lasting memories and stories"
  }
];

// Testimonials data
const testimonials = [
  {
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    text: "Absolutely wonderful experience! The team made our Goa trip unforgettable with their attention to detail and exceptional service.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b587?w=100&h=100&fit=crop&crop=face"
  },
  {
    name: "Rajesh Kumar",
    location: "Delhi",
    rating: 5,
    text: "Professional service and excellent tour packages. The Rajasthan heritage tour exceeded our expectations in every way.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
  },
  {
    name: "Anjali Patel",
    location: "Bangalore",
    rating: 5,
    text: "Best travel agency in Hyderabad! Their customized Kerala backwater tour was perfectly planned and executed beautifully.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
  }
];

const Home = () => {
  const [featuredTours, setFeaturedTours] = useState([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    // Load featured tours (first 6)
    setFeaturedTours(tourPackages.slice(0, 6));
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="min-h-screen bg-background-light">
        {/* Hero Banner */}
        <Banner />

        {/* Services Section */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-background-light relative overflow-hidden">
          {/* Background Decorations */}
          <div className="absolute top-20 left-10 animate-float opacity-20">
            <Sparkles className="w-12 h-12 text-primary-400" />
          </div>
          <div className="absolute bottom-20 right-10 animate-bounce-gentle opacity-15" style={{ animationDelay: '1s' }}>
            <MapPin className="w-10 h-10 text-accent-peach" />
          </div>

          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16 animate-fade-in-up">
              <div className="inline-flex items-center px-4 py-2 bg-elegant-gradient rounded-full text-white font-medium mb-6">
                <Sparkles className="w-4 h-4 mr-2" />
                Our Premium Services
              </div>
              <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary-800 mb-6">
                Discover Your Perfect
                <span className="bg-elegant-gradient bg-clip-text text-transparent"> Journey</span>
              </h2>
              <p className="font-poppins text-lg text-secondary-600 max-w-3xl mx-auto leading-relaxed">
                Experience the luxury of seamless travel with our curated tour packages and premium rental services,
                designed to create unforgettable memories.
              </p>
            </div>

            {/* Service Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <ServiceCard service={service} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 sm:py-20 bg-gradient-to-br from-primary-50 to-background-light relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center group animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative">
                    <div className="bg-white rounded-2xl p-6 shadow-warm group-hover:shadow-elegant transition-all duration-500 transform group-hover:scale-105">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 mb-4 ${stat.color}`}>
                        <stat.icon className="w-8 h-8" />
                      </div>
                      <div className="font-playfair text-3xl sm:text-4xl font-bold text-secondary-800 mb-2">
                        {stat.number}
                      </div>
                      <p className="font-poppins text-secondary-600 text-sm sm:text-base">{stat.label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Tours Section */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-background-light">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16 animate-fade-in-up">
              <div className="inline-flex items-center px-4 py-2 bg-warm-gradient rounded-full text-white font-medium mb-6">
                <Star className="w-4 h-4 mr-2" />
                Featured Destinations
              </div>
              <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary-800 mb-6">
                Popular Tour
                <span className="bg-elegant-gradient bg-clip-text text-transparent"> Packages</span>
              </h2>
              <p className="font-poppins text-lg text-secondary-600 max-w-3xl mx-auto">
                Explore our handpicked collection of the most sought-after destinations and experiences
              </p>
            </div>

            {/* Tours Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredTours.map((tour, index) => (
                <div
                  key={tour.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <TourCard tour={tour} />
                </div>
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center animate-fade-in-up">
              <Link
                to="/tour-packages"
                className="group inline-flex items-center px-8 py-4 bg-elegant-gradient hover:shadow-elegant text-white font-semibold text-lg rounded-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
              >
                <span className="mr-3">Explore All Packages</span>
                <ArrowRight className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 sm:py-20 bg-gradient-to-br from-secondary-50 to-primary-50 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-32 right-20 animate-rotate-gentle">
              <Sparkles className="w-24 h-24 text-primary-400" />
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Section Header */}
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary-800 mb-6">
                Why Choose
                <span className="bg-elegant-gradient bg-clip-text text-transparent"> Sri Vinayaka Tours</span>
              </h2>
              <p className="font-poppins text-lg text-secondary-600 max-w-3xl mx-auto">
                We're committed to providing exceptional travel experiences with unmatched service quality
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group text-center animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.2}s` }}
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

        {/* Testimonials Section */}
        <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-secondary-800 to-secondary-900 text-white relative overflow-hidden">
          {/* Background Decorations */}
          <div className="absolute top-20 left-10 animate-float opacity-20">
            <Star className="w-16 h-16 text-accent-yellow" />
          </div>
          <div className="absolute bottom-20 right-20 animate-bounce-gentle opacity-15" style={{ animationDelay: '2s' }}>
            <Heart className="w-12 h-12 text-accent-peach" />
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Section Header */}
            <div className="text-center mb-16 animate-fade-in-up">
              <div className="inline-flex items-center px-4 py-2 bg-glass-gradient backdrop-blur-sm border border-white/20 rounded-full text-white/90 font-medium mb-6">
                <Heart className="w-4 h-4 mr-2" />
                Client Testimonials
              </div>
              <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                What Our Travelers
                <span className="text-accent-yellow"> Say</span>
              </h2>
              <p className="font-poppins text-lg text-white/80 max-w-3xl mx-auto">
                Real experiences from our valued customers who trusted us with their journeys
              </p>
            </div>

            {/* Testimonial Carousel */}
            <div className="relative">
              <div className="bg-glass-gradient backdrop-blur-lg border border-white/20 rounded-3xl p-8 sm:p-12 shadow-float animate-fade-in">
                <div className="text-center">
                  {/* Rating Stars */}
                  <div className="flex justify-center mb-6">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-accent-yellow fill-current" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="font-poppins text-lg sm:text-xl text-white/90 leading-relaxed mb-8 max-w-4xl mx-auto">
                    "{testimonials[currentTestimonial].text}"
                  </blockquote>

                  {/* Author Info */}
                  <div className="flex items-center justify-center space-x-4">
                    <img
                      src={testimonials[currentTestimonial].avatar}
                      alt={testimonials[currentTestimonial].name}
                      className="w-16 h-16 rounded-2xl object-cover shadow-elegant"
                    />
                    <div className="text-left">
                      <div className="font-playfair text-xl font-bold text-white">
                        {testimonials[currentTestimonial].name}
                      </div>
                      <div className="font-poppins text-accent-peach">
                        {testimonials[currentTestimonial].location}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial Indicators */}
              <div className="flex justify-center mt-8 space-x-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`transition-all duration-500 rounded-full ${index === currentTestimonial
                        ? 'w-12 h-3 bg-accent-yellow'
                        : 'w-3 h-3 bg-white/40 hover:bg-white/60'
                      }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 bg-elegant-gradient relative overflow-hidden">
          {/* Background Pattern */}
          <div
            className="absolute inset-0 bg-[url(`data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='7' cy='7' r='7'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E`)] opacity-20"
          ></div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="animate-fade-in-up">
              <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to Start Your
                <span className="text-accent-yellow"> Adventure?</span>
              </h2>
              <p className="font-poppins text-lg sm:text-xl text-white/90 mb-10 leading-relaxed">
                Let us craft the perfect journey for you. Contact our travel experts today
                and begin planning your dream vacation.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  to="/tour-packages"
                  className="group inline-flex items-center px-8 py-4 bg-white text-primary-700 font-semibold text-lg rounded-2xl hover:bg-background-light hover:shadow-elegant transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                >
                  <span className="mr-3">Explore Packages</span>
                  <ArrowRight className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                <Link
                  to="/contact"
                  className="group inline-flex items-center px-8 py-4 bg-glass-gradient backdrop-blur-sm border-2 border-white/30 text-white font-semibold text-lg rounded-2xl hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
                >
                  <span className="mr-3">Contact Us</span>
                  <ArrowRight className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div >
    </>
  );
};

export default Home;
