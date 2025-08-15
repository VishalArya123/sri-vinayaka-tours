import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

const ServiceCard = ({ service }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(service.route);
  };

  return (
    <div
      onClick={handleClick}
      className="group relative rounded-3xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-105 shadow-warm hover:shadow-float"
    >
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url(${service.backgroundImage})` }}
      >
        {/* Elegant Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary-800/80 via-secondary-600/60 to-primary-600/70"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      </div>

      {/* Glassmorphism Effect */}
      <div className="absolute inset-0 bg-glass-gradient backdrop-blur-xs border border-white/10"></div>

      {/* Floating Sparkle */}
      <div className="absolute top-6 right-6 animate-pulse-gentle">
        <Sparkles className="w-6 h-6 text-accent-yellow opacity-80" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-8 sm:p-10 text-white text-center h-80 flex flex-col justify-center">
        {/* Icon with Animation */}
        <div className="text-6xl sm:text-7xl mb-6 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
          {service.icon}
        </div>
        
        {/* Title */}
        <h3 className="font-playfair text-2xl sm:text-3xl font-bold mb-4 leading-tight">
          {service.title}
        </h3>
        
        {/* Description */}
        <p className="font-poppins text-base sm:text-lg mb-8 opacity-90 leading-relaxed">
          {service.description}
        </p>
        
        {/* CTA Button */}
        <button className="inline-flex items-center justify-center mx-auto px-6 py-3 bg-elegant-gradient hover:shadow-elegant text-white font-semibold rounded-2xl transition-all duration-300 transform group-hover:translate-y-[-2px] group-hover:scale-105">
          <span className="mr-2">Explore Now</span>
          <ArrowRight className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>

      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-elegant-gradient transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
    </div>
  );
};

export default ServiceCard;
