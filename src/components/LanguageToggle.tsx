
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "de" : "en");
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2 text-sm font-medium transition-colors"
    >
      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-secondary">
        {language === "en" ? "EN" : "DE"}
      </span>
      <span className="hidden sm:inline-block">
        {language === "en" ? "English" : "Deutsch"}
      </span>
    </Button>
  );
};

export default LanguageToggle;
