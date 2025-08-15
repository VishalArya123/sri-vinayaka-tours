import React from 'react';
import { Users, MapPin, Star, Calendar, Award, Heart, Shield, Clock, Sparkles, ArrowRight } from 'lucide-react';

// Team data
const teamMembers = [
  {
    name: "Rajesh Kumar",
    position: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    bio: "With over 15 years in the travel industry, Rajesh founded Sri Vinayaka Tours with a vision to create unforgettable travel experiences."
  },
  {
    name: "Priya Sharma",
    position: "Head of Operations",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b587?w=300&h=300&fit=crop&crop=face",
    bio: "Priya ensures seamless operations and exceptional customer service, managing our day-to-day activities with precision and care."
  },
  {
    name: "Vikram Singh",
    position: "Tour Director",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    bio: "Vikram designs and curates our tour packages, bringing his extensive knowledge of Indian heritage and culture to every journey."
  }
];

// Values data
const values = [
  {
    icon: Heart,
    title: "Customer First",
    description: "Every decision we make puts our customers' happiness and satisfaction at the forefront."
  },
  {
    icon: Shield,
    title: "Trust & Safety",
    description: "We prioritize the safety and security of our travelers with verified accommodations and transport."
  },
  {
    icon: Star,
    title: "Excellence",
    description: "We strive for excellence in every aspect of our service, from planning to execution."
  },
  {
    icon: Award,
    title: "Innovation",
    description: "Continuously improving our services with modern technology and innovative solutions."
  }
];

// Stats data
const stats = [
  { icon: Users, number: "5000+", label: "Happy Customers", color: "text-primary-600" },
  { icon: MapPin, number: "150+", label: "Destinations Covered", color: "text-accent-peach" },
  { icon: Calendar, number: "12+", label: "Years of Experience", color: "text-accent-yellow" },
  { icon: Star, number: "4.8", label: "Average Rating", color: "text-primary-700" }
];

const About = () => {
  return (
    <>
      <div className="min-h-screen bg-background-light">
        {/* Hero Section */}
        <section className="relative pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-32 lg:pb-24 bg-gradient-to-br from-secondary-900 via-secondary-800 to-primary-800 text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 animate-float">
              <Sparkles className="w-16 h-16 text-accent-yellow" />
            </div>
            <div className="absolute top-40 right-20 animate-bounce-gentle" style={{ animationDelay: '1s' }}>
              <Heart className="w-12 h-12 text-accent-peach" />
            </div>
            <div className="absolute bottom-32 left-32 animate-float" style={{ animationDelay: '2s' }}>
              <Star className="w-14 h-14 text-accent-yellow" />
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center px-4 py-2 bg-glass-gradient backdrop-blur-sm border border-white/20 rounded-full text-white/90 font-medium mb-6 animate-fade-in">
                <Users className="w-4 h-4 mr-2" />
                About Our Journey
              </div>

              <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in-up">
                Crafting Memorable
                <span className="text-accent-yellow"> Travel Stories</span>
              </h1>

              <p className="font-poppins text-lg sm:text-xl text-white/90 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Since 2012, Sri Vinayaka Tours has been your trusted companion in exploring the incredible
                diversity and beauty of India, creating unforgettable experiences one journey at a time.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Content */}
              <div className="animate-fade-in-up">
                <div className="inline-flex items-center px-4 py-2 bg-elegant-gradient rounded-full text-white font-medium mb-6">
                  <Clock className="w-4 h-4 mr-2" />
                  Our Story
                </div>

                <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-secondary-800 mb-6">
                  A Journey That Started with
                  <span className="bg-elegant-gradient bg-clip-text text-transparent"> Passion</span>
                </h2>

                <div className="space-y-6 font-poppins text-secondary-600 leading-relaxed">
                  <p>
                    Founded in 2012 by Rajesh Kumar, Sri Vinayaka Tours began as a small travel agency
                    with a big dream - to showcase the incredible beauty and rich heritage of India to
                    travelers from around the world.
                  </p>

                  <p>
                    What started as a passion project has now grown into a trusted name in the travel
                    industry, serving over 5,000 satisfied customers and covering more than 150 destinations
                    across India. Our commitment to excellence and personalized service has earned us a
                    stellar reputation and numerous awards.
                  </p>

                  <p>
                    Today, we continue to innovate and expand our services while maintaining the same
                    core values that founded our company - integrity, reliability, and an unwavering
                    dedication to creating magical travel experiences.
                  </p>
                </div>
              </div>

              {/* Image Grid */}
              <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <img
                      src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&h=300&fit=crop"
                      alt="Travel destination"
                      className="w-full h-48 object-cover rounded-2xl shadow-warm hover:shadow-elegant transition-all duration-300 transform hover:scale-105"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop"
                      alt="Happy travelers"
                      className="w-full h-32 object-cover rounded-2xl shadow-warm hover:shadow-elegant transition-all duration-300 transform hover:scale-105"
                    />
                  </div>
                  <div className="space-y-4 pt-8">
                    <img
                      src="https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=400&h=200&fit=crop"
                      alt="Indian heritage"
                      className="w-full h-32 object-cover rounded-2xl shadow-warm hover:shadow-elegant transition-all duration-300 transform hover:scale-105"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop"
                      alt="Luxury travel"
                      className="w-full h-48 object-cover rounded-2xl shadow-warm hover:shadow-elegant transition-all duration-300 transform hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 sm:py-20 bg-gradient-to-br from-primary-50 to-secondary-50 relative overflow-hidden">
          {/* Background Decoration */}
          <div className="absolute top-20 right-10 animate-rotate-gentle opacity-10">
            <Sparkles className="w-32 h-32 text-primary-400" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-secondary-800 mb-6">
                Our Journey in
                <span className="bg-elegant-gradient bg-clip-text text-transparent"> Numbers</span>
              </h2>
              <p className="font-poppins text-lg text-secondary-600 max-w-3xl mx-auto">
                These numbers tell the story of our commitment to excellence and customer satisfaction
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center group animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="bg-white rounded-3xl p-8 shadow-warm group-hover:shadow-elegant transition-all duration-500 transform group-hover:scale-105 group-hover:-translate-y-2">
                    <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 mb-6 ${stat.color}`}>
                      <stat.icon className="w-10 h-10" />
                    </div>
                    <div className="font-playfair text-4xl sm:text-5xl font-bold text-secondary-800 mb-2">
                      {stat.number}
                    </div>
                    <p className="font-poppins text-secondary-600">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-background-light">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16 animate-fade-in-up">
              <div className="inline-flex items-center px-4 py-2 bg-warm-gradient rounded-full text-white font-medium mb-6">
                <Heart className="w-4 h-4 mr-2" />
                Our Values
              </div>
              <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary-800 mb-6">
                What Drives
                <span className="bg-elegant-gradient bg-clip-text text-transparent"> Our Mission</span>
              </h2>
              <p className="font-poppins text-lg text-secondary-600 max-w-3xl mx-auto">
                Our core values guide every decision we make and every experience we create for our travelers
              </p>
            </div>

            {/* Values Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="group text-center animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="bg-white rounded-3xl p-8 shadow-warm hover:shadow-float transition-all duration-500 transform hover:-translate-y-2 h-full">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-elegant-gradient mb-6 group-hover:scale-110 transition-transform duration-300">
                      <value.icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="font-playfair text-xl font-bold text-secondary-800 mb-4">
                      {value.title}
                    </h3>
                    <p className="font-poppins text-secondary-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-secondary-50 to-primary-50 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-16 animate-fade-in-up">
              <div className="inline-flex items-center px-4 py-2 bg-elegant-gradient rounded-full text-white font-medium mb-6">
                <Users className="w-4 h-4 mr-2" />
                Meet Our Team
              </div>
              <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary-800 mb-6">
                The People Behind Your
                <span className="bg-elegant-gradient bg-clip-text text-transparent"> Perfect Journey</span>
              </h2>
              <p className="font-poppins text-lg text-secondary-600 max-w-3xl mx-auto">
                Our dedicated team of travel experts work tirelessly to ensure your travel dreams become reality
              </p>
            </div>

            {/* Team Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="group text-center animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="bg-white rounded-3xl p-8 shadow-warm hover:shadow-float transition-all duration-500 transform hover:-translate-y-2">
                    <div className="relative inline-block mb-6">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-32 h-32 rounded-2xl object-cover mx-auto shadow-elegant"
                      />
                      <div className="absolute -inset-1 bg-elegant-gradient rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>
                    </div>

                    <h3 className="font-playfair text-xl font-bold text-secondary-800 mb-2">
                      {member.name}
                    </h3>
                    <p className="font-poppins text-primary-600 font-medium mb-4">
                      {member.position}
                    </p>
                    <p className="font-poppins text-secondary-600 leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-secondary-800 to-secondary-900 text-white relative overflow-hidden">
          {/* Background Decorations */}
          <div className="absolute top-20 left-10 animate-float opacity-20">
            <Award className="w-16 h-16 text-accent-yellow" />
          </div>
          <div className="absolute bottom-20 right-20 animate-bounce-gentle opacity-15" style={{ animationDelay: '2s' }}>
            <Sparkles className="w-12 h-12 text-accent-peach" />
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center px-4 py-2 bg-glass-gradient backdrop-blur-sm border border-white/20 rounded-full text-white/90 font-medium mb-6">
                <Star className="w-4 h-4 mr-2" />
                Our Mission
              </div>

              <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold mb-8">
                To Make Travel
                <span className="text-accent-yellow"> Dreams Come True</span>
              </h2>

              <p className="font-poppins text-lg sm:text-xl text-white/90 mb-10 leading-relaxed max-w-4xl mx-auto">
                Our mission is simple yet profound - to create extraordinary travel experiences that not only
                showcase the beauty of India but also create lasting memories and meaningful connections.
                We believe that travel has the power to transform lives, broaden perspectives, and bring people together.
              </p>

              <div className="bg-glass-gradient backdrop-blur-lg border border-white/20 rounded-3xl p-8 sm:p-12 max-w-4xl mx-auto">
                <h3 className="font-playfair text-2xl font-bold mb-6 text-accent-yellow">
                  Our Promise to You
                </h3>
                <p className="font-poppins text-white/90 leading-relaxed">
                  We promise to deliver not just a trip, but a transformative journey filled with authentic
                  experiences, warm hospitality, and memories that will last a lifetime. Your satisfaction
                  and happiness are our greatest rewards.
                </p>
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
                Ready to Create Your
                <span className="text-accent-yellow"> Next Adventure?</span>
              </h2>
              <p className="font-poppins text-lg sm:text-xl text-white/90 mb-10 leading-relaxed">
                Join thousands of satisfied travelers who have trusted us with their journeys.
                Let's plan your perfect getaway together.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="/tour-packages"
                  className="group inline-flex items-center px-8 py-4 bg-white text-primary-700 font-semibold text-lg rounded-2xl hover:bg-background-light hover:shadow-elegant transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                >
                  <span className="mr-3">Explore Our Packages</span>
                  <ArrowRight className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" />
                </a>

                <a
                  href="/contact"
                  className="group inline-flex items-center px-8 py-4 bg-glass-gradient backdrop-blur-sm border-2 border-white/30 text-white font-semibold text-lg rounded-2xl hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
                >
                  <span className="mr-3">Get In Touch</span>
                  <ArrowRight className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default About;
