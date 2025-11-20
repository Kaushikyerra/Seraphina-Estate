import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

export default function StepTwo({ bookingData, setBookingData, onNext, onPrev }) {
  const [otpInput, setOtpInput] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Reset verification if email/phone changes
    setMessage("");
    setOtpSent(false);
    setOtpInput("");
    if (bookingData.verified) setBookingData({ ...bookingData, verified: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingData.guestEmail, bookingData.guestPhone]);

  const keyForOtp = () => bookingData.guestEmail || bookingData.guestPhone || "";

  const sendOtp = async () => {
    const key = keyForOtp();
    if (!key) {
      setMessage("Enter an email or phone to receive an OTP.");
      return;
    }
    try {
      setSendingOtp(true);
      setMessage("");
      const res = await fetch("http://localhost:5000/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: bookingData.guestEmail, phone: bookingData.guestPhone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to send OTP');
      setOtpSent(true);
      setMessage("OTP sent — check the server console (dev) or your email/phone.");
    } catch (err) {
      console.error(err);
      setMessage(err.message || "Failed to send OTP");
    } finally {
      setSendingOtp(false);
    }
  };

  const verifyOtp = async () => {
    const key = keyForOtp();
    if (!key) {
      setMessage("No key to verify");
      return;
    }
    try {
      setVerifyingOtp(true);
      setMessage("");
      const res = await fetch("http://localhost:5000/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, code: otpInput }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'OTP verification failed');
      setBookingData({ ...bookingData, verified: true });
      setMessage("Verified — you can continue to the next step.");
    } catch (err) {
      console.error(err);
      setMessage(err.message || "OTP verification failed");
    } finally {
      setVerifyingOtp(false);
    }
  };

  const canProceed = bookingData.guestName && (bookingData.guestEmail || bookingData.guestPhone) && bookingData.verified;

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-serif text-[#0A1628]">Guest Information</h2>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="guest-name">Full Name</Label>
          <Input id="guest-name" value={bookingData.guestName} onChange={(e) => setBookingData({ ...bookingData, guestName: e.target.value })} placeholder="Enter your full name" className="border-gray-300" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="guest-email">Email Address</Label>
          <Input id="guest-email" type="email" value={bookingData.guestEmail} onChange={(e) => setBookingData({ ...bookingData, guestEmail: e.target.value })} placeholder="your.email@example.com" className="border-gray-300" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="guest-phone">Phone Number</Label>
          <Input id="guest-phone" type="tel" value={bookingData.guestPhone} onChange={(e) => setBookingData({ ...bookingData, guestPhone: e.target.value })} placeholder="+1 (555) 123-4567" className="border-gray-300" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="special-requests">Special Requests (Optional)</Label>
          <Textarea id="special-requests" value={bookingData.specialRequests} onChange={(e) => setBookingData({ ...bookingData, specialRequests: e.target.value })} placeholder="Any special requests or preferences..." className="border-gray-300 h-32" />
        </div>

        {/* OTP Controls */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Button onClick={sendOtp} disabled={sendingOtp || (!bookingData.guestEmail && !bookingData.guestPhone)} variant="outline">
              {sendingOtp ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Send OTP'}
            </Button>
            <span className="text-sm text-gray-500">Verify either email or phone via OTP</span>
          </div>

          {otpSent && (
            <div className="flex items-center gap-2 mt-2">
              <Input value={otpInput} onChange={(e) => setOtpInput(e.target.value)} placeholder="Enter OTP" />
              <Button onClick={verifyOtp} disabled={verifyingOtp}>
                {verifyingOtp ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Verify OTP'}
              </Button>
            </div>
          )}

          {message && <p className="text-sm mt-2 text-gray-600">{message}</p>}
        </div>

      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button onClick={onPrev} variant="outline" className="px-8 py-6 rounded-none border-[#0A1628] text-[#0A1628] hover:bg-[#0A1628] hover:text-white">Back</Button>
        <Button onClick={onNext} disabled={!canProceed} className="bg-[#C9A961] hover:bg-[#B89751] text-white px-8 py-6 rounded-none tracking-wide">Continue to Add-ons</Button>
      </div>
    </div>
  );
}