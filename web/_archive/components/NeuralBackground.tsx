import React from "react";

export default function NeuralBackground() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(circle at top, rgba(56,189,248,0.18), transparent 55%), radial-gradient(circle at bottom, rgba(168,85,247,0.18), transparent 60%)",
        opacity: 0.9,
        pointerEvents: "none",
        zIndex: -1,
      }}
    />
  );
}
