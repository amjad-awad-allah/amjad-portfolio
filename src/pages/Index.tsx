
import { useEffect } from "react";
import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import LanguageSkills from "@/components/LanguageSkills";
import Hobbies from "@/components/Hobbies";
import Contact from "@/components/Contact";
import Downloads from "@/components/Downloads";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { useIsMobile } from "@/hooks/use-mobile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

// Debug mode with improved logging
const DEBUG_MODE = true;

const Index = () => {
  const isMobile = useIsMobile();

  useEffect(() => {
    if (DEBUG_MODE) {
      console.log("%c🚀 Portfolio Debug Mode Enabled", "font-weight: bold; font-size: 14px; color: #005F73;");
      console.log("%c📱 Mobile view:", isMobile ? "Yes" : "No");
      
      // Enhanced performance monitoring
      const startTime = performance.now();
      
      // Add meta tags for SEO and improved sharing
      document.title = "Amjad Awad-Allah | Software Developer & AI Specialist";
      const metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      metaDescription.content = 'Professional portfolio of Amjad Awad-Allah, specializing in software development, AI, and mobile app development with expertise in Java, Kotlin, and Python.';
      document.head.appendChild(metaDescription);

      // Add viewport meta tag for responsive design
      const viewport = document.querySelector('meta[name="viewport"]');
      if (!viewport) {
        const viewportMeta = document.createElement('meta');
        viewportMeta.name = 'viewport';
        viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
        document.head.appendChild(viewportMeta);
      }

      // Open Graph data for better sharing
      const ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      ogTitle.content = 'Amjad Awad-Allah | Software Developer & AI Specialist';
      document.head.appendChild(ogTitle);

      const ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      ogDesc.content = 'Professional portfolio showcasing software development and AI projects.';
      document.head.appendChild(ogDesc);
      
      // Keywords for better SEO
      const metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      metaKeywords.content = 'software developer, AI specialist, mobile app developer, Android development, Java, Kotlin, Python, React, machine learning';
      document.head.appendChild(metaKeywords);
      
      // Log Supabase connection
      console.log("%c📊 Connecting to Supabase database...", "font-weight: bold; color: #10B981;");
      
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
  }, [isMobile]);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-primary/5 code-background">
          <div className="fixed inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none"></div>
          <Navbar />
          <main className="mt-16 sm:mt-20">
            <Hero />
            <About />
            <Experience />
            <Projects />
            <LanguageSkills />
            <Hobbies />
            <Downloads />
            <Contact />
          </main>
          <Footer />
          <Toaster />
        </div>
      </LanguageProvider>
      {DEBUG_MODE && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
};

export default Index;
