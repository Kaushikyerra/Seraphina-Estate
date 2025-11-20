import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Loader2 } from "lucide-react";
import StepOne from "../components/booking/StepOne";
import StepTwo from "../components/booking/StepTwo";
import StepThree from "../components/booking/StepThree";
import StepFour from "../components/booking/StepFour";
export default function BookingFlow() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [bookingData, setBookingData] = useState({
    checkIn: "",
    checkOut: "",
    adults: 2,
    children: 0,
    rooms: 1,
    roomId: "",
    roomName: "",
    pricePerNight: 0,
    guestName: "",
    guestEmail: "",
    guestPhone: "",
    verified: false,
    specialRequests: "",
    addOns: [],
    couponCode: "",
    discount: 0,
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setBookingData((prev) => ({
      ...prev,
      checkIn: urlParams.get("checkIn") || prev.checkIn,
      checkOut: urlParams.get("checkOut") || prev.checkOut,
      adults: parseInt(urlParams.get("adults")) || prev.adults,
      children: parseInt(urlParams.get("children")) || prev.children,
      rooms: parseInt(urlParams.get("rooms")) || prev.rooms,
      roomId: urlParams.get("roomId") || prev.roomId,
      roomName: urlParams.get("roomName") || prev.roomName,
      pricePerNight: parseFloat(urlParams.get("pricePerNight")) || prev.pricePerNight,
    }));
  }, []);

  const steps = [
    { number: 1, title: "Select Room" },
    { number: 2, title: "Guest Details" },
    { number: 3, title: "Add-ons" },
    { number: 4, title: "Review & Payment" },
  ];

  const nextStep = () => { if (currentStep < 4) setCurrentStep((s) => s + 1); };
  const prevStep = () => { if (currentStep > 1) setCurrentStep((s) => s - 1); };

  const handleSubmit = async () => {
    if (!bookingData.verified) {
      alert('Please verify your email or phone with the OTP before confirming the booking.');
      return;
    }
    try {
      setIsSubmitting(true);
      const checkInDate = new Date(bookingData.checkIn);
      const checkOutDate = new Date(bookingData.checkOut);
      const numNights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

      const basePrice = (bookingData.pricePerNight || 0) * numNights * (bookingData.rooms || 1);
      const addOnsTotal = (bookingData.addOns || []).reduce((sum, a) => sum + (a.price || 0), 0);
      const totalPrice = basePrice + addOnsTotal - (bookingData.discount || 0);

      const payload = {
        room_id: bookingData.roomId || null,
        room_name: bookingData.roomName,
        guest_name: bookingData.guestName,
        guest_email: bookingData.guestEmail,
        guest_phone: bookingData.guestPhone,
        check_in_date: bookingData.checkIn,
        check_out_date: bookingData.checkOut,
        num_adults: bookingData.adults,
        num_children: bookingData.children,
        num_rooms: bookingData.rooms,
        num_nights: numNights,
        base_price: basePrice,
        total_price: totalPrice,
        status: "confirmed",
        confirmation_number: `SERA${Date.now()}${Math.floor(Math.random()*1000)}`,
        add_ons: bookingData.addOns,
        coupon_code: bookingData.couponCode || null,
        discount_amount: bookingData.discount || 0,
        special_requests: bookingData.specialRequests,
      };

      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Booking failed");
      const saved = await res.json();
      navigate(createPageUrl("BookingConfirmation") + "?id=" + (saved._id || saved.id || ""));
    } catch (error) {
      console.error("Booking error:", error);
      alert("Failed to create booking. Check console for details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-24 bg-[#FAFAF9]">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif text-[#0A1628] mb-4">Complete Your <span className="gold-accent">Booking</span></h1>
            <p className="text-gray-600 font-sans">Just a few steps to secure your luxury experience</p>
          </div>

          <div className="mb-12">
            <div className="flex items-center justify-between max-w-3xl mx-auto">
              {steps.map((step, index) => (
                <React.Fragment key={step.number}>
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all ${currentStep >= step.number ? "bg-[#C9A961] text-white" : "bg-gray-200 text-gray-500"}`}>
                      {currentStep > step.number ? <Check className="w-6 h-6" /> : step.number}
                    </div>
                    <p className="text-xs mt-2 text-center font-sans hidden md:block">{step.title}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-1 mx-2 transition-all ${currentStep > step.number ? "bg-[#C9A961]" : "bg-gray-200"}`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <Card className="p-8 bg-white shadow-xl border-none">
            {currentStep === 1 && <StepOne bookingData={bookingData} setBookingData={setBookingData} onNext={nextStep} />}
            {currentStep === 2 && <StepTwo bookingData={bookingData} setBookingData={setBookingData} onNext={nextStep} onPrev={prevStep} />}
            {currentStep === 3 && <StepThree bookingData={bookingData} setBookingData={setBookingData} onNext={nextStep} onPrev={prevStep} />}
            {currentStep === 4 && <StepFour bookingData={bookingData} setBookingData={setBookingData} onPrev={prevStep} onSubmit={handleSubmit} isLoading={isSubmitting} />}
          </Card>
        </div>
      </div>
    </div>
  );
}