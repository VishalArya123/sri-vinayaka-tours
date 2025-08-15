import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowUp } from "lucide-react"; // Changed from react-icons to lucide-react for consistency

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Show button when scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top when button is clicked
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Enhanced scroll to top button with elegant styling */}
      {isVisible && (
        <button
          onClick={handleClick}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl bg-elegant-gradient text-white shadow-float hover:shadow-elegant transition-all duration-300 transform hover:scale-110 animate-fade-in group border border-white/20 backdrop-blur-sm"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 mx-auto transform transition-transform duration-300 group-hover:-translate-y-0.5" />
          
          {/* Subtle pulse animation ring */}
          <div className="absolute inset-0 rounded-2xl bg-elegant-gradient opacity-30 animate-ping"></div>
          
          {/* Hover tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-secondary-800 text-white text-sm font-poppins rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Back to top
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-secondary-800"></div>
          </div>
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
