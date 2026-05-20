"use client";

import { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 61;
const FRAMES_DIR = "/frames/hamburguesa/";
const pad = (n: number) => String(n).padStart(4, "0");

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const [loadProgress, setLoadProgress] = useState(0);
  const [loaderHidden, setLoaderHidden] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Alias non-null refs for use inside closures
    const cvs = canvas as HTMLCanvasElement;
    const sec = section as HTMLElement;
    const cx = ctx as CanvasRenderingContext2D;
    let dpr = 1, vpW = 0, vpH = 0;
    let sectionTop = 0, scrollRange = 1;
    let usableFrames = 0;
    let currentIdx = -1;
    let rafId = 0;
    // video-mode
    let useVideoMode = false;
    let pendingSeek = false;
    let targetTime = 0;
    let videoReady = false;

    // ─── Canvas sizing ────────────────────────────────────────────────────
    function sizeCanvas() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      vpW = window.innerWidth;
      vpH = window.innerHeight;
      cvs.style.width = `${vpW}px`;
      cvs.style.height = `${vpH}px`;
      cvs.width = Math.round(vpW * dpr);
      cvs.height = Math.round(vpH * dpr);
      cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // ─── Contain draw (imagen completa con su fondo, centrada) ───────────────
    function drawCover(src: HTMLImageElement | HTMLVideoElement) {
      const srcW = src instanceof HTMLVideoElement ? src.videoWidth : src.naturalWidth;
      const srcH = src instanceof HTMLVideoElement ? src.videoHeight : src.naturalHeight;
      if (!srcW || !srcH) return;

      // contain: escala para que quepa completa, centrada
      const ia = srcW / srcH;
      const ca = vpW / vpH;
      let dw, dh;
      if (ia > ca) { dw = vpW; dh = vpW / ia; }
      else          { dh = vpH; dw = vpH * ia; }
      const dx = (vpW - dw) / 2;
      const dy = (vpH - dh) / 2;

      cx.clearRect(0, 0, vpW, vpH);
      cx.fillStyle = "#050403";
      cx.fillRect(0, 0, vpW, vpH);
      cx.drawImage(src, 0, 0, srcW, srcH, dx, dy, dw, dh);
    }

    // ─── Logo overlay (source-over, siempre visible sobre la imagen) ─────────
    function drawLogoOverlay() {
      const p = getProgress();
      const alpha = Math.max(0.02, 0.52 - p * 0.52); // sutil al inicio, desaparece al scrollear
      const fontSize = Math.max(28, Math.round(vpW * 0.13));
      const subSize = Math.max(8, Math.round(fontSize * 0.085));
      cx.save();
      cx.globalCompositeOperation = "source-over";
      cx.textAlign = "center";
      cx.textBaseline = "middle";
      // Sombra sutil para dar profundidad
      cx.shadowColor = "rgba(0,0,0,0.7)";
      cx.shadowBlur = fontSize * 0.4;
      cx.fillStyle = `rgba(255, 179, 107, ${alpha})`;
      cx.font = `bold ${fontSize}px "Playfair Display", Georgia, serif`;
      cx.fillText("LOS TRONCOS", vpW / 2, vpH / 2);
      cx.shadowBlur = subSize * 2;
      cx.fillStyle = `rgba(255, 179, 107, ${alpha * 0.65})`;
      cx.font = `bold ${subSize}px Arial, sans-serif`;
      cx.fillText("R E S T O   B A R", vpW / 2, vpH / 2 + fontSize * 0.80);
      cx.restore();
    }

    // ─── Frame-mode draw ──────────────────────────────────────────────────
    function drawFrame(idx: number) {
      currentIdx = idx;
      const f = framesRef.current[idx];
      if (f?.naturalWidth) { drawCover(f); drawLogoOverlay(); }
    }

    function updateMetrics() {
      const rect = sec.getBoundingClientRect();
      sectionTop = rect.top + window.scrollY;
      scrollRange = Math.max(1, sec.offsetHeight - window.innerHeight);
    }

    function getProgress() {
      return Math.max(0, Math.min(1, (window.scrollY - sectionTop) / scrollRange));
    }

    // ─── Video-mode: rAF loop ─────────────────────────────────────────────
    function videoLoop() {
      if (videoReady) { drawCover(video!); drawLogoOverlay(); }
      rafId = requestAnimationFrame(videoLoop);
    }

    // ─── Video-mode: seek on scroll ───────────────────────────────────────
    function onSeeked() {
      videoReady = true;
      if (pendingSeek) {
        pendingSeek = false;
        if (Math.abs((video!.currentTime || 0) - targetTime) > 0.04) {
          pendingSeek = true;
          video!.currentTime = targetTime;
        }
      }
    }

    // ─── Scroll handler ───────────────────────────────────────────────────
    function onScroll() {
      updateMetrics();
      const p = getProgress();

      if (useVideoMode && video) {
        targetTime = p * (video.duration || 1);
        if (!pendingSeek) {
          pendingSeek = true;
          video.currentTime = targetTime;
        }
        return;
      }

      // frame mode
      const idx = Math.min(usableFrames - 1, Math.floor(p * usableFrames));
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => drawFrame(idx));
    }

    // ─── Preload frames (probe first frame before loading all) ────────────
    async function tryFrames(): Promise<number> {
      // probe first frame
      const probe = new Image();
      const probeOk = await new Promise<boolean>((res) => {
        probe.onload = () => res(true);
        probe.onerror = () => res(false);
        probe.src = `${FRAMES_DIR}frame_0001.jpg`;
      });
      if (!probeOk) return 0;

      return new Promise<number>((resolve) => {
        let done = 0, loaded = 0;
        const imgs: HTMLImageElement[] = [];

        for (let i = 0; i < TOTAL_FRAMES; i++) {
          const img = new Image();
          img.onload = () => {
            loaded++;
            done++;
            setLoadProgress(Math.round((done / TOTAL_FRAMES) * 100));
            if (done === TOTAL_FRAMES) resolve(loaded);
          };
          img.onerror = () => {
            done++;
            setLoadProgress(Math.round((done / TOTAL_FRAMES) * 100));
            if (done === TOTAL_FRAMES) resolve(loaded);
          };
          img.src = `${FRAMES_DIR}frame_${pad(i + 1)}.jpg`;
          imgs[i] = img;
        }
        framesRef.current = imgs;
      });
    }

    // ─── Bootstrap ────────────────────────────────────────────────────────
    sizeCanvas();
    updateMetrics();

    // Draw black frame while loading
    cx.fillStyle = "#050403";
    cx.fillRect(0, 0, vpW, vpH);

    tryFrames().then((loaded) => {
      updateMetrics();

      if (loaded > 10) {
        // ── Frame mode ──
        usableFrames = loaded;
        drawFrame(0);
        window.addEventListener("scroll", onScroll, { passive: true });
      } else if (video) {
        // ── Video currentTime mode ──
        useVideoMode = true;
        video.src = "/imagenes/hamburguesa.mp4";
        video.load();
        video.addEventListener("seeked", onSeeked);
        video.addEventListener("loadeddata", () => {
          videoReady = true;
          video.currentTime = 0;
          videoLoop();
          window.addEventListener("scroll", onScroll, { passive: true });
        });
      }

      setReady(true);
      // Fade out loader after 300ms extra for smoothness
      setTimeout(() => setLoaderHidden(true), 300);
    });

    const onResize = () => {
      sizeCanvas();
      updateMetrics();
      if (useVideoMode && videoReady) drawCover(video!);
      else if (currentIdx >= 0) { const s = currentIdx; currentIdx = -1; drawFrame(s); }
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
      video?.removeEventListener("seeked", onSeeked);
    };
  }, []);

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="relative h-[220vh] bg-[#050403]"
      aria-label="Animacion cinematografica de hamburguesa Los Troncos"
    >
      {/* ── Sticky viewport ──────────────────────────────────────────── */}
      <div className="sticky top-0 h-screen w-screen overflow-hidden">

        {/* Hidden video element used for currentTime control */}
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          className="sr-only"
        />

        {/* Main canvas */}
        <canvas
          ref={canvasRef}
          className={`absolute left-0 top-0 transition-opacity duration-1000 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Cinematic vignette — radial */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_40%,transparent_30%,rgba(5,4,3,0.55)_70%,rgba(5,4,3,0.92)_100%)]" />
        {/* Bottom fade into next section */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#050403] to-transparent" />
        {/* Top fade (for navbar) */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#050403]/60 to-transparent" />

        {/* Scroll indicator */}
        <div
          className={`pointer-events-none absolute bottom-8 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-700 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="text-[9px] font-bold uppercase tracking-[0.38em] text-[#fff4e3]/40">
            Scroll
          </span>
          <div className="h-14 w-px overflow-hidden bg-[#fff4e3]/12">
            <div className="h-1/2 w-full animate-[scrollLine_1.8s_ease-in-out_infinite] bg-[#ffb36b]/70" />
          </div>
        </div>
      </div>

      {/* ── Loader ───────────────────────────────────────────────────── */}
      <div
        className={`fixed inset-0 z-[70] flex flex-col items-center justify-center bg-[#050403] transition-opacity duration-700 ${
          loaderHidden ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <p className="font-[family-name:var(--font-playfair)] text-[28px] font-semibold tracking-wide text-[#fff8ee]">
          Los Troncos
        </p>
        <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.46em] text-[#ffb36b]/80">
          Resto Bar
        </p>
        <div className="mt-10 h-px w-[min(320px,70vw)] overflow-hidden bg-white/[0.08]">
          <div
            className="h-full bg-[#ffb36b] transition-all duration-200"
            style={{ width: `${loadProgress}%` }}
          />
        </div>
      </div>
    </section>
  );
}

