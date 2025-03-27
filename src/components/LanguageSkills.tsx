
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { useLanguages } from "@/hooks/useLanguages";
import { Skeleton } from "@/components/ui/skeleton";

// Function to get the width percentage based on language proficiency
const getProgressWidth = (proficiency: string): string => {
  switch(proficiency.toLowerCase()) {
    case 'native':
    case 'muttersprache':
      return '100%';
    case 'fluent':
    case 'fließend':
      return '90%';
    case 'advanced':
    case 'fortgeschritten':
      return '80%';
    case 'upper intermediate':
    case 'gehobene mittelstufe':
      return '70%';
    case 'intermediate':
    case 'mittelstufe':
      return '60%';
    case 'lower intermediate':
    case 'untere mittelstufe':
      return '45%';
    case 'basic':
    case 'grundkenntnisse':
      return '30%';
    case 'beginner':
    case 'anfänger':
      return '20%';
    default:
      return '50%';
  }
};

// Function to get proficiency level label
const getProficiencyLabel = (proficiency: string, language: string): string => {
  const proficiencyLower = proficiency.toLowerCase();
  if (language === 'de') {
    if (proficiencyLower === 'native') return 'Muttersprache';
    if (proficiencyLower === 'fluent') return 'Fließend';
    if (proficiencyLower === 'advanced') return 'Fortgeschritten';
    if (proficiencyLower === 'upper intermediate') return 'Gehobene Mittelstufe';
    if (proficiencyLower === 'intermediate') return 'Mittelstufe';
    if (proficiencyLower === 'lower intermediate') return 'Untere Mittelstufe';
    if (proficiencyLower === 'basic') return 'Grundkenntnisse';
    if (proficiencyLower === 'beginner') return 'Anfänger';
    return proficiency;
  } else {
    return proficiency;
  }
};

const LanguageSkills = () => {
  const { t, language } = useLanguage();
  const { languages, isLoading } = useLanguages();

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
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
    <section id="languages" className="py-24 bg-primary/5">
      <div className="section-container">
        <motion.div
          className="max-w-3xl mx-auto mb-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="heading-lg mb-4" variants={itemVariants}>
            {t("languages.title")}
          </motion.h2>
          <motion.p className="paragraph" variants={itemVariants}>
            {t("languages.subtitle")}
          </motion.p>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {isLoading ? (
            // Loading skeleton
            Array(4).fill(0).map((_, index) => (
              <div key={index} className="mb-8">
                <div className="flex justify-between mb-2">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-5 w-24" />
                </div>
                <Skeleton className="h-6 w-full rounded-full" />
              </div>
            ))
          ) : (
            // Languages from database
            Object.entries(languages || {}).map(([langName, proficiency]) => (
              <motion.div key={langName} variants={itemVariants}>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{langName}</span>
                  <span className="text-muted-foreground text-sm">
                    {getProficiencyLabel(proficiency, language)}
                  </span>
                </div>
                <div className="h-3 w-full bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary"
                    style={{ width: getProgressWidth(proficiency) }}
                    initial={{ width: 0 }}
                    whileInView={{ width: getProgressWidth(proficiency) }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                  ></motion.div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default LanguageSkills;
