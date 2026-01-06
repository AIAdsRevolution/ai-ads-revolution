"use client";
import { useEffect } from "react";
import { track } from "@/lib/track";

export default function ClientTracker() {
  useEffect(() => {
    track("page_view");
  }, []);
  return null;
}
