import React from "react";
import { FileText, Sparkles, Shield, AlertCircle, Clock, RefreshCcw } from "lucide-react";

const CancellationPolicy = () => {
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
              Legal Information
            </div>
            <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-white flex items-center justify-center gap-3 mb-4 animate-fade-in-up">
              <FileText className="text-accent-yellow" />
              Cancellation Policy
            </h1>
            <p className="font-poppins text-lg text-white/90 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              Important information regarding ticket cancellations and refunds
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="bg-white rounded-3xl shadow-float border border-primary-100 p-8 sm:p-12 animate-fade-in-up">
          
          {/* Main Content */}
          <section className="space-y-8">
            {/* Refund Timeline */}
            <div className="bg-gradient-to-br from-primary-50 to-accent-peach/20 rounded-2xl p-6 border border-primary-200">
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-elegant-gradient rounded-2xl flex items-center justify-center mr-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-playfair text-lg font-bold text-secondary-800 mb-2">Refund Processing</h3>
                  <p className="font-poppins text-secondary-700">Any cancelled tickets amount will be credited in your account within 5 to 7 bank working days.</p>
                </div>
              </div>
            </div>

            {/* Policy Note */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <p className="font-poppins text-secondary-700">Cancellation Ticket Terms Depend On Operator Cancellation Policy.</p>
            </div>

            {/* Important Note Section */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
              <div className="flex items-start mb-3">
                <AlertCircle className="w-6 h-6 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                <h3 className="font-playfair font-bold text-secondary-800 text-lg">Important Note:</h3>
              </div>
              <p className="font-poppins text-secondary-700 leading-relaxed">
                Some bus operators do not allow cancellations and hence no refund is possible in such cases. Some bus operators charge higher cancellation penalties while some allow cancellation up to 4 hours before departure. Please contact any of our support care for cancellation details on any specific service.
              </p>
            </div>

            {/* Non-Transferable Section */}
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <div className="flex items-start mb-3">
                <Shield className="w-6 h-6 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                <h3 className="font-playfair font-bold text-secondary-800 text-lg">Non-Transferable:</h3>
              </div>
              <p className="font-poppins text-secondary-700 leading-relaxed">
                Once a bus ticket is issued, it is non-transferable. If a ticket is presented by someone other than the person entitled to be carried there-under or to refund in connection therewith, Sri Vinayaka Travels or any of its travel partners shall not be liable to the person so entitled, if in good faith it provides carriage or makes a refund to the person presenting the ticket.
              </p>
            </div>

            {/* Additional Terms */}
            <div className="space-y-6">
              <div className="bg-secondary-50 rounded-2xl p-6 border border-secondary-200">
                <p className="font-poppins text-secondary-700 leading-relaxed">
                  In case the bus operator changes the type of bus due to some reason, Sri Vinayaka Travels will not be responsible.
                </p>
              </div>

              <div className="bg-purple-50 rounded-2xl p-6 border border-purple-200">
                <p className="font-poppins text-secondary-700 leading-relaxed">
                  We as a merchant shall be under no liability whatsoever in respect of any loss or damage arising directly or indirectly out of the decline of authorization for any Transaction, on Account of the Cardholder having exceeded the preset limit mutually agreed by us with our acquiring bank from time to time.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Support CTA */}
          <div className="mt-12 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-3xl mb-4">
              <RefreshCcw className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="font-playfair text-2xl font-bold text-white mb-3">Need Help with Cancellation?</h3>
            <p className="font-poppins text-white/90 mb-6">
              Contact our support team for assistance with your booking cancellation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+919876543210"
                className="inline-flex items-center px-6 py-3 bg-white text-primary-600 font-semibold rounded-2xl hover:shadow-elegant transition-all duration-300 transform hover:scale-105 font-poppins"
              >
                Call Support
              </a>
              <a 
                href="mailto:support@vinayakatravels.com"
                className="inline-flex items-center px-6 py-3 bg-glass-gradient backdrop-blur-sm border border-white/30 text-white font-semibold rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105 font-poppins"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancellationPolicy;
