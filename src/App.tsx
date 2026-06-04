import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { QrCode, Wifi, HeartPulse, ShieldCheck, ArrowRight, Check, ChevronLeft, ChevronRight, ShoppingCart, Loader2, Sparkles } from "lucide-react";
import landingImage from "./assets/landingimage.png";
import explainerImage from "./assets/Explainer.png";
import slide1 from "./assets/slideshow1.png";
import slide2 from "./assets/slideshow2.png";
import slide3 from "./assets/slideshow3.png";
import slide4 from "./assets/slideshow4.png";

const SLIDE_IMAGES = [slide1, slide2, slide3, slide4];

const PRICING_TIERS = [
  {
    name: "Afya Code Sticker",
    price: "3,000",
    description: "Versatile protection for any device.",
    features: ["QR Code Scanning", "Industrial-Grade Adhesive", "Weatherproof Coating", "Ultra-Thin Profile"],
    color: "bg-emerald-50",
    textColor: "text-emerald-900",
    prompt: "A high-quality, professional product shot of a sleek, modern 'Afya Code Sticker' on the back of a premium smartphone. The sticker is circular, featuring a clearly visible QR code. The background is clean and minimalist, highlighting the sticker's medical and tech features."
  },
  {
    name: "Afya Code Lite",
    price: "5,000",
    description: "Essential protection for everyone.",
    features: ["QR Code Scanning", "Durable Silicone Band", "Emergency Contact Info", "Water Resistant"],
    color: "bg-slate-100",
    textColor: "text-slate-900",
    prompt: "A high-quality, professional product shot of a sleek, modern 'Afya Code' health bracelet. The band is accessorized as a stylish bracelet, featuring a clearly visible QR code on a circular silver face. It stores health information. The background is clean and minimalist with floating medical icons, highlighting the band's medical and tech features."
  },
  {
    name: "Afya Code Pro",
    price: "7,000",
    description: "Advanced features for active lifestyles.",
    features: ["QR Code + NFC Tap", "Premium Soft-Touch Finish", "Full Medical History", "Lifetime Data Storage", "Priority Support"],
    color: "bg-blue-600",
    textColor: "text-white",
    popular: true,
    prompt: "A high-quality, professional product shot of a sleek, modern 'Afya Code' health bracelet with a rectangular screen showing a QR code. It is paired with a blue braided cord accessory. The background is clean and minimalist, highlighting the band's medical and tech features."
  },
  {
    name: "Afya Code Elite",
    price: "10,000",
    description: "The ultimate health companion.",
    features: ["QR + NFC + GPS Tracking", "Luxury Metal or Leather Band", "Real-time Health Alerts", "Family Shared Access", "Concierge Setup"],
    color: "bg-slate-900",
    textColor: "text-white",
    prompt: "A high-quality, professional product shot of a sleek, modern 'Afya Code' health bracelet in a luxury gold finish. It features a QR code and NFC tap. The background is clean and minimalist, highlighting the band's medical and tech features."
  }
];

export default function App() {
  const [activeImage, setActiveImage] = useState(0);
  const [generatedImages, setGeneratedImages] = useState<(string | null)[]>(SLIDE_IMAGES.map((url) => url));
  const [loadingStates, setLoadingStates] = useState<boolean[]>([false, false, false, false]);
  const [architectureImage, setArchitectureImage] = useState<string | null>(explainerImage);
  const [loadingArchitecture, setLoadingArchitecture] = useState(false);
  const productSectionRef = useRef<HTMLElement>(null);

  const scrollToProducts = () => {
    productSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const nextImage = () => setActiveImage((prev) => (prev + 1) % PRICING_TIERS.length);
  const prevImage = () => setActiveImage((prev) => (prev - 1 + PRICING_TIERS.length) % PRICING_TIERS.length);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <div className="w-full overflow-hidden">
        <img src={landingImage} alt="Landing" className="w-full h-72 object-cover" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200">
              <HeartPulse size={24} />
            </div>
            <h1 className="font-display text-2xl font-bold tracking-tight text-slate-900">
              Afya<span className="text-blue-600">Code</span>
            </h1>
          </div>
          <nav className="hidden md:block">
            <ul className="flex gap-8 text-sm font-medium text-slate-600">
              <li><button onClick={scrollToProducts} className="hover:text-blue-600 transition-colors">Products</button></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">How it Works</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Security</a></li>
            </ul>
          </nav>
          <button className="rounded-full bg-slate-900 px-6 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition-all active:scale-95">
            Buy Now
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-700/10">
              <span>Now Available in Nigeria</span>
            </div>
            <h2 className="mt-6 font-display text-5xl font-bold leading-tight tracking-tight text-slate-900 sm:text-6xl">
              Your Health Data, <br />
              <span className="text-blue-600">Always Encoded.</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              Afya Code is a smart medical alert system designed for the modern world. 
              With integrated QR codes and NFC technology, first responders and hospitals can access 
              your vital health information instantly.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button 
                onClick={scrollToProducts}
                className="flex items-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95"
              >
                Learn More
                <ArrowRight size={20} />
              </button>
              <div className="flex items-center gap-4 text-sm font-medium text-slate-500">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <img key={i} className="h-8 w-8 rounded-full border-2 border-white bg-slate-200" src={`https://i.pravatar.cc/100?u=${i}`} alt="" />
                  ))}
                </div>
                <span>Trusted by 10,000+ users</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-slate-200 shadow-2xl ring-1 ring-slate-200 flex items-center justify-center">
              {loadingStates[2] ? (
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
                  <p className="text-sm font-medium text-slate-500">Generating preview...</p>
                </div>
              ) : generatedImages[2] ? (
                <img
                  src={generatedImages[2]}
                  alt="Afya Band Hero"
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <Sparkles className="h-12 w-12 text-slate-300" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-8 left-8 text-white">
                <p className="text-sm font-medium opacity-80">Featured Product</p>
                <h3 className="text-2xl font-bold">{PRICING_TIERS[2].name}</h3>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Architecture Section */}
      <section className="bg-slate-900 py-24 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-display text-4xl font-bold tracking-tight">The Afya Code Ecosystem</h2>
              <p className="mt-6 text-lg text-slate-300">
                A seamless integration between physical hardware, mobile monitoring, and hospital systems.
              </p>
              
              <div className="mt-10 space-y-8">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 font-bold">1</div>
                  <div>
                    <h4 className="text-xl font-bold">Get Your Code</h4>
                    <p className="text-slate-400">Purchase a band or sticker and activate it in seconds.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 font-bold">2</div>
                  <div>
                    <h4 className="text-xl font-bold">Sync & Monitor</h4>
                    <p className="text-slate-400">The Afya App monitors your vitals and provides personalized health recommendations.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 font-bold">3</div>
                  <div>
                    <h4 className="text-xl font-bold">Instant Hospital Check-in</h4>
                    <p className="text-slate-400">Hospitals scan your code for a 1-minute automated check-in process.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative aspect-video overflow-hidden rounded-3xl bg-slate-800 shadow-2xl flex items-center justify-center">
              {loadingArchitecture ? (
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
                  <p className="text-sm font-medium text-slate-400">Visualizing architecture...</p>
                </div>
              ) : architectureImage ? (
                <img 
                  src={architectureImage} 
                  alt="System Architecture" 
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <Sparkles className="h-12 w-12 text-slate-700" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase Section */}
      <section ref={productSectionRef} className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900">Explore the Collection</h2>
            <p className="mt-4 text-lg text-slate-600">Choose the style and features that match your life.</p>
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Carousel */}
            <div className="relative group">
              <div className="aspect-square overflow-hidden rounded-3xl bg-slate-100 shadow-inner flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {loadingStates[activeImage] ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center gap-4"
                    >
                      <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
                      <p className="text-sm font-medium text-slate-500">Generating style...</p>
                    </motion.div>
                  ) : generatedImages[activeImage] ? (
                    <motion.img
                      key={activeImage}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4 }}
                      src={generatedImages[activeImage]!}
                      alt={PRICING_TIERS[activeImage].name}
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <Sparkles className="h-12 w-12 text-slate-300" />
                  )}
                </AnimatePresence>
              </div>
              
              <button 
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-slate-900 shadow-lg backdrop-blur-sm hover:bg-white transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-slate-900 shadow-lg backdrop-blur-sm hover:bg-white transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronRight size={24} />
              </button>

              <div className="mt-6 flex justify-center gap-4">
                {PRICING_TIERS.map((tier, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`h-12 w-12 rounded-xl border-2 transition-all overflow-hidden flex items-center justify-center bg-slate-50 ${activeImage === idx ? "border-blue-600 scale-110" : "border-transparent opacity-60 hover:opacity-100"}`}
                  >
                    {generatedImages[idx] ? (
                      <img src={generatedImages[idx]!} className="h-full w-full object-cover" alt="" />
                    ) : (
                      <Loader2 size={16} className="animate-spin text-blue-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                <span>Version: {PRICING_TIERS[activeImage].name}</span>
              </div>
              <h3 className="mt-4 font-display text-3xl font-bold">
                {PRICING_TIERS[activeImage].name.includes("Sticker") ? "Afya Smart Sticker" : "Premium Afya Code"}
              </h3>
              <p className="mt-4 text-lg text-slate-600">
                {PRICING_TIERS[activeImage].name.includes("Sticker") 
                  ? "Our smart stickers are designed to stick to any surface, from phones to laptops. They are durable, waterproof, and feature high-contrast QR codes for instant access."
                  : "Our codes are crafted into medical-grade materials, ensuring comfort for 24/7 wear. Each item is laser-engraved with a unique QR code and embedded with a secure NFC chip."}
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <QrCode size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold">Instant QR Access</h4>
                    <p className="text-sm text-slate-500">Works with any smartphone camera.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <Wifi size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold">NFC Tap Technology</h4>
                    <p className="text-sm text-slate-500">Fastest data sharing for emergency responders.</p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">Select Version</p>
                <div className="mt-4 flex gap-3">
                  {PRICING_TIERS.map((tier, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`px-4 py-2 rounded-full border-2 transition-all text-sm font-bold ${activeImage === idx ? "border-blue-600 bg-blue-50 text-blue-600" : "border-slate-200 text-slate-500 hover:border-slate-300"}`}
                    >
                      {tier.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900">Simple, Transparent Pricing</h2>
            <p className="mt-4 text-lg text-slate-600">Invest in your safety with our tiered versions.</p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {PRICING_TIERS.map((tier, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -8 }}
                className={`relative flex flex-col rounded-3xl p-8 shadow-xl ${tier.color} ${tier.textColor}`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-amber-400 px-4 py-1 text-xs font-bold uppercase tracking-wider text-slate-900">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold">{tier.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">₦{tier.price}</span>
                  <span className="text-sm opacity-70">/ once</span>
                </div>
                <p className="mt-4 text-sm opacity-80">{tier.description}</p>
                
                <ul className="mt-8 flex-1 space-y-4">
                  {tier.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3 text-sm">
                      <Check size={18} className={tier.popular ? "text-amber-400" : "text-blue-600"} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className={`mt-10 flex items-center justify-center gap-2 rounded-xl py-4 font-bold transition-all active:scale-95 ${tier.popular ? "bg-white text-blue-600 hover:bg-slate-50" : "bg-slate-900 text-white hover:bg-slate-800"}`}>
                  <ShoppingCart size={20} />
                  Buy Now
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex items-center gap-2">
              <HeartPulse className="text-blue-600" size={20} />
              <span className="font-display text-lg font-bold tracking-tight">AfyaCode</span>
            </div>
            <p className="text-sm text-slate-500">
              © 2026 Afya Code. Empowering health through technology.
            </p>
            <div className="flex gap-6 text-slate-400">
              <a href="#" className="hover:text-blue-600 transition-colors">Twitter</a>
              <a href="#" className="hover:text-blue-600 transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
