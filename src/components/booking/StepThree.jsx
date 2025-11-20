import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

const availableAddOns = [
  { id: "airport_transfer", name: "Airport Transfer", price: 150 },
  { id: "breakfast", name: "Daily Breakfast", price: 45 },
];

export default function StepThree({ bookingData, setBookingData, onNext, onPrev }) {
  const toggleAddOn = (addOn) => {
    const exists = bookingData.addOns.find((a) => a.id === addOn.id);
    if (exists) setBookingData({ ...bookingData, addOns: bookingData.addOns.filter((a) => a.id !== addOn.id) });
    else setBookingData({ ...bookingData, addOns: [...bookingData.addOns, { id: addOn.id, name: addOn.name, price: addOn.price }] });
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-serif text-[#0A1628]">Enhance Stay</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {availableAddOns.map((addOn) => (
          <Card key={addOn.id} className={`p-6 cursor-pointer border-2 ${bookingData.addOns.some(a => a.id === addOn.id) ? "border-[#C9A961]" : "border-gray-200"}`} onClick={() => toggleAddOn(addOn)}>
            <div className="flex justify-between">
              <div><h3 className="font-serif text-lg">{addOn.name}</h3><p className="text-[#C9A961]">+${addOn.price}</p></div>
              {bookingData.addOns.some(a => a.id === addOn.id) && <Check className="text-[#C9A961]" />}
            </div>
          </Card>
        ))}
      </div>
      <div className="flex justify-between"><Button onClick={onPrev} variant="outline">Back</Button><Button onClick={onNext} className="bg-[#C9A961] hover:bg-[#B89751] text-white">Continue</Button></div>
    </div>
  );
}