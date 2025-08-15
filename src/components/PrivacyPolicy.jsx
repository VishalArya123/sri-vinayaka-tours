import React from "react";
import { ShieldCheck, User, Book, Lock, RefreshCcw, FileText, Sparkles, Shield, Award } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background-light pt-16 sm:pt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-secondary-900 via-secondary-800 to-primary-800 text-white py-12 sm:py-16 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-8 right-8 animate-float">
            <Sparkles className="w-12 h-12 text-accent-yellow" />
          </div>
          <div className="absolute bottom-8 left-8 animate-bounce-gentle" style={{animationDelay: '1s'}}>
            <Shield className="w-8 h-8 text-accent-peach" />
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-glass-gradient backdrop-blur-sm border border-white/20 rounded-full text-white/90 font-medium mb-6 animate-fade-in">
              <ShieldCheck className="w-4 h-4 mr-2" />
              Data Protection
            </div>
            <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-white flex items-center justify-center gap-3 mb-4 animate-fade-in-up">
              <ShieldCheck className="text-accent-yellow" />
              Privacy Policy
            </h1>
            <p className="font-poppins text-lg text-white/90 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              How we protect and handle your personal information
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="bg-white rounded-3xl shadow-float border border-primary-100 p-8 sm:p-12 animate-fade-in-up">
          
          {/* Introduction */}
          <section className="mb-12">
            <div className="bg-gradient-to-br from-primary-50 to-accent-peach/20 rounded-2xl p-6 border border-primary-200">
              <h2 className="font-playfair text-2xl font-bold text-secondary-800 mb-4">1. Introduction</h2>
              <p className="font-poppins text-secondary-700 leading-relaxed">
                Welcome to Sri Vinayaka Travels. We are committed to protecting your personal information and your right to privacy.
                This privacy policy explains how we collect, use, and share information about you when you use our services.
              </p>
            </div>
          </section>
          
          {/* Information We Collect */}
          <section className="mb-12">
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
              <h2 className="font-playfair text-2xl font-bold text-secondary-800 mb-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-2xl flex items-center justify-center">
                  <User className="text-white w-5 h-5" />
                </div>
                2. Information We Collect
              </h2>
              <ul className="space-y-4 font-poppins text-secondary-700">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Personal Identification Information:</strong> Name, email address, phone number, etc.
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Booking Information:</strong> Details related to your travel bookings.
                  </div>
                </li>
              </ul>
            </div>
          </section>
          
          {/* How We Use Your Information */}
          <section className="mb-12">
            <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
              <h2 className="font-playfair text-2xl font-bold text-secondary-800 mb-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-2xl flex items-center justify-center">
                  <Book className="text-white w-5 h-5" />
                </div>
                3. How We Use Your Information
              </h2>
              <ul className="space-y-4 font-poppins text-secondary-700">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>To process your bookings and provide travel services.</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>To communicate with you about your bookings and our services.</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>To improve our website and services.</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>To comply with legal obligations and protect our legal rights.</span>
                </li>
              </ul>
            </div>
          </section>
          
          {/* How We Share Your Information */}
          <section className="mb-12">
            <div className="bg-purple-50 rounded-2xl p-6 border border-purple-200">
              <h2 className="font-playfair text-2xl font-bold text-secondary-800 mb-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500 rounded-2xl flex items-center justify-center">
                  <Lock className="text-white w-5 h-5" />
                </div>
                4. How We Share Your Information
              </h2>
              <ul className="space-y-4 font-poppins text-secondary-700">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>With service providers who assist us in operating our business and providing our services.</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>To comply with legal obligations, such as responding to subpoenas or other legal processes.</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>To protect the rights and safety of our company, our customers, or others.</span>
                </li>
              </ul>
            </div>
          </section>
          
          {/* Security of Your Information */}
          <section className="mb-12">
            <div className="bg-orange-50 rounded-2xl p-6 border border-orange-200">
              <h2 className="font-playfair text-2xl font-bold text-secondary-800 mb-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500 rounded-2xl flex items-center justify-center">
                  <ShieldCheck className="text-white w-5 h-5" />
                </div>
                5. Security of Your Information
              </h2>
              <p className="font-poppins text-secondary-700 leading-relaxed">
                We take appropriate security measures to protect your personal information from unauthorized access, use, or disclosure.
              </p>
            </div>
          </section>
          
          {/* Your Rights */}
          <section className="mb-12">
            <div className="bg-teal-50 rounded-2xl p-6 border border-teal-200">
              <h2 className="font-playfair text-2xl font-bold text-secondary-800 mb-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-500 rounded-2xl flex items-center justify-center">
                  <User className="text-white w-5 h-5" />
                </div>
                6. Your Rights
              </h2>
              <p className="font-poppins text-secondary-700 leading-relaxed">
                You have certain rights regarding your personal information, including the right to access, correct, or delete your data.
                To exercise these rights, please contact us using the contact details provided below.
              </p>
            </div>
          </section>
          
          {/* Changes to This Privacy Policy */}
          <section className="mb-12">
            <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-200">
              <h2 className="font-playfair text-2xl font-bold text-secondary-800 mb-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-500 rounded-2xl flex items-center justify-center">
                  <RefreshCcw className="text-white w-5 h-5" />
                </div>
                7. Changes to This Privacy Policy
              </h2>
              <p className="font-poppins text-secondary-700 leading-relaxed">
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on our website.
                Your continued use of our services after the changes take effect will constitute your acceptance of the revised policy.
              </p>
            </div>
          </section>

          {/* Contact Us CTA */}
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-3xl mb-4">
              <ShieldCheck className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="font-playfair text-2xl font-bold text-white mb-3">Questions About Privacy?</h3>
            <p className="font-poppins text-white/90 mb-6">
              Contact us if you have any questions about this privacy policy
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:privacy@vinayakatravels.com"
                className="inline-flex items-center px-6 py-3 bg-white text-primary-600 font-semibold rounded-2xl hover:shadow-elegant transition-all duration-300 transform hover:scale-105 font-poppins"
              >
                Contact Privacy Team
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
