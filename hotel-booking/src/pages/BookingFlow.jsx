import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createPageUrl } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import StepOne from "../components/booking/StepOne";
import StepTwo from "../components/booking/StepTwo";
import StepThree from "../components/booking/StepThree";
import StepFour from "../components/booking/StepFour";

export default function BookingFlow() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const [bookingData, setBookingData] = useState({
    checkIn: searchParams.get("checkIn") || "",
    checkOut: searchParams.get("checkOut") || "",
    adults: 2, children: 0, rooms: 1,
    roomId: searchParams.get("roomId") || "",
    roomName: searchParams.get("roomName") || "",
    pricePerNight: parseFloat(searchParams.get("pricePerNight")) || 0,
    guestName: "", guestEmail: "", guestPhone: "",
    addOns: [], discount: 0,
  });

  const handleSubmit = async () => {
    setIsLoading(true);
    setTimeout(() => {
       const total = (bookingData.pricePerNight * bookingData.rooms) + bookingData.addOns.reduce((s, a) => s + a.price, 0) - bookingData.discount;
       navigate(createPageUrl("BookingConfirmation") + `?conf=SERA99&total=${total}`);
    }, 1500);
  };

  const props = { bookingData, setBookingData, onNext: () => setCurrentStep(c => c + 1), onPrev: () => setCurrentStep(c => c - 1) };

  return (
    <div className="min-h-screen pt-24 container mx-auto px-6">
      <h1 className="text-3xl font-serif text-center mb-8">Booking Process</h1>
      <Card className="p-8 max-w-4xl mx-auto">
        {currentStep === 1 && <StepOne {...props} />}
        {currentStep === 2 && <StepTwo {...props} />}
        {currentStep === 3 && <StepThree {...props} />}
        {currentStep === 4 && <StepFour {...props} onSubmit={handleSubmit} isLoading={isLoading} />}
      </Card>
    </div>
  );
}