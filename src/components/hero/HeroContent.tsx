
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { SocialLinks } from "./SocialLinks";
import { ActionButtons } from "./ActionButtons";
import { useStaticContent } from "@/hooks/use-static-content";
import { useLanguage } from "@/context/LanguageContext";

type HeroContentProps = {
  isLoading: boolean;
  personalInfo?: {
    name?: string;
    current_location?: string;
    linkedin_url?: string;
    github_url?: string;
    xing_url?: string;
    indeed_url?: string;
  };
};

export const HeroContent = ({ isLoading, personalInfo }: HeroContentProps) => {
  const { getText } = useStaticContent('hero');
  const { t } = useLanguage();
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-64 mx-auto md:mx-0" />
        <Skeleton className="h-5 w-48 mx-auto md:mx-0" />
        <Skeleton className="h-4 w-56 mx-auto md:mx-0" />
        <div className="mt-4">
          <Skeleton className="h-10 w-32 mx-auto md:mx-0" />
        </div>
      </div>
    );
  }
  
  return (
    <>
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="heading-xl mb-3"
      >
        {personalInfo?.name || getText('title', 'Amjad Awad-Allah')}
      </motion.h1>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-xl sm:text-2xl md:text-3xl font-normal text-muted-foreground mb-6 leading-relaxed"
      >
        {getText('description', t("hero.subtitle"))}
      </motion.div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground mb-4"
      >
        <MapPin className="h-4 w-4" />
        <span>{personalInfo?.current_location || "Location"}</span>
      </motion.div>
      
      <SocialLinks
        linkedinUrl={personalInfo?.linkedin_url}
        githubUrl={personalInfo?.github_url}
        xingUrl={personalInfo?.xing_url}
        indeedUrl={personalInfo?.indeed_url}
      />
      
      <ActionButtons />
    </>
  );
};
