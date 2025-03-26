
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

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();
  const isMobile = useIsMobile();

  // Debug logging
  useEffect(() => {
    console.log("Current language:", language);
  }, [language]);

  const languages = [
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "de", label: "Deutsch", flag: "🇩🇪" },
  ];

  // Find current language details
  const currentLang = languages.find(lang => lang.code === language) || languages[0];

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
              <span className="hidden sm:inline-block">
                {currentLang.label}
              </span>
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
            onClick={() => setLanguage(lang.code as "en" | "de")}
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
