"use client";

import { useEffect, useRef } from "react";

export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frameId: number;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const { innerWidth, innerHeight } = window;
      canvas.width = innerWidth * dpr;
      canvas.height = innerHeight * dpr;
      canvas.style.width = innerWidth + "px";
      canvas.style.height = innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    type Node = {
      baseY: number;
      offset: number;
      speed: number;
      phase: number;
    };

    const leftNodes: Node[] = [];
    const rightNodes: Node[] = [];
    const nodeCount = 70;

    for (let i = 0; i < nodeCount; i++) {
      const baseY = i / (nodeCount - 1);
      leftNodes.push({
        baseY,
        offset: Math.random() * 0.12 + 0.04,
        speed: 0.3 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2,
      });
      rightNodes.push({
        baseY,
        offset: Math.random() * 0.12 + 0.04,
        speed: 0.3 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const render = (time: number) => {
      const t = time / 1000;
      const { innerWidth: w, innerHeight: h } = window;

      ctx.clearRect(0, 0, w, h);

      // Fondo principale: nero / blu profondo
      const gradient = ctx.createRadialGradient(
        w * 0.2,
        h * 0.1,
        0,
        w * 0.5,
        h * 0.8,
        Math.max(w, h)
      );
      gradient.addColorStop(0, "rgba(56,189,248,0.15)");
      gradient.addColorStop(0.4, "rgba(16,185,129,0.14)");
      gradient.addColorStop(1, "rgba(0,0,0,1)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      // Linee diagonali molto leggere, stile exchange
      ctx.save();
      ctx.globalAlpha = 0.35;
      ctx.strokeStyle = "rgba(30,64,175,0.5)";
      ctx.lineWidth = 0.5;
      const step = 120;
      for (let x = -w; x < w * 2; x += step) {
        ctx.beginPath();
        ctx.moveTo(x + ((t * 20) % step), 0);
        ctx.lineTo(x - h + ((t * 20) % step), h);
        ctx.stroke();
      }
      ctx.restore();

      // Doppia elica tipo DNA in metallo luminoso
      ctx.save();
      ctx.globalAlpha = 0.9;

      const centerX = w * 0.58;
      const amplitude = Math.min(w, 900) * 0.12;

      for (let i = 0; i < nodeCount; i++) {
        const ln = leftNodes[i];
        const rn = rightNodes[i];

        const baseY = ln.baseY * h;
        const wave = Math.sin(t * ln.speed + ln.phase);

        const xLeft = centerX - amplitude - wave * 12;
        const xRight = centerX + amplitude + wave * 12;

        const yOffset = Math.sin(t * 1.2 + ln.phase) * ln.offset * h;
        const y = baseY + yOffset;

        const hue = 180 + Math.sin(t * 1.5 + i * 0.08) * 25;
        const lineColor = `hsla(${hue}, 75%, 60%, 0.55)`;
        const nodeColor = `hsla(${hue}, 100%, 75%, 0.95)`;

        // barre che uniscono i due filamenti
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 1.1;
        ctx.beginPath();
        ctx.moveTo(xLeft, y);
        ctx.lineTo(xRight, y);
        ctx.stroke();

        // nodi metallici
        const nodeRadius = 2.2 + (Math.sin(t * 2 + i * 0.12) + 1) * 0.8;
        ctx.fillStyle = nodeColor;
        ctx.beginPath();
        ctx.arc(xLeft, y, nodeRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(xRight, y, nodeRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();

      // Piccole particelle brillanti
      ctx.save();
      ctx.globalAlpha = 0.12;
      for (let i = 0; i < 130; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const r = Math.random() * 1.5;
        ctx.fillStyle =
          Math.random() > 0.5
            ? "rgba(148,163,184,0.45)"
            : "rgba(45,212,191,0.45)";
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      frameId = window.requestAnimationFrame(render);
    };

    frameId = window.requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 -z-20">
      <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-transparent to-black" />
    </div>
  );
}
