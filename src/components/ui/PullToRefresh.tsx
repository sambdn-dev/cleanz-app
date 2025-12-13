'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';
import { RefreshCw } from 'lucide-react';

interface PullToRefreshProps {
  children: ReactNode;
  onRefresh?: () => void;
}

export function PullToRefresh({ children, onRefresh }: PullToRefreshProps) {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isPulling, setIsPulling] = useState(false);
  const startY = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const PULL_THRESHOLD = 80;
  const MAX_PULL = 120;

  // Haptic feedback
  const vibrate = (pattern: number | number[]) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    // Only start pull if at top of page
    if (window.scrollY === 0 && !isRefreshing) {
      startY.current = e.touches[0].clientY;
      setIsPulling(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isPulling || isRefreshing) return;

    const currentY = e.touches[0].clientY;
    const diff = currentY - startY.current;

    if (diff > 0 && window.scrollY === 0) {
      // Apply resistance to pull
      const resistance = 0.5;
      const distance = Math.min(diff * resistance, MAX_PULL);
      setPullDistance(distance);

      // Light vibration when crossing threshold
      if (distance >= PULL_THRESHOLD && pullDistance < PULL_THRESHOLD) {
        vibrate(10);
      }
    }
  };

  const handleTouchEnd = () => {
    if (!isPulling) return;

    if (pullDistance >= PULL_THRESHOLD && !isRefreshing) {
      // Trigger refresh
      setIsRefreshing(true);
      vibrate([10, 50, 10]); // Double vibration

      // Call onRefresh or reload page
      if (onRefresh) {
        onRefresh();
        setTimeout(() => {
          setIsRefreshing(false);
          setPullDistance(0);
        }, 1000);
      } else {
        // Default: reload the page
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } else {
      setPullDistance(0);
    }

    setIsPulling(false);
  };

  // Reset when page visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        setIsRefreshing(false);
        setPullDistance(0);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const progress = Math.min(pullDistance / PULL_THRESHOLD, 1);
  const shouldShowIndicator = pullDistance > 10 || isRefreshing;

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative"
    >
      {/* Pull indicator */}
      <div
        className="fixed left-1/2 -translate-x-1/2 z-50 flex items-center justify-center transition-all duration-200"
        style={{
          top: `calc(env(safe-area-inset-top, 0px) + ${Math.max(pullDistance - 20, 0)}px)`,
          opacity: shouldShowIndicator ? 1 : 0,
          transform: `translateX(-50%) scale(${0.5 + progress * 0.5})`,
        }}
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
          }}
        >
          <RefreshCw
            className={`w-5 h-5 text-white ${isRefreshing ? 'animate-spin' : ''}`}
            style={{
              transform: isRefreshing ? undefined : `rotate(${progress * 180}deg)`,
            }}
          />
        </div>
      </div>

      {/* Content with pull transform */}
      <div
        style={{
          transform: `translateY(${isRefreshing ? PULL_THRESHOLD * 0.5 : pullDistance}px)`,
          transition: isPulling ? 'none' : 'transform 0.3s ease-out',
        }}
      >
        {children}
      </div>
    </div>
  );
}
