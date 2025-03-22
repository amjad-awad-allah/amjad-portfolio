
import { useLanguage } from "@/context/LanguageContext";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted z-0"></div>
      
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left appear-1">
            <div className="inline-flex items-center mb-4 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <span className="animate-pulse mr-2 h-2 w-2 rounded-full bg-primary"></span>
              Android Developer
            </div>
            
            <h1 className="heading-xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400">
              {t("hero.title")}
            </h1>
            
            <p className="paragraph max-w-xl mb-8">
              Passionate about creating intuitive, efficient mobile applications that deliver exceptional user experiences. Specialized in Android development with a focus on performance optimization and clean architecture.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="rounded-full">
                <a href="#contact">{t("hero.cta")}</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <a href="#projects">{t("nav.projects")}</a>
              </Button>
            </div>
          </div>
          
          <div className="hidden lg:flex justify-center lg:justify-end appear-2">
            <div className="relative">
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 blur opacity-70"></div>
              <div className="profile-image relative rounded-full w-80 h-80 overflow-hidden border-4 border-background shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                  alt="Amjad Awad-Allah"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-sm font-medium appear-3"
      >
        <span className="mb-2 opacity-70">Scroll</span>
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </a>
    </section>
  );
};

export default Hero;
