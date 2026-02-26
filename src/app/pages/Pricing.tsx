import { useState } from 'react';
import { Check, ArrowRight, Menu, X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router';

export default function Pricing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mainProducts = [
    {
      name: 'READYCLOUD CRM',
      price: '$24',
      color: '#383afe',
      features: [
        'All Standard Integrations Included',
        'Action Alerts + Email Marketing',
        'E-Cigs Channel Order Visibility',
        'Customer Plans & Target Segments',
        'Customer Profiles',
        'Share Tags',
        'Contacts',
        'Deals + Links',
        'Reporting'
      ]
    },
    {
      name: '+ ADD SHIPPING',
      price: '$39',
      color: '#18c98d',
      popular: true,
      features: [
        'Plan Prerequisites',
        'Multi-Carrier Support',
        'Easy International Shipping',
        'Discounted USPS Rates',
        'Custom Settings and Folders',
        'CSV/XLSX Support',
        'Automation Rules',
        'Proper Networking',
        'Integrated Labels'
      ]
    },
    {
      name: '+ ADD RETURNS',
      price: '$129',
      color: '#dc2d39',
      features: [
        'Easy Setup - No Coding Required!',
        'Includes Return Interface',
        'Includes Mobile User Interface',
        'PayChoice API/USPS Labels',
        'Customizable Rules for Returns',
        'Proactive Customer Support',
        'Charge Customers for Returns',
        'Returns Activity/Sales Reports',
        'HMA and Restart Options'
      ]
    }
  ];

  const additionalOptions = [
    {
      name: 'INVENTORY & SALES CHANNELS',
      price: 'FREE',
      color: '#2b3154',
      features: [
        'Amazon, Ebay, Shopify, Etsy',
        'WooCommerce, Walmart',
        'Facebook Shop, Instagram'
      ]
    },
    {
      name: 'PREMIUM INTEGRATIONS',
      price: '$99',
      color: '#2b3154',
      features: [
        'Channel Grabber',
        'Netsuite',
        'Shopify Plus'
      ]
    },
    {
      name: 'IT ASSET RETRIEVAL',
      price: 'Contact Us',
      color: '#2b3154',
      features: [
        '+5000 UPS Store Integrations',
        'Asset Certification',
        'Advanced Tracking'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-blue-600 py-3 px-2 sm:px-5">

      {/* ── NAV (matches LowFidelity nav) ── */}
      <nav className="py-3 sm:py-6 mx-auto mb-3">
        <div className="w-full max-w-[1600px] mx-auto flex items-center justify-between px-4 sm:px-8 lg:px-12">
          {/* Logo */}
          <Link to="/low-fidelity" className="flex items-center flex-shrink-0">
            <img src="/readycloud-logo-white.svg" alt="ReadyCloud" className="h-7 sm:h-10 lg:h-12 w-auto" />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-10">
            <Link to="/low-fidelity" className="font-mono text-sm text-white hover:text-white/80 transition-colors py-2 flex items-center gap-1">
              Products <ChevronDown className="w-4 h-4" />
            </Link>
            <button className="font-mono text-sm text-white hover:text-white/80 transition-colors py-2 flex items-center gap-1">
              Solutions <ChevronDown className="w-4 h-4" />
            </button>
            <Link to="/pricing" className="font-mono text-sm text-white font-bold border-b-2 border-white py-2">Pricing</Link>
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
            onClick={() => setMobileMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6 flex items-center justify-center">
              <Menu className={`absolute w-6 h-6 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'}`} />
              <X    className={`absolute w-6 h-6 transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'}`} />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        <div
          style={{
            display: 'grid',
            gridTemplateRows: mobileMenuOpen ? '1fr' : '0fr',
            transition: 'grid-template-rows 350ms cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          <div style={{ overflow: 'hidden' }}>
            <div className="lg:hidden mt-3 mx-2 sm:mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="p-4 space-y-1">
                <Link to="/low-fidelity" onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 font-mono text-sm font-bold text-gray-900 hover:bg-gray-50 rounded-xl transition-colors">
                  Products
                </Link>
                <button className="w-full text-left px-4 py-3 font-mono text-sm font-bold text-gray-900 hover:bg-gray-50 rounded-xl transition-colors">Solutions</button>
                <Link to="/pricing" onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 font-mono text-sm font-bold text-blue-600 hover:bg-gray-50 rounded-xl transition-colors">
                  Pricing
                </Link>
                <button className="w-full text-left px-4 py-3 font-mono text-sm font-bold text-gray-900 hover:bg-gray-50 rounded-xl transition-colors">Integrations</button>
                <button className="w-full text-left px-4 py-3 font-mono text-sm font-bold text-gray-900 hover:bg-gray-50 rounded-xl transition-colors">Become a Partner</button>
                <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
                  <button className="w-full py-3 border-2 border-gray-200 rounded-xl font-mono text-sm font-semibold text-gray-700 hover:border-gray-400 transition-colors">Log in</button>
                  <button className="w-full py-3 border-2 border-gray-900 rounded-xl font-mono text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors">Sign up</button>
                  <button className="w-full py-3 border-2 border-indigo-600 bg-indigo-600 rounded-xl font-mono text-sm font-semibold text-white hover:bg-indigo-700 transition-colors">Contact sales</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Main content card ── */}
      <div className="mx-auto bg-white rounded-2xl sm:rounded-3xl overflow-hidden" style={{ height: 'calc(100vh - 7rem)' }}>
        <div className="h-full overflow-y-auto">

          {/* Hero Section */}
          <section className="py-10 sm:py-16 lg:py-24 bg-white border-b-4 border-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-36 text-center">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl mb-4 sm:mb-6 leading-tight">
                Flexible Pricing<br className="hidden sm:block" /> for Teams of All Sizes!
              </h1>
              <p className="text-sm sm:text-base lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                A standard user license for ReadyCloud gives you access to an orders-based ecommerce CRM solution that
                includes all non-premium Sales Channels, Marketplace and Marketing Integrations. Add Premium Plugins
                for <span className="font-semibold">ReadyShipper™</span> or the premium <span className="font-semibold">ReadyReturns™</span> features outlined in your online
                store, available for an added monthly fee.
              </p>
            </div>
          </section>

          {/* Main Pricing Cards */}
          <section className="py-10 sm:py-16 lg:py-24 bg-white border-b-4 border-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-36">

              {/* Cards: single col → 3 col */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-8 mb-10 sm:mb-12">
                {mainProducts.map((product, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl overflow-hidden border-4 bg-white shadow-xl hover:shadow-2xl transition-all flex flex-col"
                    style={{ borderColor: product.color }}
                  >
                    {/* Header */}
                    <div className="p-5 sm:p-8 text-white text-center" style={{ backgroundColor: product.color }}>
                      {product.popular && (
                        <div className="inline-block px-3 py-1 bg-white/20 rounded-full font-mono text-xs font-bold mb-3">
                          MOST POPULAR
                        </div>
                      )}
                      <div className="font-mono text-xs font-bold tracking-widest mb-3">{product.name}</div>
                      <div className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-1">{product.price}</div>
                      <div className="text-xs sm:text-sm opacity-90 font-mono">per user/month, billed annually</div>
                      <div className="text-xs opacity-75 mt-1 font-mono">Installation &amp; onboarding FREE!</div>
                    </div>

                    {/* Features */}
                    <div className="p-5 sm:p-8 flex-1">
                      <ul className="space-y-2 sm:space-y-3">
                        {product.features.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-3">
                            <div
                              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                              style={{ backgroundColor: `${product.color}20` }}
                            >
                              <Check className="w-3 h-3" style={{ color: product.color }} strokeWidth={3} />
                            </div>
                            <span className="text-sm text-gray-700 font-mono leading-snug">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA */}
                    <div className="px-5 sm:px-8 pb-5 sm:pb-8">
                      <button
                        className="w-full py-3 sm:py-4 rounded-lg font-mono font-bold text-sm tracking-wider text-white transition-all hover:shadow-lg border-2 flex items-center justify-center gap-2"
                        style={{ backgroundColor: product.color, borderColor: product.color }}
                      >
                        TRY FOR FREE
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Options */}
              <div className="pt-8 border-t-2 border-gray-200">
                <div className="mb-5 sm:mb-6 text-center">
                  <h3 className="text-lg sm:text-xl mb-1">Additional Options</h3>
                  <p className="text-gray-600 font-mono text-xs">Extend your platform with these add-ons</p>
                </div>

                {/* single col on mobile, 3 col on sm+ */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  {additionalOptions.map((option, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl overflow-hidden border-2 border-gray-900 bg-white shadow-md hover:shadow-lg transition-all flex flex-col sm:flex-col"
                    >
                      {/* On mobile: horizontal header+price layout */}
                      <div className="flex sm:flex-col items-center sm:items-stretch p-4 sm:p-3 gap-4 sm:gap-0 text-white" style={{ backgroundColor: option.color }}>
                        <div className="flex-1">
                          <div className="font-mono text-xs font-bold tracking-widest sm:mb-3 sm:text-center">{option.name}</div>
                        </div>
                        <div className="text-3xl sm:text-4xl font-bold sm:text-center flex-shrink-0">{option.price}</div>
                      </div>

                      {/* Features */}
                      <div className="p-4 sm:p-3 flex-1">
                        <ul className="space-y-2">
                          {option.features.map((feature, fIdx) => (
                            <li key={fIdx} className="flex items-start gap-2">
                              <div
                                className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                                style={{ backgroundColor: `${option.color}40` }}
                              >
                                <Check className="w-2.5 h-2.5" style={{ color: option.color }} strokeWidth={3} />
                              </div>
                              <span className="text-sm text-gray-700 font-mono leading-tight">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA */}
                      <div className="px-4 sm:px-3 pb-4 sm:pb-3">
                        <button
                          className="w-full py-2.5 rounded-lg font-mono font-bold text-sm tracking-wider text-white transition-all hover:shadow-md flex items-center justify-center gap-1.5"
                          style={{ backgroundColor: option.color }}
                        >
                          {idx === 2 ? 'CONTACT US' : 'ADD TO PLAN'}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </section>

          {/* Footer CTA */}
          <section className="py-12 sm:py-20 lg:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-36 text-center">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl mb-4 sm:mb-6">Ready to Get Started?</h2>
              <p className="text-sm sm:text-lg lg:text-xl text-gray-600 mb-8 sm:mb-10 leading-relaxed max-w-3xl mx-auto">
                Join thousands of businesses using ReadyCloud to streamline their operations
              </p>
              <button className="px-8 sm:px-10 py-3 sm:py-4 border-2 border-gray-900 rounded-xl bg-gray-900 text-white font-mono text-sm hover:bg-gray-800 transition-all inline-flex items-center gap-2">
                START FREE TRIAL
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
