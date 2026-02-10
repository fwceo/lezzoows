"use client";

import { Navbar, Footer, DownloadCTA, PageHero, Reveal, hexToRgb } from "../components";
import { useState } from "react";

const PRODUCTS = [
  { name: "Food Delivery", color: "#E63946", icon: "🍕", category: "Core", desc: "1,300+ restaurants across 5 cities. From shawarma to sushi, pizza to local Kurdish cuisine — delivered hot and fast.", features: ["Real-time order tracking", "Scheduled deliveries", "30-min average delivery", "Restaurant reviews & ratings"] },
  { name: "Groceries", color: "#2EC4B6", icon: "🛒", category: "Core", desc: "100,000+ products from your favorite stores. Fresh produce, pantry staples, and household essentials delivered to your door.", features: ["Same-day delivery", "100K+ products", "Carrefour partnership", "Freshness guaranteed"] },
  { name: "Pharmacy", color: "#4361EE", icon: "💊", category: "Core", desc: "Prescriptions and over-the-counter medicine delivered discreetly and quickly. Healthcare access made simple.", features: ["Licensed pharmacies", "Prescription uploads", "Discreet packaging", "Express delivery"] },
  { name: "Express", color: "#E63946", icon: "📦", category: "Core", desc: "Courier anything, anywhere, fast. Send packages, documents, or anything else across the city.", features: ["Point-to-point delivery", "Real-time tracking", "Same-day guaranteed", "Business accounts"] },
  { name: "Home Services", color: "#7B2FF7", icon: "🔧", category: "Core", desc: "Professional services on demand. Plumbers, electricians, cleaners, gardeners — vetted pros at your fingertips.", features: ["Vetted professionals", "Upfront pricing", "Satisfaction guaranteed", "Same-day booking"] },
  { name: "E-Commerce", color: "#F7B32B", icon: "🛍️", category: "Core", desc: "Shop from top local and international stores through one app. Electronics, fashion, home goods, and more.", features: ["Curated stores", "Price comparison", "Easy returns", "Secure checkout"] },
  { name: "Water & Gas", color: "#00B4D8", icon: "💧", category: "Core", desc: "Essential utilities delivered by truck. Schedule water and gas deliveries so you never run out.", features: ["Bulk ordering", "Scheduled deliveries", "Subscription plans", "Truck tracking"] },
  { name: "Lezzoo Pay", color: "#00B4D8", icon: "💳", category: "Fintech", desc: "Iraq's digital wallet. Send money, pay bills, split costs, and go cashless — all inside the Lezzoo app.", features: ["Instant transfers", "Bill payments", "QR code payments", "Cashback rewards"] },
  { name: "Friendz", color: "#3A86FF", icon: "🤝", category: "Fintech", desc: "Contactless restaurant payment and bill splitting. 700+ tables in the first month. The future of dining out.", features: ["Scan & pay at table", "Split bills instantly", "No waiting for the check", "700+ tables live"] },
  { name: "Lezzoo Games", color: "#FF006E", icon: "🎮", category: "Entertainment", desc: "50+ games inside the app. Play trivia, puzzle games, and hyper-casual titles. Earn coins and redeem for real prizes.", features: ["50+ games", "Coin rewards system", "Win TVs & consoles", "Trivia tripled MAUs"] },
  { name: "Jiran", color: "#06D6A0", icon: "👥", category: "Social", desc: "Iraq's first local social media. Connect with your neighborhood, share updates, and buy & sell locally.", features: ["Neighborhood feed", "Buy & sell marketplace", "Local events", "Community building"] },
  { name: "Scrolls", color: "#8338EC", icon: "📱", category: "Social", desc: "TikTok-style short video feed integrated with ordering. See a dish you love? Order it right from the video.", features: ["Short-form video", "Order from video", "Creator tools", "Trending food content"] },
  { name: "Xomali AI", color: "#E63946", icon: "🤖", category: "AI", desc: "AI-powered image generation built right into the Lezzoo app. Create, share, and express yourself with AI art.", features: ["Text-to-image", "Multiple styles", "Share to Jiran", "Free to use"] },
  { name: "Saydo (B2B)", color: "#E63946", icon: "🏭", category: "B2B", desc: "Iraq's B2B FMCG marketplace connecting suppliers directly to retailers. Digitizing the entire food supply chain.", features: ["Supplier directory", "Bulk ordering", "Route optimization", "Invoice management"] },
];

const CATEGORIES = ["All", "Core", "Fintech", "Entertainment", "Social", "AI", "B2B"];

export default function EcosystemPage() {
  const [filter, setFilter] = useState("All");
  const [expanded, setExpanded] = useState<number | null>(null);
  const filtered = filter === "All" ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: "#0A0A0A", color: "#FAFAFA", minHeight: "100vh" }}>
      <Navbar />

      <PageHero
        overline="The Ecosystem"
        title="14 Products. One Super App."
        subtitle="From food delivery to fintech, social media to AI — explore every product powering daily life across Kurdistan."
      />

      {/* Flywheel diagram */}
      <section style={{ padding: "0 0 clamp(4rem,8vw,6rem)", background: "#0A0A0A" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 clamp(1rem,5vw,3rem)" }}>
          <Reveal>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 24, padding: "clamp(24px,4vw,48px)", textAlign: "center" }}>
              <p style={{ fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#888", marginBottom: 20, fontWeight: 500 }}>The Lezzoo Flywheel</p>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "clamp(8px,2vw,24px)", flexWrap: "wrap" }}>
                {["Consumers Order", "Merchants Grow", "Supply Chain Digitizes", "Social Engages", "Games Retain", "AI Innovates"].map((step, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "clamp(8px,2vw,24px)" }}>
                    <div style={{ background: `rgba(230,57,70,${0.08 + i * 0.04})`, border: "1px solid rgba(230,57,70,0.15)", borderRadius: 12, padding: "10px 16px", fontSize: "clamp(0.7rem,1.2vw,0.85rem)", fontWeight: 600, color: "#FAFAFA", whiteSpace: "nowrap" }}>{step}</div>
                    {i < 5 && <span style={{ color: "#E63946", fontSize: "1rem" }}>→</span>}
                  </div>
                ))}
              </div>
              <p style={{ color: "#6B6B6B", fontSize: "0.85rem", marginTop: 20 }}>Each product feeds the next — creating a self-reinforcing ecosystem.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Category filter */}
      <section style={{ padding: "0 0 clamp(5rem,12vw,10rem)", background: "#0A0A0A" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(1rem,5vw,3rem)" }}>
          <Reveal>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40, justifyContent: "center" }}>
              {CATEGORIES.map(c => (
                <button key={c} onClick={() => { setFilter(c); setExpanded(null); }} style={{ background: filter === c ? "#E63946" : "rgba(255,255,255,0.04)", color: filter === c ? "#fff" : "#888", border: `1px solid ${filter === c ? "#E63946" : "rgba(255,255,255,0.08)"}`, borderRadius: 9999, padding: "8px 20px", fontSize: "0.85rem", fontWeight: 500, cursor: "pointer", transition: "all 0.2s" }}>{c}</button>
              ))}
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
            {filtered.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.05}>
                <div
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  style={{
                    background: expanded === i ? `rgba(${hexToRgb(p.color)},0.06)` : "rgba(255,255,255,0.025)",
                    border: `1px solid ${expanded === i ? p.color + "30" : "rgba(255,255,255,0.06)"}`,
                    borderRadius: 20, padding: "28px 24px", cursor: "pointer",
                    transition: "all 0.4s ease",
                    transform: expanded === i ? "translateY(-4px)" : "none",
                    boxShadow: expanded === i ? `0 12px 40px rgba(${hexToRgb(p.color)},0.12)` : "none",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: `${p.color}15`, border: `1px solid ${p.color}25`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", flexShrink: 0 }}>{p.icon}</div>
                    <div>
                      <h3 style={{ fontFamily: "'Plus Jakarta Sans', system-ui", fontSize: "1.1rem", fontWeight: 700, color: "#FAFAFA", marginBottom: 2 }}>{p.name}</h3>
                      <span style={{ fontSize: "0.7rem", color: p.color, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>{p.category}</span>
                    </div>
                  </div>
                  <p style={{ color: "#888", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: expanded === i ? 16 : 0 }}>{p.desc}</p>
                  <div style={{ maxHeight: expanded === i ? 200 : 0, opacity: expanded === i ? 1 : 0, overflow: "hidden", transition: "all 0.4s ease" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 8 }}>
                      {p.features.map((f, fi) => (
                        <div key={fi} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.8rem", color: "#ABABAB" }}>
                          <div style={{ width: 5, height: 5, borderRadius: "50%", background: p.color, flexShrink: 0 }} />
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ textAlign: "right", marginTop: 8 }}>
                    <span style={{ fontSize: "0.75rem", color: "#6B6B6B" }}>{expanded === i ? "Collapse" : "Tap to expand"}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <DownloadCTA />
      <Footer />
    </div>
  );
}
