import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const heroImages = [
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1920&q=80",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80",
];

export default function HeroSection({ onBookNowClick }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {heroImages.map((image, index) => (
        <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentImageIndex ? "opacity-100" : "opacity-0"}`}>
          <img src={image} alt="Hotel" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        </div>
      ))}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6">
          The Seraphina <span className="text-[#C9A961]">Estate</span>
        </h1>
        <Button onClick={onBookNowClick} size="lg" className="bg-[#C9A961] hover:bg-[#B89751] text-white text-lg px-12 py-6 rounded-none">
          Book Your Stay
        </Button>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-white/70 w-8 h-8" />
      </div>
    </section>
  );
}