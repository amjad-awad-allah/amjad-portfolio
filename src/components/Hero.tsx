
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Download, MapPin } from "lucide-react";
import { usePersonalInfo } from "@/hooks/use-supabase-data";
import { Skeleton } from "@/components/ui/skeleton";

const Hero = () => {
  const { t, language } = useLanguage();
  const { data: personalInfo, isLoading } = usePersonalInfo();

  return (
    <section id="home" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[40%] -right-[60%] w-[140%] h-[140%] rounded-full bg-gradient-to-br from-primary/5 via-primary/2 to-transparent blur-3xl"></div>
        <div className="absolute top-[60%] -left-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-br from-secondary/10 via-secondary/5 to-transparent blur-3xl"></div>
      </div>

      <div className="section-container">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Profile Image */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-64 h-64 flex-shrink-0"
          >
            {isLoading ? (
              <Skeleton className="rounded-full w-64 h-64" />
            ) : (
              <img
                src={personalInfo?.profile_image_url || "https://placehold.co/400"}
                alt={personalInfo?.name || "Profile"}
                className="w-full h-full object-cover rounded-full border-4 border-primary/10 shadow-xl"
              />
            )}
            
            <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-pulse-slow"></div>
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
                  className="flex items-center justify-center lg:justify-start gap-2 text-muted-foreground mb-8"
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
                  <Button asChild size="lg" className="group">
                    <a href="#contact">
                      {t("hero.cta")}
                    </a>
                  </Button>
                  
                  <Button asChild variant="outline" size="lg" className="group">
                    <a href={language === 'en' ? personalInfo?.cv_en : personalInfo?.cv_de} download>
                      <Download className="mr-2 h-4 w-4 group-hover:-translate-y-1 transition-transform" />
                      {language === 'en' ? 'Download CV' : 'Lebenslauf herunterladen'}
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
