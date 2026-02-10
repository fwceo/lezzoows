"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// ─── HOOKS ───
interface InViewOptions {
  once?: boolean;
  threshold?: number;
  rootMargin?: string;
}

export function useInView(options: InViewOptions = {}): [React.RefObject<HTMLDivElement>, boolean] {
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

export function useScrollDirection() {
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

export function useAnimatedCounter(end: number, duration = 2000, isActive = false, prefix = "", suffix = "") {
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

export function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

// ─── REVEAL ───
export function Reveal({ children, className = "", delay = 0, direction = "up" }: { children: React.ReactNode; className?: string; delay?: number; direction?: string }) {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const transforms: Record<string, string> = { up: "translateY(40px)", down: "translateY(-40px)", left: "translateX(-40px)", right: "translateX(40px)", none: "none" };
  return (
    <div ref={ref} className={className} style={{ opacity: isInView ? 1 : 0, transform: isInView ? "none" : transforms[direction], transition: `opacity 0.7s cubic-bezier(.25,.46,.45,.94) ${delay}s, transform 0.7s cubic-bezier(.25,.46,.45,.94) ${delay}s` }}>
      {children}
    </div>
  );
}

// ─── PAGE HERO (reusable for inner pages) ───
export function PageHero({ overline, title, subtitle, children }: { overline: string; title: string; subtitle: string; children?: React.ReactNode }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);
  return (
    <section style={{ position: "relative", minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #0A0A0A 0%, #1A0508 50%, #0A0A0A 100%)", overflow: "hidden", paddingTop: 100, paddingBottom: 80 }}>
      <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)", width: "min(600px, 80vw)", height: 400, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(230,57,70,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "30%", background: "linear-gradient(to top, #0A0A0A, transparent)", pointerEvents: "none" }} />
      <div style={{ position: "relative", textAlign: "center", padding: "0 clamp(1.5rem,5vw,4rem)", maxWidth: 800, zIndex: 2 }}>
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s ease 0.1s" }}>
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#E63946", fontWeight: 600, marginBottom: 16 }}>{overline}</p>
        </div>
        <h1 style={{ fontFamily: "'Plus Jakarta Sans', system-ui", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 800, lineHeight: 1.05, color: "#FAFAFA", letterSpacing: "-0.03em", margin: 0, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: "all 0.7s ease 0.2s" }}>{title}</h1>
        <p style={{ color: "#888", fontSize: "clamp(1rem, 2vw, 1.2rem)", lineHeight: 1.7, marginTop: 20, maxWidth: 600, marginLeft: "auto", marginRight: "auto", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s ease 0.4s" }}>{subtitle}</p>
        {children && <div style={{ marginTop: 32, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s ease 0.5s" }}>{children}</div>}
      </div>
    </section>
  );
}

// ─── NAVBAR ───
export function Navbar() {
  const { dir, scrollY } = useScrollDirection();
  const [menuOpen, setMenuOpen] = useState(false);
  const visible = dir === "up" || scrollY < 80;
  const glass = scrollY > 80;
  const links = [
    { label: "Ecosystem", href: "/ecosystem" },
    { label: "Our Story", href: "/story" },
    { label: "Why Lezzoo", href: "/why-lezzoo" },
    { label: "Careers", href: "/careers" },
  ];
  return (
    <>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, transform: visible ? "translateY(0)" : "translateY(-100%)", transition: "transform 0.35s ease, background 0.3s ease, backdrop-filter 0.3s ease", background: glass ? "rgba(10,10,10,0.8)" : "transparent", backdropFilter: glass ? "blur(24px)" : "none", borderBottom: glass ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(1rem,5vw,3rem)", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          <Link href="/" style={{ fontSize: "1.5rem", fontWeight: 800, color: "#FAFAFA", textDecoration: "none", fontFamily: "'Plus Jakarta Sans', system-ui", letterSpacing: "-0.02em" }}>
            Lezzoo<span style={{ color: "#E63946" }}>.</span>
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 32 }} className="nav-links-desktop">
            {links.map(l => (
              <Link key={l.href} href={l.href} style={{ color: "#ABABAB", textDecoration: "none", fontSize: "0.9rem", fontWeight: 500, transition: "color 0.2s" }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#FAFAFA"} onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#ABABAB"}>{l.label}</Link>
            ))}
            <Link href="/#download" style={{ background: "linear-gradient(135deg, #E63946, #C62833)", color: "#fff", padding: "10px 24px", borderRadius: 9999, fontSize: "0.875rem", fontWeight: 600, textDecoration: "none", transition: "transform 0.2s, box-shadow 0.2s" }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.05)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(230,57,70,0.4)"; }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>Get the App</Link>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="nav-hamburger" style={{ background: "none", border: "none", cursor: "pointer", padding: 8, display: "none" }}>
            <div style={{ width: 24, height: 2, background: "#FAFAFA", marginBottom: 6, transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translateY(8px)" : "none" }} />
            <div style={{ width: 24, height: 2, background: "#FAFAFA", marginBottom: 6, opacity: menuOpen ? 0 : 1, transition: "opacity 0.2s" }} />
            <div style={{ width: 24, height: 2, background: "#FAFAFA", transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translateY(-8px)" : "none" }} />
          </button>
        </div>
      </nav>
      {menuOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 99, background: "rgba(10,10,10,0.97)", backdropFilter: "blur(30px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32 }}>
          {links.map((l, i) => (
            <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)} style={{ color: "#FAFAFA", textDecoration: "none", fontSize: "2rem", fontWeight: 700, fontFamily: "'Plus Jakarta Sans', system-ui", animation: `fadeSlideIn 0.4s ease ${i * 0.08}s both` }}>{l.label}</Link>
          ))}
          <Link href="/#download" onClick={() => setMenuOpen(false)} style={{ background: "linear-gradient(135deg, #E63946, #C62833)", color: "#fff", padding: "14px 36px", borderRadius: 9999, fontSize: "1rem", fontWeight: 600, textDecoration: "none", marginTop: 16 }}>Get the App</Link>
        </div>
      )}
    </>
  );
}

// ─── FOOTER ───
export function Footer() {
  const columns = [
    { title: "Company", links: [{ label: "Our Story", href: "/story" }, { label: "Ecosystem", href: "/ecosystem" }, { label: "Why Lezzoo", href: "/why-lezzoo" }, { label: "Careers", href: "/careers" }] },
    { title: "Products", links: [{ label: "Food Delivery", href: "/ecosystem" }, { label: "Groceries", href: "/ecosystem" }, { label: "Pharmacy", href: "/ecosystem" }, { label: "Express", href: "/ecosystem" }, { label: "Lezzoo Pay", href: "/ecosystem" }, { label: "Games", href: "/ecosystem" }, { label: "Jiran", href: "/ecosystem" }] },
    { title: "Get Involved", links: [{ label: "Become a Merchant", href: "https://ad-manager.lezzoodevs.com/merchant-registration" }, { label: "Become a Rider", href: "https://web-courier-app.lezzoodevs.com/driver-signup" }, { label: "Contact Us", href: "/careers" }] },
  ];
  const socials = [
    { label: "Instagram", href: "https://www.instagram.com/lezzooeats/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/lezzoo" },
    { label: "Facebook", href: "https://www.facebook.com/Lezzooeats/" },
    { label: "YouTube", href: "https://www.youtube.com/channel/UChqtzdGHQBALqg6s7iYG5PQ" },
    { label: "X", href: "https://x.com/lezzooeats" },
  ];
  return (
    <footer style={{ background: "#0A0A0A", borderTop: "1px solid rgba(255,255,255,0.04)", padding: "clamp(3rem,8vw,5rem) 0 2rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(1rem,5vw,3rem)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "clamp(32px,4vw,48px)", marginBottom: 48 }}>
          <div>
            <Link href="/" style={{ fontSize: "1.5rem", fontWeight: 800, color: "#FAFAFA", fontFamily: "'Plus Jakarta Sans', system-ui", marginBottom: 12, display: "block", textDecoration: "none" }}>Lezzoo<span style={{ color: "#E63946" }}>.</span></Link>
            <p style={{ color: "#6B6B6B", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: 16 }}>Kurdistan & Iraq&apos;s leading super app. 1M+ customers. Est. 2018. Backed by Y Combinator.</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {socials.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{ color: "#6B6B6B", fontSize: "0.75rem", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#FAFAFA"} onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#6B6B6B"}>{s.label}</a>
              ))}
            </div>
          </div>
          {columns.map(col => (
            <div key={col.title}>
              <h4 style={{ color: "#FAFAFA", fontSize: "0.8rem", fontWeight: 600, marginBottom: 16, letterSpacing: "0.05em", textTransform: "uppercase" }}>{col.title}</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {col.links.map(l => (
                  <Link key={l.label} href={l.href} style={{ color: "#6B6B6B", fontSize: "0.85rem", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#ABABAB"} onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#6B6B6B"}>{l.label}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ color: "#4A4A4A", fontSize: "0.75rem" }}>© 2026 Lezzoo Inc. All rights reserved.</p>
          <div style={{ display: "flex", gap: 16 }}>
            <a href="#" style={{ color: "#4A4A4A", fontSize: "0.75rem", textDecoration: "none" }}>Privacy</a>
            <a href="#" style={{ color: "#4A4A4A", fontSize: "0.75rem", textDecoration: "none" }}>Terms</a>
          </div>
          <p style={{ color: "#4A4A4A", fontSize: "0.75rem", width: "100%" }}>Esporta Bldg., Floor 2, Erbil, Kurdistan, Iraq · info@lezzoo.com · 066 211 5600</p>
        </div>
      </div>
    </footer>
  );
}

// ─── DOWNLOAD CTA (reusable) ───
export function DownloadCTA() {
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
            <a href="https://apps.apple.com/us/app/lezzoo-food-grocery-delivery/id1313894378" target="_blank" rel="noopener" style={{ display: "inline-flex", alignItems: "center", gap: 12, background: "#000", color: "#fff", padding: "14px 28px", borderRadius: 14, textDecoration: "none", transition: "transform 0.2s, box-shadow 0.2s", border: "1px solid rgba(255,255,255,0.15)" }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.05)"; }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 21.99 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 21.99C7.79 22.03 6.8 20.68 5.96 19.47C4.25 16.99 2.97 12.5 4.7 9.5C5.55 8.01 7.13 7.07 8.82 7.05C10.12 7.03 11.32 7.92 12.11 7.92C12.89 7.92 14.37 6.85 15.92 7.01C16.57 7.04 18.39 7.27 19.56 8.93C19.47 8.99 17.39 10.23 17.41 12.74C17.44 15.76 20.06 16.77 20.09 16.78C20.06 16.86 19.67 18.24 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/></svg>
              <div style={{ textAlign: "left" }}><div style={{ fontSize: "0.6rem", opacity: 0.8, lineHeight: 1 }}>Download on the</div><div style={{ fontSize: "1.1rem", fontWeight: 700, lineHeight: 1.2 }}>App Store</div></div>
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.fastwares.lezzoo.eats&pcampaignid=web_share" target="_blank" rel="noopener" style={{ display: "inline-flex", alignItems: "center", gap: 12, background: "#000", color: "#fff", padding: "14px 28px", borderRadius: 14, textDecoration: "none", transition: "transform 0.2s, box-shadow 0.2s", border: "1px solid rgba(255,255,255,0.15)" }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.05)"; }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-1.38l2.545 1.474c.8.463.8 1.935 0 2.398l-2.545 1.474-2.542-2.673 2.542-2.673zM5.864 3.455L16.8 9.788l-2.302 2.302-8.634-8.635z" fill="white"/></svg>
              <div style={{ textAlign: "left" }}><div style={{ fontSize: "0.6rem", opacity: 0.8, lineHeight: 1 }}>Get it on</div><div style={{ fontSize: "1.1rem", fontWeight: 700, lineHeight: 1.2 }}>Google Play</div></div>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
