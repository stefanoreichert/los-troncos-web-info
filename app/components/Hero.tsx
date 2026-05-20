"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, CalendarDays } from "lucide-react";

const FRAME_COUNT = 180;
const FRAME_PATH = "/frames/hamburguesa/frame_";
const FRAME_EXTENSION = ".webp";

function clamp(value: number, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max);
}

function frameUrl(index: number) {
  return `${FRAME_PATH}${String(index + 1).padStart(4, "0")}${FRAME_EXTENSION}`;
}

function drawCover(
  ctx: CanvasRenderingContext2D,
  source: HTMLImageElement | HTMLVideoElement,
  width: number,
  height: number
) {
  const sourceWidth =
    "videoWidth" in source ? source.videoWidth : source.width;
  const sourceHeight =
    "videoHeight" in source ? source.videoHeight : source.height;

  if (!sourceWidth || !sourceHeight) return;

  const scale = Math.max(width / sourceWidth, height / sourceHeight);
  const x = (width - sourceWidth * scale) / 2;
  const y = (height - sourceHeight * scale) / 2;

  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(source, x, y, sourceWidth * scale, sourceHeight * scale);
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const loadedFramesRef = useRef(0);
  const currentFrameRef = useRef(-1);
  const progressRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let raf = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.floor(window.innerWidth * dpr);
      height = Math.floor(window.innerHeight * dpr);
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      render(true);
    };

    const render = (force = false) => {
      const frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.floor(progressRef.current * (FRAME_COUNT - 1))
      );

      if (!force && frameIndex === currentFrameRef.current) return;
      currentFrameRef.current = frameIndex;

      const frame = framesRef.current[frameIndex];
      if (frame?.complete && frame.naturalWidth > 0) {
        drawCover(ctx, frame, width, height);
        return;
      }

      const nearestFrame = framesRef.current.find(
        (image) => image.complete && image.naturalWidth > 0
      );

      if (nearestFrame) {
        drawCover(ctx, nearestFrame, width, height);
        return;
      }

      const video = videoRef.current;
      if (video && video.readyState >= 2) {
        if (video.duration) {
          const targetTime = progressRef.current * video.duration;
          if (Math.abs(video.currentTime - targetTime) > 0.08) {
            video.currentTime = targetTime;
          }
        }
        drawCover(ctx, video, width, height);
      } else {
        const gradient = ctx.createRadialGradient(
          width / 2,
          height / 2,
          0,
          width / 2,
          height / 2,
          width / 1.2
        );
        gradient.addColorStop(0, "#2a1209");
        gradient.addColorStop(0.45, "#100907");
        gradient.addColorStop(1, "#050403");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }
    };

    const updateProgress = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      progressRef.current = clamp(-rect.top / scrollable);
      raf = requestAnimationFrame(() => render());
    };

    const frames = Array.from({ length: FRAME_COUNT }, (_, index) => {
      const image = new Image();
      image.decoding = "async";
      image.src = frameUrl(index);
      image.onload = () => {
        loadedFramesRef.current += 1;
        if (loadedFramesRef.current === 1) render(true);
      };
      return image;
    });

    framesRef.current = frames;
    resize();
    updateProgress();

    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("scroll", updateProgress, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", updateProgress);
    };
  }, []);

  const scrollTo = (selector: string) => {
    document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="relative h-[540vh] bg-[#050403]"
      aria-label="Hamburguesa cinematografica Los Troncos"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full bg-[#050403]"
        />
        <video
          ref={videoRef}
          src="/imagenes/hamburguesa.mp4"
          muted
          playsInline
          preload="auto"
          className="hidden"
        />

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,transparent_0%,rgba(5,4,3,0.08)_28%,rgba(5,4,3,0.82)_78%),linear-gradient(180deg,rgba(5,4,3,0.35)_0%,rgba(5,4,3,0.05)_38%,rgba(5,4,3,0.92)_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(5,4,3,0.86),transparent_38%,transparent_62%,rgba(5,4,3,0.76))]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050403] to-transparent" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-20 pt-28 sm:px-8 lg:pb-24">
          <div className="max-w-4xl">
            <p className="mb-5 inline-flex rounded-full border border-[#ffb36b]/20 bg-[#100b08]/42 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#ffb36b] backdrop-blur-xl sm:text-xs">
              Los Troncos Signature Burger
            </p>
            <h1 className="font-[family-name:var(--font-playfair)] text-[clamp(3.4rem,11vw,9rem)] font-semibold leading-[0.84] text-[#fff8ee] drop-shadow-[0_24px_80px_rgba(0,0,0,0.72)]">
              La hamburguesa que redefine el sabor
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-[#fff4e3]/72 sm:text-lg md:text-xl">
              Una experiencia visual y gastronomica intensa: fuego, textura,
              ingredientes suspendidos y sabor de resto bar elevado a otro
              nivel.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => scrollTo("#menu")}
                className="group inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#f08a3c] px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#130a05] shadow-[0_22px_70px_rgba(240,138,60,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ffb36b]"
              >
                Ver Menu
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
              <button
                onClick={() => scrollTo("#reservar")}
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-[#fff4e3]/18 bg-[#100b08]/38 px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#fff8ee] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-[#ffb36b]/55 hover:bg-[#fff4e3]/8"
              >
                <CalendarDays size={18} />
                Reservar Mesa
              </button>
            </div>
          </div>

          <div className="mt-12 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
            {["Canvas fullscreen", "Scroll frame-by-frame", "Burger cinematic"].map(
              (item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-[#fff4e3]/8 bg-[#100b08]/34 px-4 py-3 text-center text-[10px] uppercase tracking-[0.18em] text-[#fff4e3]/48 backdrop-blur-xl"
                >
                  {item}
                </div>
              )
            )}
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-7 left-1/2 z-20 h-16 w-px -translate-x-1/2 overflow-hidden rounded-full bg-[#fff4e3]/12">
          <div className="h-1/2 w-full animate-[scrollLine_1.8s_ease-in-out_infinite] bg-[#ffb36b]" />
        </div>
      </div>
    </section>
  );
}
