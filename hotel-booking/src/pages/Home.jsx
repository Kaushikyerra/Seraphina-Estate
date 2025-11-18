import React, { useRef } from "react";
// Import ROOMS directly from data file to ensure they show up
import { ROOMS } from "@/data/hotelData";
import HeroSection from "../components/home/HeroSection";
import BookingWidget from "../components/home/BookingWidget";
import RoomCard from "../components/home/RoomCard";
import AmenitiesSection from "../components/home/AmenitiesSection";
import LocationSection from "../components/home/LocationSection";

export default function Home() {
  const bookingWidgetRef = useRef(null);

  const scrollToBooking = () => {
    bookingWidgetRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-[#FAFAF9]">
      {/* Hero Section */}
      <HeroSection onBookNowClick={scrollToBooking} />

      {/* Booking Widget */}
      <div ref={bookingWidgetRef} className="relative -mt-24 z-20 container mx-auto px-6 lg:px-12">
        <BookingWidget />
      </div>

      {/* Rooms & Suites Section */}
      <section id="rooms" className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-[#0A1628] mb-4">
              Exquisite <span className="gold-accent">Rooms & Suites</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto font-sans">
              Each accommodation is meticulously designed to provide the ultimate in comfort and sophistication.
            </p>
          </div>

          {/* Rooms Grid - DIRECT MAPPING of ROOMS array */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ROOMS.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <AmenitiesSection />

      {/* Location Section */}
      <LocationSection />

      {/* Testimonials Section */}
      <section className="py-24 luxury-gradient">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
              Guest <span className="gold-accent">Testimonials</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "An absolutely unforgettable experience. The attention to detail and service excellence is unmatched.",
                author: "Sarah Martinez",
                role: "Business Executive",
              },
              {
                quote: "The Seraphina Estate redefined luxury for us. Every moment felt like a dream come true.",
                author: "James Chen",
                role: "Travel Blogger",
              },
              {
                quote: "From the stunning views to the impeccable service, this is paradise on earth.",
                author: "Emily Thompson",
                role: "Fashion Designer",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm p-8 rounded-lg border border-white/20"
              >
                <p className="text-white text-lg italic mb-6 font-sans leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="text-[#C9A961] font-serif text-lg">{testimonial.author}</p>
                  <p className="text-white/70 text-sm font-sans">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}