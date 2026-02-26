import { useState, useEffect } from 'react';
import { Bell, Package, RotateCcw, TrendingUp, Star, Zap } from 'lucide-react';

const ALERTS = [
  {
    Icon: Star,
    color: '#fdb82b',
    badge: 'HIGH VALUE',
    title: '63 VIP Customers Ready',
    message: '63 customers hit 5+ orders this month. Prime window to push a loyalty tier upgrade.',
    cta: 'LAUNCH OFFER',
    time: 'Just now',
    channel: 'Email + SMS',
  },
  {
    Icon: Package,
    color: '#18c98d',
    badge: 'UPSELL',
    title: '318 Deliveries Today',
    message: '318 packages confirmed delivered in the last hour — optimal moment for a post-delivery upsell sequence.',
    cta: 'START SEQUENCE',
    time: '4m ago',
    channel: 'In-App',
  },
  {
    Icon: RotateCcw,
    color: '#dc2d39',
    badge: 'RETENTION',
    title: 'Return Spike Detected',
    message: 'Returns up 34% vs. last week. Automated recovery coupons are ready to send to affected segments.',
    cta: 'SEND RECOVERY',
    time: '11m ago',
    channel: 'Email',
  },
  {
    Icon: TrendingUp,
    color: '#383afe',
    badge: 'RE-ENGAGE',
    title: '1,240 Lapsed Customers',
    message: '1,240 customers are 45+ days without an order — your highest-converting re-engagement window.',
    cta: 'START CAMPAIGN',
    time: '18m ago',
    channel: 'Email + SMS',
  },
  {
    Icon: Zap,
    color: '#18c98d',
    badge: 'CROSS-SELL',
    title: 'Purchase Pattern Match',
    message: 'Customers who bought this SKU convert at 41% on accessories within 7 days of delivery.',
    cta: 'SUGGEST ITEMS',
    time: '26m ago',
    channel: 'SMS',
  },
];

export function AlertsVisualization() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  // Hold for 3.2s then fade out
  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 3200);
    return () => clearTimeout(timer);
  }, [activeIdx]);

  // After fade-out (500ms), advance and fade in
  useEffect(() => {
    if (!visible) {
      const timer = setTimeout(() => {
        setActiveIdx(i => (i + 1) % ALERTS.length);
        setVisible(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  const active = ALERTS[activeIdx];
  const older1 = ALERTS[(activeIdx - 1 + ALERTS.length) % ALERTS.length];
  const older2 = ALERTS[(activeIdx - 2 + ALERTS.length) % ALERTS.length];

  return (
    <div className="w-full h-full flex flex-col bg-white overflow-hidden">

      {/* Header */}
      <div className="px-4 py-3 flex items-center gap-2 flex-shrink-0" style={{ backgroundColor: '#fdb82b' }}>
        <Bell className="w-3.5 h-3.5 text-white" />
        <span className="font-mono text-xs font-bold tracking-wider text-white">ACTION ALERTS</span>
      </div>

      <div className="flex-1 min-h-0 flex flex-col gap-2.5 px-3 pt-3 pb-4">

      {/* Notification stack */}
      <div className="flex-1 flex flex-col gap-2 min-h-0 justify-start overflow-hidden">

        {/* Active alert card — fades in/out */}
        <div
          className="border-2 rounded-xl p-3.5 shadow-md flex flex-col gap-2.5 bg-white flex-shrink-0"
          style={{
            borderColor: active.color,
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0px)' : 'translateY(-6px)',
            transition: 'opacity 450ms ease, transform 450ms ease',
          }}
        >
          {/* Top row: icon + badge/title + time */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${active.color}18`, border: `1.5px solid ${active.color}` }}
              >
                <active.Icon className="w-3.5 h-3.5" style={{ color: active.color }} />
              </div>
              <div>
                <span
                  className="font-mono text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                  style={{ backgroundColor: `${active.color}18`, color: active.color }}
                >
                  {active.badge}
                </span>
                <div className="font-mono font-bold text-xs text-gray-900 mt-0.5 leading-tight">
                  {active.title}
                </div>
              </div>
            </div>
            <span className="font-mono text-[10px] text-gray-400 flex-shrink-0 mt-0.5">{active.time}</span>
          </div>

          {/* Message */}
          <p className="font-mono text-[11px] text-gray-500 leading-relaxed">{active.message}</p>

          {/* Footer: channel + CTA */}
          <div
            className="flex items-center justify-between pt-2 border-t border-dashed"
            style={{ borderColor: `${active.color}40` }}
          >
            <span className="font-mono text-[10px] text-gray-400">via {active.channel}</span>
            <button
              className="px-2.5 py-1 rounded-lg font-mono text-[9px] font-bold text-white leading-none"
              style={{ backgroundColor: active.color }}
            >
              {active.cta} →
            </button>
          </div>
        </div>

        {/* Older alert 1 — dimmed row */}
        <div
          className="border-2 rounded-xl px-3.5 py-2.5 bg-white flex items-center gap-2.5 flex-shrink-0"
          style={{ borderColor: older1.color, opacity: 0.4 }}
        >
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${older1.color}18`, border: `1.5px solid ${older1.color}` }}
          >
            <older1.Icon className="w-3 h-3" style={{ color: older1.color }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[9px] font-bold" style={{ color: older1.color }}>
                {older1.badge}
              </span>
              <span className="font-mono text-[9px] text-gray-300">·</span>
              <span className="font-mono text-[9px] text-gray-400">{older1.time}</span>
            </div>
            <div className="font-mono font-bold text-[11px] text-gray-600 truncate">{older1.title}</div>
          </div>
        </div>

        {/* Older alert 2 — more dimmed row */}
        <div
          className="border-2 rounded-xl px-3.5 py-2.5 bg-white flex items-center gap-2.5 flex-shrink-0"
          style={{ borderColor: older2.color, opacity: 0.2 }}
        >
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${older2.color}18`, border: `1.5px solid ${older2.color}` }}
          >
            <older2.Icon className="w-3 h-3" style={{ color: older2.color }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[9px] font-bold" style={{ color: older2.color }}>
                {older2.badge}
              </span>
              <span className="font-mono text-[9px] text-gray-300">·</span>
              <span className="font-mono text-[9px] text-gray-400">{older2.time}</span>
            </div>
            <div className="font-mono font-bold text-[11px] text-gray-400 truncate">{older2.title}</div>
          </div>
        </div>

      </div>

      {/* Progress dots */}
      <div className="flex items-center justify-center gap-1.5 flex-shrink-0 pt-2">
        {ALERTS.map((a, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === activeIdx ? '14px' : '5px',
              height: '5px',
              backgroundColor: i === activeIdx ? active.color : '#e5e7eb',
            }}
          />
        ))}
      </div>

      </div>
    </div>
  );
}
