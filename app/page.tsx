"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import Lenis from "lenis";

/* ═══════════════════════════════════════════════════════════════
   ANIMATION CONFIG — Dhruv's approach: explicit easing everywhere
   ═══════════════════════════════════════════════════════════════ */

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;
const EASE_SMOOTH = [0.25, 0.1, 0.25, 1] as const;

/* ─── Lenis Smooth Scroll Provider ─── */
function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);
}

/* ─── Mouse Parallax Hook (Dhruv's useMouseParallax) ─── */
function useMouseParallax(strength = 15, invert = false) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(y, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      const mult = invert ? -1 : 1;
      x.set(nx * strength * mult);
      y.set(ny * strength * mult);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [strength, invert, x, y]);

  return { x: smoothX, y: smoothY };
}

/* ─── Blur Reveal Animation (Dhruv tip #5) ─── */
function BlurReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, filter: "blur(12px)", y: 30 }}
      animate={isInView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: EASE_OUT_EXPO }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Clip Reveal Text (Dhruv tip: text slides up from overflow-hidden) ─── */
function ClipRevealText({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "h1" | "h2" | "h3" | "div" | "span" | "p";
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  return (
    <span ref={ref} className="clip-reveal">
      <motion.span
        style={{ display: "block" }}
        initial={{ y: "110%" }}
        animate={isInView ? { y: "0%" } : {}}
        transition={{ duration: 0.7, delay, ease: EASE_SMOOTH }}
      >
        <Tag className={className}>{children}</Tag>
      </motion.span>
    </span>
  );
}

/* ─── Word-by-Word Staggered Reveal (Dhruv's slide_transitions) ─── */
function WordReveal({
  text,
  delay = 0,
  className = "",
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  const words = text.split(" ");
  return (
    <span ref={ref} className={className} style={{ display: "flex", flexWrap: "wrap", gap: "0 0.3em" }}>
      {words.map((word, i) => (
        <span key={i} style={{ overflow: "hidden", display: "inline-block" }}>
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "110%", opacity: 0 }}
            animate={isInView ? { y: "0%", opacity: 1 } : {}}
            transition={{
              duration: 0.55,
              delay: delay + i * 0.04,
              ease: EASE_SMOOTH,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ICONS (inline SVG)
   ═══════════════════════════════════════════════════════════════ */

const IconArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
);

const IconEye = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconBolt = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />
  </svg>
);

const IconScrape = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="3" /><path d="M9 3v18M3 9h18" /><circle cx="15" cy="15" r="2" />
  </svg>
);

const IconAnalyze = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 20l4-4m0 0l3-8 4 4 4-8" /><circle cx="7" cy="16" r="2" /><path d="M18 4l2 2-2 2" />
  </svg>
);

const IconGenerate = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v4m0 14v-4M3 12h4m14 0h-4" /><path d="M5.6 5.6l2.8 2.8m7.2 7.2l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" /><circle cx="12" cy="12" r="3" />
  </svg>
);

const IconTarget = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
  </svg>
);

const IconBrain = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a5 5 0 015 5c0 1.5-.5 2.5-1.5 3.5L12 14l-3.5-3.5C7.5 9.5 7 8.5 7 7a5 5 0 015-5z" /><path d="M8.5 14.5S7 16 7 18a5 5 0 0010 0c0-2-1.5-3.5-1.5-3.5" /><path d="M12 14v8" />
  </svg>
);

const IconLayers = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l10 6-10 6L2 8l10-6z" /><path d="M2 16l10 6 10-6" /><path d="M2 12l10 6 10-6" />
  </svg>
);

const IconShield = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l8 4v6c0 5.5-3.8 10-8 12-4.2-2-8-6.5-8-12V6l8-4z" /><path d="M9 12l2 2 4-4" />
  </svg>
);

const IconChart = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 20V10M12 20V4M6 20v-6" />
  </svg>
);

/* ═══════════════════════════════════════════════════════════════
   STICKY SCROLL "HOW IT WORKS" (Dhruv's IntroBlackBox pattern)
   ═══════════════════════════════════════════════════════════════ */

const STEPS = [
  {
    step: "01",
    icon: <IconScrape />,
    title: "Scrape creators",
    desc: "Add any creator from Instagram, TikTok, LinkedIn, or Twitter. We download and analyze their top-performing content automatically.",
    color: "#ff3333",
  },
  {
    step: "02",
    icon: <IconAnalyze />,
    title: "Analyze patterns",
    desc: "AI extracts virality scores, hooks, CTAs, emotional triggers, and engagement patterns. See exactly why content goes viral.",
    color: "#47d4ff",
  },
  {
    step: "03",
    icon: <IconGenerate />,
    title: "Generate scripts",
    desc: "Choose your AI model, connect your brand voice, and generate scripts that sound like you — powered by proven winning patterns.",
    color: "#00e87a",
  },
];

function StickyScrollSteps() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const activeIndex = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [0, 0, 1, 2]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    return activeIndex.on("change", (v) => setCurrent(Math.round(v)));
  }, [activeIndex]);

  return (
    <section
      ref={containerRef}
      id="how-it-works"
      style={{ height: "300vh", position: "relative" }}
    >
      <div style={{
        position: "sticky", top: 0, height: "100vh",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "0 clamp(24px, 8vw, 200px)",
      }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: 64, maxWidth: 1100, width: "100%", alignItems: "center",
        }}>
          {/* Left: text content */}
          <div>
            <motion.span
              className="tag tag-info"
              initial={{ opacity: 0, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ marginBottom: 24, display: "inline-flex" }}
            >
              How it works
            </motion.span>
            <h2 style={{
              fontFamily: "var(--font-heading)", fontWeight: 800,
              fontSize: "clamp(32px, 5vw, 48px)",
              letterSpacing: "-0.04em", lineHeight: 1.05,
              marginTop: 24,
            }}>
              From inspiration to{" "}
              <span style={{ fontFamily: "var(--font-accent)", fontStyle: "italic", color: "var(--accent)" }}>
                creation
              </span>
            </h2>

            {/* Step indicators */}
            <div style={{ display: "flex", gap: 12, marginTop: 40 }}>
              {STEPS.map((s, i) => (
                <motion.div
                  key={s.step}
                  animate={{
                    background: current === i ? s.color : "var(--surface-2)",
                    scale: current === i ? 1 : 0.85,
                  }}
                  transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                  style={{
                    width: current === i ? 40 : 10, height: 10,
                    borderRadius: 5,
                    transition: "width 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right: sticky card that swaps content */}
          <div style={{ position: "relative", perspective: 1000 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                className="card"
                style={{
                  background: "var(--surface)",
                  padding: 40, minHeight: 320,
                  position: "relative", overflow: "hidden",
                }}
                initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -30, filter: "blur(6px)" }}
                transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
              >
                {/* Top glow */}
                <div style={{
                  position: "absolute", top: -40, left: "50%", transform: "translateX(-50%)",
                  width: 200, height: 100, borderRadius: "50%",
                  background: `radial-gradient(circle, ${STEPS[current].color}20 0%, transparent 70%)`,
                  filter: "blur(20px)", pointerEvents: "none",
                }} />

                <div style={{ position: "relative" }}>
                  <div style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    marginBottom: 28,
                  }}>
                    <div style={{
                      width: 52, height: 52, borderRadius: 14,
                      background: `${STEPS[current].color}15`,
                      border: `1px solid ${STEPS[current].color}30`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: STEPS[current].color,
                    }}>
                      {STEPS[current].icon}
                    </div>
                    <span style={{
                      fontFamily: "var(--font-mono)", fontSize: 56,
                      fontWeight: 800, color: "var(--surface-3)",
                      lineHeight: 1, letterSpacing: "-0.05em",
                    }}>
                      {STEPS[current].step}
                    </span>
                  </div>

                  <h3 style={{
                    fontFamily: "var(--font-heading)", fontWeight: 700,
                    fontSize: 24, letterSpacing: "-0.02em", marginBottom: 14,
                  }}>
                    {STEPS[current].title}
                  </h3>
                  <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.7 }}>
                    {STEPS[current].desc}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════ */

export default function HomePage() {
  useLenis();

  // Mouse parallax for hero orbs
  const heroMouse = useMouseParallax(20, true);
  const heroMouse2 = useMouseParallax(12, false);

  // Scroll-linked parallax for hero section
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(heroScroll, [0, 1], [1, 0.92]);
  const heroY = useTransform(heroScroll, [0, 1], [0, 150]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  return (
    <div>
      {/* ─── NAV (blur reveal per item) ─── */}
      <nav className="nav">
        <motion.div
          initial={{ opacity: 0, filter: "blur(8px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE_SMOOTH }}
          style={{ display: "flex", alignItems: "center", gap: 10 }}
        >
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "var(--accent)", display: "flex",
            alignItems: "center", justifyContent: "center",
          }}>
            <IconEye />
          </div>
          <span style={{
            fontFamily: "var(--font-heading)", fontWeight: 800,
            fontSize: 18, letterSpacing: "-0.03em",
          }}>
            EYEBALLS<span style={{ color: "var(--accent)" }}>.AI</span>
          </span>
        </motion.div>

        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <div style={{ display: "flex", gap: 28 }} className="nav-links">
            {["Features", "How it works", "Pricing"].map((label, i) => (
              <motion.a
                key={label}
                href={`#${label.toLowerCase().replace(/\s+/g, "-")}`}
                initial={{ opacity: 0, filter: "blur(8px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.9, delay: 0.2 + i * 0.1, ease: EASE_SMOOTH }}
                style={{
                  color: "var(--text-secondary)", textDecoration: "none",
                  fontSize: 14, fontWeight: 500, letterSpacing: "-0.01em",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
              >
                {label}
              </motion.a>
            ))}
          </div>
          <motion.a
            href="https://eyeballs-ai.vercel.app"
            className="btn-primary"
            style={{ padding: "10px 22px", fontSize: 13 }}
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.5, ease: EASE_SMOOTH }}
          >
            Get started <IconArrowRight />
          </motion.a>
        </div>
      </nav>

      {/* ─── HERO (scroll-linked scale + parallax) ─── */}
      <section ref={heroRef} style={{
        position: "relative", minHeight: "100vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center",
        padding: "140px clamp(24px, 8vw, 200px) 80px",
        overflow: "hidden",
      }}>
        {/* Mouse-parallax ambient glows */}
        <motion.div
          className="hero-glow"
          style={{
            width: 900, height: 900, top: -300, left: "50%",
            background: "radial-gradient(circle, var(--accent-glow) 0%, transparent 65%)",
            x: heroMouse.x, y: heroMouse.y,
            marginLeft: -450,
          }}
        />
        <motion.div
          className="hero-glow"
          style={{
            width: 500, height: 500, bottom: -100, left: "10%",
            background: "radial-gradient(circle, var(--cta-glow) 0%, transparent 70%)",
            x: heroMouse2.x, y: heroMouse2.y,
          }}
        />
        <motion.div
          className="hero-glow"
          style={{
            width: 400, height: 400, top: "20%", right: "5%",
            background: "radial-gradient(circle, var(--info-glow) 0%, transparent 70%)",
            x: heroMouse.x, y: heroMouse2.y,
          }}
        />

        {/* Grid pattern */}
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

        {/* Hero content — scroll-linked scale & fade */}
        <motion.div style={{
          position: "relative", zIndex: 2, maxWidth: 900,
          scale: heroScale, y: heroY, opacity: heroOpacity,
          willChange: "transform",
        }}>
          {/* Badge — blur reveal */}
          <BlurReveal delay={0.15} className="" >
            <div style={{ marginBottom: 32, display: "flex", justifyContent: "center" }}>
              <span className="tag tag-accent" style={{ gap: 8 }}>
                <IconBolt /> Now in Beta
              </span>
            </div>
          </BlurReveal>

          {/* Headline — clip reveal per line */}
          <div style={{
            fontFamily: "var(--font-heading)", fontWeight: 800,
            fontSize: "clamp(44px, 7vw, 80px)",
            letterSpacing: "-0.045em", lineHeight: 1.02,
          }}>
            <ClipRevealText delay={0.25} as="span">
              Turn viral content
            </ClipRevealText>
            <ClipRevealText delay={0.35} as="span">
              <>
                into your next{" "}
                <span style={{
                  fontFamily: "var(--font-accent)", fontStyle: "italic",
                  fontWeight: 700, color: "var(--accent)",
                }}>
                  script
                </span>
              </>
            </ClipRevealText>
          </div>

          {/* Subheading — blur reveal */}
          <BlurReveal delay={0.55}>
            <p style={{
              fontFamily: "var(--font-body)", fontSize: "clamp(17px, 2.2vw, 21px)",
              color: "var(--text-secondary)", lineHeight: 1.65,
              maxWidth: 600, margin: "28px auto 0", letterSpacing: "-0.01em",
            }}>
              Stop guessing what works. Scrape top creators, analyze their winning patterns,
              and generate scripts that sound like{" "}
              <span style={{ color: "var(--text)", fontWeight: 600 }}>you</span> — not a robot.
            </p>
          </BlurReveal>

          {/* CTAs — blur reveal */}
          <BlurReveal delay={0.7}>
            <div style={{
              display: "flex", gap: 16, justifyContent: "center",
              marginTop: 44, flexWrap: "wrap",
            }}>
              <a href="https://eyeballs-ai.vercel.app" className="btn-cta" style={{ fontSize: 16, padding: "16px 36px" }}>
                Start for free <IconArrowRight />
              </a>
              <a href="#how-it-works" className="btn-ghost" style={{ fontSize: 16, padding: "16px 36px" }}>
                See how it works
              </a>
            </div>
          </BlurReveal>

          {/* Social proof */}
          <BlurReveal delay={0.85}>
            <p style={{
              fontFamily: "var(--font-mono)", fontSize: 12,
              color: "var(--text-muted)", letterSpacing: "1px",
              textTransform: "uppercase", marginTop: 32,
            }}>
              No credit card required &nbsp;·&nbsp; Free forever plan
            </p>
          </BlurReveal>
        </motion.div>

        {/* Hero product mockup — blur reveal + scroll parallax */}
        <BlurReveal delay={0.9}>
          <div style={{
            position: "relative", zIndex: 2,
            marginTop: 72, width: "100%", maxWidth: 1000,
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
                  {/* Content */}
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontFamily: "var(--font-heading)", fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em" }}>
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
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, flex: 1 }}>
                      {[87, 94, 76, 91, 82, 88, 95, 79].map((score, i) => (
                        <div key={i} style={{
                          background: "var(--surface-3)", borderRadius: 10,
                          aspectRatio: "9/14", position: "relative",
                          border: "1px solid var(--border)", overflow: "hidden",
                        }}>
                          <div style={{
                            position: "absolute", inset: 0,
                            background: "linear-gradient(135deg, var(--surface-2) 0%, var(--surface-3) 50%, var(--surface-2) 100%)",
                            backgroundSize: "200% 200%",
                            animation: `shimmer 3s ease-in-out infinite ${i * 0.15}s`,
                          }} />
                          <div style={{
                            position: "absolute", top: 6, right: 6,
                            background: score >= 90 ? "var(--accent)" : "var(--surface-2)",
                            color: score >= 90 ? "#fff" : "var(--text-secondary)",
                            fontSize: 10, fontWeight: 700, fontFamily: "var(--font-mono)",
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
        </BlurReveal>
      </section>

      {/* ─── TICKER ─── */}
      <div className="ticker-wrap">
        <div className="ticker">
          {[...Array(2)].map((_, set) => (
            <span key={set} style={{ display: "contents" }}>
              {["Instagram", "TikTok", "LinkedIn", "Twitter", "Virality scoring", "Hook extraction", "Brand voice AI", "Script generation", "Content patterns", "Multi-model AI"].map((t) => (
                <span key={`${set}-${t}`}>
                  {t} <span style={{ color: "var(--accent)", margin: "0 4px" }}>●</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ─── STATS BAR (word-by-word reveals) ─── */}
      <section style={{
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
        gap: 1, background: "var(--border)",
        padding: "0 clamp(24px, 8vw, 200px)",
      }}>
        {[
          { number: "4", label: "Platforms supported", suffix: "" },
          { number: "100", label: "Virality score range", suffix: "pt" },
          { number: "5", label: "AI models available", suffix: "+" },
          { number: "∞", label: "Scripts you can generate", suffix: "" },
        ].map((stat, i) => (
          <BlurReveal key={stat.label} delay={i * 0.1}>
            <div style={{ background: "var(--surface)", padding: "48px 32px", textAlign: "center" }}>
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
          </BlurReveal>
        ))}
      </section>

      {/* ─── HOW IT WORKS (sticky scroll-driven — Dhruv's IntroBlackBox) ─── */}
      <StickyScrollSteps />

      {/* ─── FEATURES (word-by-word heading + blur reveal cards) ─── */}
      <section id="features" className="section" style={{ paddingTop: 40 }}>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <BlurReveal>
            <span className="tag tag-accent" style={{ marginBottom: 20, display: "inline-flex" }}>Features</span>
          </BlurReveal>
          <div style={{
            fontFamily: "var(--font-heading)", fontWeight: 800,
            fontSize: "clamp(32px, 5vw, 48px)",
            letterSpacing: "-0.04em", lineHeight: 1.05,
            marginTop: 20, display: "flex", justifyContent: "center",
          }}>
            <WordReveal text="Everything you need to dominate" delay={0.1} />
          </div>
          <BlurReveal delay={0.3}>
            <p style={{
              fontSize: 17, color: "var(--text-secondary)",
              maxWidth: 500, margin: "20px auto 0", lineHeight: 1.6,
              letterSpacing: "-0.01em",
            }}>
              A complete content intelligence platform built for creators who take their craft seriously.
            </p>
          </BlurReveal>
        </div>

        <div className="feature-grid" style={{ maxWidth: 1100, margin: "0 auto" }}>
          {[
            { icon: <IconTarget />, title: "Virality scoring", desc: "AI-calculated 0-100 score for every piece of content. Know exactly what performs before you create." },
            { icon: <IconEye />, title: "Hook extraction", desc: "Automatically identifies opening hooks that grab attention. Build a library of proven openers." },
            { icon: <IconBrain />, title: "Brand voice AI", desc: "Deep profile analysis captures your tone, values, and style. Scripts sound like you — never generic." },
            { icon: <IconLayers />, title: "Visual canvas builder", desc: "Node-based script planner. Connect backstories, products, and reference content into one workflow." },
            { icon: <IconChart />, title: "Engagement analytics", desc: "Views, likes, comments, shares, and engagement ratios for every scraped piece of content." },
            { icon: <IconShield />, title: "Multi-model generation", desc: "Choose Claude, GPT-4o, o3, or Gemini. Pick the best model for your script style and budget." },
          ].map((feature, i) => (
            <BlurReveal key={feature.title} delay={i * 0.08}>
              <div className="feature-card">
                <div style={{ color: "var(--accent)", marginBottom: 20 }}>{feature.icon}</div>
                <h4 style={{
                  fontFamily: "var(--font-heading)", fontWeight: 700,
                  fontSize: 17, marginBottom: 10, letterSpacing: "-0.02em",
                }}>
                  {feature.title}
                </h4>
                <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.65 }}>
                  {feature.desc}
                </p>
              </div>
            </BlurReveal>
          ))}
        </div>
      </section>

      {/* ─── PRODUCT SHOWCASE: SCRAPER ─── */}
      <section className="section" style={{ paddingTop: 120 }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: 64, alignItems: "center", maxWidth: 1100, margin: "0 auto",
        }}>
          <div>
            <BlurReveal>
              <span className="tag tag-cta" style={{ marginBottom: 20, display: "inline-flex" }}>Creator Scraper</span>
            </BlurReveal>
            <div style={{
              fontFamily: "var(--font-heading)", fontWeight: 800,
              fontSize: "clamp(28px, 4vw, 40px)",
              letterSpacing: "-0.04em", lineHeight: 1.1,
              marginTop: 20,
            }}>
              <ClipRevealText delay={0.1} as="span">Add any creator.</ClipRevealText>
              <ClipRevealText delay={0.2} as="span">
                <span style={{ color: "var(--text-secondary)" }}>Get their playbook.</span>
              </ClipRevealText>
            </div>
            <BlurReveal delay={0.3}>
              <p style={{
                fontSize: 16, color: "var(--text-secondary)",
                lineHeight: 1.65, marginTop: 20, maxWidth: 440, letterSpacing: "-0.01em",
              }}>
                Drop in a handle from Instagram, TikTok, LinkedIn, or Twitter.
                We scrape their last 7, 30, or 60 posts and run full AI analysis
                on every single piece.
              </p>
            </BlurReveal>
            <BlurReveal delay={0.4}>
              <div style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
                {["Instagram", "TikTok", "LinkedIn", "Twitter"].map((p) => (
                  <span key={p} className="tag" style={{ fontSize: 10 }}>{p}</span>
                ))}
              </div>
            </BlurReveal>
          </div>

          <BlurReveal delay={0.2}>
            <div className="glow-border glow-border-subtle">
              <div className="mock-window">
                <div className="mock-titlebar">
                  <div className="mock-dot" /><div className="mock-dot" /><div className="mock-dot" />
                </div>
                <div style={{ padding: 20 }}>
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
                    <span className="tag tag-cta" style={{ marginLeft: "auto", fontSize: 9, padding: "4px 10px" }}>Scraping...</span>
                  </div>
                  {[
                    { label: "Posts scraped", value: "24/30", pct: 80 },
                    { label: "Analyzed", value: "18/24", pct: 75 },
                  ].map((bar) => (
                    <div key={bar.label} style={{ marginBottom: 12 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--text-muted)", marginBottom: 6 }}>
                        <span>{bar.label}</span>
                        <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>{bar.value}</span>
                      </div>
                      <div style={{ height: 4, borderRadius: 2, background: "var(--surface-3)" }}>
                        <div style={{ height: "100%", borderRadius: 2, width: `${bar.pct}%`, background: "var(--cta)" }} />
                      </div>
                    </div>
                  ))}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6, marginTop: 16 }}>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} style={{
                        aspectRatio: "9/14", borderRadius: 8,
                        background: "var(--surface-3)", border: "1px solid var(--border)",
                        position: "relative", overflow: "hidden",
                      }}>
                        <div style={{
                          position: "absolute", inset: 0,
                          background: "linear-gradient(135deg, var(--surface-2), var(--surface-3))",
                          backgroundSize: "200% 200%",
                          animation: `shimmer 2.5s ease-in-out infinite ${i * 0.2}s`,
                        }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </BlurReveal>
        </div>
      </section>

      {/* ─── PRODUCT SHOWCASE: LIBRARY ─── */}
      <section className="section" style={{ paddingTop: 120 }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: 64, alignItems: "center", maxWidth: 1100, margin: "0 auto",
        }}>
          <BlurReveal>
            <div className="mock-window" style={{ border: "1px solid var(--border)" }}>
              <div className="mock-titlebar">
                <div className="mock-dot" /><div className="mock-dot" /><div className="mock-dot" />
              </div>
              <div style={{ padding: 20 }}>
                <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
                  {["All", "Reels", "Carousel", "90+ Score"].map((f, i) => (
                    <span key={f} className={i === 0 ? "tag tag-accent" : "tag"} style={{ fontSize: 9, padding: "4px 10px" }}>{f}</span>
                  ))}
                </div>
                {[
                  { hook: "\"Stop doing this if you want to grow...\"", score: 94, type: "Reel", creator: "@garyvee" },
                  { hook: "\"The 3-second rule nobody talks about\"", score: 91, type: "Reel", creator: "@hormozi" },
                  { hook: "\"I made $10K in 7 days. Here's how.\"", score: 88, type: "Carousel", creator: "@codie" },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 14,
                    padding: "14px 16px", borderRadius: 10,
                    background: i === 0 ? "var(--surface-2)" : "transparent",
                    border: "1px solid", borderColor: i === 0 ? "var(--border-hover)" : "var(--border)",
                    marginBottom: 8,
                  }}>
                    <div style={{
                      fontFamily: "var(--font-mono)", fontSize: 14, fontWeight: 700,
                      color: item.score >= 90 ? "var(--accent)" : "var(--text-secondary)", minWidth: 28,
                    }}>{item.score}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.3 }}>{item.hook}</div>
                      <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>{item.creator} · {item.type}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </BlurReveal>

          <div>
            <BlurReveal>
              <span className="tag tag-info" style={{ marginBottom: 20, display: "inline-flex" }}>Content Library</span>
            </BlurReveal>
            <div style={{
              fontFamily: "var(--font-heading)", fontWeight: 800,
              fontSize: "clamp(28px, 4vw, 40px)",
              letterSpacing: "-0.04em", lineHeight: 1.1, marginTop: 20,
            }}>
              <ClipRevealText delay={0.1} as="span">Every hook.</ClipRevealText>
              <ClipRevealText delay={0.2} as="span">
                <span style={{ color: "var(--text-secondary)" }}>Every pattern. Ranked.</span>
              </ClipRevealText>
            </div>
            <BlurReveal delay={0.3}>
              <p style={{
                fontSize: 16, color: "var(--text-secondary)",
                lineHeight: 1.65, marginTop: 20, maxWidth: 440, letterSpacing: "-0.01em",
              }}>
                Filter by virality score, hook type, platform, niche, emotion,
                engagement ratio — or any combination. Build your swipe file on autopilot.
              </p>
            </BlurReveal>
            <BlurReveal delay={0.4}>
              <ul style={{ marginTop: 24, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {["AI-extracted hooks and CTAs", "Virality scoring (0-100)", "Smart filtering by 12+ dimensions", "Custom collections and folders"].map((item) => (
                  <li key={item} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "var(--text-secondary)" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--info)", flexShrink: 0 }} />{item}
                  </li>
                ))}
              </ul>
            </BlurReveal>
          </div>
        </div>
      </section>

      {/* ─── BRAND VOICE ─── */}
      <section className="section" style={{ paddingTop: 120, paddingBottom: 120 }}>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <BlurReveal>
            <span className="tag tag-cta" style={{ marginBottom: 20, display: "inline-flex" }}>Brand Voice AI</span>
          </BlurReveal>
          <div style={{
            fontFamily: "var(--font-heading)", fontWeight: 800,
            fontSize: "clamp(32px, 5vw, 48px)",
            letterSpacing: "-0.04em", lineHeight: 1.05, marginTop: 20,
          }}>
            <ClipRevealText as="h2">
              <>Scripts that sound like{" "}
              <span style={{ fontFamily: "var(--font-accent)", fontStyle: "italic", color: "var(--cta)" }}>you</span></>
            </ClipRevealText>
          </div>
          <BlurReveal delay={0.2}>
            <p style={{
              fontSize: 17, color: "var(--text-secondary)",
              maxWidth: 550, margin: "20px auto 0", lineHeight: 1.6, letterSpacing: "-0.01em",
            }}>
              We analyze your Instagram to extract your tone, values, archetype, and
              content pillars. Every script is filtered through your unique voice.
            </p>
          </BlurReveal>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, maxWidth: 1100, margin: "0 auto" }}>
          {[
            { label: "Tone", values: ["Direct", "Witty", "Authoritative"], color: "var(--accent)" },
            { label: "Archetype", values: ["The Outlaw", "65% rebel", "35% sage"], color: "var(--info)" },
            { label: "Pillars", values: ["Growth", "Strategy", "Mindset"], color: "var(--cta)" },
            { label: "Format", values: ["Talking head", "Voiceover", "Text overlay"], color: "var(--warning)" },
          ].map((item, i) => (
            <BlurReveal key={item.label} delay={i * 0.1}>
              <div className="card" style={{ textAlign: "center", padding: "32px 20px" }}>
                <div style={{
                  fontFamily: "var(--font-mono)", fontSize: 11,
                  textTransform: "uppercase", letterSpacing: "2px",
                  color: item.color, marginBottom: 16,
                }}>{item.label}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
                  {item.values.map((v) => (
                    <span key={v} style={{
                      fontSize: 14, fontWeight: 500, color: "var(--text-secondary)",
                      padding: "6px 14px", borderRadius: 8, background: "var(--surface-2)",
                    }}>{v}</span>
                  ))}
                </div>
              </div>
            </BlurReveal>
          ))}
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section id="pricing" className="section" style={{
        background: "var(--surface)", borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)", paddingTop: 100, paddingBottom: 100,
      }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <BlurReveal>
            <span className="tag" style={{ marginBottom: 20, display: "inline-flex" }}>Pricing</span>
          </BlurReveal>
          <div style={{
            fontFamily: "var(--font-heading)", fontWeight: 800,
            fontSize: "clamp(32px, 5vw, 48px)",
            letterSpacing: "-0.04em", lineHeight: 1.05, marginTop: 20,
          }}>
            <ClipRevealText as="h2">
              <>Start free.{" "}<span style={{ color: "var(--text-secondary)" }}>Scale when ready.</span></>
            </ClipRevealText>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, maxWidth: 1000, margin: "0 auto" }}>
          {/* Starter */}
          <BlurReveal delay={0.1}>
            <div className="card" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, textTransform: "uppercase", letterSpacing: "2px", color: "var(--text-muted)", marginBottom: 12 }}>Starter</div>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: 44, fontWeight: 800, letterSpacing: "-0.04em" }}>
                $0<span style={{ fontSize: 16, fontWeight: 400, color: "var(--text-muted)" }}>/mo</span>
              </div>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", marginTop: 8, marginBottom: 28 }}>Perfect for getting started</p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
                {["3 creator scrapes", "50 content analyses", "10 script generations", "1 AI model (Claude)"].map((f) => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "var(--text-secondary)" }}>
                    <span style={{ color: "var(--cta)", fontSize: 14 }}>&#10003;</span> {f}
                  </li>
                ))}
              </ul>
              <a href="https://eyeballs-ai.vercel.app" className="btn-ghost" style={{ marginTop: 28, width: "100%", textAlign: "center" }}>Get started</a>
            </div>
          </BlurReveal>

          {/* Pro (glow border) */}
          <BlurReveal delay={0.2}>
            <div className="glow-border" style={{ height: "100%" }}>
              <div className="card" style={{ display: "flex", flexDirection: "column", background: "var(--surface-2)", height: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, textTransform: "uppercase", letterSpacing: "2px", color: "var(--accent)" }}>Pro</span>
                  <span style={{ fontSize: 10, fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "1px", background: "var(--accent)", color: "#fff", padding: "3px 8px", borderRadius: 4, fontWeight: 600 }}>Popular</span>
                </div>
                <div style={{ fontFamily: "var(--font-heading)", fontSize: 44, fontWeight: 800, letterSpacing: "-0.04em" }}>
                  $29<span style={{ fontSize: 16, fontWeight: 400, color: "var(--text-muted)" }}>/mo</span>
                </div>
                <p style={{ fontSize: 14, color: "var(--text-secondary)", marginTop: 8, marginBottom: 28 }}>For serious creators</p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
                  {["Unlimited scrapes", "Unlimited analyses", "Unlimited scripts", "All 5 AI models", "Canvas builder", "Priority support"].map((f) => (
                    <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "var(--text-secondary)" }}>
                      <span style={{ color: "var(--cta)", fontSize: 14 }}>&#10003;</span> {f}
                    </li>
                  ))}
                </ul>
                <a href="https://eyeballs-ai.vercel.app" className="btn-cta" style={{ marginTop: 28, width: "100%", textAlign: "center" }}>Start free trial <IconArrowRight /></a>
              </div>
            </div>
          </BlurReveal>

          {/* Agency */}
          <BlurReveal delay={0.3}>
            <div className="card" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, textTransform: "uppercase", letterSpacing: "2px", color: "var(--text-muted)", marginBottom: 12 }}>Agency</div>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: 44, fontWeight: 800, letterSpacing: "-0.04em" }}>
                $99<span style={{ fontSize: 16, fontWeight: 400, color: "var(--text-muted)" }}>/mo</span>
              </div>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", marginTop: 8, marginBottom: 28 }}>For teams and agencies</p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
                {["Everything in Pro", "5 team members", "Shared content library", "Brand profiles per client", "API access", "Dedicated support"].map((f) => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "var(--text-secondary)" }}>
                    <span style={{ color: "var(--cta)", fontSize: 14 }}>&#10003;</span> {f}
                  </li>
                ))}
              </ul>
              <a href="https://eyeballs-ai.vercel.app" className="btn-ghost" style={{ marginTop: 28, width: "100%", textAlign: "center" }}>Contact us</a>
            </div>
          </BlurReveal>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="section" style={{
        textAlign: "center", paddingTop: 120, paddingBottom: 120,
        position: "relative", overflow: "hidden",
      }}>
        <div className="hero-glow" style={{
          width: 600, height: 600, top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, var(--accent-glow) 0%, transparent 60%)",
          animation: "floatGlow 6s ease-in-out infinite",
          filter: "blur(60px)",
        }} />

        <div style={{ position: "relative", zIndex: 2 }}>
          <div style={{
            fontFamily: "var(--font-heading)", fontWeight: 800,
            fontSize: "clamp(36px, 6vw, 56px)",
            letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: 24,
          }}>
            <ClipRevealText as="span">Stop guessing.</ClipRevealText>
            <ClipRevealText delay={0.15} as="span">
              <>Start{" "}
              <span style={{ fontFamily: "var(--font-accent)", fontStyle: "italic", color: "var(--accent)" }}>creating</span>.</>
            </ClipRevealText>
          </div>
          <BlurReveal delay={0.3}>
            <p style={{
              fontSize: 18, color: "var(--text-secondary)",
              maxWidth: 500, margin: "0 auto 40px", lineHeight: 1.6, letterSpacing: "-0.01em",
            }}>
              Join creators who use data-driven intelligence to produce content that actually performs.
            </p>
          </BlurReveal>
          <BlurReveal delay={0.4}>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="https://eyeballs-ai.vercel.app" className="btn-cta" style={{ fontSize: 17, padding: "18px 42px" }}>
                Get started for free <IconArrowRight />
              </a>
            </div>
          </BlurReveal>
          <BlurReveal delay={0.5}>
            <p style={{
              fontFamily: "var(--font-mono)", fontSize: 12,
              color: "var(--text-muted)", letterSpacing: "1px",
              textTransform: "uppercase", marginTop: 24,
            }}>
              Free forever &nbsp;·&nbsp; No credit card &nbsp;·&nbsp; Setup in 2 minutes
            </p>
          </BlurReveal>
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
          }}><IconEye /></div>
          <span style={{
            fontFamily: "var(--font-heading)", fontWeight: 700,
            fontSize: 15, letterSpacing: "-0.02em",
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
              fontSize: 13, color: "var(--text-muted)", textDecoration: "none", transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >{link.label}</a>
          ))}
        </div>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)", letterSpacing: "1px" }}>
          &copy; 2025 EYEBALLS.AI
        </span>
      </footer>

      {/* Responsive overrides */}
      <style>{`
        @media (max-width: 900px) {
          .nav-links { display: none !important; }
          section [style*="grid-template-columns: repeat(4"] { grid-template-columns: repeat(2, 1fr) !important; }
          section [style*="grid-template-columns: repeat(3"] { grid-template-columns: 1fr !important; }
          section [style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          section [style*="grid-template-columns: repeat(4"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
