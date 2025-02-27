import React from 'react';
import { Quote } from 'lucide-react';

const TestimonialSection = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Rahul Sharma',
      role: 'Adventure Traveler',
      testimonial: 'Sri Vinayaka Tours provided an exceptional experience during our trip to Kerala. The itinerary was perfectly planned, and the guides were knowledgeable and friendly.',
      image: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
      id: 2,
      name: 'Priya Patel',
      role: 'Family Vacation',
      testimonial: 'Our family trip to Rajasthan exceeded all expectations. Every detail was taken care of, and the accommodation was superb. Highly recommended for family travelers!',
      image: 'https://randomuser.me/api/portraits/women/2.jpg'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">What Our Travelers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Discover why travelers choose Sri Vinayaka Tours for their journeys across India.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-8 rounded-lg shadow-md relative">
              <Quote className="absolute text-blue-100 w-16 h-16 -top-6 -left-6" />
              
              <div className="flex items-center mb-6">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">{testimonial.name}</h4>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              
              <p className="text-gray-700 italic relative z-10">"{testimonial.testimonial}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;