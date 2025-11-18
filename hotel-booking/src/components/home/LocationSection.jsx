import React from "react";
import { MapPin, Navigation, Mountain, Palmtree } from "lucide-react";

export default function LocationSection() {
  return (
    <section className="py-24 bg-[#FAFAF9]">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif text-[#0A1628] mb-6">Discover Our <span className="text-[#C9A961]">Location</span></h2>
            <p className="text-gray-600 text-lg mb-8">Nestled between pristine beaches and majestic mountains.</p>
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-[#C9A961] mt-1" />
                <div>
                  <h3 className="font-serif text-xl text-[#0A1628] mb-2">The Seraphina Estate</h3>
                  <p className="text-gray-600">123 Paradise Lane, Luxury Island</p>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[400px] bg-gray-200 rounded-lg shadow-2xl flex items-center justify-center text-gray-500">
             [Google Map Placeholder]
          </div>
        </div>
      </div>
    </section>
  );
}
