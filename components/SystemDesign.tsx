"use client";
import { useEffect, useRef } from "react";

const DIAGRAMS = [
  {
    title: "Microservices Architecture",
    color: "#00d4ff",
    nodes: [
      { label: "API Gateway", x: 50, y: 10, main: true },
      { label: "Auth Service", x: 15, y: 40 },
      { label: "Case Service", x: 50, y: 40 },
      { label: "Notify Service", x: 85, y: 40 },
      { label: "PostgreSQL", x: 20, y: 75 },
      { label: "Redis Cache", x: 50, y: 75 },
      { label: "RabbitMQ", x: 80, y: 75 },
    ],
    edges: [[0,1],[0,2],[0,3],[1,4],[2,5],[3,6]],
  },
  {
    title: "CI/CD Pipeline",
    color: "#7c3aed",
    nodes: [
      { label: "Code Push", x: 10, y: 50, main: true },
      { label: "GitHub Actions", x: 32, y: 50 },
      { label: "Docker Build", x: 54, y: 50 },
      { label: "ArgoCD", x: 76, y: 50 },
      { label: "K8s Cluster", x: 90, y: 50, main: true },
    ],
    edges: [[0,1],[1,2],[2,3],[3,4]],
  },
];

function MiniDiagram({ diagram }: { diagram: typeof DIAGRAMS[0] }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current!;
    const lines = svg.querySelectorAll("line");
    lines.forEach((line, i) => {
      const svgLine = line as SVGLineElement;
      const len = svgLine.getTotalLength?.() || 100;
      svgLine.style.strokeDasharray = String(len);
      svgLine.style.strokeDashoffset = String(len);
      setTimeout(() => {
        svgLine.style.transition = `stroke-dashoffset 0.6s ease ${i * 0.1}s`;
        svgLine.style.strokeDashoffset = "0";
      }, 300);
    });
  }, []);

  return (
    <div style={{ padding: "28px", background: "var(--surface)", border: `1px solid ${diagram.color}22` }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: "14px", color: diagram.color, marginBottom: "20px", letterSpacing: "0.1em" }}>
        {diagram.title.toUpperCase()}
      </div>
      <svg ref={svgRef} viewBox="0 0 100 100" style={{ width: "100%", height: "140px" }}>
        {diagram.edges.map(([a, b], i) => {
          const na = diagram.nodes[a], nb = diagram.nodes[b];
          return (
            <line key={i}
              x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
              stroke={diagram.color} strokeWidth="0.5" strokeOpacity="0.4"
            />
          );
        })}
        {diagram.nodes.map((n, i) => (
          <g key={i}>
            <rect
              x={n.x - 8} y={n.y - 4} width="16" height="8" rx="2"
              fill={n.main ? diagram.color + "30" : "rgba(255,255,255,0.05)"}
              stroke={n.main ? diagram.color : diagram.color + "44"}
              strokeWidth={n.main ? "0.8" : "0.4"}
            />
            <text x={n.x} y={n.y + 1.2} textAnchor="middle"
              fill={n.main ? diagram.color : "#6b7c93"}
              fontSize="2.8" fontFamily="JetBrains Mono, monospace"
            >{n.label}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export default function SystemDesign() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.1 });
    sectionRef.current?.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="systemdesign" ref={sectionRef} style={{
      padding: "120px 40px", maxWidth: "1100px", margin: "0 auto",
    }}>
      <div className="reveal section-label">05 — System Design</div>
      <h2 className="reveal" style={{
        fontFamily: "var(--font-display)", fontSize: "clamp(28px,3.5vw,44px)",
        fontWeight: 800, marginBottom: "16px", letterSpacing: "-0.02em",
      }}>
        How I Think <span className="gradient-text">in Systems.</span>
      </h2>
      <p className="reveal" style={{ color: "var(--text-muted)", fontSize: "16px", marginBottom: "56px", maxWidth: "500px", lineHeight: 1.8 }}>
        Every system I build is designed for resilience, scalability, and observability from day one.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px", marginBottom: "2px" }}>
        {DIAGRAMS.map(d => (
          <div key={d.title} className="reveal"><MiniDiagram diagram={d} /></div>
        ))}
      </div>

      {/* Principles */}
      <div className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px" }}>
        {[
          { icon: "⚡", title: "Event-Driven", desc: "RabbitMQ message queues for async processing and service decoupling" },
          { icon: "🔄", title: "CI/CD First", desc: "GitHub Actions + ArgoCD for automated testing and zero-downtime deploys" },
          { icon: "📊", title: "Observable", desc: "Structured logging, metrics, and tracing baked into every service" },
        ].map(p => (
          <div key={p.title} style={{ padding: "28px 24px", background: "var(--surface)", border: "1px solid var(--border)" }}>
            <div style={{ fontSize: "24px", marginBottom: "12px" }}>{p.icon}</div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, marginBottom: "8px", fontSize: "15px" }}>{p.title}</div>
            <div style={{ fontSize: "15px", color: "var(--text-muted)", lineHeight: 1.7 }}>{p.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
