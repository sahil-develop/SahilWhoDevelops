"use client";
import { useEffect, useRef, useState } from "react";

const ROLES = ["Backend Developer", "Cloud Engineer", "API Architect", "Microservices Engineer"];

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    let mouse = { x: W / 2, y: H / 2 };

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    const onMouse = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouse);

    const PARTICLE_COUNT = 80;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Grid
      ctx.strokeStyle = "rgba(0,212,255,0.03)";
      ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 60) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y < H; y += 60) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      // Connections
      particles.forEach((p, i) => {
        particles.slice(i + 1).forEach(q => {
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 120) {
            ctx.strokeStyle = `rgba(0,212,255,${0.08 * (1 - d / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        });
        // Mouse connection
        const dm = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (dm < 150) {
          ctx.strokeStyle = `rgba(0,212,255,${0.15 * (1 - dm / 150)})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
      });

      // Particles
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,212,255,${p.alpha})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouse);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, zIndex: 0 }} />;
}

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    const target = ROLES[roleIdx];
    if (typing) {
      if (charIdx < target.length) {
        const t = setTimeout(() => {
          setDisplayed(target.slice(0, charIdx + 1));
          setCharIdx(c => c + 1);
        }, 60);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 1800);
        return () => clearTimeout(t);
      }
    } else {
      if (charIdx > 0) {
        const t = setTimeout(() => {
          setDisplayed(target.slice(0, charIdx - 1));
          setCharIdx(c => c - 1);
        }, 35);
        return () => clearTimeout(t);
      } else {
        setRoleIdx(i => (i + 1) % ROLES.length);
        setTyping(true);
      }
    }
  }, [typing, charIdx, roleIdx]);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" style={{
      position: "relative", height: "100vh", display: "flex",
      alignItems: "center", justifyContent: "center", overflow: "hidden",
    }}>
      <ParticleCanvas />

      {/* Radial glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "600px", height: "600px",
        background: "radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 1,
      }} />
      <div style={{
        position: "absolute", top: "30%", right: "20%",
        width: "300px", height: "300px",
        background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 1,
      }} />

      <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 24px" }}>
        {/* Status badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          padding: "6px 16px",
          background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)",
          borderRadius: "100px", marginBottom: "12px",
          fontFamily: "var(--font-mono)", fontSize: "14px", color: "#10b981",
          letterSpacing: "0.1em",
        }}>
          <span style={{
            width: "6px", height: "6px", borderRadius: "50%",
            background: "#10b981", boxShadow: "0 0 8px #10b981",
            animation: "blink 1.5s ease infinite",
          }} />
          OPEN TO WORK
        </div>

        {/* Location badge */}
        <div style={{ marginBottom: "32px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            padding: "4px 14px",
            background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.15)",
            borderRadius: "100px",
            fontFamily: "var(--font-mono)", fontSize: "16px", color: "var(--text-dim)",
            letterSpacing: "0.08em",
          }}>
            <span style={{ color: "var(--accent)" }}>📍</span>
            Remote &nbsp;·&nbsp; Delhi &nbsp;·&nbsp; Gurugram &nbsp;·&nbsp; All India
          </div>
        </div>

        {/* Name */}
        <h1 style={{
          fontFamily: "var(--font-display)", fontSize: "clamp(48px, 8vw, 96px)",
          fontWeight: 800, lineHeight: 1.05, marginBottom: "16px",
          letterSpacing: "-0.02em",
        }}>
          <span style={{ color: "var(--text)" }}>Sahil </span>
          <span className="gradient-text">B.</span>
        </h1>

        {/* Typing role */}
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: "clamp(16px, 2.5vw, 22px)",
          color: "var(--text-muted)", marginBottom: "32px", height: "32px",
          display: "flex", alignItems: "center", justifyContent: "center", gap: "0",
        }}>
          <span style={{ color: "var(--accent)", marginRight: "8px" }}>// </span>
          <span>{displayed}</span>
          <span style={{ color: "var(--accent)", animation: "blink 0.8s step-end infinite" }}>|</span>
        </div>

        {/* Tagline */}
        <p style={{
          maxWidth: "520px", margin: "0 auto 48px",
          fontFamily: "var(--font-body)", fontSize: "14px",
          color: "var(--text-muted)", lineHeight: 1.8,
          letterSpacing: "0.02em",
        }}>
          Building resilient backend systems, distributed architectures,<br />
          and cloud infrastructure for 3+ years.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => scrollTo("projects")}
            style={{
              padding: "14px 32px", cursor: "none",
              background: "var(--accent)", color: "#000",
              border: "none", borderRadius: "4px",
              fontFamily: "var(--font-mono)", fontSize: "16px", fontWeight: 700,
              letterSpacing: "0.05em", transition: "all 0.3s ease",
              boxShadow: "0 0 20px rgba(0,212,255,0.3)",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = "0 0 40px rgba(0,212,255,0.5)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = "0 0 20px rgba(0,212,255,0.3)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >View Projects</button>

          <button onClick={() => scrollTo("contact")}
            style={{
              padding: "14px 32px", cursor: "none",
              background: "transparent", color: "var(--text)",
              border: "1px solid var(--border-1)", borderRadius: "4px",
              fontFamily: "var(--font-mono)", fontSize: "16px",
              letterSpacing: "0.05em", transition: "all 0.3s ease",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "var(--accent)";
              e.currentTarget.style.color = "var(--accent)";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(0,212,255,0.1)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "var(--border-1)";
              e.currentTarget.style.color = "var(--text)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >Contact Me</button>
        </div>

        {/* Social links */}
        <div style={{ display: "flex", gap: "24px", justifyContent: "center", marginTop: "48px" }}>
          {[
            { label: "github.com/sahil-develop", href: "https://github.com/sahil-develop" },
            { label: "linkedin.com/in/sahil-b", href: "https://linkedin.com/in/sahil-b-4586b310a" },
          ].map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener"
              style={{
                fontFamily: "var(--font-mono)", fontSize: "14px",
                color: "var(--text-dim)", textDecoration: "none",
                letterSpacing: "0.05em", transition: "color 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--accent)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-dim)")}
            >{s.label}</a>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: "40px", left: "50%",
        transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", zIndex: 2,
      }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "16px", color: "var(--text-dim)", letterSpacing: "0.2em" }}>SCROLL</span>
        <div style={{
          width: "1px", height: "48px",
          background: "linear-gradient(180deg, var(--accent), transparent)",
          animation: "float 2s ease-in-out infinite",
        }} />
      </div>
    </section>
  );
}
