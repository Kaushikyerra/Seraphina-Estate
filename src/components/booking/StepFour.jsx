import React, { useState } from "react";
import { COUPONS } from "@/data/hotelData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function StepFour({ bookingData, setBookingData, onPrev, onSubmit, isLoading }) {
  const [couponInput, setCouponInput] = useState("");
  
  const applyCoupon = () => {
    const coupon = COUPONS.find((c) => c.code === couponInput);
    if (coupon) setBookingData({ ...bookingData, couponCode: coupon.code, discount: coupon.discount_value });
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-serif text-[#0A1628]">Payment</h2>
      <Card className="p-6">
        <h3 className="text-xl font-serif mb-4">Summary</h3>
        <p>Room: {bookingData.roomName}</p>
        <p>Dates: {bookingData.checkIn} to {bookingData.checkOut}</p>
        <div className="flex gap-2 mt-4"><Input placeholder="Coupon" value={couponInput} onChange={e => setCouponInput(e.target.value)} /><Button onClick={applyCoupon} variant="outline">Apply</Button></div>
      </Card>
      <div className="flex justify-between"><Button onClick={onPrev} variant="outline">Back</Button><Button onClick={onSubmit} disabled={isLoading} className="bg-[#C9A961] hover:bg-[#B89751] text-white">{isLoading ? <Loader2 className="animate-spin" /> : "Confirm Booking"}</Button></div>
    </div>
  );
}