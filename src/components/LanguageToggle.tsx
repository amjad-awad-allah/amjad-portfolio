
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, AnimatePresence } from "framer-motion";

const LanguageToggle = () => {
  const { language, setLanguage, isReady } = useLanguage();
  const isMobile = useIsMobile();

  // Debug logging
  useEffect(() => {
    if (isReady) {
      console.log("Current language:", language);
    }
  }, [language, isReady]);

  const languages = [
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "de", label: "Deutsch", flag: "🇩🇪" },
  ];

  // Find current language details
  const currentLang = languages.find(lang => lang.code === language) || languages[0];

  const handleLanguageChange = (newLanguage: "en" | "de") => {
    if (newLanguage !== language) {
      // Animate page during language change
      document.documentElement.classList.add('language-transition');
      
      // Set the language after a slight delay to allow animation
      setTimeout(() => {
        setLanguage(newLanguage);
        document.documentElement.classList.remove('language-transition');
      }, 150);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`flex items-center gap-1 sm:gap-2 text-sm font-medium transition-colors hover:bg-secondary/30 ${isMobile ? 'px-1.5 h-9 w-9 rounded-md' : ''}`}
        >
          {isMobile ? (
            <Globe className="h-5 w-5 text-primary" />
          ) : (
            <>
              <Globe className="h-4 w-4" />
              <AnimatePresence mode="wait" initial={false}>
                <motion.span 
                  key={language}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="hidden sm:inline-block"
                >
                  {currentLang.label}
                </motion.span>
              </AnimatePresence>
              <span className="w-6 h-6 flex items-center justify-center rounded-full bg-secondary text-xs">
                {currentLang.flag}
              </span>
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={isMobile ? "center" : "end"} className="w-36 sm:w-48 animate-scale-in bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code as "en" | "de")}
            className={`flex items-center gap-3 cursor-pointer transition-colors hover:bg-secondary/50 ${
              language === lang.code ? "bg-secondary" : ""
            }`}
          >
            <span className="text-base">{lang.flag}</span>
            <span>{lang.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageToggle;
