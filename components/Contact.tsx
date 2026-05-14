"use client";
import { useEffect, useRef, useState } from "react";

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const EMAIL = "yagitsahil@gmail.com";

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.1 });
    sectionRef.current?.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section id="contact" ref={sectionRef} className="resp-section-contact" style={{
      padding: "120px 40px 80px", maxWidth: "1100px", margin: "0 auto",
    }}>
      <div className="reveal section-label">06 — Contact</div>

      <div className="resp-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>
        <div>
          <h2 className="reveal" style={{
            fontFamily: "var(--font-display)", fontSize: "clamp(28px,3.5vw,52px)",
            fontWeight: 800, lineHeight: 1.1, marginBottom: "24px", letterSpacing: "-0.02em",
          }}>
            Let&apos;s Build<br />
            <span className="gradient-text">Something.</span>
          </h2>
          <p className="reveal" style={{ color: "var(--text-muted)", fontSize: "16px", lineHeight: 1.9, marginBottom: "24px", maxWidth: "400px" }}>
            Open to new opportunities, consulting, and interesting engineering challenges. If you need someone who thinks in systems and ships products, let&apos;s talk.
          </p>

          {/* Location availability */}
          <div className="reveal" style={{ marginBottom: "40px" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "14px", color: "var(--text-dim)", marginBottom: "10px", letterSpacing: "0.1em" }}>AVAILABLE IN</div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {["Remote", "Delhi", "Gurugram"].map(loc => (
                <span key={loc} style={{
                  padding: "5px 14px",
                  background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.18)",
                  borderRadius: "100px", fontFamily: "var(--font-mono)", fontSize: "14px",
                  color: "var(--accent)", letterSpacing: "0.05em",
                }}>{loc}</span>
              ))}
            </div>
          </div>

          {/* Email copy */}
          <div className="reveal" style={{ marginBottom: "32px" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "14px", color: "var(--text-dim)", marginBottom: "8px", letterSpacing: "0.1em" }}>EMAIL</div>
            <button onClick={copyEmail}
              style={{
                display: "flex", alignItems: "center", gap: "12px",
                padding: "14px 20px", cursor: "none",
                background: "var(--surface)", border: `1px solid ${copied ? "rgba(16,185,129,0.4)" : "var(--border-1)"}`,
                borderRadius: "4px", color: copied ? "#10b981" : "var(--text)",
                fontFamily: "var(--font-mono)", fontSize: "16px",
                transition: "all 0.3s ease", width: "100%", textAlign: "left",
              }}
              onMouseEnter={e => {
                if (!copied) {
                  e.currentTarget.style.borderColor = "rgba(0,212,255,0.4)";
                  e.currentTarget.style.color = "var(--accent)";
                }
              }}
              onMouseLeave={e => {
                if (!copied) {
                  e.currentTarget.style.borderColor = "var(--border-1)";
                  e.currentTarget.style.color = "var(--text)";
                }
              }}
            >
              <span style={{ flex: 1 }}>{EMAIL}</span>
              <span style={{ fontSize: "14px", opacity: 0.6 }}>{copied ? "✓ Copied!" : "Click to copy"}</span>
            </button>
          </div>

          {/* Social links */}
          <div className="reveal" style={{ display: "flex", gap: "12px" }}>
            {[
              { label: "GitHub", href: "https://github.com/sahil-develop", color: "#00d4ff" },
              { label: "LinkedIn", href: "https://linkedin.com/in/sahil-b-4586b310a", color: "#7c3aed" },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener"
                style={{
                  padding: "12px 24px",
                  background: s.color + "10", border: `1px solid ${s.color}30`,
                  borderRadius: "4px", color: s.color,
                  fontFamily: "var(--font-mono)", fontSize: "15px",
                  textDecoration: "none", letterSpacing: "0.05em",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = s.color + "20";
                  e.currentTarget.style.boxShadow = `0 0 20px ${s.color}25`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = s.color + "10";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >{s.label} ↗</a>
            ))}
          </div>
        </div>

        {/* Terminal-style status */}
        <div className="reveal" style={{
          padding: "32px", background: "#050a10",
          border: "1px solid rgba(0,212,255,0.15)", borderRadius: "4px",
          fontFamily: "var(--font-mono)",
        }}>
          <div style={{ display: "flex", gap: "6px", marginBottom: "20px" }}>
            {["#ff5f57", "#ffbd2e", "#28c941"].map((c, i) => (
              <div key={i} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c }} />
            ))}
          </div>
          {[
            { prompt: "$", cmd: "curl -X GET /api/status", delay: 0 },
            { out: '{ "status": "open_to_work" }', color: "#10b981", delay: 400 },
            { prompt: "$", cmd: "sahil --location", delay: 800 },
            { out: "> Remote · Delhi · Gurugram · All India", color: "var(--accent)", delay: 1200 },
            { prompt: "$", cmd: "sahil --contact", delay: 1600 },
            { out: "> yagitsahil@gmail.com", color: "#f59e0b", delay: 2000 },
          ].map((line, i) => (
            <div key={i} style={{
              marginBottom: "8px", fontSize: "15px",
              animation: `fadeIn 0.3s ease ${(line as any).delay || 0}ms both`,
            }}>
              {"prompt" in line ? (
                <span>
                  <span style={{ color: "var(--accent)" }}>~</span>
                  <span style={{ color: "var(--text-muted)", margin: "0 8px" }}>{line.prompt}</span>
                  <span style={{ color: "var(--text)" }}>{line.cmd}</span>
                </span>
              ) : (
                <span style={{ color: line.color, paddingLeft: "20px" }} dangerouslySetInnerHTML={{ __html: line.out || "" }} />
              )}
            </div>
          ))}
          <span style={{ color: "var(--accent)", animation: "blink 0.8s step-end infinite" }}>█</span>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0; } }
      `}</style>
    </section>
  );
}
