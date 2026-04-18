import { useState, useEffect, ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'motion/react';
import { 
  Wind, Sun, Battery, ArrowRight, ShieldCheck, 
  Leaf, Zap, Globe, ChevronsDown, Cpu, BarChart3,
  CheckCircle2, Menu, X
} from 'lucide-react';

const AnimatedCounter = ({ text }: { text: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    const numericMatch = text.match(/[\d.,]+/);
    if (!numericMatch) {
      setDisplayValue(text);
      return;
    }
    
    const numberStr = numericMatch[0];
    const prefix = text.substring(0, text.indexOf(numberStr));
    const suffix = text.substring(text.indexOf(numberStr) + numberStr.length);
    
    const isFloat = numberStr.includes('.');
    const hasCommas = numberStr.includes(',');
    const cleanNumber = parseFloat(numberStr.replace(/,/g, ''));

    let startTime: number;
    const duration = 2000;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const easeOutProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentValue = cleanNumber * easeOutProgress;

      let formattedValue: string;
      if (isFloat) {
        formattedValue = currentValue.toFixed(1);
      } else if (hasCommas) {
        formattedValue = Math.floor(currentValue).toLocaleString();
      } else {
        formattedValue = Math.floor(currentValue).toString();
      }

      setDisplayValue(prefix + formattedValue + suffix);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setDisplayValue(text);
      }
    };

    requestAnimationFrame(step);
  }, [isInView, text]);

  return <span ref={ref}>{displayValue}</span>;
}

const TickerText = ({ children, hoverColor = "text-accent" }: { children: ReactNode, hoverColor?: string }) => (
  <span className="relative inline-flex overflow-hidden">
    <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
      {children}
    </span>
    <span className={`absolute left-0 top-0 inline-block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0 ${hoverColor}`}>
      {children}
    </span>
  </span>
);

export default function App() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity1 = useTransform(scrollY, [0, 500], [1, 0]);

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTech, setActiveTech] = useState(0);

  const techData = [
    { 
      id: "01", 
      title: "Aerospace-grade materials", 
      desc: "Our wind turbine blades use advanced carbon composites making them 40% lighter and 3x stronger than standard blades.",
      image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=1200", 
      tag: "Facility 01",
      status: "Stress Testing"
    },
    { 
      id: "02", 
      title: "Ultra-low degradation", 
      desc: "NovaCell solar panels guarantee 92% performance even after 25 years of extreme UV exposure.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200", 
      tag: "Facility 04",
      status: "UV Exposure Lab"
    },
    { 
      id: "03", 
      title: "Zero-emission assembly", 
      desc: "We build renewables with renewables. Our gigafactory operates entirely on sustainable power.",
      image: "https://images.unsplash.com/photo-1627914619717-380d9082ebca?auto=format&fit=crop&q=80&w=1200", 
      tag: "Gigafactory",
      status: "Energy Positive"
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen text-ink flex flex-col selection:bg-accent selection:text-ink relative w-full overflow-x-hidden">
      
      {/* Premium Minimalist Background System */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-[#FAFCFA] overflow-hidden">
        
        {/* Ultra-subtle Architectural Graph Paper Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_30%,transparent_100%)]" />

        {/* Minimal Soft Edge Lighting (Static, very low opacity) */}
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(167,211,151,0.12)_0%,transparent_70%)] rounded-full mix-blend-multiply" />
        <div className="absolute top-[30%] left-[-20%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(142,196,122,0.06)_0%,transparent_70%)] rounded-full mix-blend-multiply" />
        
        {/* Faint Analog Noise Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-multiply" />
      </div>

      {/* Floating Navbar */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-7xl z-50">
        <nav 
          className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all duration-300 ${
            isScrolled ? 'bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50' : 'bg-transparent'
          }`}
        >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 text-accent relative flex items-center justify-center">
            {/* Custom Nova Star Logo */}
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full animate-[spin_20s_linear_infinite]">
              <path d="M16 0L19.2 12.8L32 16L19.2 19.2L16 32L12.8 19.2L0 16L12.8 12.8L16 0Z" fill="currentColor" />
            </svg>
            <div className="absolute inset-0 m-auto w-[10px] h-[10px] bg-white rounded-full shadow-[0_0_8px_rgba(167,211,151,0.5)]"></div>
          </div>
          <span className="font-display font-black text-xl tracking-tighter text-ink">
            NOVA<span className="text-sage-mid font-medium">ENERGY</span>
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          {['Systems', 'Technology', 'Impact', 'Resources'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="group text-[13px] font-medium uppercase tracking-wider text-ink block"
            >
              <TickerText>{item}</TickerText>
            </a>
          ))}
          <button className="group bg-ink text-white hover:bg-accent hover:text-ink px-6 py-2.5 rounded-full text-xs font-semibold transition-colors duration-300 active:scale-95">
            <TickerText hoverColor="text-ink">Connect with an Engineer</TickerText>
          </button>
        </div>

        <button 
          className="md:hidden p-2 rounded-full transition-all duration-300 hover:bg-accent hover:scale-110 active:scale-95 group"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="text-ink group-hover:text-ink transition-colors" />
          ) : (
            <Menu className="text-ink group-hover:text-ink transition-colors" />
          )}
        </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-bg pt-28 px-6 md:hidden">
          <div className="flex flex-col gap-6 text-lg">
            {['Systems', 'Technology', 'Impact', 'Resources'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="group font-medium text-ink border-b border-line pb-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                <TickerText>{item}</TickerText>
              </a>
            ))}
            <button className="group bg-ink w-full py-4 rounded-xl text-white hover:bg-accent hover:text-ink font-medium mt-4 transition-colors duration-300 active:scale-[0.98]">
              <TickerText hoverColor="text-ink">Connect with an Engineer</TickerText>
            </button>
          </div>
        </div>
      )}

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-32 lg:pt-40 pb-16 lg:pb-20 min-h-[90vh]">
        {/* Left Hero Area */}
        <div className="col-span-1 lg:col-span-6 flex flex-col justify-center z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/40 backdrop-blur-md border border-white/80 shadow-[0_4px_12px_rgba(0,0,0,0.02)] mb-8 text-xs font-bold tracking-[0.2em] uppercase text-sage-dark relative overflow-hidden group hover:bg-white/80 transition-colors">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full duration-1000" />
                <span className="w-2 h-2 rounded-full bg-accent animate-[pulse_2s_ease-in-out_infinite] shadow-[0_0_8px_#A7D397]" />
                Intelligent Renewables
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-[5.5rem] leading-[1] lg:leading-[0.95] font-extrabold tracking-[-0.04em] text-ink mb-6">
                Harvesting <br/> <span className="text-transparent bg-clip-text bg-gradient-to-br from-sage-dark via-sage-mid to-accent">The Infinite.</span>
              </h1>
              <p className="text-lg sm:text-xl leading-relaxed text-sage-mid/90 max-w-[480px] mb-8 lg:mb-10 font-medium">
                We build the architectural foundation for a decarbonized planet through hyper-efficient photovoltaic arrays and kinetic wind infrastructure.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="relative overflow-hidden bg-ink text-white hover:bg-accent hover:text-ink shadow-[0_8px_20px_rgba(17,24,17,0.15)] px-8 py-4 rounded-full font-bold text-sm transition-colors duration-300 active:scale-95 group">
                  <span className="relative z-10 flex items-center justify-center gap-2"><TickerText hoverColor="text-ink">View Catalog 2026</TickerText> <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
                </button>
                <button className="group bg-white/50 backdrop-blur-sm border border-line shadow-[0_4px_20px_rgba(0,0,0,0.02)] text-ink hover:bg-accent px-8 py-4 rounded-full font-bold text-sm transition-colors duration-300 active:scale-95">
                  <TickerText hoverColor="text-ink">Project Calculator</TickerText>
                </button>
              </div>
            </motion.div>
        </div>

        {/* Image Area (Replacing Video) */}
        <div className="col-span-1 lg:col-span-6 relative rounded-[2rem] overflow-hidden bg-ink h-full min-h-[400px] lg:min-h-[500px] shadow-2xl shadow-ink/20 border border-white/20 group mt-4 lg:mt-0">
           <img 
            src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=2000" 
            alt="Vast Solar Energy Field"
            className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-[2s] ease-out"
            referrerPolicy="no-referrer"
           />
           
           {/* Clear, Premium Overlay */}
           <div className="absolute inset-0 bg-gradient-to-tr from-ink/60 via-ink/10 to-transparent pointer-events-none" />
           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(17,24,17,0.4)_100%)] pointer-events-none" />

           {/* Overlay Widget */}
           <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-xl border border-white/20 p-4 pr-6 rounded-2xl flex items-center gap-4 shadow-2xl z-20 group-hover:bg-white/20 transition-all duration-300">
               <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center shadow-lg shadow-accent/20">
                  <Sun className="w-5 h-5 stroke-[2] text-ink" />
               </div>
               <div>
                  <p className="text-[10px] text-accent uppercase font-black tracking-widest mb-0.5">Active Array</p>
                  <p className="text-[14px] font-extrabold text-white">NovaCell Desert Gen-6</p>
               </div>
           </div>
        </div>
      </main>

      {/* Info Strip */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8 md:pt-12 pb-16 md:pb-20">
          <div className="bg-white/40 backdrop-blur-xl p-8 rounded-3xl border border-white/60 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500 flex flex-col justify-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/80 to-transparent rounded-full -mr-16 -mt-16 transition-transform duration-700 group-hover:scale-[2]" />
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-sage-mid mb-2 relative z-10">Solar Gen 6</h3>
              <p className="text-lg font-extrabold text-ink tracking-tight relative z-10">32% Peak Efficiency</p>
          </div>
          <div className="bg-white/40 backdrop-blur-xl p-8 rounded-3xl border border-white/60 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500 flex flex-col justify-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/80 to-transparent rounded-full -mr-16 -mt-16 transition-transform duration-700 group-hover:scale-[2]" />
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-sage-mid mb-2 relative z-10">Kinetic Wind</h3>
              <p className="text-lg font-extrabold text-ink tracking-tight relative z-10">Zero-Vibration Tech</p>
          </div>
          <div className="p-8 flex flex-col justify-center relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-gradient-to-b from-sage-dark to-accent rounded-full hidden md:block opacity-50" />
              <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-ink to-sage-mid tracking-tighter mb-1">12.4<span className="text-4xl text-sage-mid tracking-tight font-bold">GW</span></span>
              <span className="text-[10px] font-black text-sage-dark uppercase tracking-[0.2em] mt-1 block">Active Global Deployment</span>
          </div>
          <div className="bg-gradient-to-br from-accent to-[#8ec47a] p-8 rounded-[2rem] shadow-xl shadow-accent/20 flex flex-col justify-center gap-4 text-ink relative overflow-hidden group">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/20 blur-2xl rounded-full group-hover:scale-150 transition-transform duration-700" />
              <div className="text-sm font-semibold leading-relaxed max-w-[200px] relative z-10">
                  Pioneering sustainable manufacturing <br/>
                  <strong className="font-extrabold mt-1 block text-base">100% Recyclable</strong>
              </div>
              <div className="bg-white/90 backdrop-blur-sm self-start px-4 py-2 rounded-full text-[11px] font-black tracking-widest text-sage-dark shrink-0 relative z-10 shadow-sm">
                  LEED PLATINUM
              </div>
          </div>
      </div>

      {/* Trust & Stats Section */}
      <section className="py-16 md:py-20 relative z-20 border-t border-line bg-gradient-to-b from-white/30 to-transparent">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 py-8">
          {[
            { label: 'Energy Generated', value: '42 TWh+', icon: Zap },
            { label: 'Global Installations', value: '150,000+', icon: Globe },
            { label: 'Carbon Reduced', value: '12M Tons', icon: Leaf },
            { label: 'Efficiency Rating', value: '24.8%', icon: BarChart3 }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
              className="group flex flex-col items-center text-center p-6 space-y-4 hover:-translate-y-2 transition-transform duration-500"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-700" />
                <div className="w-14 h-14 rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-line flex items-center justify-center text-sage-dark mb-2 relative z-10 group-hover:border-accent/40 group-hover:text-accent transition-colors duration-500">
                  <stat.icon className="w-6 h-6 stroke-[1.5]" />
                </div>
              </div>
              <h3 className="text-4xl lg:text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-br from-ink via-sage-dark to-sage-mid tracking-tighter">
                <AnimatedCounter text={stat.value} />
              </h3>
              <p className="text-[10px] font-black text-sage-mid uppercase tracking-[0.2em]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Product Bento Grid */}
      <section id="products" className="py-24 relative z-20 border-t border-line">
        <div className="max-w-7xl mx-auto w-full px-6">
          <div className="mb-16 md:w-2/3">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/40 backdrop-blur-md border border-white/80 shadow-[0_4px_12px_rgba(0,0,0,0.02)] text-sage-dark font-black tracking-[0.2em] uppercase text-[10px] mb-6">
              Our Hardware
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-ink tracking-tight mb-6 max-w-3xl leading-[1.1] md:leading-[1.05]">
              Precision-engineered for <span className="text-transparent bg-clip-text bg-gradient-to-br from-sage-dark via-sage-mid to-accent">maximum yield.</span>
            </h2>
            <p className="text-lg md:text-xl text-sage-mid max-w-2xl leading-relaxed font-medium">
              From residential rooftops to utility-scale wind farms, our hardware is designed to extract every possible watt of energy from the elements.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-[400px] md:auto-rows-[420px]">
             {/* Solar Panels (Large) */}
             <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group lg:col-span-2 relative overflow-hidden rounded-[2rem] bg-ink border border-white/10 p-8 lg:p-10 flex flex-col justify-end shadow-[0_20px_40px_rgba(10,15,10,0.4)]"
            >
              <img 
                src="https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&q=80&w=2000" 
                alt="Solar Panels" 
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-80 transition-all duration-1000 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(167,211,151,0.15)_0%,transparent_60%)] pointer-events-none" />
              <div className="relative z-10 w-full">
                <div className="w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-xl flex items-center justify-center text-accent mb-6 border border-white/20 shadow-[0_0_15px_rgba(167,211,151,0.1)] group-hover:border-accent/40 group-hover:scale-110 transition-all duration-500">
                  <Sun className="w-7 h-7 stroke-[1.5]" />
                </div>
                <h3 className="text-4xl font-display font-bold text-white mb-3 tracking-tight">NovaCell™ Solar</h3>
                <p className="text-white/80 max-w-md mb-8 text-lg leading-relaxed">Monocrystalline panels with industry-leading 24.8% efficiency and a 30-year degradation warranty.</p>
                <a href="#" className="inline-flex font-bold text-white items-center gap-2 hover:gap-4 transition-all text-sm uppercase tracking-widest group-hover:text-accent">
                  Explore Panels <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </motion.div>

            {/* Wind Turbines (Vertical) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group relative overflow-hidden rounded-[2rem] bg-[#0d1610] border border-white/10 p-10 flex flex-col justify-end shadow-[0_20px_40px_rgba(10,15,10,0.4)]"
            >
              <img 
                src="https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&q=80&w=1000" 
                alt="Wind Turbine" 
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-80 transition-all duration-1000 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1610] via-[#0d1610]/50 to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.1)_0%,transparent_50%)] pointer-events-none" />
              <div className="relative z-10 w-full">
                <div className="w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-xl flex items-center justify-center text-white mb-6 border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.05)] group-hover:border-white/40 group-hover:scale-110 transition-all duration-500">
                  <Wind className="w-7 h-7 stroke-[1.5]" />
                </div>
                <h3 className="text-3xl font-display font-bold text-white mb-3 tracking-tight">AeroBlade™</h3>
                <p className="text-white/80 text-base mb-8">Next-gen offshore & onshore turbines.</p>
                <a href="#" className="inline-flex font-bold text-white items-center gap-2 hover:gap-4 transition-all text-sm uppercase tracking-widest group-hover:text-accent">
                  View Data <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </motion.div>

            {/* Storage Battery */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative overflow-hidden rounded-[2rem] bg-[#080d08] border border-white/10 p-10 flex flex-col justify-between shadow-[0_20px_40px_rgba(10,15,10,0.4)]"
            >
              <img 
                src="https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&q=80&w=1000" 
                alt="Energy Storage Server Array" 
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 group-hover:opacity-70 transition-all duration-1000 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080d08] via-[#080d08]/80 to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(167,211,151,0.2)_0%,transparent_60%)] pointer-events-none group-hover:opacity-100 transition-opacity duration-1000" />
              
              <div className="relative z-10 w-full h-full flex flex-col justify-between">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-accent mb-6 border border-white/20 bg-white/5 backdrop-blur-xl shadow-[0_0_15px_rgba(167,211,151,0.1)] group-hover:border-accent/40 group-hover:scale-110 transition-all duration-500">
                  <Battery className="w-7 h-7 stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="text-3xl font-display font-bold text-white mb-3 tracking-tight">PowerVault</h3>
                  <p className="text-white/80 text-base mb-8 max-w-[200px] leading-relaxed">High-density modular energy storage for home and grid.</p>
                  <a href="#" className="inline-flex font-bold text-accent items-center gap-2 hover:gap-4 transition-all text-sm uppercase tracking-widest relative z-10">
                    Learn more <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Smart Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group lg:col-span-2 relative overflow-hidden rounded-[2rem] bg-white border border-line flex flex-col md:flex-row shadow-xl shadow-ink/5"
            >
              <div className="flex-1 px-6 py-10 md:px-8 md:py-12 lg:py-16 lg:pr-12 lg:pl-10 flex flex-col justify-center items-start">
                <div className="w-14 h-14 flex-shrink-0 rounded-2xl border border-line bg-bg flex items-center justify-center text-sage-dark mb-6 shadow-sm group-hover:border-sage-dark/30 group-hover:scale-110 transition-all duration-500">
                  <Cpu className="w-7 h-7 stroke-[1.5]" />
                </div>
                <h3 className="text-3xl font-display font-bold text-ink mb-4 tracking-tight">NovaOS Firmware</h3>
                <p className="text-sage-mid text-lg mb-8 leading-relaxed">Every piece of hardware is connected. Our proprietary AI optimizes panel angles, anticipates wind sheer, and manages battery loads in real-time.</p>
                <div className="flex flex-wrap gap-3">
                  {['Predictive Maintenance', 'Grid Balancing', 'Weather API'].map(tag => (
                    <span key={tag} className="px-4 py-2 bg-bg rounded-xl text-[11px] font-bold text-sage-dark border border-line uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex-1 w-full relative h-[380px] md:h-auto p-4 md:p-6 lg:p-8 flex items-center justify-center border-t md:border-t-0 border-line">
                {/* Modern Dashboard Illustration */}
                <div className="absolute inset-4 md:inset-6 lg:inset-8 bg-[#0A0F0A] rounded-[2rem] overflow-hidden border border-line shadow-2xl shadow-ink/20 group-hover:border-sage-mid/30 transition-colors duration-500">
                  {/* Grid Pattern */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />
                  
                  {/* Glowing Core */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-accent/20 rounded-full blur-[60px]" />
                  
                  <div className="w-full h-full relative p-8 flex flex-col justify-between">
                    {/* Top UI element */}
                    <div className="flex justify-between items-center bg-white/5 backdrop-blur-md border border-white/10 p-3 rounded-xl shadow-lg">
                       <div className="flex items-center gap-3">
                         <div className="relative flex h-3 w-3">
                           <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                           <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                         </div>
                         <span className="text-[10px] uppercase tracking-widest text-white/80 font-bold">Grid Synced</span>
                       </div>
                       <div className="flex gap-1.5 items-end h-4">
                         <div className="w-1 h-2 bg-white/20 rounded-full" />
                         <div className="w-1 h-4 bg-accent/80 rounded-full" />
                         <div className="w-1 h-3 bg-white/40 rounded-full" />
                         <div className="w-1 h-1 bg-white/20 rounded-full" />
                       </div>
                    </div>

                    {/* Center floating rings / data viz */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none mt-2">
                       {/* Outer rotating ring */}
                       <div className="w-32 h-32 md:w-40 md:h-40 border border-accent/20 rounded-full flex items-center justify-center animate-[spin_8s_linear_infinite]">
                         <div className="absolute top-0 w-2.5 h-2.5 bg-accent rounded-full shadow-[0_0_15px_#A7D397]" />
                       </div>
                       {/* Inner dashed ring */}
                       <div className="absolute w-24 h-24 md:w-32 md:h-32 border border-white/10 rounded-full border-dashed animate-[spin_12s_linear_infinite_reverse]" />
                       <Cpu className="absolute w-8 h-8 md:w-10 md:h-10 text-accent/90" />
                    </div>

                    {/* Bottom floating cards */}
                    <div className="flex gap-3 md:gap-4 mt-auto z-10 relative">
                       <div className="flex-1 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/10 p-3 md:p-4 rounded-2xl transform transition-transform group-hover:-translate-y-2 duration-500 shadow-xl">
                          <p className="text-[9px] text-sage-light/60 uppercase tracking-widest mb-1 md:mb-1.5 font-bold">Yield</p>
                          <p className="text-white font-display text-xl md:text-2xl font-bold">94.2<span className="text-[10px] md:text-sm text-accent tracking-tighter">MWh</span></p>
                       </div>
                       <div className="flex-1 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/10 p-3 md:p-4 rounded-2xl transform transition-transform group-hover:-translate-y-4 duration-500 delay-100 group-hover:shadow-[0_10px_40px_rgba(167,211,151,0.15)] shadow-xl">
                          <p className="text-[9px] text-sage-light/60 uppercase tracking-widest mb-1 md:mb-1.5 font-bold">Efficiency</p>
                          <p className="text-accent font-display text-xl md:text-2xl font-bold">99.8<span className="text-[10px] md:text-sm text-white/50">%</span></p>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technology / Features */}
      <section id="technology" className="py-24 md:py-32 relative z-20 border-t border-line overflow-hidden">
        {/* Architectural background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(17,24,17,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(17,24,17,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        
        {/* Decorative corner markers */}
        <div className="absolute top-10 left-10 w-4 h-4 border-t border-l border-ink/20 hidden md:block" />
        <div className="absolute top-10 right-10 w-4 h-4 border-t border-r border-ink/20 hidden md:block" />
        
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-line shadow-sm mb-8 text-[10px] font-black tracking-[0.2em] uppercase text-sage-dark relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full duration-1000" />
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                Advanced Engineering
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-ink tracking-tight mb-8 md:mb-12 leading-[1.1] md:leading-[1.05]">
                Forged by innovation, <br/>built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-sage-dark via-sage-mid to-accent">extreme conditions.</span>
              </h2>
              
              <div className="space-y-4 md:space-y-6">
                {techData.map((item, i) => {
                  const isActive = activeTech === i;
                  return (
                  <div 
                    key={i} 
                    onClick={() => setActiveTech(i)}
                    className={`group relative p-6 md:p-8 rounded-[2rem] backdrop-blur-md border border-line cursor-pointer shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-all duration-500 overflow-hidden transform ${
                      isActive 
                        ? 'bg-white border-sage-dark/30 shadow-[0_20px_40px_rgba(0,0,0,0.06)] -translate-y-2' 
                        : 'bg-white/40 hover:-translate-y-1 hover:border-sage-dark/20'
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full duration-1000" />
                    
                    {/* Hover internal tech grid */}
                    <div className={`absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />

                    <div className="flex gap-4 md:gap-6 relative z-10 items-start">
                      <div className="flex-shrink-0">
                        <span className={`text-3xl md:text-4xl font-display font-black text-transparent bg-clip-text bg-gradient-to-br transition-all duration-500 leading-none ${
                          isActive
                           ? "from-accent to-sage-dark opacity-100"
                           : "from-sage-light to-sage-mid opacity-50 group-hover:opacity-80"
                        }`}>
                          {item.id}
                        </span>
                      </div>
                      <div className="relative z-10">
                        <h4 className={`text-lg md:text-xl font-bold mb-1 md:mb-2 tracking-tight transition-all duration-300 transform ${
                           isActive 
                            ? "text-transparent bg-clip-text bg-gradient-to-r from-ink to-sage-mid translate-x-1"
                            : "text-ink group-hover:text-sage-dark"
                        }`}>{item.title}</h4>
                        <p className="text-sage-mid leading-relaxed text-sm md:text-base font-medium">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                )})}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square md:aspect-[4/3] lg:aspect-auto h-auto lg:h-[650px] rounded-[2.5rem] bg-ink p-[6px] shadow-2xl shadow-ink/10 group overflow-hidden"
            >
              {/* Technical framing */}
              <div className="absolute inset-0 rounded-[2.5rem] border border-white/10 pointer-events-none group-hover:border-accent/30 transition-colors duration-1000 z-20" />
              
              <div className="w-full h-full relative rounded-[2rem] overflow-hidden bg-ink">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={activeTech}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 0.7, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    src={techData[activeTech].image}
                    alt={techData[activeTech].title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 group-hover:opacity-90 transition-all duration-[3s] ease-out will-change-transform"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent pointer-events-none z-10" />
                
                {/* Tech overlays */}
                <div className="absolute top-6 left-6 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 z-20">
                   <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_#EF4444]" />
                   <AnimatePresence mode="wait">
                     <motion.span 
                        key={techData[activeTech].tag}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="text-[9px] font-mono text-white/90 uppercase tracking-widest font-bold"
                      >
                        Live Feed // {techData[activeTech].tag}
                     </motion.span>
                   </AnimatePresence>
                </div>
                
                {/* Reticle / Crosshair */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/10 rounded-full flex items-center justify-center pointer-events-none opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 z-20">
                  <div className="w-full h-[1px] bg-accent/40" />
                  <div className="absolute h-full w-[1px] bg-accent/40" />
                  <div className="absolute w-12 h-12 border border-white/30 rounded-full border-dashed animate-[spin_8s_linear_infinite_reverse]" />
                  <div className="absolute w-8 h-8 border border-accent/40 rounded-full animate-[spin_4s_linear_infinite]" />
                </div>

                {/* Sub-cards */}
                <div className="absolute bottom-6 right-6 left-6 grid grid-cols-2 gap-4 z-20">
                  <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 transform transition-transform group-hover:-translate-y-1 duration-500">
                    <ShieldCheck className="w-6 h-6 text-accent mb-3" />
                    <AnimatePresence mode="wait">
                      <motion.div 
                        key={techData[activeTech].id}
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                      >
                        <h4 className="font-extrabold text-white mb-1 text-[10px] uppercase tracking-[0.2em]">{techData[activeTech].status}</h4>
                      </motion.div>
                    </AnimatePresence>
                    <p className="text-xs text-white/70 leading-relaxed font-medium">Diagnostic monitoring highly active.</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 flex flex-col justify-end transform transition-transform group-hover:-translate-y-2 duration-500 delay-100">
                    <div className="flex items-end justify-between mb-2">
                      <span className="text-[10px] text-white/70 font-bold uppercase tracking-[0.2em]">Tolerance</span>
                      <span className="text-accent font-mono text-sm font-bold">±0.001mm</span>
                    </div>
                    {/* Animated diagnostic bar */}
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                       <div className="h-full bg-accent rounded-full w-4/5 animate-[pulse_2s_ease-in-out_infinite]" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 relative z-20 overflow-hidden">
        <div className="max-w-[calc(100%-2rem)] md:max-w-7xl mx-auto px-4 md:px-6 rounded-[2rem] md:rounded-[3rem] bg-[#0A0F0A] text-white relative overflow-hidden shadow-[0_20px_60px_rgba(10,15,10,0.5)] border border-white/10 group/cta">
          
          {/* Intense animated gradient backgrounds */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3">
            <div className="w-[800px] h-[800px] rounded-full bg-accent/30 blur-[120px] pointer-events-none group-hover/cta:bg-accent/40 transition-colors duration-1000" />
          </div>
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/3">
            <div className="w-[600px] h-[600px] rounded-full bg-sage-mid/30 blur-[100px] pointer-events-none group-hover/cta:bg-sage-mid/40 transition-colors duration-1000" />
          </div>
          
          <div className="py-16 md:py-24 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto px-4 sm:px-0"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-6 md:mb-8 text-[10px] font-black tracking-[0.2em] uppercase text-accent">
                System Integration
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-extrabold tracking-[-0.02em] mb-6 md:mb-8 text-white leading-[1.1] md:leading-[1.05]">
                Ready to power <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-sage-light to-accent">the future?</span>
              </h2>
              <p className="text-lg md:text-xl text-sage-light/80 mb-10 md:mb-12 leading-relaxed font-medium">
                Partner with NovaEnergy and bring industrial-grade renewable solutions to your next major infrastructure project.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button className="group h-16 px-10 w-full sm:w-auto rounded-full bg-accent text-ink hover:bg-white font-extrabold flex items-center justify-center transition-colors duration-300 active:scale-95 shadow-[0_4px_20px_rgba(167,211,151,0.2)] text-sm uppercase tracking-widest gap-2 group/btn">
                  <TickerText hoverColor="text-ink">Contact Sales</TickerText> <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
                <button className="group h-16 px-10 w-full sm:w-auto rounded-full bg-white/5 backdrop-blur-md text-white border border-white/20 hover:border-accent hover:bg-accent hover:text-ink font-extrabold transition-colors duration-300 active:scale-95 shadow-[0_4px_20px_rgba(0,0,0,0.1)] text-sm uppercase tracking-widest">
                  <TickerText hoverColor="text-ink">Request Specifications</TickerText>
                </button>
              </div>
              
              <p className="mt-12 text-xs text-sage-light/60 font-bold uppercase tracking-widest">
                For residential inquiries, please visit our <a href="#" className="underline hover:text-white transition-colors">retail partner network</a>.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-16 md:pt-20 pb-8 mt-12 bg-white relative overflow-hidden">
        {/* Top border glow */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-line to-transparent" />
        
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 lg:gap-16 mb-16 md:mb-20">
            <div className="col-span-2 md:col-span-4 lg:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 text-accent relative flex items-center justify-center drop-shadow-md">
                  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <path d="M16 0L19.2 12.8L32 16L19.2 19.2L16 32L12.8 19.2L0 16L12.8 12.8L16 0Z" fill="currentColor" />
                  </svg>
                  <div className="absolute inset-0 m-auto w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(167,211,151,0.6)]"></div>
                </div>
                <span className="font-display font-black text-2xl tracking-tighter text-ink">
                  NOVA<span className="text-sage-mid font-medium">ENERGY</span>
                </span>
              </div>
              <p className="text-sage-mid max-w-sm text-base leading-relaxed font-medium">
                Next-generation renewable hardware manufacturing. Headquartered in Stockholm, operational globally.
              </p>
            </div>
            
            <div className="col-span-1">
              <h4 className="font-extrabold text-ink mb-4 md:mb-6 text-[10px] uppercase tracking-[0.2em]">Hardware</h4>
              <ul className="space-y-4 text-sage-mid text-sm font-medium">
                <li><a href="#" className="group hover:text-accent hover:translate-x-1 inline-block transition-all duration-300"><TickerText>NovaCell Solar</TickerText></a></li>
                <li><a href="#" className="group hover:text-accent hover:translate-x-1 inline-block transition-all duration-300"><TickerText>AeroBlade Wind</TickerText></a></li>
                <li><a href="#" className="group hover:text-accent hover:translate-x-1 inline-block transition-all duration-300"><TickerText>PowerVault Storage</TickerText></a></li>
                <li><a href="#" className="group hover:text-accent hover:translate-x-1 inline-block transition-all duration-300"><TickerText>Commercial Grid</TickerText></a></li>
              </ul>
            </div>
            
            <div className="col-span-1">
              <h4 className="font-extrabold text-ink mb-4 md:mb-6 text-[10px] uppercase tracking-[0.2em]">Company</h4>
              <ul className="space-y-4 text-sage-mid text-sm font-medium">
                <li><a href="#" className="group hover:text-accent hover:translate-x-1 inline-block transition-all duration-300"><TickerText>About Us</TickerText></a></li>
                <li><a href="#" className="group hover:text-accent hover:translate-x-1 inline-block transition-all duration-300"><TickerText>Sustainability Report</TickerText></a></li>
                <li><a href="#" className="group hover:text-accent hover:translate-x-1 inline-block transition-all duration-300"><TickerText>Careers</TickerText></a></li>
                <li><a href="#" className="group hover:text-accent hover:translate-x-1 inline-block transition-all duration-300"><TickerText>Investors</TickerText></a></li>
              </ul>
            </div>
            
            <div className="col-span-2 sm:col-span-1">
              <h4 className="font-extrabold text-ink mb-4 md:mb-6 text-[10px] uppercase tracking-[0.2em]">Resources</h4>
              <ul className="space-y-4 text-sage-mid text-sm font-medium">
                <li><a href="#" className="group hover:text-accent hover:translate-x-1 inline-block transition-all duration-300"><TickerText>Developer API</TickerText></a></li>
                <li><a href="#" className="group hover:text-accent hover:translate-x-1 inline-block transition-all duration-300"><TickerText>Datasheets</TickerText></a></li>
                <li><a href="#" className="group hover:text-accent hover:translate-x-1 inline-block transition-all duration-300"><TickerText>Warranty Info</TickerText></a></li>
                <li><a href="#" className="group hover:text-accent hover:translate-x-1 inline-block transition-all duration-300"><TickerText>Contact Support</TickerText></a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-line/50 pt-8 flex flex-col justify-between text-sage-mid text-[10px] font-black uppercase tracking-[0.2em] md:flex-row items-center gap-6 md:gap-4 text-center md:text-left">
            <p>&copy; {new Date().getFullYear()} NovaEnergy Manufacturing.</p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              <a href="#" className="group hover:text-accent transition-colors"><TickerText>Privacy Policy</TickerText></a>
              <a href="#" className="group hover:text-accent transition-colors"><TickerText>Terms of Service</TickerText></a>
              <a href="#" className="group hover:text-accent transition-colors"><TickerText>Certifications</TickerText></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
