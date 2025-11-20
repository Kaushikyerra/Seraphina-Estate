const API_BASE_URL = "http://localhost:5000/api";

export const apiClient = {
  getRooms: async () => {
    const res = await fetch(`${API_BASE_URL}/rooms`);
    if (!res.ok) throw new Error("Failed to fetch rooms");
    return res.json();
  },
  getRoom: async (id) => {
    const res = await fetch(`${API_BASE_URL}/rooms/${id}`);
    if (!res.ok) throw new Error("Failed to fetch room");
    return res.json();
  },
  createBooking: async (bookingData) => {
    const res = await fetch(`${API_BASE_URL}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData),
    });
    if (!res.ok) throw new Error("Booking failed");
    return res.json();
  },
  getBookings: async (email) => {
    const res = await fetch(`${API_BASE_URL}/bookings?email=${email}`);
    if (!res.ok) throw new Error("Failed to fetch bookings");
    return res.json();
  },
  seedDB: async () => {
     await fetch(`${API_BASE_URL}/seed`, { method: "POST" });
     alert("Database Seeded!");
     window.location.reload();
  }
};