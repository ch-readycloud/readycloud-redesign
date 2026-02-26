import { Link } from 'react-router';
import { Package, RotateCcw, TrendingUp, BarChart3, ChevronDown, Menu, X, ArrowRight, Bell, Check, Users, Shield, Zap, Workflow } from 'lucide-react';
import { HeroIcon3D } from '../components/HeroIcon3D';
import { AlertsVisualization } from '../components/AlertsVisualization';
import { AnalyticsVisualization } from '../components/AnalyticsVisualization';
import { ShipmentCounter } from '../components/ShipmentCounter';

// Company logos
import logoImage from "figma:asset/5d50cddfb6d95c8efa2e833a5da5bd4d033a9579.png";
import forbesLogo from "figma:asset/5b426161fedba611f9e486aa02efd8fa1571a55e.png";
import linkedinLogo from "figma:asset/52ae8e24f19159324b40c0a37f12231a54337073.png";
import googleLogo from "figma:asset/87d82bd8344c7b8eb56199ce06c73edcd5717972.png";

export default function StaticOverview() {
  return (
    <div className="h-screen w-screen overflow-hidden bg-blue-600 p-2">
      {/* Scale everything down to fit on one screen */}
      <div className="h-full w-full origin-top-left" style={{ transform: 'scale(0.32)', transformOrigin: 'top left', width: '312.5%', height: '312.5%' }}>
        <div className="min-h-screen bg-blue-600 py-3 px-5">
          {/* Navigation */}
          <nav className="py-6 mx-auto mb-3">
            <div className="w-full max-w-[1600px] mx-auto flex items-center justify-between px-12">
              <Link to="/static-overview" className="flex items-center gap-2 text-white">
                <img src={logoImage} alt="Logo" className="h-12" />
              </Link>
              
              <div className="flex items-center gap-10">
                <button className="flex items-center gap-1.5 text-white">
                  <span className="font-mono text-sm">Products</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button className="flex items-center gap-1.5 text-white">
                  <span className="font-mono text-sm">Solutions</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                <Link to="/pricing" className="text-white">
                  <span className="font-mono text-sm">Pricing</span>
                </Link>
                <button className="text-white">
                  <span className="font-mono text-sm">Integrations</span>
                </button>
                <button className="text-white">
                  <span className="font-mono text-sm">Become a Partner</span>
                </button>
              </div>

              <div className="flex gap-3">
                <div className="px-5 py-2.5 border-2 border-white/30 rounded flex items-center justify-center">
                  <span className="font-mono text-xs text-white/80">Log in</span>
                </div>
                <div className="px-5 py-2.5 border-2 border-white rounded flex items-center justify-center">
                  <span className="font-mono text-xs text-white">Sign up</span>
                </div>
                <div className="px-5 py-2.5 border-2 border-white rounded bg-white flex items-center justify-center">
                  <span className="font-mono text-xs text-indigo-600">Contact sales</span>
                </div>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <div className="mx-auto bg-white rounded-3xl">
            <div className="bg-gray-50">
              {/* Hero Section */}
              <section className="bg-white border-b-2 border-gray-300">
                <div className="max-w-7xl mx-auto px-36 py-16">
                  <div className="grid grid-cols-2 gap-12 items-stretch">
                    <div className="flex flex-col justify-center">
                      <div className="inline-block px-4 py-2 border-2 border-gray-400 rounded-full mb-4 w-fit">
                        <span className="font-mono text-xs">ALL-IN-ONE PLATFORM</span>
                      </div>
                      <h1 className="mb-4 text-4xl">
                        Ship. Return. Retain. Amaze!
                      </h1>
                      <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                        An excellent customer experience takes more than{' '}
                        <span className="inline-flex items-center gap-[0.3em]">
                          <span 
                            className="inline-flex justify-center items-center px-3 py-0.5 rounded-full border-2"
                            style={{ 
                              borderColor: '#18c98d',
                              backgroundColor: '#18c98d15',
                              color: '#18c98d'
                            }}
                          >
                            quick order fulfillment
                          </span>
                          <span className="text-gray-900">—</span>
                          <span>it takes them all.</span>
                        </span>
                      </p>
                      <div className="flex gap-2 max-w-full">
                        <div className="relative flex-1">
                          <input 
                            type="email" 
                            placeholder="Enter your email"
                            className="w-full px-4 py-2.5 pr-36 border-2 rounded font-mono text-sm"
                            style={{ borderColor: '#18c98d' }}
                          />
                          <button 
                            className="absolute right-1 top-1 bottom-1 px-6 border-2 rounded"
                            style={{
                              borderColor: '#18c98d',
                              backgroundColor: '#18c98d'
                            }}
                          >
                            <span className="text-white font-mono text-sm">GET STARTED</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="h-full rounded-lg bg-white flex items-center justify-center">
                      <div className="w-64 h-64">
                        <HeroIcon3D />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Trusted By */}
                <div className="py-6 border-t-2 border-gray-300">
                  <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-4 px-36">
                      <span className="font-mono text-xs text-gray-500">TRUSTED BY LEADING COMPANIES</span>
                    </div>
                    <div className="flex gap-12 justify-center items-center">
                      <img src={googleLogo} alt="Google" className="h-6 opacity-60 grayscale" />
                      <img src={forbesLogo} alt="Forbes" className="h-6 opacity-60 grayscale" />
                      <img src={linkedinLogo} alt="LinkedIn" className="h-6 opacity-60 grayscale" />
                    </div>
                  </div>
                </div>
              </section>

              {/* Value Props - Before/After */}
              <section className="py-12 bg-gray-50 border-b-4 border-gray-300">
                <div className="max-w-7xl mx-auto px-36">
                  <div className="text-center mb-8">
                    <h2 className="mb-3 text-4xl">Stop Juggling Fragmented Tools</h2>
                    <p className="text-lg text-gray-600">One unified platform. Zero headaches.</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-12">
                    {/* LEFT: Fragmented */}
                    <div>
                      <div className="mb-4">
                        <span className="inline-block px-4 py-1.5 bg-red-600 text-white rounded-full font-mono text-xs font-semibold">FRAGMENTED STACK</span>
                      </div>
                      <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
                        <div className="relative">
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                            <div className="bg-red-500 border-2 border-red-600 rounded-xl p-2 text-center shadow-2xl" style={{ width: '100px' }}>
                              <div className="w-8 h-8 bg-red-600 rounded-lg mx-auto mb-1 flex items-center justify-center">
                                <Workflow className="w-4 h-4 text-white" />
                              </div>
                              <div className="font-mono text-[9px] font-bold text-white mb-0.5">IntegrateHub</div>
                              <div className="text-white font-mono font-bold text-[10px]">$$$$/mo</div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            {[
                              { icon: Package, name: 'ShipTool Pro' },
                              { icon: RotateCcw, name: 'ReturnHub' },
                              { icon: Bell, name: 'AlertSystem' },
                              { icon: BarChart3, name: 'DataDash' }
                            ].map((tool, idx) => (
                              <div key={idx}>
                                <div className="bg-gray-100 border-2 border-dashed border-gray-400 rounded-xl p-3 text-center">
                                  <div className="w-10 h-10 bg-gray-300 rounded-lg mx-auto mb-1 flex items-center justify-center">
                                    <tool.icon className="w-5 h-5 text-gray-600" />
                                  </div>
                                  <div className="font-mono text-[10px] font-bold text-gray-700 mb-1">{tool.name}</div>
                                  <div className="text-red-600 font-mono font-bold text-xs">$$$$/mo</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-center gap-2">
                          {[Shield, Users, Zap].map((Icon, idx) => (
                            <div key={idx} className="w-8 h-8 bg-gray-200 rounded border border-gray-300 flex items-center justify-center opacity-40">
                              <Icon className="w-4 h-4 text-gray-500" />
                            </div>
                          ))}
                          <span className="font-mono text-xs text-gray-500">+6 more</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 space-y-1.5">
                        <div className="flex items-center justify-center gap-2 text-red-600">
                          <X className="w-4 h-4" />
                          <p className="font-mono text-xs font-bold">No data sharing</p>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-red-600">
                          <X className="w-4 h-4" />
                          <p className="font-mono text-xs font-bold">Manual data entry</p>
                        </div>
                        <div className="text-center">
                          <p className="font-mono text-xl font-bold text-red-600">$566+/month</p>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT: Unified */}
                    <div>
                      <div className="mb-4">
                        <span className="inline-block px-4 py-1.5 bg-green-600 text-white rounded-full font-mono text-xs font-semibold">READYCLOUD PLATFORM</span>
                      </div>
                      <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
                        <div className="relative">
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                            <div className="bg-green-500 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
                              <Check className="w-4 h-4 text-white" strokeWidth={3} />
                              <span className="font-mono text-[10px] font-bold text-white whitespace-nowrap">Connected for Free</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            {[
                              { icon: Package, name: 'ReadyShipper', color: '#18c98d' },
                              { icon: RotateCcw, name: 'ReadyReturns', color: '#dc2d39' },
                              { icon: Bell, name: 'Action Alerts', color: '#fdb82b' },
                              { icon: BarChart3, name: 'Analytics', color: '#383afe' }
                            ].map((product, idx) => (
                              <div key={idx} className="flex flex-col items-center text-center p-3 bg-white rounded-xl shadow-md">
                                <div className="w-12 h-12 border-2 rounded-xl flex items-center justify-center mb-1" style={{ borderColor: product.color, backgroundColor: product.color }}>
                                  <product.icon className="w-6 h-6 text-white" />
                                </div>
                                <div className="font-mono text-[11px] font-bold mb-1">{product.name}</div>
                                <div className="font-mono font-bold text-xs" style={{ color: product.color }}>$$/mo</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 space-y-1.5">
                        <div className="flex items-center justify-center gap-2 text-green-600">
                          <Check className="w-4 h-4" />
                          <p className="font-mono text-xs font-bold">Unified data flow</p>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-green-600">
                          <Check className="w-4 h-4" />
                          <p className="font-mono text-xs font-bold">Automated workflows</p>
                        </div>
                        <div className="text-center">
                          <p className="font-mono text-xl font-bold text-green-600">$89/month</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* More Powerful Together Section */}
              <section className="py-12 bg-white border-b-4 border-gray-300">
                <div className="max-w-7xl mx-auto px-36">
                  <div className="text-center mb-8">
                    <h2 className="mb-3 text-4xl">More Powerful Together</h2>
                    <p className="text-lg text-gray-600">Our products work seamlessly as one unified platform</p>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-6">
                    {[
                      { icon: Package, name: 'ReadyShipper', desc: 'Complete shipping management', color: '#18c98d' },
                      { icon: RotateCcw, name: 'ReadyReturns', desc: 'Streamlined returns', color: '#dc2d39' },
                      { icon: Bell, name: 'Action Alerts', desc: 'Real-time notifications', color: '#fdb82b' },
                      { icon: BarChart3, name: 'Analytics', desc: 'Data insights', color: '#383afe' }
                    ].map((product, idx) => (
                      <div key={idx} className="p-4 border-2 rounded-xl" style={{ borderColor: product.color }}>
                        <div className="w-10 h-10 rounded-lg mx-auto mb-2 flex items-center justify-center" style={{ backgroundColor: product.color }}>
                          <product.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-center">
                          <div className="font-mono text-sm font-bold mb-1">{product.name}</div>
                          <p className="text-xs text-gray-600 font-mono">{product.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Product Sections - Compact */}
              <section className="py-12 bg-gray-50 border-b-4 border-gray-300">
                <div className="max-w-7xl mx-auto px-36 space-y-12">
                  {/* ReadyShipper */}
                  <div className="grid grid-cols-2 gap-12">
                    <div className="flex flex-col justify-center">
                      <div className="inline-block px-3 py-1.5 rounded-full mb-3 border-2 w-fit" style={{ borderColor: '#18c98d', backgroundColor: '#18c98d15' }}>
                        <span className="font-mono text-xs" style={{ color: '#18c98d' }}>READY SHIPPER</span>
                      </div>
                      <h2 className="mb-3 text-3xl">Ship Smarter, Not Harder</h2>
                      <p className="text-base text-gray-600 mb-4">
                        Automate your entire shipping workflow with intelligent routing, real-time tracking, and carrier optimization.
                      </p>
                      <div className="space-y-2">
                        {['Multi-carrier shipping', 'Real-time tracking', 'Label automation', 'Rate shopping'].map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded flex items-center justify-center" style={{ backgroundColor: '#18c98d' }}>
                              <Check className="w-3 h-3 text-white" strokeWidth={3} />
                            </div>
                            <span className="font-mono text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-xl border-2 p-8 bg-white flex items-center justify-center" style={{ borderColor: '#18c98d' }}>
                      <ShipmentCounter />
                    </div>
                  </div>

                  {/* ReadyReturns */}
                  <div className="grid grid-cols-2 gap-12">
                    <div className="rounded-xl border-2 p-8 bg-white flex items-center justify-center" style={{ borderColor: '#dc2d39' }}>
                      <div className="text-center">
                        <div className="w-32 h-32 mx-auto rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#dc2d3915' }}>
                          <RotateCcw className="w-16 h-16" style={{ color: '#dc2d39' }} />
                        </div>
                        <p className="font-mono text-sm text-gray-600">Returns Made Easy</p>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="inline-block px-3 py-1.5 rounded-full mb-3 border-2 w-fit" style={{ borderColor: '#dc2d39', backgroundColor: '#dc2d3915' }}>
                        <span className="font-mono text-xs" style={{ color: '#dc2d39' }}>READY RETURNS</span>
                      </div>
                      <h2 className="mb-3 text-3xl">Returns That Build Trust</h2>
                      <p className="text-base text-gray-600 mb-4">
                        Turn returns into retention with a customer-friendly process that's easy for everyone.
                      </p>
                    </div>
                  </div>

                  {/* Action Alerts */}
                  <div className="grid grid-cols-2 gap-12">
                    <div className="flex flex-col justify-center">
                      <div className="inline-block px-3 py-1.5 rounded-full mb-3 border-2 w-fit" style={{ borderColor: '#fdb82b', backgroundColor: '#fdb82b15' }}>
                        <span className="font-mono text-xs" style={{ color: '#fdb82b' }}>ACTION ALERTS</span>
                      </div>
                      <h2 className="mb-3 text-3xl">Stay Ahead of Issues</h2>
                      <p className="text-base text-gray-600 mb-4">
                        Proactive notifications that help you catch and resolve problems before they impact customers.
                      </p>
                    </div>
                    <div className="rounded-xl border-2 p-8 bg-white" style={{ borderColor: '#fdb82b' }}>
                      <AlertsVisualization />
                    </div>
                  </div>

                  {/* Analytics */}
                  <div className="grid grid-cols-2 gap-12">
                    <div className="rounded-xl border-2 p-8 bg-white" style={{ borderColor: '#383afe' }}>
                      <AnalyticsVisualization />
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="inline-block px-3 py-1.5 rounded-full mb-3 border-2 w-fit" style={{ borderColor: '#383afe', backgroundColor: '#383afe15' }}>
                        <span className="font-mono text-xs" style={{ color: '#383afe' }}>ANALYTICS</span>
                      </div>
                      <h2 className="mb-3 text-3xl">Data-Driven Decisions</h2>
                      <p className="text-base text-gray-600 mb-4">
                        Transform shipping data into actionable insights with powerful analytics and reporting.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Get Started */}
              <section className="py-12 bg-white">
                <div className="max-w-5xl mx-auto px-36 text-center">
                  <h2 className="mb-3 text-4xl">Ready to Get Started?</h2>
                  <p className="text-lg text-gray-600 mb-6">
                    Join thousands of companies shipping smarter with ReadyCloud
                  </p>
                  <div className="flex gap-4 justify-center">
                    <button className="px-8 py-3 border-2 rounded" style={{ borderColor: '#18c98d', backgroundColor: '#18c98d' }}>
                      <span className="text-white font-mono text-sm">Start Free Trial</span>
                    </button>
                    <button className="px-8 py-3 border-2 rounded" style={{ borderColor: '#18c98d' }}>
                      <span className="font-mono text-sm" style={{ color: '#18c98d' }}>Contact Sales</span>
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
