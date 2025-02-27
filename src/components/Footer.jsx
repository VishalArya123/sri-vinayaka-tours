import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Sri Vinayaka Tours</h3>
            <p className="mb-4">Explore beautiful destinations with our carefully curated tour packages. We provide unforgettable experiences at affordable prices.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-pink-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-blue-300 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-blue-300 transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-blue-300 transition-colors">About Us</Link></li>
              <li><Link to="/tour-packages" className="hover:text-blue-300 transition-colors">Tour Packages</Link></li>
              <li><Link to="/contact" className="hover:text-blue-300 transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Info</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <Phone size={18} className="mr-2" />
                <span>+1 (123) 456-7890</span>
              </div>
              <div className="flex items-center">
                <Mail size={18} className="mr-2" />
                <span>info@srivinayakatours.com</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p>&copy; {new Date().getFullYear()} Sri Vinayaka Tours. All rights reserved.</p>
          <div className="mt-2">
            <Link to="/privacy" className="text-sm text-gray-400 hover:text-blue-300 mx-2">Privacy Policy</Link>
            <Link to="/terms" className="text-sm text-gray-400 hover:text-blue-300 mx-2">Terms & Conditions</Link>
            <Link to="/cancellation" className="text-sm text-gray-400 hover:text-blue-300 mx-2">Cancellation Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;