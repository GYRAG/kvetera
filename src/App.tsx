import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Globe, ChevronDown, BookOpen, Volume2, VolumeX, Printer, Info, MapPin, ArrowUp, Sun, Moon, Menu, X } from 'lucide-react';
import { contentData, Language, Content } from './content';
import heroImg from './assets/hero.jpeg';
import churchImg from './assets/church.jpeg';
import architectureImg from './assets/architecture.jpeg';
import overviewImg from './assets/overview.jpeg';

// Local Images provided
const IMAGES: Record<string, string> = {
  hero: heroImg,
  church: churchImg,
  walls: architectureImg,
  landscape: overviewImg,
  gallery1: overviewImg,
  gallery2: churchImg,
  gallery3: architectureImg,
  gallery4: heroImg
};

const GlossaryTerm = ({ term, definition, originalKey }: { term: string; definition: string; originalKey: string }) => {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const ref = useRef<HTMLSpanElement>(null);
  const TOOLTIP_W = 240;
  const PADDING = 8;

  const handleOpen = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      // Position above the word (using viewport-relative coordinates for position:fixed)
      const top = rect.top - PADDING;
      // Center on the word, clamped to viewport
      let left = rect.left + rect.width / 2 - TOOLTIP_W / 2;
      left = Math.max(PADDING, Math.min(left, window.innerWidth - TOOLTIP_W - PADDING));
      setPos({ top, left });
    }
    setOpen(o => !o);
  };

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    document.addEventListener('touchstart', close);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('touchstart', close);
    };
  }, [open]);

  return (
    <span
      ref={ref}
      onClick={handleOpen}
      className="relative inline-block cursor-pointer text-turquoise-400 border-b border-turquoise-400/30 hover:border-turquoise-400 transition-colors"
    >
      {term}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            style={{
              position: 'fixed',
              top: pos.top,
              left: pos.left,
              width: TOOLTIP_W,
              transform: 'translateY(-100%)',
            }}
            className="z-[9999] p-3 bg-charcoal-800 border border-stone-700 rounded-sm shadow-xl text-xs text-parchment-100 text-left font-sans pointer-events-none"
          >
            <strong className="block text-turquoise-500 mb-1 font-mono uppercase tracking-wider">{originalKey}</strong>
            {definition}
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};


const HighlightText = ({ text, glossary }: { text: string, glossary: Record<string, string> }) => {
  const terms = Object.keys(glossary).sort((a, b) => b.length - a.length);
  if (terms.length === 0) return <>{text}</>;

  const escapedTerms = terms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const regex = new RegExp(`(${escapedTerms.join('|')})`, 'gi');
  const parts = text.split(regex);

  const lowerGlossary = Object.fromEntries(
    Object.entries(glossary).map(([k, v]) => [k.toLowerCase(), { originalKey: k, value: v }])
  );

  return (
    <>
      {parts.map((part, i) => {
        const match = lowerGlossary[part.toLowerCase()];
        if (match) {
          return <GlossaryTerm key={i} term={part} definition={match.value} originalKey={match.originalKey} />;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
};

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark'); // dark by default
  const [scrolled, setScrolled] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ url: string; caption: string } | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string>('origins');
  const [weather, setWeather] = useState<{ temp: number, condition: string } | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const data: Content = contentData[lang];
  const mainRef = useRef<HTMLElement>(null);

  const { scrollYProgress: mainScrollProgress } = useScroll({
    target: mainRef,
    offset: ["start start", "end end"]
  });

  const scaleX = useSpring(mainScrollProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light-theme');
    } else {
      document.documentElement.classList.remove('light-theme');
    }
  }, [theme]);

  useEffect(() => {
    // Fetch weather for Akhmeta
    fetch('https://api.open-meteo.com/v1/forecast?latitude=42.0323&longitude=45.2046&current_weather=true')
      .then(res => res.json())
      .then(d => {
        if (d.current_weather) {
            const temp = Math.round(d.current_weather.temperature);
            const code = d.current_weather.weathercode;
            let condition = "clear";
            if ([1, 2, 3].includes(code)) condition = "cloudy";
            else if ([45, 48].includes(code)) condition = "foggy";
            else if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) condition = "rain";
            else if ([71, 73, 75, 77, 85, 86].includes(code)) condition = "snow";
            else if ([95, 96, 99].includes(code)) condition = "storm";
            
            setWeather({ temp, condition });
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Update active section
      const sections = document.querySelectorAll('div[data-section-id], section[id="timeline"], section[id="gallery"]');
      let currentSection = data.sections[0].id;
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          currentSection = section.getAttribute('data-section-id') || section.getAttribute('id') || currentSection;
        }
      });
      setActiveSectionId(currentSection);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.speechSynthesis.cancel();
    };
  }, [data.sections]);

  const toggleLanguage = () => {
    const newLang = lang === 'en' ? 'ka' : 'en';
    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    }
    setLang(newLang);
  };

  const toggleAudio = () => {
    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(data.summary);
      utterance.lang = lang === 'en' ? 'en-US' : 'ka-GE';
      utterance.rate = 0.85;
      utterance.pitch = 0.95;
      utterance.onend = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  const scrollToSummary = () => {
    document.getElementById('summary')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  const activeSectionIdFallback = activeSectionId || data.sections[0].id;
  const activeSection = data.sections.find(s => s.id === activeSectionIdFallback);
  const quickFacts = activeSection?.quickFacts || [];

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-charcoal-900 text-parchment-100 font-sans selection:bg-turquoise-700 selection:text-parchment-100">
      
      {/* Navigation Layer */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? 'bg-charcoal-900/90 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-12 flex justify-between items-center relative">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: scrolled ? 1 : 0 }}
            className="font-serif tracking-widest uppercase text-sm text-parchment-100 truncate max-w-[120px] sm:max-w-none"
          >
            {data.title}
          </motion.div>
          
          {/* Desktop controls — hidden on mobile */}
          <div className="hidden sm:flex items-center gap-2 sm:gap-3 ml-auto">
            <button 
              onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
              className="flex items-center justify-center w-9 h-9 rounded-full border border-stone-500/30 bg-charcoal-800/50 hover:bg-turquoise-800/60 transition-colors backdrop-blur-sm no-print"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-parchment-100" /> : <Moon className="w-4 h-4 text-parchment-100" />}
            </button>
            <button 
              onClick={() => {
                window.focus();
                setTimeout(() => window.print(), 100);
              }}
              className="flex items-center justify-center w-9 h-9 rounded-full border border-stone-500/30 bg-charcoal-800/50 hover:bg-turquoise-800/60 transition-colors backdrop-blur-sm no-print"
              title={data.printLabel}
            >
              <Printer className="w-4 h-4 text-parchment-100" />
            </button>
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-stone-500/30 bg-charcoal-800/50 hover:bg-turquoise-800/60 transition-colors text-xs tracking-widest uppercase backdrop-blur-sm no-print"
            >
              <Globe className="w-4 h-4 text-parchment-100" />
              <span>{lang === 'en' ? 'ქართული' : 'English'}</span>
            </button>
          </div>

          {/* Mobile controls: lang + theme + burger */}
          <div className="sm:hidden flex items-center gap-2 ml-auto">
            <button
              onClick={toggleLanguage}
              className="flex items-center justify-center w-9 h-9 rounded-full border border-stone-500/30 bg-charcoal-800/50 backdrop-blur-sm text-[10px] font-sans text-parchment-100 tracking-wide no-print"
            >
              {lang === 'en' ? 'KA' : 'EN'}
            </button>
            <button
              onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
              className="flex items-center justify-center w-9 h-9 rounded-full border border-stone-500/30 bg-charcoal-800/50 backdrop-blur-sm no-print"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-parchment-100" /> : <Moon className="w-4 h-4 text-parchment-100" />}
            </button>
            <button
              onClick={() => setMenuOpen(o => !o)}
              className="flex items-center justify-center w-9 h-9 rounded-full border border-stone-500/30 bg-charcoal-800/50 backdrop-blur-sm no-print"
              aria-label="Open menu"
            >
              {menuOpen ? <X className="w-4 h-4 text-parchment-100" /> : <Menu className="w-4 h-4 text-parchment-100" />}
            </button>
          </div>
        </div>
        
        {/* Progress Bar */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-turquoise-700 transform origin-left no-print"
          style={{ scaleX }}
        />
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 sm:hidden bg-charcoal-900/98 backdrop-blur-xl flex flex-col px-8 pt-24 pb-12 no-print"
          >
            {/* Section links */}
            <div className="flex flex-col gap-1 border-b border-stone-800 pb-8 mb-8">
              <p className="text-[10px] uppercase tracking-[0.25em] text-stone-500 font-mono mb-4">Navigation</p>
              {data.sections.map(section => (
                <button
                  key={section.id}
                  onClick={() => {
                    setMenuOpen(false);
                    setTimeout(() => {
                      const el = document.querySelector(`[data-section-id="${section.id}"]`);
                      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
                    }, 300);
                  }}
                  className="text-left font-serif text-2xl text-parchment-100 py-3 border-b border-stone-800/50 hover:text-turquoise-700 transition-colors"
                >
                  {section.title}
                </button>
              ))}
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setTimeout(() => {
                    const el = document.getElementById('timeline');
                    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
                  }, 300);
                }}
                className="text-left font-serif text-2xl text-parchment-100 py-3 border-b border-stone-800/50 hover:text-turquoise-700 transition-colors"
              >
                {data.timelineTitle}
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setTimeout(() => {
                    const el = document.getElementById('gallery');
                    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
                  }, 300);
                }}
                className="text-left font-serif text-2xl text-parchment-100 py-3 hover:text-turquoise-700 transition-colors"
              >
                {data.galleryTitle}
              </button>
            </div>

            {/* Controls */}
            <div className="flex flex-col gap-3">
              <p className="text-[10px] uppercase tracking-[0.25em] text-stone-500 font-mono mb-2">Settings</p>
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-3 px-5 py-3 rounded-sm border border-stone-700/50 bg-charcoal-800/50 text-parchment-100 text-sm tracking-widest uppercase"
              >
                <Globe className="w-4 h-4" />
                {lang === 'en' ? 'Switch to ქართული' : 'Switch to English'}
              </button>
              <button
                onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
                className="flex items-center gap-3 px-5 py-3 rounded-sm border border-stone-700/50 bg-charcoal-800/50 text-parchment-100 text-sm tracking-widest uppercase"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>
              <button
                onClick={() => { setMenuOpen(false); window.focus(); setTimeout(() => window.print(), 100); }}
                className="flex items-center gap-3 px-5 py-3 rounded-sm border border-stone-700/50 bg-charcoal-800/50 text-parchment-100 text-sm tracking-widest uppercase"
              >
                <Printer className="w-4 h-4" />
                {data.printLabel}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Table of Contents Floating Panel */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: scrolled ? 1 : 0, x: scrolled ? 0 : -20 }}
        className="fixed top-1/3 left-8 w-48 z-40 hidden xl:block no-print"
      >
        <div className="border-l border-stone-800 pl-4 py-2 space-y-6">
          {data.sections.map(section => (
            <button
              key={section.id}
              onClick={() => {
                const el = document.querySelector(`[data-section-id="${section.id}"]`);
                if (el) {
                  const y = el.getBoundingClientRect().top + window.scrollY - 100;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                }
              }}
              className={`block text-left text-[10px] uppercase tracking-widest transition-all duration-300 ${activeSectionId === section.id ? 'text-turquoise-500 font-bold' : 'text-stone-500 hover:text-parchment-200'}`}
            >
              {section.title}
            </button>
          ))}
          <button
            onClick={() => {
              const el = document.getElementById('timeline');
              if (el) {
                const y = el.getBoundingClientRect().top + window.scrollY - 100;
                window.scrollTo({ top: y, behavior: 'smooth' });
              }
            }}
            className={`block text-left text-[10px] uppercase tracking-widest transition-all duration-300 ${activeSectionId === 'timeline' ? 'text-turquoise-500 font-bold' : 'text-stone-500 hover:text-parchment-200'}`}
          >
            {data.timelineTitle}
          </button>
          <button
            onClick={() => {
              const el = document.getElementById('gallery');
              if (el) {
                const y = el.getBoundingClientRect().top + window.scrollY - 100;
                window.scrollTo({ top: y, behavior: 'smooth' });
              }
            }}
            className={`block text-left text-[10px] uppercase tracking-widest transition-all duration-300 ${activeSectionId === 'gallery' ? 'text-turquoise-500 font-bold' : 'text-stone-500 hover:text-parchment-200'}`}
          >
            {data.galleryTitle}
          </button>
        </div>
      </motion.div>

      {/* Quick Facts Floating Panel */}
      <AnimatePresence>
        {(weather || activeSection) && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: scrolled ? 1 : 0, x: scrolled ? 0 : 20 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed top-1/3 right-8 w-64 bg-charcoal-900/80 backdrop-blur-md border border-stone-800 p-6 shadow-2xl z-40 hidden xl:flex flex-col gap-8 no-print pointer-events-none"
          >
            {weather && (
              <div>
                <h3 className="text-turquoise-700 font-mono text-xs uppercase tracking-widest mb-4 border-b border-stone-800 pb-2">{data.liveWeatherLabel}</h3>
                <div className="flex items-center gap-4">
                  <div className="text-3xl font-serif text-parchment-200">{weather.temp}°</div>
                  <div className="text-stone-400 text-[10px] uppercase tracking-wider">
                    {data.weatherConditions[weather.condition] || data.weatherConditions.unknown}
                  </div>
                </div>
              </div>
            )}

            {activeSection && (
              <div>
                <h3 className="text-turquoise-700 font-mono text-xs uppercase tracking-widest mb-6 border-b border-stone-800 pb-2">{data.quickFactsTitle}</h3>
                <ul className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {quickFacts.map((fact, index) => (
                      <motion.li 
                        key={`${activeSection.id}-${index}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <div className="text-stone-500 text-[10px] uppercase tracking-wider mb-1">{fact.label}</div>
                        <div className="font-serif text-parchment-200">{fact.value}</div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={lang}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Immersive Hero */}
          <header className="relative w-full h-[100svh] flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img src={IMAGES.hero} alt="Kvetera Landscape" className="w-full h-full object-cover object-center animate-slow-pan" />
              <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/30 via-charcoal-900/40 to-charcoal-900"></div>
            </div>
            
            <div className="relative z-10 text-center px-4 mt-16 max-w-4xl mx-auto w-full">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1 }}
                className="mb-4 text-turquoise-700 tracking-[0.2em] sm:tracking-[0.3em] text-[10px] sm:text-xs md:text-sm uppercase font-semibold"
              >
                {data.location}
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1.2 }}
                className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl mb-6 tracking-tight text-parchment-100 drop-shadow-lg"
              >
                {data.title}
              </motion.h1>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="h-px w-16 sm:w-24 bg-stone-500 mx-auto mb-6"
              />
              <motion.h2 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="font-serif italic text-lg sm:text-xl md:text-3xl text-stone-400"
              >
                {data.subtitle}
              </motion.h2>
            </div>

            {/* Hero CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="absolute bottom-8 sm:bottom-12 w-full px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-center gap-3 z-20"
            >
              <button 
                onClick={scrollToSummary}
                className="flex items-center justify-between w-full sm:w-auto px-5 py-3 sm:px-6 sm:py-4 bg-parchment-200 text-charcoal-900 rounded-sm font-medium tracking-wide uppercase text-xs hover:bg-white transition-colors"
              >
                <span className="flex items-center gap-2"><BookOpen className="w-4 h-4" /> {data.readHistoryLabel}</span>
                <ChevronDown className="w-4 h-4 ml-4" />
              </button>
              <div className="relative flex flex-col items-center w-full sm:w-auto">
                <button 
                  onClick={toggleAudio}
                  className={`flex items-center w-full sm:w-auto px-5 py-3 sm:px-6 sm:py-4 border border-stone-500/50 backdrop-blur-sm rounded-sm font-medium tracking-wide uppercase text-xs transition-colors ${isPlayingAudio ? 'bg-turquoise-800/50 text-parchment-100' : 'bg-charcoal-900/50 text-parchment-100 hover:bg-charcoal-800'}`}
                >
                  <span className="flex items-center gap-2">
                    {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />} 
                    {isPlayingAudio ? data.listenActiveLabel : data.listenLabel}
                  </span>
                </button>
                <span className="mt-1 text-[9px] tracking-wider text-stone-500/60 uppercase font-mono">
                  {lang === 'en' ? 'English only' : 'მხოლოდ ინგლისურად'}
                </span>
              </div>
              <a 
                href="https://share.google/ZsoEaD0G9amMauVA0"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center w-full sm:w-auto px-5 py-3 sm:px-6 sm:py-4 border border-stone-500/50 backdrop-blur-sm rounded-sm font-medium tracking-wide uppercase text-xs transition-colors bg-charcoal-900/50 text-parchment-100 hover:bg-charcoal-800"
              >
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {data.viewOnMapLabel}
                </span>
              </a>
            </motion.div>
          </header>

          {/* Archival Summary Section */}
          <section id="summary" className="py-24 md:py-32 bg-parchment-100 text-charcoal-900 relative">
            <div className="max-w-4xl mx-auto px-6 md:px-12">
              <div className="flex items-center gap-4 mb-12">
                <div className="w-8 h-px bg-stone-500"></div>
                <h3 className="font-sans text-xs tracking-[0.2em] uppercase text-stone-600 font-semibold">{data.summaryTitle}</h3>
              </div>
              
              <p className="font-serif text-xl sm:text-2xl md:text-4xl leading-relaxed text-charcoal-800">
                <span className="text-turquoise-800 text-3xl sm:text-4xl md:text-6xl float-left mr-2 sm:mr-3 mt-1 leading-none font-medium">{data.summary.charAt(0)}</span>
                {data.summary.slice(1)}
              </p>
            </div>
          </section>

          {/* Full-width transition image */}
          <div className="w-full h-[50vh] md:h-[70vh] relative">
            <img src={IMAGES.church} alt="Kvetera Church Architecture" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-transparent to-transparent"></div>
          </div>

          {/* Detailed History Layers */}
          <main ref={mainRef} className="py-24 bg-charcoal-900 relative">
            <div className="max-w-3xl mx-auto px-6 md:px-12">
              {data.sections.map((section, index) => (
                <div key={section.id} data-section-id={section.id} className="mb-16 sm:mb-24 md:mb-40 relative">
                  
                  {/* Archival Label */}
                  <div className="sticky top-16 sm:top-20 z-10 mb-6 sm:mb-8 flex items-center gap-3 py-2 bg-charcoal-900/95 backdrop-blur-md md:static md:bg-transparent">
                    <span className="text-turquoise-700 font-mono text-xs opacity-70">0{index + 1}</span>
                    <h3 className="font-sans text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase text-stone-400 font-semibold truncate">{section.title}</h3>
                  </div>

                  <h4 className="font-serif text-2xl sm:text-3xl md:text-5xl mb-8 sm:mb-12 text-parchment-100 leading-tight">
                    {section.title}
                  </h4>
                  
                  <div className="font-sans text-base md:text-lg text-stone-400 leading-loose space-y-8 font-light text-justify">
                    {section.text.split('\n\n').map((paragraph, i) => (
                      <p key={i}>
                        <HighlightText text={paragraph} glossary={data.glossary} />
                      </p>
                    ))}
                  </div>

                  {/* Interspersed imagery for specific sections */}
                  {index === 1 && (
                    <figure className="my-10 sm:my-16 -mx-6 sm:-mx-12 md:-mx-24 relative">
                      <div className="aspect-[16/9] w-full overflow-hidden rounded-sm border border-stone-800">
                        <img src={IMAGES.landscape} alt="Landscape around Kvetera" className="w-full h-full object-cover" />
                      </div>
                      <figcaption className="mt-3 text-[10px] sm:text-xs font-sans text-stone-500 uppercase tracking-widest text-center">
                        {lang === 'en' ? 'The surrounding highlands of Kakheti' : 'კახეთის მაღალმთიანეთი'}
                      </figcaption>
                    </figure>
                  )}
                  
                  {index === 2 && (
                    <div className="my-12 w-16 h-px bg-stone-700 mx-auto"></div>
                  )}
                </div>
              ))}
            </div>
          </main>

          {/* Interactive Timeline */}
          <section id="timeline" className="py-24 bg-charcoal-800 text-parchment-100 border-t border-stone-800 overflow-hidden relative">
            <div className="absolute top-0 bottom-0 left-0 w-8 md:w-24 bg-gradient-to-r from-charcoal-800 to-transparent z-10 pointer-events-none no-print"></div>
            <div className="absolute top-0 bottom-0 right-0 w-8 md:w-24 bg-gradient-to-l from-charcoal-800 to-transparent z-10 pointer-events-none no-print"></div>
            
            <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 relative z-20">
              <div className="flex items-center gap-4">
                <div className="w-8 h-px bg-stone-500"></div>
                <h3 className="font-sans text-xs tracking-[0.2em] uppercase text-stone-400 font-semibold">{data.timelineTitle}</h3>
              </div>
            </div>
            
            <div className="flex gap-6 md:gap-12 overflow-x-auto pb-12 pt-4 px-6 md:px-24 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] relative z-20 print-timeline">
              {data.timeline.map((event, index) => (
                <div key={index} className="flex-none w-[280px] md:w-[400px] snap-center bg-charcoal-900 border border-stone-700/50 p-8 md:p-10 rounded-sm shadow-xl relative group hover:border-turquoise-700/50 transition-colors print-timeline-card">
                  <div className="absolute -top-[1px] left-8 w-8 h-[2px] bg-turquoise-700"></div>
                  <div className="text-turquoise-700 font-mono text-xs md:text-sm mb-6 pb-4 border-b border-stone-800 tracking-wider print-timeline-period">{event.period}</div>
                  <h4 className="font-serif text-xl md:text-3xl text-parchment-100 mb-4 print-timeline-title">{event.title}</h4>
                  <p className="font-sans text-sm md:text-base text-stone-400 leading-relaxed font-light print-timeline-desc">{event.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Gallery Section */}
          <section id="gallery" className="py-24 bg-charcoal-900 relative border-t border-stone-800">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
              <div className="flex items-center gap-4 mb-16">
                <div className="w-8 h-px bg-stone-500"></div>
                <h3 className="font-sans text-xs tracking-[0.2em] uppercase text-stone-400 font-semibold">{data.galleryTitle}</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print-gallery">
                {data.gallery.map((image, index) => (
                  <figure 
                    key={index} 
                    className="group relative cursor-zoom-in"
                    onClick={() => setSelectedImage({ url: IMAGES[image.id] || IMAGES.hero, caption: image.caption })}
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden rounded-sm border border-stone-800 bg-stone-800/50 relative">
                      <img 
                        src={IMAGES[image.id] || IMAGES.hero} 
                        alt={image.caption} 
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                      />
                    </div>
                    <figcaption className="mt-4 text-xs font-sans text-stone-500 uppercase tracking-widest print-gallery-caption">
                      {image.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-charcoal-900 text-stone-500 py-12 text-center border-t border-stone-800 no-print">
            <div className="max-w-4xl mx-auto px-6">
              <p className="font-serif italic mb-4">{data.footer}</p>
              <div className="flex items-center justify-center gap-6 mt-8">
                <div className="w-12 h-px bg-stone-800"></div>
                <span className="font-sans text-[10px] uppercase tracking-[0.3em]">Kvetera Heritage</span>
                <div className="w-12 h-px bg-stone-800"></div>
              </div>
            </div>
          </footer>

          {/* Scroll to Top Button */}
          <AnimatePresence>
            {scrolled && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="fixed bottom-8 right-8 z-50 xl:hidden no-print"
              >
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="flex items-center justify-center p-3 rounded-full bg-turquoise-800 text-parchment-100 shadow-xl border border-turquoise-700/50 hover:bg-turquoise-700 transition-colors"
                >
                  <ArrowUp className="w-5 h-5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Image Detail Modal */}
          <AnimatePresence>
            {selectedImage && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal-900/95 backdrop-blur-xl p-4 md:p-12"
              >
                <div className="relative w-full max-w-5xl flex flex-col" style={{height: 'min(85vh, 100%)'}}>
                  <button 
                    onClick={() => { setSelectedImage(null); setShowMagnifier(false); }}
                    className="mb-3 self-end text-stone-400 hover:text-parchment-100 transition-colors uppercase tracking-widest text-xs font-medium flex items-center gap-2"
                  >
                    {data.closeModalLabel}
                  </button>
                  
                  <div 
                    className="relative w-full flex-grow border border-stone-700/50 bg-charcoal-800 cursor-crosshair overflow-hidden rounded-sm"
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setShowMagnifier(true)}
                    onMouseLeave={() => setShowMagnifier(false)}
                  >
                    <img 
                      src={selectedImage.url} 
                      alt={selectedImage.caption} 
                      className="w-full h-full object-contain pointer-events-none" 
                    />
                    
                    {/* Magnifier Lens */}
                    {showMagnifier && (
                      <div 
                        className="absolute pointer-events-none border border-stone-600/50 rounded-full shadow-2xl bg-charcoal-900 overflow-hidden"
                        style={{
                          width: '200px',
                          height: '200px',
                          left: `calc(${mousePos.x}% - 100px)`,
                          top: `calc(${mousePos.y}% - 100px)`,
                          backgroundImage: `url(${selectedImage.url})`,
                          backgroundPosition: `${mousePos.x}% ${mousePos.y}%`,
                          backgroundSize: '400%',
                          backgroundRepeat: 'no-repeat',
                          boxShadow: '0 0 0 2px rgba(75, 110, 106, 0.3), 0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                        }}
                      />
                    )}
                  </div>
                  
                  <div className="mt-6 text-center">
                    <p className="font-serif text-xl md:text-2xl text-parchment-100">{selectedImage.caption}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
