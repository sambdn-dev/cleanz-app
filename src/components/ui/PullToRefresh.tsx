'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';
import { RefreshCw, Check } from 'lucide-react';

interface PullToRefreshProps {
  children: ReactNode;
  onRefresh?: () => void;
}

export function PullToRefresh({ children, onRefresh }: PullToRefreshProps) {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isPulling, setIsPulling] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const startY = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const PULL_THRESHOLD = 80;
  const MAX_PULL = 120;

  // Haptic feedback (works on Android, not iOS)
  const vibrate = (pattern: number | number[]) => {
    try {
      if ('vibrate' in navigator) {
        navigator.vibrate(pattern);
      }
    } catch {
      // Vibration not supported
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

      // Update ready state when crossing threshold
      const nowReady = distance >= PULL_THRESHOLD;
      if (nowReady && !isReady) {
        setIsReady(true);
        vibrate(15);
      } else if (!nowReady && isReady) {
        setIsReady(false);
      }
    }
  };

  const handleTouchEnd = () => {
    if (!isPulling) return;

    if (pullDistance >= PULL_THRESHOLD && !isRefreshing) {
      // Trigger refresh
      setIsRefreshing(true);
      setIsReady(false);
      vibrate([15, 30, 15]);

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
      setIsReady(false);
    }

    setIsPulling(false);
  };

  // Reset when page visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        setIsRefreshing(false);
        setPullDistance(0);
        setIsReady(false);
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
        className="fixed left-1/2 -translate-x-1/2 z-50 flex flex-col items-center justify-center transition-all duration-200"
        style={{
          top: `calc(env(safe-area-inset-top, 0px) + ${Math.max(pullDistance - 20, 0)}px)`,
          opacity: shouldShowIndicator ? 1 : 0,
          transform: `translateX(-50%) scale(${0.5 + progress * 0.5})`,
        }}
      >
        <div
          className={`w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 ${
            isReady ? 'scale-110' : ''
          }`}
          style={{
            background: isReady || isRefreshing
              ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
              : 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
            boxShadow: isReady ? '0 0 20px rgba(16, 185, 129, 0.5)' : '0 4px 15px rgba(139, 92, 246, 0.4)',
          }}
        >
          {isReady && !isRefreshing ? (
            <Check className="w-5 h-5 text-white" strokeWidth={3} />
          ) : (
            <RefreshCw
              className={`w-5 h-5 text-white ${isRefreshing ? 'animate-spin' : ''}`}
              style={{
                transform: isRefreshing ? undefined : `rotate(${progress * 360}deg)`,
              }}
            />
          )}
        </div>
        {/* Status text */}
        <span
          className="mt-2 text-xs font-medium transition-opacity duration-200"
          style={{
            color: isReady || isRefreshing ? '#10B981' : '#8B5CF6',
            opacity: pullDistance > 30 ? 1 : 0,
          }}
        >
          {isRefreshing ? 'Actualisation...' : isReady ? 'Relâcher' : 'Tirer pour actualiser'}
        </span>
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
