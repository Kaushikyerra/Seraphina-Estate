import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Calendar, Users, Bed, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/lib/utils";

export default function BookingWidget() {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState({ checkIn: "", checkOut: "", adults: 2, children: 0, rooms: 1 });

  const handleSearch = () => {
    const params = new URLSearchParams({
      checkIn: bookingData.checkIn,
      checkOut: bookingData.checkOut,
      adults: bookingData.adults.toString(),
      children: bookingData.children.toString(),
      rooms: bookingData.rooms.toString(),
    });
    navigate(createPageUrl("BookingFlow") + "?" + params.toString());
  };

  return (
    <Card className="w-full max-w-6xl mx-auto bg-white shadow-2xl border-none">
      <div className="p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
          <div className="space-y-2">
            <Label className="flex items-center gap-2"><Calendar className="w-4 h-4 text-[#C9A961]" /> Check-in</Label>
            <Input type="date" value={bookingData.checkIn} onChange={(e) => setBookingData({ ...bookingData, checkIn: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2"><Calendar className="w-4 h-4 text-[#C9A961]" /> Check-out</Label>
            <Input type="date" value={bookingData.checkOut} onChange={(e) => setBookingData({ ...bookingData, checkOut: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2"><Users className="w-4 h-4 text-[#C9A961]" /> Adults</Label>
            <Input type="number" min="1" value={bookingData.adults} onChange={(e) => setBookingData({ ...bookingData, adults: parseInt(e.target.value) })} />
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2"><Users className="w-4 h-4 text-[#C9A961]" /> Children</Label>
            <Input type="number" min="0" value={bookingData.children} onChange={(e) => setBookingData({ ...bookingData, children: parseInt(e.target.value) })} />
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2"><Bed className="w-4 h-4 text-[#C9A961]" /> Rooms</Label>
            <Input type="number" min="1" value={bookingData.rooms} onChange={(e) => setBookingData({ ...bookingData, rooms: parseInt(e.target.value) })} />
          </div>
          <Button onClick={handleSearch} className="bg-[#C9A961] hover:bg-[#B89751] text-white h-10 rounded-none">
            <Search className="w-4 h-4 mr-2" /> Find
          </Button>
        </div>
      </div>
    </Card>
  );
}