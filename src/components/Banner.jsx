import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Sparkles, MapPin, Calendar } from 'lucide-react'

const banners = [
  {
    id: 1,
    title: "Explore Beautiful Destinations",
    subtitle: "Discover the wonders of India with our exclusive tour packages",
    image: "https://media.istockphoto.com/id/1215274990/photo/high-wide-angle-view-of-charminar-in-the-night.webp?a=1&b=1&s=612x612&w=0&k=20&c=sQggGGYHLaIX4wlJzKYeLkEZHthBO6vLY-Rwwo75KxA=",
    cta: "Browse Tours",
    accent: "Ancient Architecture"
  },
  {
    id: 2,
    title: "Unforgettable Experiences",
    subtitle: "Create memories that last a lifetime with Sri Vinayaka Tours",
    image: "https://media.istockphoto.com/id/471170455/photo/hi-tec-city-building.webp?a=1&b=1&s=612x612&w=0&k=20&c=z0qB6HgA_zRS1n1oOL-Si6t0ND92B48jljIPYyIsDSY=",
    cta: "Start Your Journey",
    accent: "Modern Marvels"
  },
  {
    id: 3,
    title: "Customized Tour Packages",
    subtitle: "Tailored travel experiences for your comfort and convenience",
    image: "https://media.istockphoto.com/id/1338651214/photo/hyderabad-india-city-skyline-at-buddha-statue-in-the-hussain-sagar.webp?a=1&b=1&s=612x612&w=0&k=20&c=weLcb_3ukP5RfqB3UcLWaSr2HWhXG-2FOlbXgTCyqR8=",
    cta: "Plan Your Trip",
    accent: "Scenic Beauty"
  }
]

const Banner = () => {
  const [currentBanner, setCurrentBanner] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentBanner(prev => (prev + 1) % banners.length)
        setIsAnimating(false)
      }, 300)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [])

  const nextBanner = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentBanner(prev => (prev + 1) % banners.length)
        setIsAnimating(false)
      }, 300)
    }
  }

  const prevBanner = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentBanner(prev => (prev - 1 + banners.length) % banners.length)
        setIsAnimating(false)
      }, 300)
    }
  }
  
  return (
    <div className="relative h-[85vh] sm:h-[90vh] lg:h-screen overflow-hidden">
      {/* Background Images with Parallax Effect */}
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentBanner ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        >
          <img
            src={banner.image}
            alt={banner.title}
            className="w-full h-full object-cover transform transition-transform duration-[7s] ease-linear hover:scale-110"
          />
          {/* Elegant Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-secondary-800/80 via-transparent to-transparent"></div>
        </div>
      ))}
      
      {/* Floating Decorative Elements */}
      <div className="absolute top-20 right-10 animate-float opacity-30">
        <Sparkles className="w-8 h-8 text-accent-yellow" />
      </div>
      <div className="absolute top-40 left-10 animate-float opacity-20" style={{animationDelay: '2s'}}>
        <MapPin className="w-6 h-6 text-accent-peach" />
      </div>
      <div className="absolute top-32 right-32 animate-bounce-gentle opacity-25" style={{animationDelay: '1s'}}>
        <Calendar className="w-7 h-7 text-primary-300" />
      </div>

      {/* Main Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
        <div className={`max-w-5xl mx-auto transition-all duration-700 ${isAnimating ? 'opacity-0 transform translate-y-8' : 'opacity-100 transform translate-y-0'}`}>
          {/* Accent Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-glass-gradient backdrop-blur-md border border-white/20 mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4 mr-2 text-accent-yellow" />
            <span className="text-sm font-medium text-white/90">{banners[currentBanner].accent}</span>
          </div>

          {/* Main Title */}
          <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in-up">
            {banners[currentBanner].title}
          </h1>
          
          {/* Subtitle */}
          <p className="font-poppins text-lg sm:text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            {banners[currentBanner].subtitle}
          </p>
          
          {/* CTA Button */}
          <div className="animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <Link
              to="/tour-packages"
              className="group relative inline-flex items-center px-8 py-4 bg-elegant-gradient hover:shadow-elegant text-white font-semibold text-lg rounded-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
              {/* Button Background Shimmer Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              
              <span className="relative z-10">{banners[currentBanner].cta}</span>
              
              {/* Floating Arrow */}
              <ChevronRight className="ml-2 w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Navigation Arrows */}
      <button
        onClick={prevBanner}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-glass-gradient backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 group"
        aria-label="Previous banner"
      >
        <ChevronLeft className="w-6 h-6 transform transition-transform duration-300 group-hover:-translate-x-1" />
      </button>
      
      <button
        onClick={nextBanner}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-glass-gradient backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 group"
        aria-label="Next banner"
      >
        <ChevronRight className="w-6 h-6 transform transition-transform duration-300 group-hover:translate-x-1" />
      </button>
      
      {/* Elegant Banner Indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-3">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => !isAnimating && setCurrentBanner(index)}
            className={`transition-all duration-500 rounded-full ${
              index === currentBanner 
                ? 'w-12 h-3 bg-elegant-gradient shadow-elegant' 
                : 'w-3 h-3 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-gentle">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

export default Banner
