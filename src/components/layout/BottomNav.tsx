'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Home, Zap, BookOpen, Wrench, CalendarDays } from 'lucide-react';
import { haptic } from '@/utils/haptics';

export type NavTab = 'Accueil' | 'Planning' | 'Appareils' | 'Recettes' | 'Matériel';

interface BottomNavProps {
  activeTab: NavTab | null;
  onTabChange: (tab: NavTab) => void;
}

const navItems: { icon: typeof Home; label: NavTab }[] = [
  { icon: Home, label: 'Accueil' },
  { icon: CalendarDays, label: 'Planning' },
  { icon: Zap, label: 'Appareils' },
  { icon: BookOpen, label: 'Recettes' },
  { icon: Wrench, label: 'Matériel' },
];

export const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  const { theme, darkMode } = useTheme();
  const [compact, setCompact] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const maxScroll = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    let previousMax = maxScroll();
    let previous = Math.max(0, Math.min(window.scrollY, previousMax));
    let distance = 0;
    let direction = 0;
    let nextCompact = false;
    let frame = 0;
    const schedule = (value: boolean) => {
      nextCompact = value;
      if (!frame) frame = requestAnimationFrame(() => { frame = 0; setCompact(nextCompact); });
    };
    schedule(false);

    const onScroll = () => {
      // Capture the scroll event before lazy sections change the document size.
      const maximum = maxScroll();
      const position = Math.max(0, Math.min(window.scrollY, maximum));
      const delta = position - previous;
      const sizeChange = maximum - previousMax;
      previous = position;
      previousMax = maximum;
      // Ignore rubber-banding and keep names visible when using the keyboard.
      if (position <= 24 || navRef.current?.querySelector(':focus-visible')) {
        distance = 0;
        direction = 0;
        schedule(false);
        return;
      }
      // Browser anchoring after a lazy section loads is not a change of intent.
      if ((delta < 0 && sizeChange < 0) || (sizeChange !== 0 && Math.abs(delta - sizeChange) < 2)) return;
      if (Math.abs(delta) < .01) return;
      const nextDirection = Math.sign(delta);
      if (nextDirection !== direction) distance = 0;
      direction = nextDirection;
      distance += Math.abs(delta);
      // Hysteresis avoids flicker from small reversals during touch scrolling.
      if (distance >= (direction > 0 ? 28 : 18)) {
        schedule(direction > 0);
        distance = 0;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, [activeTab]);

  return (
    <div className="cleanz-bottom-nav fixed bottom-0 left-0 right-0 z-50 pointer-events-none" data-compact={compact}>
      <div
        className="cleanz-nav-backdrop absolute bottom-0 left-0 right-0"
        style={{
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          maskImage: 'linear-gradient(to top, black 35%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to top, black 35%, transparent 100%)',
          background: darkMode
            ? 'linear-gradient(to top, rgba(13,12,20,0.55), transparent)'
            : 'linear-gradient(to top, rgba(255,255,255,0.55), transparent)',
        }}
      />
      <nav
        ref={navRef}
        aria-label="Navigation principale"
        className="pointer-events-auto absolute left-1/2 -translate-x-1/2 flex items-center rounded-[24px]"
        onFocus={(event) => { if (event.target.matches(':focus-visible')) setCompact(false); }}
        style={{
          width: 'calc(100vw - 24px)',
          maxWidth: 430,
          bottom: 'max(10px, env(safe-area-inset-bottom, 0px))',
          padding: 4,
          gap: 2,
          background: darkMode ? 'rgba(24,18,36,0.88)' : 'rgba(255,255,255,0.82)',
          border: `1px solid ${theme.borderLight}`,
          backdropFilter: 'blur(44px) saturate(180%)',
          WebkitBackdropFilter: 'blur(44px) saturate(180%)',
          boxShadow: darkMode
            ? '0 12px 35px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)'
            : '0 12px 35px rgba(149,108,180,0.22), inset 0 1px 0 rgba(255,255,255,1)',
        }}
      >
        {navItems.map(({ icon: Icon, label }) => {
          const isActive = activeTab === label;
          return (
            <button
              key={label}
              onClick={() => { setCompact(false); haptic('selection'); onTabChange(label); }}
              aria-label={label}
              aria-current={isActive ? 'page' : undefined}
              className={`cleanz-nav-item relative flex flex-col items-center justify-center rounded-[18px] border border-transparent active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 ${isActive ? 'cleanz-gradient-button cleanz-gradient-button--selected' : ''}`}
              style={{
                flex: '1 1 0',
                minWidth: 0,
                color: isActive ? 'var(--brand-action-ink)' : theme.textSecondary,
                outlineColor: theme.accentPink,
              }}
            >
              <Icon className="cleanz-nav-icon relative shrink-0" size={22} strokeWidth={isActive ? 2.2 : 1.8}
                fill={isActive ? 'currentColor' : 'none'} fillOpacity={isActive ? 0.15 : 0} aria-hidden="true" />
              <span aria-hidden="true" className="cleanz-nav-label font-semibold whitespace-nowrap">{label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
