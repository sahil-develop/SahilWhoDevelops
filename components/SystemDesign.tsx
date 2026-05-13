"use client";
import { useEffect, useRef } from "react";

const NH = 22;

type Node = { label: string; x: number; y: number; main?: boolean };
type DiagramDef = {
  title: string;
  color: string;
  viewBox: string;
  svgH: string;
  nodes: Node[];
  edges: [number, number][];
  layers: { label: string; y: number }[];
  steps?: boolean;
};

function nw(label: string) {
  return Math.max(52, Math.round(label.length * 5 + 18));
}

function edgePts(ax: number, ay: number, aw: number, bx: number, by: number, bw: number) {
  const dx = bx - ax, dy = by - ay;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len, uy = dy / len;
  const ha = Math.min((aw / 2) / (Math.abs(ux) || 1e-9), (NH / 2) / (Math.abs(uy) || 1e-9));
  const hb = Math.min((bw / 2) / (Math.abs(ux) || 1e-9), (NH / 2) / (Math.abs(uy) || 1e-9));
  return { x1: ax + ux * ha, y1: ay + uy * ha, x2: bx - ux * hb, y2: by - uy * hb };
}

const DIAGRAMS: DiagramDef[] = [
  {
    title: "Microservices Architecture",
    color: "#00d4ff",
    viewBox: "0 0 340 200",
    svgH: "210px",
    nodes: [
      { label: "API Gateway",    x: 175, y: 40,  main: true },
      { label: "Auth Service",   x: 70,  y: 112 },
      { label: "Case Service",   x: 175, y: 112 },
      { label: "Notify Service", x: 280, y: 112 },
      { label: "PostgreSQL",     x: 70,  y: 178 },
      { label: "Redis Cache",    x: 175, y: 178 },
      { label: "RabbitMQ",       x: 280, y: 178 },
    ],
    edges: [[0,1],[0,2],[0,3],[1,4],[2,5],[3,6]],
    layers: [
      { label: "GATEWAY",    y: 20 },
      { label: "SERVICES",   y: 92 },
      { label: "DATA LAYER", y: 158 },
    ],
  },
  {
    title: "CI/CD Pipeline",
    color: "#7c3aed",
    viewBox: "0 0 460 95",
    svgH: "115px",
    nodes: [
      { label: "Code Push",      x: 40,  y: 52, main: true },
      { label: "GitHub Actions", x: 138, y: 52 },
      { label: "Docker Build",   x: 243, y: 52 },
      { label: "ArgoCD",         x: 329, y: 52 },
      { label: "K8s Cluster",    x: 412, y: 52, main: true },
    ],
    edges: [[0,1],[1,2],[2,3],[3,4]],
    layers: [],
    steps: true,
  },
];

function MiniDiagram({ diagram }: { diagram: DiagramDef }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      obs.disconnect();
      svg.querySelectorAll<SVGLineElement>("line.edge").forEach((line, i) => {
        const len = line.getTotalLength?.() ?? 80;
        line.style.strokeDasharray = `${len}`;
        line.style.strokeDashoffset = `${len}`;
        setTimeout(() => {
          line.style.transition = `stroke-dashoffset 0.55s ease ${i * 0.13}s`;
          line.style.strokeDashoffset = "0";
        }, 60);
      });
    }, { threshold: 0.25 });
    obs.observe(svg);
    return () => obs.disconnect();
  }, []);

  const id = diagram.title.replace(/\W+/g, "-");
  const color = diagram.color;

  return (
    <div style={{
      padding: "28px 24px 24px",
      background: "var(--surface)",
      border: `1px solid ${color}22`,
      height: "100%",
      boxSizing: "border-box",
    }}>
      <div style={{
        fontFamily: "var(--font-mono)", fontSize: "11px",
        color, marginBottom: "14px", letterSpacing: "0.12em",
      }}>
        {diagram.title.toUpperCase()}
      </div>
      <svg ref={svgRef} viewBox={diagram.viewBox}
        style={{ width: "100%", height: diagram.svgH, display: "block" }}>
        <defs>
          <marker id={`a-${id}`} markerWidth="7" markerHeight="6"
            refX="6.5" refY="3" orient="auto" markerUnits="userSpaceOnUse">
            <path d="M0,0.5 L0,5.5 L7,3 z" fill={color} fillOpacity="0.65" />
          </marker>
          <filter id={`g-${id}`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Layer labels (microservices) */}
        {diagram.layers.map(l => (
          <text key={l.label} x="3" y={l.y}
            fill={color} fillOpacity="0.28" fontSize="5.5"
            fontFamily="JetBrains Mono, monospace" letterSpacing="0.1em">
            {l.label}
          </text>
        ))}

        {/* Step numbers (CI/CD) */}
        {diagram.steps && diagram.nodes.map((n, i) => (
          <text key={i} x={n.x} y={n.y - 19}
            textAnchor="middle" fill={color} fillOpacity="0.35"
            fontSize="6" fontFamily="JetBrains Mono, monospace">
            {String(i + 1).padStart(2, "0")}
          </text>
        ))}

        {/* Pipeline rail (CI/CD) */}
        {diagram.steps && (
          <line
            x1={diagram.nodes[0].x} y1={diagram.nodes[0].y}
            x2={diagram.nodes[diagram.nodes.length - 1].x} y2={diagram.nodes[0].y}
            stroke={color} strokeWidth="0.4" strokeOpacity="0.12"
          />
        )}

        {/* Edges */}
        {diagram.edges.map(([a, b], i) => {
          const na = diagram.nodes[a], nb = diagram.nodes[b];
          const { x1, y1, x2, y2 } = edgePts(na.x, na.y, nw(na.label), nb.x, nb.y, nw(nb.label));
          return (
            <line key={i} className="edge"
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={color} strokeWidth="0.8" strokeOpacity="0.45"
              markerEnd={`url(#a-${id})`}
            />
          );
        })}

        {/* Nodes */}
        {diagram.nodes.map((n, i) => {
          const w = nw(n.label);
          return (
            <g key={i} filter={n.main ? `url(#g-${id})` : undefined}>
              <rect
                x={n.x - w / 2} y={n.y - NH / 2}
                width={w} height={NH} rx="3.5"
                fill={n.main ? `${color}1e` : "rgba(255,255,255,0.035)"}
                stroke={color}
                strokeOpacity={n.main ? 0.85 : 0.3}
                strokeWidth={n.main ? 1 : 0.6}
              />
              <text
                x={n.x} y={n.y}
                textAnchor="middle" dominantBaseline="central"
                fill={n.main ? color : "#7a8fa0"}
                fontSize="7.8"
                fontFamily="JetBrains Mono, monospace"
                fontWeight={n.main ? 600 : 400}
              >
                {n.label}
              </text>
            </g>
          );
        })}
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
          <div key={d.title} className="reveal" style={{ display: "flex" }}>
            <MiniDiagram diagram={d} />
          </div>
        ))}
      </div>

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
