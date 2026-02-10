"use client";

import { Navbar, Footer, PageHero, Reveal, hexToRgb, useInView, useAnimatedCounter } from "../components";
import { useState } from "react";

function Counter({ end, prefix = "", suffix = "", active }: { end: number; prefix?: string; suffix?: string; active: boolean }) {
  const display = useAnimatedCounter(end, 2200, active, prefix, suffix);
  return <>{display}</>;
}

const VALUES = [
  { icon: "⚡", title: "Move Fast", body: "We shipped our first product in weeks, not months. Speed is in our DNA — it's in our name. Quick decisions, rapid iteration, bias toward action." },
  { icon: "🌍", title: "Build for Iraq", body: "We don't copy-paste Silicon Valley playbooks. We build for the realities of our market — cash economies, infrastructure gaps, and a young population hungry for innovation." },
  { icon: "🤝", title: "One Team", body: "From engineers in Erbil to riders on the streets — we're one team. No egos, no silos. The person who coded Lezzoo's first feature also delivered its first order." },
  { icon: "🎯", title: "Think Big, Start Small", body: "Our vision is to build Iraq's digital infrastructure. But we get there one order, one product, one city at a time. Ambition grounded in execution." },
  { icon: "🧪", title: "Experiment Relentlessly", body: "Trivia, Scrolls, Jiran, Xomali AI — each started as an experiment. We launch fast, learn faster, and double down on what works." },
  { icon: "❤️", title: "Kurdish Pride, Global Standards", body: "We're proudly from Kurdistan. Our name is bilingual Kurdish. But our standards are global. Y Combinator, world-class UX, and tech that competes with anyone." },
];

const PERKS = [
  { icon: "💰", title: "Competitive salary", desc: "Top of market for Iraq & Kurdistan" },
  { icon: "🏥", title: "Health insurance", desc: "Full medical coverage for you & family" },
  { icon: "📚", title: "Learning budget", desc: "Annual allowance for courses & conferences" },
  { icon: "🍕", title: "Free Lezzoo credits", desc: "Monthly credits for food & grocery orders" },
  { icon: "🏠", title: "Flexible work", desc: "Hybrid model — office + remote days" },
  { icon: "🎮", title: "Game room", desc: "Because we literally have 50+ games" },
  { icon: "✈️", title: "Travel opportunities", desc: "YC network events, global conferences" },
  { icon: "📈", title: "Growth trajectory", desc: "Fast promotions in a fast-growing company" },
];

const DEPARTMENTS = [
  { name: "Engineering", color: "#4361EE", roles: [
    { title: "Senior React Native Engineer", location: "Erbil", type: "Full-time" },
    { title: "Backend Engineer (Node.js)", location: "Erbil", type: "Full-time" },
    { title: "DevOps / Infrastructure Engineer", location: "Erbil", type: "Full-time" },
    { title: "AI / ML Engineer", location: "Erbil", type: "Full-time" },
    { title: "QA Engineer", location: "Erbil / Remote", type: "Full-time" },
  ]},
  { name: "Product & Design", color: "#8338EC", roles: [
    { title: "Senior Product Designer", location: "Erbil", type: "Full-time" },
    { title: "Product Manager — Games", location: "Erbil", type: "Full-time" },
    { title: "UX Researcher", location: "Erbil", type: "Full-time" },
  ]},
  { name: "Marketing & Growth", color: "#FF006E", roles: [
    { title: "Growth Marketing Lead", location: "Erbil", type: "Full-time" },
    { title: "Social Media Manager", location: "Erbil", type: "Full-time" },
    { title: "Content Creator — Scrolls", location: "Erbil", type: "Full-time" },
  ]},
  { name: "Operations", color: "#2EC4B6", roles: [
    { title: "Operations Manager — Sulaymaniyah", location: "Sulaymaniyah", type: "Full-time" },
    { title: "Supply Chain Analyst (Saydo)", location: "Erbil", type: "Full-time" },
    { title: "City Launcher — New Markets", location: "Various", type: "Full-time" },
  ]},
  { name: "Business & Finance", color: "#F7B32B", roles: [
    { title: "Business Development Manager", location: "Erbil", type: "Full-time" },
    { title: "Financial Analyst", location: "Erbil", type: "Full-time" },
  ]},
];

export default function CareersPage() {
  const [openDept, setOpenDept] = useState<number | null>(0);
  const [statsRef, statsInView] = useInView();

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: "#0A0A0A", color: "#FAFAFA", minHeight: "100vh" }}>
      <Navbar />

      <PageHero
        overline="Careers"
        title="Join the Lezzoo Team"
        subtitle="From a Costa Coffee in Erbil to Y Combinator in San Francisco — and now building Iraq's digital future. We're 3,000+ strong and always looking for people who move fast."
      >
        <a href="https://www.linkedin.com/company/lezzoo/jobs/" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: "linear-gradient(135deg, #E63946, #C62833)", color: "#fff", padding: "14px 32px", borderRadius: 9999, fontSize: "1rem", fontWeight: 600, textDecoration: "none", transition: "transform 0.2s" }}>View Open Roles</a>
      </PageHero>

      {/* Stats */}
      <section ref={statsRef} style={{ padding: "clamp(4rem,8vw,6rem) 0", background: "#0F0F0F", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 clamp(1rem,5vw,3rem)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 32, textAlign: "center" }}>
          {([
            { num: 3000, suffix: "+", label: "Team Network", prefix: "" },
            { num: 5, suffix: "", label: "Cities", prefix: "" },
            { num: 18, suffix: "+", label: "Departments", prefix: "" },
            { num: 30, suffix: "", label: "Avg. Age", prefix: "" },
          ] as const).map((s, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, color: "#FAFAFA" }}>
                <Counter end={s.num} prefix={s.prefix || ""} suffix={s.suffix} active={statsInView} />
              </div>
              <div style={{ fontSize: "0.75rem", color: "#6B6B6B", marginTop: 8, fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: "clamp(5rem,12vw,10rem) 0", background: "#0A0A0A" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(1rem,5vw,3rem)" }}>
          <Reveal>
            <p style={{ fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#E63946", fontWeight: 600, marginBottom: 12 }}>Our Values</p>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', system-ui", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, color: "#FAFAFA", lineHeight: 1.1, marginBottom: 48, letterSpacing: "-0.02em" }}>What Drives Us</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
            {VALUES.map((v, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 20, padding: "28px 24px", transition: "all 0.3s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(230,57,70,0.15)"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.035)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.05)"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)"; }}>
                  <span style={{ fontSize: "2rem", display: "block", marginBottom: 16 }}>{v.icon}</span>
                  <h3 style={{ fontFamily: "'Plus Jakarta Sans', system-ui", fontSize: "1.1rem", fontWeight: 700, color: "#FAFAFA", marginBottom: 10 }}>{v.title}</h3>
                  <p style={{ color: "#888", fontSize: "0.9rem", lineHeight: 1.7 }}>{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Perks */}
      <section style={{ padding: "clamp(5rem,12vw,10rem) 0", background: "#0F0F0F" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(1rem,5vw,3rem)" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <p style={{ fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#E63946", fontWeight: 600, marginBottom: 12 }}>Perks & Benefits</p>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans', system-ui", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, color: "#FAFAFA", lineHeight: 1.1, letterSpacing: "-0.02em" }}>We Take Care of Our People</h2>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
            {PERKS.map((p, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 16, padding: "20px 18px", display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <span style={{ fontSize: "1.4rem", flexShrink: 0, marginTop: 2 }}>{p.icon}</span>
                  <div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "#FAFAFA", marginBottom: 4 }}>{p.title}</div>
                    <div style={{ fontSize: "0.8rem", color: "#6B6B6B", lineHeight: 1.5 }}>{p.desc}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section style={{ padding: "clamp(5rem,12vw,10rem) 0", background: "#0A0A0A" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 clamp(1rem,5vw,3rem)" }}>
          <Reveal>
            <p style={{ fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#E63946", fontWeight: 600, marginBottom: 12 }}>Open Roles</p>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', system-ui", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, color: "#FAFAFA", lineHeight: 1.1, marginBottom: 48, letterSpacing: "-0.02em" }}>Find Your Role</h2>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {DEPARTMENTS.map((dept, di) => (
              <Reveal key={di} delay={di * 0.06}>
                <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, overflow: "hidden" }}>
                  <button onClick={() => setOpenDept(openDept === di ? null : di)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 24px", background: "none", border: "none", cursor: "pointer", color: "#FAFAFA" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 10, height: 10, borderRadius: "50%", background: dept.color }} />
                      <span style={{ fontFamily: "'Plus Jakarta Sans', system-ui", fontSize: "1.05rem", fontWeight: 700 }}>{dept.name}</span>
                      <span style={{ fontSize: "0.75rem", color: "#6B6B6B", background: "rgba(255,255,255,0.04)", padding: "2px 10px", borderRadius: 9999 }}>{dept.roles.length} roles</span>
                    </div>
                    <span style={{ color: "#888", fontSize: "1.2rem", transform: openDept === di ? "rotate(45deg)" : "none", transition: "transform 0.3s" }}>+</span>
                  </button>
                  <div style={{ maxHeight: openDept === di ? 500 : 0, overflow: "hidden", transition: "max-height 0.4s ease" }}>
                    <div style={{ padding: "0 24px 16px" }}>
                      {dept.roles.map((role, ri) => (
                        <a key={ri} href="https://www.linkedin.com/company/lezzoo/jobs/" target="_blank" rel="noopener noreferrer" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderTop: "1px solid rgba(255,255,255,0.04)", textDecoration: "none", transition: "all 0.2s", flexWrap: "wrap", gap: 8 }}
                          onMouseEnter={e => (e.currentTarget as HTMLElement).style.paddingLeft = "8px"}
                          onMouseLeave={e => (e.currentTarget as HTMLElement).style.paddingLeft = "0"}>
                          <div>
                            <div style={{ color: "#FAFAFA", fontWeight: 500, fontSize: "0.9rem", marginBottom: 4 }}>{role.title}</div>
                            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                              <span style={{ fontSize: "0.75rem", color: "#6B6B6B" }}>{role.location}</span>
                              <span style={{ fontSize: "0.65rem", color: "#888", background: "rgba(255,255,255,0.04)", padding: "2px 8px", borderRadius: 9999 }}>{role.type}</span>
                            </div>
                          </div>
                          <span style={{ color: "#E63946", fontSize: "0.85rem", fontWeight: 500 }}>Apply →</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.4}>
            <div style={{ textAlign: "center", marginTop: 40 }}>
              <p style={{ color: "#6B6B6B", fontSize: "0.9rem", marginBottom: 16 }}>Don&apos;t see your role? We&apos;re always looking for talented people.</p>
              <a href="mailto:info@lezzoo.com" style={{ color: "#E63946", fontWeight: 600, textDecoration: "none", fontSize: "0.95rem", borderBottom: "1px solid rgba(230,57,70,0.3)", paddingBottom: 2 }}>Send us your CV →</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Culture quote */}
      <section style={{ padding: "clamp(4rem,8vw,6rem) 0", background: "#0F0F0F" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 clamp(1rem,5vw,3rem)", textAlign: "center" }}>
          <Reveal>
            <span style={{ fontSize: "4rem", color: "rgba(230,57,70,0.2)", fontFamily: "Georgia, serif", lineHeight: 1 }}>&ldquo;</span>
            <p style={{ fontFamily: "'Plus Jakarta Sans', system-ui", fontSize: "clamp(1.3rem,2.5vw,1.8rem)", color: "#ABABAB", fontStyle: "italic", lineHeight: 1.6, marginBottom: 20, marginTop: -20 }}>We&apos;re not just building an app — we&apos;re building the digital future of Kurdistan. And we need the best people on earth to help us do it.</p>
            <cite style={{ color: "#6B6B6B", fontSize: "0.9rem", fontStyle: "normal", fontWeight: 500 }}>— Yadgar Merani, CEO & Co-Founder</cite>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
