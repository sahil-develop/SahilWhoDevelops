"use client";
import { useEffect, useRef, useState } from "react";

const PROJECTS = [
  {
    name: "ADR Automation Platform",
    tagline: "Built for Canada's ADR Chamber",
    color: "#00d4ff",
    description: "Enterprise dispute resolution platform built for one of Canada's largest ADR chambers. Supports 15+ ADR service types with Zoom for hearings, QuickBooks Online for invoicing, Google Calendar for scheduling, and Google OAuth — all on a microservices backbone with Azure Storage for documents.",
    problem: "Manual ADR processes across a large Canadian chamber needed a unified, scalable digital platform to manage cases, hearings, billing, and scheduling end-to-end.",
    tech: ["NestJS", "TypeScript", "PostgreSQL", "Redis", "RabbitMQ", "ArgoCD", "Docker", "Zoom", "QuickBooks", "Azure Storage", "Google Calendar", "Google OAuth"],
    metrics: ["15+ ADR service types", "10+ Training Courses", "Multi-party case workflows", "Real-time notifications"],
    architecture: "Microservices + Event-driven",
  },
  {
    name: "ZenClinic",
    tagline: "Real-time Telemedicine Infrastructure",
    color: "#10b981",
    description: "Microservices-based clinic management platform with telemedicine capabilities. Independent services for appointments, billing, notifications, and video — each deployed and scaled autonomously. Integrated Zoom, Stripe, and QuickBooks.",
    problem: "Clinics needed a resilient, independently scalable platform for appointments, video calls, billing, and financial reporting.",
    tech: ["NestJS", "PostgreSQL", "Redis", "RabbitMQ", "Zoom API", "Stripe", "QuickBooks", "Docker", "AWS ECS"],
    metrics: ["< 200ms API latency", "HIPAA compliant", "Event-driven services", "Real-time notifications"],
    architecture: "Microservices",
  },
  {
    name: "GiftXD & ShopXD",
    tagline: "Gift Card Exchange & Bitcoin Commerce",
    color: "#f59e0b",
    description: "Two interconnected microservices platforms. GiftXD lets users exchange unused gift cards (Amazon, Nike, Sephora) for Bitcoin. ShopXD scrapes product listings from multiple e-commerce sites and lets users purchase them using those same gift cards — closing the loop between idle balances and real buying power.",
    problem: "Unused gift card balances had no easy way to be liquidated or spent across platforms — GiftXD and ShopXD solved both sides of that problem.",
    tech: ["Node.js", "React", "MongoDB", "Bitcoin API", "Redis", "Web Scraping", "AWS", "Docker"],
    metrics: ["Gift card → Bitcoin exchange", "Multi-platform scraping", "Real-time inventory", "Bitcoin payments"],
    architecture: "Microservices",
  },
  {
    name: "THAIMIS",
    tagline: "Subscription Platform Backend",
    color: "#7c3aed",
    description: "Scalable subscription management backend serving 30k+ registered users. Optimized database queries and built efficient API layer with comprehensive logging and monitoring.",
    problem: "Existing backend struggling with subscriber growth, slow queries, no monitoring.",
    tech: ["Node.js", "TypeScript", "MongoDB", "AWS", "Docker", "Stripe", "GitHub Actions"],
    metrics: ["35% query speedup", "30k+ registered users", "Automated deploys"],
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
