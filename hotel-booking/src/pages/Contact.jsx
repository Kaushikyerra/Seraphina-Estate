import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";


export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // --- START OF MODIFICATION ---
    // Simulate an API call for sending email
    console.log("Simulating email send with data:", formData);
    try {
      // Replace with your actual email sending logic (e.g., fetch to an API endpoint)
      // For now, we'll just simulate a delay.
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000); // Hide success message after 5 seconds
    } catch (error) {
      console.error("Error sending message:", error);
      // You might want to add an error state here
    }
    // --- END OF MODIFICATION ---

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen pt-20 pb-24 bg-[#FAFAF9]">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-[#0A1628] to-[#1E3A5F] flex items-center">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-4">
            Get in <span className="gold-accent">Touch</span>
          </h1>
          <p className="text-xl text-white/90 font-sans max-w-2xl mx-auto">
            We're here to make your stay unforgettable. Reach out to us anytime.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 -mt-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-8 shadow-2xl border-none bg-white">
              <h2 className="text-3xl font-serif text-[#0A1628] mb-6">Send us a Message</h2>
              
              {submitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 text-sm">Thank you for your message! We'll get back to you shortly.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      required
                      className="border-gray-300 focus:border-[#C9A961]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      required
                      className="border-gray-300 focus:border-[#C9A961]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 123-4567"
                    className="border-gray-300 focus:border-[#C9A961]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us how we can help..."
                    required
                    className="border-gray-300 focus:border-[#C9A961] h-40"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#C9A961] hover:bg-[#B89751] text-white py-6 rounded-none tracking-wide"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Details */}
            <Card className="p-8 shadow-2xl border-none bg-white">
              <h2 className="text-2xl font-serif text-[#0A1628] mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#C9A961]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#C9A961]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0A1628] mb-1">Address</h3>
                    <p className="text-sm text-gray-600">
                      123 Paradise Lane<br />
                      Luxury Island, LI 12345<br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#C9A961]/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[#C9A961]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0A1628] mb-1">Phone</h3>
                    <p className="text-sm text-gray-600">
                      Reservations: +1 (555) 123-4567<br />
                      Concierge: +1 (555) 123-4568
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#C9A961]/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#C9A961]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0A1628] mb-1">Email</h3>
                    <p className="text-sm text-gray-600">
                      reservations@seraphinaestate.com<br />
                      info@seraphinaestate.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#C9A961]/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-[#C9A961]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0A1628] mb-1">Hours</h3>
                    <p className="text-sm text-gray-600">
                      Front Desk: 24/7<br />
                      Concierge: 7:00 AM - 11:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Social Media */}
            <Card className="p-8 shadow-2xl border-none bg-white">
              <h2 className="text-2xl font-serif text-[#0A1628] mb-6">Follow Us</h2>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-12 h-12 rounded-full bg-[#C9A961]/10 hover:bg-[#C9A961] flex items-center justify-center transition-colors group"
                >
                  <svg className="w-5 h-5 text-[#C9A961] group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-12 h-12 rounded-full bg-[#C9A961]/10 hover:bg-[#C9A961] flex items-center justify-center transition-colors group"
                >
                  <svg className="w-5 h-5 text-[#C9A961] group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-12 h-12 rounded-full bg-[#C9A961]/10 hover:bg-[#C9A961] flex items-center justify-center transition-colors group"
                >
                  <svg className="w-5 h-5 text-[#C9A961] group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}