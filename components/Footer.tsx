export default function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid var(--border)", padding: "40px",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      maxWidth: "1100px", margin: "0 auto",
    }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: "14px", color: "var(--text-dim)" }}>
        <span style={{ color: "var(--accent)" }}>&lt;</span>
        sahil.b
        <span style={{ color: "var(--accent)" }}> /&gt;</span>
        <span style={{ marginLeft: "12px" }}>© 2024</span>
      </div>
      <div style={{ display: "flex", gap: "24px" }}>
        {[
          { label: "GitHub", href: "https://github.com/sahil-develop" },
          { label: "LinkedIn", href: "https://linkedin.com/in/sahil-b-4586b310a" },
        ].map(s => (
          <a key={s.label} href={s.href} target="_blank" rel="noopener"
            style={{
              fontFamily: "var(--font-mono)", fontSize: "14px",
              color: "var(--text-dim)", textDecoration: "none",
              transition: "color 0.2s", letterSpacing: "0.05em",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--accent)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--text-dim)")}
          >{s.label}</a>
        ))}
      </div>
    </footer>
  );
}
