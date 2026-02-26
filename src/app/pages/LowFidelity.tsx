import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import {
  Package, RotateCcw, TrendingUp, BarChart3,
  ChevronDown, Menu, X, ArrowRight, Bell, Check,
  Users, Shield, Zap, Database, MessageCircle
} from 'lucide-react';
import { HeroIcon3D } from '../components/HeroIcon3D';
import { AlertsVisualization } from '../components/AlertsVisualization';
import { AnalyticsVisualization } from '../components/AnalyticsVisualization';
import { ShipmentCounter } from '../components/ShipmentCounter';
import { CustomScrollbar } from '../components/CustomScrollbar';
import { ComparisonSection } from '../components/ComparisonSection';
import { ReadyShipperSection } from '../components/ReadyShipperSection';
import { ReadyReturnsSection } from '../components/ReadyReturnsSection';
import { ReadyShipperLogo } from '../components/ReadyShipperLogo';
import { ReadyReturnsLogo } from '../components/ReadyReturnsLogo';

/* ─────────────────────────── Featured brand logos ──────────────────── */
const COMPANY_LOGOS = [
  { src: '/featured-brands/ah-logo-color.svg',                     name: 'American Hanger'        },
  { src: '/featured-brands/cs-logo-color.svg',                     name: 'CS'                     },
  { src: '/featured-brands/dianese.svg',                           name: 'Dainese'                },
  { src: '/featured-brands/foot-locker.svg',                       name: 'Foot Locker',    tall: true },
  { src: '/featured-brands/of-logo-768x178.svg',                   name: 'Original Footwear'      },
  { src: '/featured-brands/revolve-1.svg',                         name: 'Revolve'                },
  { src: '/featured-brands/Blue-Cross-Blue-Shield-Logo-thumb.svg', name: 'Blue Cross',     tall: true },
  { src: '/featured-brands/ca.gov-portal-logo-bear.svg',           name: 'CA.gov'                 },
  { src: '/featured-brands/Crocs_wordmark.svg.svg',                name: 'Crocs'                  },
  { src: '/featured-brands/redbull-logo.jpg',                      name: 'Red Bull',       tall: true },
];

/* ─────────────────────────── Nav product/solution data ──────────────── */
const PRODUCTS = [
  { icon: Package,    label: 'ReadyShipper', desc: 'Complete shipping management',    color: '#18c98d' },
  { icon: RotateCcw,  label: 'ReadyReturns', desc: 'Streamlined returns processing',  color: '#dc2d39' },
  { icon: Bell,       label: 'Action Alerts', desc: 'Real-time notification system',  color: '#fdb82b' },
  { icon: BarChart3,  label: 'Analytics',    desc: 'Powerful data insights',          color: '#383afe' },
];
const SOLUTIONS = [
  { icon: Users,  label: 'For E-commerce', desc: 'Scale your online retail with shipping automation' },
  { icon: Shield, label: 'For Enterprise', desc: 'Enterprise-grade security and compliance'         },
  { icon: Zap,    label: 'For SMB',        desc: 'Fast, affordable solutions for growing businesses' },
];

/* ─────────────────────────── AnimatedHeight helper ──────────────────── */
// Uses CSS grid-template-rows trick: animates from 0fr → 1fr (no JS measurement needed)
function AnimatedHeight({ open, children }: { open: boolean; children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: open ? '1fr' : '0fr',
        transition: 'grid-template-rows 350ms cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      <div style={{ overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  );
}

/* ─── Monthly growth stats (keyed by 0-based month index) ─────────── */
const MONTHLY_GROWTH: Record<number, string> = {
  0:  '18%',  // January
  1:  '23%',  // February
  2:  '31%',  // March
  3:  '28%',  // April
  4:  '35%',  // May
  5:  '29%',  // June
  6:  '22%',  // July
  7:  '19%',  // August
  8:  '27%',  // September
  9:  '32%',  // October
  10: '21%',  // November
  11: '25%',  // December
};

/* ─────────────────────────── Main page ──────────────────────────────── */
export default function LowFidelity() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeMenu, setActiveMenu]         = useState<'products' | 'solutions' | null>(null);
  const [displayedMenu, setDisplayedMenu]   = useState<'products' | 'solutions' | null>(null);
  const [cyclingTextIndex, setCyclingTextIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<'products' | 'solutions' | null>(null);
  const [atBottom, setAtBottom] = useState(false);
  const [chatBubbleVisible, setChatBubbleVisible] = useState(true);
  const [growthStat, setGrowthStat] = useState(MONTHLY_GROWTH[new Date().getMonth()] ?? '23%');

  const cyclingTexts = [
    { text: 'quick order fulfillment',    color: '#383afe' },
    { text: 'customer friendly returns',  color: '#dc2d39' },
    { text: 'great communications',       color: '#fdb82b' },
  ];

  useEffect(() => {
    const interval = setInterval(
      () => setCyclingTextIndex(p => (p + 1) % cyclingTexts.length),
      2000
    );
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetch('https://worldtimeapi.org/api/timezone/Etc/UTC')
      .then(r => r.json())
      .then(data => {
        const month = new Date(data.datetime).getMonth();
        setGrowthStat(MONTHLY_GROWTH[month] ?? '23%');
      })
      .catch(() => {
        setGrowthStat(MONTHLY_GROWTH[new Date().getMonth()] ?? '23%');
      });
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const check = () => {
      const dist = el.scrollHeight - el.scrollTop - el.clientHeight;
      // 30px threshold gives enough hysteresis when the card shrinks 12px on reveal
      setAtBottom(dist < 30);
    };
    el.addEventListener('scroll', check, { passive: true });
    check();
    return () => el.removeEventListener('scroll', check);
  }, []);

  const toggleDesktopMenu = (menu: 'products' | 'solutions') => {
    if (activeMenu === menu) {
      setActiveMenu(null);
      setTimeout(() => setDisplayedMenu(null), 500);
    } else {
      setActiveMenu(menu);
      setDisplayedMenu(menu);
    }
  };

  const toggleMobileSection = (section: 'products' | 'solutions') => {
    setMobileExpanded(prev => (prev === section ? null : section));
  };

  return (
    <div className="h-screen overflow-hidden flex flex-col bg-blue-600 pt-3 px-2 sm:px-5">

      {/* ── NAV ── */}
      <nav className="py-3 sm:py-6 mx-auto mb-3 flex-shrink-0 w-full">
        <div className="w-full max-w-[1600px] mx-auto flex items-center justify-between px-4 sm:px-8 lg:px-12">
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <img src="/readycloud-logo-white.svg" alt="ReadyCloud" className="h-7 sm:h-10 lg:h-12 w-auto" />
          </Link>

          {/* Desktop centre nav */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-10">
            {(['products', 'solutions'] as const).map(menu => (
              <button
                key={menu}
                onClick={() => toggleDesktopMenu(menu)}
                className="flex items-center gap-1.5 text-white hover:text-white/80 transition-colors py-2"
              >
                <span className="font-mono text-sm capitalize">{menu}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeMenu === menu ? 'rotate-180' : ''}`} />
              </button>
            ))}
            <Link to="/pricing" className="font-mono text-sm text-white hover:text-white/80 transition-colors py-2">Pricing</Link>
            <button className="font-mono text-sm text-white hover:text-white/80 transition-colors py-2">Integrations</button>
            <button className="font-mono text-sm text-white hover:text-white/80 transition-colors py-2">Become a Partner</button>
          </div>

          {/* Desktop action buttons */}
          <div className="hidden lg:flex gap-3">
            <button className="px-4 py-2 border-2 border-white/30 rounded font-mono text-xs text-white/80 hover:border-white/50 transition-colors">Log in</button>
            <button className="px-4 py-2 border-2 border-white rounded font-mono text-xs text-white hover:bg-white/10 transition-colors">Sign up</button>
            <button className="px-4 py-2 border-2 border-white rounded bg-white font-mono text-xs text-indigo-600 hover:bg-gray-100 transition-colors">Contact sales</button>
          </div>

          {/* Hamburger */}
          <button
            className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => { setMobileMenuOpen(o => !o); setMobileExpanded(null); }}
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6 flex items-center justify-center">
              <Menu  className={`absolute w-6 h-6 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'}`} />
              <X     className={`absolute w-6 h-6 transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'}`} />
            </div>
          </button>
        </div>

        {/* ── Mobile slide-down menu ── */}
        <AnimatedHeight open={mobileMenuOpen}>
          <div className="lg:hidden mt-3 mx-2 sm:mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-4 space-y-1">

              {/* Products */}
              <button
                className="w-full text-left px-4 py-3 font-mono text-sm font-bold text-gray-900 hover:bg-gray-50 rounded-xl flex items-center justify-between transition-colors"
                onClick={() => toggleMobileSection('products')}
              >
                <span>Products</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${mobileExpanded === 'products' ? 'rotate-180' : ''}`} />
              </button>
              <AnimatedHeight open={mobileExpanded === 'products'}>
                <div className="grid grid-cols-2 gap-2 px-2 pb-3 pt-1">
                  {PRODUCTS.map(p => (
                    <button
                      key={p.label}
                      className="flex flex-col items-center text-center p-3 rounded-xl border-2 hover:shadow-md transition-all"
                      style={{ borderColor: p.color, backgroundColor: `${p.color}0d` }}
                    >
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-2" style={{ backgroundColor: p.color }}>
                        <p.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="font-mono text-xs font-bold" style={{ color: p.color }}>{p.label}</div>
                      <div className="font-mono text-[10px] text-gray-500 mt-0.5 leading-tight">{p.desc}</div>
                    </button>
                  ))}
                </div>
              </AnimatedHeight>

              {/* Solutions */}
              <button
                className="w-full text-left px-4 py-3 font-mono text-sm font-bold text-gray-900 hover:bg-gray-50 rounded-xl flex items-center justify-between transition-colors"
                onClick={() => toggleMobileSection('solutions')}
              >
                <span>Solutions</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${mobileExpanded === 'solutions' ? 'rotate-180' : ''}`} />
              </button>
              <AnimatedHeight open={mobileExpanded === 'solutions'}>
                <div className="flex flex-col gap-2 px-2 pb-3 pt-1">
                  {SOLUTIONS.map(s => (
                    <button
                      key={s.label}
                      className="flex items-center gap-3 p-3 rounded-xl border-2 border-gray-200 hover:border-gray-900 hover:shadow-md transition-all text-left"
                    >
                      <div className="w-9 h-9 rounded-xl border-2 border-gray-900 flex items-center justify-center flex-shrink-0 bg-gray-50">
                        <s.icon className="w-4 h-4 text-gray-900" />
                      </div>
                      <div>
                        <div className="font-mono text-xs font-bold text-gray-900">{s.label}</div>
                        <div className="font-mono text-[10px] text-gray-500 leading-tight mt-0.5">{s.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </AnimatedHeight>

              {/* Simple links */}
              <Link
                to="/pricing"
                className="block px-4 py-3 font-mono text-sm font-bold text-gray-900 hover:bg-gray-50 rounded-xl transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >Pricing</Link>
              <button className="w-full text-left px-4 py-3 font-mono text-sm font-bold text-gray-900 hover:bg-gray-50 rounded-xl transition-colors">Integrations</button>
              <button className="w-full text-left px-4 py-3 font-mono text-sm font-bold text-gray-900 hover:bg-gray-50 rounded-xl transition-colors">Become a Partner</button>

              {/* CTA buttons */}
              <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
                <button className="w-full py-3 border-2 border-gray-200 rounded-xl font-mono text-sm font-semibold text-gray-700 hover:border-gray-400 transition-colors">Log in</button>
                <button className="w-full py-3 border-2 border-gray-900 rounded-xl font-mono text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors">Sign up</button>
                <button className="w-full py-3 border-2 border-indigo-600 bg-indigo-600 rounded-xl font-mono text-sm font-semibold text-white hover:bg-indigo-700 transition-colors">Contact sales</button>
              </div>
            </div>
          </div>
        </AnimatedHeight>
      </nav>

      {/* ── Desktop mega menu ── */}
      <div
        className="hidden lg:block overflow-hidden mx-auto mb-3"
        style={{
          maxHeight: activeMenu ? '600px' : '0',
          opacity: activeMenu ? 1 : 0,
          transition: 'max-height 500ms cubic-bezier(0.4,0,0.2,1), opacity 400ms ease',
        }}
      >
        <div className="bg-white rounded-3xl shadow-2xl">
          {displayedMenu === 'products' && (
            <div className="p-8 xl:p-12">
              <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                  <h3 className="text-2xl mb-1">Our Products</h3>
                  <p className="text-gray-500 font-mono text-sm">Comprehensive solutions for your shipping needs</p>
                </div>
                <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 xl:gap-6">
                  {PRODUCTS.map(item => (
                    <div
                      key={item.label}
                      className="p-6 border-2 rounded-xl cursor-pointer group transition-all duration-300 hover:shadow-lg"
                      style={{ borderColor: item.color }}
                      onMouseEnter={e => { e.currentTarget.style.backgroundColor = item.color; e.currentTarget.style.color = 'white'; }}
                      onMouseLeave={e => { e.currentTarget.style.backgroundColor = ''; e.currentTarget.style.color = ''; }}
                    >
                      <div className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center" style={{ backgroundColor: item.color }}>
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="font-mono font-bold mb-1">{item.label}</div>
                      <p className="text-sm font-mono mb-4 text-gray-500 group-hover:text-white/80">{item.desc}</p>
                      <div className="inline-flex items-center gap-2 text-sm font-mono">
                        <span>Learn more</span><ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {displayedMenu === 'solutions' && (
            <div className="p-8 xl:p-12">
              <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                  <h3 className="text-2xl mb-1">Solutions by Industry</h3>
                  <p className="text-gray-500 font-mono text-sm">Tailored for your business type</p>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  {SOLUTIONS.map(item => (
                    <div key={item.label} className="p-6 border-2 border-gray-200 rounded-xl hover:border-gray-900 hover:shadow-lg transition-all cursor-pointer">
                      <div className="w-12 h-12 border-2 border-gray-900 rounded-lg mb-4 flex items-center justify-center bg-gray-50">
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div className="font-mono font-bold mb-1">{item.label}</div>
                      <p className="text-sm text-gray-500 font-mono mb-4">{item.desc}</p>
                      <div className="inline-flex items-center gap-2 text-sm font-mono">
                        <span>Learn more</span><ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Main scrollable card ── */}
      <div
        className={`flex-1 min-h-0 mx-auto w-full bg-white overflow-hidden relative rounded-t-2xl sm:rounded-t-3xl card-bottom-radius ${atBottom ? 'rounded-b-2xl sm:rounded-b-3xl' : 'rounded-b-none'}`}
        style={{
          opacity: activeMenu ? 0.4 : 1,
          filter: activeMenu ? 'blur(2px)' : 'blur(0px)',
          pointerEvents: activeMenu ? 'none' : 'auto',
          transition: 'opacity 400ms ease, filter 400ms ease',
        }}
        onClick={() => { if (activeMenu) { setActiveMenu(null); setTimeout(() => setDisplayedMenu(null), 500); } }}
      >
        <div className="h-full overflow-y-auto bg-gray-50 custom-scrollbar" ref={scrollContainerRef}>

          {/* ── HERO ── */}
          <section id="hero" className="bg-white border-b-2 border-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-36 pt-8 sm:pt-14 lg:pt-20 pb-8 sm:pb-12 lg:pb-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">

                {/* Hero graphic – scales down on mobile so floating cards don't clip */}
                <div className="order-1 lg:order-2 flex items-center justify-center w-full"
                  style={{ height: 'clamp(220px, 55vw, 420px)' }}>
                  <div className="w-full h-full hero-graphic-scale">
                    <HeroIcon3D />
                  </div>
                </div>

                {/* Copy */}
                <div className="order-2 lg:order-1 flex flex-col items-center text-center lg:items-start lg:text-left">
                  <div className="inline-block px-4 py-2 border-2 border-gray-400 rounded-full mb-4">
                    <span className="font-mono text-xs tracking-widest">ALL-IN-ONE PLATFORM</span>
                  </div>
                  <h1 className="mb-4 text-3xl sm:text-4xl lg:text-5xl leading-tight">
                    Ship. Return. Retain. Amaze!
                  </h1>
                  <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 leading-relaxed">
                    An excellent customer experience takes more than{' '}
                    <span className="inline-flex flex-wrap justify-center lg:justify-start items-center gap-[0.3em]">
                      <span
                        className="inline-flex justify-center items-center overflow-hidden relative px-3 py-0.5 rounded-full border-2 transition-colors duration-500"
                        style={{
                          minWidth: '260px',
                          height: '1.8em',
                          borderColor: cyclingTexts[cyclingTextIndex].color,
                          backgroundColor: `${cyclingTexts[cyclingTextIndex].color}18`,
                        }}
                      >
                        <span
                          key={cyclingTextIndex}
                          className="inline-block absolute animate-[slotMachine_0.4s_ease-out] text-sm sm:text-base font-semibold whitespace-nowrap"
                          style={{ color: cyclingTexts[cyclingTextIndex].color }}
                        >
                          {cyclingTexts[cyclingTextIndex].text}
                        </span>
                      </span>
                      <span className="text-gray-900">—</span>
                      <span>it takes them all.</span>
                    </span>
                  </p>
                  <div className="relative w-full max-w-md">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 pr-36 border-2 rounded font-mono text-sm focus:outline-none"
                      style={{ borderColor: '#18c98d' }}
                    />
                    <button
                      className="absolute right-1 top-1 bottom-1 px-4 sm:px-5 rounded font-mono text-xs sm:text-sm font-semibold text-white"
                      style={{ backgroundColor: '#18c98d' }}
                    >
                      GET STARTED
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Trusted By */}
            <div className="py-6 sm:py-8 border-t-2 border-gray-200">
              <p className="text-center font-mono text-xs text-gray-400 tracking-widest mb-4 sm:mb-6 px-4">
                TRUSTED BY LEADING COMPANIES
              </p>
              <div className="relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
                {/* animation-duration: faster on mobile (15s) → slower on desktop (40s) via CSS var */}
                <div className="flex items-center ticker-strip">
                  {Array.from({ length: 2 }).flatMap((_, si) =>
                    COMPANY_LOGOS.map((logo, idx) => (
                      <div key={`${si}-${idx}`} className="px-6 sm:px-10 flex items-center justify-center flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity">
                        <img
                          src={logo.src}
                          alt={logo.name}
                          className={`w-auto object-contain max-w-[160px] ${logo.tall ? 'h-12 sm:h-14' : 'h-7 sm:h-9'}`}
                        />
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* ── COMPLETE PLATFORM ── */}
          <section id="together" className="py-12 sm:py-16 lg:py-20 bg-gray-50 border-b-4 border-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-36">

              {/* Header */}
              <div className="text-center mb-10 lg:mb-12">
                <div className="inline-block px-4 py-2 bg-gray-900 text-white rounded-full mb-5">
                  <span className="font-mono text-xs font-semibold tracking-wider">COMPLETE PLATFORM</span>
                </div>
                <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl leading-tight">
                  More Powerful Together
                </h2>
                <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
                  Four products that share data, triggers, and workflows — so every part of your post-purchase experience works better as a whole.
                </p>
              </div>

              {/* 2×2 product card grid */}
              <div className="grid grid-cols-2 gap-3 sm:gap-5 mb-10">

                {/* ReadyShipper */}
                <div className="rounded-2xl overflow-hidden border-2 border-gray-200 bg-white flex flex-col">
                  <div className="px-5 py-2 sm:py-3.5 flex items-center justify-between" style={{ backgroundColor: '#18c98d' }}>
                    <ReadyShipperLogo className="h-5 w-auto brightness-0 invert" />
                    <span className="hidden sm:inline font-mono text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white">SHIPPING</span>
                  </div>
                  <div className="flex-1 p-3 sm:p-5 flex items-center gap-3 sm:gap-4">
                    <div className="hidden sm:flex w-14 h-14 rounded-2xl items-center justify-center flex-shrink-0" style={{ backgroundColor: '#18c98d' }}>
                      <Package className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 flex flex-col gap-1.5 sm:gap-2">
                      {['Compare live rates from 12+ carriers', 'Print labels in bulk with one click', 'Automatic tracking updates to customers'].map(f => (
                        <div key={f} className="flex items-center gap-2 py-1 sm:py-2">
                          <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" style={{ color: '#18c98d' }} />
                          <span className="font-mono text-[11px] sm:text-sm font-medium text-gray-800 leading-tight">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ReadyReturns */}
                <div className="rounded-2xl overflow-hidden border-2 border-gray-200 bg-white flex flex-col">
                  <div className="px-5 py-2 sm:py-3.5 flex items-center justify-between" style={{ backgroundColor: '#dc2d39' }}>
                    <ReadyReturnsLogo className="h-5 w-auto brightness-0 invert" />
                    <span className="hidden sm:inline font-mono text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white">RETURNS</span>
                  </div>
                  <div className="flex-1 p-3 sm:p-5 flex items-center gap-3 sm:gap-4">
                    <div className="hidden sm:flex w-14 h-14 rounded-2xl items-center justify-center flex-shrink-0" style={{ backgroundColor: '#dc2d39' }}>
                      <RotateCcw className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 flex flex-col gap-1.5 sm:gap-2">
                      {['Let customers self-serve returns 24/7', 'Nudge returns toward exchanges automatically', 'Process RMAs without manual work'].map(f => (
                        <div key={f} className="flex items-center gap-2 py-1 sm:py-2">
                          <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" style={{ color: '#dc2d39' }} />
                          <span className="font-mono text-[11px] sm:text-sm font-medium text-gray-800 leading-tight">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Alerts */}
                <div className="rounded-2xl overflow-hidden border-2 border-gray-200 bg-white flex flex-col">
                  <div className="px-5 py-2 sm:py-3.5 flex items-center justify-between" style={{ backgroundColor: '#fdb82b' }}>
                    <div className="flex items-center gap-2.5">
                      <Bell className="w-4 h-4 text-white" />
                      <span className="font-mono text-xs font-bold tracking-wider text-white">ACTION ALERTS</span>
                    </div>
                    <span className="hidden sm:inline font-mono text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white">ALERTS</span>
                  </div>
                  <div className="flex-1 p-3 sm:p-5 flex items-center gap-3 sm:gap-4">
                    <div className="hidden sm:flex w-14 h-14 rounded-2xl items-center justify-center flex-shrink-0" style={{ backgroundColor: '#fdb82b' }}>
                      <Bell className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 flex flex-col gap-1.5 sm:gap-2">
                      {['Trigger offers post-delivery, post-return & more', 'Reach customers via email, SMS, or in-app', 'Re-engage lapsed customers before they churn'].map(f => (
                        <div key={f} className="flex items-center gap-2 py-1 sm:py-2">
                          <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" style={{ color: '#fdb82b' }} />
                          <span className="font-mono text-[11px] sm:text-sm font-medium text-gray-800 leading-tight">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Analytics */}
                <div className="rounded-2xl overflow-hidden border-2 border-gray-200 bg-white flex flex-col">
                  <div className="px-5 py-2 sm:py-3.5 flex items-center justify-between" style={{ backgroundColor: '#383afe' }}>
                    <div className="flex items-center gap-2.5">
                      <BarChart3 className="w-4 h-4 text-white" />
                      <span className="font-mono text-xs font-bold tracking-wider text-white">ANALYTICS</span>
                    </div>
                    <span className="hidden sm:inline font-mono text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white">INSIGHTS</span>
                  </div>
                  <div className="flex-1 p-3 sm:p-5 flex items-center gap-3 sm:gap-4">
                    <div className="hidden sm:flex w-14 h-14 rounded-2xl items-center justify-center flex-shrink-0" style={{ backgroundColor: '#383afe' }}>
                      <BarChart3 className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 flex flex-col gap-1.5 sm:gap-2">
                      {['Monitor carrier performance across all lanes', 'Spot return spikes before they hurt margins', 'Custom reports across all four products'].map(f => (
                        <div key={f} className="flex items-center gap-2 py-1 sm:py-2">
                          <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" style={{ color: '#383afe' }} />
                          <span className="font-mono text-[11px] sm:text-sm font-medium text-gray-800 leading-tight">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button className="px-7 py-3 border-2 border-gray-900 bg-gray-900 rounded-xl font-mono font-semibold text-white hover:bg-gray-800 transition-colors shadow-lg">
                  VIEW PRICING
                </button>
                <button className="px-7 py-3 border-2 border-gray-900 rounded-xl font-mono font-semibold hover:bg-gray-100 transition-colors">
                  WATCH DEMO
                </button>
              </div>

            </div>
          </section>

          {/* ── COMPARISON ── */}
          <ComparisonSection />

          <ReadyShipperSection />
          <ReadyReturnsSection />

          {/* ── ACTION ALERTS & ANALYTICS ── */}
          <section id="alerts-analytics" className="py-12 sm:py-16 lg:py-24 bg-gray-50 border-b-4 border-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-36">
              <div className="text-center mb-10 lg:hidden">
                <h2 className="text-3xl sm:text-4xl font-medium">Alerts &amp; Analytics</h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-5">

                {/* ── Action Alerts — col 1 ── */}
                <div className="flex items-center gap-3 mb-4 lg:mb-0 justify-center lg:justify-start lg:col-start-1 lg:row-start-1">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#fdb82b' }}>
                    <Bell className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl sm:text-4xl hidden lg:block">Action Alerts</h2>
                </div>
                <p className="text-base sm:text-lg text-gray-500 mb-5 lg:mb-0 leading-relaxed text-center lg:text-left lg:col-start-1 lg:row-start-2">
                  Act at the exact moment customers are ready to buy again. Intelligent triggers that fire the right message at the right time.
                </p>
                <div className="grid grid-cols-3 gap-2 mb-6 lg:mb-0 w-full lg:col-start-1 lg:row-start-3">
                  {[
                    { title: 'Upsell Triggers',  desc: 'Automated alerts for buying signals'  },
                    { title: 'Smart Timing',     desc: 'AI-powered contact optimization'      },
                    { title: 'Multi-Channel',    desc: 'Email, SMS, and in-app delivery'       },
                  ].map((f, i) => (
                    <div key={i} className="flex flex-col items-center text-center gap-1.5 p-3 border-2 border-gray-200 rounded-xl bg-white">
                      <Check className="w-4 h-4 text-[#fdb82b] flex-shrink-0" />
                      <div className="font-mono text-xs font-bold text-[#fdb82b] leading-tight">{f.title}</div>
                      <div className="font-mono text-[10px] text-gray-500 leading-tight">{f.desc}</div>
                    </div>
                  ))}
                </div>
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border-2 border-gray-200 bg-white lg:col-start-1 lg:row-start-4">
                  <AlertsVisualization />
                </div>
                <button className="mt-5 lg:mt-0 w-full px-6 py-3 border-2 border-[#fdb82b] bg-[#fdb82b] rounded-xl font-mono font-semibold text-white hover:bg-[#fdb82b]/90 transition-colors shadow-lg lg:col-start-1 lg:row-start-5">
                  LEARN MORE ABOUT ACTION ALERTS
                </button>

                {/* ── Analytics — col 2 ── */}
                <div className="flex items-center gap-3 mt-10 mb-4 lg:mt-0 lg:mb-0 justify-center lg:justify-start lg:col-start-2 lg:row-start-1">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#383afe' }}>
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl sm:text-4xl hidden lg:block">Analytics</h2>
                </div>
                <p className="text-base sm:text-lg text-gray-500 mb-5 lg:mb-0 leading-relaxed text-center lg:text-left lg:col-start-2 lg:row-start-2">
                  See everything. Improve everything. A unified view of your shipping, returns, and customer behavior — in real time.
                </p>
                <div className="grid grid-cols-3 gap-2 mb-6 lg:mb-0 w-full lg:col-start-2 lg:row-start-3">
                  {[
                    { title: 'Real-Time Metrics',    desc: 'Monitor all operations live'         },
                    { title: 'Custom Dashboards',    desc: 'Reports tailored to your needs'      },
                    { title: 'Predictive Insights',  desc: 'Forecast trends proactively'         },
                  ].map((f, i) => (
                    <div key={i} className="flex flex-col items-center text-center gap-1.5 p-3 border-2 border-gray-200 rounded-xl bg-white">
                      <Check className="w-4 h-4 text-[#383afe] flex-shrink-0" />
                      <div className="font-mono text-xs font-bold text-[#383afe] leading-tight">{f.title}</div>
                      <div className="font-mono text-[10px] text-gray-500 leading-tight">{f.desc}</div>
                    </div>
                  ))}
                </div>
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border-2 border-gray-200 bg-white lg:col-start-2 lg:row-start-4">
                  <AnalyticsVisualization />
                </div>
                <button className="mt-5 lg:mt-0 w-full px-6 py-3 border-2 border-[#383afe] bg-[#383afe] rounded-xl font-mono font-semibold text-white hover:bg-[#383afe]/90 transition-colors shadow-lg lg:col-start-2 lg:row-start-5">
                  LEARN MORE ABOUT ANALYTICS
                </button>

              </div>
            </div>
          </section>

          {/* ── STATS & INTEGRATIONS ── */}
          <section id="stats" className="py-12 sm:py-16 lg:py-24 bg-white border-b-4 border-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-36">

              {/* Big counter */}
              <div className="text-center mb-12 sm:mb-20">
                <h3 className="text-3xl sm:text-4xl mb-2">By the Numbers</h3>
                <p className="text-gray-400 font-mono text-sm mb-8">Real-time performance across our platform</p>
                <div className="text-3xl sm:text-7xl lg:text-9xl font-mono mb-3 text-gray-900">
                  <ShipmentCounter />
                </div>
                <div className="text-base sm:text-xl text-gray-500 font-mono">shipments processed since 2023</div>
                <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-50 border-2 border-green-400 rounded-full">
                  <span className="text-sm font-mono text-green-700">↑ {growthStat} from last month</span>
                </div>
              </div>

              {/* Stat cards */}
              <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-4xl mx-auto mb-16 sm:mb-20">
                {[
                  { stat: '4',     label: 'LABELS PER SECOND',  color: '#18c98d', icon: Package    },
                  { stat: '5,600+', label: 'DROPOFF LOCATIONS', color: '#dc2d39', icon: TrendingUp  },
                  { stat: '$20M+', label: 'COST SAVED',         color: '#383afe', icon: BarChart3   },
                ].map((item, idx) => (
                  <div key={idx} className="text-center p-3 sm:p-6 lg:p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all border-2 group" style={{ borderColor: item.color }}>
                    <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl mx-auto mb-2 sm:mb-4 flex items-center justify-center group-hover:scale-110 transition-transform" style={{ border:`2px solid ${item.color}`, backgroundColor:`${item.color}15` }}>
                      <item.icon className="w-4 h-4 sm:w-6 sm:h-6" style={{ color: item.color }} />
                    </div>
                    <div className="text-xl sm:text-4xl lg:text-5xl font-mono font-bold mb-1 sm:mb-2" style={{ color: item.color }}>{item.stat}</div>
                    <div className="text-[9px] sm:text-xs text-gray-500 font-mono font-semibold tracking-wider leading-tight">{item.label}</div>
                  </div>
                ))}
              </div>

              {/* Integrations */}
              <div className="text-center mb-8">
                <h3 className="text-2xl sm:text-3xl mb-2">Integrations &amp; Partners</h3>
                <p className="text-gray-400 font-mono text-sm">Seamlessly connect with the tools you already use</p>
              </div>
              <div className="grid grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3">
                {[
                  { src: '/integrations/shopify.png',                                                               label: 'Shopify'       },
                  { src: '/integrations/amazon.png',                                                                label: 'Amazon'        },
                  { src: '/integrations/ebay-1.png',                                                               label: 'eBay'          },
                  { src: '/integrations/walmart-2020.png',                                                         label: 'Walmart'       },
                  { src: '/integrations/etsy.png',                                                                  label: 'Etsy',          small: true },
                  { src: '/integrations/bigcommerce.png',                                                           label: 'BigCommerce'   },
                  { src: '/integrations/wordpress-logo-woocommerce-plugin-bookings-import-transdirect-24-1.png',   label: 'WooCommerce'   },
                  { src: '/integrations/magento.png',                                                              label: 'Magento'       },
                  { src: '/integrations/shift4shop-logo.png',                                                      label: 'Shift4Shop'    },
                  { src: '/integrations/Pb32lRTl5UngiqlZ.png',                                                     label: 'TikTok Shop',  small: true },
                  { src: '/integrations/zapier-1.webp',                                                            label: 'Zapier'        },
                  { src: '/integrations/quickbooks-desktop-pro-logo.png',                                          label: 'QuickBooks'    },
                  { src: '/integrations/miva-integration.png',                                                     label: 'Miva'          },
                  { src: '/integrations/bydesign-logo.png',                                                        label: 'ByDesign'      },
                  { src: '/integrations/directscale-2020.png',                                                     label: 'DirectScale'   },
                  { src: '/integrations/exigo-logo.svg',                                                           label: 'Exigo'         },
                  { src: '/integrations/xoroerp.png',                                                              label: 'XoroERP'       },
                  { src: '/integrations/nss-1.png',                                                                label: 'NSS'           },
                ].map((item) => (
                  <div key={item.label} className={`aspect-square border-2 border-gray-200 rounded-xl bg-white flex items-center justify-center hover:border-gray-400 hover:shadow-md transition-all cursor-pointer ${item.small ? 'p-8' : 'p-5'}`}>
                    <img
                      src={item.src}
                      alt={item.label}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
              </div>

            </div>
          </section>

          {/* ── CTA + FOOTER ── */}
          <section id="get-started" className="bg-white">
            <div className="py-14 sm:py-20 border-b-2 border-gray-200">
              <div className="max-w-3xl mx-auto px-4 text-center">
                <h2 className="mb-4 text-3xl sm:text-4xl">Ready to Get Started?</h2>
                <p className="text-base sm:text-lg text-gray-500 mb-8 font-mono">
                  Call-to-action copy placeholder text
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button className="px-8 py-3 border-2 border-gray-900 bg-gray-900 rounded-xl font-mono font-semibold text-white hover:bg-gray-800 transition-colors">
                    START FREE TRIAL
                  </button>
                  <button className="px-8 py-3 border-2 border-gray-300 rounded-xl font-mono font-semibold hover:border-gray-900 transition-colors">
                    SCHEDULE DEMO
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 text-white py-10 sm:py-14">
              <div className="max-w-4xl mx-auto px-4 sm:px-8">

                {/* Top: newsletter | divider | nav columns */}
                <div className="flex flex-col lg:flex-row items-start justify-center gap-10 lg:gap-0">

                  {/* Newsletter signup */}
                  <div className="w-full lg:w-64 flex-shrink-0">
                    <img src="/readycloud-logo-white.svg" alt="ReadyCloud" className="h-7 w-auto mb-5" />
                    <p className="font-mono text-sm text-gray-300 mb-5 leading-relaxed">
                      Signup to receive news and alerts about future updates!
                    </p>
                    <div className="flex flex-col gap-2">
                      <input
                        type="email"
                        placeholder="Enter email address*"
                        className="w-full px-3 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-sm font-mono text-white placeholder-gray-500 focus:outline-none focus:border-gray-500"
                      />
                      <button className="w-full px-4 py-2.5 bg-white text-gray-900 rounded-lg font-mono font-semibold text-sm hover:bg-gray-100 transition-colors">
                        Subscribe Now
                      </button>
                    </div>
                  </div>

                  {/* Vertical divider (desktop) / horizontal divider (mobile) */}
                  <div className="hidden lg:block w-px self-stretch bg-gray-700 mx-10 flex-shrink-0" />
                  <div className="lg:hidden w-full h-px bg-gray-700" />

                  {/* Three link columns, evenly spaced */}
                  <div className="flex-1 grid grid-cols-3 gap-6">

                    {/* About Us */}
                    <div className="text-center">
                      <h4 className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">About Us</h4>
                      <div className="space-y-3">
                        <a href="#" className="block font-mono text-sm text-gray-300 hover:text-white transition-colors">Order Labels</a>
                        <a href="#" className="block font-mono text-sm text-gray-300 hover:text-white transition-colors">Pricing</a>
                      </div>
                    </div>

                    {/* Connections */}
                    <div className="text-center">
                      <h4 className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">Connections</h4>
                      <div className="space-y-3">
                        <a href="#" className="block font-mono text-sm text-gray-300 hover:text-white transition-colors">Integrations</a>
                        <a href="#" className="block font-mono text-sm text-gray-300 hover:text-white transition-colors">Developer API Docs</a>
                        <a href="#" className="block font-mono text-sm text-gray-300 hover:text-white transition-colors">Become a Partner</a>
                      </div>
                    </div>

                    {/* Useful Links */}
                    <div className="text-center">
                      <h4 className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">Useful Links</h4>
                      <div className="space-y-3">
                        <a href="#" className="block font-mono text-sm text-gray-300 hover:text-white transition-colors">Blog</a>
                        <a href="#" className="block font-mono text-sm text-gray-300 hover:text-white transition-colors">Contact Us</a>
                        <a href="#" className="block font-mono text-sm text-gray-300 hover:text-white transition-colors">Release Notes</a>
                      </div>
                    </div>

                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-gray-800 text-center">
                  <span className="font-mono text-xs text-gray-500">© 2026 ReadyCloud. All rights reserved.</span>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Custom scrollbar — rendered after scroll container so it always composites on top */}
        <div className="hidden md:block">
          <CustomScrollbar scrollContainerRef={scrollContainerRef} />
        </div>
      </div>

      {/* ── Fixed live chat widget ── */}
      <div className="fixed bottom-6 left-10 z-50 flex flex-col items-start gap-2">
        {/* Speech bubble */}
        {chatBubbleVisible && (
          <div className="relative bg-white rounded-xl shadow-xl border-2" style={{ borderColor: '#2563eb', padding: '10px 14px' }}>
            <div className="flex items-start gap-2">
              <p style={{ fontFamily: 'monospace', fontSize: '12px', color: '#374151', whiteSpace: 'nowrap', lineHeight: 1.5, margin: 0 }}>
                Got any questions?<br />We're happy to help.
              </p>
              <button
                onClick={() => setChatBubbleVisible(false)}
                className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors -mt-0.5"
              >
                <X style={{ width: 12, height: 12 }} />
              </button>
            </div>
            {/* Triangle tail pointing down toward circle button */}
            <div className="absolute" style={{ top: '100%', left: '17px', width: 0, height: 0, borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: '8px solid #2563eb' }} />
            <div className="absolute" style={{ top: '100%', left: '19px', marginTop: '2px', width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '6px solid white' }} />
          </div>
        )}
        {/* Circle button */}
        <div className="rounded-full shadow-xl flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity" style={{ width: '48px', height: '48px', backgroundColor: '#2563eb' }}>
          <MessageCircle style={{ width: 24, height: 24, color: 'white' }} />
        </div>
      </div>

      {/* Bottom blue border — hidden until inner content is fully scrolled */}
      <div
        className="flex-shrink-0 transition-[height] duration-500 ease-out"
        style={{ height: atBottom ? '0.75rem' : '0' }}
      />
    </div>
  );
}
