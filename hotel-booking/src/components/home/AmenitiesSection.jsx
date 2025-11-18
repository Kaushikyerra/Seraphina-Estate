import React from "react";
import { Waves, Dumbbell, Utensils, Sparkles, Car, Headphones } from "lucide-react";

const amenities = [
  { icon: Waves, name: "Infinity Pool", description: "Breathtaking infinity pool.", image: "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=600&q=80" },
  { icon: Sparkles, name: "Luxury Spa", description: "World-class spa treatments.", image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80" },
  { icon: Utensils, name: "Fine Dining", description: "Michelin-starred cuisine.", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80" },
];

export default function AmenitiesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-[#0A1628] mb-4">World-Class <span className="text-[#C9A961]">Amenities</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {amenities.map((amenity, index) => (
            <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer">
              <div className="h-80 overflow-hidden">
                <img src={amenity.image} alt={amenity.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <amenity.icon className="w-12 h-12 mb-4 text-[#C9A961]" />
                <h3 className="text-2xl font-serif mb-2">{amenity.name}</h3>
                <p className="text-sm text-gray-200 opacity-90">{amenity.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}