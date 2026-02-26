import { Fragment } from 'react';
import { Package, RotateCcw, BarChart3, X, Bell, Check, ArrowRight } from 'lucide-react';

const FRAG_TOOLS = [
  { label: 'ShipStation', price: '$99.99/mo', bg: '#1DA3A0', text: 'SS' },
  { label: 'Loop Returns', price: '$129/mo',   bg: '#6B46C1', icon: RotateCcw },
  { label: 'Klaviyo',      price: '$150/mo',   bg: '#1A7740', text: 'K'  },
  { label: 'Triple Whale', price: '$129/mo',   bg: '#1B1F3B', text: 'TW' },
];

const RC_PRODUCTS = [
  { icon: Package,   label: 'ReadyShipper',  color: '#18c98d' },
  { icon: RotateCcw, label: 'ReadyReturns',  color: '#dc2d39' },
  { icon: Bell,      label: 'Action Alerts', color: '#fdb82b' },
  { icon: BarChart3, label: 'Analytics',     color: '#383afe' },
];

export function ComparisonSection() {
  return (
    <section id="value-props" className="py-12 sm:py-16 bg-white border-b-4 border-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-36">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-block px-4 py-2 bg-gray-900 text-white rounded-full mb-5">
            <span className="font-mono text-xs font-semibold tracking-wider">PLATFORM COMPARISON</span>
          </div>
          <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl">Stop Juggling Fragmented Tools</h2>
          <p className="text-base sm:text-xl text-gray-500">One unified platform. Zero headaches.</p>
        </div>

        <div className="flex flex-col gap-5">

          {/* FRAGMENTED */}
          <div className="rounded-2xl overflow-hidden border-2 border-gray-200 bg-white">
            <div
              className="px-5 py-3.5 flex items-center justify-between"
              style={{ backgroundColor: '#dc2d39' }}
            >
              <span className="font-mono text-[9px] font-bold tracking-wider text-white">
                YOUR CURRENT STACK
              </span>
              <div className="flex items-center gap-2.5">
                <X className="w-4 h-4 text-white" />
                <span className="font-mono text-xs font-bold tracking-wider text-white">FRAGMENTED</span>
              </div>
            </div>
            <div className="p-5 sm:p-7 lg:p-8">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-10">

                {/* Left: stats */}
                <div className="flex-shrink-0 lg:w-52 flex items-center justify-between gap-6 lg:flex-col lg:items-start lg:justify-start lg:gap-3">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2.5" style={{ color: '#dc2d39' }}>
                      <X className="w-4 h-4 flex-shrink-0" />
                      <span className="font-mono text-sm font-bold">No data sharing</span>
                    </div>
                    <div className="flex items-center gap-2.5" style={{ color: '#dc2d39' }}>
                      <X className="w-4 h-4 flex-shrink-0" />
                      <span className="font-mono text-sm font-bold">Manual data entry</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 lg:text-left lg:w-full lg:pt-2 lg:border-t-2 lg:border-gray-100">
                    <p className="font-mono text-3xl sm:text-4xl font-bold" style={{ color: '#dc2d39' }}>$558+<span className="text-xl">/mo</span></p>
                    <p className="font-mono text-xs text-gray-400 mt-0.5">and climbing...</p>
                  </div>
                </div>

                {/* Right: tools */}
                <div className="flex-1">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {FRAG_TOOLS.map((tool) => (
                      <div
                        key={tool.label}
                        className="rounded-xl border-2 border-gray-100 p-3 flex flex-col items-center text-center bg-gray-50"
                      >
                        <div
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg mx-auto mb-2 flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: '#9ca3af' }}
                        >
                          {tool.icon
                            ? <tool.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            : <span className="text-white font-bold text-xs sm:text-base leading-none">{tool.text}</span>
                          }
                        </div>
                        <div className="font-mono text-[10px] sm:text-xs font-bold text-gray-700 mb-1">{tool.label}</div>
                        <div className="font-mono font-bold text-xs sm:text-sm mt-auto" style={{ color: '#dc2d39' }}>{tool.price}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center gap-2.5 px-3 py-2 rounded-lg" style={{ backgroundColor: '#dc2d3918', border: '1.5px solid #dc2d3940' }}>
                    <X className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#dc2d39' }} />
                    <span className="font-mono text-[10px] font-bold" style={{ color: '#dc2d39' }}>Requires Zapier ($49.99/mo) just to connect these tools</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* UNIFIED */}
          <div className="rounded-2xl overflow-hidden border-2 border-gray-200 bg-white">
            <div
              className="px-5 py-3.5 flex items-center justify-between"
              style={{ backgroundColor: '#18c98d' }}
            >
              <img src="/readycloud-logo-white.svg" alt="ReadyCloud" className="h-5 w-auto" />
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-white" />
                <span className="font-mono text-xs font-bold tracking-wider text-white">UNIFIED PLATFORM</span>
              </div>
            </div>
            <div className="p-5 sm:p-7 lg:p-8">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-10">

                {/* Left: stats */}
                <div className="flex-shrink-0 lg:w-52 flex items-center justify-between gap-6 lg:flex-col lg:items-start lg:justify-start lg:gap-3">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2.5" style={{ color: '#18c98d' }}>
                      <Check className="w-4 h-4 flex-shrink-0" />
                      <span className="font-mono text-sm font-bold">Real-time data sync</span>
                    </div>
                    <div className="flex items-center gap-2.5" style={{ color: '#18c98d' }}>
                      <Check className="w-4 h-4 flex-shrink-0" />
                      <span className="font-mono text-sm font-bold">Automatic workflows</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 lg:text-left lg:w-full lg:pt-2 lg:border-t-2 lg:border-gray-100">
                    <p className="font-mono text-3xl sm:text-4xl font-bold" style={{ color: '#18c98d' }}>$199<span className="text-xl">/mo</span></p>
                    <p className="font-mono text-xs text-gray-400 mt-0.5">Everything included</p>
                  </div>
                </div>

                {/* Right: connected product tiles */}
                <div className="flex-1">

                  {/* Mobile: 2-col grid (no connectors) */}
                  <div className="grid grid-cols-2 gap-3 sm:hidden">
                    {RC_PRODUCTS.map((p) => (
                      <div
                        key={p.label}
                        className="rounded-xl border-2 p-3 flex flex-col items-center text-center bg-white"
                        style={{ borderColor: p.color }}
                      >
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center mb-2"
                          style={{ backgroundColor: p.color }}
                        >
                          <p.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="font-mono font-bold text-[10px]" style={{ color: p.color }}>{p.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* sm+: flex row with arrow connectors */}
                  <div className="hidden sm:flex items-center gap-1.5">
                    {RC_PRODUCTS.map((p, i) => (
                      <Fragment key={p.label}>
                        <div
                          className="flex-1 rounded-xl border-2 p-3 flex flex-col items-center text-center bg-white"
                          style={{ borderColor: p.color }}
                        >
                          <div
                            className="w-11 h-11 rounded-lg flex items-center justify-center mb-2"
                            style={{ backgroundColor: p.color }}
                          >
                            <p.icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="font-mono font-bold text-xs" style={{ color: p.color }}>{p.label}</div>
                        </div>
                        {i < RC_PRODUCTS.length - 1 && (
                          <ArrowRight className="w-4 h-4 flex-shrink-0 text-gray-300" />
                        )}
                      </Fragment>
                    ))}
                  </div>

                  <div className="mt-3 flex items-center gap-2.5 px-3 py-2 rounded-lg" style={{ backgroundColor: '#18c98d18', border: '1.5px solid #18c98d40' }}>
                    <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#18c98d' }} />
                    <span className="font-mono text-[10px] font-bold" style={{ color: '#18c98d' }}>All four products share data and trigger each other — no middleware required</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
