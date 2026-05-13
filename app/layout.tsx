import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sahil B — Backend Engineer",
  description: "Senior Backend Engineer specializing in scalable systems, microservices, and cloud infrastructure.",
  keywords: ["backend engineer", "Node.js", "NestJS", "AWS", "microservices", "TypeScript"],
  openGraph: {
    title: "Sahil B — Backend Engineer",
    description: "Building scalable systems that power the future.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>{children}</body>
    </html>
  );
}
