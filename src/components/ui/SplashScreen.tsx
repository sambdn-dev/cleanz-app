'use client';

import { useState, useEffect, useRef, type CSSProperties } from 'react';

export const SplashScreen = () => {
  const [visible, setVisible] = useState(true);
  const splashRef = useRef<HTMLDivElement>(null);

  // CSS reveals the app even before hydration. JS only removes the finished
  // overlay, using its actual animation clock rather than navigation timing.
  useEffect(() => {
    let active = true;
    const exit = splashRef.current?.getAnimations?.().find(
      (animation) => 'animationName' in animation && animation.animationName === 'splash-auto-out'
    );
    const remove = () => { if (active) setVisible(false); };
    if (exit) {
      exit.finished.then(remove).catch(() => {});
      return () => { active = false; };
    }
    const timer = setTimeout(remove, 1350);
    return () => { active = false; clearTimeout(timer); };
  }, []);

  if (!visible) return null;

  return (
    <div ref={splashRef} className="splash-auto-out splash-screen" aria-hidden="true">
      <div className="splash-wordmark">
        {Array.from('cleanz').map((letter, index) => (
          <span
            key={index}
            className="splash-letter"
            style={{
              '--letter-delay': `${60 + index * 80}ms`,
              '--letter-position': `${index * 20}%`,
            } as CSSProperties}
          >{letter}</span>
        ))}
      </div>
    </div>
  );
};
