import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Home, Info, Package, Clock, Star, Shield, CreditCard, ArrowUp ,Bus} from 'lucide-react';
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
    <footer className=" text-gray-800 pt-16 pb-6 relative">
      {/* Scroll to top button */}
      <button 
        onClick={scrollToTop}
        className={`fixed right-6 bottom-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50 ${
          showScrollTop ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info & Socials */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-20 w-20 rounded-full flex items-center justify-center">
                <img src={logo} alt="logo" />
              </div>
              <h3 className="text-2xl font-bold text-blue-800">Sri Vinayaka Travels</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Providing exceptional travel experiences since 2005. Your trusted partner for comfortable and safe journeys across India.
            </p>
            <div className="pt-2">
              <h4 className="text-sm font-semibold mb-3 text-gray-700">Connect with us</h4>
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
                    className={`w-10 h-10 rounded-full bg-gray-200 ${social.color} transition-all duration-300 flex items-center justify-center group`} 
                    aria-label={social.label} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <social.icon size={18} className="text-gray-600 group-hover:text-white" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-5 border-b border-gray-300 pb-2 text-blue-800">Quick Links</h3>
            <ul className="space-y-3">
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
                    className="text-gray-600 flex items-center text-sm hover:text-blue-600 transition-colors group"
                  >
                    <span className="h-8 w-8 bg-blue-50 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-600 transition-colors duration-300">
                      <item.icon size={16} className="text-gray-600 group-hover:text-white" />
                    </span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-5 border-b border-gray-300 pb-2 text-blue-800">Contact Information</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <div className="mt-1 bg-blue-100 h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin size={16} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-800 text-sm font-medium">Office Address</p>
                  <p className="text-gray-600 text-sm mt-1">123 Main Road, Jubilee Hills, Hyderabad, Telangana - 500033, India</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="mt-1 bg-blue-100 h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone size={16} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-800 text-sm font-medium">Phone Numbers</p>
                  <a href="tel:+919876543210" className="text-gray-600 text-sm mt-1 block hover:text-blue-600 transition-colors">
                    +91 98765 43210 (Booking)
                  </a>
                  <a href="tel:+919876543211" className="text-gray-600 text-sm mt-1 block hover:text-blue-600 transition-colors">
                    +91 98765 43211 (Support)
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="mt-1 bg-blue-100 h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail size={16} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-800 text-sm font-medium">Email</p>
                  <a href="mailto:info@vinayakatravels.com" className="text-gray-600 text-sm mt-1 block hover:text-blue-600 transition-colors">
                    info@vinayakatravels.com
                  </a>
                  <a href="mailto:support@vinayakatravels.com" className="text-gray-600 text-sm mt-1 block hover:text-blue-600 transition-colors">
                    support@vinayakatravels.com
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter & Business Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-5 border-b border-gray-300 pb-2 text-blue-800">Stay Updated</h3>
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-3">Subscribe to our newsletter for exclusive offers and updates</p>
              <form className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="bg-white border border-gray-300 text-gray-800 px-4 py-2 text-sm rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" 
                  required 
                />
                <button 
                  type="submit" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm rounded-r-lg transition-colors duration-300"
                >
                  Subscribe
                </button>
              </form>
            </div>
            
            <h4 className="text-sm font-semibold mb-3 text-gray-800 flex items-center">
              <Clock size={16} className="mr-2 text-blue-600" />
              Business Hours
            </h4>
            <ul className="text-sm text-gray-600 space-y-1">
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

        {/* Footer Bottom */}
        <div className="mt-10 pt-6 border-t border-gray-300 flex flex-col md:flex-row items-center justify-between text-sm">
          <div className="flex flex-wrap justify-center md:justify-start space-x-4 mb-4 md:mb-0">
            {[
              { to: '/privacy-policy', label: 'Privacy Policy' },
              { to: '/terms-conditions', label: 'Terms & Conditions' },
              { to: '/cancellation-policy', label: 'Cancellation Policy' },
            ].map((item, index) => (
              <Link key={index} to={item.to} className="text-gray-600 hover:text-blue-600 transition-colors">
                {item.label}
              </Link>
            ))}
          </div>
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()} Sri Vinayaka Travels. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;