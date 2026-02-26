import { useState, useEffect } from 'react';
import { RotateCcw, Truck, Smartphone } from 'lucide-react';

/* ── stat cards ───────────────────────────────────────────── */

const STATS = [
  {
    Icon: RotateCcw,
    color: '#dc2d39',
    headline: '73%',
    prefix: '',
    text: "of shoppers won't buy from a brand again after a bad returns experience",
    pos: { top: '8%', left: '10%' },
    floatDelay: '0s',
    floatDuration: '6s',
  },
  {
    Icon: Truck,
    color: '#18c98d',
    headline: '74%',
    prefix: '',
    text: 'of shoppers say fast shipping is the key to a good buying experience',
    pos: { top: 'calc(50% - 26px)', right: '6%' },
    floatDelay: '0.5s',
    floatDuration: '7s',
  },
  {
    Icon: Smartphone,
    color: '#fdb82b',
    headline: '98%',
    prefix: 'Up to ',
    text: 'of consumers will read your post-sale SMS/text message',
    pos: { bottom: '12%', left: '6%' },
    floatDelay: '1s',
    floatDuration: '6.5s',
  },
];

/* ── component ────────────────────────────────────────────── */

export function HeroIcon3D() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [phase, setPhase] = useState<'idle' | 'expand' | 'hold' | 'collapse'>('idle');

  /* Initial delay before first expansion */
  useEffect(() => {
    const t = setTimeout(() => setPhase('expand'), 900);
    return () => clearTimeout(t);
  }, []);

  /* Phase state machine */
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    if (phase === 'expand') {
      setIsExpanded(true);
      t = setTimeout(() => setPhase('hold'), 420);
    } else if (phase === 'hold') {
      t = setTimeout(() => setPhase('collapse'), 3200);
    } else if (phase === 'collapse') {
      setIsExpanded(false);
      t = setTimeout(() => {
        setActiveIdx(prev => (prev + 1) % STATS.length);
        setPhase('expand');
      }, 480);
    }
    return () => clearTimeout(t);
  }, [phase]);

  return (
    <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: '1000px' }}>

      {/* ── Stat cards (square → expanded) ── */}
      {STATS.map((stat, i) => {
        const expanded = activeIdx === i && isExpanded;
        return (
          <div
            key={i}
            className="absolute animate-float-slow"
            style={{
              ...(stat.pos as React.CSSProperties),
              animationDelay: stat.floatDelay,
              animationDuration: stat.floatDuration,
              zIndex: 5,
            }}
          >
            <div
              className="relative bg-white border-2 rounded-xl shadow-lg overflow-hidden"
              style={{
                borderColor: stat.color,
                width: expanded ? '210px' : '52px',
                height: expanded ? '96px' : '52px',
                transition: 'width 0.42s cubic-bezier(0.4,0,0.2,1), height 0.42s cubic-bezier(0.4,0,0.2,1)',
              }}
            >
              {/* Icon — top/left from padding edge; with border-2, center lands at 2+14+10=26 = 52/2 */}
              <stat.Icon
                style={{
                  position: 'absolute',
                  top: '14px',
                  left: '14px',
                  width: 20,
                  height: 20,
                  color: stat.color,
                } as React.CSSProperties}
              />
              {/* Headline — fades in to the right of the icon */}
              <span
                style={{
                  position: 'absolute',
                  top: '14px',
                  left: '42px',
                  fontFamily: 'monospace',
                  fontSize: '20px',
                  fontWeight: 700,
                  color: stat.color,
                  lineHeight: 1,
                  opacity: expanded ? 1 : 0,
                  transition: 'opacity 0.2s ease',
                  transitionDelay: expanded ? '0.25s' : '0s',
                  whiteSpace: 'nowrap',
                }}
              >
                {stat.prefix}{stat.headline}
              </span>
              {/* Description — fades in below the icon/headline row */}
              <p
                style={{
                  position: 'absolute',
                  top: '42px',
                  left: '14px',
                  right: '14px',
                  fontFamily: 'monospace',
                  fontSize: '10px',
                  color: '#4b5563',
                  lineHeight: 1.4,
                  margin: 0,
                  opacity: expanded ? 1 : 0,
                  transition: 'opacity 0.2s ease',
                  transitionDelay: expanded ? '0.32s' : '0s',
                }}
              >
                {stat.text}
              </p>
            </div>
          </div>
        );
      })}

      {/* ── Decorative shapes ── */}

      <div className="absolute animate-float-slow" style={{ top: '15%', right: '20%', animationDelay: '0.3s', animationDuration: '7s', zIndex: 1 }}>
        <div className="w-6 h-6 rounded-full bg-[#18c98d] opacity-80" />
      </div>

      <div className="absolute animate-float-slow" style={{ top: '35%', left: '10%', animationDelay: '1.2s', animationDuration: '6s', zIndex: 3 }}>
        <div className="w-5 h-5 rounded bg-[#dc2d39] opacity-80" />
      </div>

      <div className="absolute animate-float-slow" style={{ bottom: '35%', left: '5%', animationDelay: '1.8s', animationDuration: '7.5s', zIndex: 1 }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 2 L22 20 L2 20 Z" fill="#fdb82b" opacity="0.8" />
        </svg>
      </div>

      <div className="absolute animate-float-slow" style={{ top: '40%', right: '5%', animationDelay: '2.2s', animationDuration: '6.8s', zIndex: 3 }}>
        <div className="w-7 h-7 rounded-full bg-[#383afe] opacity-80" />
      </div>

      <div className="absolute animate-float-slow" style={{ bottom: '40%', right: '8%', animationDelay: '2.7s', animationDuration: '7s', zIndex: 1 }}>
        <div className="w-8 h-5 rounded-full bg-[#18c98d] opacity-80" />
      </div>

      <div className="absolute animate-float-slow" style={{ top: '60%', right: '15%', animationDelay: '3s', animationDuration: '6.5s', zIndex: 1 }}>
        <div className="w-6 h-6 rounded bg-[#fdb82b] opacity-80 rotate-45" />
      </div>

      <div className="absolute animate-float-slow" style={{ bottom: '20%', right: '12%', animationDelay: '1.5s', animationDuration: '8s', zIndex: 3 }}>
        <div className="w-5 h-5 rounded-full bg-[#dc2d39] opacity-80" />
      </div>

      {/* ── Main 3D icon ── */}
      <div
        className="relative"
        style={{
          width: '280px',
          height: '280px',
          transformStyle: 'preserve-3d',
          animation: 'tilt-rotate 16s ease-in-out infinite',
          zIndex: 2,
        }}
      >
        {/* Shadow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
          style={{
            width: '220px',
            height: '40px',
            background: 'radial-gradient(ellipse, rgba(0,0,0,0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            transform: 'translateZ(-50px) translateY(60px)',
            filter: 'blur(10px)',
          }}
        />

        {/* Face */}
        <div
          className="absolute inset-0"
          style={{
            transform: 'translateZ(20px)',
            boxShadow: '0 25px 50px -12px rgba(56, 58, 254, 0.3)',
            borderRadius: '32px',
            background: '#383afe',
          }}
        >
          <svg
            viewBox="0 0 252.6 253.4"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full object-contain p-8"
            style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))' }}
          >
            <path fill="white" d="M29.99,151.48l10.95-7.49-1.15,44.4L0,176.27l10.97-9.52C-8.94,110.09,14.47,47.1,65.93,17c38.74-22.66,89.95-23.19,127.83,1.54l-18.24,15.16c-4.8-2.08-9.5-4.42-14.49-6.06-44.63-14.6-93.22,2.94-118.36,42.21-15.35,23.98-20.3,54.02-12.67,81.62Z"/>
            <path fill="white" d="M252.6,77.09l-10.97,9.52c18.72,53.3-.8,112.64-46.86,144.58-39.95,27.7-94.79,30.15-135.93,3.62l18.24-15.16c4.8,2.08,9.5,4.42,14.49,6.06,42.85,14.01,89.63-1.58,115.59-38.06,17.43-24.48,23.55-56.64,15.44-85.77l-10.95,7.49,1.16-44.4,39.79,12.12Z"/>
            <path fill="white" d="M94.49,94.29c11.91-30.28,53.49-31.11,67.91-2.27,51.87,5.34,43.77,80.08-8.06,73.43-10.42,11.52-27.3,11.15-38.14.45-17.15-.26-36.53,2.45-50.72-9.26-19-15.67-16.32-46.21,5.29-58.12,7.77-4.28,15.01-4.46,23.73-4.24Z"/>
            <path fill="white" d="M188.02,120.04c6.32,20.08-8.7,39.1-29.7,37.78-2.04-.13-3.98-1.25-6.08-.92-3.11.5-5.51,5.18-9.19,7-9.74,4.8-16.23.28-23.5-5.95-12.41-.82-25.12,1.45-37.2-2.02-34.26-9.82-24.26-56.49,9-53.41,2.76.26,5.08,2.17,8.07.45,1.42-.82,3.68-8.33,5.3-10.84,3.73-5.76,11.69-11.66,18.56-12.59,11.84-1.6,23.54,2.78,29.79,13.16,1.46,2.43,1.98,5.17,3.81,7.15,2.13,1.55,6.03.66,8.78,1.03,9.85,1.32,19.42,9.81,22.36,19.16Z"/>
          </svg>
        </div>

        {/* Depth layers */}
        <div className="absolute inset-0 rounded-[32px]" style={{ transform: 'translateZ(15px)' }} />
        <div className="absolute inset-0 rounded-[32px]" style={{ transform: 'translateZ(10px)' }} />
      </div>

    </div>
  );
}
