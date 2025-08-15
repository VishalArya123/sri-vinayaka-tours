import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Home, Info, Package, Clock, Star, Shield, CreditCard, ArrowUp, Bus, Sparkles, Heart } from 'lucide-react';
import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png"

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-br from-secondary-900 via-secondary-800 to-secondary-900 text-background-light pt-20 pb-8 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 animate-float">
          <Sparkles className="w-8 h-8 text-accent-yellow" />
        </div>
        <div className="absolute top-32 right-20 animate-bounce-gentle" style={{animationDelay: '1s'}}>
          <Heart className="w-6 h-6 text-accent-peach" />
        </div>
        <div className="absolute bottom-32 left-20 animate-float" style={{animationDelay: '2s'}}>
          <Star className="w-7 h-7 text-accent-yellow" />
        </div>
      </div>

      {/* Scroll to top button */}
      <button 
        onClick={scrollToTop}
        className={`fixed right-6 bottom-6 bg-elegant-gradient hover:shadow-elegant text-white p-4 rounded-2xl shadow-float transition-all duration-500 z-50 group ${
          showScrollTop ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} className="transform transition-transform duration-300 group-hover:-translate-y-1" />
      </button>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info & Brand */}
          <div className="space-y-6 lg:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img src={logo} alt="logo" className="h-16 w-16 rounded-2xl shadow-elegant" />
                <div className="absolute -inset-1 bg-elegant-gradient rounded-2xl opacity-20 blur"></div>
              </div>
              <div>
                <h3 className="font-playfair text-2xl font-bold text-white">
                  Sri Vinayaka Tours
                </h3>
                <p className="text-accent-peach font-poppins text-sm">Elegant Journeys</p>
              </div>
            </div>
            
            <p className="text-background-light/80 text-sm font-poppins leading-relaxed">
              Crafting extraordinary travel experiences since 2005. Your trusted companion for luxurious and comfortable journeys across the beautiful landscapes of India.
            </p>
            
            {/* Social Media */}
            <div className="pt-4">
              <h4 className="text-sm font-semibold mb-4 text-accent-peach font-poppins">Connect with us</h4>
              <div className="flex space-x-3">
                {[
                  { icon: Facebook, color: 'hover:bg-blue-600', label: 'Facebook' },
                  { icon: Twitter, color: 'hover:bg-blue-400', label: 'Twitter' },
                  { icon: Instagram, color: 'hover:bg-pink-500', label: 'Instagram' },
                  { icon: Youtube, color: 'hover:bg-red-600', label: 'Youtube' }
                ].map((social, index) => (
                  <a 
                    key={index} 
                    href={`https://www.${social.label.toLowerCase()}.com`} 
                    className={`w-12 h-12 rounded-xl bg-glass-gradient backdrop-blur-sm border border-white/10 ${social.color} transition-all duration-300 flex items-center justify-center group hover:scale-110 hover:shadow-elegant`} 
                    aria-label={social.label} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <social.icon size={18} className="text-background-light/70 group-hover:text-white" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-playfair text-xl font-bold mb-6 text-white relative">
              Quick Links
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-elegant-gradient rounded-full"></div>
            </h3>
            <ul className="space-y-4">
              {[
                { to: '/', label: 'Home', icon: Home },
                { to: '/about', label: 'About Us', icon: Info },
                { to: '/tour-packages', label: 'Tour Packages', icon: Package },
                { to: '/rental-service', label: 'Rental Services', icon: Bus },
                { to: '/contact', label: 'Contact', icon: Mail }
              ].map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.to} 
                    className="text-background-light/80 flex items-center text-sm hover:text-accent-peach transition-colors group font-poppins"
                  >
                    <span className="h-10 w-10 bg-glass-gradient backdrop-blur-sm border border-white/10 rounded-xl flex items-center justify-center mr-3 group-hover:bg-primary-600/20 transition-colors duration-300">
                      <item.icon size={16} className="text-background-light/70 group-hover:text-accent-peach" />
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-playfair text-xl font-bold mb-6 text-white relative">
              Contact Information
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-elegant-gradient rounded-full"></div>
            </h3>
            <ul className="space-y-6">
              <li className="flex items-start space-x-4">
                <div className="bg-glass-gradient backdrop-blur-sm border border-white/10 h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0 group">
                  <MapPin size={18} className="text-accent-peach" />
                </div>
                <div>
                  <p className="text-background-light font-medium font-poppins mb-1">Office Address</p>
                  <p className="text-background-light/80 text-sm leading-relaxed font-poppins">
                    123 Main Road, Jubilee Hills<br />
                    Hyderabad, Telangana - 500033, India
                  </p>
                </div>
              </li>
              
              <li className="flex items-start space-x-4">
                <div className="bg-glass-gradient backdrop-blur-sm border border-white/10 h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone size={18} className="text-accent-peach" />
                </div>
                <div>
                  <p className="text-background-light font-medium font-poppins mb-2">Phone Numbers</p>
                  <a href="tel:+919876543210" className="text-background-light/80 text-sm block hover:text-accent-peach transition-colors font-poppins mb-1">
                    +91 98765 43210 (Booking)
                  </a>
                  <a href="tel:+919876543211" className="text-background-light/80 text-sm block hover:text-accent-peach transition-colors font-poppins">
                    +91 98765 43211 (Support)
                  </a>
                </div>
              </li>
              
              <li className="flex items-start space-x-4">
                <div className="bg-glass-gradient backdrop-blur-sm border border-white/10 h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-accent-peach" />
                </div>
                <div>
                  <p className="text-background-light font-medium font-poppins mb-2">Email</p>
                  <a href="mailto:info@vinayakatravels.com" className="text-background-light/80 text-sm block hover:text-accent-peach transition-colors font-poppins mb-1">
                    info@vinayakatravels.com
                  </a>
                  <a href="mailto:support@vinayakatravels.com" className="text-background-light/80 text-sm block hover:text-accent-peach transition-colors font-poppins">
                    support@vinayakatravels.com
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter & Business Hours */}
          <div>
            <h3 className="font-playfair text-xl font-bold mb-6 text-white relative">
              Stay Connected
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-elegant-gradient rounded-full"></div>
            </h3>
            
            <div className="mb-8">
              <p className="text-sm text-background-light/80 mb-4 font-poppins">
                Subscribe to our newsletter for exclusive offers and travel insights
              </p>
              <form className="space-y-3">
                <div className="relative">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="w-full bg-glass-gradient backdrop-blur-sm border border-white/20 text-background-light placeholder-background-light/60 px-4 py-3 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent font-poppins" 
                    required 
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-elegant-gradient hover:shadow-elegant text-white px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 font-poppins"
                >
                  Subscribe Now
                </button>
              </form>
            </div>
            
            <div className="bg-glass-gradient backdrop-blur-sm border border-white/10 p-4 rounded-xl">
              <h4 className="text-sm font-semibold mb-3 text-accent-peach flex items-center font-poppins">
                <Clock size={16} className="mr-2" />
                Business Hours
              </h4>
              <ul className="text-sm text-background-light/80 space-y-2 font-poppins">
                <li className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday:</span>
                  <span>10:00 AM - 4:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {[
              { icon: Star, label: '4.8+ Rating', desc: '1000+ Reviews' },
              { icon: Shield, label: 'Secure Booking', desc: 'Protected Payments' },
              { icon: CreditCard, label: 'Easy Payment', desc: 'Multiple Options' },
              { icon: Clock, label: '24/7 Support', desc: 'Always Available' }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="bg-glass-gradient backdrop-blur-sm border border-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-primary-600/20 transition-colors duration-300">
                  <item.icon size={24} className="text-accent-peach" />
                </div>
                <h5 className="text-white font-semibold text-sm font-poppins">{item.label}</h5>
                <p className="text-background-light/60 text-xs font-poppins">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-sm">
          <div className="flex flex-wrap justify-center md:justify-start space-x-6 mb-4 md:mb-0">
            {[
              { to: '/privacy-policy', label: 'Privacy Policy' },
              { to: '/terms-conditions', label: 'Terms & Conditions' },
              { to: '/cancellation-policy', label: 'Cancellation Policy' },
            ].map((item, index) => (
              <Link 
                key={index} 
                to={item.to} 
                className="text-background-light/60 hover:text-accent-peach transition-colors font-poppins hover:underline"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <p className="text-background-light/60 font-poppins">
            &copy; {new Date().getFullYear()} Sri Vinayaka Tours. Crafted with <Heart className="inline w-4 h-4 text-coral mx-1" /> for travelers
          </p>
        </div>
      </div>

      {/* Bottom Gradient Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-elegant-gradient"></div>
    </footer>
  );
};

export default Footer;
