'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { NOUVEAUTES, Nouveaute } from '@/data/nouveautes';
import { Sparkles, ChevronRight, Check, X } from 'lucide-react';

const SEEN_KEY = 'cleanz-seen-nouveautes';
const maxId = Math.max(0, ...NOUVEAUTES.map((n) => n.id));

export const WhatsNewModal = () => {
  const { theme, darkMode } = useTheme();
  const [unseen, setUnseen] = useState<Nouveaute[]>([]);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let seen = 0;
    try {
      seen = parseInt(localStorage.getItem(SEEN_KEY) || '0', 10) || 0;
    } catch {}

    const items = NOUVEAUTES.filter((n) => n.id > seen).sort((a, b) => b.id - a.id);
    if (items.length > 0) {
      setUnseen(items);
      // Affiche après le splash screen (2.5s) + court délai
      const t = setTimeout(() => setOpen(true), 2800);
      return () => clearTimeout(t);
    }
  }, []);

  const finish = () => {
    setOpen(false);
    try {
      localStorage.setItem(SEEN_KEY, String(maxId));
    } catch {}
  };

  if (!mounted || !open || unseen.length === 0) return null;

  const item = unseen[index];
  const isLast = index === unseen.length - 1;

  return createPortal(
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-5">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={finish} />

      <div
        className="relative w-full max-w-sm rounded-3xl overflow-hidden animate-slideUp"
        style={{ background: darkMode ? '#2D1B4E' : 'white', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}
      >
        {/* Header */}
        <div
          className="relative px-5 pt-5 pb-6"
          style={{
            background: darkMode
              ? 'linear-gradient(135deg, rgba(255,133,192,0.25) 0%, rgba(167,139,250,0.2) 50%, rgba(94,234,212,0.2) 100%)'
              : 'linear-gradient(135deg, #FFE5F1 0%, #F0E5FB 50%, #E5F7F3 100%)',
          }}
        >
          <button
            onClick={finish}
            aria-label="Fermer"
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: darkMode ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.7)' }}
          >
            <X className="w-4 h-4" style={{ color: theme.textSecondary }} />
          </button>

          <div className="flex items-center gap-1.5 mb-3">
            <Sparkles className="w-4 h-4" style={{ color: theme.accentPink }} />
            <span className="text-[11px] font-black uppercase tracking-widest" style={{ color: theme.accentPink }}>
              Nouveautés
            </span>
            {unseen.length > 1 && (
              <span className="text-[10px] font-semibold ml-auto" style={{ color: theme.textMuted }}>
                {index + 1}/{unseen.length}
              </span>
            )}
          </div>

          <div className="text-5xl mb-2">{item.emoji}</div>
          <h2 className="text-xl font-black leading-tight" style={{ color: theme.textPrimary }}>
            {item.title}
          </h2>
        </div>

        {/* Body */}
        <div className="px-5 py-5">
          <p className="text-sm leading-relaxed mb-4" style={{ color: theme.textSecondary }}>
            {item.description}
          </p>

          {item.steps && item.steps.length > 0 && (
            <div className="space-y-2.5 mb-1">
              {item.steps.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span
                    className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold text-white"
                    style={{ background: 'linear-gradient(135deg, #FF69B4 0%, #8B5CF6 100%)' }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-[13px] leading-snug pt-0.5" style={{ color: theme.textSecondary }}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 pb-5 flex items-center gap-3">
          {/* Dots */}
          {unseen.length > 1 && (
            <div className="flex items-center gap-1.5">
              {unseen.map((_, i) => (
                <span
                  key={i}
                  className="rounded-full transition-all"
                  style={{
                    width: i === index ? 16 : 6,
                    height: 6,
                    background: i === index ? theme.accentPink : (darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.12)'),
                  }}
                />
              ))}
            </div>
          )}

          <button
            onClick={() => (isLast ? finish() : setIndex((i) => i + 1))}
            className="ml-auto flex items-center gap-1.5 px-5 py-3 rounded-xl text-sm font-bold text-white transition-all active:scale-95"
            style={{ background: 'linear-gradient(135deg, #FF69B4 0%, #8B5CF6 100%)' }}
          >
            {isLast ? (<><Check className="w-4 h-4" /> C'est parti !</>) : (<>Suivant <ChevronRight className="w-4 h-4" /></>)}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
