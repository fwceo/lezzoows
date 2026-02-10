"use client";

import { Navbar, Footer, DownloadCTA, PageHero, Reveal, hexToRgb, useInView, useAnimatedCounter } from "../components";
import { useState } from "react";

function Counter({ end, prefix = "", suffix = "", active }: { end: number; prefix?: string; suffix?: string; active: boolean }) {
  const display = useAnimatedCounter(end, 2200, active, prefix, suffix);
  return <>{display}</>;
}

const DIFFERENTIATORS = [
  {
    icon: "🏆", title: "First & Only Iraqi YC Startup",
    body: "In 2018, a 23-year-old from Erbil flew to San Francisco alone. His co-founders couldn't get visas. Every time he said \"Iraq,\" investors said no. Y Combinator said yes — making Lezzoo the first and only Iraqi company to graduate from the world's most prestigious accelerator. We sit alongside DoorDash, Stripe, and Airbnb in the YC family.",
    color: "#E63946", stat: "W19", statLabel: "YC Batch"
  },
  {
    icon: "🎮", title: "Gaming Inside a Delivery App",
    body: "We're the first super app in MENA to integrate gaming. 50+ games — from trivia to hyper-casual titles. Players earn coins redeemable for real prizes: TVs, gaming consoles, food vouchers. When we launched Lezzoo Trivia, it tripled our monthly active users across all of Iraq overnight. Gaming isn't a gimmick — it's our retention engine.",
    color: "#FF006E", stat: "50+", statLabel: "In-App Games"
  },
  {
    icon: "📱", title: "Social Commerce Pioneer",
    body: "Jiran is Iraq's first homegrown social media — a neighborhood feed where people connect, share, and buy & sell. Scrolls is our TikTok-style video feed where you can order food directly from what you see. No other super app in the region combines social, entertainment, and commerce this deeply.",
    color: "#8338EC", stat: "3x", statLabel: "MAU Growth"
  },
  {
    icon: "🤖", title: "AI-Native Super App",
    body: "Xomali AI lets users generate images with artificial intelligence — right inside the Lezzoo app. Internally, we use AI-driven bots and automation across operations, customer support, and logistics. We're not bolting AI onto an old platform; we're building AI into the foundation.",
    color: "#06D6A0", stat: "1st", statLabel: "AI in MENA Super App"
  },
  {
    icon: "🔗", title: "Full-Stack Ecosystem",
    body: "Most delivery apps stop at the consumer. We built the entire stack: consumer delivery (B2C) feeds merchant tools like Dukani and Friendz, which feed B2B supply chain through Saydo. Lezzoo Pay ties it all together with digital payments. It's a flywheel — each product makes every other product stronger.",
    color: "#00B4D8", stat: "14", statLabel: "Products"
  },
  {
    icon: "💳", title: "Replacing Cash in Iraq",
    body: "Iraq runs on cash. Lezzoo Pay is changing that. Our digital wallet enables instant transfers, QR payments, bill splitting, and cashback rewards. Combined with Friendz (contactless restaurant payments with 700+ tables in the first month), we're building Iraq's fintech infrastructure from the ground up.",
    color: "#F7B32B", stat: "700+", statLabel: "Friendz Tables"
  },
];

const COMPARISONS = [
  { feature: "Food & Grocery Delivery", lezzoo: true, others: true },
  { feature: "In-App Gaming (50+ games)", lezzoo: true, others: false },
  { feature: "Local Social Media (Jiran)", lezzoo: true, others: false },
  { feature: "TikTok-Style Ordering (Scrolls)", lezzoo: true, others: false },
  { feature: "AI Image Generation", lezzoo: true, others: false },
  { feature: "Digital Wallet & Payments", lezzoo: true, others: true },
  { feature: "B2B Supply Chain (Saydo)", lezzoo: true, others: false },
  { feature: "Contactless Dining (Friendz)", lezzoo: true, others: false },
  { feature: "Y Combinator Alumni", lezzoo: true, others: false },
];

export default function WhyLezzooPage() {
  const [statsRef, statsInView] = useInView();

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: "#0A0A0A", color: "#FAFAFA", minHeight: "100vh" }}>
      <Navbar />

      <PageHero
        overline="Why Lezzoo"
        title="Not Just Another Delivery App"
        subtitle="We're building Iraq's entire digital infrastructure — payments, social, gaming, AI, supply chain — all from Erbil."
      >
        <div style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "10px 22px", borderRadius: 9999, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <span style={{ fontSize: "0.85rem", color: "#ABABAB" }}>Think of us as</span>
          <span style={{ fontFamily: "'Plus Jakarta Sans', system-ui", fontWeight: 700, fontSize: "0.9rem", color: "#E63946" }}>Grab + WeChat + Roblox</span>
          <span style={{ fontSize: "0.85rem", color: "#ABABAB" }}>— built for Iraq</span>
        </div>
      </PageHero>

      {/* Key stats */}
      <section ref={statsRef} style={{ padding: "clamp(4rem,8vw,6rem) 0", background: "#0F0F0F", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(1rem,5vw,3rem)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 32, textAlign: "center" }}>
          {[
            { num: 1, suffix: "M+", label: "Customers" },
            { num: 2500, suffix: "+", label: "Vendors" },
            { num: 200, suffix: "M+", prefix: "$", label: "GMV" },
            { num: 14, suffix: "", label: "Products" },
            { num: 5, suffix: "", label: "Cities" },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 800, color: "#FAFAFA" }}>
                <Counter end={s.num} prefix={s.prefix || ""} suffix={s.suffix} active={statsInView} />
              </div>
              <div style={{ fontSize: "0.75rem", color: "#6B6B6B", marginTop: 8, fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Differentiators deep dive */}
      <section style={{ padding: "clamp(5rem,12vw,10rem) 0", background: "#0A0A0A" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 clamp(1rem,5vw,3rem)" }}>
          <Reveal>
            <p style={{ fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#E63946", fontWeight: 600, marginBottom: 12 }}>What Sets Us Apart</p>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', system-ui", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, color: "#FAFAFA", lineHeight: 1.1, marginBottom: 60, letterSpacing: "-0.02em" }}>Six Reasons We&apos;re Different</h2>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {DIFFERENTIATORS.map((d, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 32, alignItems: "start", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 20, padding: "clamp(24px,3vw,36px)", transition: "all 0.3s" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                      <span style={{ fontSize: "1.5rem" }}>{d.icon}</span>
                      <h3 style={{ fontFamily: "'Plus Jakarta Sans', system-ui", fontSize: "clamp(1.1rem,2vw,1.4rem)", fontWeight: 700, color: "#FAFAFA" }}>{d.title}</h3>
                    </div>
                    <p style={{ color: "#888", fontSize: "0.95rem", lineHeight: 1.8 }}>{d.body}</p>
                  </div>
                  <div style={{ textAlign: "center", padding: "16px 20px", background: `${d.color}10`, border: `1px solid ${d.color}20`, borderRadius: 16, minWidth: 90, flexShrink: 0 }}>
                    <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui", fontSize: "1.6rem", fontWeight: 800, color: d.color }}>{d.stat}</div>
                    <div style={{ fontSize: "0.65rem", color: "#888", fontWeight: 500, marginTop: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>{d.statLabel}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section style={{ padding: "clamp(5rem,12vw,10rem) 0", background: "linear-gradient(180deg, #0F0F0F, #0A0A0A)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 clamp(1rem,5vw,3rem)" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <p style={{ fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#E63946", fontWeight: 600, marginBottom: 12 }}>Comparison</p>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans', system-ui", fontSize: "clamp(1.8rem,3.5vw,2.5rem)", fontWeight: 800, color: "#FAFAFA", lineHeight: 1.15 }}>Lezzoo vs. Traditional Delivery Apps</h2>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 80px", gap: 0, padding: "16px 20px", background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: "0.05em" }}>Feature</span>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#E63946", textAlign: "center" }}>Lezzoo</span>
                <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#888", textAlign: "center" }}>Others</span>
              </div>
              {COMPARISONS.map((c, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 80px 80px", gap: 0, padding: "14px 20px", borderBottom: i < COMPARISONS.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                  <span style={{ fontSize: "0.85rem", color: "#ABABAB" }}>{c.feature}</span>
                  <span style={{ textAlign: "center", fontSize: "1rem" }}>{c.lezzoo ? "✅" : "—"}</span>
                  <span style={{ textAlign: "center", fontSize: "1rem" }}>{c.others ? "✅" : "❌"}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <DownloadCTA />
      <Footer />
    </div>
  );
}
