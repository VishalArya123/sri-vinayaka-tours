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
    <div className="p-4 sm:p-10 bg-gray-50 min-h-screen mt-20 sm:mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ProfileSection />
      </div>
    </div>
  )
}

export default Profile
