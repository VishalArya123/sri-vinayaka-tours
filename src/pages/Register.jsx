import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Mail, Lock, User, Phone, MapPin, Eye, EyeOff, Loader2, Camera, 
  CheckCircle, AlertCircle, UserPlus, Sparkles, Shield, Award, Star
} from "lucide-react";
import { storage } from "../utils/storage";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    gender: "",
    profileImage: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [notification, setNotification] = useState({ show: false, type: '', message: '' });

  // Redirect if already logged in
  useEffect(() => {
    if (storage.isAuthenticated()) {
      navigate("/profile", { replace: true });
    }
  }, [navigate]);

  // Show notification
  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => setNotification({ show: false, type: '', message: '' }), 5000);
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    else if (formData.name.trim().length < 2) newErrors.name = "Name must be at least 2 characters";
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain at least one uppercase letter, one lowercase letter, and one number";
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    if (!formData.phone) {
      newErrors.phone = "Phone Number is required";
    } else if (!/^\+?[\d\s-()]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.gender) newErrors.gender = "Gender is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        showNotification('error', 'Image size should be less than 5MB');
        return;
      }
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        showNotification('error', 'Please select a valid image file');
        return;
      }

      setImageUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          profileImage: reader.result,
        });
        setImageUploading(false);
        showNotification('success', 'Profile image uploaded successfully');
      };
      reader.onerror = () => {
        setImageUploading(false);
        showNotification('error', 'Failed to upload image');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        const result = storage.register({
          id: Date.now().toString(),
          name: formData.name.trim(),
          email: formData.email.toLowerCase(),
          password: formData.password,
          phone: formData.phone,
          address: formData.address.trim(),
          gender: formData.gender,
          profileImage: formData.profileImage || "",
          preferences: {
            theme: "light",
            notifications: true,
          },
          createdAt: new Date().toISOString(),
        });
        
        setLoading(false);
        
        if (result.success) {
          showNotification('success', 'Registration successful! Redirecting...');
          setTimeout(() => {
            navigate("/profile", { replace: true });
          }, 1500);
        } else {
          setErrors((prev) => ({ ...prev, email: result.message }));
          showNotification('error', result.message);
        }
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background-light py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden mt-10 sm:mt-10">
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

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="mx-auto h-20 w-20 bg-elegant-gradient rounded-3xl flex items-center justify-center mb-6 shadow-elegant transform hover:scale-110 transition-transform duration-300">
            <UserPlus className="h-10 w-10 text-white" />
          </div>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-secondary-800 mb-3">Create Account</h2>
          <p className="font-poppins text-secondary-600 text-base sm:text-lg">
            Join us and start exploring amazing destinations
          </p>
        </div>

        {/* Registration Form */}
        <div className="bg-white py-8 px-6 sm:px-8 shadow-float rounded-3xl border border-primary-200 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <div className="space-y-6">
            {/* Profile Image Upload */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-28 h-28 rounded-3xl overflow-hidden border-4 border-primary-200 shadow-elegant">
                <img
                  src={formData.profileImage || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"}
                  alt="Profile preview"
                  className="w-full h-full object-cover"
                />
                <label
                  htmlFor="profileImageUpload"
                  className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-opacity-70 rounded-3xl"
                >
                  {imageUploading ? (
                    <Loader2 className="text-white animate-spin" size={24} />
                  ) : (
                    <Camera className="text-white" size={24} />
                  )}
                  <input
                    id="profileImageUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={imageUploading}
                  />
                </label>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-elegant-gradient rounded-2xl flex items-center justify-center">
                  <Star className="w-4 h-4 text-white fill-current" />
                </div>
              </div>
              <p className="font-poppins text-sm text-secondary-500">Upload Profile Picture (Optional)</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label htmlFor="name" className="block font-poppins text-sm font-medium text-secondary-700 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-primary-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className={`block w-full pl-12 pr-4 py-4 border-2 rounded-2xl focus:outline-none focus:ring-2 transition-all duration-300 font-poppins ${
                      errors.name 
                        ? "border-red-300 focus:ring-red-200 focus:border-red-400 bg-red-50" 
                        : "border-primary-200 focus:ring-primary-200 focus:border-primary-400 hover:border-primary-300"
                    }`}
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                {errors.name && (
                  <p className="mt-2 text-sm text-coral flex items-center font-poppins">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label htmlFor="email-address" className="block font-poppins text-sm font-medium text-secondary-700 mb-2">
                  Email Address *
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
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-coral flex items-center font-poppins">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block font-poppins text-sm font-medium text-secondary-700 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-primary-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    className={`block w-full pl-12 pr-12 py-4 border-2 rounded-2xl focus:outline-none focus:ring-2 transition-all duration-300 font-poppins ${
                      errors.password 
                        ? "border-red-300 focus:ring-red-200 focus:border-red-400 bg-red-50" 
                        : "border-primary-200 focus:ring-primary-200 focus:border-primary-400 hover:border-primary-300"
                    }`}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleInputChange}
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
                  <p className="mt-2 text-sm text-coral flex items-start font-poppins">
                    <AlertCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirm-password" className="block font-poppins text-sm font-medium text-secondary-700 mb-2">
                  Confirm Password *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-primary-400" />
                  </div>
                  <input
                    id="confirm-password"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    className={`block w-full pl-12 pr-12 py-4 border-2 rounded-2xl focus:outline-none focus:ring-2 transition-all duration-300 font-poppins ${
                      errors.confirmPassword 
                        ? "border-red-300 focus:ring-red-200 focus:border-red-400 bg-red-50" 
                        : "border-primary-200 focus:ring-primary-200 focus:border-primary-400 hover:border-primary-300"
                    }`}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-primary-400 hover:text-primary-600 transition-colors duration-300 transform hover:scale-110"
                    aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-coral flex items-center font-poppins">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="phone" className="block font-poppins text-sm font-medium text-secondary-700 mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-primary-400" />
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    className={`block w-full pl-12 pr-4 py-4 border-2 rounded-2xl focus:outline-none focus:ring-2 transition-all duration-300 font-poppins ${
                      errors.phone 
                        ? "border-red-300 focus:ring-red-200 focus:border-red-400 bg-red-50" 
                        : "border-primary-200 focus:ring-primary-200 focus:border-primary-400 hover:border-primary-300"
                    }`}
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-2 text-sm text-coral flex items-center font-poppins">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label htmlFor="gender" className="block font-poppins text-sm font-medium text-secondary-700 mb-2">
                  Gender *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-primary-400" />
                  </div>
                  <select
                    id="gender"
                    name="gender"
                    required
                    className={`block w-full pl-12 pr-4 py-4 border-2 rounded-2xl focus:outline-none focus:ring-2 transition-all duration-300 font-poppins bg-white ${
                      errors.gender 
                        ? "border-red-300 focus:ring-red-200 focus:border-red-400" 
                        : "border-primary-200 focus:ring-primary-200 focus:border-primary-400 hover:border-primary-300"
                    }`}
                    value={formData.gender}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
                {errors.gender && (
                  <p className="mt-2 text-sm text-coral flex items-center font-poppins">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    {errors.gender}
                  </p>
                )}
              </div>
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block font-poppins text-sm font-medium text-secondary-700 mb-2">
                Address *
              </label>
              <div className="relative">
                <div className="absolute top-4 left-4 pointer-events-none">
                  <MapPin className="h-5 w-5 text-primary-400" />
                </div>
                <textarea
                  id="address"
                  name="address"
                  autoComplete="street-address"
                  required
                  rows="3"
                  className={`block w-full pl-12 pr-4 py-4 border-2 rounded-2xl focus:outline-none focus:ring-2 transition-all duration-300 font-poppins resize-none ${
                    errors.address 
                      ? "border-red-300 focus:ring-red-200 focus:border-red-400 bg-red-50" 
                      : "border-primary-200 focus:ring-primary-200 focus:border-primary-400 hover:border-primary-300"
                  }`}
                  placeholder="Enter your complete address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
              {errors.address && (
                <p className="mt-2 text-sm text-coral flex items-center font-poppins">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  {errors.address}
                </p>
              )}
            </div>

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
                    Creating Account...
                  </>
                ) : (
                  <>
                    <UserPlus className="h-5 w-5 mr-3" />
                    Create Account
                  </>
                )}
              </button>
            </div>

            {/* Terms and Privacy */}
            <div className="text-center">
              <p className="font-poppins text-xs text-secondary-500">
                By creating an account, you agree to our{" "}
                <a href="/terms-conditions" className="text-primary-600 hover:text-primary-500 underline font-medium">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy-policy" className="text-primary-600 hover:text-primary-500 underline font-medium">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>

          {/* Footer Links */}
          <div className="mt-8 text-center space-y-4">
            <p className="font-poppins text-sm text-secondary-600">
              Already have an account?{" "}
              <Link 
                to="/login" 
                className="font-semibold text-primary-600 hover:text-primary-500 transition-colors duration-300"
              >
                Sign in here
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
            <div className="w-12 h-12 bg-green-100 rounded-3xl flex items-center justify-center mx-auto mb-3">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <p className="font-poppins text-xs text-secondary-600">Secure Registration</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-3xl flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-blue-600" />
            </div>
            <p className="font-poppins text-xs text-secondary-600">Instant Verification</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-3xl flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6 text-yellow-600" />
            </div>
            <p className="font-poppins text-xs text-secondary-600">Premium Benefits</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
