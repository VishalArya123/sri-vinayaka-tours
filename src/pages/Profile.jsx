import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileSection from '../components/ProfileSection';

const Profile = () => {
  const navigate = useNavigate();
  
  // Check if user is logged in
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);
  
  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-5">My Profile</h1>
        <ProfileSection />
      </div>
    </div>
  );
};

export default Profile;