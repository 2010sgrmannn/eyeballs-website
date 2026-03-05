"use client";

import { useEffect, useRef, useCallback } from "react";

/* ─── Scroll-triggered fade-in hook ─── */
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08 }
    );
    el.querySelectorAll(".fade-in").forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, []);
  return ref;
}

/* ─── Smooth scroll handler ─── */
function scrollTo(id: string) {
  return (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
}

/* ═══════════════════════════════════════════════════════════════
   ICONS (inline SVG for zero dependencies)
   ═══════════════════════════════════════════════════════════════ */

const IconArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
);

const IconScrape = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <path d="M9 3v18M3 9h18" />
    <circle cx="15" cy="15" r="2" />
  </svg>
);

const IconAnalyze = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 20l4-4m0 0l3-8 4 4 4-8" />
    <circle cx="7" cy="16" r="2" />
    <path d="M18 4l2 2-2 2" />
  </svg>
);

const IconGenerate = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v4m0 14v-4M3 12h4m14 0h-4" />
    <path d="M5.6 5.6l2.8 2.8m7.2 7.2l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconBolt = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />
  </svg>
);

const IconEye = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconTarget = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const IconBrain = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a5 5 0 015 5c0 1.5-.5 2.5-1.5 3.5L12 14l-3.5-3.5C7.5 9.5 7 8.5 7 7a5 5 0 015-5z" />
    <path d="M8.5 14.5S7 16 7 18a5 5 0 0010 0c0-2-1.5-3.5-1.5-3.5" />
    <path d="M12 14v8" />
  </svg>
);

const IconLayers = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l10 6-10 6L2 8l10-6z" />
    <path d="M2 16l10 6 10-6" />
    <path d="M2 12l10 6 10-6" />
  </svg>
);

const IconShield = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l8 4v6c0 5.5-3.8 10-8 12-4.2-2-8-6.5-8-12V6l8-4z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const IconChart = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 20V10M12 20V4M6 20v-6" />
  </svg>
);

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════ */

export default function HomePage() {
  const pageRef = useFadeIn();

  return (
    <div ref={pageRef}>
      {/* ─── NAV ─── */}
      <nav className="nav">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "var(--accent)", display: "flex",
            alignItems: "center", justifyContent: "center",
          }}>
            <IconEye />
          </div>
          <span style={{
            fontFamily: "var(--font-heading)", fontWeight: 800,
            fontSize: 18, letterSpacing: "-0.02em",
          }}>
            EYEBALLS<span style={{ color: "var(--accent)" }}>.AI</span>
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <div style={{ display: "flex", gap: 28 }} className="nav-links">
            {["Features", "How it works", "Pricing"].map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={scrollTo(label.toLowerCase().replace(/\s+/g, "-"))}
                style={{
                  color: "var(--text-secondary)", textDecoration: "none",
                  fontSize: 14, fontWeight: 500,
                  transition: "color 0.2s var(--ease-out-expo)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
              >
                {label}
              </a>
            ))}
          </div>
          <a href="https://eyeballs-ai.vercel.app" className="btn-primary" style={{ padding: "10px 22px", fontSize: 13 }}>
            Get started <IconArrowRight />
          </a>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section style={{
        position: "relative", minHeight: "100vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center",
        padding: "140px clamp(24px, 8vw, 200px) 80px",
        overflow: "hidden",
      }}>
        {/* Ambient glows */}
        <div className="hero-glow" style={{
          width: 900, height: 900, top: -300, left: "50%",
          transform: "translateX(-50%)",
          background: "radial-gradient(circle, var(--accent-glow) 0%, transparent 65%)",
          animation: "floatGlow 8s ease-in-out infinite",
        }} />
        <div className="hero-glow" style={{
          width: 500, height: 500, bottom: -100, left: "10%",
          background: "radial-gradient(circle, var(--cta-glow) 0%, transparent 70%)",
          animation: "floatGlow2 10s ease-in-out infinite",
        }} />
        <div className="hero-glow" style={{
          width: 400, height: 400, top: "20%", right: "5%",
          background: "radial-gradient(circle, var(--info-glow) 0%, transparent 70%)",
          animation: "floatGlow 12s ease-in-out infinite 2s",
        }} />

        {/* Grid pattern background */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          mask: "radial-gradient(ellipse 60% 50% at 50% 50%, black 20%, transparent 70%)",
          WebkitMask: "radial-gradient(ellipse 60% 50% at 50% 50%, black 20%, transparent 70%)",
        }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: 900 }}>
          {/* Badge */}
          <div style={{
            animation: "badgePop 0.6s var(--ease-spring) 0.15s both",
            marginBottom: 32,
          }}>
            <span className="tag tag-accent" style={{ gap: 8 }}>
              <IconBolt /> Now in Beta
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: "var(--font-heading)", fontWeight: 800,
            fontSize: "clamp(44px, 7vw, 80px)",
            letterSpacing: "-0.035em", lineHeight: 1.05,
            animation: "heroFadeUp 0.8s var(--ease-out-expo) 0.25s both",
          }}>
            Turn viral content<br />
            into your next{" "}
            <span style={{
              fontFamily: "var(--font-accent)", fontStyle: "italic",
              fontWeight: 700, color: "var(--accent)",
            }}>
              script
            </span>
          </h1>

          {/* Subheading */}
          <p style={{
            fontFamily: "var(--font-body)", fontSize: "clamp(17px, 2.2vw, 21px)",
            color: "var(--text-secondary)", lineHeight: 1.65,
            maxWidth: 600, margin: "28px auto 0",
            animation: "heroFadeUp 0.8s var(--ease-out-expo) 0.4s both",
          }}>
            Stop guessing what works. Scrape top creators, analyze their winning patterns,
            and generate scripts that sound like{" "}
            <span style={{ color: "var(--text)", fontWeight: 600 }}>you</span> — not a robot.
          </p>

          {/* CTAs */}
          <div style={{
            display: "flex", gap: 16, justifyContent: "center",
            marginTop: 44, flexWrap: "wrap",
            animation: "heroFadeUp 0.8s var(--ease-out-expo) 0.55s both",
          }}>
            <a href="https://eyeballs-ai.vercel.app" className="btn-cta" style={{ fontSize: 16, padding: "16px 36px" }}>
              Start for free <IconArrowRight />
            </a>
            <a href="#how-it-works" onClick={scrollTo("how-it-works")} className="btn-ghost" style={{ fontSize: 16, padding: "16px 36px" }}>
              See how it works
            </a>
          </div>

          {/* Social proof line */}
          <p style={{
            fontFamily: "var(--font-mono)", fontSize: 12,
            color: "var(--text-muted)", letterSpacing: "1px",
            textTransform: "uppercase", marginTop: 32,
            animation: "heroFadeIn 1s var(--ease-out-expo) 0.8s both",
          }}>
            No credit card required &nbsp;·&nbsp; Free forever plan
          </p>
        </div>

        {/* Hero product mockup */}
        <div style={{
          position: "relative", zIndex: 2,
          marginTop: 72, width: "100%", maxWidth: 1000,
          animation: "heroFadeUp 1s var(--ease-out-expo) 0.7s both",
        }}>
          <div className="glow-border" style={{ borderRadius: 20 }}>
            <div className="mock-window">
              <div className="mock-titlebar">
                <div className="mock-dot" />
                <div className="mock-dot" />
                <div className="mock-dot" />
                <span style={{
                  fontFamily: "var(--font-mono)", fontSize: 12,
                  color: "var(--text-muted)", marginLeft: 8,
                }}>
                  eyeballs.ai/dashboard
                </span>
              </div>
              {/* Mock dashboard content */}
              <div style={{ padding: 24, display: "flex", gap: 16, minHeight: 340 }}>
                {/* Sidebar */}
                <div style={{
                  width: 200, background: "var(--surface-2)",
                  borderRadius: 12, padding: 16,
                  display: "flex", flexDirection: "column", gap: 6,
                }}>
                  {["Dashboard", "Scraper", "Library", "Canvas", "Scripts"].map((item, i) => (
                    <div key={item} style={{
                      padding: "10px 14px", borderRadius: 8,
                      fontSize: 13, fontWeight: i === 2 ? 600 : 400,
                      color: i === 2 ? "var(--text)" : "var(--text-muted)",
                      background: i === 2 ? "var(--accent-muted)" : "transparent",
                      borderLeft: i === 2 ? "2px solid var(--accent)" : "2px solid transparent",
                    }}>
                      {item}
                    </div>
                  ))}
                </div>

                {/* Content area */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
                  {/* Header */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{
                        fontFamily: "var(--font-heading)", fontSize: 18,
                        fontWeight: 700, letterSpacing: "-0.01em",
                      }}>
                        Content Library
                      </div>
                      <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>
                        147 pieces analyzed
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <span className="tag tag-accent" style={{ fontSize: 10 }}>Virality: 92</span>
                      <span className="tag tag-cta" style={{ fontSize: 10 }}>Hooks: 23</span>
                    </div>
                  </div>

                  {/* Content cards grid */}
                  <div style={{
                    display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
                    gap: 10, flex: 1,
                  }}>
                    {[87, 94, 76, 91, 82, 88, 95, 79].map((score, i) => (
                      <div key={i} style={{
                        background: "var(--surface-3)", borderRadius: 10,
                        aspectRatio: "9/14", position: "relative",
                        border: "1px solid var(--border)",
                        overflow: "hidden",
                      }}>
                        {/* Shimmer placeholder */}
                        <div style={{
                          position: "absolute", inset: 0,
                          background: `linear-gradient(135deg, var(--surface-2) 0%, var(--surface-3) 50%, var(--surface-2) 100%)`,
                          backgroundSize: "200% 200%",
                          animation: "shimmer 3s ease-in-out infinite",
                          animationDelay: `${i * 0.15}s`,
                        }} />
                        {/* Score badge */}
                        <div style={{
                          position: "absolute", top: 6, right: 6,
                          background: score >= 90 ? "var(--accent)" : "var(--surface-2)",
                          color: score >= 90 ? "#fff" : "var(--text-secondary)",
                          fontSize: 10, fontWeight: 700,
                          fontFamily: "var(--font-mono)",
                          padding: "3px 7px", borderRadius: 6,
                          border: score >= 90 ? "none" : "1px solid var(--border)",
                        }}>
                          {score}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TICKER ─── */}
      <div className="ticker-wrap">
        <div className="ticker">
          {[...Array(2)].map((_, set) => (
            <span key={set} style={{ display: "contents" }}>
              {[
                "Instagram", "TikTok", "LinkedIn", "Twitter",
                "Virality scoring", "Hook extraction", "Brand voice AI",
                "Script generation", "Content patterns", "Multi-model AI",
              ].map((t) => (
                <span key={`${set}-${t}`}>
                  {t} <span style={{ color: "var(--accent)", margin: "0 4px" }}>●</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ─── STATS BAR ─── */}
      <section className="section fade-in" style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 1,
        background: "var(--border)",
        borderRadius: 0,
        padding: "0 clamp(24px, 8vw, 200px)",
      }}>
        {[
          { number: "4", label: "Platforms supported", suffix: "" },
          { number: "100", label: "Virality score range", suffix: "pt" },
          { number: "5", label: "AI models available", suffix: "+" },
          { number: "∞", label: "Scripts you can generate", suffix: "" },
        ].map((stat, i) => (
          <div key={stat.label} className={`fade-in fade-in-delay-${i + 1}`} style={{
            background: "var(--surface)",
            padding: "48px 32px",
            textAlign: "center",
          }}>
            <div className="stat-number">
              {stat.number}<span style={{ fontSize: "0.5em", color: "var(--accent)" }}>{stat.suffix}</span>
            </div>
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: 11,
              textTransform: "uppercase", letterSpacing: "2px",
              color: "var(--text-muted)", marginTop: 12,
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="how-it-works" className="section" style={{ paddingTop: 120, paddingBottom: 120 }}>
        <div className="fade-in" style={{ textAlign: "center", marginBottom: 72 }}>
          <span className="tag tag-info" style={{ marginBottom: 20, display: "inline-flex" }}>How it works</span>
          <h2 style={{
            fontFamily: "var(--font-heading)", fontWeight: 800,
            fontSize: "clamp(32px, 5vw, 48px)",
            letterSpacing: "-0.025em", lineHeight: 1.1,
            marginTop: 20,
          }}>
            From inspiration to{" "}
            <span style={{ fontFamily: "var(--font-accent)", fontStyle: "italic", color: "var(--accent)" }}>
              creation
            </span>
            <br />in three steps
          </h2>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
          gap: 24, maxWidth: 1100, margin: "0 auto",
        }}>
          {[
            {
              step: "01",
              icon: <IconScrape />,
              title: "Scrape creators",
              desc: "Add any creator from Instagram, TikTok, LinkedIn, or Twitter. We download and analyze their top-performing content automatically.",
              color: "var(--accent)",
              glowColor: "rgba(255, 51, 51, 0.1)",
            },
            {
              step: "02",
              icon: <IconAnalyze />,
              title: "Analyze patterns",
              desc: "AI extracts virality scores, hooks, CTAs, emotional triggers, and engagement patterns. See exactly why content goes viral.",
              color: "var(--info)",
              glowColor: "rgba(71, 212, 255, 0.1)",
            },
            {
              step: "03",
              icon: <IconGenerate />,
              title: "Generate scripts",
              desc: "Choose your AI model, connect your brand voice, and generate scripts that sound like you — powered by proven winning patterns.",
              color: "var(--cta)",
              glowColor: "rgba(0, 232, 122, 0.1)",
            },
          ].map((item, i) => (
            <div
              key={item.step}
              className={`card fade-in fade-in-delay-${i + 1}`}
              style={{ position: "relative", overflow: "hidden" }}
            >
              {/* Top glow */}
              <div style={{
                position: "absolute", top: -60, left: "50%",
                transform: "translateX(-50%)",
                width: 200, height: 120, borderRadius: "50%",
                background: `radial-gradient(circle, ${item.glowColor} 0%, transparent 70%)`,
                filter: "blur(30px)", pointerEvents: "none",
              }} />

              <div style={{ position: "relative" }}>
                <div style={{
                  display: "flex", alignItems: "center",
                  justifyContent: "space-between", marginBottom: 28,
                }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 14,
                    background: item.glowColor, border: `1px solid ${item.color}30`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: item.color,
                  }}>
                    {item.icon}
                  </div>
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: 48,
                    fontWeight: 800, color: "var(--surface-3)",
                    lineHeight: 1, letterSpacing: "-0.04em",
                  }}>
                    {item.step}
                  </span>
                </div>

                <h3 style={{
                  fontFamily: "var(--font-heading)", fontWeight: 700,
                  fontSize: 22, letterSpacing: "-0.01em", marginBottom: 12,
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: 15, color: "var(--text-secondary)",
                  lineHeight: 1.65,
                }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section id="features" className="section" style={{ paddingTop: 40 }}>
        <div className="fade-in" style={{ textAlign: "center", marginBottom: 72 }}>
          <span className="tag tag-accent" style={{ marginBottom: 20, display: "inline-flex" }}>Features</span>
          <h2 style={{
            fontFamily: "var(--font-heading)", fontWeight: 800,
            fontSize: "clamp(32px, 5vw, 48px)",
            letterSpacing: "-0.025em", lineHeight: 1.1,
            marginTop: 20,
          }}>
            Everything you need to{" "}
            <span style={{ fontFamily: "var(--font-accent)", fontStyle: "italic", color: "var(--accent)" }}>
              dominate
            </span>
          </h2>
          <p style={{
            fontSize: 17, color: "var(--text-secondary)",
            maxWidth: 500, margin: "20px auto 0", lineHeight: 1.6,
          }}>
            A complete content intelligence platform built for creators who take their craft seriously.
          </p>
        </div>

        <div className="feature-grid fade-in" style={{ maxWidth: 1100, margin: "0 auto" }}>
          {[
            {
              icon: <IconTarget />,
              title: "Virality scoring",
              desc: "AI-calculated 0-100 score for every piece of content. Know exactly what performs before you create.",
            },
            {
              icon: <IconEye />,
              title: "Hook extraction",
              desc: "Automatically identifies opening hooks that grab attention. Build a library of proven openers.",
            },
            {
              icon: <IconBrain />,
              title: "Brand voice AI",
              desc: "Deep profile analysis captures your tone, values, and style. Scripts sound like you — never generic.",
            },
            {
              icon: <IconLayers />,
              title: "Visual canvas builder",
              desc: "Node-based script planner. Connect backstories, products, and reference content into one workflow.",
            },
            {
              icon: <IconChart />,
              title: "Engagement analytics",
              desc: "Views, likes, comments, shares, and engagement ratios for every scraped piece of content.",
            },
            {
              icon: <IconShield />,
              title: "Multi-model generation",
              desc: "Choose Claude, GPT-4o, o3, or Gemini. Pick the best model for your script style and budget.",
            },
          ].map((feature) => (
            <div key={feature.title} className="feature-card">
              <div style={{ color: "var(--accent)", marginBottom: 20 }}>
                {feature.icon}
              </div>
              <h4 style={{
                fontFamily: "var(--font-heading)", fontWeight: 700,
                fontSize: 17, marginBottom: 10, letterSpacing: "-0.01em",
              }}>
                {feature.title}
              </h4>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── PRODUCT SHOWCASE: SCRAPER ─── */}
      <section className="section" style={{ paddingTop: 120 }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: 64, alignItems: "center", maxWidth: 1100, margin: "0 auto",
        }}>
          <div className="fade-in">
            <span className="tag tag-cta" style={{ marginBottom: 20, display: "inline-flex" }}>Creator Scraper</span>
            <h2 style={{
              fontFamily: "var(--font-heading)", fontWeight: 800,
              fontSize: "clamp(28px, 4vw, 40px)",
              letterSpacing: "-0.02em", lineHeight: 1.15,
              marginTop: 20,
            }}>
              Add any creator.
              <br />
              <span style={{ color: "var(--text-secondary)" }}>
                Get their playbook.
              </span>
            </h2>
            <p style={{
              fontSize: 16, color: "var(--text-secondary)",
              lineHeight: 1.65, marginTop: 20, maxWidth: 440,
            }}>
              Drop in a handle from Instagram, TikTok, LinkedIn, or Twitter.
              We scrape their last 7, 30, or 60 posts and run full AI analysis
              on every single piece — hooks, CTAs, virality patterns, engagement
              metrics, content classification.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
              {["Instagram", "TikTok", "LinkedIn", "Twitter"].map((p) => (
                <span key={p} className="tag" style={{ fontSize: 10 }}>{p}</span>
              ))}
            </div>
          </div>

          <div className="fade-in fade-in-delay-2">
            <div className="glow-border glow-border-subtle">
              <div className="mock-window">
                <div className="mock-titlebar">
                  <div className="mock-dot" />
                  <div className="mock-dot" />
                  <div className="mock-dot" />
                </div>
                <div style={{ padding: 20 }}>
                  {/* Creator card mock */}
                  <div style={{
                    display: "flex", alignItems: "center", gap: 14,
                    padding: 16, background: "var(--surface-2)",
                    borderRadius: 12, marginBottom: 12,
                  }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: "50%",
                      background: "linear-gradient(135deg, var(--accent) 0%, #ff6644 100%)",
                    }} />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>@garyvee</div>
                      <div style={{ fontSize: 12, color: "var(--text-muted)" }}>2.3M followers · Instagram</div>
                    </div>
                    <span className="tag tag-cta" style={{ marginLeft: "auto", fontSize: 9, padding: "4px 10px" }}>
                      Scraping...
                    </span>
                  </div>

                  {/* Progress bars */}
                  {[
                    { label: "Posts scraped", value: "24/30", pct: 80 },
                    { label: "Analyzed", value: "18/24", pct: 75 },
                  ].map((bar) => (
                    <div key={bar.label} style={{ marginBottom: 12 }}>
                      <div style={{
                        display: "flex", justifyContent: "space-between",
                        fontSize: 12, color: "var(--text-muted)", marginBottom: 6,
                      }}>
                        <span>{bar.label}</span>
                        <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>
                          {bar.value}
                        </span>
                      </div>
                      <div style={{
                        height: 4, borderRadius: 2,
                        background: "var(--surface-3)",
                      }}>
                        <div style={{
                          height: "100%", borderRadius: 2,
                          width: `${bar.pct}%`,
                          background: "var(--cta)",
                          transition: "width 0.5s var(--ease-out-expo)",
                        }} />
                      </div>
                    </div>
                  ))}

                  {/* Mini content grid */}
                  <div style={{
                    display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 6, marginTop: 16,
                  }}>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} style={{
                        aspectRatio: "9/14", borderRadius: 8,
                        background: "var(--surface-3)",
                        border: "1px solid var(--border)",
                        position: "relative", overflow: "hidden",
                      }}>
                        <div style={{
                          position: "absolute", inset: 0,
                          background: `linear-gradient(135deg, var(--surface-2), var(--surface-3))`,
                          backgroundSize: "200% 200%",
                          animation: "shimmer 2.5s ease-in-out infinite",
                          animationDelay: `${i * 0.2}s`,
                        }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PRODUCT SHOWCASE: LIBRARY ─── */}
      <section className="section" style={{ paddingTop: 120 }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: 64, alignItems: "center", maxWidth: 1100, margin: "0 auto",
        }}>
          {/* Reversed order for visual flow */}
          <div className="fade-in">
            <div className="mock-window" style={{ border: "1px solid var(--border)" }}>
              <div className="mock-titlebar">
                <div className="mock-dot" />
                <div className="mock-dot" />
                <div className="mock-dot" />
              </div>
              <div style={{ padding: 20 }}>
                {/* Filter bar */}
                <div style={{
                  display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap",
                }}>
                  {["All", "Reels", "Carousel", "90+ Score"].map((f, i) => (
                    <span key={f} className={i === 0 ? "tag tag-accent" : "tag"} style={{
                      fontSize: 9, padding: "4px 10px",
                    }}>
                      {f}
                    </span>
                  ))}
                </div>

                {/* Content list */}
                {[
                  { hook: "\"Stop doing this if you want to grow...\"", score: 94, type: "Reel", creator: "@garyvee" },
                  { hook: "\"The 3-second rule nobody talks about\"", score: 91, type: "Reel", creator: "@hormozi" },
                  { hook: "\"I made $10K in 7 days. Here's how.\"", score: 88, type: "Carousel", creator: "@codie" },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 14,
                    padding: "14px 16px", borderRadius: 10,
                    background: i === 0 ? "var(--surface-2)" : "transparent",
                    border: "1px solid",
                    borderColor: i === 0 ? "var(--border-hover)" : "var(--border)",
                    marginBottom: 8,
                    transition: "background 0.2s",
                  }}>
                    <div style={{
                      fontFamily: "var(--font-mono)", fontSize: 14,
                      fontWeight: 700,
                      color: item.score >= 90 ? "var(--accent)" : "var(--text-secondary)",
                      minWidth: 28,
                    }}>
                      {item.score}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.3 }}>{item.hook}</div>
                      <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>
                        {item.creator} · {item.type}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="fade-in fade-in-delay-2">
            <span className="tag tag-info" style={{ marginBottom: 20, display: "inline-flex" }}>Content Library</span>
            <h2 style={{
              fontFamily: "var(--font-heading)", fontWeight: 800,
              fontSize: "clamp(28px, 4vw, 40px)",
              letterSpacing: "-0.02em", lineHeight: 1.15,
              marginTop: 20,
            }}>
              Every hook.
              <br />
              <span style={{ color: "var(--text-secondary)" }}>
                Every pattern. Ranked.
              </span>
            </h2>
            <p style={{
              fontSize: 16, color: "var(--text-secondary)",
              lineHeight: 1.65, marginTop: 20, maxWidth: 440,
            }}>
              Filter by virality score, hook type, platform, niche, emotion,
              engagement ratio — or any combination. Sort by what matters.
              Save the best to collections. Build your swipe file on autopilot.
            </p>
            <ul style={{
              marginTop: 24, listStyle: "none",
              display: "flex", flexDirection: "column", gap: 10,
            }}>
              {[
                "AI-extracted hooks and CTAs",
                "Virality scoring (0-100)",
                "Smart filtering by 12+ dimensions",
                "Custom collections and folders",
              ].map((item) => (
                <li key={item} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  fontSize: 14, color: "var(--text-secondary)",
                }}>
                  <span style={{
                    width: 6, height: 6, borderRadius: "50%",
                    background: "var(--info)", flexShrink: 0,
                  }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── PRODUCT SHOWCASE: CANVAS ─── */}
      <section className="section" style={{ paddingTop: 120 }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: 64, alignItems: "center", maxWidth: 1100, margin: "0 auto",
        }}>
          <div className="fade-in">
            <span className="tag" style={{ marginBottom: 20, display: "inline-flex" }}>Canvas Builder</span>
            <h2 style={{
              fontFamily: "var(--font-heading)", fontWeight: 800,
              fontSize: "clamp(28px, 4vw, 40px)",
              letterSpacing: "-0.02em", lineHeight: 1.15,
              marginTop: 20,
            }}>
              Your content{" "}
              <span style={{ fontFamily: "var(--font-accent)", fontStyle: "italic", color: "var(--accent)" }}>
                war room
              </span>
            </h2>
            <p style={{
              fontSize: 16, color: "var(--text-secondary)",
              lineHeight: 1.65, marginTop: 20, maxWidth: 440,
            }}>
              Drag in your backstory, products, reference content, and YouTube
              videos. Connect them to an AI chat node. Generate scripts with
              full context — not a blank prompt.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
              {["Claude Opus 4", "GPT-4o", "o3", "Gemini 2.5 Pro"].map((m) => (
                <span key={m} className="tag" style={{ fontSize: 10 }}>{m}</span>
              ))}
            </div>
          </div>

          <div className="fade-in fade-in-delay-2">
            <div className="mock-window" style={{ border: "1px solid var(--border)" }}>
              <div className="mock-titlebar">
                <div className="mock-dot" />
                <div className="mock-dot" />
                <div className="mock-dot" />
              </div>
              <div style={{ padding: 24, minHeight: 300, position: "relative" }}>
                {/* Canvas nodes mockup */}
                <svg width="100%" height="240" viewBox="0 0 400 240" fill="none" style={{ position: "absolute", top: 24, left: 0, pointerEvents: "none" }}>
                  {/* Connection lines */}
                  <path d="M120 60 Q200 60 200 120" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />
                  <path d="M120 180 Q200 180 200 140" stroke="var(--cta)" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />
                  <path d="M240 120 L310 80" stroke="var(--info)" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />
                </svg>

                {/* Nodes */}
                {[
                  { label: "Backstory", x: 16, y: 28, color: "var(--accent)", icon: "B" },
                  { label: "Products", x: 16, y: 148, color: "var(--cta)", icon: "P" },
                  { label: "AI Chat", x: 150, y: 88, color: "var(--info)", icon: "AI", large: true },
                  { label: "Script Output", x: 280, y: 48, color: "var(--text-secondary)", icon: "S" },
                ].map((node) => (
                  <div key={node.label} style={{
                    position: "absolute", left: node.x, top: node.y + 24,
                    background: "var(--surface-2)", border: "1px solid var(--border)",
                    borderRadius: 12, padding: node.large ? "16px 20px" : "12px 16px",
                    display: "flex", alignItems: "center", gap: 10,
                    minWidth: node.large ? 100 : 80,
                  }}>
                    <div style={{
                      width: node.large ? 32 : 24, height: node.large ? 32 : 24,
                      borderRadius: 8, display: "flex",
                      alignItems: "center", justifyContent: "center",
                      fontSize: node.large ? 12 : 10, fontWeight: 700,
                      fontFamily: "var(--font-mono)",
                      background: `${node.color}18`, color: node.color,
                      border: `1px solid ${node.color}30`,
                    }}>
                      {node.icon}
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 500, whiteSpace: "nowrap" }}>
                      {node.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BRAND VOICE SECTION ─── */}
      <section className="section" style={{ paddingTop: 120, paddingBottom: 120 }}>
        <div className="fade-in" style={{ textAlign: "center", marginBottom: 72 }}>
          <span className="tag tag-cta" style={{ marginBottom: 20, display: "inline-flex" }}>Brand Voice AI</span>
          <h2 style={{
            fontFamily: "var(--font-heading)", fontWeight: 800,
            fontSize: "clamp(32px, 5vw, 48px)",
            letterSpacing: "-0.025em", lineHeight: 1.1,
            marginTop: 20,
          }}>
            Scripts that sound like{" "}
            <span style={{ fontFamily: "var(--font-accent)", fontStyle: "italic", color: "var(--cta)" }}>
              you
            </span>
          </h2>
          <p style={{
            fontSize: 17, color: "var(--text-secondary)",
            maxWidth: 550, margin: "20px auto 0", lineHeight: 1.6,
          }}>
            We analyze your Instagram to extract your tone, values, archetype, and
            content pillars. Every script generated is filtered through your unique voice.
          </p>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16, maxWidth: 1100, margin: "0 auto",
        }}>
          {[
            {
              label: "Tone",
              values: ["Direct", "Witty", "Authoritative"],
              color: "var(--accent)",
            },
            {
              label: "Archetype",
              values: ["The Outlaw", "65% rebel", "35% sage"],
              color: "var(--info)",
            },
            {
              label: "Pillars",
              values: ["Growth", "Strategy", "Mindset"],
              color: "var(--cta)",
            },
            {
              label: "Format",
              values: ["Talking head", "Voiceover", "Text overlay"],
              color: "var(--warning)",
            },
          ].map((item, i) => (
            <div key={item.label} className={`card fade-in fade-in-delay-${i + 1}`} style={{
              textAlign: "center", padding: "32px 20px",
            }}>
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: 11,
                textTransform: "uppercase", letterSpacing: "2px",
                color: item.color, marginBottom: 16,
              }}>
                {item.label}
              </div>
              <div style={{
                display: "flex", flexDirection: "column",
                gap: 8, alignItems: "center",
              }}>
                {item.values.map((v) => (
                  <span key={v} style={{
                    fontSize: 14, fontWeight: 500,
                    color: "var(--text-secondary)",
                    padding: "6px 14px", borderRadius: 8,
                    background: "var(--surface-2)",
                  }}>
                    {v}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section id="pricing" className="section" style={{
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        paddingTop: 100, paddingBottom: 100,
      }}>
        <div className="fade-in" style={{ textAlign: "center", marginBottom: 64 }}>
          <span className="tag" style={{ marginBottom: 20, display: "inline-flex" }}>Pricing</span>
          <h2 style={{
            fontFamily: "var(--font-heading)", fontWeight: 800,
            fontSize: "clamp(32px, 5vw, 48px)",
            letterSpacing: "-0.025em", lineHeight: 1.1,
            marginTop: 20,
          }}>
            Start free.{" "}
            <span style={{ color: "var(--text-secondary)" }}>Scale when ready.</span>
          </h2>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20, maxWidth: 1000, margin: "0 auto",
        }}>
          {/* Free */}
          <div className="card fade-in fade-in-delay-1" style={{ display: "flex", flexDirection: "column" }}>
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: 11,
              textTransform: "uppercase", letterSpacing: "2px",
              color: "var(--text-muted)", marginBottom: 12,
            }}>
              Starter
            </div>
            <div style={{
              fontFamily: "var(--font-heading)", fontSize: 44,
              fontWeight: 800, letterSpacing: "-0.03em",
            }}>
              $0
              <span style={{ fontSize: 16, fontWeight: 400, color: "var(--text-muted)" }}>/mo</span>
            </div>
            <p style={{ fontSize: 14, color: "var(--text-secondary)", marginTop: 8, marginBottom: 28 }}>
              Perfect for getting started
            </p>
            <ul style={{
              listStyle: "none", display: "flex",
              flexDirection: "column", gap: 12, flex: 1,
            }}>
              {[
                "3 creator scrapes",
                "50 content analyses",
                "10 script generations",
                "1 AI model (Claude)",
              ].map((f) => (
                <li key={f} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  fontSize: 14, color: "var(--text-secondary)",
                }}>
                  <span style={{ color: "var(--cta)", fontSize: 14 }}>&#10003;</span> {f}
                </li>
              ))}
            </ul>
            <a href="https://eyeballs-ai.vercel.app" className="btn-ghost" style={{ marginTop: 28, width: "100%", textAlign: "center" }}>
              Get started
            </a>
          </div>

          {/* Pro */}
          <div className="fade-in fade-in-delay-2">
            <div className="glow-border">
              <div className="card" style={{
                display: "flex", flexDirection: "column",
                background: "var(--surface-2)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: 11,
                    textTransform: "uppercase", letterSpacing: "2px",
                    color: "var(--accent)",
                  }}>
                    Pro
                  </span>
                  <span style={{
                    fontSize: 10, fontFamily: "var(--font-mono)",
                    textTransform: "uppercase", letterSpacing: "1px",
                    background: "var(--accent)", color: "#fff",
                    padding: "3px 8px", borderRadius: 4, fontWeight: 600,
                  }}>
                    Popular
                  </span>
                </div>
                <div style={{
                  fontFamily: "var(--font-heading)", fontSize: 44,
                  fontWeight: 800, letterSpacing: "-0.03em",
                }}>
                  $29
                  <span style={{ fontSize: 16, fontWeight: 400, color: "var(--text-muted)" }}>/mo</span>
                </div>
                <p style={{ fontSize: 14, color: "var(--text-secondary)", marginTop: 8, marginBottom: 28 }}>
                  For serious creators
                </p>
                <ul style={{
                  listStyle: "none", display: "flex",
                  flexDirection: "column", gap: 12, flex: 1,
                }}>
                  {[
                    "Unlimited scrapes",
                    "Unlimited analyses",
                    "Unlimited scripts",
                    "All 5 AI models",
                    "Canvas builder",
                    "Priority support",
                  ].map((f) => (
                    <li key={f} style={{
                      display: "flex", alignItems: "center", gap: 10,
                      fontSize: 14, color: "var(--text-secondary)",
                    }}>
                      <span style={{ color: "var(--cta)", fontSize: 14 }}>&#10003;</span> {f}
                    </li>
                  ))}
                </ul>
                <a href="https://eyeballs-ai.vercel.app" className="btn-cta" style={{ marginTop: 28, width: "100%", textAlign: "center" }}>
                  Start free trial <IconArrowRight />
                </a>
              </div>
            </div>
          </div>

          {/* Team */}
          <div className="card fade-in fade-in-delay-3" style={{ display: "flex", flexDirection: "column" }}>
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: 11,
              textTransform: "uppercase", letterSpacing: "2px",
              color: "var(--text-muted)", marginBottom: 12,
            }}>
              Agency
            </div>
            <div style={{
              fontFamily: "var(--font-heading)", fontSize: 44,
              fontWeight: 800, letterSpacing: "-0.03em",
            }}>
              $99
              <span style={{ fontSize: 16, fontWeight: 400, color: "var(--text-muted)" }}>/mo</span>
            </div>
            <p style={{ fontSize: 14, color: "var(--text-secondary)", marginTop: 8, marginBottom: 28 }}>
              For teams and agencies
            </p>
            <ul style={{
              listStyle: "none", display: "flex",
              flexDirection: "column", gap: 12, flex: 1,
            }}>
              {[
                "Everything in Pro",
                "5 team members",
                "Shared content library",
                "Brand profiles per client",
                "API access",
                "Dedicated support",
              ].map((f) => (
                <li key={f} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  fontSize: 14, color: "var(--text-secondary)",
                }}>
                  <span style={{ color: "var(--cta)", fontSize: 14 }}>&#10003;</span> {f}
                </li>
              ))}
            </ul>
            <a href="https://eyeballs-ai.vercel.app" className="btn-ghost" style={{ marginTop: 28, width: "100%", textAlign: "center" }}>
              Contact us
            </a>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="section" style={{
        textAlign: "center", paddingTop: 120, paddingBottom: 120,
        position: "relative", overflow: "hidden",
      }}>
        {/* Background glows */}
        <div className="hero-glow" style={{
          width: 600, height: 600,
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, var(--accent-glow) 0%, transparent 60%)",
          animation: "floatGlow 6s ease-in-out infinite",
          filter: "blur(60px)",
        }} />

        <div className="fade-in" style={{ position: "relative", zIndex: 2 }}>
          <h2 style={{
            fontFamily: "var(--font-heading)", fontWeight: 800,
            fontSize: "clamp(36px, 6vw, 56px)",
            letterSpacing: "-0.03em", lineHeight: 1.1,
            marginBottom: 24,
          }}>
            Stop guessing.
            <br />
            Start{" "}
            <span style={{ fontFamily: "var(--font-accent)", fontStyle: "italic", color: "var(--accent)" }}>
              creating
            </span>.
          </h2>
          <p style={{
            fontSize: 18, color: "var(--text-secondary)",
            maxWidth: 500, margin: "0 auto 40px", lineHeight: 1.6,
          }}>
            Join creators who use data-driven intelligence to produce
            content that actually performs.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://eyeballs-ai.vercel.app" className="btn-cta" style={{ fontSize: 17, padding: "18px 42px" }}>
              Get started for free <IconArrowRight />
            </a>
          </div>
          <p style={{
            fontFamily: "var(--font-mono)", fontSize: 12,
            color: "var(--text-muted)", letterSpacing: "1px",
            textTransform: "uppercase", marginTop: 24,
          }}>
            Free forever &nbsp;·&nbsp; No credit card &nbsp;·&nbsp; Setup in 2 minutes
          </p>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{
        borderTop: "1px solid var(--border)",
        padding: "48px clamp(24px, 8vw, 200px)",
        display: "flex", justifyContent: "space-between",
        alignItems: "center", flexWrap: "wrap", gap: 20,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 7,
            background: "var(--accent)", display: "flex",
            alignItems: "center", justifyContent: "center",
          }}>
            <IconEye />
          </div>
          <span style={{
            fontFamily: "var(--font-heading)", fontWeight: 700,
            fontSize: 15, letterSpacing: "-0.01em",
          }}>
            EYEBALLS<span style={{ color: "var(--accent)" }}>.AI</span>
          </span>
        </div>

        <div style={{ display: "flex", gap: 28 }}>
          {[
            { label: "Brand Guide", href: "https://eyeballs-brand-guide.vercel.app" },
            { label: "App", href: "https://eyeballs-ai.vercel.app" },
          ].map((link) => (
            <a key={link.label} href={link.href} style={{
              fontSize: 13, color: "var(--text-muted)",
              textDecoration: "none",
              transition: "color 0.2s var(--ease-out-expo)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              {link.label}
            </a>
          ))}
        </div>

        <span style={{
          fontFamily: "var(--font-mono)", fontSize: 11,
          color: "var(--text-muted)", letterSpacing: "1px",
        }}>
          &copy; 2025 EYEBALLS.AI
        </span>
      </footer>

      {/* ─── RESPONSIVE OVERRIDES (via inline style tag) ─── */}
      <style>{`
        @media (max-width: 900px) {
          .nav-links { display: none !important; }
          section [style*="grid-template-columns: repeat(4"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          section [style*="grid-template-columns: repeat(3"] {
            grid-template-columns: 1fr !important;
          }
          section [style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 600px) {
          section [style*="grid-template-columns: repeat(4"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
