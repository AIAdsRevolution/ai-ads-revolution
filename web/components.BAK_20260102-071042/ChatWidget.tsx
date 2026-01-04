"use client";

export default function ChatWidget() {
  return (
    <div
      style={{
        position: "fixed",
        right: 18,
        bottom: 18,
        zIndex: 9999,
      }}
    >
      <button
        style={{
          width: 56,
          height: 56,
          borderRadius: 999,
          background: "linear-gradient(135deg,#2D6BFF,#6A5CFF)",
          color: "#fff",
          border: "1px solid rgba(255,255,255,.18)",
          fontWeight: 900,
          cursor: "pointer",
          boxShadow: "0 18px 50px rgba(0,0,0,.45)",
        }}
      >
        AI
      </button>
    </div>
  );
}
