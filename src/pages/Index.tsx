
import { useEffect } from "react";
import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Debug mode flag
const DEBUG_MODE = true;

const Index = () => {
  useEffect(() => {
    if (DEBUG_MODE) {
      console.log("Debug mode enabled");
      console.log("Portfolio initialized");
      
      // Performance monitoring
      const startTime = performance.now();
      
      return () => {
        const endTime = performance.now();
        console.log(`Portfolio rendered in ${(endTime - startTime).toFixed(2)}ms`);
      };
    }
  }, []);

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
