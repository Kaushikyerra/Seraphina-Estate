import React from "react";
import { ROOMS } from "@/data/hotelData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Users } from "lucide-react";

export default function StepOne({ bookingData, setBookingData, onNext }) {
  const handleRoomSelect = (room) => {
    setBookingData({
      ...bookingData,
      roomId: room.id,
      roomName: room.name,
      pricePerNight: room.price_per_night,
    });
  };
  const canProceed = bookingData.checkIn && bookingData.checkOut && bookingData.roomId;

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-serif text-[#0A1628]">Select Your Stay Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2"><Label>Check-in</Label><Input type="date" value={bookingData.checkIn} onChange={(e) => setBookingData({ ...bookingData, checkIn: e.target.value })} /></div>
        <div className="space-y-2"><Label>Check-out</Label><Input type="date" value={bookingData.checkOut} onChange={(e) => setBookingData({ ...bookingData, checkOut: e.target.value })} /></div>
      </div>
      <div>
        <h3 className="text-xl font-serif text-[#0A1628] mb-4">Choose Room</h3>
        <div className="space-y-4">
          {ROOMS.map((room) => (
            <div key={room.id} onClick={() => handleRoomSelect(room)} className={`flex gap-4 p-4 border-2 rounded-lg cursor-pointer ${bookingData.roomId === room.id ? "border-[#C9A961] bg-[#C9A961]/5" : "border-gray-200"}`}>
              <div className={`w-4 h-4 rounded-full border ${bookingData.roomId === room.id ? "bg-[#C9A961]" : "bg-white"}`} />
              <div>
                <h4 className="font-serif text-lg">{room.name}</h4>
                <p className="text-[#C9A961] font-semibold">${room.price_per_night} / night</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end"><Button onClick={onNext} disabled={!canProceed} className="bg-[#C9A961] hover:bg-[#B89751] text-white">Continue</Button></div>
    </div>
  );
}