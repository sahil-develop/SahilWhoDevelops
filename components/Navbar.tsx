"use client";
import { useEffect, useState } from "react";

const links = ["About","Skills","Experience","Projects","Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scroll = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 900,
      padding: "16px 40px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(2,4,8,0.9)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      transition: "all 0.4s ease",
    }}>
      <div style={{
        fontFamily: "var(--font-mono)", fontSize: "14px",
        color: "var(--accent)", letterSpacing: "0.1em",
      }}>
        <span style={{ opacity: 0.5 }}>&lt;</span>
        sahil.b
        <span style={{ opacity: 0.5 }}> /&gt;</span>
      </div>

      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        {links.map(l => (
          <button key={l} onClick={() => scroll(l)}
            style={{
              background: "none", border: "none", cursor: "none",
              fontFamily: "var(--font-mono)", fontSize: "15px",
              color: active === l ? "var(--accent)" : "var(--text-muted)",
              padding: "8px 14px", borderRadius: "4px",
              transition: "all 0.2s",
              letterSpacing: "0.05em",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--accent)")}
            onMouseLeave={e => (e.currentTarget.style.color = active === l ? "var(--accent)" : "var(--text-muted)")}
          >{l}</button>
        ))}
        <a href="https://github.com/sahil-develop" target="_blank" rel="noopener"
          style={{
            marginLeft: "8px", padding: "8px 18px",
            background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.25)",
            borderRadius: "4px", color: "var(--accent)", fontSize: "15px",
            fontFamily: "var(--font-mono)", textDecoration: "none",
            transition: "all 0.2s",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "rgba(0,212,255,0.2)";
            e.currentTarget.style.boxShadow = "0 0 20px rgba(0,212,255,0.2)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "rgba(0,212,255,0.08)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >GitHub</a>
      </div>
    </nav>
  );
}
