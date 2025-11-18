import React from "react";
import { ROOMS } from "@/data/hotelData";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { createPageUrl } from "@/lib/utils";

export default function RoomDetails() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const room = ROOMS.find((r) => r.id === searchParams.get("id"));
  
  if (!room) return <div>Room not found</div>;

  return (
    <div className="min-h-screen pt-24 bg-[#FAFAF9] container mx-auto px-6">
      <h1 className="text-4xl font-serif mb-4">{room.name}</h1>
      <img src={room.images[0]} className="w-full h-96 object-cover rounded mb-8" />
      <p className="mb-8">{room.detailed_description}</p>
      <Button onClick={() => navigate(createPageUrl("BookingFlow") + `?roomId=${room.id}&roomName=${room.name}&pricePerNight=${room.price_per_night}`)} className="bg-[#C9A961] text-white">Book Now for ${room.price_per_night}</Button>
    </div>
  );
}