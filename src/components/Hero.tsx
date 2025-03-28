
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Download, MapPin, Linkedin, Github, ChevronRight, Code, Cpu } from "lucide-react";
import { usePersonalInfo } from "@/hooks/use-supabase-data";
import { Skeleton } from "@/components/ui/skeleton";

const Hero = () => {
  const { t, language } = useLanguage();
  const { data: personalInfo, isLoading } = usePersonalInfo();

  // Tech icons with pulse animation
  const techIcons = [
    { top: "15%", right: "10%", size: 16, animationDelay: "0s" },
    { top: "75%", left: "8%", size: 14, animationDelay: "1.5s" },
    { bottom: "20%", right: "15%", size: 12, animationDelay: "3s" },
  ];

  // Background code elements for animation
  const codeElements = [
    { symbol: "{}", delay: 0.5, size: 24, top: "10%", left: "5%" },
    { symbol: "</>", delay: 1.0, size: 20, top: "70%", left: "15%" },
    { symbol: "01", delay: 1.5, size: 18, top: "30%", left: "85%" },
    { symbol: "[]", delay: 2.0, size: 22, top: "80%", left: "80%" },
    { symbol: "=>", delay: 2.5, size: 26, top: "15%", left: "70%" },
  ];

  // Skill labels that will appear around the profile image
  const skillLabels = [
    { text: "AI Engineer", rotate: 0, delay: 0.1, position: "top-0 -translate-y-12" },
    { text: "Machine Learning", rotate: 0, delay: 0.3, position: "right-0 translate-x-10" },
    { text: "Full Stack Developer", rotate: 0, delay: 0.4, position: "bottom-0 translate-y-8" },
  ];

  return (
    <section id="home" className="py-24 md:py-32 relative overflow-hidden bg-[#080f16]">
      {/* Dark background matching the image */}
      <div className="absolute inset-0 -z-10 bg-[#080f16]"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Animated code symbols */}
        {codeElements.map((item, index) => (
          <motion.div 
            key={index}
            className="absolute font-mono text-blue-500/20 dark:text-blue-400/15 pointer-events-none"
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

        {/* Tech icons with pulse animation */}
        {techIcons.map((icon, index) => (
          <div
            key={`tech-icon-${index}`}
            className="absolute pointer-events-none"
            style={{
              top: icon.top || "auto",
              right: icon.right || "auto",
              bottom: icon.bottom || "auto",
              left: icon.left || "auto",
            }}
          >
            <motion.div
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                delay: index * 1.5
              }}
            >
              <Cpu 
                className="text-blue-500/30 dark:text-blue-400/30"
                size={icon.size}
              />
            </motion.div>
          </div>
        ))}

        {/* Additional binary patterns */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`binary-${i}`}
              className="absolute font-mono text-blue-500/10 dark:text-blue-400/15 text-xs"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0.01, 0.08, 0.01], 
              }}
              transition={{
                duration: 3 + Math.random() * 5,
                repeat: Infinity,
                repeatType: "reverse",
                delay: Math.random() * 2,
              }}
            >
              {[...Array(10)].map((_, j) => (
                <div key={j}>{Math.random() > 0.5 ? '1' : '0'}</div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          {/* Content - Positioned on the left side per design */}
          <div className="text-center lg:text-left lg:w-1/2">
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
                {/* Software Developer & AI Engineer label */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center px-3 py-1.5 rounded-full bg-gray-800/70 border border-gray-700/50 mb-6"
                >
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm text-gray-300">Software Developer & AI Engineer</span>
                </motion.div>
                
                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
                >
                  {personalInfo?.name || "Amjad Awad-Allah"}
                </motion.h1>
                
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-6 max-w-2xl"
                >
                  Passionate about creating intuitive, efficient applications and AI solutions that deliver exceptional user experiences. Specialized in software development with a focus on AI engineering, machine learning, and clean architecture.
                </motion.div>
                
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex items-center justify-center lg:justify-start gap-2 text-gray-400 mb-8"
                >
                  <MapPin className="h-4 w-4" />
                  <span>{personalInfo?.current_location || "Location"}</span>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex flex-wrap justify-center lg:justify-start gap-4"
                >
                  <Button asChild size="lg" className="bg-white text-[#080f16] hover:bg-gray-200 group">
                    <a href="#contact">
                      {language === 'de' ? 'Kontakt aufnehmen' : 'Contact Me'} 
                      <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                  
                  <Button asChild variant="outline" size="lg" className="border-gray-700 text-white hover:bg-gray-800/70 group">
                    <a href="#downloads">
                      <Download className="mr-2 h-4 w-4 group-hover:-translate-y-1 transition-transform" />
                      {language === 'de' ? 'Download CV' : 'Download CV'}
                    </a>
                  </Button>
                </motion.div>
              </>
            )}
          </div>

          {/* Profile Image - Positioned on the right side per design */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-64 h-64 lg:w-80 lg:h-80 flex-shrink-0 mt-10 lg:mt-0"
          >
            {isLoading ? (
              <Skeleton className="rounded-full w-full h-full" />
            ) : (
              <>
                <img
                  src={personalInfo?.profile_image_url || "/lovable-uploads/991c3f58-2d55-4c28-865f-e2e9eadb9c1e.png"}
                  alt={personalInfo?.name || "Profile"}
                  className="w-full h-full object-cover rounded-full border-4 border-gray-800"
                />
                
                {/* Skill labels around the profile image */}
                {skillLabels.map((label, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: label.delay, duration: 0.5 }}
                    className={`absolute px-3 py-1.5 bg-gray-800/90 text-xs text-white font-medium 
                               shadow-lg rounded-md border border-gray-700 flex items-center whitespace-nowrap ${label.position}`}
                  >
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                    {label.text}
                  </motion.div>
                ))}
                
                {/* Digital circuit pattern overlay */}
                <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                  <div className="w-full h-full bg-circuit-pattern opacity-10"></div>
                </div>

                {/* Social Media Links */}
                <div className="absolute -right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3">
                  {personalInfo?.github_url && (
                    <motion.a 
                      href={personalInfo.github_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-gray-800/90 p-2.5 rounded-full text-gray-300 hover:text-white border border-gray-700 hover:border-gray-600 transition-colors"
                      aria-label="GitHub Profile"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="h-5 w-5" />
                    </motion.a>
                  )}
                  
                  {personalInfo?.linkedin_url && (
                    <motion.a 
                      href={personalInfo.linkedin_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-gray-800/90 p-2.5 rounded-full text-gray-300 hover:text-white border border-gray-700 hover:border-gray-600 transition-colors"
                      aria-label="LinkedIn Profile"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Linkedin className="h-5 w-5" />
                    </motion.a>
                  )}
                </div>
              </>
            )}
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
        >
          <span className="text-gray-500 text-sm mb-2">Scroll</span>
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-gray-600 flex justify-center pt-1"
          >
            <motion.div 
              animate={{ height: [6, 10, 6] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 rounded-full bg-gray-500"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
