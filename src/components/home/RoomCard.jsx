import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bed, Users, Maximize, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/lib/utils";

export default function RoomCard({ room }) {
  return (
    <Card className="group overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-500 bg-white">
      <div className="relative h-72 overflow-hidden">
        <img src={room.images?.[0]} alt={room.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <Badge className="absolute top-4 right-4 bg-[#C9A961] text-white border-none px-4 py-2 text-base">From ${room.price_per_night}/night</Badge>
      </div>
      <CardContent className="p-6">
        <h3 className="text-2xl font-serif text-[#0A1628] mb-3">{room.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{room.description}</p>
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex items-center gap-1 text-xs text-gray-500"><Bed className="w-4 h-4 text-[#C9A961]" /> <span>{room.bed_type}</span></div>
          <div className="flex items-center gap-1 text-xs text-gray-500"><Users className="w-4 h-4 text-[#C9A961]" /> <span>{room.max_guests} guests</span></div>
          <div className="flex items-center gap-1 text-xs text-gray-500"><Maximize className="w-4 h-4 text-[#C9A961]" /> <span>{room.size_sqm} sqm</span></div>
        </div>
        <Link to={createPageUrl("RoomDetails") + "?id=" + room.id}>
          <Button className="w-full bg-[#0A1628] hover:bg-[#1E3A5F] text-white rounded-none">
            <Eye className="w-4 h-4 mr-2" /> View Details
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}