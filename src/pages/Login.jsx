import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, LogIn, ArrowRight, Mail } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear errors when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validate = () => {
    let tempErrors = {};
    
    if (!formData.email) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      tempErrors.password = 'Password is required';
    }
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        // In a real app, you would store auth token, user info, etc.
        navigate('/profile');
      }, 1500);
    }
  };

  return (
    <>
      <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-blue-600 p-6 text-white text-center">
              <h1 className="text-2xl font-bold">Login to Your Account</h1>
              <p className="mt-2">Welcome back to Sri Vinayaka Tours</p>
            </div>
            
            <div className="p-6">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none`}
                      placeholder="your@email.com"
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                
                <div className="mb-6">
                  <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none`}
                      placeholder="••••••••"
                    />
                  </div>
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>
                
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="remember" 
                      className="mr-2"
                    />
                    <label htmlFor="remember" className="text-gray-600 text-sm">Remember me</label>
                  </div>
                  <a href="#" className="text-blue-600 text-sm hover:underline">Forgot password?</a>
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? (
                    <span>Logging in...</span>
                  ) : (
                    <>
                      <LogIn size={16} className="mr-2" />
                      <span>Login</span>
                    </>
                  )}
                </button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-blue-600 hover:underline">
                    Register <ArrowRight size={14} className="inline ml-1" />
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default Login;