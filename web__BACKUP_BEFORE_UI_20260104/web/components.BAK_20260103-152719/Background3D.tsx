"use client";

import { useEffect, useRef } from "react";

export default function Background3D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    let t = 0;

    const render = () => {
      t += 0.02;

      // Sfondo nero profondo
      ctx.fillStyle = "#020617";
      ctx.fillRect(0, 0, width, height);

      // Bagliore gradiente tipo exchange
      const gradient = ctx.createRadialGradient(
        width * 0.2,
        height * 0.1,
        0,
        width * 0.7,
        height * 0.9,
        width * 1.2
      );
      gradient.addColorStop(0, "rgba(16,185,129,0.35)");
      gradient.addColorStop(0.4, "rgba(15,23,42,0.95)");
      gradient.addColorStop(1, "rgba(2,6,23,1)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Griglia diagonale animata (stile Bitget)
      ctx.save();
      ctx.strokeStyle = "rgba(148,163,184,0.13)";
      ctx.lineWidth = 1;

      const spacing = 46;
      const offset = (t * 40) % spacing;

      for (let x = -width; x < width * 2; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x + offset, 0);
        ctx.lineTo(x - height + offset, height);
        ctx.stroke();
      }

      for (let x = -width; x < width * 2; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x - offset, 0);
        ctx.lineTo(x + height - offset, height);
        ctx.stroke();
      }
      ctx.restore();

      // DNA metallico / rete neurale al centro-destra
      const centerX = width * 0.68;
      const centerY = height * 0.5;
      const helixHeight = Math.min(height * 0.8, 600);
      const radius = 70;
      const turns = 3;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.globalAlpha = 0.95;

      // Glow dietro il DNA
      const dnaGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, radius * 2.2);
      dnaGlow.addColorStop(0, "rgba(45,212,191,0.15)");
      dnaGlow.addColorStop(1, "rgba(15,23,42,0)");
      ctx.fillStyle = dnaGlow;
      ctx.beginPath();
      ctx.arc(0, 0, radius * 2.3, 0, Math.PI * 2);
      ctx.fill();

      // Doppia elica
      for (let strand = 0; strand < 2; strand++) {
        ctx.beginPath();

        for (let y = -helixHeight / 2; y <= helixHeight / 2; y += 4) {
          const progress = (y + helixHeight / 2) / helixHeight;
          const baseAngle = progress * Math.PI * 2 * turns;
          const angle =
            baseAngle + t * (strand === 0 ? 1.1 : -1.1) + (strand === 0 ? 0 : Math.PI);

          const x = Math.cos(angle) * radius;
          const depth = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(angle));

          const r = strand === 0 ? 56 : 59;
          const g = strand === 0 ? 189 : 130;
          const b = strand === 0 ? 248 : 246;
          const alpha = 0.25 + depth * 0.75;

          ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
          ctx.lineWidth = 2 + depth * 1.3;

          if (y === -helixHeight / 2) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }

          // "legami" tra le due eliche (bastoncini)
          if (Math.abs(Math.sin(baseAngle * 2 + t * 1.5)) > 0.96 && y % 36 === 0) {
            const x2 = -x;
            ctx.save();
            ctx.strokeStyle = `rgba(148,163,184,${0.25 + depth * 0.4})`;
            ctx.lineWidth = 1.4;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x2, y);
            ctx.stroke();
            ctx.restore();
          }

          // punti luminosi
          if (Math.abs(Math.sin(angle * 0.7 + t * 2)) > 0.92 && y % 48 === 0) {
            ctx.save();
            ctx.fillStyle = `rgba(248,250,252,${0.4 + depth * 0.6})`;
            ctx.beginPath();
            ctx.arc(x, y, 2.4 + depth * 1.2, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        }

        ctx.stroke();
      }

      ctx.restore();

      frameId = window.requestAnimationFrame(render);
    };

    frameId = window.requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 -z-20">
      <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.28),_transparent_55%)] mix-blend-screen" />
    </div>
  );
}
