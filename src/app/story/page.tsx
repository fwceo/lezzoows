"use client";

import { Navbar, Footer, DownloadCTA, PageHero, Reveal, hexToRgb, useInView, useAnimatedCounter } from "../components";
import { useState } from "react";

function Counter({ end, prefix = "", suffix = "", active }: { end: number; prefix?: string; suffix?: string; active: boolean }) {
  const display = useAnimatedCounter(end, 2200, active, prefix, suffix);
  return <>{display}</>;
}

const CHAPTERS = [
  {
    year: "2015",
    title: "The Spark",
    body: "Two young Kurds — Yadgar Merani and Rekar Botany — sat in a Costa Coffee in Erbil, dreaming about the future. They weren't thinking about food delivery yet. They were thinking about digitizing reality itself. They formed a small company called Fastwares, built games, apps, and software — anything to sharpen their skills and push the boundaries of what was possible in Kurdistan.",
    accent: "#E63946",
    icon: "☕",
  },
  {
    year: "2017",
    title: "The London Moment",
    body: "While studying political philosophy at UCL in London, Yadgar watched a Deliveroo rider zip past on a rainy evening. A simple thought struck him: \"I wish we had this back home.\" That moment crystallized everything. Kurdistan needed its own digital platform — not a copy of Western apps, but something built from the ground up for the unique realities of Iraq. Something that understood cash economies, limited infrastructure, and the hunger for modernity in a region rebuilding itself.",
    accent: "#4361EE",
    icon: "🚴",
  },
  {
    year: "2018",
    title: "Day One",
    body: "Lezzoo launched with just 12 restaurants in Erbil and 10 in Duhok. The name was deliberate — combining two Kurdish words for \"quick\": Lez (Badini dialect) + Zoo (Sorani dialect) = QuickQuick. On launch day, co-founder Rekar personally delivered the very first order in his own car. There was no fleet, no fancy logistics. Just three friends, a dream, and the willingness to do whatever it took.",
    accent: "#2EC4B6",
    icon: "🚗",
  },
  {
    year: "2018",
    title: "Y Combinator Says Yes",
    body: "In December 2018, Yadgar flew to San Francisco alone — his co-founders couldn't get visas. He was 23, pitching to Harvard and Cambridge graduates. Every time he mentioned Iraq, investors' eyes glazed over. But Y Combinator saw what others couldn't. They accepted Lezzoo into the Winter 2019 batch, making it the first and only Iraqi startup to ever graduate from the world's most prestigious accelerator. The $150K pre-seed was just the beginning.",
    accent: "#E63946",
    icon: "🏆",
  },
  {
    year: "2020",
    title: "When Everything Stopped",
    body: "COVID-19 hit Iraq hard. Lezzoo went from 1,100 orders per day to zero — overnight. Restaurants shuttered. Streets emptied. Most startups would have crumbled. Instead, Lezzoo pivoted. Within weeks they were delivering water, gas, groceries, pharmacy items, and even at-home COVID testing kits. The company that started as a food delivery app became the essential service that kept Kurdistan running through its darkest months. They partnered with Carrefour, launched Lezzoo Pay, and closed Iraq's largest seed round.",
    accent: "#FF006E",
    icon: "🦠",
  },
  {
    year: "2022",
    title: "Building the Infrastructure",
    body: "Lezzoo acquired Saydo, Iraq's B2B FMCG marketplace, to digitize the entire food supply chain from farm to table. They partnered with Dukkantek to build digital retail infrastructure and joined forces with the World Food Program for youth empowerment and agricultural digitization. The vision was becoming clearer: Lezzoo wasn't just delivering food — it was building Iraq's digital backbone.",
    accent: "#7B2FF7",
    icon: "🔗",
  },
  {
    year: "2023–24",
    title: "The Super App Emerges",
    body: "What followed was an explosion of innovation. Lezzoo Trivia launched and tripled monthly active users across all of Iraq. Scrolls brought TikTok-style food discovery. Jiran became Iraq's first homegrown social media. Xomali AI added image generation. Friendz revolutionized restaurant payments. 50+ in-app games with real prizes. Revenue hit $13.1M. The team grew past 600. Lezzoo was no longer a delivery app — it was a digital nation builder.",
    accent: "#F7B32B",
    icon: "🚀",
  },
  {
    year: "Today",
    title: "And This Is Just the Beginning",
    body: "1M+ customers. 2,500+ vendors. 3,000+ team network. $200M+ in GMV. 6 cities and growing. From that Costa Coffee in Erbil to building one of the most ambitious super apps on the planet — in one of the world's most challenging markets. Every order delivered, every game played, every connection made on Jiran is proof that world-class technology can come from anywhere. Even from Kurdistan.",
    accent: "#E63946",
    icon: "🌍",
  },
];

const FOUNDERS = [
  { name: "Yadgar Merani", role: "CEO & Co-Founder", quote: "I was 23, pitching in San Francisco. Every time I said Iraq, they said no. Y Combinator said yes." },
  { name: "Rekar Botany", role: "CTO & Co-Founder", quote: "I delivered the first Lezzoo order myself — in my own car. Now we're serving millions." },
];

export default function StoryPage() {
  const [statsRef, statsInView] = useInView();

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: "#0A0A0A", color: "#FAFAFA", minHeight: "100vh" }}>
      <Navbar />

      <PageHero
        overline="Our Story"
        title="From a Coffee Shop to a Super App"
        subtitle="The story of two friends from Erbil who set out to digitize Kurdistan — and ended up building Iraq's most ambitious tech company."
      />

      {/* Chapters */}
      <section style={{ padding: "0 0 clamp(5rem,12vw,10rem)", background: "#0A0A0A" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 clamp(1rem,5vw,3rem)" }}>
          {CHAPTERS.map((ch, i) => (
            <Reveal key={i} delay={0.1} direction={i % 2 === 0 ? "left" : "right"}>
              <div style={{ marginBottom: 64, position: "relative", paddingLeft: 32, borderLeft: `2px solid ${ch.accent}25` }}>
                <div style={{ position: "absolute", left: -8, top: 0, width: 14, height: 14, borderRadius: "50%", background: ch.accent, boxShadow: `0 0 20px ${ch.accent}40` }} />
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <span style={{ fontSize: "1.5rem" }}>{ch.icon}</span>
                  <span style={{ fontSize: "0.7rem", fontWeight: 700, color: ch.accent, letterSpacing: "0.15em", textTransform: "uppercase" }}>{ch.year}</span>
                </div>
                <h2 style={{ fontFamily: "'Plus Jakarta Sans', system-ui", fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 800, color: "#FAFAFA", lineHeight: 1.15, marginBottom: 16, letterSpacing: "-0.02em" }}>{ch.title}</h2>
                <p style={{ color: "#888", fontSize: "1rem", lineHeight: 1.8 }}>{ch.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stats band */}
      <section ref={statsRef} style={{ padding: "clamp(4rem,8vw,6rem) 0", background: "#0F0F0F", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 clamp(1rem,5vw,3rem)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 32, textAlign: "center" }}>
          {[
            { num: 1, suffix: "M+", label: "Customers" },
            { num: 2500, suffix: "+", label: "Vendors" },
            { num: 200, suffix: "M+", prefix: "$", label: "GMV" },
            { num: 3000, suffix: "+", label: "Team Network" },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, color: "#FAFAFA" }}>
                <Counter end={s.num} prefix={s.prefix || ""} suffix={s.suffix} active={statsInView} />
              </div>
              <div style={{ fontSize: "0.8rem", color: "#6B6B6B", marginTop: 8, fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Founders */}
      <section style={{ padding: "clamp(5rem,12vw,10rem) 0", background: "#0A0A0A" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 clamp(1rem,5vw,3rem)" }}>
          <Reveal>
            <p style={{ fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#E63946", fontWeight: 600, marginBottom: 12 }}>The Founders</p>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', system-ui", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, color: "#FAFAFA", lineHeight: 1.1, marginBottom: 48 }}>The People Behind Lezzoo</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {FOUNDERS.map((f, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, padding: 32 }}>
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: "linear-gradient(135deg, #E63946, #C62833)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", fontWeight: 800, color: "#fff", marginBottom: 20, fontFamily: "'Plus Jakarta Sans', system-ui" }}>{f.name[0]}</div>
                  <h3 style={{ fontFamily: "'Plus Jakarta Sans', system-ui", fontSize: "1.2rem", fontWeight: 700, color: "#FAFAFA", marginBottom: 4 }}>{f.name}</h3>
                  <p style={{ fontSize: "0.8rem", color: "#E63946", fontWeight: 500, marginBottom: 16 }}>{f.role}</p>
                  <p style={{ color: "#888", fontSize: "0.9rem", lineHeight: 1.7, fontStyle: "italic" }}>&ldquo;{f.quote}&rdquo;</p>
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
