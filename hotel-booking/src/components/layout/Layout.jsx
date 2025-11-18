import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/lib/utils";
import { Menu, X, User, LogOut, Home, Bed, Phone, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MOCK_USER } from "@/data/hotelData";

export default function Layout({ children }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = MOCK_USER; 
  const location = useLocation();

  // Check scroll position for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Helper for navbar text color based on scroll state
  const navTextColor = scrolled ? "text-[#0A1628]" : "text-white";
  const navHoverColor = "hover:text-[#C9A961]";

  const navLinks = [
    { name: "Home", path: createPageUrl("Home"), icon: Home },
    { name: "Rooms & Suites", path: createPageUrl("Home") + "#rooms", icon: Bed },
    { name: "Contact", path: createPageUrl("Contact"), icon: Phone },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <style>{`
        .luxury-gradient { background: linear-gradient(135deg, #0A1628 0%, #1E3A5F 100%); }
        .gold-accent { color: #C9A961; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Lato', sans-serif; }
      `}</style>

      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-sm shadow-lg py-3"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to={createPageUrl("Home")} className="flex items-center space-x-2">
              <div className="text-2xl lg:text-3xl font-serif font-bold">
                <span className={navTextColor}>The Seraphina</span>
                <span className="gold-accent"> Estate</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  className={`font-sans text-sm tracking-wide transition-colors ${navHoverColor} ${navTextColor}`}
                >
                  {link.name}
                </a>
              ))}

              {user ? (
                <Link to={createPageUrl("Dashboard")}>
                    <Button
                      variant="ghost"
                      className={`flex items-center space-x-2 ${navTextColor} ${navHoverColor}`}
                    >
                      <User className="w-5 h-5" />
                      <span>{user.full_name}</span>
                    </Button>
                </Link>
              ) : (
                <Button className="bg-[#C9A961] hover:bg-[#B89751] text-white font-sans tracking-wide">
                  Sign In
                </Button>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className={navTextColor} />
              ) : (
                <Menu className={navTextColor} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white mt-4 py-6 px-6 space-y-4 shadow-xl absolute w-full">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className="block text-[#0A1628] hover:text-[#C9A961] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <Link
                to={createPageUrl("Dashboard")}
                className="block text-[#0A1628] hover:text-[#C9A961] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
            >
                My Dashboard
            </Link>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="luxury-gradient text-white py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <h3 className="text-2xl font-serif mb-4">The Seraphina <span className="gold-accent">Estate</span></h3>
              <p className="text-gray-300 text-sm leading-relaxed">An unforgettable experience of luxury, elegance, and impeccable service in the heart of paradise.</p>
            </div>
            <div>
              <h4 className="text-lg font-serif mb-4 gold-accent">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>+1 (555) 123-4567</li>
                <li>reservations@seraphinaestate.com</li>
                <li>123 Paradise Lane, Luxury Island</li>
              </ul>
            </div>
            {/* Add other footer columns if needed */}
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 The Seraphina Estate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}