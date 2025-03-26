
import { useLanguage } from "@/context/LanguageContext";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const LanguageSkills = () => {
  const { t, language } = useLanguage();
  const [animationComplete, setAnimationComplete] = useState(false);
  const isMobile = useIsMobile();

  // Reset animation state when language changes
  useEffect(() => {
    setAnimationComplete(false);
    
    // Trigger animation after short delay
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [language]);

  const languages = [
    {
      name: t("languages.arabic"),
      level: t("languages.native"),
      proficiency: 100,
      color: "bg-green-500",
      flag: "🇸🇦"
    },
    {
      name: t("languages.english"),
      level: t("languages.fluent"),
      proficiency: 90,
      color: "bg-blue-500",
      flag: "🇬🇧"
    },
    {
      name: t("languages.german"),
      level: t("languages.intermediate"),
      proficiency: 65,
      color: "bg-amber-500",
      flag: "🇩🇪"
    },
    {
      name: t("languages.french"),
      level: t("languages.beginner"),
      proficiency: 30,
      color: "bg-purple-500",
      flag: "🇫🇷"
    }
  ];

  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <section id="languages" className="py-16 bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/10 rounded-full filter blur-3xl"></div>
      
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="heading-lg mb-4 relative inline-block">
            {t("languages.title")}
            <span className="absolute -bottom-2 left-1/2 w-1/2 h-1 bg-gradient-to-r from-primary/40 to-primary/10 transform -translate-x-1/2 rounded-full"></span>
          </h2>
          <p className="paragraph max-w-2xl mx-auto">
            {t("languages.subtitle")}
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {languages.map((lang) => (
            <motion.div
              key={lang.name}
              variants={itemVariants}
              className="glass-card p-4 sm:p-6 hover:shadow-lg transition-all duration-300 border border-secondary/50"
            >
              <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{lang.flag}</span>
                  <h3 className="text-lg sm:text-xl font-semibold">{lang.name}</h3>
                </div>
                <Badge variant="secondary" className="text-xs sm:text-sm font-medium">
                  {lang.level}
                </Badge>
              </div>
              
              <div className="relative pt-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-xs font-semibold inline-block text-primary">
                      {animationComplete ? `${lang.proficiency}%` : "0%"}
                    </span>
                  </div>
                </div>
                <Progress 
                  value={animationComplete ? lang.proficiency : 0} 
                  className={`h-2 sm:h-3 rounded-xl overflow-hidden transition-all duration-1000 ease-out ${lang.color}`}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LanguageSkills;
