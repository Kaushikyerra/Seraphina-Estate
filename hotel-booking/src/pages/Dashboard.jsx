import React from "react";
import { MOCK_USER, COUPONS } from "@/data/hotelData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, CreditCard, Gift, Star, User, Mail, Phone, Loader2, LogOut, Award } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/lib/utils";

export default function Dashboard() {
  // STATIC DATA RESTORATION
  const user = MOCK_USER;
  const bookings = [
      {
          id: "bk_123",
          room_name: "Deluxe Ocean Suite",
          check_in_date: "2025-12-20",
          check_out_date: "2025-12-25",
          num_adults: 2,
          num_children: 0,
          total_price: 2250,
          status: "confirmed",
          confirmation_number: "SERA8892"
      },
      {
          id: "bk_old",
          room_name: "Garden View Room",
          check_in_date: "2023-10-10",
          check_out_date: "2023-10-15",
          num_adults: 1,
          num_children: 0,
          total_price: 890,
          status: "completed",
          confirmation_number: "SERA1102"
      }
  ];

  const upcomingBookings = bookings.filter((b) => new Date(b.check_in_date) >= new Date() && b.status === "confirmed");
  const pastBookings = bookings.filter((b) => new Date(b.check_out_date) < new Date() || b.status === "completed");
  const totalSpent = bookings.reduce((sum, b) => sum + (b.total_price || 0), 0);

  const loyaltyTiers = {
    bronze: { name: "Bronze", color: "bg-amber-700", nextTier: "Silver", pointsNeeded: 500 },
    silver: { name: "Silver", color: "bg-gray-400", nextTier: "Gold", pointsNeeded: 1000 },
    gold: { name: "Gold", color: "bg-yellow-500", nextTier: "Platinum", pointsNeeded: 2500 },
    platinum: { name: "Platinum", color: "bg-purple-600", nextTier: null, pointsNeeded: 0 },
  };

  const currentTier = loyaltyTiers[user.loyalty_tier || "bronze"];

  return (
    <div className="min-h-screen pt-20 pb-24 bg-[#FAFAF9]">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-serif text-[#0A1628] mb-2">
              Welcome back, <span className="gold-accent">{user.full_name?.split(' ')[0]}</span>
            </h1>
            <p className="text-gray-600 font-sans">Manage your bookings and view your loyalty status</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="border-none shadow-lg bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-gray-600 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#C9A961]" />
                  Total Bookings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-serif text-[#0A1628]">{bookings.length}</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-gray-600 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#C9A961]" />
                  Total Spent
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-serif text-[#0A1628]">${totalSpent.toFixed(2)}</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-gray-600 flex items-center gap-2">
                  <Star className="w-4 h-4 text-[#C9A961]" />
                  Loyalty Points
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-serif text-[#0A1628]">{user.loyalty_points || 0}</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Bookings */}
              <Card className="border-none shadow-lg bg-white">
                <CardHeader>
                  <CardTitle className="text-2xl font-serif text-[#0A1628]">My Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="upcoming">
                    <TabsList className="mb-6 bg-gray-100 p-1 rounded-lg inline-flex">
                      <TabsTrigger value="upcoming" className="px-4 py-2 rounded-md">Upcoming ({upcomingBookings.length})</TabsTrigger>
                      <TabsTrigger value="past" className="px-4 py-2 rounded-md">Past ({pastBookings.length})</TabsTrigger>
                    </TabsList>

                    <TabsContent value="upcoming">
                      {upcomingBookings.length === 0 ? (
                        <div className="text-center py-12">
                          <p className="text-gray-500 mb-4">No upcoming bookings</p>
                          <Link to={createPageUrl("Home")}>
                            <Button className="bg-[#C9A961] hover:bg-[#B89751] text-white">Book Your Stay</Button>
                          </Link>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {upcomingBookings.map((booking) => (
                            <Card key={booking.id} className="border border-gray-200">
                              <CardContent className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                  <div>
                                    <h3 className="text-xl font-serif text-[#0A1628] mb-1">{booking.room_name}</h3>
                                    <p className="text-sm text-gray-600">Confirmation: {booking.confirmation_number}</p>
                                  </div>
                                  <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-100">
                                    {booking.status}
                                  </Badge>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <p className="text-gray-600">Check-in</p>
                                    <p className="font-semibold">{format(new Date(booking.check_in_date), "MMM dd, yyyy")}</p>
                                  </div>
                                  <div>
                                    <p className="text-gray-600">Check-out</p>
                                    <p className="font-semibold">{format(new Date(booking.check_out_date), "MMM dd, yyyy")}</p>
                                  </div>
                                  <div>
                                    <p className="text-gray-600">Guests</p>
                                    <p className="font-semibold">{booking.num_adults} Adults, {booking.num_children} Children</p>
                                  </div>
                                  <div>
                                    <p className="text-gray-600">Total</p>
                                    <p className="font-semibold text-[#C9A961]">${booking.total_price}</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="past">
                       <div className="space-y-4">
                          {pastBookings.map((booking) => (
                            <Card key={booking.id} className="border border-gray-200 opacity-75">
                              <CardContent className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                  <div>
                                    <h3 className="text-xl font-serif text-[#0A1628] mb-1">{booking.room_name}</h3>
                                    <p className="text-sm text-gray-600">Confirmation: {booking.confirmation_number}</p>
                                  </div>
                                  <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300">
                                    {booking.status}
                                  </Badge>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <p className="text-gray-600">Check-in</p>
                                    <p className="font-semibold">{format(new Date(booking.check_in_date), "MMM dd, yyyy")}</p>
                                  </div>
                                  <div>
                                    <p className="text-gray-600">Check-out</p>
                                    <p className="font-semibold">{format(new Date(booking.check_out_date), "MMM dd, yyyy")}</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                       </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Loyalty Status */}
              <Card className="border-none shadow-lg bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-serif text-[#0A1628] flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#C9A961]" />
                    Loyalty Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className={`inline-block ${currentTier.color} text-white px-6 py-3 rounded-full mb-4`}>
                      <span className="text-2xl font-serif">{currentTier.name}</span>
                    </div>
                    <p className="text-3xl font-serif text-[#0A1628] mb-1">{user.loyalty_points || 0}</p>
                    <p className="text-sm text-gray-600">Total Points</p>
                  </div>
                  
                  {currentTier.nextTier && (
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Progress to {currentTier.nextTier}</span>
                        <span className="font-semibold">{currentTier.pointsNeeded - (user.loyalty_points || 0)} points</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-[#C9A961] h-2 rounded-full"
                          style={{ width: `${Math.min((user.loyalty_points || 0) / currentTier.pointsNeeded * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Available Coupons */}
              <Card className="border-none shadow-lg bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-serif text-[#0A1628] flex items-center gap-2">
                    <Gift className="w-5 h-5 text-[#C9A961]" />
                    Available Coupons
                  </CardTitle>
                </CardHeader>
                <CardContent>
                   <div className="space-y-3">
                      {COUPONS.map((coupon) => (
                        <div key={coupon.code} className="p-4 border-2 border-dashed border-[#C9A961] rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-serif text-lg text-[#C9A961]">{coupon.code}</span>
                            <Badge className="bg-[#C9A961]/10 text-[#C9A961] border-[#C9A961] hover:bg-[#C9A961]/20">
                              {coupon.discount_type === "percentage" ? `${coupon.discount_value}% OFF` : `$${coupon.discount_value} OFF`}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-600 mb-1">{coupon.description || "Special Discount"}</p>
                          <p className="text-xs text-gray-500">Min Spend: ${coupon.min_booking_amount}</p>
                        </div>
                      ))}
                   </div>
                </CardContent>
              </Card>

              {/* Profile */}
              <Card className="border-none shadow-lg bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-serif text-[#0A1628]">Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-[#C9A961]" />
                    <span className="text-gray-600">{user.full_name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#C9A961]" />
                    <span className="text-gray-600">{user.email}</span>
                  </div>
                  {user.phone_number && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-[#C9A961]" />
                      <span className="text-gray-600">{user.phone_number}</span>
                    </div>
                  )}
                  <Button
                    variant="outline"
                    className="w-full mt-4 border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}