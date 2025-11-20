import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Calendar, Users, Mail, Phone, Home, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/lib/utils";
import { format } from "date-fns";

export default function BookingConfirmation() {
  const urlParams = new URLSearchParams(window.location.search);
  const bookingId = urlParams.get("id");
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      if (!bookingId) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch("http://localhost:5000/api/bookings");
        const all = await res.json();
        const found = all.find((b) => (b._id === bookingId || b.id === bookingId));
        setBooking(found || null);
      } catch (error) {
        console.error(error);
        setBooking(null);
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [bookingId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <Loader2 className="w-12 h-12 animate-spin text-[#C9A961]" />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-24">
        <p className="text-gray-600 text-lg mb-4">Booking not found</p>
        <Link to={createPageUrl("Home")}>
          <Button className="bg-[#C9A961] hover:bg-[#B89751]">Back to Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-24 bg-[#FAFAF9]">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          {/* Success Animation */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-block mb-6">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-16 h-16 text-green-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif text-[#0A1628] mb-4">Booking <span className="gold-accent">Confirmed!</span></h1>
            <p className="text-xl text-gray-600 font-sans">Your luxury experience awaits. We've sent a confirmation email to {booking.guest_email}.</p>
          </div>

          {/* Confirmation Card */}
          <Card className="p-8 shadow-2xl border-none bg-white mb-8">
            <div className="text-center mb-8">
              <p className="text-sm text-gray-600 mb-2">Confirmation Number</p>
              <p className="text-3xl font-serif text-[#C9A961]">{booking.confirmation_number}</p>
            </div>

            <div className="space-y-6">
              {/* Room Details */}
              <div>
                <h2 className="text-xl font-serif text-[#0A1628] mb-4">Booking Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 mb-1">Room</p>
                    <p className="font-semibold">{booking.room_name}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Number of Rooms</p>
                    <p className="font-semibold">{booking.num_rooms}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1 flex items-center gap-2"><Calendar className="w-4 h-4 text-[#C9A961]" />Check-in</p>
                    <p className="font-semibold">{format(new Date(booking.check_in_date), "MMMM dd, yyyy")}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1 flex items-center gap-2"><Calendar className="w-4 h-4 text-[#C9A961]" />Check-out</p>
                    <p className="font-semibold">{format(new Date(booking.check_out_date), "MMMM dd, yyyy")}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1 flex items-center gap-2"><Users className="w-4 h-4 text-[#C9A961]" />Guests</p>
                    <p className="font-semibold">{booking.num_adults} Adults, {booking.num_children} Children</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Number of Nights</p>
                    <p className="font-semibold">{booking.num_nights} nights</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h2 className="text-xl font-serif text-[#0A1628] mb-4">Guest Information</h2>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center gap-2"><Users className="w-4 h-4 text-[#C9A961]" /><span className="text-gray-600">Name:</span><span className="font-semibold">{booking.guest_name}</span></p>
                  <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-[#C9A961]" /><span className="text-gray-600">Email:</span><span className="font-semibold">{booking.guest_email}</span></p>
                  <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-[#C9A961]" /><span className="text-gray-600">Phone:</span><span className="font-semibold">{booking.guest_phone}</span></p>
                </div>
              </div>

              {booking.add_ons && booking.add_ons.length > 0 && (
                <div className="border-t pt-6">
                  <h2 className="text-xl font-serif text-[#0A1628] mb-4">Selected Add-ons</h2>
                  <div className="space-y-2">
                    {booking.add_ons.map((addon, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-600">{addon.name}</span>
                        <span className="font-semibold">${addon.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="border-t pt-6">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-serif text-[#0A1628]">Total Paid</span>
                  <span className="text-3xl font-serif text-[#C9A961]">${booking.total_price}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4">
            <Link to={createPageUrl("Dashboard")} className="flex-1">
              <Button className="w-full bg-[#C9A961] hover:bg-[#B89751] text-white py-6 rounded-none tracking-wide">View My Bookings</Button>
            </Link>
            <Link to={createPageUrl("Home")} className="flex-1">
              <Button variant="outline" className="w-full border-[#0A1628] text-[#0A1628] hover:bg-[#0A1628] hover:text-white py-6 rounded-none tracking-wide"><Home className="w-4 h-4 mr-2" />Back to Home</Button>
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-12 p-6 bg-[#C9A961]/10 rounded-lg">
            <h3 className="font-serif text-lg text-[#0A1628] mb-3">What's Next?</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-[#C9A961] flex-shrink-0 mt-0.5" /><span>You'll receive a confirmation email with your booking details and QR code</span></li>
              <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-[#C9A961] flex-shrink-0 mt-0.5" /><span>Our concierge team will contact you 48 hours before arrival to arrange check-in</span></li>
              <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-[#C9A961] flex-shrink-0 mt-0.5" /><span>Early check-in and late check-out can be arranged upon request</span></li>
            </ul>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.8s ease-out; }
      `}</style>
    </div>
  );
}