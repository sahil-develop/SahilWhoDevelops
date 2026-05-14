"use client";
import { useEffect, useRef, useState } from "react";

const EXPERIENCE = [
  {
    company: "ADR Automation Platform",
    role: "Backend Engineer",
    period: "2024 – Present",
    color: "#00d4ff",
    tech: ["NestJS", "TypeScript", "PostgreSQL", "Redis", "RabbitMQ", "AWS", "ArgoCD"],
    achievements: [
      "Architected scalable case management system supporting 15+ ADR services",
      "Implemented Redis-based queue system improving throughput by 40%",
      "Designed event-driven microservices architecture with RabbitMQ",
      "Built CI/CD pipelines with ArgoCD for zero-downtime deployments",
    ],
  },
  {
    company: "THAIMIS",
    role: "Backend Developer",
    period: "2023 – 2024",
    color: "#7c3aed",
    tech: ["Node.js", "TypeScript", "MongoDB", "AWS", "Docker", "Stripe"],
    achievements: [
      "Integrated Stripe payment processing for subscription management",
      "Designed RESTful APIs consumed by 5k+ daily active users",
      "Optimized database queries reducing response time by 35%",
      "Deployed containerized services on AWS ECS",
    ],
  },
  {
    company: "ZenClinic",
    role: "Backend Developer",
    period: "2023",
    color: "#10b981",
    tech: ["NestJS", "PostgreSQL", "Redis", "Zoom API", "Stripe", "Docker"],
    achievements: [
      "Built real-time clinic management system from scratch",
      "Integrated Zoom API for telemedicine video consultations",
      "Implemented QuickBooks integration for financial reporting",
      "Designed HIPAA-compliant data storage architecture",
    ],
  },
  {
    company: "GiftXD & ShopXD",
    role: "Full Stack Developer",
    period: "2022 – 2023",
    color: "#f59e0b",
    tech: ["Node.js", "React", "MongoDB", "Stripe", "Bitcoin API", "AWS"],
    achievements: [
      "Built e-commerce platform handling 500+ daily transactions",
      "Integrated Bitcoin payment gateway for crypto checkout",
      "Designed product recommendation engine with Redis caching",
      "Implemented real-time inventory management system",
    ],
  },
  {
    company: "VinLogs",
    role: "Backend Developer",
    period: "2022",
    color: "#ef4444",
    tech: ["Node.js", "PostgreSQL", "Docker", "GitHub Actions"],
    achievements: [
      "Built vehicle history logging API with 99.9% uptime",
      "Designed automated CI/CD pipeline with GitHub Actions",
      "Optimized bulk data ingestion processing 10k records/min",
    ],
  },
];

export default function Experience() {
  const [openIdx, setOpenIdx] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.1 });
    sectionRef.current?.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="resp-section" style={{
      padding: "120px 40px", maxWidth: "1100px", margin: "0 auto",
    }}>
      <div className="reveal section-label">03 — Experience</div>
      <h2 className="reveal" style={{
        fontFamily: "var(--font-display)", fontSize: "clamp(28px,3.5vw,44px)",
        fontWeight: 800, marginBottom: "64px", letterSpacing: "-0.02em",
      }}>
        Where I&apos;ve <span className="gradient-text">Shipped.</span>
      </h2>

      <div className="resp-exp" style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "2px" }}>
        {/* Company list */}
        <div className="exp-company-list" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          {EXPERIENCE.map((exp, i) => (
            <button key={exp.company} onClick={() => setOpenIdx(i)}
              style={{
                width: "100%", textAlign: "left", padding: "20px 24px",
                background: openIdx === i ? "rgba(0,212,255,0.05)" : "transparent",
                borderBottom: i < EXPERIENCE.length - 1 ? "1px solid var(--border)" : "none",
                borderLeft: openIdx === i ? `3px solid ${exp.color}` : "3px solid transparent",
                border: "none", cursor: "none",
                transition: "all 0.2s ease",
              }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "16px", color: openIdx === i ? exp.color : "var(--text)", fontWeight: 600 }}>
                {exp.company}
              </div>
            </button>
          ))}
        </div>

        {/* Detail panel */}
        <div style={{
          padding: "36px 40px", background: "var(--surface)",
          border: "1px solid var(--border)",
        }}>
          <div style={{ marginBottom: "24px" }}>
            <h3 style={{
              fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 700,
              color: EXPERIENCE[openIdx].color, marginBottom: "4px",
            }}>{EXPERIENCE[openIdx].role}</h3>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "15px", color: "var(--text-muted)" }}>
              @ {EXPERIENCE[openIdx].company}
            </div>
          </div>

          <div style={{ marginBottom: "28px" }}>
            {EXPERIENCE[openIdx].achievements.map((ach, i) => (
              <div key={i} style={{ display: "flex", gap: "12px", marginBottom: "12px", alignItems: "flex-start" }}>
                <span style={{ color: EXPERIENCE[openIdx].color, marginTop: "3px", flexShrink: 0 }}>▸</span>
                <span style={{ fontSize: "16px", color: "var(--text-muted)", lineHeight: 1.7 }}>{ach}</span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {EXPERIENCE[openIdx].tech.map(t => (
              <span key={t} className="tech-badge" style={{
                borderColor: EXPERIENCE[openIdx].color + "33",
                color: EXPERIENCE[openIdx].color,
                background: EXPERIENCE[openIdx].color + "10",
              }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
