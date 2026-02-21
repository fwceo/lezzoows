"use client";

import { useState, useEffect, useRef, useCallback, createContext, useContext } from "react";

// ─── THEME ───
const ThemeContext = createContext<{ theme: string; toggle: () => void }>({ theme: "dark", toggle: () => {} });
function useTheme() { return useContext(ThemeContext); }

// ─── CONSTANTS ───
const ROTATING_VERBS = ["deliver", "transport", "bring"];
const HERO_BACKGROUNDS = ["/hero-bg.gif", "/hero-bg-2.gif", "/hero-bg-3.gif"];

// SVG icon component helper
function SvgIcon({ path, color = "currentColor", size = 24 }: { path: string; color?: string; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d={path} /></svg>;
}
function SvgIconFill({ path, color = "currentColor", size = 24 }: { path: string; color?: string; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ flexShrink: 0 }}><path d={path} /></svg>;
}

const SVG_PATHS = {
  food: "M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3",
  groceries: "M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0",
  pharmacy: "M12 2a10 10 0 100 20 10 10 0 000-20zM12 8v8M8 12h8",
  express: "M16 16h6M2 11h6M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10M5.5 19.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM18.5 19.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z",
  services: "M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z",
  ecommerce: "M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0",
  pay: "M21 4H3a2 2 0 00-2 2v12a2 2 0 002 2h18a2 2 0 002-2V6a2 2 0 00-2-2zM1 10h22",
  games: "M6 12h4M8 10v4M15 13h.01M18 11h.01M17.32 5H6.68a4 4 0 00-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 003 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 019.828 16h4.344a2 2 0 011.414.586L17 18c.5.5 1 1 2 1a3 3 0 003-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0017.32 5z",
  jiran: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
  scrolls: "M12 18v-3M8 21h8M7 3h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2zM9 7l3 2 3-2",
  friendz: "M21 4H3a2 2 0 00-2 2v12a2 2 0 002 2h18a2 2 0 002-2V6a2 2 0 00-2-2zM1 10h22M12 4v16",
  xomali: "M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 017 7h1a1 1 0 011 1v3a1 1 0 01-1 1h-1.27A7 7 0 015.27 19H4a1 1 0 01-1-1v-3a1 1 0 011-1h1a7 7 0 017-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 012-2zM9.5 14a.5.5 0 101 0 .5.5 0 00-1 0zM13.5 14a.5.5 0 101 0 .5.5 0 00-1 0z",
  saydo: "M2 20h.01M7 20v-4M12 20v-8M17 20V8M22 4v16",
  water: "M12 2.69l5.66 5.66a8 8 0 11-11.31 0z",
};

const SERVICES = [
  { name: "Food Delivery", color: "#E63946", icon: "food" as keyof typeof SVG_PATHS, img: "/icons/icon-food-removebg-preview.png", desc: "1,300+ restaurants. Your cravings, delivered.", angle: 0 },
  { name: "Groceries Delivery", color: "#2EC4B6", icon: "groceries" as keyof typeof SVG_PATHS, img: "/icons/icon-groceries-removebg-preview.png", desc: "100,000+ products from stores you love.", angle: 25.7 },
  { name: "Pharmacy Delivery", color: "#4361EE", icon: "pharmacy" as keyof typeof SVG_PATHS, img: "/icons/icon-pharmacy-removebg-preview.png", desc: "Prescriptions to your door.", angle: 51.4 },
  { name: "Express (Peer to peer delivery)", color: "#E63946", icon: "express" as keyof typeof SVG_PATHS, img: "/icons/icon-express-removebg-preview.png", desc: "Courier anything, anywhere, fast.", angle: 77.1 },
  { name: "On Demand Services", color: "#424242ff", icon: "services" as keyof typeof SVG_PATHS, img: "/icons/icon-services-removebg-preview.png", desc: "Repairs, cleaning — pros on demand.", angle: 102.8 },
  { name: "Electronic & Fashion", color: "#F7B32B", icon: "ecommerce" as keyof typeof SVG_PATHS, img: "/icons/icon-ecommerce-removebg-preview.png", desc: "Shop top stores through one app.", angle: 128.5 },
  { name: "Lezzoo Wallet", color: "#00B4D8", icon: "pay" as keyof typeof SVG_PATHS, img: "/icons/bank.png", desc: "Digital wallet replacing cash in Iraq.", angle: 154.2 },
  { name: "Social Games", color: "#FF006E", icon: "games" as keyof typeof SVG_PATHS, img: "/icons/icon-games-removebg-preview.png", desc: "50+ games. Play, earn coins, win prizes.", angle: 180 },
  { name: "Jiran Networking", color: "#06D6A0", icon: "jiran" as keyof typeof SVG_PATHS, img: "/icons/icon-jiran-removebg-preview.png", desc: "Iraq's first local social media.", angle: 205.7 },
  { name: "Scrolls (Community Video Post)", color: "#8338EC", icon: "scrolls" as keyof typeof SVG_PATHS, img: "/icons/icon-scrolls-removebg-preview.png", desc: "Short videos. See it, order it.", angle: 231.4 },
  { name: "Online Menu", color: "#3A86FF", icon: "friendz" as keyof typeof SVG_PATHS, img: "/icons/icon-friendz-removebg-preview.png", desc: "Contactless payment + bill splitting.", angle: 257.1 },
  { name: "Xomali AI", color: "#E63946", icon: "xomali" as keyof typeof SVG_PATHS, img: "/icons/icon-xomali-removebg-preview.png", desc: "AI image generation, inside the app.", angle: 282.8 },
  { name: "B2B Marketplace", color: "#E63946", icon: "saydo" as keyof typeof SVG_PATHS, img: "/icons/icon-saydo-removebg-preview.png", desc: "FMCG marketplace for suppliers.", angle: 308.5 },
  { name: "Water & Gas Delivery", color: "#00B4D8", icon: "water" as keyof typeof SVG_PATHS, img: "/icons/icon-water-removebg-preview.png", desc: "Essential utilities delivered.", angle: 334.2 },
];

const TIMELINE = [
  { year: "2015", event: "Two friends in a Costa Coffee in Erbil dream of digitizing reality. They call themselves Fastwares.", side: "left" },
  { year: "2017", event: "In London, Yadgar sees a Deliveroo rider zip past. \"I wish we had this back home.\"", side: "right" },
  { year: "2018", event: "Lezzoo launches with 12 restaurants. Rekar delivers the first order in his own car.", side: "left" },
  { year: "2018", event: "Y Combinator says yes. Lezzoo becomes the first and only Iraqi startup in YC history.", side: "right" },
  { year: "2020", event: "COVID-19 hits. 1,100 orders/day → zero. Lezzoo pivots to essentials — becoming Kurdistan's lifeline.", side: "left" },
  { year: "2022", event: "Starts B2B Marketplace. Partners with World Food Program. Begins digitizing Iraq's food supply chain.", side: "right" },
  { year: "2023", event: "Lezzoo Trivia launches and triples MAUs across all of Iraq. Revenue surges 56% YoY.", side: "left" },
  { year: "2024", event: "Scrolls, Jiran, Xomali AI launch. 1M+ customers. 2,500+ vendors. $200M+ GMV. 50+ in-app games.", side: "right" },
];

const STATS = [
  { num: 1, suffix: "M+", label: "Customers" },
  { num: 2500, suffix: "+", label: "Vendors" },
  { num: 6, suffix: "", label: "Cities" },
  { num: 200, suffix: "M+", prefix: "$", label: "GMV" },
  { num: 3000, suffix: "+", label: "Team Network" },
  { num: 50, suffix: "+", label: "In-App Games" },
];

const CITIES = [
  { name: "Erbil", x: 58, y: 38, info: "HQ · 1,300+ restaurants" },
  { name: "Sulaymaniyah", x: 72, y: 62, info: "Growing fast" },
  { name: "Duhok", x: 38, y: 22, info: "Since 2018" },
  { name: "Kirkuk", x: 52, y: 68, info: "Expanding" },
  { name: "Zakho", x: 28, y: 15, info: "Newest market" },
  { name: "Mosul", x: 28, y: 45, info: "Expanding" },
];



// ─── HOOKS ───
interface InViewOptions {
  once?: boolean;
  threshold?: number;
  rootMargin?: string;
}

function useInView(options: InViewOptions = {}): [React.RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null!);
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setIsInView(true); if (options.once !== false) obs.unobserve(el); } }, { threshold: options.threshold || 0.15, rootMargin: options.rootMargin || "0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, isInView];
}

function useAnimatedCounter(end: number, duration = 2000, isActive = false, prefix = "", suffix = "") {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!isActive) return;
    const start = 0;
    const startTime = performance.now();
    const isFloat = !Number.isInteger(end);
    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (end - start) * eased;
      setVal(isFloat ? parseFloat(current.toFixed(1)) : Math.floor(current));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [isActive, end, duration]);
  return `${prefix}${val.toLocaleString()}${suffix}`;
}

function useScrollDirection() {
  const [dir, setDir] = useState("up");
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    let last = 0;
    const handler = () => {
      const y = window.scrollY;
      setDir(y > last && y > 80 ? "down" : "up");
      setScrollY(y);
      last = y;
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return { dir, scrollY };
}

// ─── ANIMATED ENTRY WRAPPER ───
function Reveal({ children, className = "", delay = 0, direction = "up" }: { children: React.ReactNode; className?: string; delay?: number; direction?: string }) {
  const [ref, isInView] = useInView({ threshold: 0.05, rootMargin: "50px" });
  const transforms: Record<string, string> = { up: "translateY(40px)", down: "translateY(-40px)", left: "translateX(-40px)", right: "translateX(40px)", none: "none" };
  return (
    <div ref={ref} className={className} style={{ opacity: isInView ? 1 : 0, transform: isInView ? "none" : transforms[direction], transition: `opacity 0.7s cubic-bezier(.25,.46,.45,.94) ${delay}s, transform 0.7s cubic-bezier(.25,.46,.45,.94) ${delay}s` }}>
      {children}
    </div>
  );
}

// ─── PRELOADER ───
function Preloader({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 100);
    const t2 = setTimeout(() => setPhase(2), 1200);
    const t3 = setTimeout(() => onDone(), 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", opacity: phase === 2 ? 0 : 1, transition: "opacity 0.6s ease", pointerEvents: phase === 2 ? "none" : "all" }}>
      <div style={{ textAlign: "center", transform: phase >= 1 ? "scale(1)" : "scale(0.8)", opacity: phase >= 1 ? 1 : 0, transition: "all 0.6s cubic-bezier(.25,.46,.45,.94)" }}>
        <div style={{ fontSize: "3rem", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--text-primary)", fontFamily: "'Plus Jakarta Sans', system-ui" }}>
          {"Lezzoo".split("").map((ch, i) => (
            <span key={i} style={{ display: "inline-block", opacity: phase >= 1 ? 1 : 0, transform: phase >= 1 ? "translateY(0)" : "translateY(20px)", transition: `all 0.4s ease ${i * 0.07}s` }}>{ch}</span>
          ))}
        </div>
        <div style={{ width: 60, height: 3, background: "linear-gradient(90deg, #E63946, #C62833)", borderRadius: 2, margin: "12px auto 0", opacity: phase >= 1 ? 1 : 0, transform: phase >= 1 ? "scaleX(1)" : "scaleX(0)", transition: "all 0.5s ease 0.5s" }} />
        <div style={{ marginTop: 16, opacity: phase >= 1 ? 0.4 : 0, transition: "opacity 0.5s ease 0.7s", fontSize: "0.75rem", color: "var(--text-muted)", letterSpacing: "0.2em", textTransform: "uppercase" }}>Lezzoo</div>
      </div>
      <div style={{ position: "absolute", width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(230,57,70,0.15) 0%, transparent 70%)", animation: "pulse 2s ease-in-out infinite" }} />
    </div>
  );
}

// ─── NAVBAR ───
function Navbar() {
  const { dir, scrollY } = useScrollDirection();
  const { theme, toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const visible = dir === "up" || scrollY < 80;
  const glass = scrollY > 80;
  const links = [
    { label: "Home", href: "#" },
    { label: "Ecosystem", href: "/ecosystem" },
    { label: "Our Story", href: "/story" },
    { label: "Why Lezzoo", href: "/why-lezzoo" },
    { label: "Careers", href: "/careers" },
  ];
  return (
    <>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, transform: visible ? "translateY(0)" : "translateY(-100%)", transition: "transform 0.35s ease, background 0.3s ease, backdrop-filter 0.3s ease", background: glass ? "var(--bg-glass)" : "transparent", backdropFilter: glass ? "blur(24px)" : "none", borderBottom: glass ? "1px solid var(--border)" : "none" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(1rem,5vw,3rem)", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          <a href="#" style={{ fontSize: "1.5rem", fontWeight: 800, color: glass ? "var(--text-primary)" : "#FAFAFA", textDecoration: "none", fontFamily: "'Plus Jakarta Sans', system-ui", letterSpacing: "-0.02em", transition: "color 0.3s" }}>
            Lezzoo<span style={{ color: "#E63946" }}>.</span>
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 32 }} className="nav-links-desktop">
            {links.map(l => (
              <a key={l.href} href={l.href} style={{ color: glass ? "var(--text-secondary)" : "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "0.9rem", fontWeight: 500, transition: "color 0.3s" }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = glass ? "var(--text-primary)" : "#fff"} onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = glass ? "var(--text-secondary)" : "rgba(255,255,255,0.7)"}>{l.label}</a>
            ))}
            {/* Theme toggle */}
            <button onClick={toggle} style={{ background: "none", border: "1px solid var(--border)", borderRadius: 9999, width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.3s ease", opacity: 0.7 }} aria-label="Toggle theme"
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = "1"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = "0.7"}>
              {theme === "dark" ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={glass ? "var(--text-secondary)" : "rgba(255,255,255,0.7)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={glass ? "var(--text-secondary)" : "rgba(255,255,255,0.7)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
              )}
            </button>
            <a href="#download" style={{ background: "linear-gradient(135deg, #E63946, #C62833)", color: "#fff", padding: "10px 24px", borderRadius: 9999, fontSize: "0.875rem", fontWeight: 600, textDecoration: "none", transition: "transform 0.2s, box-shadow 0.2s" }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.05)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(230,57,70,0.4)"; }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>Get the App</a>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {/* Mobile theme toggle */}
            <button onClick={toggle} className="nav-hamburger" style={{ background: "none", border: "1px solid var(--border)", borderRadius: 9999, width: 34, height: 34, cursor: "pointer", display: "none", alignItems: "center", justifyContent: "center" }} aria-label="Toggle theme">
              {theme === "dark" ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={glass ? "var(--text-secondary)" : "#FAFAFA"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={glass ? "var(--text-secondary)" : "#FAFAFA"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
              )}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="nav-hamburger" style={{ background: "none", border: "none", cursor: "pointer", padding: 8, display: "none" }}>
              <div style={{ width: 24, height: 2, background: glass ? "var(--text-primary)" : "#FAFAFA", marginBottom: 6, transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translateY(8px)" : "none" }} />
              <div style={{ width: 24, height: 2, background: glass ? "var(--text-primary)" : "#FAFAFA", marginBottom: 6, opacity: menuOpen ? 0 : 1, transition: "opacity 0.2s" }} />
              <div style={{ width: 24, height: 2, background: glass ? "var(--text-primary)" : "#FAFAFA", transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translateY(-8px)" : "none" }} />
            </button>
          </div>
        </div>
      </nav>
      {menuOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 99, background: "var(--bg-overlay)", backdropFilter: "blur(30px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32 }}>
          {links.map((l, i) => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} style={{ color: "var(--text-primary)", textDecoration: "none", fontSize: "2rem", fontWeight: 700, fontFamily: "'Plus Jakarta Sans', system-ui", opacity: 1, animation: `fadeSlideIn 0.4s ease ${i * 0.08}s both` }}>{l.label}</a>
          ))}
          <a href="#download" onClick={() => setMenuOpen(false)} style={{ background: "linear-gradient(135deg, #E63946, #C62833)", color: "#fff", padding: "14px 36px", borderRadius: 9999, fontSize: "1rem", fontWeight: 600, textDecoration: "none", marginTop: 16 }}>Get the App</a>
        </div>
      )}
    </>
  );
}

// ─── HERO ───
function Hero() {
  const [verbIdx, setVerbIdx] = useState(0);
  const [bgIdx, setBgIdx] = useState(0);
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 200); }, []);
  useEffect(() => { const t = setInterval(() => setVerbIdx(i => (i + 1) % ROTATING_VERBS.length), 3000); return () => clearInterval(t); }, []);
  useEffect(() => { const t = setInterval(() => setBgIdx(i => (i + 1) % HERO_BACKGROUNDS.length), 6000); return () => clearInterval(t); }, []);
  return (
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)", overflow: "hidden" }}>
      {/* Background GIFs */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        {HERO_BACKGROUNDS.map((src, i) => (
          <img key={src} src={src} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: i === bgIdx ? 0.35 : 0, transition: "opacity 1.2s ease" }} />
        ))}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(10,10,10,0.75) 0%, rgba(26,5,8,0.65) 50%, rgba(10,10,10,0.75) 100%)" }} />
      </div>
      {/* Ambient glow */}
      <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translate(-50%,-50%)", width: "min(800px, 90vw)", height: 500, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(230,57,70,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", background: "linear-gradient(to top, var(--bg), transparent)", pointerEvents: "none" }} />
      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <div key={i} style={{ position: "absolute", width: 4, height: 4, borderRadius: "50%", background: `rgba(230,57,70,${0.15 + i * 0.05})`, left: `${15 + i * 14}%`, top: `${20 + (i % 3) * 25}%`, animation: `float ${4 + i}s ease-in-out infinite alternate` }} />
      ))}
      <div style={{ position: "relative", textAlign: "center", padding: "0 clamp(1.5rem,5vw,4rem)", maxWidth: 900, zIndex: 2 }}>
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s cubic-bezier(.25,.46,.45,.94) 0.2s" }}>
          <p style={{ fontSize: "0.8rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: 24, fontWeight: 500 }}>Kurdistan & Iraq's Leading Super App</p>
        </div>
        <h1 style={{ fontFamily: "'Plus Jakarta Sans', system-ui", fontSize: "clamp(2.8rem, 7vw, 5.5rem)", fontWeight: 800, lineHeight: 1, color: "#FAFAFA", letterSpacing: "-0.03em", margin: 0, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transition: "all 0.8s cubic-bezier(.25,.46,.45,.94) 0.4s" }}>
          We{" "}
          <span style={{ position: "relative", display: "inline-block", minWidth: "4ch" }}>
            {ROTATING_VERBS.map((v, i) => (
              <span key={v} style={{ position: i === verbIdx ? "relative" : "absolute", left: i === verbIdx ? undefined : 0, top: i === verbIdx ? undefined : 0, display: "inline-block", background: "linear-gradient(135deg, #E63946, #C62833)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", opacity: i === verbIdx ? 1 : 0, transform: i === verbIdx ? "translateY(0) scale(1)" : "translateY(12px) scale(0.97)", filter: i === verbIdx ? "blur(0)" : "blur(4px)", transition: "opacity 0.7s ease, transform 0.7s ease, filter 0.7s ease" }}>{v}</span>
            ))}
          </span>
          <br />
          <span style={{ background: "linear-gradient(135deg, #E63946, #C62833)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>time</span>
          <br />to your doorstep.
        </h1>
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s ease 0.8s" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 24, padding: "6px 16px", borderRadius: 9999, background: "var(--bg-badge)", border: "1px solid var(--border)" }}>
            <span style={{ display: "inline-block", width: 18, height: 18, background: "#E63946", borderRadius: 4, fontSize: "0.65rem", fontWeight: 800, color: "#fff", lineHeight: "18px", textAlign: "center" }}>Y</span>
            <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>Y Combinator W19</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 40, flexWrap: "wrap", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s ease 1s" }}>
          <a href="#download" style={{ background: "linear-gradient(135deg, #E63946, #C62833)", color: "#fff", padding: "14px 32px", borderRadius: 9999, fontSize: "1rem", fontWeight: 600, textDecoration: "none", transition: "transform 0.2s, box-shadow 0.2s" }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.05)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(230,57,70,0.4)"; }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>Get the App</a>
          <a href="#story" style={{ color: "#FAFAFA", padding: "14px 32px", borderRadius: 9999, fontSize: "1rem", fontWeight: 500, textDecoration: "none", border: "1px solid rgba(255,255,255,0.15)", transition: "all 0.2s" }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--text-secondary)"; (e.currentTarget as HTMLElement).style.background = "var(--bg-card)"; }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border-light)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}>Our Story →</a>
        </div>
      </div>
      {/* Scroll indicator */}
      <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", opacity: visible ? 0.4 : 0, transition: "opacity 1s ease 1.5s" }}>
        <div style={{ width: 1, height: 48, background: "linear-gradient(to bottom, rgba(230,57,70,0.6), transparent)", animation: "scrollLine 2s ease-in-out infinite" }} />
      </div>
    </section>
  );
}

// ─── ECOSYSTEM ───
function Ecosystem() {
  const [active, setActive] = useState<number | null>(null);
  const [ref, isInView] = useInView();
  return (
    <section id="ecosystem" ref={ref} style={{ padding: "clamp(5rem,12vw,10rem) 0", background: "var(--gradient-ecosystem)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(131,56,236,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(1rem,5vw,3rem)", position: "relative", zIndex: 1 }}>
        <Reveal>
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#E63946", fontWeight: 600, marginBottom: 12 }}>The Ecosystem</p>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', system-ui", fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 16 }}>More Than Just Delivery</h2>
          <p style={{ color: "var(--text-muted)", maxWidth: 600, lineHeight: 1.7, marginBottom: 60, fontSize: "1.05rem" }}>From food to fintech, social to supply chain — one app powering daily life across Kurdistan.</p>
        </Reveal>
        {/* Orbit on desktop, grid always for artifact */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 16, maxWidth: 900, margin: "0 auto" }}>
          {SERVICES.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.05}>
              <div
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                style={{
                  background: active === i ? `rgba(${hexToRgb(s.color)},0.12)` : "var(--bg-card)",
                  border: `1px solid ${active === i ? s.color + "60" : "var(--border)"}`,
                  borderRadius: 16, padding: "20px 16px", textAlign: "center", cursor: "pointer",
                  transition: "all 0.3s ease", transform: active === i ? "translateY(-4px) scale(1.03)" : "none",
                  boxShadow: active === i ? `0 8px 30px rgba(${hexToRgb(s.color)},0.2)` : "none",
                }}
              >
                <div style={{ marginBottom: 8, display: "flex", justifyContent: "center" }}>{s.img ? <img src={s.img} alt={s.name} style={{ width: "100%", height: 100, objectFit: "contain" }} /> : <SvgIcon path={SVG_PATHS[s.icon]} color={active === i ? s.color : "var(--text-secondary)"} size={28} />}</div>
                <div style={{ fontSize: "0.85rem", fontWeight: 600, color: active === i ? s.color : "var(--text-primary)", transition: "color 0.3s", marginBottom: 4 }}>{s.name}</div>
                <div style={{ fontSize: "0.7rem", color: "var(--text-dim)", lineHeight: 1.4, opacity: active === i ? 1 : 0, maxHeight: active === i ? 60 : 0, overflow: "hidden", transition: "all 0.3s ease" }}>{s.desc}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

// ─── STORY TIMELINE ───
function StoryTimeline() {
  return (
    <section id="story" style={{ padding: "clamp(5rem,12vw,10rem) 0", background: "var(--gradient-story)", position: "relative" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 clamp(1rem,5vw,3rem)" }}>
        <Reveal>
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#E63946", fontWeight: 600, marginBottom: 12 }}>Our Journey</p>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', system-ui", fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 60 }}>From a Coffee Shop<br />to Y Combinator</h2>
        </Reveal>
        <div style={{ position: "relative" }}>
          {/* Center line */}
          <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 2, background: "linear-gradient(to bottom, #E63946, rgba(230,57,70,0.1))", transform: "translateX(-50%)" }} className="timeline-line" />
          {TIMELINE.map((m, i) => (
            <Reveal key={i} delay={i * 0.08} direction={m.side === "left" ? "left" : "right"}>
              <div className={`timeline-item timeline-${m.side}`} style={{ display: "flex", marginBottom: 48, position: "relative", justifyContent: m.side === "left" ? "flex-start" : "flex-end" }}>
                <div style={{ width: "45%", padding: 24, background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 16, position: "relative" }}>
                  <div style={{ position: "absolute", top: 28, [m.side === "left" ? "right" : "left"]: -30, width: 12, height: 12, borderRadius: "50%", background: "#E63946", border: "3px solid var(--bg)", boxShadow: "0 0 12px rgba(230,57,70,0.4)" }} className="timeline-dot" />
                  <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#E63946", letterSpacing: "0.1em", textTransform: "uppercase" }}>{m.year}</span>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6, marginTop: 8 }}>{m.event}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <a href="/story" style={{ color: "#E63946", fontWeight: 600, textDecoration: "none", fontSize: "0.95rem", borderBottom: "1px solid rgba(230,57,70,0.3)", paddingBottom: 2 }}>Read the Full Story →</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── STATS ───
function StatsSection() {
  const [ref, isInView] = useInView();
  return (
    <section ref={ref} style={{ padding: "clamp(4rem,8vw,7rem) 0", background: "var(--bg)", borderTop: "1px solid var(--border-faint)", borderBottom: "1px solid var(--border-faint)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(1rem,5vw,3rem)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "clamp(32px, 5vw, 56px)", textAlign: "center" }}>
        {STATS.map((s, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui", fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.02em", lineHeight: 1 }}>
                <Counter end={s.num} prefix={s.prefix || ""} suffix={s.suffix} active={isInView} />
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-dim)", marginTop: 8, fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>{s.label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Counter({ end, prefix = "", suffix = "", active }: { end: number; prefix?: string; suffix?: string; active: boolean }) {
  const display = useAnimatedCounter(end, 2200, active, prefix, suffix);
  return <>{display}</>;
}

// ─── AUDIENCE CARDS ───
function AudienceCards() {
  const cards = [
    { icon: "scrolls" as keyof typeof SVG_PATHS, img: "/icons/icon-foryou-removebg-preview.png", title: "For You", desc: "One app for everything. From dinner to prescriptions, trivia games to your local social feed.", cta: "Get the App", color: "#E63946", href: "#download" },
    { icon: "ecommerce" as keyof typeof SVG_PATHS, img: "/icons/icon-merchants-removebg-preview.png", title: "For Merchants", desc: "2,500+ vendors trust Lezzoo. Expand your reach, digitize operations, accept payments with Friendz.", cta: "Join Us", color: "#E63946", href: "https://ad-manager.lezzoodevs.com/merchant-registration" },
    { icon: "express" as keyof typeof SVG_PATHS, img: "/icons/icon-riders-removebg-preview.png", title: "For Riders", desc: "Part of a 3,000+ strong team network. Deliver happiness across Kurdistan and get paid on your terms.", cta: "Start Earning", color: "#2EC4B6", href: "https://web-courier-app.lezzoodevs.com/driver-signup" },
  ];
  return (
    <section style={{ padding: "clamp(5rem,12vw,10rem) 0", background: "var(--bg-alt)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(1rem,5vw,3rem)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
        {cards.map((c, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 20, padding: "clamp(28px,4vw,48px)", borderTop: `3px solid ${c.color}`, transition: "all 0.4s ease", cursor: "pointer", minHeight: 280, display: "flex", flexDirection: "column", justifyContent: "space-between" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)"; (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 50px rgba(${hexToRgb(c.color)},0.12)`; (e.currentTarget as HTMLElement).style.borderColor = c.color + "40"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "none"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}>
              <div>
                <div style={{ marginBottom: 20 }}>{c.img ? <img src={c.img} alt={c.title} style={{ width: 100, height: 100, objectFit: "contain" }} /> : <SvgIcon path={SVG_PATHS[c.icon]} color={c.color} size={40} />}</div>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans', system-ui", fontSize: "1.5rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 12 }}>{c.title}</h3>
                <p style={{ color: "var(--text-muted)", lineHeight: 1.7, fontSize: "0.95rem" }}>{c.desc}</p>
              </div>
              <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel={c.href.startsWith("http") ? "noopener" : undefined} style={{ marginTop: 28, background: `${c.color}18`, color: c.color, border: `1px solid ${c.color}30`, padding: "12px 24px", borderRadius: 9999, fontWeight: 600, fontSize: "0.875rem", cursor: "pointer", transition: "all 0.2s", alignSelf: "flex-start", textDecoration: "none", display: "inline-block" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = c.color; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = `${c.color}18`; (e.currentTarget as HTMLElement).style.color = c.color; }}>
                {c.cta}
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ─── PHONE FACE (reusable for prism) ───
function PhoneFace({ src, alt }: { src: string; alt: string }) {
  return (
    <div style={{ background: "var(--phone-bg)", borderRadius: "clamp(28px, 6vw, 44px)", padding: "clamp(8px, 2vw, 14px) clamp(4px, 1vw, 8px)", border: "1px solid var(--border-light)", boxShadow: "0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(230,57,70,0.06)", width: "100%", maxWidth: 280 }}>
      {/* Notch */}
      <div style={{ width: 90, height: 5, background: "var(--phone-notch)", borderRadius: 9999, margin: "0 auto 6px" }} />
      {/* Screen */}
      <div style={{ borderRadius: 32, overflow: "hidden", aspectRatio: "9 / 19.5", width: "100%", position: "relative", background: "#F5F0E8" }}>
        <img src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }} />
      </div>
      {/* Home indicator bar */}
      <div style={{ width: 80, height: 4, background: "var(--phone-indicator)", borderRadius: 9999, margin: "8px auto 2px" }} />
    </div>
  );
}

// ─── APP SHOWCASE (3D Triangular Prism) ───
const APP_SCREENSHOTS = [
  { src: "/app-screenshot.png", alt: "Lezzoo App - Home", label: "Order from 1,300+ restaurants" },
  { src: "/app-screenshot-2.png", alt: "Lezzoo App - Discover", label: "Scrolls, Games & Social" },
  { src: "/app-screenshot-3.png", alt: "Lezzoo App - Services", label: "Groceries, Pharmacy & More" },
];

function AppShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prismRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(0);
  const targetRotRef = useRef(0);
  const rafRef = useRef<number>(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [faceWidth, setFaceWidth] = useState(280);

  // Responsive face width
  useEffect(() => {
    const updateSize = () => {
      const vw = window.innerWidth;
      setFaceWidth(Math.min(280, vw * 0.6));
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const translateZ = faceWidth * 0.289;

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrolled = Math.max(0, Math.min(1, (viewportHeight - rect.top) / (sectionHeight + viewportHeight)));
      targetRotRef.current = scrolled * 360;
    };

    const animate = () => {
      // Lerp toward target for smooth interpolation
      const current = rotationRef.current;
      const target = targetRotRef.current;
      const next = current + (target - current) * 0.12;
      rotationRef.current = next;

      if (prismRef.current) {
        prismRef.current.style.transform = `rotateY(${-next}deg)`;
      }

      // Only re-render React for active index changes
      const normalizedRot = ((next % 360) + 360) % 360;
      const newIndex = normalizedRot < 80 ? 0 : normalizedRot < 200 ? 1 : 2;
      setActiveIndex(prev => prev !== newIndex ? newIndex : prev);

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section ref={sectionRef} style={{ height: "150vh", position: "relative", background: "var(--bg)" }}>
      {/* Sticky container */}
      <div style={{ position: "sticky", top: 0, height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", overflow: "hidden", paddingTop: "clamp(3rem, 6vh, 5rem)" }}>
        {/* Ambient glow */}
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "min(500px, 90vw)", height: "min(500px, 90vw)", borderRadius: "50%", background: "radial-gradient(circle, rgba(230,57,70,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ textAlign: "center", position: "relative", zIndex: 2, flexShrink: 0, padding: "0 1rem" }}>
          <Reveal>
            <p style={{ fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#E63946", fontWeight: 600, marginBottom: 8 }}>The App</p>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', system-ui", fontSize: "clamp(1.4rem,3vw,2.4rem)", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: 6 }}>Everything You Need,<br />Right in Your Pocket</h2>
          </Reveal>
          {/* Active face label */}
          <p style={{ fontSize: "clamp(0.7rem, 2vw, 0.8rem)", color: "var(--text-muted)", fontWeight: 500, marginBottom: 12, transition: "opacity 0.3s ease", minHeight: 20 }}>
            {APP_SCREENSHOTS[activeIndex].label}
          </p>
        </div>

        {/* 3D Prism */}
        <div style={{ perspective: "clamp(600px, 80vw, 1200px)", perspectiveOrigin: "center center", position: "relative", zIndex: 1, flex: 1, display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
          <div
            ref={prismRef}
            style={{
              width: faceWidth,
              height: "min(55vh, 520px)",
              position: "relative",
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
          >
            {APP_SCREENSHOTS.map((screenshot, i) => {
              const faceRotation = i * 120;
              return (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transformStyle: "preserve-3d",
                    transform: `rotateY(${faceRotation}deg) translateZ(${translateZ}px)`,
                    backfaceVisibility: "hidden",
                    willChange: "transform",
                  }}
                >
                  <PhoneFace src={screenshot.src} alt={screenshot.alt} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Dot indicators */}
        <div style={{ display: "flex", gap: 10, paddingBottom: "clamp(1.5rem, 3vh, 3rem)", position: "relative", zIndex: 2, flexShrink: 0 }}>
          {APP_SCREENSHOTS.map((_, i) => (
            <div
              key={i}
              style={{
                width: activeIndex === i ? 24 : 8,
                height: 8,
                borderRadius: 9999,
                background: activeIndex === i ? "#E63946" : "var(--border-light)",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── WHY LEZZOO ───
function WhyLezzoo() {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const differentiators = [
    {
      icon: "food" as keyof typeof SVG_PATHS,
      img: "/icons/icon-trophy-removebg-preview.png",
      svgPath: "M6 9H4.5a2.5 2.5 0 010-5C7 4 7 7 7 7M18 9h1.5a2.5 2.5 0 000-5C17 4 17 7 17 7M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22M18 2H6v7a6 6 0 0012 0V2z",
      stat: "1st",
      label: "Iraqi startup in Y Combinator",
      desc: "Accepted into the world's most prestigious accelerator in 2019. The only Iraqi company to ever graduate from YC — alongside DoorDash, Stripe, and Airbnb.",
      color: "#E63946",
    },
    {
      icon: "games" as keyof typeof SVG_PATHS,
      img: "/icons/icon-whygames-removebg-preview.png",
      svgPath: "M6 12h4M8 10v4M15 13h.01M18 11h.01M17.32 5H6.68a4 4 0 00-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 003 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 019.828 16h4.344a2 2 0 011.414.586L17 18c.5.5 1 1 2 1a3 3 0 003-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0017.32 5z",
      stat: "50+",
      label: "In-app games with real rewards",
      desc: "First super app in MENA to integrate gaming. Play trivia, win coins, redeem for TVs, consoles, and food vouchers. Trivia alone tripled our MAUs across all of Iraq.",
      color: "#FF006E",
    },
    {
      icon: "scrolls" as keyof typeof SVG_PATHS,
      img: "/icons/icon-whysocial-removebg-preview.png",
      svgPath: "M12 18v-3M8 21h8M7 3h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2zM9 7l3 2 3-2",
      stat: "3 in 1",
      label: "Commerce + Social + Entertainment",
      desc: "Jiran — Iraq's first local social media. Scrolls — TikTok-style food discovery. Xomali AI — generate images with AI. All inside one app.",
      color: "#8338EC",
    },
    {
      icon: "saydo" as keyof typeof SVG_PATHS,
      img: "/icons/icon-whyecosystem-removebg-preview.png",
      svgPath: "M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71",
      stat: "Full",
      label: "Ecosystem from B2C to B2B",
      desc: "Consumer delivery feeds merchant tools (Dukani, Friendz), which feeds B2B supply chain (Saydo). A complete flywheel digitizing Iraq's commerce infrastructure.",
      color: "#2EC4B6",
    },
    {
      icon: "pay" as keyof typeof SVG_PATHS,
      img: "/icons/icon-whypay-removebg-preview.png",
      svgPath: "M21 4H3a2 2 0 00-2 2v12a2 2 0 002 2h18a2 2 0 002-2V6a2 2 0 00-2-2zM1 10h22",
      stat: "Lezzoo Pay",
      label: "Building Iraq's digital wallet",
      desc: "In a country that runs on cash, Lezzoo Pay is pioneering digital payments — replacing physical money with a seamless in-app wallet experience.",
      color: "#00B4D8",
    },
  ];

  return (
    <section id="why" style={{ padding: "clamp(5rem,12vw,10rem) 0", background: "var(--gradient-why)", position: "relative", overflow: "hidden" }}>
      {/* Ambient background elements */}
      <div style={{ position: "absolute", top: "10%", right: "-5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(230,57,70,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", left: "-5%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(131,56,236,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />
      
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(1rem,5vw,3rem)", position: "relative", zIndex: 1 }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p style={{ fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#E63946", fontWeight: 600, marginBottom: 12 }}>What Sets Us Apart</p>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', system-ui", fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 16 }}>Not Just Another Delivery App</h2>
            <p style={{ color: "var(--text-muted)", maxWidth: 560, margin: "0 auto", lineHeight: 1.7, fontSize: "1.05rem" }}>We're building Iraq's entire digital infrastructure — from payments to social media, gaming to AI — all from Erbil.</p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
          {differentiators.map((d, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <div
                onMouseEnter={() => setActiveCard(i)}
                onMouseLeave={() => setActiveCard(null)}
                style={{
                  background: activeCard === i ? "var(--bg-card-hover)" : "var(--bg-card)",
                  border: `1px solid ${activeCard === i ? d.color + "35" : "var(--border)"}`,
                  borderRadius: 20,
                  padding: "28px 24px",
                  cursor: "default",
                  transition: "all 0.4s cubic-bezier(.25,.46,.45,.94)",
                  transform: activeCard === i ? "translateY(-4px)" : "none",
                  boxShadow: activeCard === i ? `0 16px 48px rgba(${hexToRgb(d.color)},0.1)` : "none",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Subtle glow on hover */}
                <div style={{
                  position: "absolute", top: -40, right: -40, width: 120, height: 120, borderRadius: "50%",
                  background: `radial-gradient(circle, ${d.color}10, transparent)`,
                  opacity: activeCard === i ? 1 : 0, transition: "opacity 0.4s ease", pointerEvents: "none"
                }} />
                
                <div style={{ display: "flex", alignItems: "flex-start", gap: 16, position: "relative" }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: 14, flexShrink: 0, overflow: "hidden",
                    background: `${d.color}12`, border: `1px solid ${d.color}20`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.4rem", transition: "all 0.3s",
                    transform: activeCard === i ? "scale(1.1)" : "none",
                  }}>{d.img ? <img src={d.img} alt={d.label} style={{ width: "100%", height: "100%", objectFit: "contain" }} /> : <SvgIcon path={d.svgPath} color={d.color} size={22} />}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                      <span style={{
                        fontFamily: "'Plus Jakarta Sans', system-ui", fontSize: "1.4rem", fontWeight: 800,
                        color: activeCard === i ? d.color : "var(--text-primary)", transition: "color 0.3s",
                      }}>{d.stat}</span>
                      <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 500 }}>{d.label}</span>
                    </div>
                    <p style={{
                      color: "var(--text-dim)", fontSize: "0.85rem", lineHeight: 1.65,
                      maxHeight: activeCard === i ? 200 : 0, opacity: activeCard === i ? 1 : 0,
                      overflow: "hidden", transition: "all 0.4s cubic-bezier(.25,.46,.45,.94)",
                      marginTop: activeCard === i ? 8 : 0,
                    }}>{d.desc}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bottom accent */}
        <Reveal delay={0.4}>
          <div style={{ textAlign: "center", marginTop: 56 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "12px 24px", borderRadius: 9999, background: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <span style={{ fontFamily: "'Plus Jakarta Sans', system-ui", fontWeight: 700, fontSize: "0.9rem", background: "linear-gradient(135deg, #E63946, #C62833)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>We are building the superapp of Iraq</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── SOCIAL PROOF ───
function SocialProof() {
  const logos = ["Y Combinator", "Carrefour", "World Food Program", "Northern Gulf Partners", "Flat6Labs", "Dukkantek"];
  return (
    <section style={{ padding: "clamp(4rem,8vw,7rem) 0", background: "var(--bg)", overflow: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(1rem,5vw,3rem)" }}>
        {/* Logo marquee */}
        <div style={{ display: "flex", gap: 48, animation: "marquee 25s linear infinite", whiteSpace: "nowrap", marginBottom: 60 }}>
          {[...logos, ...logos].map((l, i) => (
            <span key={i} style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--logo-partner-color)", letterSpacing: "0.05em", textTransform: "uppercase", flexShrink: 0 }}>{l}</span>
          ))}
        </div>
        {/* Quotes */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 40 }}>
          <Reveal direction="left">
            <blockquote style={{ position: "relative", paddingLeft: 24, borderLeft: "2px solid var(--quote-border)" }}>
              <span style={{ position: "absolute", top: -10, left: -4, fontSize: "4rem", color: "var(--quote-mark)", fontFamily: "Georgia, serif", lineHeight: 1 }}>"</span>
              <p style={{ fontFamily: "'Plus Jakarta Sans', system-ui", fontSize: "clamp(1.1rem,2vw,1.4rem)", color: "var(--text-secondary)", fontStyle: "italic", lineHeight: 1.6, marginBottom: 16 }}>I was 23, pitching in San Francisco. Every time I said Iraq, they said no. Y Combinator said yes.</p>
              <cite style={{ color: "var(--text-dim)", fontSize: "0.85rem", fontStyle: "normal", fontWeight: 500 }}>— Yadgar Merani, CEO & Co-Founder</cite>
            </blockquote>
          </Reveal>
          <Reveal direction="right" delay={0.15}>
            <blockquote style={{ position: "relative", paddingLeft: 24, borderLeft: "2px solid var(--quote-border)" }}>
              <span style={{ position: "absolute", top: -10, left: -4, fontSize: "4rem", color: "var(--quote-mark)", fontFamily: "Georgia, serif", lineHeight: 1 }}>"</span>
              <p style={{ fontFamily: "'Plus Jakarta Sans', system-ui", fontSize: "clamp(1.1rem,2vw,1.4rem)", color: "var(--text-secondary)", fontStyle: "italic", lineHeight: 1.6, marginBottom: 16 }}>Companies like Lezzoo are building the digital infrastructure of Kurdistan from the ground up.</p>
              <cite style={{ color: "var(--text-dim)", fontSize: "0.85rem", fontStyle: "normal", fontWeight: 500 }}>— Kurdistan Chronicle</cite>
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── KURDISTAN MAP ───
function KurdistanMap() {
  const [activeCity, setActiveCity] = useState<number | null>(null);
  return (
    <section style={{ padding: "clamp(5rem,12vw,10rem) 0", background: "var(--bg-alt)" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 clamp(1rem,5vw,3rem)", textAlign: "center" }}>
        <Reveal>
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#E63946", fontWeight: 600, marginBottom: 12 }}>Coverage</p>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', system-ui", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: 48 }}>Where We Deliver</h2>
        </Reveal>
        <Reveal delay={0.15}>
          <div style={{ position: "relative", maxWidth: 600, margin: "0 auto", aspectRatio: "4/3" }}>
            {/* Stylized map background */}
            <svg viewBox="0 0 100 80" style={{ width: "100%", height: "100%" }}>
              <defs>
                <radialGradient id="mapGlow" cx="55%" cy="45%" r="45%">
                  <stop offset="0%" stopColor="rgba(230,57,70,0.08)" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
              </defs>
              <rect width="100" height="80" fill="transparent" />
              <ellipse cx="55" cy="42" rx="38" ry="32" fill="url(#mapGlow)" />
              {/* Terrain lines */}
              <path d="M 15 30 Q 30 20 50 25 Q 70 30 85 22" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
              <path d="M 10 45 Q 35 35 55 40 Q 75 45 90 38" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
              <path d="M 20 60 Q 40 50 60 55 Q 80 60 95 52" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
              {/* Connection lines between cities */}
              {CITIES.map((c1, i) => CITIES.slice(i + 1).map((c2, j) => (
                <line key={`${i}-${j}`} x1={c1.x} y1={c1.y} x2={c2.x} y2={c2.y} stroke="rgba(230,57,70,0.08)" strokeWidth="0.3" strokeDasharray="2 2" />
              )))}
            </svg>
            {/* City dots */}
            {CITIES.map((c, i) => (
              <div key={i} style={{ position: "absolute", left: `${c.x}%`, top: `${c.y}%`, transform: "translate(-50%,-50%)", cursor: "pointer", zIndex: 5 }}
                onMouseEnter={() => setActiveCity(i)} onMouseLeave={() => setActiveCity(null)}>
                <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#E63946", border: "3px solid var(--bg-alt)", boxShadow: "0 0 20px rgba(230,57,70,0.4)", animation: "pulse 2.5s ease infinite", animationDelay: `${i * 0.3}s` }} />
                <div style={{ position: "absolute", top: c.y < 30 ? 22 : -44, left: "50%", transform: "translateX(-50%)", textAlign: "center", whiteSpace: "nowrap" }}>
                  <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-primary)" }}>{c.name}</div>
                  {activeCity === i && (
                    <div style={{ background: "var(--bg-glass)", border: "1px solid var(--border-light)", borderRadius: 8, padding: "6px 12px", fontSize: "0.7rem", color: "var(--text-muted)", marginTop: 4, boxShadow: "0 8px 24px rgba(0,0,0,0.4)" }}>{c.info}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <p style={{ color: "var(--text-dim)", marginTop: 32, fontSize: "0.9rem" }}>Coming soon to more cities across Iraq and beyond.</p>
        </Reveal>
      </div>
    </section>
  );
}

// ─── CAREERS ───
function CareersTeaser() {
  return (
    <section id="careers" style={{ padding: "clamp(5rem,12vw,10rem) 0", background: "var(--gradient-careers)" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 clamp(1rem,5vw,3rem)" }}>
        <Reveal>
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#E63946", fontWeight: 600, marginBottom: 12 }}>Careers</p>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', system-ui", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: 16 }}>Join the Lezzoo Team</h2>
          <p style={{ color: "var(--text-muted)", maxWidth: 550, lineHeight: 1.7, fontSize: "1rem", marginBottom: 48 }}>From a Costa Coffee in Erbil to Y Combinator in San Francisco — and now building Iraq's digital future. We're 3,000+ strong and always looking for people who move fast.</p>
        </Reveal>
        <Reveal delay={0.15}>
          <a href="https://www.linkedin.com/company/lezzoo/jobs/" target="_blank" rel="noopener" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "linear-gradient(135deg, #E63946, #C62833)", color: "#fff", padding: "14px 32px", borderRadius: 9999, fontSize: "1rem", fontWeight: 600, textDecoration: "none", transition: "transform 0.2s, box-shadow 0.2s" }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.05)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(230,57,70,0.4)"; }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>View Open Roles on LinkedIn →</a>
        </Reveal>
      </div>
    </section>
  );
}

// ─── DOWNLOAD CTA ───
function DownloadCTA() {
  return (
    <section id="download" style={{ padding: "clamp(4rem,10vw,8rem) 0", background: "#E63946", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "-30%", right: "-10%", width: 500, height: 500, borderRadius: "50%", background: "rgba(255,255,255,0.06)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-20%", left: "-5%", width: 300, height: 300, borderRadius: "50%", background: "rgba(0,0,0,0.06)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "20%", left: "15%", width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.03)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 clamp(1rem,5vw,3rem)", textAlign: "center", position: "relative", zIndex: 1 }}>
        <Reveal>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', system-ui", fontSize: "clamp(2.2rem,5vw,3.5rem)", fontWeight: 800, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 16 }}>Bringing you time back.</h2>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.1rem", marginBottom: 40, lineHeight: 1.6 }}>Food. Groceries. Games. Social. AI. Payment. And so much more.</p>
        </Reveal>
        <Reveal delay={0.15}>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://apps.apple.com/us/app/lezzoo-food-grocery-delivery/id1313894378" target="_blank" rel="noopener" style={{ display: "inline-flex", alignItems: "center", gap: 12, background: "#000", color: "#fff", padding: "14px 28px", borderRadius: 14, textDecoration: "none", transition: "transform 0.2s, box-shadow 0.2s", border: "1px solid rgba(255,255,255,0.15)" }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.05)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 30px rgba(0,0,0,0.3)"; }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 21.99 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 21.99C7.79 22.03 6.8 20.68 5.96 19.47C4.25 16.99 2.97 12.5 4.7 9.5C5.55 8.01 7.13 7.07 8.82 7.05C10.12 7.03 11.32 7.92 12.11 7.92C12.89 7.92 14.37 6.85 15.92 7.01C16.57 7.04 18.39 7.27 19.56 8.93C19.47 8.99 17.39 10.23 17.41 12.74C17.44 15.76 20.06 16.77 20.09 16.78C20.06 16.86 19.67 18.24 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/></svg>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: "0.6rem", opacity: 0.8, lineHeight: 1 }}>Download on the</div>
                <div style={{ fontSize: "1.1rem", fontWeight: 700, lineHeight: 1.2 }}>App Store</div>
              </div>
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.fastwares.lezzoo.eats&pcampaignid=web_share" target="_blank" rel="noopener" style={{ display: "inline-flex", alignItems: "center", gap: 12, background: "#000", color: "#fff", padding: "14px 28px", borderRadius: 14, textDecoration: "none", transition: "transform 0.2s, box-shadow 0.2s", border: "1px solid rgba(255,255,255,0.15)" }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.05)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 30px rgba(0,0,0,0.3)"; }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-1.38l2.545 1.474c.8.463.8 1.935 0 2.398l-2.545 1.474-2.542-2.673 2.542-2.673zM5.864 3.455L16.8 9.788l-2.302 2.302-8.634-8.635z" fill="white"/></svg>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: "0.6rem", opacity: 0.8, lineHeight: 1 }}>Get it on</div>
                <div style={{ fontSize: "1.1rem", fontWeight: 700, lineHeight: 1.2 }}>Google Play</div>
              </div>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── FOOTER ───
function Footer() {
  const columns = [
    { title: "Company", links: [{ label: "Our Story", href: "/story" }, { label: "Ecosystem", href: "/ecosystem" }, { label: "Newsroom", href: "#" }, { label: "Careers", href: "/careers" }, { label: "Why Lezzoo", href: "/why-lezzoo" }] },
    { title: "Products", links: [{ label: "Food Delivery", href: "/ecosystem" }, { label: "Groceries", href: "/ecosystem" }, { label: "Pharmacy", href: "/ecosystem" }, { label: "Express", href: "/ecosystem" }, { label: "Lezzoo Pay", href: "/ecosystem" }, { label: "Games", href: "/ecosystem" }, { label: "Jiran", href: "/ecosystem" }] },
    { title: "Get Involved", links: [{ label: "Become a Merchant", href: "https://ad-manager.lezzoodevs.com/merchant-registration" }, { label: "Become a Rider", href: "https://web-courier-app.lezzoodevs.com/driver-signup" }, { label: "Contact Us", href: "#" }] },
  ];
  const socials = [
    { label: "Instagram", href: "https://www.instagram.com/lezzooeats/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/lezzoo" },
    { label: "Facebook", href: "https://www.facebook.com/Lezzooeats/" },
    { label: "YouTube", href: "https://www.youtube.com/channel/UChqtzdGHQBALqg6s7iYG5PQ" },
    { label: "X", href: "https://x.com/lezzooeats" },
  ];
  return (
    <footer style={{ background: "var(--bg)", borderTop: "1px solid var(--border-faint)", padding: "clamp(3rem,8vw,5rem) 0 2rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(1rem,5vw,3rem)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "clamp(32px,4vw,48px)", marginBottom: 48 }}>
          {/* Brand col */}
          <div>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)", fontFamily: "'Plus Jakarta Sans', system-ui", marginBottom: 12 }}>Lezzoo<span style={{ color: "#E63946" }}>.</span></div>
            <p style={{ color: "var(--text-dim)", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: 16 }}>Kurdistan & Iraq's leading super app. 1M+ customers. Est. 2018. Backed by Y Combinator.</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {socials.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener" style={{ color: "var(--text-dim)", fontSize: "0.75rem", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"} onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--text-dim)"}>{s.label}</a>
              ))}
            </div>
          </div>
          {columns.map(col => (
            <div key={col.title}>
              <h4 style={{ color: "var(--text-primary)", fontSize: "0.8rem", fontWeight: 600, marginBottom: 16, letterSpacing: "0.05em", textTransform: "uppercase" }}>{col.title}</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {col.links.map(l => (
                  <a key={l.label} href={l.href} style={{ color: "var(--text-dim)", fontSize: "0.85rem", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"} onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--text-dim)"}>{l.label}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid var(--border-faint)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ color: "var(--text-faint)", fontSize: "0.75rem" }}>© 2026 Lezzoo Inc. All rights reserved.</p>
          <div style={{ display: "flex", gap: 16 }}>
            <a href="#" style={{ color: "var(--text-faint)", fontSize: "0.75rem", textDecoration: "none" }}>Privacy</a>
            <a href="#" style={{ color: "var(--text-faint)", fontSize: "0.75rem", textDecoration: "none" }}>Terms</a>
          </div>
          <p style={{ color: "var(--text-faint)", fontSize: "0.75rem", width: "100%" }}>Esporta Bldg., Floor 2, Erbil, Kurdistan, Iraq · info@lezzoo.com · 066 211 5600</p>
        </div>
      </div>
    </footer>
  );
}

// ─── MAIN APP ───
export default function LezzooApp() {
  const [loaded, setLoaded] = useState(false);
  const [theme, setTheme] = useState("dark");
  const toggle = useCallback(() => setTheme(t => t === "dark" ? "light" : "dark"), []);
  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      <div data-theme={theme} style={{ fontFamily: "'Inter', system-ui, sans-serif", background: "var(--bg)", color: "var(--text-primary)", minHeight: "100vh", overflowX: "hidden", transition: "background 0.3s ease, color 0.3s ease" }}>
        {!loaded && <Preloader onDone={() => setLoaded(true)} />}
        {loaded && (
          <>
            <Navbar />
            <Hero />
            <Ecosystem />
            <StoryTimeline />
            <StatsSection />
            <AudienceCards />
            <AppShowcase />
            <WhyLezzoo />
            <SocialProof />
            <KurdistanMap />
            <CareersTeaser />
            <DownloadCTA />
            <Footer />
          </>
        )}
      </div>
    </ThemeContext.Provider>
  );
}
