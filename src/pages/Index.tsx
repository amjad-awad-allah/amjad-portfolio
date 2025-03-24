
import { useEffect } from "react";
import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import LanguageSkills from "@/components/LanguageSkills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

// Debug mode with improved logging
const DEBUG_MODE = true;

const Index = () => {
  useEffect(() => {
    if (DEBUG_MODE) {
      console.log("%c🚀 Portfolio Debug Mode Enabled", "font-weight: bold; font-size: 14px; color: #8B5CF6;");
      
      // Enhanced performance monitoring
      const startTime = performance.now();
      
      // Add meta tags for SEO and improved sharing
      document.title = "Amjad Awad-Allah | Software Developer & AI Engineer";
      const metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      metaDescription.content = 'Professional portfolio of Amjad Awad-Allah, specializing in software development and AI engineering with expertise in Java, Kotlin, Python, and machine learning.';
      document.head.appendChild(metaDescription);

      // Open Graph data for better sharing
      const ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      ogTitle.content = 'Amjad Awad-Allah | Software Developer & AI Engineer';
      document.head.appendChild(ogTitle);

      const ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      ogDesc.content = 'Professional portfolio showcasing software development and AI engineering projects.';
      document.head.appendChild(ogDesc);
      
      // Keywords for better SEO
      const metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      metaKeywords.content = 'software developer, AI engineer, machine learning, Android development, Java, Kotlin, Python, React, artificial intelligence';
      document.head.appendChild(metaKeywords);
      
      return () => {
        const endTime = performance.now();
        console.log(`%c📊 Portfolio rendered in ${(endTime - startTime).toFixed(2)}ms`, "font-weight: bold; color: #10B981;");
        
        // Enhanced memory usage logging
        if (window.performance && (performance as any).memory) {
          const memoryInfo = (performance as any).memory;
          console.log(`%c📈 Memory Usage: ${(memoryInfo.usedJSHeapSize / (1024 * 1024)).toFixed(2)} MB / ${(memoryInfo.jsHeapSizeLimit / (1024 * 1024)).toFixed(2)} MB`, "color: #3B82F6;");
          console.log(`%c🧠 JS Heap Size: ${(memoryInfo.totalJSHeapSize / (1024 * 1024)).toFixed(2)} MB`, "color: #8B5CF6;");
        }
      };
    }
  }, []);

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-secondary/20">
        <div className="fixed inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none"></div>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <LanguageSkills />
          <Contact />
        </main>
        <Footer />
        <Toaster />
      </div>
    </LanguageProvider>
  );
};

export default Index;
