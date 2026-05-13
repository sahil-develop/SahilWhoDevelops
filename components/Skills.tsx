"use client";
import { useEffect, useRef } from "react";

const SKILL_GROUPS = [
  {
    category: "Backend",
    color: "#00d4ff",
    skills: [
      { name: "Node.js", pct: 95 }, { name: "NestJS", pct: 90 },
      { name: "TypeScript", pct: 92 }, { name: "Django REST", pct: 75 },
      { name: "GraphQL", pct: 80 },
    ],
  },
  {
    category: "Cloud & DevOps",
    color: "#7c3aed",
    skills: [
      { name: "AWS", pct: 85 }, { name: "Docker", pct: 88 },
      { name: "GitHub Actions", pct: 85 }, { name: "ArgoCD", pct: 75 },
      { name: "Serverless", pct: 80 },
    ],
  },
  {
    category: "Databases",
    color: "#10b981",
    skills: [
      { name: "PostgreSQL", pct: 90 }, { name: "MongoDB", pct: 82 },
      { name: "Redis", pct: 88 },
    ],
  },
  {
    category: "Messaging & Payments",
    color: "#f59e0b",
    skills: [
      { name: "RabbitMQ", pct: 85 }, { name: "Stripe", pct: 88 },
      { name: "QuickBooks", pct: 75 }, { name: "Microservices", pct: 90 },
    ],
  },
];

function SkillBar({ name, pct, color }: { name: string; pct: number; color: string }) {
  const barRef = useRef<HTMLDivElement>(null);
  const filled = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        setTimeout(() => {
          if (filled.current) filled.current.style.width = pct + "%";
        }, 100);
      }
    });
    if (barRef.current) obs.observe(barRef.current);
    return () => obs.disconnect();
  }, [pct]);

  return (
    <div ref={barRef} style={{ marginBottom: "12px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "15px", color: "var(--text-muted)" }}>{name}</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "14px", color }}>%{pct}</span>
      </div>
      <div style={{ height: "3px", background: "rgba(255,255,255,0.06)", borderRadius: "2px", overflow: "hidden" }}>
        <div ref={filled} style={{
          height: "100%", width: "0%", borderRadius: "2px",
          background: `linear-gradient(90deg, ${color}, ${color}88)`,
          transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)",
          boxShadow: `0 0 8px ${color}66`,
        }} />
      </div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.1 });
    sectionRef.current?.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef} style={{
      padding: "120px 40px", maxWidth: "1100px", margin: "0 auto",
    }}>
      <div className="reveal section-label">02 — Skills</div>
      <h2 className="reveal" style={{
        fontFamily: "var(--font-display)", fontSize: "clamp(28px,3.5vw,44px)",
        fontWeight: 800, marginBottom: "64px", letterSpacing: "-0.02em",
      }}>
        Technical <span className="gradient-text">Arsenal</span>
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "2px" }}>
        {SKILL_GROUPS.map((group, i) => (
          <div key={group.category} className="reveal" style={{
            padding: "32px 28px",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            transition: "all 0.3s ease",
            animationDelay: `${i * 0.1}s`,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = group.color + "44";
            e.currentTarget.style.background = `rgba(${parseInt(group.color.slice(1,3),16)},${parseInt(group.color.slice(3,5),16)},${parseInt(group.color.slice(5,7),16)},0.04)`;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.background = "var(--surface)";
          }}
          >
            <div style={{
              display: "inline-block", padding: "4px 10px",
              background: group.color + "15", border: `1px solid ${group.color}33`,
              borderRadius: "3px", marginBottom: "24px",
              fontFamily: "var(--font-mono)", fontSize: "16px",
              color: group.color, letterSpacing: "0.1em",
            }}>{group.category.toUpperCase()}</div>
            {group.skills.map(s => (
              <SkillBar key={s.name} name={s.name} pct={s.pct} color={group.color} />
            ))}
          </div>
        ))}
      </div>

      {/* Tech pill cloud */}
      <div className="reveal" style={{ marginTop: "64px", textAlign: "center" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "14px", color: "var(--text-dim)", marginBottom: "24px", letterSpacing: "0.2em" }}>FULL STACK</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center" }}>
          {["Node.js","NestJS","TypeScript","PostgreSQL","MongoDB","Redis","RabbitMQ","AWS","Docker",
            "GitHub Actions","ArgoCD","Stripe","QuickBooks","GraphQL","Django REST","Serverless","CI/CD","Microservices"].map(t => (
            <span key={t} className="tech-badge" style={{ cursor: "default" }}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
