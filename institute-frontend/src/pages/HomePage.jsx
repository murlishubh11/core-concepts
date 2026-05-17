import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const TRACKS = [
  {
    id: "coding",
    emoji: "⚡",
    label: "Coding & AI",
    color: "#6366f1",
    light: "#eef2ff",
    tag: "Future-ready",
    headline: "Build real AI projects",
    desc: "Python → Machine Learning → Generative AI. Learn by building, not just watching.",
    chips: ["Python", "AI/ML", "Gen AI", "Projects", "Web Dev"],
    cta: "Start Coding",
    href: "/student-portal",
  },
  {
    id: "jee",
    emoji: "🎯",
    label: "JEE / NEET",
    color: "#f59e0b",
    light: "#fffbeb",
    tag: "Rank booster",
    headline: "Crack IIT. Crack AIIMS.",
    desc: "Adaptive tests, rank predictor, college counselor, and strategy that actually works.",
    chips: ["Physics", "Chemistry", "Maths", "Bio", "PYQs", "Mock Tests"],
    cta: "Check My Rank",
    href: "/student-portal",
  },
  {
    id: "boards",
    emoji: "📖",
    label: "Board Exams",
    color: "#10b981",
    light: "#ecfdf5",
    tag: "CBSE • MP Board",
    headline: "Score 95+ in boards",
    desc: "Chapter notes, one-shot videos, PYQs, and AI doubt solving in Hindi & English.",
    chips: ["Class 9", "Class 10", "Class 11", "Class 12", "Hindi", "English"],
    cta: "Explore Chapters",
    href: "/student-portal",
  },
];

const STATS = [
  { num: "12,000+", label: "Active Students" },
  { num: "500+", label: "Hours of Content" },
  { num: "95%", label: "Score Improvement" },
  { num: "AI-First", label: "Platform" },
];

const AI_FEATURES = [
  {
    icon: "🤖",
    title: "AI Doubt Solver",
    desc: "Click photo of any problem → get step-by-step solution in Hindi or English within seconds.",
    badge: "Live Now",
    badgeColor: "#10b981",
  },
  {
    icon: "📅",
    title: "AI Study Planner",
    desc: "Tell us your exam date and weak topics → get a personalised day-by-day study schedule.",
    badge: "Live Now",
    badgeColor: "#10b981",
  },
  {
    icon: "💬",
    title: "Chat with Notes",
    desc: "Upload any PDF or notes → ask questions → get instant answers with page references.",
    badge: "Coming Soon",
    badgeColor: "#6366f1",
  },
  {
    icon: "🧭",
    title: "Career Counselor",
    desc: "10-minute quiz maps your interests to careers. Get a 5-year roadmap starting today.",
    badge: "Coming Soon",
    badgeColor: "#6366f1",
  },
];

const TESTIMONIALS = [
  {
    name: "Ananya Sharma",
    label: "JEE Advanced 2024 — AIR 847",
    avatar: "AS",
    color: "#6366f1",
    text: "The AI doubt solver is insane. I used to wait hours for teachers to respond. Here I get the full solution with steps in under 10 seconds — even at 2AM before my exam.",
  },
  {
    name: "Rohan Verma",
    label: "NEET 2024 — 680/720",
    avatar: "RV",
    color: "#f59e0b",
    text: "The adaptive mock tests figured out exactly where I was weak in Organic Chemistry. My score jumped 80 marks in 6 weeks just by focusing on those subtopics.",
  },
  {
    name: "Priya Malviya",
    label: "Class 10 CBSE — 97.4%",
    avatar: "PM",
    color: "#10b981",
    text: "One-shot revision videos in Hindi saved my boards. I revised the entire Science syllabus in 3 days. The AI planner kept me on track without feeling overwhelmed.",
  },
];

const FAQS = [
  {
    q: "Is CoreConcepts free to use?",
    a: "Yes — we have a free tier with limited videos and 5 AI doubt queries per day. Our Pro plan (₹299/mo) unlocks everything including unlimited AI features and full test series.",
  },
  {
    q: "Which boards and exams are covered?",
    a: "We cover CBSE and MP Board for Class 6–12, JEE Main + Advanced, NEET UG, and a full Python/AI/ML coding track for school and college students.",
  },
  {
    q: "Does the AI doubt solver work for handwritten questions?",
    a: "Yes! Just click a photo of your notebook or textbook and upload it. Our AI reads and solves it step-by-step in Hinglish (Hindi + English mix) or pure Hindi — your choice.",
  },
  {
    q: "Can I attend live classes?",
    a: "Yes, live classes are available for Pro subscribers. All live sessions are recorded and accessible for 30 days so you never miss anything.",
  },
];

/* ─────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────── */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: scrolled ? "rgba(9,11,24,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
        transition: "all 0.3s ease",
        padding: "0 2rem",
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 38,
            height: 38,
            background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            fontSize: 14,
            color: "#fff",
            fontFamily: "'Syne', sans-serif",
            letterSpacing: -0.5,
          }}
        >
          CC
        </div>
        <span
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: 18,
            color: "#fff",
            letterSpacing: -0.5,
          }}
        >
          Core<span style={{ color: "#6366f1" }}>Concepts</span>
        </span>
      </div>

      {/* Nav links */}
      <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
        {["Coding & AI", "JEE/NEET", "Boards", "AI Tools"].map((link) => (
          <a
            key={link}
            href="#tracks"
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: 14,
              fontWeight: 500,
              textDecoration: "none",
              transition: "color 0.2s",
              fontFamily: "'DM Sans', sans-serif",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#fff")}
            onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.6)")}
          >
            {link}
          </a>
        ))}
      </div>

      {/* CTA buttons */}
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <button
          onClick={() => navigate("/login")}
          style={{
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "#fff",
            padding: "8px 18px",
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = "rgba(255,255,255,0.5)";
            e.target.style.background = "rgba(255,255,255,0.05)";
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = "rgba(255,255,255,0.2)";
            e.target.style.background = "transparent";
          }}
        >
          Login
        </button>
        <button
          onClick={() => navigate("/login")}
          style={{
            background: "#6366f1",
            border: "none",
            color: "#fff",
            padding: "8px 20px",
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.background = "#5254cc")}
          onMouseLeave={(e) => (e.target.style.background = "#6366f1")}
        >
          Start Free →
        </button>
      </div>
    </nav>
  );
}

function HeroSection() {
  const navigate = useNavigate();
  return (
    <section
      style={{
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "5rem 2rem 4rem",
        position: "relative",
      }}
    >
      {/* Background grid lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
        }}
      />

      {/* Glows */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 600,
          height: 300,
          background: "radial-gradient(ellipse, rgba(99,102,241,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Announcement pill */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: "rgba(99,102,241,0.1)",
          border: "1px solid rgba(99,102,241,0.3)",
          borderRadius: 100,
          padding: "6px 16px",
          marginBottom: "2rem",
          fontSize: 13,
          color: "#a5b4fc",
          fontWeight: 500,
          fontFamily: "'DM Sans', sans-serif",
          animation: "fadeSlideDown 0.6s ease both",
        }}
      >
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "#6366f1",
            boxShadow: "0 0 0 3px rgba(99,102,241,0.3)",
            display: "inline-block",
            animation: "pulse 2s infinite",
          }}
        />
        AI-powered education is here — built for India 🇮🇳
      </div>

      {/* Main headline */}
      <h1
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: "clamp(2.4rem, 5vw, 4rem)",
          lineHeight: 1.1,
          color: "#fff",
          maxWidth: 800,
          margin: "0 auto 1.5rem",
          letterSpacing: -1,
          animation: "fadeSlideDown 0.6s ease 0.1s both",
        }}
      >
        Learn{" "}
        <span
          style={{
            background: "linear-gradient(90deg,#6366f1,#8b5cf6,#a78bfa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Coding, AI, JEE
        </span>
        <br />& Boards — all in one place
      </h1>

      <p
        style={{
          fontSize: "clamp(1rem, 2vw, 1.2rem)",
          color: "rgba(255,255,255,0.55)",
          maxWidth: 580,
          margin: "0 auto 2.5rem",
          lineHeight: 1.7,
          fontFamily: "'DM Sans', sans-serif",
          animation: "fadeSlideDown 0.6s ease 0.2s both",
        }}
      >
        The smartest students in India use CoreConcepts to crack JEE, NEET, ace their boards, and launch their coding career — with AI tools that no one else has.
      </p>

      {/* CTA Row */}
      <div
        style={{
          display: "flex",
          gap: 12,
          justifyContent: "center",
          flexWrap: "wrap",
          animation: "fadeSlideDown 0.6s ease 0.3s both",
          marginBottom: "3rem",
        }}
      >
        <button
          onClick={() => navigate("/login")}
          style={{
            background: "#6366f1",
            color: "#fff",
            border: "none",
            padding: "14px 32px",
            borderRadius: 12,
            fontSize: 16,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            transition: "all 0.2s",
            boxShadow: "0 0 30px rgba(99,102,241,0.4)",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 0 40px rgba(99,102,241,0.6)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 0 30px rgba(99,102,241,0.4)";
          }}
        >
          Start Learning Free →
        </button>
        <button
          onClick={() => navigate("/student-login")}
          style={{
            background: "rgba(255,255,255,0.05)",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.15)",
            padding: "14px 28px",
            borderRadius: 12,
            fontSize: 16,
            fontWeight: 500,
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.background = "rgba(255,255,255,0.1)")}
          onMouseLeave={(e) => (e.target.style.background = "rgba(255,255,255,0.05)")}
        >
          Admin Login
        </button>
      </div>

      {/* Trust badges */}
      <div
        style={{
          display: "flex",
          gap: "2rem",
          justifyContent: "center",
          flexWrap: "wrap",
          animation: "fadeSlideDown 0.6s ease 0.4s both",
        }}
      >
        {["✅ No credit card needed", "✅ Bilingual (Hindi + English)", "✅ AI doubt solving free"].map((t) => (
          <span key={t} style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif" }}>
            {t}
          </span>
        ))}
      </div>
    </section>
  );
}

function StatsBar() {
  return (
    <section
      style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(255,255,255,0.02)",
        padding: "2rem",
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1px",
        }}
      >
        {STATS.map((s, i) => (
          <div
            key={i}
            style={{
              textAlign: "center",
              padding: "1rem",
              borderRight: i < STATS.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
            }}
          >
            <div
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: "2rem",
                color: "#fff",
                letterSpacing: -1,
              }}
            >
              {s.num}
            </div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif", marginTop: 4 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TracksSection() {
  const [active, setActive] = useState("coding");
  const track = TRACKS.find((t) => t.id === active);

  return (
    <section id="tracks" style={{ padding: "5rem 2rem", maxWidth: 1100, margin: "0 auto" }}>
      {/* Section header */}
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <div
          style={{
            display: "inline-block",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#6366f1",
            fontFamily: "'DM Sans', sans-serif",
            marginBottom: 12,
          }}
        >
          Choose Your Track
        </div>
        <h2
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
            color: "#fff",
            margin: "0 auto",
            letterSpacing: -0.5,
          }}
        >
          One platform, every path
        </h2>
      </div>

      {/* Tab switcher */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 8,
          marginBottom: "2.5rem",
          flexWrap: "wrap",
        }}
      >
        {TRACKS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 22px",
              borderRadius: 100,
              border: active === t.id ? `1.5px solid ${t.color}` : "1px solid rgba(255,255,255,0.1)",
              background: active === t.id ? `${t.color}18` : "transparent",
              color: active === t.id ? t.color : "rgba(255,255,255,0.5)",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              transition: "all 0.2s",
            }}
          >
            <span>{t.emoji}</span>
            {t.label}
          </button>
        ))}
      </div>

      {/* Track card */}
      <div
        key={active}
        style={{
          background: "rgba(255,255,255,0.03)",
          border: `1px solid ${track.color}30`,
          borderRadius: 24,
          padding: "3rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "3rem",
          alignItems: "center",
          animation: "fadeSlideDown 0.3s ease both",
        }}
      >
        {/* Left */}
        <div>
          <div
            style={{
              display: "inline-block",
              background: `${track.color}18`,
              border: `1px solid ${track.color}40`,
              color: track.color,
              fontSize: 12,
              fontWeight: 700,
              padding: "4px 12px",
              borderRadius: 100,
              fontFamily: "'DM Sans', sans-serif",
              marginBottom: 16,
              letterSpacing: "0.05em",
            }}
          >
            {track.tag}
          </div>
          <h3
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "2rem",
              color: "#fff",
              margin: "0 0 1rem",
              letterSpacing: -0.5,
            }}
          >
            {track.headline}
          </h3>
          <p
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: 15,
              lineHeight: 1.7,
              margin: "0 0 1.5rem",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {track.desc}
          </p>
          {/* Chips */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: "2rem" }}>
            {track.chips.map((c) => (
              <span
                key={c}
                style={{
                  background: `${track.color}15`,
                  border: `1px solid ${track.color}30`,
                  color: track.color,
                  fontSize: 12,
                  fontWeight: 600,
                  padding: "4px 12px",
                  borderRadius: 100,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {c}
              </span>
            ))}
          </div>
          <Link
            to={track.href}
            style={{
              display: "inline-block",
              background: track.color,
              color: "#fff",
              padding: "12px 28px",
              borderRadius: 10,
              fontWeight: 700,
              fontSize: 15,
              textDecoration: "none",
              fontFamily: "'DM Sans', sans-serif",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.opacity = 0.85)}
            onMouseLeave={(e) => (e.target.style.opacity = 1)}
          >
            {track.cta} →
          </Link>
        </div>

        {/* Right — visual card */}
        <div
          style={{
            background: "rgba(0,0,0,0.3)",
            border: `1px solid ${track.color}20`,
            borderRadius: 16,
            padding: "2rem",
            minHeight: 260,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          {/* Fake content cards based on track */}
          {active === "coding" && (
            <>
              <div
                style={{
                  background: "rgba(99,102,241,0.08)",
                  border: "1px solid rgba(99,102,241,0.2)",
                  borderRadius: 10,
                  padding: "12px 16px",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 13,
                  color: "#a5b4fc",
                }}
              >
                <span style={{ color: "#64748b" }}>{"# "}</span>
                <span style={{ color: "#6366f1" }}>AI Doubt Solver</span>
                <br />
                <span style={{ color: "#34d399" }}>result</span>
                {" = model.solve("}
                <span style={{ color: "#fbbf24" }}>"your_problem.jpg"</span>
                {")"}
                <br />
                <span style={{ color: "#94a3b8" }}>→ Step-by-step in Hindi ✓</span>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {["Python Basics", "NumPy", "Scikit-learn", "OpenAI API"].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      background: "rgba(99,102,241,0.1)",
                      color: "#a5b4fc",
                      fontSize: 11,
                      padding: "3px 10px",
                      borderRadius: 6,
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div
                style={{
                  background: "rgba(16,185,129,0.08)",
                  border: "1px solid rgba(16,185,129,0.2)",
                  borderRadius: 8,
                  padding: "10px 14px",
                  fontSize: 13,
                  color: "#6ee7b7",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                🎯 Next: Build a chatbot with GPT-4o — Chapter 12
              </div>
            </>
          )}
          {active === "jee" && (
            <>
              <div
                style={{
                  background: "rgba(245,158,11,0.08)",
                  border: "1px solid rgba(245,158,11,0.2)",
                  borderRadius: 10,
                  padding: "16px",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>Rank Predictor</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 28, fontWeight: 800, color: "#fbbf24", fontFamily: "'Syne', sans-serif" }}>AIR 2,847</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Based on 285 marks</div>
                  </div>
                  <div
                    style={{
                      background: "rgba(245,158,11,0.15)",
                      border: "1px solid rgba(245,158,11,0.3)",
                      borderRadius: 8,
                      padding: "8px 12px",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ fontSize: 11, color: "#fbbf24" }}>IIT Bombay</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>Computer Sci</div>
                    <div style={{ fontSize: 10, color: "#34d399", marginTop: 2 }}>✓ Likely</div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  background: "rgba(245,158,11,0.05)",
                  border: "1px solid rgba(245,158,11,0.15)",
                  borderRadius: 8,
                  padding: "10px 14px",
                  fontSize: 13,
                  color: "rgba(255,255,255,0.5)",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                📊 Mock Test 14 — Score: 285/360 · Weak: Organic Chem
              </div>
            </>
          )}
          {active === "boards" && (
            <>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { sub: "Mathematics", done: 78, color: "#6366f1" },
                  { sub: "Science", done: 62, color: "#10b981" },
                  { sub: "Social Science", done: 45, color: "#f59e0b" },
                ].map((item) => (
                  <div key={item.sub}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 12,
                        color: "rgba(255,255,255,0.5)",
                        fontFamily: "'DM Sans', sans-serif",
                        marginBottom: 5,
                      }}
                    >
                      <span>{item.sub}</span>
                      <span style={{ color: item.color }}>{item.done}%</span>
                    </div>
                    <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 3 }}>
                      <div style={{ width: `${item.done}%`, height: "100%", background: item.color, borderRadius: 3, transition: "width 1s ease" }} />
                    </div>
                  </div>
                ))}
              </div>
              <div
                style={{
                  background: "rgba(16,185,129,0.08)",
                  border: "1px solid rgba(16,185,129,0.2)",
                  borderRadius: 8,
                  padding: "10px 14px",
                  fontSize: 13,
                  color: "#6ee7b7",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                📖 Next chapter: Triangles — One-shot video ready (Hindi)
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function AIFeaturesSection() {
  return (
    <section
      style={{
        padding: "5rem 2rem",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        background: "rgba(99,102,241,0.02)",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div
            style={{
              display: "inline-block",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#6366f1",
              fontFamily: "'DM Sans', sans-serif",
              marginBottom: 12,
            }}
          >
            AI Tools
          </div>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
              color: "#fff",
              margin: "0 0 1rem",
              letterSpacing: -0.5,
            }}
          >
            Powered by AI. Built for students.
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.4)",
              maxWidth: 500,
              margin: "0 auto",
              fontSize: 15,
              fontFamily: "'DM Sans', sans-serif",
              lineHeight: 1.7,
            }}
          >
            No other platform in India gives you AI tools that actually understand how you study.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {AI_FEATURES.map((f) => (
            <div
              key={f.title}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16,
                padding: "1.75rem",
                transition: "border-color 0.2s, transform 0.2s",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(99,102,241,0.3)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1rem" }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    background: "rgba(99,102,241,0.1)",
                    border: "1px solid rgba(99,102,241,0.2)",
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                  }}
                >
                  {f.icon}
                </div>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "3px 10px",
                    borderRadius: 100,
                    background: `${f.badgeColor}15`,
                    color: f.badgeColor,
                    border: `1px solid ${f.badgeColor}30`,
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {f.badge}
                </span>
              </div>
              <h3
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: 17,
                  color: "#fff",
                  margin: "0 0 8px",
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  color: "rgba(255,255,255,0.45)",
                  fontSize: 14,
                  lineHeight: 1.7,
                  margin: 0,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section style={{ padding: "5rem 2rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#6366f1",
              fontFamily: "'DM Sans', sans-serif",
              marginBottom: 12,
            }}
          >
            Student Stories
          </div>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
              color: "#fff",
              letterSpacing: -0.5,
            }}
          >
            Real students. Real results.
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 16,
                padding: "1.75rem",
              }}
            >
              {/* Stars */}
              <div style={{ color: "#fbbf24", fontSize: 14, marginBottom: 12, letterSpacing: 2 }}>★★★★★</div>
              <p
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: 14,
                  lineHeight: 1.75,
                  margin: "0 0 1.25rem",
                  fontFamily: "'DM Sans', sans-serif",
                  fontStyle: "italic",
                }}
              >
                "{t.text}"
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    background: `${t.color}20`,
                    border: `1px solid ${t.color}40`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    fontWeight: 700,
                    color: t.color,
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: t.color, fontFamily: "'DM Sans', sans-serif" }}>{t.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [open, setOpen] = useState(null);

  return (
    <section
      style={{
        padding: "5rem 2rem",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
              color: "#fff",
              letterSpacing: -0.5,
            }}
          >
            Frequently asked questions
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {FAQS.map((faq, i) => (
            <div
              key={i}
              style={{
                background: open === i ? "rgba(99,102,241,0.06)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${open === i ? "rgba(99,102,241,0.25)" : "rgba(255,255,255,0.07)"}`,
                borderRadius: 12,
                overflow: "hidden",
                transition: "all 0.2s",
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%",
                  background: "none",
                  border: "none",
                  padding: "1.1rem 1.5rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                  color: "#fff",
                  fontSize: 15,
                  fontWeight: 500,
                  fontFamily: "'DM Sans', sans-serif",
                  textAlign: "left",
                  gap: 16,
                }}
              >
                {faq.q}
                <span
                  style={{
                    fontSize: 20,
                    color: open === i ? "#6366f1" : "rgba(255,255,255,0.3)",
                    transition: "transform 0.2s",
                    transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                    flexShrink: 0,
                  }}
                >
                  +
                </span>
              </button>
              {open === i && (
                <div
                  style={{
                    padding: "0 1.5rem 1.1rem",
                    fontSize: 14,
                    color: "rgba(255,255,255,0.5)",
                    lineHeight: 1.75,
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const navigate = useNavigate();
  return (
    <section
      style={{
        padding: "5rem 2rem",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div
        style={{
          maxWidth: 800,
          margin: "0 auto",
          textAlign: "center",
          background: "rgba(99,102,241,0.06)",
          border: "1px solid rgba(99,102,241,0.2)",
          borderRadius: 24,
          padding: "4rem 2rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: 400,
            height: 200,
            background: "radial-gradient(ellipse, rgba(99,102,241,0.15), transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <h2
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
            color: "#fff",
            margin: "0 0 1rem",
            letterSpacing: -0.5,
          }}
        >
          Your goal starts today. Not tomorrow.
        </h2>
        <p
          style={{
            color: "rgba(255,255,255,0.45)",
            fontSize: 16,
            margin: "0 0 2rem",
            fontFamily: "'DM Sans', sans-serif",
            lineHeight: 1.7,
          }}
        >
          Join 12,000+ students already learning smarter with AI. First 30 days, zero cost.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => navigate("/login")}
            style={{
              background: "#6366f1",
              color: "#fff",
              border: "none",
              padding: "14px 36px",
              borderRadius: 12,
              fontSize: 16,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              boxShadow: "0 0 30px rgba(99,102,241,0.4)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.transform = "translateY(-2px)")}
            onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}
          >
            Create Free Account →
          </button>
          <button
            onClick={() => navigate("/login")}
            style={{
              background: "rgba(255,255,255,0.06)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.15)",
              padding: "14px 28px",
              borderRadius: 12,
              fontSize: 16,
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Login to Dashboard
          </button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "2.5rem 2rem",
        background: "rgba(0,0,0,0.3)",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: 12,
              color: "#fff",
              fontFamily: "'Syne', sans-serif",
            }}
          >
            CC
          </div>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "#fff", fontSize: 15 }}>
            CoreConcepts
          </span>
        </div>

        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
          {["Coding & AI", "JEE/NEET", "Board Exams", "Login", "Register"].map((link) => (
            <a
              key={link}
              href="#"
              style={{
                color: "rgba(255,255,255,0.35)",
                fontSize: 13,
                textDecoration: "none",
                fontFamily: "'DM Sans', sans-serif",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#fff")}
              onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.35)")}
            >
              {link}
            </a>
          ))}
        </div>

        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.2)", fontFamily: "'DM Sans', sans-serif" }}>
          © 2025 CoreConcepts · Bhopal, India
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&family=DM+Mono&display=swap');

        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 3px rgba(99,102,241,0.3); }
          50%       { box-shadow: 0 0 0 6px rgba(99,102,241,0.1); }
        }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
      `}</style>

      <div
        style={{
          background: "#090b18",
          minHeight: "100vh",
          color: "#fff",
        }}
      >
        <Navbar />
        <HeroSection />
        <StatsBar />
        <TracksSection />
        <AIFeaturesSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
        <Footer />
      </div>
    </>
  );
}