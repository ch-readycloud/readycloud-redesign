import { useState, useEffect, Fragment } from 'react';
import { Package } from 'lucide-react';
import { ReadyShipperLogo } from './ReadyShipperLogo';

const COLOR = '#18c98d';
const INTERVAL_MS = 3000;

const FEATURES = [
  { title: 'Multi-Carrier Integration', desc: 'Connect all your carriers in one platform', panelLabel: 'CARRIER INTEGRATION' },
  { title: 'Smart Rate Shopping',       desc: 'Find the best rates automatically',         panelLabel: 'RATE COMPARISON'      },
  { title: 'Batch Label Printing',      desc: 'Print hundreds of labels instantly',        panelLabel: 'BATCH PRINTING'       },
  { title: 'Real-Time Tracking',        desc: 'Keep customers updated automatically',      panelLabel: 'TRACKING UPDATES'     },
];

function Pipeline({ steps, activeIdx, color }: { steps: string[]; activeIdx: number; color: string }) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex items-center">
        {steps.map((_, i) => (
          <Fragment key={i}>
            {i > 0 && (
              <div className="flex-1 h-0.5" style={{ backgroundColor: i <= activeIdx ? color : '#e5e7eb' }} />
            )}
            <div
              className="w-3 h-3 rounded-full border-2 flex-shrink-0"
              style={
                i < activeIdx
                  ? { backgroundColor: color, borderColor: color }
                  : i === activeIdx
                  ? { backgroundColor: color, borderColor: color, boxShadow: `0 0 0 3px ${color}30` }
                  : { backgroundColor: 'white', borderColor: '#d1d5db' }
              }
            />
          </Fragment>
        ))}
      </div>
      <div className="flex">
        {steps.map((step, i) => (
          <span
            key={i}
            className="font-mono text-[8px] leading-tight text-center"
            style={{ color: i <= activeIdx ? color : '#9ca3af', width: `${100 / steps.length}%` }}
          >
            {step}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ReadyShipperSection() {
  const [activeShipperFeature, setActiveShipperFeature] = useState(0);
  const [shipperAutoCycle, setShipperAutoCycle] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!shipperAutoCycle) return;
    const interval = setInterval(() => setActiveShipperFeature((prev) => (prev + 1) % 4), INTERVAL_MS);
    return () => clearInterval(interval);
  }, [shipperAutoCycle]);

  useEffect(() => {
    setProgress(0);
    const t = setTimeout(() => setProgress(100), 30);
    return () => clearTimeout(t);
  }, [activeShipperFeature]);

  const handleFeatureClick = (idx: number) => {
    if (idx === activeShipperFeature && !shipperAutoCycle) {
      setProgress(0);
      setTimeout(() => setProgress(100), 30);
      setShipperAutoCycle(true);
    } else {
      setActiveShipperFeature(idx);
      setShipperAutoCycle(false);
    }
  };

  return (
    <section id="readyshipper" className="py-12 sm:py-16 lg:py-24 bg-white border-b-4 border-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-36">
        <div className="text-center mb-8 sm:mb-16">
          <ReadyShipperLogo className="h-14 sm:h-20 w-auto mx-auto" />
          <p className="text-base sm:text-lg text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
            Ship smarter across every carrier, automatically. Cut costs, print faster, and keep customers informed without lifting a finger.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">

          {/* Left: mockup card */}
          <div className="flex flex-col">
            {/* overflow-hidden clips the colored header to the card's rounded corners */}
            <div className="flex-1 rounded-2xl overflow-hidden border-2 border-gray-200 flex flex-col">

              {/* ── Solid green header ── */}
              <div
                className="px-5 py-4 flex items-center justify-between flex-shrink-0"
                style={{ backgroundColor: COLOR }}
              >
                <div className="flex items-center gap-2.5">
                  <Package className="w-4 h-4 text-white flex-shrink-0" />
                  <div className="grid [grid-template-areas:'stack']">
                    {FEATURES.map((f, idx) => (
                      <span
                        key={idx}
                        className={`[grid-area:stack] font-mono text-xs font-bold tracking-wider text-white transition-opacity duration-300 ${
                          idx === activeShipperFeature ? 'opacity-100' : 'opacity-0 pointer-events-none select-none'
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

                  {/* ── Panel 0: Multi-Carrier Integration ── */}
                  <div className={`[grid-area:stack] h-full flex flex-col gap-4 transition-opacity duration-300 ${activeShipperFeature === 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    {/* Wide summary callout */}
                    <div className="rounded-xl p-4 border-2" style={{ backgroundColor: `${COLOR}0d`, borderColor: `${COLOR}50` }}>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-mono text-[9px] font-bold uppercase tracking-widest mb-1" style={{ color: COLOR }}>All Carriers Active</div>
                          <div className="font-mono text-2xl font-bold text-gray-900 leading-none">24,891 <span className="text-base font-normal text-gray-400">today</span></div>
                          <div className="font-mono text-[10px] text-gray-500 mt-1">across 12 carriers · 4 regions</div>
                        </div>
                        <div className="font-mono text-[9px] font-bold px-2 py-1 rounded-lg" style={{ backgroundColor: `${COLOR}25`, color: COLOR }}>
                          ↑ +12%
                        </div>
                      </div>
                    </div>
                    {/* Carrier cards — 2-line each */}
                    <div className="flex flex-col gap-2.5">
                      <p className="font-mono text-[9px] text-gray-400 uppercase tracking-widest">Volume by Carrier</p>
                      {[
                        { name: 'UPS',   count: '8,420', share: '34%', pct: 100, color: '#383afe', sync: '2s'  },
                        { name: 'FedEx', count: '7,231', share: '29%', pct: 86,  color: '#18c98d', sync: '8s'  },
                        { name: 'USPS',  count: '5,812', share: '23%', pct: 69,  color: '#fdb82b', sync: '14s' },
                        { name: 'DHL',   count: '3,428', share: '14%', pct: 41,  color: '#dc2d39', sync: '1m'  },
                      ].map((c) => (
                        <div key={c.name} className="rounded-xl border-2 border-gray-100 px-3.5 py-2.5 flex flex-col gap-1.5">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold text-gray-700">{c.name}</span>
                              <span className="font-mono text-xs font-bold" style={{ color: c.color }}>{c.count}</span>
                            </div>
                            <span
                              className="font-mono text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                              style={{ backgroundColor: `${c.color}15`, color: c.color }}
                            >
                              ● {c.sync}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full rounded-full" style={{ width: `${c.pct}%`, backgroundColor: c.color }} />
                            </div>
                            <span className="font-mono text-[9px] text-gray-400 w-6 text-right flex-shrink-0">{c.share}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ── Panel 1: Rate Shopping ── */}
                  <div className={`[grid-area:stack] h-full flex flex-col gap-4 transition-opacity duration-300 ${activeShipperFeature === 1 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    {/* Savings callout */}
                    <div className="rounded-xl p-4 border-2" style={{ backgroundColor: `${COLOR}0d`, borderColor: `${COLOR}50` }}>
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-mono text-[9px] font-bold uppercase tracking-widest mb-1" style={{ color: COLOR }}>Smart Rate Detection</div>
                          <div className="font-mono text-2xl font-bold text-gray-900 leading-none">Save $2.14</div>
                          <div className="font-mono text-[10px] text-gray-500 mt-1">per shipment vs. current default</div>
                        </div>
                        <div className="font-mono text-[9px] font-bold px-2 py-1 rounded-lg" style={{ backgroundColor: `${COLOR}25`, color: COLOR }}>
                          ↓ BEST
                        </div>
                      </div>
                    </div>
                    {/* Rate rows */}
                    <div className="flex flex-col gap-2">
                      <p className="font-mono text-[9px] text-gray-400 uppercase tracking-widest">Rate Comparison</p>
                      {[
                        { carrier: 'FedEx Ground',  days: '2–3 days', price: '$8.42',  pct: 79, best: true  },
                        { carrier: 'USPS Priority', days: '1–3 days', price: '$9.15',  pct: 86, best: false },
                        { carrier: 'UPS Ground',    days: '3–5 days', price: '$10.20', pct: 96, best: false },
                        { carrier: 'USPS First',    days: '5–7 days', price: '$6.28',  pct: 59, best: false },
                      ].map((r) => (
                        <div
                          key={r.carrier}
                          className="flex items-center gap-3 py-3 px-3 rounded-xl border-2"
                          style={r.best
                            ? { backgroundColor: `${COLOR}0d`, borderColor: COLOR }
                            : { backgroundColor: 'white', borderColor: '#e5e7eb' }}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="font-mono text-xs font-semibold text-gray-900 leading-none">{r.carrier}</div>
                            <div className="font-mono text-[9px] text-gray-400 mt-0.5">{r.days}</div>
                          </div>
                          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${r.pct}%`, backgroundColor: r.best ? COLOR : '#d1d5db' }} />
                          </div>
                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            {r.best && (
                              <span className="font-mono text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ backgroundColor: `${COLOR}20`, color: COLOR }}>BEST</span>
                            )}
                            <span className="font-mono text-sm font-bold" style={{ color: r.best ? COLOR : '#374151' }}>{r.price}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ── Panel 2: Batch Printing ── */}
                  <div className={`[grid-area:stack] h-full flex flex-col gap-4 transition-opacity duration-300 ${activeShipperFeature === 2 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    {/* KPI + progress */}
                    <div className="flex flex-col gap-3">
                      <div className="grid grid-cols-2 gap-2.5">
                        <div className="rounded-xl border-2 p-5" style={{ backgroundColor: `${COLOR}0d`, borderColor: `${COLOR}35` }}>
                          <div className="font-mono text-3xl font-bold leading-none" style={{ color: COLOR }}>247</div>
                          <div className="font-mono text-[9px] text-gray-500 uppercase tracking-widest mt-2">Labels Ready</div>
                          <div className="mt-3 pt-3 border-t font-mono text-[10px] text-gray-400" style={{ borderColor: `${COLOR}30` }}>32 labels / min</div>
                        </div>
                        <div className="rounded-xl border-2 border-gray-100 p-5">
                          <div className="font-mono text-3xl font-bold text-gray-900 leading-none">~4 min</div>
                          <div className="font-mono text-[9px] text-gray-400 uppercase tracking-widest mt-2">Est. Print Time</div>
                          <div className="mt-3 pt-3 border-t border-gray-100 font-mono text-[10px] text-gray-400">HP LaserJet · Ready</div>
                        </div>
                      </div>
                      <div className="rounded-xl border-2 border-gray-100 p-4 flex flex-col gap-2.5">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[9px] text-gray-500 uppercase tracking-wide">Batch Progress</span>
                          <span className="font-mono text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ backgroundColor: `${COLOR}18`, color: COLOR }}>87% · 215 / 247</span>
                        </div>
                        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: '87%', backgroundColor: COLOR }} />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[9px] text-gray-400">Est. remaining</span>
                          <span className="font-mono text-[9px] font-semibold text-gray-600">~31 sec</span>
                        </div>
                      </div>
                    </div>
                    {/* Carrier breakdown */}
                    <div className="flex flex-col gap-2.5">
                      <p className="font-mono text-[9px] text-gray-400 uppercase tracking-widest">By Carrier</p>
                      {[
                        { name: 'UPS',   count: 98,  pct: 100, color: '#383afe' },
                        { name: 'FedEx', count: 82,  pct: 84,  color: '#18c98d' },
                        { name: 'USPS',  count: 43,  pct: 44,  color: '#fdb82b' },
                        { name: 'DHL',   count: 24,  pct: 24,  color: '#dc2d39' },
                      ].map((c) => (
                        <div key={c.name} className="flex items-center gap-2.5">
                          <span className="font-mono text-[10px] font-bold text-gray-500 w-9 flex-shrink-0 text-right">{c.name}</span>
                          <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${c.pct}%`, backgroundColor: c.color }} />
                          </div>
                          <span className="font-mono text-[10px] font-bold w-6 flex-shrink-0 text-right" style={{ color: c.color }}>{c.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ── Panel 3: Real-Time Tracking ── */}
                  <div className={`[grid-area:stack] h-full flex flex-col gap-4 transition-opacity duration-300 ${activeShipperFeature === 3 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    {/* Pipeline */}
                    <div className="rounded-xl border-2 border-gray-100 px-4 py-4">
                      <p className="font-mono text-[9px] text-gray-400 uppercase tracking-widest mb-3.5">Shipment Pipeline</p>
                      <Pipeline
                        steps={['PICKED UP', 'IN TRANSIT', 'OUT FOR DEL.', 'DELIVERED']}
                        activeIdx={1}
                        color={COLOR}
                      />
                    </div>
                    {/* Shipment rows */}
                    <div className="flex flex-col gap-2.5">
                      <p className="font-mono text-[9px] text-gray-400 uppercase tracking-widest">Active Shipments</p>
                      {[
                        { id: '#1MF93820', status: 'In Transit',      carrier: 'UPS',   sc: '#383afe', ago: '2h ago'  },
                        { id: '#2KP41762', status: 'Out for Delivery', carrier: 'FedEx', sc: COLOR,     ago: '24m ago' },
                        { id: '#3LX88291', status: 'Delivered',        carrier: 'USPS',  sc: '#fdb82b', ago: '1h ago'  },
                        { id: '#4RQ57204', status: 'In Transit',       carrier: 'DHL',   sc: '#383afe', ago: '3h ago'  },
                      ].map((s) => (
                        <div key={s.id} className="flex items-center justify-between py-3 px-3.5 bg-white rounded-xl border-2 border-gray-100">
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: s.sc }} />
                            <span className="font-mono text-xs font-semibold text-gray-900">{s.id}</span>
                            <span className="font-mono text-[9px] text-gray-400">{s.carrier}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ backgroundColor: `${s.sc}18`, color: s.sc }}>
                              {s.status}
                            </span>
                            <span className="font-mono text-[9px] text-gray-400">{s.ago}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>{/* end stacked panels */}
              </div>
            </div>
          </div>

          {/* Right: feature selector + CTA */}
          <div className="flex flex-col justify-between">
            <div className="grid grid-cols-2 gap-3 lg:flex lg:flex-col lg:gap-0 lg:space-y-3">
              {FEATURES.map((feature, idx) => (
                <div
                  key={idx}
                  onClick={() => handleFeatureClick(idx)}
                  className={`flex items-start gap-3 p-4 border-2 rounded-xl transition-colors cursor-pointer ${
                    activeShipperFeature === idx
                      ? 'border-[#18c98d] bg-[#18c98d]/10 shadow-lg'
                      : 'border-gray-300 bg-white hover:border-[#18c98d]/50 hover:shadow-md'
                  }`}
                >
                  <div className={`w-5 h-5 border-2 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors ${
                    activeShipperFeature === idx ? 'border-[#18c98d] bg-[#18c98d]' : 'border-gray-400 bg-white'
                  }`}>
                    <div className={`w-2 h-2 rounded-full bg-white transition-opacity ${activeShipperFeature === idx ? 'opacity-100' : 'opacity-0'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`font-mono mb-1 text-sm font-semibold ${activeShipperFeature === idx ? 'text-[#18c98d]' : 'text-gray-900'}`}>
                      {feature.title}
                    </div>
                    <div className="text-xs text-gray-600 font-mono leading-relaxed">{feature.desc}</div>
                    <div className="mt-2 h-4 flex items-center" style={{ opacity: activeShipperFeature === idx ? 1 : 0 }}>
                      {shipperAutoCycle ? (
                        <div className="h-px w-full bg-[#18c98d]/20 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#18c98d] rounded-full"
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
            <button className="mt-6 px-8 py-3 border-2 border-[#18c98d] bg-[#18c98d] rounded-lg hover:bg-[#18c98d]/90 transition-colors shadow-lg w-full">
              <span className="font-mono font-semibold text-white">LEARN MORE ABOUT READYSHIPPER</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
