
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { usePersonalInfo } from "@/hooks/use-supabase-data";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";

const LanguageSkills = () => {
  const { t, language } = useLanguage();
  const { data: personalInfo, isLoading } = usePersonalInfo();

  // Map language proficiency to percentage
  const getProficiencyPercentage = (level: string) => {
    const levels: Record<string, number> = {
      "Native": 100,
      "Muttersprache": 100,
      "Fluent": 90,
      "Fließend": 90,
      "Advanced": 80,
      "Fortgeschritten": 80,
      "Intermediate": 60,
      "Mittel": 60,
      "Basic": 40,
      "Grundkenntnisse": 40,
      "Beginner": 20,
      "Anfänger": 20,
    };
    
    return levels[level] || 50;
  };

  return (
    <section id="languages" className="relative">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-3">{t("languages.title")}</h2>
          <p className="paragraph max-w-2xl mx-auto">
            {t("languages.subtitle")}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {isLoading ? (
            <div className="space-y-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                  <Skeleton className="h-6 w-full" />
                </div>
              ))}
            </div>
          ) : personalInfo?.languages ? (
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.2 }}
              className="space-y-10"
            >
              {Object.entries(personalInfo.languages).map(([lang, level], index) => (
                <motion.div
                  key={lang}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">{lang}</h3>
                    <span className="text-sm text-muted-foreground">{level}</span>
                  </div>
                  <Progress value={getProficiencyPercentage(level)} className="h-3" />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <p className="text-center text-muted-foreground">No language data available</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default LanguageSkills;
