import React from "react";
import { ShieldCheck, User, Book, Lock, RefreshCcw, FileText } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <ShieldCheck className="text-blue-600" /> Privacy Policy
      </h1>
      
      <section className="mt-4">
        <h2 className="text-lg font-semibold text-gray-700">1. Introduction</h2>
        <p className="text-gray-600 mt-1">
          Welcome to Sri Vinayaka Travels. We are committed to protecting your personal information and your right to privacy.
          This privacy policy explains how we collect, use, and share information about you when you use our services.
        </p>
      </section>
      
      <section className="mt-4">
        <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
          <User className="text-blue-600" /> 2. Information We Collect
        </h2>
        <ul className="list-disc list-inside text-gray-600 mt-2">
          <li><strong>Personal Identification Information:</strong> Name, email address, phone number, etc.</li>
          <li><strong>Booking Information:</strong> Details related to your travel bookings.</li>
        </ul>
      </section>
      
      <section className="mt-4">
        <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
          <Book className="text-blue-600" /> 3. How We Use Your Information
        </h2>
        <ul className="list-disc list-inside text-gray-600 mt-2">
          <li>To process your bookings and provide travel services.</li>
          <li>To communicate with you about your bookings and our services.</li>
          <li>To improve our website and services.</li>
          <li>To comply with legal obligations and protect our legal rights.</li>
        </ul>
      </section>
      
      <section className="mt-4">
        <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
          <Lock className="text-blue-600" /> 4. How We Share Your Information
        </h2>
        <ul className="list-disc list-inside text-gray-600 mt-2">
          <li>With service providers who assist us in operating our business and providing our services.</li>
          <li>To comply with legal obligations, such as responding to subpoenas or other legal processes.</li>
          <li>To protect the rights and safety of our company, our customers, or others.</li>
        </ul>
      </section>
      
      <section className="mt-4">
        <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
          <ShieldCheck className="text-blue-600" /> 5. Security of Your Information
        </h2>
        <p className="text-gray-600 mt-1">
          We take appropriate security measures to protect your personal information from unauthorized access, use, or disclosure.
        </p>
      </section>
      
      <section className="mt-4">
        <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
          <User className="text-blue-600" /> 6. Your Rights
        </h2>
        <p className="text-gray-600 mt-1">
          You have certain rights regarding your personal information, including the right to access, correct, or delete your data.
          To exercise these rights, please contact us using the contact details provided below.
        </p>
      </section>
      
      <section className="mt-4">
        <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
          <RefreshCcw className="text-blue-600" /> 7. Changes to This Privacy Policy
        </h2>
        <p className="text-gray-600 mt-1">
          We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on our website.
          Your continued use of our services after the changes take effect will constitute your acceptance of the revised policy.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
