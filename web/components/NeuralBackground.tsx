"use client";

export default function NeuralBackground() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-black">
        {/* Glow principale verde */}
        <div
          className="absolute -left-40 top-[-10%] h-[380px] w-[380px] rounded-full opacity-60"
          style={{
            background:
              "radial-gradient(circle at 30% 20%, rgba(16,185,129,0.9), transparent 60%)",
            filter: "blur(40px)",
            animation: "neuralOrbit 40s linear infinite",
          }}
        />
        {/* Glow secondario azzurro */}
        <div
          className="absolute right-[-120px] top-[10%] h-[420px] w-[420px] rounded-full opacity-50"
          style={{
            background:
              "radial-gradient(circle at 70% 20%, rgba(56,189,248,0.8), transparent 60%)",
            filter: "blur(45px)",
            animation: "neuralOrbitReverse 50s linear infinite",
          }}
        />
        {/* Glow profondo sul fondo */}
        <div
          className="absolute left-1/2 top-[55%] h-[520px] w-[520px] -translate-x-1/2 rounded-full opacity-50"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(15,23,42,0.9), transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        {/* Griglia neurale animata */}
        <div
          className="absolute inset-[-50px] opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(148,163,184,0.55) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.4) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage:
              "radial-gradient(circle at top, black, transparent 60%)",
            WebkitMaskImage:
              "radial-gradient(circle at top, black, transparent 60%)",
            animation: "gridFlow 26s linear infinite",
          }}
        />

        {/* Linee neurali dinamiche */}
        <div className="absolute inset-0 opacity-60">
          <svg
            className="h-full w-full"
            viewBox="0 0 1440 900"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient
                id="neuralLine"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#22c55e" stopOpacity="0" />
                <stop offset="40%" stopColor="#22c55e" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
              </linearGradient>
            </defs>

            <path
              d="M -100 200 Q 200 160 450 220 T 950 200 T 1600 230"
              fill="none"
              stroke="url(#neuralLine)"
              strokeWidth="1.6"
              className="neural-line"
            />
            <path
              d="M -120 420 Q 260 440 520 360 T 980 380 T 1620 360"
              fill="none"
              stroke="url(#neuralLine)"
              strokeWidth="1.3"
              className="neural-line delay-1"
            />
            <path
              d="M -80 640 Q 260 590 520 670 T 980 640 T 1580 660"
              fill="none"
              stroke="url(#neuralLine)"
              strokeWidth="1.2"
              className="neural-line delay-2"
            />
          </svg>
        </div>
      </div>

      <style jsx global>{`
        @keyframes neuralOrbit {
          0% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
          50% {
            transform: translate3d(40px, -40px, 0) rotate(80deg);
          }
          100% {
            transform: translate3d(-20px, 20px, 0) rotate(160deg);
          }
        }

        @keyframes neuralOrbitReverse {
          0% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
          50% {
            transform: translate3d(-40px, 30px, 0) rotate(-90deg);
          }
          100% {
            transform: translate3d(20px, -20px, 0) rotate(-170deg);
          }
        }

        @keyframes gridFlow {
          0% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(-40px, -40px, 0);
          }
          100% {
            transform: translate3d(-80px, -10px, 0);
          }
        }

        @keyframes neuralStroke {
          0% {
            stroke-dashoffset: 320;
            opacity: 0.1;
          }
          40% {
            stroke-dashoffset: 140;
            opacity: 0.7;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 0.15;
          }
        }

        .neural-line {
          stroke-dasharray: 320;
          stroke-dashoffset: 320;
          animation: neuralStroke 9s ease-in-out infinite;
        }

        .neural-line.delay-1 {
          animation-delay: 1.4s;
        }

        .neural-line.delay-2 {
          animation-delay: 2.8s;
        }
      `}</style>
    </>
  );
}
