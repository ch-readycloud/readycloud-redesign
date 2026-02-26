import { useEffect, useState } from 'react';

// ── Epoch-based baseline — never shows a low number ───────────────────────────
const MONTHLY_RATE = 2_105_156;
const PER_MS        = MONTHLY_RATE / (30 * 24 * 60 * 60 * 1000); // ~0.813 / sec
const EPOCH         = new Date('2023-01-01T00:00:00Z').getTime();

function getEpochCount(): number {
  return Math.floor((Date.now() - EPOCH) * PER_MS);
}

// ── Single digit card with odometer flip ──────────────────────────────────────
function DigitCard({ digit }: { digit: string }) {
  const [current,  setCurrent]  = useState(digit);
  const [outgoing, setOutgoing] = useState<string | null>(null);
  const [flipKey,  setFlipKey]  = useState(0);

  useEffect(() => {
    if (digit !== current) {
      setOutgoing(current);
      setCurrent(digit);
      setFlipKey(k => k + 1);
    }
  }, [digit, current]);

  return (
    <div
      className="relative overflow-hidden inline-flex items-center justify-center"
      style={{
        width:     '0.7em',
        height:    '1.25em',
        margin:    '0 0.03em',
        flexShrink: 0,
        background: 'linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%)',
        borderRadius: '0.1em',
        border:    '1px solid rgba(0,0,0,0.10)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 2px 6px rgba(0,0,0,0.08)',
      }}
    >
      {/* Top-half inner gloss */}
      <div
        className="absolute inset-x-0 top-0 pointer-events-none"
        style={{
          height:     '50%',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, transparent 100%)',
          zIndex: 3,
        }}
      />
      {/* Midline seam */}
      <div
        className="absolute inset-x-0 pointer-events-none"
        style={{
          top:        '50%',
          height:     '1px',
          background: 'rgba(0,0,0,0.07)',
          zIndex: 4,
        }}
      />

      {/* Outgoing — slides down */}
      {outgoing !== null && (
        <span
          key={`out-${flipKey}`}
          className="absolute font-mono font-bold"
          style={{
            color:     'rgba(15,23,42,0.35)',
            lineHeight: 1,
            animation: 'digitOut 0.22s ease-in forwards',
            zIndex: 1,
          }}
        >
          {outgoing}
        </span>
      )}

      {/* Incoming — slides in from above */}
      <span
        key={`in-${flipKey}`}
        className="relative font-mono font-bold"
        style={{
          color:      '#0f172a',
          lineHeight: 1,
          animation:  flipKey > 0 ? 'digitIn 0.26s cubic-bezier(0.16, 1, 0.3, 1) forwards' : 'none',
          zIndex: 2,
        }}
      >
        {current}
      </span>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export function ShipmentCounter() {
  // Start from the true epoch count so it's never low
  const [count, setCount] = useState(getEpochCount);

  useEffect(() => {
    let active = true;
    const ids = new Set<ReturnType<typeof setTimeout>>();

    // Helper — tracks timeout so cleanup can cancel all pending
    const later = (fn: () => void, ms: number) => {
      const id = setTimeout(() => {
        ids.delete(id);
        if (active) fn();
      }, ms);
      ids.add(id);
    };

    const scheduleNext = (delay?: number) => {
      later(() => {
        const roll = Math.random();

        if (roll < 0.04) {
          // ── LARGE BURST (carrier manifest / big merchant upload) ──────────
          // 80–450 shipments delivered in 3–6 rapid chunks
          const batchTotal = Math.floor(Math.random() * 370 + 80);
          const numChunks  = Math.floor(Math.random() * 4 + 3);
          let chunkDelay   = 0;
          let remaining    = batchTotal;

          for (let i = 0; i < numChunks; i++) {
            chunkDelay += Math.floor(Math.random() * 130 + 40);
            const isLast = i === numChunks - 1;
            // Exponentially weighted split — earlier chunks carry more
            const portion = isLast
              ? remaining
              : Math.floor(remaining * (Math.random() * 0.45 + 0.15));
            remaining -= portion;
            const captured = portion;
            later(() => setCount(prev => prev + captured), chunkDelay);
          }

          // Long breather after a burst (3–12 s)
          scheduleNext(chunkDelay + Math.floor(Math.random() * 9000 + 3000));

        } else if (roll < 0.18) {
          // ── MEDIUM BATCH (small merchant, regional hub scan) ─────────────
          // 4–25 shipments, then a moderate pause
          const increment = Math.floor(Math.random() * 22 + 4);
          setCount(prev => prev + increment);
          scheduleNext(Math.floor(Math.random() * 2200 + 600));

        } else if (roll < 0.45) {
          // ── NORMAL SINGLE-SHIPMENT TICK ───────────────────────────────────
          // 1–3 shipments, short interval — the bread and butter
          const increment = Math.floor(Math.random() * 3 + 1);
          setCount(prev => prev + increment);
          scheduleNext(Math.floor(Math.random() * 900 + 150));

        } else {
          // ── QUIET MOMENT (system processing, no new scan events) ─────────
          // Skip a beat — ~35% of ticks add nothing for realism
          scheduleNext(Math.floor(Math.random() * 1600 + 400));
        }
      }, delay ?? Math.floor(Math.random() * 800 + 200));
    };

    scheduleNext();

    return () => {
      active = false;
      ids.forEach(clearTimeout);
    };
  }, []);

  const chars = count.toLocaleString().split('');

  return (
    <>
      <style>{`
        @keyframes digitIn {
          0%   { transform: translateY(-110%); opacity: 0; }
          55%  { opacity: 1; }
          100% { transform: translateY(0%);   opacity: 1; }
        }
        @keyframes digitOut {
          0%   { transform: translateY(0%);   opacity: 1; }
          100% { transform: translateY(110%); opacity: 0; }
        }
        @keyframes livePing {
          0%   { transform: scale(1);   opacity: 0.5; }
          100% { transform: scale(2.8); opacity: 0;   }
        }
      `}</style>

      <div className="flex flex-col items-center gap-6 w-full">
        {/* Live indicator */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-5 h-5">
            <div
              className="absolute w-full h-full rounded-full bg-[#18c98d]"
              style={{ animation: 'livePing 1.9s ease-out infinite' }}
            />
            <div className="relative w-2.5 h-2.5 rounded-full bg-[#18c98d]" />
          </div>
          <span className="font-mono text-base uppercase tracking-[0.22em] text-gray-400">
            Live Counter
          </span>
        </div>

        {/* Digit row */}
        <div className="flex justify-center items-center" style={{ fontSize: 'clamp(1.75rem, 9vw, 9.5rem)' }}>
          {chars.map((char, i) =>
            char === ',' ? (
              <span
                key={i}
                className="font-mono text-gray-300 select-none"
                style={{
                  fontSize:      '0.48em',
                  lineHeight:    1,
                  alignSelf:     'flex-end',
                  paddingBottom: '0.17em',
                  margin:        '0 0.05em',
                }}
              >
                ,
              </span>
            ) : (
              <DigitCard key={i} digit={char} />
            )
          )}
        </div>
      </div>
    </>
  );
}