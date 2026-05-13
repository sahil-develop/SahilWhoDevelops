"use client";
import dynamic from "next/dynamic";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import SystemDesign from "@/components/SystemDesign";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";

const Cursor = dynamic(() => import("@/components/Cursor"), { ssr: false });

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <div style={{ borderTop: "1px solid var(--border)" }} />
        <About />
        <div style={{ borderTop: "1px solid var(--border)" }} />
        <Skills />
        <div style={{ borderTop: "1px solid var(--border)" }} />
        <Experience />
        <div style={{ borderTop: "1px solid var(--border)" }} />
        <Projects />
        <div style={{ borderTop: "1px solid var(--border)" }} />
        <SystemDesign />
        <div style={{ borderTop: "1px solid var(--border)" }} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
