import { useState, useEffect } from 'react';
import { Package, Truck, RotateCcw, BarChart3 } from 'lucide-react';

/* ── data ─────────────────────────────────────────────────── */

const SHIPMENTS_14D = [1840, 2100, 1920, 2380, 2290, 2560, 2430, 2710, 2650, 2890, 2760, 2920, 2840, 2847];
const SHIPMENTS_LABELS = ['','','','','','','','','','','','','','TODAY'];

const CARRIERS = [
  { name: 'UPS',   pct: 96 },
  { name: 'DHL',   pct: 95 },
  { name: 'FedEx', pct: 93 },
  { name: 'USPS',  pct: 91 },
];

const RETURNS_6W  = [5.8, 5.4, 5.1, 4.9, 4.7, 4.2];
const RETURNS_LBL = ['W-5','W-4','W-3','W-2','W-1','NOW'];
const RETURNS_TARGET = 5.0;

/* ── helpers ──────────────────────────────────────────────── */

function normalize(data: number[], w: number, h: number, padPct = 0.1) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pad = h * padPct;
  return data.map((v, i) => ({
    x: (i / (data.length - 1)) * w,
    y: h - pad - ((v - min) / range) * (h - pad * 2),
  }));
}

function toPolyline(pts: { x: number; y: number }[]) {
  return pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
}

function toArea(pts: { x: number; y: number }[], h: number) {
  const line = toPolyline(pts);
  return `0,${h} ${line} ${pts[pts.length - 1].x.toFixed(1)},${h}`;
}

/* ── chart components ─────────────────────────────────────── */

function SparkArea({ data, color }: { data: number[]; color: string }) {
  const W = 280; const H = 72;
  const pts = normalize(data, W, H);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: H }}>
      <defs>
        <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.18" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {/* grid lines */}
      {[0.25, 0.5, 0.75].map(f => (
        <line key={f} x1="0" y1={H * f} x2={W} y2={H * f}
          stroke="#f3f4f6" strokeWidth="1" />
      ))}
      {/* area fill */}
      <polygon points={toArea(pts, H)} fill="url(#sparkFill)" />
      {/* line */}
      <polyline points={toPolyline(pts)} fill="none"
        stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* last point dot */}
      <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y}
        r="3.5" fill={color} />
    </svg>
  );
}

function CarrierBars({ carriers, color, animate }: {
  carriers: typeof CARRIERS; color: string; animate: boolean;
}) {
  return (
    <div className="flex flex-col gap-2.5 w-full">
      {carriers.map((c, i) => (
        <div key={c.name} className="flex items-center gap-2">
          <span className="font-mono text-[10px] font-bold text-gray-500 w-9 text-right flex-shrink-0">
            {c.name}
          </span>
          <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: animate ? `${c.pct}%` : '0%',
                backgroundColor: color,
                transitionDelay: animate ? `${i * 100}ms` : '0ms',
              }}
            />
          </div>
          <span className="font-mono text-[10px] font-bold flex-shrink-0"
            style={{ color }}>
            {c.pct}%
          </span>
        </div>
      ))}
    </div>
  );
}

function ReturnLine({ data, labels, target, color }: {
  data: number[]; labels: string[]; target: number; color: string;
}) {
  const W = 280; const H = 72;
  // extend range slightly so target line is visible
  const allVals = [...data, target];
  const pts = normalize(data, W, H, 0.12);
  // target line y
  const min = Math.min(...allVals);
  const max = Math.max(...allVals);
  const range = max - min || 1;
  const pad = H * 0.12;
  const targetY = H - pad - ((target - min) / range) * (H - pad * 2);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: H }}>
      {/* grid */}
      {[0.25, 0.5, 0.75].map(f => (
        <line key={f} x1="0" y1={H * f} x2={W} y2={H * f}
          stroke="#f3f4f6" strokeWidth="1" />
      ))}
      {/* target dashed line */}
      <line x1="0" y1={targetY} x2={W} y2={targetY}
        stroke="#d1d5db" strokeWidth="1.5" strokeDasharray="5 3" />
      <text x={W - 2} y={targetY - 3} fill="#9ca3af"
        fontSize="8" fontFamily="monospace" textAnchor="end">TARGET</text>
      {/* area fill */}
      <defs>
        <linearGradient id="returnFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.12" />
          <stop offset="100%" stopColor={color} stopOpacity="0.01" />
        </linearGradient>
      </defs>
      <polygon points={toArea(pts, H)} fill="url(#returnFill)" />
      {/* line */}
      <polyline points={toPolyline(pts)} fill="none"
        stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* dots + labels */}
      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="3" fill={color} />
          <text x={p.x} y={H - 1} fill="#9ca3af" fontSize="8"
            fontFamily="monospace" textAnchor="middle">{labels[i]}</text>
        </g>
      ))}
    </svg>
  );
}

/* ── views ────────────────────────────────────────────────── */

const VIEWS = [
  {
    id: 'volume',
    Icon: Package,
    color: '#383afe',
    badge: 'SHIPMENTS',
    kpi: '2,847',
    unit: 'today',
    delta: '+12%',
    sub: 'vs yesterday',
    positive: true,
  },
  {
    id: 'carriers',
    Icon: Truck,
    color: '#18c98d',
    badge: 'ON-TIME DELIVERY',
    kpi: '94.3%',
    unit: 'this month',
    delta: '+1.2 pts',
    sub: 'vs last month',
    positive: true,
  },
  {
    id: 'returns',
    Icon: RotateCcw,
    color: '#dc2d39',
    badge: 'RETURN RATE',
    kpi: '4.2%',
    unit: 'last 30 days',
    delta: '−0.8 pts',
    sub: 'vs prior period',
    positive: true,
  },
];

/* ── main component ───────────────────────────────────────── */

export function AnalyticsVisualization() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const [barAnimate, setBarAnimate] = useState(false);

  // Hold → fade out
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 3800);
    return () => clearTimeout(t);
  }, [activeIdx]);

  // After fade-out: advance + fade in
  useEffect(() => {
    if (!visible) {
      const t = setTimeout(() => {
        setActiveIdx(i => (i + 1) % VIEWS.length);
        setVisible(true);
        setBarAnimate(false);
      }, 480);
      return () => clearTimeout(t);
    }
  }, [visible]);

  // Trigger bar animation shortly after view becomes visible
  useEffect(() => {
    if (visible && VIEWS[activeIdx].id === 'carriers') {
      const t = setTimeout(() => setBarAnimate(true), 80);
      return () => clearTimeout(t);
    }
  }, [visible, activeIdx]);

  const view = VIEWS[activeIdx];

  return (
    <div className="w-full h-full flex flex-col bg-white overflow-hidden">

      {/* ── Header ── */}
      <div className="px-4 py-3 flex items-center gap-2 flex-shrink-0" style={{ backgroundColor: '#383afe' }}>
        <BarChart3 className="w-3.5 h-3.5 text-white" />
        <span className="font-mono text-xs font-bold tracking-wider text-white">ANALYTICS</span>
      </div>

      <div className="flex-1 min-h-0 flex flex-col gap-2.5 p-3">

      {/* ── Animated content ── */}
      <div
        className="flex-1 flex flex-col gap-3 min-h-0"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0px)' : 'translateY(-5px)',
          transition: 'opacity 440ms ease, transform 440ms ease',
        }}
      >
        {/* KPI row */}
        <div className="flex items-end justify-between gap-3 flex-shrink-0">
          <div>
            <span
              className="font-mono text-[9px] font-bold px-1.5 py-0.5 rounded-full"
              style={{ backgroundColor: `${view.color}18`, color: view.color }}
            >
              {view.badge}
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-mono font-bold text-2xl text-gray-900 leading-none">{view.kpi}</span>
              <span className="font-mono text-[10px] text-gray-400">{view.unit}</span>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <div
              className="font-mono text-xs font-bold px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: view.positive ? '#18c98d18' : '#dc2d3918',
                color: view.positive ? '#18c98d' : '#dc2d39',
              }}
            >
              {view.delta}
            </div>
            <div className="font-mono text-[10px] text-gray-400 mt-0.5">{view.sub}</div>
          </div>
        </div>

        {/* Chart area */}
        <div className="flex-1 flex flex-col justify-center min-h-0">
          {view.id === 'volume' && (
            <>
              <SparkArea data={SHIPMENTS_14D} color={view.color} />
              <div className="flex justify-between mt-1">
                <span className="font-mono text-[9px] text-gray-300">14 DAYS AGO</span>
                <span className="font-mono text-[9px] font-bold" style={{ color: view.color }}>TODAY</span>
              </div>
            </>
          )}

          {view.id === 'carriers' && (
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between mb-1">
                <span className="font-mono text-[10px] text-gray-400">Carrier</span>
                <span className="font-mono text-[10px] text-gray-400">On-Time %</span>
              </div>
              <CarrierBars carriers={CARRIERS} color={view.color} animate={barAnimate} />
              <div className="flex items-center gap-1.5 mt-1">
                <div className="w-4 h-0.5 border-t border-dashed border-gray-300" />
                <span className="font-mono text-[9px] text-gray-400">Industry avg: 88%</span>
              </div>
            </div>
          )}

          {view.id === 'returns' && (
            <>
              <ReturnLine
                data={RETURNS_6W}
                labels={RETURNS_LBL}
                target={RETURNS_TARGET}
                color={view.color}
              />
              <div className="flex items-center gap-3 mt-1.5">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-0.5 rounded-full" style={{ backgroundColor: view.color }} />
                  <span className="font-mono text-[9px] text-gray-400">Actual</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-0.5 border-t border-dashed border-gray-400" />
                  <span className="font-mono text-[9px] text-gray-400">Target (5.0%)</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── Progress dots ── */}
      <div className="flex items-center justify-center gap-1.5 flex-shrink-0 pt-0.5">
        {VIEWS.map((v, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === activeIdx ? '14px' : '5px',
              height: '5px',
              backgroundColor: i === activeIdx ? view.color : '#e5e7eb',
            }}
          />
        ))}
      </div>

      </div>
    </div>
  );
}
