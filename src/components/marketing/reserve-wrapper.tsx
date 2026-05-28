"use client";

import { useState, useEffect } from "react";
import BookingModal from "./booking-modal";

export default function ReserveWrapper() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-booking", handler);
    return () => window.removeEventListener("open-booking", handler);
  }, []);

  return (
    <BookingModal open={open} onClose={() => setOpen(false)} />
  );
}
