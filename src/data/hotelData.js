export const MOCK_USER = {
  full_name: "Alex Johnson",
  email: "alex@example.com",
  phone_number: "+1 (555) 0199",
  loyalty_points: 1250,
  loyalty_tier: "silver"
};

export const COUPONS = [
  { code: "WELCOME20", discount_type: "percentage", discount_value: 20, min_booking_amount: 200, is_active: true, expiry_date: "2030-01-01" },
  { code: "SUMMER50", discount_type: "fixed", discount_value: 50, min_booking_amount: 500, is_active: true, expiry_date: "2030-01-01" }
];

export const ROOMS = [
  {
    id: "room_1",
    name: "Deluxe Ocean Suite",
    type: "executive_suite",
    description: "Breathtaking ocean views with a private balcony.",
    detailed_description: "Experience the pinnacle of luxury in our Deluxe Ocean Suite. Featuring panoramic views of the crystal-clear waters, a king-sized bed with Egyptian cotton linens, and a spacious private terrace.",
    price_per_night: 450,
    images: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80"],
    features: ["Ocean View", "King Bed", "Private Balcony", "Jacuzzi"],
    amenities: ["Free Wi-Fi", "Mini Bar", "Room Service", "Smart TV"],
    max_guests: 2,
    bed_type: "King Bed",
    size_sqm: 65
  },
  {
    id: "room_2",
    name: "Presidential Villa",
    type: "presidential_villa",
    description: "The ultimate private sanctuary with a personal pool.",
    detailed_description: "Our Presidential Villa offers unmatched privacy and opulence. Enjoy your own infinity pool, a private chef on request, and direct beach access.",
    price_per_night: 1200,
    images: ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80"],
    features: ["Private Pool", "Direct Beach Access", "Butler Service"],
    amenities: ["All Inclusive", "Private Gym", "Home Cinema"],
    max_guests: 6,
    bed_type: "3 King Beds",
    size_sqm: 250
  },
  {
    id: "room_3",
    name: "Garden View Room",
    type: "garden_view_room",
    description: "Serene views of our lush tropical gardens.",
    detailed_description: "Relax amidst nature in our Garden View Room. The floor-to-ceiling windows open up to our award-winning tropical gardens.",
    price_per_night: 280,
    images: ["https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=1200&q=80"],
    features: ["Garden View", "Rain Shower"],
    amenities: ["Coffee Maker", "Safe", "Work Desk"],
    max_guests: 2,
    bed_type: "Queen Bed",
    size_sqm: 40
  }
];