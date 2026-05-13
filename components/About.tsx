"use client";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 40, suffix: "%", label: "API Performance Boost" },
  { value: 10, suffix: "+", label: "ADR Services Supported" },
  { value: 3, suffix: "+", label: "Years Experience" },
  { value: 6, suffix: "", label: "Products Built" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const step = () => {
          start += Math.ceil(target / 60);
          if (start >= target) { setCount(target); return; }
          setCount(start);
          requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);

  return <div ref={ref} style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px,4vw,52px)", fontWeight: 800, color: "var(--accent)" }}>{count}{suffix}</div>;
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add("visible");
      });
    }, { threshold: 0.1 });
    sectionRef.current?.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} style={{ padding: "120px 40px", maxWidth: "1100px", margin: "0 auto" }}>
      <div className="reveal section-label">01 — About</div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>
        <div>
          <h2 className="reveal" style={{
            fontFamily: "var(--font-display)", fontSize: "clamp(32px,4vw,52px)",
            fontWeight: 800, lineHeight: 1.1, marginBottom: "24px",
            letterSpacing: "-0.02em",
          }}>
            Engineering Systems<br />
            <span className="gradient-text">That Scale.</span>
          </h2>
          <p className="reveal" style={{ color: "var(--text-muted)", lineHeight: 1.9, fontSize: "16px", marginBottom: "20px" }}>
            Backend engineer with 3+ years of experience designing and building high-performance distributed systems. I specialize in microservices architecture, cloud infrastructure on AWS, and building APIs that power real-world products.
          </p>
          <p className="reveal" style={{ color: "var(--text-muted)", lineHeight: 1.9, fontSize: "16px", marginBottom: "32px" }}>
            From zero to production — I&apos;ve architected case management platforms, payment integrations, real-time clinic systems, and enterprise automation pipelines used daily by thousands.
          </p>

          <div className="reveal" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {["Node.js", "NestJS", "AWS", "PostgreSQL", "Redis", "Docker"].map(t => (
              <span key={t} className="tech-badge">{t}</span>
            ))}
          </div>
        </div>

        <div>
          {/* Stats grid */}
          <div className="reveal" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px", marginBottom: "40px" }}>
            {stats.map(s => (
              <div key={s.label} style={{
                padding: "32px 24px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                transition: "border-color 0.3s",
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(0,212,255,0.3)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}
              >
                <Counter target={s.value} suffix={s.suffix} />
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "14px", color: "var(--text-dim)", marginTop: "8px", letterSpacing: "0.05em" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Timeline */}
          <div className="reveal" style={{ padding: "24px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "4px" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "14px", color: "var(--accent)", marginBottom: "16px", letterSpacing: "0.1em" }}>CAREER TIMELINE</div>
            {[
              { role: "Backend Engineer", company: "ADR Automation Platform" },
              { role: "Backend Developer", company: "ZenClinic & THAIMIS" },
              { role: "Full Stack Developer", company: "GiftXD & ShopXD" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "16px", alignItems: "flex-start", marginBottom: i < 2 ? "16px" : 0 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "15px", color: "var(--text)", marginBottom: "2px" }}>{item.role}</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "14px", color: "var(--accent)" }}>{item.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
