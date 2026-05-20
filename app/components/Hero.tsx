"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, CalendarDays } from "lucide-react";

const TOTAL_FRAMES = 192;
const NATIVE_W = 1920;
const NATIVE_H = 1080;
const FRAMES_DIR = "/frames/hamburguesa/";
const pad = (value: number) => String(value).padStart(4, "0");

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const [loadProgress, setLoadProgress] = useState(0);
  const [loaderHidden, setLoaderHidden] = useState(false);
  const [framesAvailable, setFramesAvailable] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    const hint = hintRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;
    const canvasEl = canvas;
    const sectionEl = section;
    const ctxEl = ctx;

    let dpr = 1;
    let vpW = 0;
    let vpH = 0;
    let sectionTop = 0;
    let scrollRange = 1;
    let currentIdx = -1;
    let rafPending = false;
    let nextIdx = 0;
    let usableFrames = 0;

    function sizeCanvas() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      vpW = window.innerWidth;
      vpH = window.innerHeight;
      canvasEl.style.width = `${vpW}px`;
      canvasEl.style.height = `${vpH}px`;
      canvasEl.width = Math.round(vpW * dpr);
      canvasEl.height = Math.round(vpH * dpr);
      ctxEl.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function drawCover(img: HTMLImageElement) {
      if (!img || !img.naturalWidth) return;

      const imgW = img.naturalWidth || NATIVE_W;
      const imgH = img.naturalHeight || NATIVE_H;
      const imgAspect = imgW / imgH;
      const canvasAspect = vpW / vpH;

      let srcX = 0;
      let srcY = 0;
      let srcW = imgW;
      let srcH = imgH;

      if (canvasAspect > imgAspect) {
        srcH = imgW / canvasAspect;
        srcY = (imgH - srcH) / 2;
      } else {
        srcW = imgH * canvasAspect;
        srcX = (imgW - srcW) / 2;
      }

      ctxEl.clearRect(0, 0, vpW, vpH);
      ctxEl.drawImage(img, srcX, srcY, srcW, srcH, 0, 0, vpW, vpH);
    }

    function draw(idx: number) {
      if (idx === currentIdx) return;
      currentIdx = idx;
      const frame = framesRef.current[idx];
      if (frame?.naturalWidth) drawCover(frame);
    }

    function updateMetrics() {
      sectionTop = sectionEl.offsetTop;
      scrollRange = Math.max(1, sectionEl.offsetHeight - window.innerHeight);
    }

    function onScroll() {
      const scrolled = window.scrollY - sectionTop;
      const progress = Math.max(0, Math.min(1, scrolled / scrollRange));
      nextIdx = Math.min(TOTAL_FRAMES - 1, Math.floor(progress * TOTAL_FRAMES));

      if (scrolled > 20) hint?.classList.add("opacity-0");

      if (!rafPending) {
        rafPending = true;
        requestAnimationFrame(() => {
          draw(nextIdx);
          rafPending = false;
        });
      }
    }

    function preload() {
      return new Promise<void>((resolve) => {
        let loadedCount = 0;

        for (let i = 0; i < TOTAL_FRAMES; i += 1) {
          const img = new Image();

          img.onload = () => {
            usableFrames += 1;
            loadedCount += 1;
            setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
            if (loadedCount === TOTAL_FRAMES) resolve();
          };

          img.onerror = () => {
            loadedCount += 1;
            setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
            if (loadedCount === TOTAL_FRAMES) resolve();
          };

          img.src = `${FRAMES_DIR}frame_${pad(i + 1)}.jpg`;
          framesRef.current[i] = img;
        }
      });
    }

    sizeCanvas();

    preload().then(() => {
      updateMetrics();

      if (usableFrames > 0) {
        setFramesAvailable(true);
        currentIdx = -1;
        draw(0);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
      }

      setLoaderHidden(true);
    });

    const onResize = () => {
      sizeCanvas();
      updateMetrics();
      const saved = currentIdx < 0 ? 0 : currentIdx;
      currentIdx = -1;
      if (usableFrames > 0) draw(saved);
    };

    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollTo = (selector: string) => {
    document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="relative h-[600vh] bg-[#050403]"
      aria-label="Animacion cinematografica de hamburguesa Los Troncos"
    >
      <div className="sticky top-0 h-screen w-screen overflow-hidden">
        <video
          ref={videoRef}
          src="/imagenes/hamburguesa.mp4"
          muted
          autoPlay
          loop
          playsInline
          preload="auto"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            framesAvailable ? "opacity-0" : "opacity-100"
          }`}
        />
        <canvas
          ref={canvasRef}
          className={`absolute left-0 top-0 h-full w-full transition-opacity duration-700 ${
            framesAvailable ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,transparent_0%,rgba(5,4,3,0.12)_30%,rgba(5,4,3,0.86)_82%),linear-gradient(180deg,rgba(5,4,3,0.32)_0%,rgba(5,4,3,0.04)_44%,rgba(5,4,3,0.92)_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(5,4,3,0.88),rgba(5,4,3,0.2)_34%,transparent_58%,rgba(5,4,3,0.78))]" />

        <div
          className={`fixed inset-0 z-[70] flex items-center justify-center bg-[#050403] transition-opacity duration-700 ${
            loaderHidden ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <div className="w-[min(420px,80vw)] text-center">
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.34em] text-[#ffb36b]">
              Cargando experiencia
            </p>
            <div className="h-1 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-[#ffb36b] transition-all duration-200"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
            <p className="mt-4 text-xs font-semibold tracking-[0.22em] text-[#fff4e3]/60">
              {loadProgress}%
            </p>
          </div>
        </div>

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-16 pt-28 sm:px-8 lg:pb-24">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex rounded-full border border-[#ffb36b]/20 bg-[#100b08]/42 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#ffb36b] backdrop-blur-xl sm:text-xs">
              Los Troncos Signature Burger
            </p>
            <h1 className="font-[family-name:var(--font-playfair)] text-[clamp(3.1rem,9vw,7.4rem)] font-semibold leading-[0.88] text-[#fff8ee] drop-shadow-[0_24px_80px_rgba(0,0,0,0.72)]">
              La hamburguesa que redefine el sabor
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-[#fff4e3]/72 sm:text-lg md:text-xl">
              Carne jugosa, queso fundido, pan dorado y el caracter nocturno
              de Los Troncos en una experiencia pensada para antojar desde el
              primer segundo.
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
        </div>

        <div
          ref={hintRef}
          className="pointer-events-none absolute bottom-7 left-1/2 z-20 h-16 w-px -translate-x-1/2 overflow-hidden rounded-full bg-[#fff4e3]/12 transition-opacity duration-500"
        >
          <div className="h-1/2 w-full animate-[scrollLine_1.8s_ease-in-out_infinite] bg-[#ffb36b]" />
        </div>
      </div>
    </section>
  );
}
