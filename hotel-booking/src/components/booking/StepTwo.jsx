import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function StepTwo({ bookingData, setBookingData, onNext, onPrev }) {
  const canProceed = bookingData.guestName && bookingData.guestEmail;
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-serif text-[#0A1628]">Guest Info</h2>
      <div className="space-y-4">
        <div><Label>Full Name</Label><Input value={bookingData.guestName} onChange={(e) => setBookingData({ ...bookingData, guestName: e.target.value })} /></div>
        <div><Label>Email</Label><Input value={bookingData.guestEmail} onChange={(e) => setBookingData({ ...bookingData, guestEmail: e.target.value })} /></div>
        <div><Label>Phone</Label><Input value={bookingData.guestPhone} onChange={(e) => setBookingData({ ...bookingData, guestPhone: e.target.value })} /></div>
        <div><Label>Special Requests</Label><Textarea value={bookingData.specialRequests} onChange={(e) => setBookingData({ ...bookingData, specialRequests: e.target.value })} /></div>
      </div>
      <div className="flex justify-between"><Button onClick={onPrev} variant="outline">Back</Button><Button onClick={onNext} disabled={!canProceed} className="bg-[#C9A961] hover:bg-[#B89751] text-white">Continue</Button></div>
    </div>
  );
}