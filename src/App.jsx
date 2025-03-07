import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import TourPackages from './pages/TourPackages'
import TourDetails from './pages/TourDetails'
import Contact from './pages/Contact'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import Form from './components/Form'
// import PrivacyPolicy from './components/PrivacyPolicy'
// import TermsAndConditions from './components/TermsAndConditions'
// import CancellationPolicy from './components/CancellationPolicy'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/tour-packages" element={<TourPackages />} />
          <Route path="/tour/:id" element={<TourDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/form" element={<Form />} />
          {/* <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/cancellation" element={<CancellationPolicy />} /> */}
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App