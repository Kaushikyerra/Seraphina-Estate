import React, { useState, useEffect } from "react";
import { ROOMS } from "@/data/hotelData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, Bed, Maximize, Check, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/lib/utils";

export default function RoomDetails() {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const roomId = urlParams.get("id");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load from local ROOMS (synchronous) but mimic a short loading state for UX
    const found = ROOMS.find((r) => r.id === roomId);
    setTimeout(() => {
      setRoom(found || null);
      // initialize image index when room loads
      if (found && found.images && found.images.length > 0) setCurrentImageIndex(0);
      setLoading(false);
    }, 200);
  }, [roomId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <Loader2 className="w-12 h-12 animate-spin text-[#C9A961]" />
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-24">
        <p className="text-gray-600 text-lg mb-4">Room not found</p>
        <Link to={createPageUrl("Home")}>
          <Button className="bg-[#C9A961] hover:bg-[#B89751]">Back to Home</Button>
        </Link>
      </div>
    );
  }

  const images = room.images && room.images.length > 0 ? room.images : [
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
  ];

  const nextImage = () => setCurrentImageIndex((i) => (i + 1) % images.length);
  const prevImage = () => setCurrentImageIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <div className="min-h-screen pt-20 bg-[#FAFAF9]">
      {/* Back Button */}
      <div className="container mx-auto px-6 lg:px-12 py-6">
        <Link to={createPageUrl("Home")}>
          <Button variant="ghost" className="text-[#0A1628] hover:text-[#C9A961]">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Rooms
          </Button>
        </Link>
      </div>

      {/* Image Gallery */}
      <div className="container mx-auto px-6 lg:px-12 mb-12">
        <div className="relative h-[500px] lg:h-[600px] rounded-lg overflow-hidden shadow-2xl">
          <img src={images[currentImageIndex]} alt={room.name} className="w-full h-full object-cover" />

          {images.length > 1 && (
            <>
              <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full transition-all">
                <ChevronLeft className="w-6 h-6 text-[#0A1628]" />
              </button>
              <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full transition-all">
                <ChevronRight className="w-6 h-6 text-[#0A1628]" />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button key={index} onClick={() => setCurrentImageIndex(index)} className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex ? "bg-[#C9A961] w-8" : "bg-white/70"}`} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Room Header */}
            <div>
              <h1 className="text-4xl md:text-5xl font-serif text-[#0A1628] mb-4">{room.name}</h1>
              <div className="flex flex-wrap gap-4 mb-6 text-gray-600">
                {room.bed_type && (
                  <div className="flex items-center gap-2">
                    <Bed className="w-5 h-5 text-[#C9A961]" />
                    <span>{room.bed_type}</span>
                  </div>
                )}
                {room.max_guests && (
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#C9A961]" />
                    <span>Up to {room.max_guests} guests</span>
                  </div>
                )}
                {room.size_sqm && (
                  <div className="flex items-center gap-2">
                    <Maximize className="w-5 h-5 text-[#C9A961]" />
                    <span>{room.size_sqm} sqm</span>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-serif text-[#0A1628] mb-4">Description</h2>
              <p className="text-gray-600 leading-relaxed font-sans">{room.detailed_description || room.description}</p>
            </div>

            {/* Amenities */}
            {room.amenities && room.amenities.length > 0 && (
              <div>
                <h2 className="text-2xl font-serif text-[#0A1628] mb-4">Amenities</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {room.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-[#C9A961] flex-shrink-0" />
                      <span className="text-gray-600 font-sans">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            {room.features && room.features.length > 0 && (
              <div>
                <h2 className="text-2xl font-serif text-[#0A1628] mb-4">Key Features</h2>
                <div className="flex flex-wrap gap-3">
                  {room.features.map((feature, index) => (
                    <Badge key={index} className="bg-[#C9A961]/10 text-[#C9A961] border-[#C9A961] px-4 py-2 text-sm font-sans">{feature}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white p-8 rounded-lg shadow-2xl border border-gray-100">
              <div className="text-center mb-6">
                <p className="text-gray-600 text-sm mb-2 font-sans">Starting from</p>
                <p className="text-4xl font-serif text-[#0A1628] mb-1">${room.price_per_night}</p>
                <p className="text-gray-500 text-sm font-sans">per night</p>
              </div>

              <Button onClick={() => {
                const params = new URLSearchParams({
                  roomId: room.id,
                  roomName: room.name,
                  pricePerNight: room.price_per_night.toString(),
                });
                navigate(createPageUrl("BookingFlow") + "?" + params.toString());
              }} className="w-full bg-[#C9A961] hover:bg-[#B89751] text-white py-6 text-lg rounded-none tracking-wide mb-4">Book Now</Button>

              <div className="space-y-3 text-sm text-gray-600 font-sans">
                <div className="flex items-center justify-between py-2 border-b">
                  <span>Free cancellation</span>
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span>Best price guarantee</span>
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex items-center justify-between py-2">
                  <span>Instant confirmation</span>
                  <Check className="w-4 h-4 text-green-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}