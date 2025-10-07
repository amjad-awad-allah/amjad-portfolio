
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePersonalInfo } from "@/hooks/use-supabase-data";
import { Skeleton } from "@/components/ui/skeleton";
import { useStaticContent } from "@/hooks/use-static-content";

const Downloads = () => {
  const { language } = useLanguage();
  const { data: personalInfo, isLoading } = usePersonalInfo();
  const { getText } = useStaticContent('downloads');

  return (
    <section id="downloads" className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-grid-pattern opacity-[0.02]"></div>
      
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-3">{getText('title', 'Downloads')}</h2>
          <p className="paragraph max-w-2xl mx-auto">
            {getText('description', 'Download my CV and work experience documents in your preferred language.')}
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          {/* CV Downloads */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="glass-card p-6 rounded-xl shadow-sm"
          >
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-6 w-6 text-primary" />
              <h3 className="text-lg font-semibold">
                {getText('cv_title', language === 'en' ? 'Curriculum Vitae (CV)' : 'Lebenslauf')}
              </h3>
            </div>
            
            <p className="text-sm text-muted-foreground mb-6">
              {getText('cv_description', 'Download my CV containing my education, skills, and professional background.')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              {isLoading ? (
                <>
                  <Skeleton className="h-10 w-full sm:w-1/2" />
                  <Skeleton className="h-10 w-full sm:w-1/2" />
                </>
              ) : (
                <>
                  {personalInfo?.cv_en && (
                    <Button asChild variant="default" className="w-full sm:w-auto group">
                      <a href={personalInfo.cv_en} download>
                        <Download className="mr-2 h-4 w-4 group-hover:-translate-y-1 transition-transform" />
                        {getText('english_cv', 'English CV')}
                      </a>
                    </Button>
                  )}
                  
                  {personalInfo?.cv_de && (
                    <Button asChild variant="outline" className="w-full sm:w-auto group">
                      <a href={personalInfo.cv_de} download>
                        <Download className="mr-2 h-4 w-4 group-hover:-translate-y-1 transition-transform" />
                        {getText('german_cv', 'German CV')}
                      </a>
                    </Button>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Downloads;
