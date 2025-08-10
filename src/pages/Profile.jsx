import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import ProfileSection from "../components/ProfileSection"
import { storage } from "../utils/storage" // Import storage utility

const Profile = () => {
  const navigate = useNavigate()

  // Check if user is logged in
  useEffect(() => {
    if (!storage.isUserLoggedIn()) {
      navigate("/login")
    }
  }, [navigate])

  return (
    <div className="p-4 sm:p-10 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 text-center">My Profile</h1>
        <ProfileSection />
      </div>
    </div>
  )
}

export default Profile
