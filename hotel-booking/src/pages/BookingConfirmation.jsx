import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { createPageUrl } from "@/lib/utils";

export default function BookingConfirmation() {
  const [searchParams] = useSearchParams();
  return (
    <div className="min-h-screen pt-24 text-center container mx-auto px-6">
      <h1 className="text-4xl font-serif text-green-600 mb-4">Confirmed!</h1>
      <p className="text-xl mb-8">Reference: {searchParams.get("conf")} | Total: ${searchParams.get("total")}</p>
      <Link to={createPageUrl("Home")}><Button>Return Home</Button></Link>
    </div>
  );
}