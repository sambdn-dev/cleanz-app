'use client';

import { useState, useEffect, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Home, Zap, Sparkles, FlaskConical, Heart } from 'lucide-react';

export type NavTab = 'Accueil' | 'Appareils' | 'Astuces' | 'Ingrédients' | 'Favoris';

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

const navItems: { icon: typeof Home; label: NavTab }[] = [
  { icon: Home, label: 'Accueil' },
  { icon: Zap, label: 'Appareils' },
  { icon: Sparkles, label: 'Astuces' },
  { icon: FlaskConical, label: 'Ingrédients' },
  { icon: Heart, label: 'Favoris' },
];

export const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  const { theme, darkMode } = useTheme();
  // shrink: continuous 0 (expanded) -> 1 (compact), with spring physics
  const [shrink, setShrink] = useState(0);
  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const velocityRef = useRef(0);
  const lastY = useRef(0);
  const lastTime = useRef(Date.now());
  const rafRef = useRef<number | null>(null);

  // Instagram-style spring physics animation
  useEffect(() => {
    const SPRING_STIFFNESS = 0.08;  // How fast it moves toward target
    const SPRING_DAMPING = 0.75;    // How much it bounces (lower = more bounce)
    const VELOCITY_THRESHOLD = 0.8; // Scroll velocity needed to trigger state change
    const SETTLE_THRESHOLD = 0.002; // When to stop animating

    let animating = false;

    const animate = () => {
      const target = targetRef.current;
      const current = currentRef.current;
      const diff = target - current;

      // Spring physics
      velocityRef.current += diff * SPRING_STIFFNESS;
      velocityRef.current *= SPRING_DAMPING;
      currentRef.current += velocityRef.current;

      // Clamp to valid range
      currentRef.current = Math.min(1, Math.max(0, currentRef.current));

      setShrink(currentRef.current);

      // Keep animating if not settled
      if (Math.abs(diff) > SETTLE_THRESHOLD || Math.abs(velocityRef.current) > SETTLE_THRESHOLD) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        currentRef.current = target;
        setShrink(target);
        animating = false;
        rafRef.current = null;
      }
    };

    const startAnimation = () => {
      if (!animating) {
        animating = true;
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    const onScroll = () => {
      const y = window.scrollY;
      const now = Date.now();
      const dt = Math.max(1, now - lastTime.current);
      const delta = y - lastY.current;
      const scrollVelocity = delta / dt * 16; // Normalize to ~60fps

      lastY.current = y;
      lastTime.current = now;

      // At top of page: always expanded
      if (y < 30) {
        targetRef.current = 0;
      }
      // Scrolling down fast: go compact
      else if (scrollVelocity > VELOCITY_THRESHOLD) {
        targetRef.current = 1;
      }
      // Scrolling up fast: expand
      else if (scrollVelocity < -VELOCITY_THRESHOLD) {
        targetRef.current = 0;
      }
      // Slow scroll: gentle push toward target based on direction
      else if (delta > 0) {
        targetRef.current = Math.min(1, targetRef.current + 0.15);
      } else if (delta < 0) {
        targetRef.current = Math.max(0, targetRef.current - 0.15);
      }

      startAnimation();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Interpolate sizes from the continuous shrink value
  const lerp = (from: number, to: number) => from + (to - from) * shrink;
  const btnSize = lerp(52, 40);
  const iconSize = lerp(23, 20);
  const radius = lerp(20, 16);
  const compact = shrink > 0.5;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
      {/* Progressive frosted-blur zone behind the bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-36"
        style={{
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          maskImage: 'linear-gradient(to top, black 35%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to top, black 35%, transparent 100%)',
        }}
      />
      {/* Soft color fade on top of the blur for extra separation */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: darkMode
            ? 'linear-gradient(to top, rgba(13,12,20,0.55) 0%, transparent 100%)'
            : 'linear-gradient(to top, rgba(255,255,255,0.55) 0%, transparent 100%)',
        }}
      />

      {/* Floating pill */}
      <nav
        className="pointer-events-auto absolute left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-[30px] will-change-transform"
        style={{
          bottom: `calc(env(safe-area-inset-bottom) + ${lerp(16, 12)}px)`,
          padding: `${lerp(8, 6)}px ${lerp(10, 8)}px`,
          transition: 'box-shadow 0.3s ease',
          background: darkMode ? 'rgba(24,18,36,0.78)' : 'rgba(255,255,255,0.55)',
          backdropFilter: 'blur(44px) saturate(200%)',
          WebkitBackdropFilter: 'blur(44px) saturate(200%)',
          border: `1.5px solid ${darkMode ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.95)'}`,
          boxShadow: darkMode
            ? '0 18px 50px rgba(0,0,0,0.55), 0 4px 14px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.10)'
            : '0 20px 55px rgba(149,108,180,0.35), 0 6px 18px rgba(149,108,180,0.18), inset 0 1px 0 rgba(255,255,255,1)',
        }}
      >
        {navItems.map((item) => {
          const isActive = activeTab === item.label;
          const isFavoris = item.label === 'Favoris';
          const Icon = item.icon;
          const activeColor = isFavoris ? '#EC4899' : theme.accentPink;

          return (
            <button
              key={item.label}
              onClick={() => onTabChange(item.label)}
              aria-label={item.label}
              className="relative flex items-center justify-center active:scale-90"
              style={{
                width: btnSize,
                height: btnSize,
                borderRadius: radius,
              }}
            >
              {/* Active highlight */}
              <span
                className="absolute inset-0 transition-all duration-300"
                style={{
                  borderRadius: radius,
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? 'scale(1)' : 'scale(0.6)',
                  background: darkMode
                    ? 'linear-gradient(135deg, rgba(255,133,192,0.22) 0%, rgba(94,234,212,0.18) 100%)'
                    : 'linear-gradient(135deg, rgba(255,105,180,0.16) 0%, rgba(79,209,197,0.14) 100%)',
                  boxShadow: isActive
                    ? `inset 0 0 0 1px ${darkMode ? 'rgba(255,133,192,0.35)' : 'rgba(255,105,180,0.28)'}`
                    : 'none',
                }}
              />
              <Icon
                className="relative"
                style={{
                  width: iconSize,
                  height: iconSize,
                  color: isActive ? activeColor : theme.textMuted,
                  transition: 'color 0.3s',
                }}
                strokeWidth={isActive ? 2.5 : 2}
                fill={isActive && isFavoris ? 'currentColor' : 'none'}
              />
              {/* Active dot indicator */}
              <span
                className="absolute bottom-1 w-1 h-1 rounded-full transition-all duration-300"
                style={{
                  opacity: isActive && !compact ? 1 : 0,
                  background: activeColor,
                }}
              />
            </button>
          );
        })}
      </nav>
    </div>
  );
};
