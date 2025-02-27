import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const banners = [
  {
    id: 1,
    title: "Explore Beautiful Destinations",
    subtitle: "Discover the wonders of India with our exclusive tour packages",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da",
    cta: "Browse Tours"
  },
  {
    id: 2,
    title: "Unforgettable Experiences",
    subtitle: "Create memories that last a lifetime with Sri Vinayaka Tours",
    image: "https://images.unsplash.com/photo-1519922639192-e73293ca430e",
    cta: "Start Your Journey"
  },
  {
    id: 3,
    title: "Customized Tour Packages",
    subtitle: "Tailored travel experiences for your comfort and convenience",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944",
    cta: "Plan Your Trip"
  }
]

const Banner = () => {
  const [currentBanner, setCurrentBanner] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner(prev => (prev + 1) % banners.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div className="relative h-96 md:h-[500px] overflow-hidden">
      {/* Banner Images */}
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentBanner ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={banner.image}
            alt={banner.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
      ))}
      
      {/* Banner Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {banners[currentBanner].title}
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl">
          {banners[currentBanner].subtitle}
        </p>
        <Link
          to="/tour-packages"
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
        >
          {banners[currentBanner].cta}
        </Link>
      </div>
      
      {/* Banner Indicators */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentBanner(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentBanner ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Banner