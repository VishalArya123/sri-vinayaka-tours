import React from 'react';
import { MapPin, Users, Clock, Heart, Award, Shield, Target, Eye, Book, Star, CheckCircle, TrendingUp } from 'lucide-react';

const About = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Vinay Kumar',
      role: 'Founder & CEO',
      image: 'https://randomuser.me/api/portraits/men/41.jpg',
      bio: 'With over 15 years of experience in the bus industry, Vinay founded Sri Vinayaka Travels with a vision to revolutionize the industry and ensure passenger comfort is never compromised.'
    },
    {
      id: 2,
      name: 'Anjali Sharma',
      role: 'Tour Director',
      image: 'https://randomuser.me/api/portraits/women/66.jpg',
      bio: 'Anjali ensures that every journey is meticulously planned and executed to perfection. Her attention to detail and customer-first approach has earned us many loyal customers.'
    },
    {
      id: 3,
      name: 'Raj Patel',
      role: 'Customer Relations',
      image: 'https://randomuser.me/api/portraits/men/36.jpg',
      bio: 'Raj handles all customer queries and feedback, ensuring that every traveler has a seamless experience from booking to the end of their journey with Sri Vinayaka Travels.'
    }
  ];

  return (
    <>
      <div className="bg-gray-50">
        {/* Hero Section */}
        <section className="bg-blue-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Sri Vinayaka Travels</h1>
            <p className="text-xl max-w-3xl mx-auto">A well-known company in the bus industry, with a goal to revolutionize passenger comfort and travel experience.</p>
          </div>
        </section>
        
        {/* Our Story */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                <img 
                  src="https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81" 
                  alt="Sri Vinayaka Travels Story" 
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>
              
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                  <Book className="mr-3 text-blue-600" size={28} />
                  Our Story
                </h2>
                <p className="text-gray-600 mb-6">
                  Sri Vinayaka Travels is a well-known company in the bus industry, with a goal to revolutionize the industry. Since our establishment, we have placed a strong emphasis on passenger comfort and have continually added luxurious buses to our extensive fleet.
                </p>
                <p className="text-gray-600 mb-6">
                  Our main focus is to ensure that our passengers' comfort is never compromised. We constantly strive to improve and enhance the travel experience for our customers, challenging ourselves to provide innovative solutions to the travelling sector.
                </p>
                <p className="text-gray-600">
                  Today, we continue to build on our commitment to providing consistently high quality services, aiming to attain a position of pre-eminence in the bus transport sector while serving beyond customer expectations for every journey.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Why Choose Us */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center justify-center">
                <Star className="mr-3 text-blue-600" size={28} />
                Why Choose Sri Vinayaka Travels
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">We take pride in our commitment to excellence and customer satisfaction. Here's what sets us apart:</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-md transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                  <Users size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Understand Customer Needs</h3>
                <p className="text-gray-600">We proactively understand customer needs and expectations and fulfil them through innovative solutions.</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-md transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                  <Award size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Luxurious Fleet</h3>
                <p className="text-gray-600">We continually add luxurious buses to our extensive fleet to enhance your travel experience.</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-md transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                  <Heart size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Customer Trust</h3>
                <p className="text-gray-600">We work to earn customer trust and confidence through reliable service and consistent quality.</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-md transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                  <MapPin size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Building Relationships</h3>
                <p className="text-gray-600">We believe in building relationships with customers who contribute to our growth and success.</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-md transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                  <Shield size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Safety First</h3>
                <p className="text-gray-600">Your safety and comfort are our top priorities throughout your journey with us.</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-md transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                  <Clock size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Achieve Customer Goals</h3>
                <p className="text-gray-600">We aim to achieve customer goals and grow hand-in-hand with our customers.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Mission & Vision */}
        <section className="py-16 bg-gradient-to-b from-gray-50 to-gray-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center justify-center">
                <Target className="mr-3 text-blue-600" size={28} />
                Our Purpose
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Driven by excellence and guided by our customer-first approach</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-8 transform transition-transform duration-300 hover:-translate-y-2">
                <div className="flex items-center mb-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 text-blue-600 rounded-full mr-4">
                    <Target size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Our Mission</h3>
                </div>
                <p className="text-gray-600 pl-4 border-l-4 border-blue-500 py-2">
                  Proactively understand customer needs and expectations and fulfil them, by continuously challenging ourselves to provide innovative solutions to the travelling sector.
                </p>
                <div className="mt-6 flex justify-end">
                  <div className="inline-flex items-center text-blue-600">
                    <CheckCircle size={20} className="mr-2" />
                    <span className="font-medium">Customer-Focused</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-8 transform transition-transform duration-300 hover:-translate-y-2">
                <div className="flex items-center mb-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 text-blue-600 rounded-full mr-4">
                    <Eye size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Our Vision</h3>
                </div>
                <p className="text-gray-600 pl-4 border-l-4 border-blue-500 py-2">
                  Sri Vinayaka Travels is committed to provide consistently high quality of services and to continuously improve the services through a process of teamwork for the utmost satisfaction of the passengers and to attain a position of pre-eminence in the bus transport sector.
                </p>
                <p className="text-gray-600 pl-4 border-l-4 border-blue-500 py-2 mt-4">
                  By serving beyond customer expectations for every journey whilst adding value to all our customers and society at large.
                </p>
                <div className="mt-6 flex justify-end">
                  <div className="inline-flex items-center text-blue-600">
                    <TrendingUp size={20} className="mr-2" />
                    <span className="font-medium">Industry Leadership</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Team */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center justify-center">
                <Users className="mr-3 text-blue-600" size={28} />
                Meet Our Team
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">The dedicated professionals who work tirelessly to enhance your travel experience.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <div key={member.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow transform transition-transform duration-300 hover:-translate-y-2">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                    <p className="text-gray-600">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Our Philosophy */}
        <section className="py-16 bg-gradient-to-b from-blue-50 to-blue-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center justify-center">
                <Book className="mr-3 text-blue-600" size={28} />
                Our Philosophy
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Sri Vinayaka Travels believes in building relationship with customers, having different visions and experience, who contribute to managing the growth, direction and success of the company.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 rounded-lg bg-blue-50 border-t-4 border-blue-500 text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 text-blue-600 rounded-full mb-4">
                    <Users size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Understand Customer Needs</h3>
                </div>
                
                <div className="p-4 rounded-lg bg-blue-50 border-t-4 border-blue-500 text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 text-blue-600 rounded-full mb-4">
                    <Heart size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Earn Customer Trust</h3>
                </div>
                
                <div className="p-4 rounded-lg bg-blue-50 border-t-4 border-blue-500 text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 text-blue-600 rounded-full mb-4">
                    <Target size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Achieve Customer Goals</h3>
                </div>
              </div>
              
              <div className="text-center mt-8 pt-8 border-t border-gray-200">
                <p className="text-gray-600 italic">
                  "It is the intention of Sri Vinayaka Travels to grow hand-in-hand with our customers, encouraging, cheering and aiding them to reach their maximum potential and improve their standard of living."
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;