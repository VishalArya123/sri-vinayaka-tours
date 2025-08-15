import React from "react";
import { FileText, Sparkles, Shield, AlertCircle, Users, Phone, MapPin, Clock, CheckCircle } from "lucide-react";

const TermsAndConditions = () => {
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
              <FileText className="w-4 h-4 mr-2" />
              Service Agreement
            </div>
            <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-white flex items-center justify-center gap-3 mb-4 animate-fade-in-up">
              <FileText className="text-accent-yellow" />
              Terms and Conditions
            </h1>
            <p className="font-poppins text-lg text-white/90 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              Important terms governing the use of our travel services
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="bg-white rounded-3xl shadow-float border border-primary-100 p-8 sm:p-12 animate-fade-in-up">
          
          {/* Service Overview */}
          <section className="mb-10">
            <div className="bg-gradient-to-br from-primary-50 to-accent-peach/20 rounded-2xl p-6 border border-primary-200">
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-elegant-gradient rounded-2xl flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-playfair text-xl font-bold text-secondary-800 mb-3">Our Services</h3>
                  <p className="font-poppins text-secondary-700 leading-relaxed">
                    Sri Vinayaka Travels offers travellers to book Ramoji Film City Entry Tickets, Telangana Tourism Packages Booking, Other Local City Sightseeing Tour Packages online right from the comfort of their home or office by providing them with choice of bus operators, departure times and prices. Sri Vinayaka Travels does not own or operate any bus services on its own. Sri Vinayaka Travels does not advise any specific bus operator to its customers. The choice of the bus operator is purely the discretion of the customer.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Timing and Schedules */}
          <section className="mb-10">
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
              <div className="flex items-start mb-4">
                <div className="w-10 h-10 bg-blue-500 rounded-2xl flex items-center justify-center mr-3">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-playfair text-xl font-bold text-secondary-800">Schedule Information</h3>
              </div>
              <p className="font-poppins text-secondary-700 leading-relaxed">
                The arrival and departure times mentioned on the ticket are only tentative timings. Buses may be delayed due to some unavoidable reasons like traffic jams etc. However, the bus will not leave the source before the time that is mentioned on the ticket. Passengers are advised to call the bus operator contact number mentioned in the ticket and reconfirm the boarding point location and departure time on the day of journey. If the passenger did not get any contact number of the bus operator, he/she need to call the Sri Vinayaka Travels Customer Support after booking the ticket and should be at least 3-4 hours prior to their reporting time.
              </p>
            </div>
          </section>

          {/* Required Documents */}
          <section className="mb-10">
            <div className="bg-yellow-50 rounded-2xl p-6 border border-yellow-200">
              <div className="flex items-start mb-4">
                <AlertCircle className="w-8 h-8 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                <h3 className="font-playfair text-xl font-bold text-secondary-800">Required Documents for Boarding</h3>
              </div>
              <p className="font-poppins text-secondary-700 leading-relaxed mb-4">
                Passengers are required to furnish the following details at the time of boarding the bus. Failing to do so, they may not be allowed to board the bus.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="font-poppins text-secondary-700">SMS of the ticket or Email. (This is widely accepted by most bus operators)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="font-poppins text-secondary-700">Some operators do not accept the electronic ticket formats. We provide the details of such operators while booking tickets on Sri Vinayaka Travels. In such case we request you to kindly carry a printout of the ticket.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="font-poppins text-secondary-700">Proof of Identity (Driving License or Aadhar Card or Passport or PAN Card or Voter Card)</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Additional Terms - Organized in Cards */}
          <section className="mb-10 space-y-6">
            {/* Bus Classification */}
            <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
              <h4 className="font-playfair text-lg font-bold text-secondary-800 mb-3">Bus Operator Classification</h4>
              <p className="font-poppins text-secondary-700 leading-relaxed">
                Sri Vinayaka Travels Ultimate and Assured classification of Bus Operators is done from time-to-time based on Customer's Feedback and Surveys conducted by Sri Vinayaka Travels. Sri Vinayaka Travels is showing the classification for customers to make an informed decision while choosing a Bus Operator for their journey. The choice of the bus operator is purely at the discretion of the customer. The classification of Bus Operator might change depending on the service performance of bus operator.
              </p>
            </div>

            {/* Boarding Instructions */}
            <div className="bg-purple-50 rounded-2xl p-6 border border-purple-200">
              <h4 className="font-playfair text-lg font-bold text-secondary-800 mb-3">Boarding Instructions</h4>
              <p className="font-poppins text-secondary-700 leading-relaxed">
                The passengers should reach at the mentioned boarding points 15 minutes prior to the scheduled departure time.
              </p>
            </div>

            {/* Complaints */}
            <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
              <h4 className="font-playfair text-lg font-bold text-secondary-800 mb-3">Complaint Policy</h4>
              <p className="font-poppins text-secondary-700 leading-relaxed">
                Any complaints/grievances should be reported in a week's time from date of journey performed.
              </p>
            </div>

            {/* Booking Confirmation */}
            <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-200">
              <h4 className="font-playfair text-lg font-bold text-secondary-800 mb-3">Booking Confirmation</h4>
              <p className="font-poppins text-secondary-700 leading-relaxed">
                A booking is considered confirmed if the booking confirmation page is shown to the customer, even if SMS/Email fails to deliver for any reason.
              </p>
            </div>

            {/* SMS/Email Delivery */}
            <div className="bg-teal-50 rounded-2xl p-6 border border-teal-200">
              <h4 className="font-playfair text-lg font-bold text-secondary-800 mb-3">Communication</h4>
              <p className="font-poppins text-secondary-700 leading-relaxed">
                If ticket confirmation/cancellation, SMS/Email, is not sent for any reason, if reported it can be resent by our support team. SMS/Email might fail to deliver or get delayed for several reasons which are not in Sri Vinayaka Travels's control.
              </p>
            </div>
          </section>

          {/* Important Policies Section */}
          <section className="mb-10 space-y-6">
            <h3 className="font-playfair text-2xl font-bold text-secondary-800 text-center mb-8">Important Policies</h3>
            
            {/* Multiple policy items in organized cards */}
            <div className="space-y-4">
              <div className="bg-white border-2 border-primary-200 rounded-2xl p-4 hover:shadow-warm transition-all duration-300">
                <p className="font-poppins text-secondary-700 leading-relaxed">
                  Payment gateway/service charges – Sri Vinayaka Travels will not charge any additional payment gateway charge or service unless otherwise specified in the booking details page.
                </p>
              </div>

              <div className="bg-white border-2 border-primary-200 rounded-2xl p-4 hover:shadow-warm transition-all duration-300">
                <p className="font-poppins text-secondary-700 leading-relaxed">
                  Sri Vinayaka Travels provides a platform to Insurance company to list and advertise their services on the website and App and allows customers You ("Customer/You") to select Insurance Policy, based on your preferences. The listing of an Insurance Policy on the website does not constitute and should not be regarded as a recommendation. Once a reservation is made, and Insurance policy is selected You are agreeing to the terms and conditions of the Insurance Company.
                </p>
              </div>

              <div className="bg-white border-2 border-primary-200 rounded-2xl p-4 hover:shadow-warm transition-all duration-300">
                <p className="font-poppins text-secondary-700 leading-relaxed">
                  By making a booking on Sri Vinayaka Travels – customer acknowledges that Sri Vinayaka Travels will Call/Email/SMS or send alerts to give/take information regarding his/her bookings.
                </p>
              </div>

              <div className="bg-white border-2 border-primary-200 rounded-2xl p-4 hover:shadow-warm transition-all duration-300">
                <p className="font-poppins text-secondary-700 leading-relaxed">
                  In case of any claims arising out of unforeseen consequences/exigencies, Sri Vinayaka Travels liability would be limited to the extent of the value of the booking amount.
                </p>
              </div>

              <div className="bg-white border-2 border-primary-200 rounded-2xl p-4 hover:shadow-warm transition-all duration-300">
                <p className="font-poppins text-secondary-700 leading-relaxed">
                  The terms and conditions of our services can be amended, modified or withdrawn by Sri Vinayaka Travels at any time without notice.
                </p>
              </div>

              <div className="bg-white border-2 border-primary-200 rounded-2xl p-4 hover:shadow-warm transition-all duration-300">
                <p className="font-poppins text-secondary-700 leading-relaxed">
                  All legal disputes are subject to exclusive jurisdiction of the competent courts in Hyderabad (Telangana) only.
                </p>
              </div>

              <div className="bg-white border-2 border-primary-200 rounded-2xl p-4 hover:shadow-warm transition-all duration-300">
                <p className="font-poppins text-secondary-700 leading-relaxed">
                  Sri Vinayaka Travels is not responsible if any Wrong Origin-Destination combination booked by the passenger. In that cases, Sri Vinayaka Travels can not cancel the ticket. It is based on the cancellation policy.
                </p>
              </div>

              <div className="bg-white border-2 border-primary-200 rounded-2xl p-4 hover:shadow-warm transition-all duration-300">
                <p className="font-poppins text-secondary-700 leading-relaxed">
                  Sri Vinayaka Travels is not responsible if any Origin City Name or Destination City Name exists in two different states and the passenger booked another state city instead of their desired city. Passenger has to verify the details and should have basic knowledge on their route which they want to travel.
                </p>
              </div>

              <div className="bg-white border-2 border-primary-200 rounded-2xl p-4 hover:shadow-warm transition-all duration-300">
                <p className="font-poppins text-secondary-700 leading-relaxed">
                  By submitting our webform, you agree to receive promotional calls on the number shared, and such calls and SMS would be coming from a third-party platform.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Support CTA */}
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-3xl mb-4">
              <Phone className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="font-playfair text-2xl font-bold text-white mb-3">Questions About Terms?</h3>
            <p className="font-poppins text-white/90 mb-6">
              Contact our support team for clarification on any terms and conditions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+919876543210"
                className="inline-flex items-center px-6 py-3 bg-white text-primary-600 font-semibold rounded-2xl hover:shadow-elegant transition-all duration-300 transform hover:scale-105 font-poppins"
              >
                Call Support
              </a>
              <a 
                href="mailto:legal@vinayakatravels.com"
                className="inline-flex items-center px-6 py-3 bg-glass-gradient backdrop-blur-sm border border-white/30 text-white font-semibold rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105 font-poppins"
              >
                Email Legal Team
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
