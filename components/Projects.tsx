"use client";
import { useEffect, useRef, useState } from "react";

const PROJECTS = [
  {
    name: "ADR Automation Platform",
    tagline: "Enterprise Case Management at Scale",
    color: "#00d4ff",
    description: "A comprehensive alternative dispute resolution platform supporting 10+ ADR services. Built from scratch with a microservices architecture handling complex workflows, document management, and real-time notifications.",
    problem: "Legacy monolithic system causing bottlenecks under load, manual processes slowing resolution times.",
    tech: ["NestJS","TypeScript","PostgreSQL","Redis","RabbitMQ","AWS ECS","ArgoCD","Docker"],
    metrics: ["40% faster API responses","10+ services integrated","Zero-downtime deployments","99.9% uptime SLA"],
    architecture: "Microservices + Event-driven",
  },
  {
    name: "ZenClinic",
    tagline: "Real-time Telemedicine Infrastructure",
    color: "#10b981",
    description: "Full-stack clinic management system with telemedicine capabilities. Integrated Zoom for video consultations, Stripe for payments, and QuickBooks for financial reporting — all from scratch.",
    problem: "Clinics needed a unified platform for appointments, video calls, billing, and financial reporting.",
    tech: ["NestJS","PostgreSQL","Redis","Zoom API","Stripe","QuickBooks","Docker","AWS"],
    metrics: ["< 200ms API latency","HIPAA compliant","3rd party integrations","Real-time notifications"],
    architecture: "Monolith → Modular Services",
  },
  {
    name: "GiftXD & ShopXD",
    tagline: "Multi-payment E-commerce Engine",
    color: "#f59e0b",
    description: "E-commerce platform with multi-currency support including Bitcoin payments. Built custom product recommendation engine with Redis caching and real-time inventory management.",
    problem: "Need for a crypto-friendly e-commerce platform with intelligent product discovery.",
    tech: ["Node.js","React","MongoDB","Stripe","Bitcoin API","Redis","AWS","Docker"],
    metrics: ["500+ daily transactions","Multi-currency support","Real-time inventory","Custom rec engine"],
    architecture: "Full Stack + API Gateway",
  },
  {
    name: "THAIMIS",
    tagline: "Subscription Platform Backend",
    color: "#7c3aed",
    description: "Scalable subscription management backend serving 5k+ daily active users. Optimized database queries and built efficient API layer with comprehensive logging and monitoring.",
    problem: "Existing backend struggling with subscriber growth, slow queries, no monitoring.",
    tech: ["Node.js","TypeScript","MongoDB","AWS","Docker","Stripe","GitHub Actions"],
    metrics: ["35% query speedup","5k+ DAU","Automated deploys","99.5% uptime"],
    architecture: "REST API + Worker Queues",
  },
];

export default function Projects() {
  const [hovered, setHovered] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.1 });
    sectionRef.current?.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="projects" ref={sectionRef} style={{
      padding: "120px 40px", maxWidth: "1100px", margin: "0 auto",
    }}>
      <div className="reveal section-label">04 — Projects</div>
      <h2 className="reveal" style={{
        fontFamily: "var(--font-display)", fontSize: "clamp(28px,3.5vw,44px)",
        fontWeight: 800, marginBottom: "64px", letterSpacing: "-0.02em",
      }}>
        What I&apos;ve <span className="gradient-text">Built.</span>
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(480px,1fr))", gap: "2px" }}>
        {PROJECTS.map((proj, i) => (
          <div key={proj.name} className="reveal"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              padding: "36px", background: "var(--surface)",
              border: `1px solid ${hovered === i ? proj.color + "44" : "var(--border)"}`,
              transition: "all 0.3s ease",
              transform: hovered === i ? "translateY(-4px)" : "translateY(0)",
              boxShadow: hovered === i ? `0 20px 40px ${proj.color}15` : "none",
            }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
              <span style={{
                padding: "3px 10px", background: proj.color + "15",
                border: `1px solid ${proj.color}33`, borderRadius: "3px",
                fontFamily: "var(--font-mono)", fontSize: "16px",
                color: proj.color, letterSpacing: "0.08em",
              }}>{proj.architecture}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "14px", color: "var(--text-dim)" }}>0{i + 1}</span>
            </div>

            <h3 style={{
              fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 700,
              color: hovered === i ? proj.color : "var(--text)", marginBottom: "6px",
              transition: "color 0.3s",
            }}>{proj.name}</h3>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "15px", color: "var(--text-muted)", marginBottom: "16px" }}>{proj.tagline}</p>
            <p style={{ fontSize: "16px", color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "24px" }}>{proj.description}</p>

            {/* Metrics */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "24px" }}>
              {proj.metrics.map(m => (
                <div key={m} style={{
                  padding: "10px 14px", background: proj.color + "08",
                  border: `1px solid ${proj.color}20`, borderRadius: "3px",
                  fontFamily: "var(--font-mono)", fontSize: "14px",
                  color: "var(--text-muted)",
                }}>
                  <span style={{ color: proj.color, marginRight: "6px" }}>✓</span>{m}
                </div>
              ))}
            </div>

            {/* Tech */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {proj.tech.map(t => (
                <span key={t} className="tech-badge" style={{
                  borderColor: proj.color + "25", color: proj.color,
                  background: proj.color + "08",
                }}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
