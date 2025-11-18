import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function createPageUrl(pageName) {
  // Simple routing map
  const routes = {
    "Home": "/",
    "RoomDetails": "/room",
    "BookingFlow": "/book",
    "BookingConfirmation": "/confirmation",
    "Dashboard": "/dashboard",
    "Contact": "/contact"
  };
  return routes[pageName] || "/";
}