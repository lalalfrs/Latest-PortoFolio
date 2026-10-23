import React from 'react';
import { ProjectItem } from '../data/portfolioData';

interface StudioArtworkProps {
  variant: 'hero-studio' | ProjectItem['artworkVariant'];
  className?: string;
}

export const StudioArtwork: React.FC<StudioArtworkProps> = ({ variant, className = '' }) => {
  if (variant === 'hero-studio') {
    return (
      <div
        className={`relative overflow-hidden bg-zinc-900 dark:bg-zinc-950 text-zinc-100 select-none ${className}`}
        role="img"
        aria-label="Monochrome architectural developer studio workspace composition"
      >
        {/* Dramatic Architectural Window Light & Shadow Scrim */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.16),transparent_60%)]" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Diagonal Window Shadow Beam */}
        <div className="absolute -inset-y-12 left-1/4 w-1/2 -skew-x-12 bg-gradient-to-r from-white/[0.07] via-white/[0.02] to-transparent pointer-events-none" />

        {/* Studio Exhibition Frame Content */}
        <div className="relative h-full w-full p-8 sm:p-10 flex flex-col justify-between">
          {/* Top Exhibition Header */}
          <div className="flex items-center justify-between border-b border-white/15 pb-4 text-xs font-mono text-zinc-400 tabular-nums">
            <span>STUDIO ARCHIVE · EDITION 2026</span>
            <span>35MM MONOCHROME SERIES</span>
          </div>

          {/* Center Architectural Display Monitor Mockup */}
          <div className="my-auto py-8 flex flex-col items-center justify-center">
            <div className="w-full max-w-md rounded-xl border border-white/20 bg-black/80 backdrop-blur-md p-5 shadow-2xl">
              {/* Window Top Bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-zinc-500" />
                  <span className="w-2 h-2 rounded-full bg-zinc-700" />
                  <span className="w-2 h-2 rounded-full bg-zinc-800" />
                </div>
                <span className="text-[11px] font-mono text-zinc-400 tabular-nums">
                  studio-grid.tsx — 1440px
                </span>
              </div>

              {/* Architectural Wireframe Inside Monitor */}
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-7 space-y-2.5">
                  <div className="h-2.5 w-16 bg-zinc-600 rounded-xs" />
                  <div className="h-6 w-full bg-zinc-100 rounded-xs" />
                  <div className="h-6 w-4/5 bg-zinc-300 rounded-xs" />
                  <div className="pt-2 space-y-1.5">
                    <div className="h-1.5 w-full bg-zinc-600 rounded-xs" />
                    <div className="h-1.5 w-5/6 bg-zinc-700 rounded-xs" />
                  </div>
                  <div className="pt-3 flex items-center gap-2">
                    <div className="h-6 w-24 bg-white rounded-xs" />
                    <div className="h-6 w-20 border border-white/25 rounded-xs" />
                  </div>
                </div>
                <div className="col-span-5 rounded-lg border border-white/15 bg-zinc-900/90 p-3 flex flex-col justify-between">
                  <svg viewBox="0 0 120 120" className="w-full h-24 stroke-zinc-200 fill-none" strokeWidth="1.2">
                    <circle cx="60" cy="60" r="42" strokeOpacity="0.35" />
                    <circle cx="60" cy="60" r="26" strokeOpacity="0.65" />
                    <line x1="10" y1="60" x2="110" y2="60" strokeOpacity="0.25" />
                    <line x1="60" y1="10" x2="60" y2="110" strokeOpacity="0.25" />
                    <rect x="38" y="38" width="44" height="44" strokeOpacity="0.85" />
                  </svg>
                  <div className="flex justify-between text-[10px] font-mono text-zinc-400 tabular-nums pt-2 border-t border-white/10">
                    <span>FPS: 60.0</span>
                    <span>DOM: CLEAN</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Architectural Plinth Base */}
            <div className="w-24 h-3 bg-gradient-to-b from-zinc-700 to-zinc-900 border-x border-white/15" />
            <div className="w-48 h-1.5 bg-zinc-600/60 rounded-full" />
          </div>

          {/* Bottom Studio Caption */}
          <div className="flex items-end justify-between border-t border-white/15 pt-4">
            <div>
              <p className="font-serif italic text-lg text-zinc-200">
                Form follows function in every component tree.
              </p>
              <p className="text-xs font-mono text-zinc-400 mt-0.5 tabular-nums">
                JAKARTA · 06°12&apos;S 106°50&apos;E
              </p>
            </div>
            <span className="text-xs font-mono text-zinc-300 tabular-nums">
              ISO 400 · f/2.8
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'swiss-design-system') {
    return (
      <div
        className={`relative overflow-hidden bg-zinc-900 text-zinc-100 select-none ${className}`}
        role="img"
        aria-label="Krono Architectural UI Component System showcase"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.14),transparent_55%)]" />
        <div className="relative h-full w-full p-6 sm:p-8 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 tabular-nums">
            <span>SYSTEM ARCHITECTURE · 01</span>
            <span>WCAG AAA / AA</span>
          </div>

          <div className="my-6 grid grid-cols-12 gap-4 items-center">
            <div className="col-span-12 sm:col-span-7 rounded-xl border border-white/20 bg-zinc-950/90 p-5 shadow-xl">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
                <span className="text-xs font-mono text-zinc-300">Button &amp; Dialog Primitives</span>
                <span className="text-[11px] font-mono text-zinc-400 tabular-nums">13.4 KB</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="px-3.5 py-1.5 rounded-md bg-white text-zinc-950 text-xs font-medium">
                    Primary Action
                  </div>
                  <div className="px-3.5 py-1.5 rounded-md border border-white/25 text-zinc-200 text-xs">
                    Secondary
                  </div>
                  <div className="px-3 py-1.5 text-zinc-400 text-xs underline underline-offset-4">
                    Minimal Link
                  </div>
                </div>
                <div className="pt-2 grid grid-cols-3 gap-2">
                  <div className="rounded border border-white/15 bg-zinc-900 p-2.5">
                    <div className="text-[10px] font-mono text-zinc-400">TOKEN</div>
                    <div className="text-xs font-mono text-white mt-1">#050505</div>
                  </div>
                  <div className="rounded border border-white/15 bg-zinc-900 p-2.5">
                    <div className="text-[10px] font-mono text-zinc-400">SURFACE</div>
                    <div className="text-xs font-mono text-white mt-1">#121214</div>
                  </div>
                  <div className="rounded border border-white/15 bg-zinc-900 p-2.5">
                    <div className="text-[10px] font-mono text-zinc-400">CANVAS</div>
                    <div className="text-xs font-mono text-white mt-1">#FAFAFA</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden sm:flex sm:col-span-5 flex-col gap-3 rounded-xl border border-white/15 bg-zinc-900/70 p-4">
              <div className="text-[11px] font-mono text-zinc-400">TYPOGRAPHIC SCALE</div>
              <div className="font-display text-2xl font-bold tracking-tight text-white">
                Aa Bb Cc
              </div>
              <div className="font-serif italic text-lg text-zinc-300">
                Editorial Monograph
              </div>
              <div className="text-[11px] font-mono text-zinc-400 pt-2 border-t border-white/10 tabular-nums">
                cubic-bezier(0.16, 1, 0.3, 1)
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 border-t border-white/10 pt-3 tabular-nums">
            <span>28 ACCESSIBLE MODULES</span>
            <span>REACT 19 · TYPESCRIPT</span>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'editorial-commerce') {
    return (
      <div
        className={`relative overflow-hidden bg-zinc-950 text-zinc-100 select-none ${className}`}
        role="img"
        aria-label="Atelier Noir Minimalist Editorial Storefront"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.12),transparent_60%)]" />
        <div className="relative h-full w-full p-6 flex flex-col justify-between">
          <div className="flex justify-between text-[11px] font-mono text-zinc-400 tabular-nums">
            <span>ATELIER NOIR</span>
            <span>CATALOG 02</span>
          </div>
          <div className="my-5 rounded-xl border border-white/15 bg-zinc-900/80 p-5 flex items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="text-[10px] font-mono text-zinc-400">EDITION MONOGRAPH</div>
              <div className="font-serif italic text-2xl text-white">Brutalist Forms IV</div>
              <div className="text-xs font-mono text-zinc-300 tabular-nums">$140.00 · IN STOCK</div>
            </div>
            <div className="w-20 h-24 rounded border border-white/25 bg-gradient-to-br from-zinc-700 via-zinc-900 to-black flex items-center justify-center shadow-lg shrink-0">
              <span className="font-serif italic text-lg text-zinc-200">IV</span>
            </div>
          </div>
          <div className="flex justify-between text-[11px] font-mono text-zinc-400 border-t border-white/10 pt-3 tabular-nums">
            <span>FILTER LATENCY: 42MS</span>
            <span>HEADLESS COMMERCE</span>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'spatial-canvas') {
    return (
      <div
        className={`relative overflow-hidden bg-zinc-900 text-zinc-100 select-none ${className}`}
        role="img"
        aria-label="Forma Infinite Whiteboard and Wireframe Canvas"
      >
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.45) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
        <div className="relative h-full w-full p-6 flex flex-col justify-between">
          <div className="flex justify-between text-[11px] font-mono text-zinc-400 tabular-nums">
            <span>SPATIAL QUADTREE</span>
            <span>ZOOM: 125%</span>
          </div>
          <div className="my-5 flex items-center justify-center">
            <svg viewBox="0 0 260 120" className="w-full max-w-xs stroke-zinc-200 fill-none" strokeWidth="1.5">
              <rect x="12" y="25" width="76" height="44" rx="6" className="fill-zinc-950/90" />
              <rect x="172" y="15" width="76" height="40" rx="6" className="fill-zinc-950/90" />
              <rect x="172" y="68" width="76" height="40" rx="6" className="fill-zinc-950/90" />
              <path d="M88 47 C 130 47, 130 35, 172 35" strokeDasharray="3 3" />
              <path d="M88 47 C 130 47, 130 88, 172 88" />
              <circle cx="88" cy="47" r="3.5" className="fill-white" />
              <circle cx="172" cy="35" r="3.5" className="fill-white" />
              <circle cx="172" cy="88" r="3.5" className="fill-white" />
            </svg>
          </div>
          <div className="flex justify-between text-[11px] font-mono text-zinc-400 border-t border-white/10 pt-3 tabular-nums">
            <span>60 FPS @ 500 NODES</span>
            <span>CANVAS 2D · SVG</span>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'acoustic-synth') {
    return (
      <div
        className={`relative overflow-hidden bg-zinc-950 text-zinc-100 select-none ${className}`}
        role="img"
        aria-label="Pulse Web Audio API Harmonic Visualizer"
      >
        <div className="relative h-full w-full p-6 flex flex-col justify-between">
          <div className="flex justify-between text-[11px] font-mono text-zinc-400 tabular-nums">
            <span>OSCILLATOR BANK A</span>
            <span>44.1 KHZ · STEREO</span>
          </div>
          <div className="my-5 rounded-xl border border-white/15 bg-zinc-900/90 p-4">
            <svg viewBox="0 0 240 80" className="w-full h-20 stroke-white fill-none" strokeWidth="1.75">
              <path
                d="M 0 40 Q 15 5, 30 40 T 60 40 T 90 40 T 120 40 T 150 40 T 180 40 T 210 40 T 240 40"
                strokeOpacity="0.9"
              />
              <path
                d="M 0 40 Q 20 18, 40 40 T 80 40 T 120 40 T 160 40 T 200 40 T 240 40"
                strokeOpacity="0.35"
              />
            </svg>
            <div className="mt-3 grid grid-cols-4 gap-2 pt-2 border-t border-white/10 text-center text-[10px] font-mono text-zinc-400 tabular-nums">
              <div>ATK 12ms</div>
              <div>DEC 180ms</div>
              <div>SUS -4dB</div>
              <div>REL 420ms</div>
            </div>
          </div>
          <div className="flex justify-between text-[11px] font-mono text-zinc-400 border-t border-white/10 pt-3 tabular-nums">
            <span>BUFFER: 8.2MS</span>
            <span>WEB AUDIO WORKLET</span>
          </div>
        </div>
      </div>
    );
  }

  // markdown-studio
  return (
    <div
      className={`relative overflow-hidden bg-zinc-900 text-zinc-100 select-none ${className}`}
      role="img"
      aria-label="Folio Distraction-Free Technical Writing Studio"
    >
      <div className="relative h-full w-full p-6 sm:p-8 flex flex-col justify-between">
        <div className="flex justify-between text-[11px] font-mono text-zinc-400 tabular-nums">
          <span>FOLIO MONOGRAPH EDITOR</span>
          <span>AST SYNC · INDEXEDDB</span>
        </div>
        <div className="my-5 grid grid-cols-2 gap-3 rounded-xl border border-white/20 bg-zinc-950 p-4">
          <div className="border-r border-white/10 pr-3 font-mono text-xs space-y-2 text-zinc-400">
            <div className="text-zinc-200"># 01. Architecture</div>
            <div>Composing clean UI primitives with predictable state transitions.</div>
            <div className="text-zinc-500">`motion.div layout`</div>
          </div>
          <div className="pl-2 space-y-2">
            <div className="font-display font-semibold text-sm text-white">01. Architecture</div>
            <div className="font-serif text-xs text-zinc-300 leading-relaxed">
              Composing clean UI primitives with predictable state transitions.
            </div>
            <div className="inline-block font-mono text-[10px] text-zinc-300 border border-white/15 px-1.5 py-0.5 rounded">
              motion.div layout
            </div>
          </div>
        </div>
        <div className="flex justify-between text-[11px] font-mono text-zinc-400 border-t border-white/10 pt-3 tabular-nums">
          <span>12,000 WORDS / SEC</span>
          <span>LOCAL-FIRST STUDIO</span>
        </div>
      </div>
    </div>
  );
};
