'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const COLORS = ['#FF69B4', '#8B5CF6', '#06B6D4', '#22C55E', '#F59E0B', '#EC4899'];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  size: number;
  color: string;
}

/**
 * Petite explosion de confettis (canvas + RAF), jouée une fois puis démontée.
 * Respecte prefers-reduced-motion (ne s'affiche pas, appelle onDone aussitôt).
 */
export const Confetti = ({ onDone }: { onDone?: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      onDone?.();
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    const cx = W / 2;
    const cy = H * 0.4;
    const particles: Particle[] = Array.from({ length: 44 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 4 + Math.random() * 7;
      return {
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 4,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.3,
        size: 5 + Math.random() * 5,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      };
    });

    const start = performance.now();
    const DURATION = 1100;
    let raf = 0;

    const tick = (now: number) => {
      const t = now - start;
      ctx.clearRect(0, 0, W, H);
      const fade = Math.max(0, 1 - t / DURATION);
      particles.forEach((p) => {
        p.vy += 0.18; // gravité
        p.vx *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        ctx.save();
        ctx.globalAlpha = fade;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      });
      if (t < DURATION) {
        raf = requestAnimationFrame(tick);
      } else {
        onDone?.();
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [mounted, onDone]);

  if (!mounted) return null;

  return createPortal(
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9998]"
      style={{ width: '100vw', height: '100vh' }}
      aria-hidden
    />,
    document.body
  );
};
