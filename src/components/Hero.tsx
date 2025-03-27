
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink } from "lucide-react";
import { usePersonalInfo } from "@/hooks/usePersonalInfo";
import { Skeleton } from "@/components/ui/skeleton";

const Hero = () => {
  const { t, language } = useLanguage();
  const { personalInfo, isLoading } = usePersonalInfo();

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative py-20 md:py-32 bg-secondary/5 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="section-container relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Text content */}
          <div className="md:w-1/2 text-center md:text-left">
            {isLoading ? (
              <>
                <Skeleton className="h-12 w-3/4 mb-4" />
                <Skeleton className="h-8 w-1/2 mb-6" />
                <Skeleton className="h-24 w-full mb-8" />
              </>
            ) : (
              <>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                  {personalInfo?.name || t("hero.title")}
                </h1>
                <h2 className="text-xl md:text-2xl font-medium text-muted-foreground mb-6">
                  {t("hero.subtitle")}
                </h2>
                <p className="paragraph mb-8 max-w-xl">
                  {language === "en" 
                    ? `Based in ${personalInfo?.current_location || "Berlin, Germany"}. ${personalInfo?.marital_status || ""}`
                    : `Wohnhaft in ${personalInfo?.current_location || "Berlin, Deutschland"}. ${personalInfo?.marital_status || ""}`
                  }
                </p>
              </>
            )}
            
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Button 
                onClick={scrollToContact} 
                size="lg" 
                className="px-6 hover:scale-105 transition-transform"
              >
                {t("hero.cta")}
              </Button>
              
              {!isLoading && personalInfo && (
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="lg"
                    className="group relative overflow-hidden"
                    asChild
                  >
                    <a 
                      href={language === 'en' ? personalInfo.cv_en : personalInfo.cv_de} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center transition-all"
                    >
                      <Download className="mr-2 h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                      <span>CV</span>
                    </a>
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="lg"
                    className="group relative overflow-hidden"
                    asChild
                  >
                    <a 
                      href={language === 'en' ? personalInfo.work_experience_en : personalInfo.work_experience_de} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center transition-all"
                    >
                      <ExternalLink className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                      <span>Work Experience</span>
                    </a>
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          {/* Profile image */}
          <div className="w-64 h-64 md:w-96 md:h-96 relative">
            {isLoading ? (
              <Skeleton className="w-full h-full rounded-full" />
            ) : (
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-background shadow-2xl">
                <img 
                  src={personalInfo?.profile_image_url || "https://placehold.co/400x400"} 
                  alt={personalInfo?.name || "Amjad Awad-Allah"} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
