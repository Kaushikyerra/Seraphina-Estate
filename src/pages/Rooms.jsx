import React, { useEffect } from "react";
import { ROOMS } from "@/data/hotelData";
import RoomCard from "@/components/home/RoomCard";

export default function Rooms() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAF9] pt-20"> {/* pt-20 accounts for fixed navbar */}
      
      {/* Page Header */}
      <div className="bg-[#0A1628] text-white py-16 mb-12">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h1 className="text-4xl md:text-6xl font-serif mb-4">
            Our <span className="text-[#C9A961]">Accommodations</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto font-sans">
            Discover our collection of luxury suites and private villas, designed for your ultimate comfort.
          </p>
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="container mx-auto px-6 lg:px-12 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ROOMS.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>
    </div>
  );
}