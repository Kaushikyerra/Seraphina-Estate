import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar, Users } from "lucide-react";
import { ROOMS } from "@/data/hotelData";

export default function StepOne({ bookingData, setBookingData, onNext }) {
  const rooms = ROOMS || [];
  const isLoading = false;

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

      {/* Dates and Guests */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="check-in" className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#C9A961]" />
            Check-in Date
          </Label>
          <Input
            id="check-in"
            type="date"
            value={bookingData.checkIn}
            onChange={(e) => setBookingData({ ...bookingData, checkIn: e.target.value })}
            className="border-gray-300 focus:border-[#C9A961]"
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="check-out" className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#C9A961]" />
            Check-out Date
          </Label>
          <Input
            id="check-out"
            type="date"
            value={bookingData.checkOut}
            onChange={(e) => setBookingData({ ...bookingData, checkOut: e.target.value })}
            className="border-gray-300 focus:border-[#C9A961]"
            min={bookingData.checkIn || new Date().toISOString().split('T')[0]}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="adults" className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#C9A961]" />
            Adults
          </Label>
          <Input
            id="adults"
            type="number"
            min="1"
            value={bookingData.adults}
            onChange={(e) => setBookingData({ ...bookingData, adults: parseInt(e.target.value) })}
            className="border-gray-300 focus:border-[#C9A961]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="children">Children</Label>
          <Input
            id="children"
            type="number"
            min="0"
            value={bookingData.children}
            onChange={(e) => setBookingData({ ...bookingData, children: parseInt(e.target.value) })}
            className="border-gray-300 focus:border-[#C9A961]"
          />
        </div>
      </div>

      {/* Room Selection */}
      <div>
        <h3 className="text-xl font-serif text-[#0A1628] mb-4">Choose Your Room</h3>
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-[#C9A961]" />
          </div>
        ) : (
          <RadioGroup value={bookingData.roomId} onValueChange={(value) => {
            const selectedRoom = rooms.find(r => r.id === value);
            if (selectedRoom) handleRoomSelect(selectedRoom);
          }}>
            <div className="space-y-4">
              {rooms.map((room) => (
                <label
                  key={room.id}
                  className={`flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    bookingData.roomId === room.id
                      ? "border-[#C9A961] bg-[#C9A961]/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <RadioGroupItem value={room.id} id={room.id} />
                  <div className="flex-1 flex gap-4">
                    <img
                      src={room.images?.[0] || "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=200&q=80"}
                      alt={room.name}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-serif text-lg text-[#0A1628] mb-1">{room.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{room.description}</p>
                      <p className="text-[#C9A961] font-semibold">${room.price_per_night} / night</p>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </RadioGroup>
        )}
      </div>

      {/* Continue Button */}
      <div className="flex justify-end">
        <Button
          onClick={onNext}
          disabled={!canProceed}
          className="bg-[#C9A961] hover:bg-[#B89751] text-white px-8 py-6 rounded-none tracking-wide"
        >
          Continue to Guest Details
        </Button>
      </div>
    </div>
  );
}