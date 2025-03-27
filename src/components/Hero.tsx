import { useLanguage } from "@/context/LanguageContext";
import { ChevronDown, Code, Terminal, Cpu, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Hero = () => {
  const { t } = useLanguage();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  // Function to handle CV download button click
  const handleCVButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Scroll to contact section
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
      
      // Find the download files section and highlight it with animation
      setTimeout(() => {
        const contactCards = document.querySelectorAll('.contact-animation-trigger');
        if (contactCards.length) {
          contactCards.forEach(card => {
            card.classList.add('contact-animation-active');
            
            // Remove the animation classes after animation completes
            setTimeout(() => {
              card.classList.remove('contact-animation-active');
            }, 3500);
          });
        }
      }, 800); // Give time for the scroll to complete
    }
  };

  const technicalTerms = ["AI", "Neural Networks", "Machine Learning", "TensorFlow", "Data Science", "Python", "Java", "Kotlin", "React"];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted"></div>
        
        {/* Animated code-like elements in background */}
        <div className="absolute top-1/4 left-8 text-primary/5 text-4xl">
          <Terminal className="h-16 w-16 animate-pulse" />
        </div>
        <div className="absolute bottom-1/4 right-8 text-primary/5 text-4xl">
          <Code className="h-16 w-16 animate-pulse" />
        </div>
        <div className="absolute top-3/4 left-1/4 text-primary/5 text-4xl">
          <Cpu className="h-16 w-16 animate-pulse" />
        </div>
        
        {/* Code elements animation */}
        <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
          <div className="code-matrix h-full w-full">
            {Array.from({ length: 20 }).map((_, i) => (
              <div 
                key={i}
                className="absolute text-primary font-mono text-sm"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `matrix-fall ${Math.random() * 10 + 15}s linear infinite`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              >
                {Math.random() > 0.5 ? '1' : '0'}
              </div>
            ))}
          </div>
        </div>
        
        {/* Floating technical terms */}
        <div className="hidden lg:block">
          {technicalTerms.map((term, index) => (
            <div 
              key={term}
              className="absolute text-primary/5 font-mono"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 1 + 0.8}rem`,
                opacity: 0.1,
                animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
                animationDelay: `${index * 0.5}s`
              }}
            >
              {term}
            </div>
          ))}
        </div>
      </div>
      
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 z-10">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center mb-4 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
            >
              <span className="animate-pulse mr-2 h-2 w-2 rounded-full bg-primary"></span>
              Software Developer & AI Engineer
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="heading-xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 dark:from-gray-100 dark:to-gray-400"
            >
              {t("hero.title")}
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="paragraph max-w-xl mb-8"
            >
              Passionate about creating intuitive, efficient applications and AI solutions that deliver exceptional user experiences. Specialized in software development with a focus on AI engineering, machine learning, and clean architecture.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button asChild size="lg" className="rounded-full group transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
                <a href="#contact" className="flex items-center">
                  {t("hero.cta")}
                  <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="rounded-full hover:bg-primary/5">
                <a href="#projects">{t("nav.projects")}</a>
              </Button>
              
              <Button 
                variant="secondary" 
                size="lg" 
                className="rounded-full group hover:bg-secondary/90 transition-all"
                onClick={handleCVButtonClick}
              >
                <Download className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Download CV
              </Button>
            </motion.div>
          </div>
          
          <motion.div 
            variants={itemVariants}
            className="hidden lg:flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-primary/30 to-secondary/30 blur opacity-70 animate-pulse"></div>
              <div className="profile-image relative rounded-full w-80 h-80 overflow-hidden border-4 border-background shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                  alt="Amjad Awad-Allah"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Tech info tags */}
              <div className="absolute -right-4 top-5 bg-background/80 backdrop-blur-sm py-1 px-3 rounded-full text-xs font-medium border border-primary/30 shadow-sm">
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span> AI Engineer
                </span>
              </div>
              <div className="absolute -left-4 bottom-16 bg-background/80 backdrop-blur-sm py-1 px-3 rounded-full text-xs font-medium border border-primary/30 shadow-sm">
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span> Machine Learning
                </span>
              </div>
              <div className="absolute right-5 -bottom-2 bg-background/80 backdrop-blur-sm py-1 px-3 rounded-full text-xs font-medium border border-primary/30 shadow-sm">
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-500"></span> Full Stack Developer
                </span>
              </div>
              
              {/* Code animation overlay */}
              <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-primary/30 to-secondary/30"></div>
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-primary/10 to-transparent"></div>
                <div className="absolute inset-0 blueprint-grid opacity-20"></div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.a
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        href="#about"
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-sm font-medium"
      >
        <span className="mb-2 opacity-70">Scroll</span>
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </motion.a>
    </section>
  );
};

export default Hero;
