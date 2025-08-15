import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Loader2, CheckCircle, AlertCircle, Sparkles, Shield, Award } from "lucide-react";
import { storage } from "../utils/storage";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, type: '', message: '' });

  // Redirect if already logged in
  useEffect(() => {
    if (storage.isAuthenticated()) {
      const from = location.state?.from?.pathname || "/profile";
      navigate(from, { replace: true });
    }
  }, [navigate, location]);

  // Show notification
  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => setNotification({ show: false, type: '', message: '' }), 5000);
  };

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      
      // Simulate API call with realistic delay
      setTimeout(() => {
        const success = storage.login(email, password);
        setLoading(false);
        
        if (success) {
          showNotification('success', 'Login successful! Redirecting...');
          setTimeout(() => {
            const from = location.state?.from?.pathname || "/profile";
            navigate(from, { replace: true });
          }, 1500);
        } else {
          setErrors((prev) => ({ ...prev, general: "Invalid email or password." }));
          showNotification('error', 'Invalid email or password. Please try again.');
        }
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden mt-10 sm:mt-10">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 animate-float">
          <Sparkles className="w-20 h-20 text-accent-yellow" />
        </div>
        <div className="absolute top-40 left-10 animate-bounce-gentle" style={{animationDelay: '1s'}}>
          <Award className="w-16 h-16 text-accent-peach" />
        </div>
        <div className="absolute bottom-32 right-16 animate-float" style={{animationDelay: '2s'}}>
          <Shield className="w-18 h-18 text-primary-400" />
        </div>
      </div>

      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 flex items-center p-4 rounded-2xl shadow-float transition-all duration-500 transform ${
          notification.show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        } ${
          notification.type === 'success' 
            ? 'bg-green-500 text-white border border-green-600' 
            : 'bg-coral text-white border border-red-600'
        }`}>
          {notification.type === 'success' ? (
            <CheckCircle className="w-5 h-5 mr-3" />
          ) : (
            <AlertCircle className="w-5 h-5 mr-3" />
          )}
          <span className="font-poppins font-medium">{notification.message}</span>
        </div>
      )}

      <div className="max-w-md w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="mx-auto h-20 w-20 bg-elegant-gradient rounded-3xl flex items-center justify-center mb-6 shadow-elegant transform hover:scale-110 transition-transform duration-300">
            <Lock className="h-10 w-10 text-white" />
          </div>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-secondary-800 mb-3">
            Welcome Back
          </h2>
          <p className="font-poppins text-secondary-600 text-base sm:text-lg">
            Sign in to your account to continue your journey
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white py-8 px-6 sm:px-8 shadow-float rounded-3xl border border-primary-200 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <div className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email-address" className="block font-poppins text-sm font-medium text-secondary-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-primary-400" />
                </div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`block w-full pl-12 pr-4 py-4 border-2 rounded-2xl focus:outline-none focus:ring-2 transition-all duration-300 font-poppins ${
                    errors.email 
                      ? "border-red-300 focus:ring-red-200 focus:border-red-400 bg-red-50" 
                      : "border-primary-200 focus:ring-primary-200 focus:border-primary-400 hover:border-primary-300"
                  }`}
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-coral flex items-center font-poppins">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block font-poppins text-sm font-medium text-secondary-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-primary-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className={`block w-full pl-12 pr-12 py-4 border-2 rounded-2xl focus:outline-none focus:ring-2 transition-all duration-300 font-poppins ${
                    errors.password 
                      ? "border-red-300 focus:ring-red-200 focus:border-red-400 bg-red-50" 
                      : "border-primary-200 focus:ring-primary-200 focus:border-primary-400 hover:border-primary-300"
                  }`}
                  placeholder="Enter your password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-primary-400 hover:text-primary-600 transition-colors duration-300 transform hover:scale-110"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-coral flex items-center font-poppins">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* General Error */}
            {errors.general && (
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 animate-shake">
                <p className="text-sm text-coral flex items-center font-poppins">
                  <AlertCircle className="w-5 h-5 mr-3" />
                  {errors.general}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                onClick={handleSubmit}
                className="group relative w-full flex justify-center py-4 px-6 border border-transparent font-semibold rounded-2xl text-white bg-elegant-gradient hover:shadow-elegant focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-warm transform hover:scale-105 font-poppins text-lg"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin h-6 w-6 mr-3" />
                    Signing In...
                  </>
                ) : (
                  <>
                    <Lock className="h-5 w-5 mr-3" />
                    Sign In
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Footer Links */}
          <div className="mt-8 text-center space-y-4">
            <p className="font-poppins text-sm text-secondary-600">
              Don't have an account?{" "}
              <Link 
                to="/register" 
                className="font-semibold text-primary-600 hover:text-primary-500 transition-colors duration-300"
              >
                Create one now
              </Link>
            </p>
            <Link 
              to="/" 
              className="inline-flex items-center font-poppins text-sm text-secondary-500 hover:text-secondary-700 transition-colors duration-300 hover:translate-x-1 transform"
            >
              ← Back to Home
            </Link>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 grid grid-cols-3 gap-4 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <div className="text-center">
            <div className="w-10 h-10 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-2">
              <Shield className="w-5 h-5 text-green-600" />
            </div>
            <p className="font-poppins text-xs text-secondary-600">Secure Login</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="w-5 h-5 text-blue-600" />
            </div>
            <p className="font-poppins text-xs text-secondary-600">Verified Account</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-2">
              <Award className="w-5 h-5 text-yellow-600" />
            </div>
            <p className="font-poppins text-xs text-secondary-600">Trusted Service</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
