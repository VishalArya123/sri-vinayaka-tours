import React from "react";
import { FileText } from "lucide-react";

const CancellationPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <FileText className="text-blue-600" /> Cancellation Policy
      </h1>
      
      <section className="mt-4 text-gray-600">
        <p>Any cancelled tickets amount will be credited in your account within 5 to 7 bank working days.</p>
        
        <p className="mt-2">Cancellation Ticket Terms Depend On Operator Cancellation Policy.</p>
        
        <p className="mt-2 font-semibold">Note:</p>
        <p>Some bus operators do not allow cancellations and hence no refund is possible in such cases. Some bus operators charge higher cancellation penalties while some allow cancellation up to 4 hours before departure. Please contact any of our support care for cancellation details on any specific service.</p>
        
        <p className="mt-2 font-semibold">Non-Transferable:</p>
        <p>Once a bus ticket is issued, it is non-transferable. If a ticket is presented by someone other than the person entitled to be carried there-under or to refund in connection therewith, Sri Vinayaka Travels or any of its travel partners shall not be liable to the person so entitled, if in good faith it provides carriage or makes a refund to the person presenting the ticket.</p>
        
        <p className="mt-2">In case the bus operator changes the type of bus due to some reason, Sri Vinayaka Travels will not be responsible.</p>
        
        <p className="mt-2">We as a merchant shall be under no liability whatsoever in respect of any loss or damage arising directly or indirectly out of the decline of authorization for any Transaction, on Account of the Cardholder having exceeded the preset limit mutually agreed by us with our acquiring bank from time to time.</p>
      </section>
    </div>
  );
};

export default CancellationPolicy;
