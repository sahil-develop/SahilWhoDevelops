"use client";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); setTimeout(() => setVisible(false), 300); return 100; }
        return p + Math.random() * 15 + 5;
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, background: "var(--bg)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      zIndex: 10000, transition: "opacity 0.3s",
      opacity: progress >= 100 ? 0 : 1,
    }}>
      <div style={{
        fontFamily: "var(--font-mono)", fontSize: "16px",
        color: "var(--accent)", marginBottom: "32px", letterSpacing: "0.1em",
      }}>
        <span style={{ opacity: 0.5 }}>&lt;</span>sahil.b<span style={{ opacity: 0.5 }}> /&gt;</span>
      </div>

      <div style={{ width: "200px", height: "2px", background: "rgba(255,255,255,0.06)", borderRadius: "1px", overflow: "hidden" }}>
        <div style={{
          height: "100%", width: Math.min(progress, 100) + "%",
          background: "linear-gradient(90deg, var(--accent), var(--accent-2))",
          transition: "width 0.1s ease",
          boxShadow: "0 0 8px var(--accent)",
        }} />
      </div>

      <div style={{
        marginTop: "16px", fontFamily: "var(--font-mono)", fontSize: "14px",
        color: "var(--text-dim)", letterSpacing: "0.1em",
      }}>{Math.min(Math.floor(progress), 100)}%</div>
    </div>
  );
}
