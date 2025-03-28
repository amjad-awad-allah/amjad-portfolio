
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Download, MapPin, Linkedin, Github, Cpu, Code, BrainCircuit, Globe } from "lucide-react";
import { usePersonalInfo } from "@/hooks/use-supabase-data";
import { Skeleton } from "@/components/ui/skeleton";

const Hero = () => {
  const { t, language } = useLanguage();
  const { data: personalInfo, isLoading } = usePersonalInfo();

  // Labels that will appear around the profile image
  const skillLabels = [
    { icon: <Cpu className="h-3.5 w-3.5 mr-1" />, text: "AI Engineer", rotate: -45, delay: 0.1 },
    { icon: <BrainCircuit className="h-3.5 w-3.5 mr-1" />, text: "Machine Learning", rotate: 0, delay: 0.2 },
    { icon: <Code className="h-3.5 w-3.5 mr-1" />, text: "Full Stack Developer", rotate: 45, delay: 0.3 },
    { icon: <Globe className="h-3.5 w-3.5 mr-1" />, text: "Software Architect", rotate: 90, delay: 0.4 },
  ];

  // Background code elements for animation
  const codeElements = [
    { symbol: "{}", delay: 0.5, size: 24, top: "10%", left: "5%" },
    { symbol: "</>", delay: 1.0, size: 20, top: "70%", left: "15%" },
    { symbol: "01", delay: 1.5, size: 18, top: "30%", left: "85%" },
    { symbol: "[]", delay: 2.0, size: 22, top: "80%", left: "80%" },
    { symbol: "=>", delay: 2.5, size: 26, top: "15%", left: "70%" },
    { symbol: "if()", delay: 3.0, size: 16, top: "60%", left: "10%" },
  ];

  return (
    <section id="home" className="py-24 md:py-32 relative overflow-hidden">
      {/* Enhanced background elements with AI/code patterns */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[40%] -right-[60%] w-[140%] h-[140%] rounded-full bg-gradient-to-br from-primary/5 via-primary/2 to-transparent blur-3xl"></div>
        <div className="absolute top-[60%] -left-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-br from-secondary/10 via-secondary/5 to-transparent blur-3xl"></div>
        
        {/* Added code pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
        
        {/* Animated digital circuit lines */}
        <div className="absolute inset-0 circuit-pattern opacity-5"></div>

        {/* Animated code symbols */}
        {codeElements.map((item, index) => (
          <motion.div 
            key={index}
            className="absolute font-mono text-primary/10 pointer-events-none"
            style={{ 
              top: item.top, 
              left: item.left, 
              fontSize: item.size 
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: [0.2, 0.5, 0.2], 
              y: [0, -10, 0]
            }}
            transition={{ 
              delay: item.delay,
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            {item.symbol}
          </motion.div>
        ))}
      </div>

      <div className="section-container">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Enhanced Profile Image with surrounding labels */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-64 h-64 flex-shrink-0"
          >
            {isLoading ? (
              <Skeleton className="rounded-full w-64 h-64" />
            ) : (
              <>
                <img
                  src={personalInfo?.profile_image_url || "https://placehold.co/400"}
                  alt={personalInfo?.name || "Profile"}
                  className="w-full h-full object-cover rounded-full border-4 border-primary/20 shadow-xl"
                />
                
                {/* Pulsing border effect */}
                <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-pulse-slow"></div>
                
                {/* AI/Coding skill labels around the profile image */}
                {skillLabels.map((label, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: label.delay, duration: 0.5 }}
                    className="absolute bg-white/80 dark:bg-secondary/80 py-1.5 px-3 text-xs font-medium flex items-center shadow-lg rounded-md border border-primary/20"
                    style={{
                      transform: `rotate(${label.rotate}deg) translateX(${label.rotate === 0 ? '-50%' : '0'})`,
                      // Position based on rotation
                      ...(label.rotate === -45 && { top: '5%', left: '-15%' }),
                      ...(label.rotate === 0 && { bottom: '-8%', left: '50%' }),
                      ...(label.rotate === 45 && { top: '5%', right: '-15%' }),
                      ...(label.rotate === 90 && { top: '50%', right: '-20%' }),
                    }}
                  >
                    {label.icon}
                    <span className="text-foreground">{label.text}</span>
                  </motion.div>
                ))}
                
                {/* Digital circuit pattern overlay on profile image */}
                <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                  <div className="w-full h-full bg-circuit-pattern opacity-10"></div>
                </div>
              </>
            )}
          </motion.div>

          {/* Content */}
          <div className="text-center lg:text-left">
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-10 w-64 mx-auto lg:mx-0" />
                <Skeleton className="h-5 w-48 mx-auto lg:mx-0" />
                <Skeleton className="h-4 w-56 mx-auto lg:mx-0" />
                <div className="mt-4">
                  <Skeleton className="h-10 w-32 mx-auto lg:mx-0" />
                </div>
              </div>
            ) : (
              <>
                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="heading-xl mb-3"
                >
                  {personalInfo?.name || t("hero.title")}
                </motion.h1>
                
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-xl sm:text-2xl md:text-3xl font-normal text-muted-foreground mb-6 leading-relaxed"
                >
                  {t("hero.subtitle")}
                </motion.div>
                
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex items-center justify-center lg:justify-start gap-2 text-muted-foreground mb-4"
                >
                  <MapPin className="h-4 w-4" />
                  <span>{personalInfo?.current_location || "Location"}</span>
                </motion.div>

                {/* Social Media Links - Enhanced with animations */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.35 }}
                  className="flex items-center justify-center lg:justify-start gap-4 mb-8"
                >
                  {personalInfo?.linkedin_url && (
                    <motion.a 
                      href={personalInfo.linkedin_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors p-3 rounded-full hover:bg-primary/10 border border-primary/20"
                      aria-label="LinkedIn Profile"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Linkedin className="h-5 w-5" />
                    </motion.a>
                  )}
                  
                  {personalInfo?.github_url && (
                    <motion.a 
                      href={personalInfo.github_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors p-3 rounded-full hover:bg-primary/10 border border-primary/20"
                      aria-label="GitHub Profile"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="h-5 w-5" />
                    </motion.a>
                  )}
                </motion.div>
                
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex flex-wrap justify-center lg:justify-start gap-4"
                >
                  <Button asChild size="lg" className="group relative overflow-hidden">
                    <a href="#contact">
                      <span className="relative z-10">{t("hero.cta")}</span>
                      <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    </a>
                  </Button>
                  
                  <Button asChild variant="outline" size="lg" className="group relative overflow-hidden">
                    <a href="#downloads">
                      <span className="relative z-10 flex items-center">
                        <Download className="mr-2 h-4 w-4 group-hover:-translate-y-1 transition-transform" />
                        {language === 'en' ? 'View Downloads' : 'Downloads anzeigen'}
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-secondary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    </a>
                  </Button>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
