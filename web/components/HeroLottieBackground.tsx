"use client";

import Lottie from "lottie-react";

// Quando avrai il file JSON, lo salverai in public/animations/ai-network.json
// e cambierai la import qui sotto.
const placeholderAnimation = {};

export default function HeroLottieBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
      {/* Quando avrai il JSON reale, sostituisci 'placeholderAnimation' con 'animationData' */}
      {/* <Lottie animationData={animationData} loop autoplay className="w-[140%] h-[140%] opacity-45" /> */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(16,185,129,0.28),_transparent_60%),#020617]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(15,23,42,0.7),_transparent_55%)]" />
    </div>
  );
}
