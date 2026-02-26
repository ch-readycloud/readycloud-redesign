import { useState, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';
import { ReadyReturnsLogo } from './ReadyReturnsLogo';

const COLOR = '#dc2d39';
const INTERVAL_MS = 3000;

const FEATURES = [
  { title: 'Self-Service Portal',  desc: 'Customers handle returns 24/7',           panelLabel: 'CUSTOMER PORTAL'   },
  { title: 'Exchange Incentives',  desc: 'Retain revenue with smart offers',         panelLabel: 'EXCHANGE OFFERS'   },
  { title: 'Automated RMA',        desc: 'Generate labels instantly',                panelLabel: 'RMA PROCESSING'    },
  { title: 'Returns Analytics',    desc: 'Track patterns and improve products',      panelLabel: 'RETURNS ANALYTICS' },
];

// Sparkline for return rate [5.8→5.4→5.1→4.9→4.7→4.2], viewBox 220×56
// min=4.2, max=5.8, range=1.6, pad=5.6, usable_h=44.8
const SPARK_LINE = '0,5.6 44,16.8 88,25.2 132,30.8 176,36.4 220,50.4';
const SPARK_AREA = `0,56 ${SPARK_LINE} 220,56`;

export function ReadyReturnsSection() {
  const [activeReturnsFeature, setActiveReturnsFeature] = useState(0);
  const [returnsAutoCycle, setReturnsAutoCycle] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!returnsAutoCycle) return;
    const interval = setInterval(() => setActiveReturnsFeature((prev) => (prev + 1) % 4), INTERVAL_MS);
    return () => clearInterval(interval);
  }, [returnsAutoCycle]);

  useEffect(() => {
    setProgress(0);
    const t = setTimeout(() => setProgress(100), 30);
    return () => clearTimeout(t);
  }, [activeReturnsFeature]);

  const handleFeatureClick = (idx: number) => {
    if (idx === activeReturnsFeature && !returnsAutoCycle) {
      setProgress(0);
      setTimeout(() => setProgress(100), 30);
      setReturnsAutoCycle(true);
    } else {
      setActiveReturnsFeature(idx);
      setReturnsAutoCycle(false);
    }
  };

  return (
    <section id="readyreturns" className="py-12 sm:py-16 lg:py-24 bg-gray-50 border-b-4 border-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-36">
        <div className="text-center mb-8 sm:mb-16">
          <ReadyReturnsLogo className="h-14 sm:h-20 w-auto mx-auto" />
          <p className="text-base sm:text-lg text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
            Turn returns into exchanges, not lost revenue. A frictionless portal that recovers customers instead of just processing refunds.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">

          {/* Feature selector + CTA (right on desktop) */}
          <div className="flex flex-col justify-between lg:order-2 order-2">
            <div className="grid grid-cols-2 gap-3 lg:flex lg:flex-col lg:gap-0 lg:space-y-3">
              {FEATURES.map((feature, idx) => (
                <div
                  key={idx}
                  onClick={() => handleFeatureClick(idx)}
                  className={`flex items-start gap-3 p-4 border-2 rounded-xl transition-colors cursor-pointer ${
                    activeReturnsFeature === idx
                      ? 'border-[#dc2d39] bg-[#dc2d39]/10 shadow-lg'
                      : 'border-gray-300 bg-white hover:border-[#dc2d39]/50 hover:shadow-md'
                  }`}
                >
                  <div className={`w-5 h-5 border-2 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors ${
                    activeReturnsFeature === idx ? 'border-[#dc2d39] bg-[#dc2d39]' : 'border-gray-400 bg-white'
                  }`}>
                    <div className={`w-2 h-2 rounded-full bg-white transition-opacity ${activeReturnsFeature === idx ? 'opacity-100' : 'opacity-0'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`font-mono mb-1 text-sm font-semibold ${activeReturnsFeature === idx ? 'text-[#dc2d39]' : 'text-gray-900'}`}>
                      {feature.title}
                    </div>
                    <div className="text-xs text-gray-600 font-mono leading-relaxed">{feature.desc}</div>
                    <div className="mt-2 h-4 flex items-center" style={{ opacity: activeReturnsFeature === idx ? 1 : 0 }}>
                      {returnsAutoCycle ? (
                        <div className="h-px w-full bg-[#dc2d39]/20 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#dc2d39] rounded-full"
                            style={{ width: `${progress}%`, transition: progress === 0 ? 'none' : `width ${INTERVAL_MS}ms linear` }}
                          />
                        </div>
                      ) : (
                        <span className="font-mono text-[10px] text-gray-400 tracking-widest uppercase select-none">
                          ⏸ Paused · click to resume
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-6 px-8 py-3 border-2 border-[#dc2d39] bg-[#dc2d39] rounded-lg hover:bg-[#dc2d39]/90 transition-colors shadow-lg w-full">
              <span className="font-mono font-semibold text-white">LEARN MORE ABOUT READYRETURNS</span>
            </button>
          </div>

          {/* Mockup card (left on desktop) */}
          <div className="flex flex-col lg:order-1 order-1">
            <div className="flex-1 rounded-2xl overflow-hidden border-2 border-gray-200 flex flex-col">

              {/* ── Solid red header ── */}
              <div
                className="px-5 py-4 flex items-center justify-between flex-shrink-0"
                style={{ backgroundColor: COLOR }}
              >
                <div className="flex items-center gap-2.5">
                  <RotateCcw className="w-4 h-4 text-white flex-shrink-0" />
                  <div className="grid [grid-template-areas:'stack']">
                    {FEATURES.map((f, idx) => (
                      <span
                        key={idx}
                        className={`[grid-area:stack] font-mono text-xs font-bold tracking-wider text-white transition-opacity duration-300 ${
                          idx === activeReturnsFeature ? 'opacity-100' : 'opacity-0 pointer-events-none select-none'
                        }`}
                      >
                        {f.panelLabel}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Panel content ── */}
              <div className="flex-1 min-h-0 bg-white p-5 flex flex-col">
                <div className="grid [grid-template-areas:'stack'] min-h-[320px] lg:min-h-0">

                  {/* ── Panel 0: Self-Service Portal ── */}
                  <div className={`[grid-area:stack] h-full flex flex-col gap-4 transition-opacity duration-300 ${activeReturnsFeature === 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="rounded-xl border-2 p-4" style={{ backgroundColor: `${COLOR}0d`, borderColor: `${COLOR}35` }}>
                        <div className="font-mono text-2xl font-bold leading-none" style={{ color: COLOR }}>312</div>
                        <div className="font-mono text-[9px] text-gray-500 uppercase tracking-widest mt-2">Active Returns</div>
                      </div>
                      <div className="rounded-xl border-2 border-gray-100 p-4">
                        <div className="font-mono text-2xl font-bold text-gray-900 leading-none">98%</div>
                        <div className="font-mono text-[9px] text-gray-400 uppercase tracking-widest mt-2">Self-Served</div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2.5">
                      <p className="font-mono text-[9px] text-gray-400 uppercase tracking-widest">Recent Requests</p>
                      {[
                        { order: '#ORD-4521', status: 'Requested',   time: '2m ago',  color: COLOR      },
                        { order: '#ORD-4520', status: 'Label Sent',  time: '15m ago', color: '#383afe'  },
                        { order: '#ORD-4519', status: 'In Transit',  time: '1h ago',  color: '#fdb82b'  },
                        { order: '#ORD-4518', status: 'Received',    time: '3h ago',  color: '#18c98d'  },
                      ].map((item) => (
                        <div key={item.order} className="flex items-center justify-between py-3 px-3.5 bg-white rounded-xl border-2 border-gray-100">
                          <div>
                            <div className="font-mono text-xs font-semibold text-gray-900">{item.order}</div>
                            <div className="font-mono text-[9px] text-gray-400">{item.time}</div>
                          </div>
                          <span
                            className="font-mono text-[9px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: `${item.color}18`, color: item.color }}
                          >
                            {item.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ── Panel 1: Exchange Incentives ── */}
                  <div className={`[grid-area:stack] h-full flex flex-col gap-4 transition-opacity duration-300 ${activeReturnsFeature === 1 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    {/* Conversion KPI */}
                    <div className="rounded-xl border-2 p-4" style={{ backgroundColor: '#18c98d0d', borderColor: '#18c98d50' }}>
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-mono text-[9px] font-bold uppercase tracking-widest mb-1" style={{ color: '#18c98d' }}>Exchange Conversion</div>
                          <div className="font-mono text-2xl font-bold text-gray-900 leading-none">67%</div>
                          <div className="font-mono text-[10px] text-gray-500 mt-1">of returns saved as exchanges</div>
                        </div>
                        <div className="font-mono text-[9px] font-bold px-2 py-1 rounded-lg" style={{ backgroundColor: '#18c98d25', color: '#18c98d' }}>
                          ↑ +8 pts
                        </div>
                      </div>
                    </div>
                    {/* Funnel */}
                    <div className="flex flex-col gap-2.5">
                      <p className="font-mono text-[9px] text-gray-400 uppercase tracking-widest">Conversion Funnel</p>
                      {[
                        { label: 'Returns Initiated', count: '1,000', pct: 100, color: COLOR      },
                        { label: 'Offered Exchange',  count: '820',   pct: 82,  color: '#fdb82b'  },
                        { label: 'Accepted',          count: '671',   pct: 67,  color: '#18c98d'  },
                      ].map((row) => (
                        <div key={row.label}>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="font-mono text-[10px] text-gray-600">{row.label}</span>
                            <span className="font-mono text-[10px] font-bold" style={{ color: row.color }}>{row.count}</span>
                          </div>
                          <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${row.pct}%`, backgroundColor: row.color }} />
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Top offer */}
                    <div className="rounded-xl border-2 border-gray-100 px-3.5 py-3 flex items-center justify-between">
                      <div>
                        <div className="font-mono text-[9px] text-gray-400 uppercase tracking-widest">Top Performing Offer</div>
                        <div className="font-mono text-sm font-semibold text-gray-900 mt-0.5">+10% Store Credit</div>
                      </div>
                      <span className="font-mono text-sm font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: '#18c98d18', color: '#18c98d' }}>45% accept</span>
                    </div>
                  </div>

                  {/* ── Panel 2: Automated RMA ── */}
                  <div className={`[grid-area:stack] h-full flex flex-col gap-4 transition-opacity duration-300 ${activeReturnsFeature === 2 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="rounded-xl border-2 p-4" style={{ backgroundColor: `${COLOR}0d`, borderColor: `${COLOR}35` }}>
                        <div className="font-mono text-2xl font-bold leading-none" style={{ color: COLOR }}>94%</div>
                        <div className="font-mono text-[9px] text-gray-500 uppercase tracking-widest mt-2">Auto-Approved</div>
                      </div>
                      <div className="rounded-xl border-2 border-gray-100 p-4">
                        <div className="font-mono text-2xl font-bold text-gray-900 leading-none">1.2d</div>
                        <div className="font-mono text-[9px] text-gray-400 uppercase tracking-widest mt-2">Avg Process Time</div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2.5">
                      <p className="font-mono text-[9px] text-gray-400 uppercase tracking-widest">RMA Queue</p>
                      {[
                        { label: 'Pending Approval', value: '12', color: '#fdb82b', pct: 8  },
                        { label: 'Labels Generated', value: '43', color: '#383afe', pct: 30 },
                        { label: 'In Transit Back',  value: '89', color: COLOR,     pct: 62 },
                      ].map((item) => (
                        <div key={item.label} className="py-3 px-3.5 bg-white rounded-xl border-2 border-gray-100 flex flex-col gap-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                              <span className="font-mono text-sm text-gray-700">{item.label}</span>
                            </div>
                            <span className="font-mono text-lg font-bold" style={{ color: item.color }}>{item.value}</span>
                          </div>
                          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${item.pct}%`, backgroundColor: item.color }} />
                          </div>
                        </div>
                      ))}
                      <div className="flex items-center justify-between py-2.5 px-3.5 rounded-xl border-2 border-dashed border-gray-200">
                        <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">Total · Last 24h</span>
                        <span className="font-mono text-sm font-bold text-gray-700">144</span>
                      </div>
                    </div>
                  </div>

                  {/* ── Panel 3: Returns Analytics ── */}
                  <div className={`[grid-area:stack] h-full flex flex-col gap-3 transition-opacity duration-300 ${activeReturnsFeature === 3 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    {/* Return rate KPI */}
                    <div className="flex items-end justify-between flex-shrink-0">
                      <div>
                        <span className="font-mono text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ backgroundColor: `${COLOR}18`, color: COLOR }}>RETURN RATE</span>
                        <div className="flex items-baseline gap-2 mt-1.5">
                          <span className="font-mono text-2xl font-bold text-gray-900 leading-none">4.2%</span>
                          <span className="font-mono text-[10px] text-gray-400">last 30 days</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: '#18c98d18', color: '#18c98d' }}>↓ −0.8 pts</div>
                        <div className="font-mono text-[9px] text-gray-400 mt-0.5">vs. prior period</div>
                      </div>
                    </div>
                    {/* Sparkline — flex-1 so it grows to fill available height */}
                    <div className="flex-1 min-h-0 rounded-xl border-2 border-gray-100 p-3 flex flex-col">
                      <div className="flex justify-between mb-1.5 flex-shrink-0">
                        <span className="font-mono text-[9px] text-gray-400">6 WEEKS AGO</span>
                        <span className="font-mono text-[9px] font-bold" style={{ color: COLOR }}>NOW</span>
                      </div>
                      <div className="flex-1 min-h-0">
                        <svg viewBox="0 0 220 56" className="w-full h-full" preserveAspectRatio="xMidYMid meet" style={{ minHeight: 40 }}>
                          <defs>
                            <linearGradient id="retFill" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor={COLOR} stopOpacity="0.16" />
                              <stop offset="100%" stopColor={COLOR} stopOpacity="0.01" />
                            </linearGradient>
                          </defs>
                          {[0.25, 0.5, 0.75].map(f => (
                            <line key={f} x1="0" y1={56 * f} x2="220" y2={56 * f} stroke="#f3f4f6" strokeWidth="1" />
                          ))}
                          <polygon points={SPARK_AREA} fill="url(#retFill)" />
                          <polyline points={SPARK_LINE} fill="none" stroke={COLOR} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <circle cx="220" cy="50.4" r="3.5" fill={COLOR} />
                        </svg>
                      </div>
                    </div>
                    {/* Reason bars */}
                    <div className="flex flex-col gap-2 flex-shrink-0">
                      <p className="font-mono text-[9px] text-gray-400 uppercase tracking-widest">Top Return Reasons</p>
                      {[
                        { reason: 'Size Issues',  pct: 35 },
                        { reason: 'Wrong Item',   pct: 25 },
                        { reason: 'Quality',      pct: 20 },
                        { reason: 'Changed Mind', pct: 20 },
                      ].map((item) => (
                        <div key={item.reason}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-mono text-[10px] text-gray-600">{item.reason}</span>
                            <span className="font-mono text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ backgroundColor: `${COLOR}18`, color: COLOR }}>{item.pct}%</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${item.pct}%`, backgroundColor: COLOR }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>{/* end stacked panels */}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
