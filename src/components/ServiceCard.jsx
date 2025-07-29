// src/components/ServiceCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ServiceCard = ({ service }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(service.route);
  };

  return (
    <div
      onClick={handleClick}
      className="relative rounded-xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 shadow-lg group"
    >
      {/* Background blurred image */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm scale-110 opacity-70"
        style={{ backgroundImage: `url(${service.backgroundImage})` }}
      ></div>

      {/* Overlay color */}
      {/* <div className={`absolute inset-0 ${service.color} opacity-80`}></div> */}

      {/* Content */}
      <div className="relative z-10 p-8 text-dark text-center">
        <div className="text-6xl mb-4">{service.icon}</div>
        <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
        <p className="text-lg mb-6 opacity-90">{service.description}</p>
        <button className="bg-white text-gray-800 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors flex items-center justify-center mx-auto group-hover:translate-x-1 transition-transform">
          Explore Now
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
