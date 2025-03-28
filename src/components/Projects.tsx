
import { useState, useMemo } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { useProjects, useProfessionalExperience } from "@/hooks/use-supabase-data";
import ProjectCard from "./projects/ProjectCard";
import ProjectFilters from "./projects/ProjectFilters";
import NoProjectsFound from "./projects/NoProjectsFound";

const Projects = () => {
  const { t, language } = useLanguage();
  const { data: allProjects, isLoading: isProjectsLoading } = useProjects();
  const { data: experiences, isLoading: isExperienceLoading } = useProfessionalExperience();
  
  const [companyFilter, setCompanyFilter] = useState<string>("all");
  const [techFilter, setTechFilter] = useState<string>("all");
  
  const allTechnologies = useMemo(() => {
    if (!allProjects) return [];
    
    const technologies = new Set<string>();
    allProjects.forEach(project => {
      if (project.technologies_used && Array.isArray(project.technologies_used)) {
        project.technologies_used.forEach(tech => technologies.add(tech));
      }
    });
    
    return Array.from(technologies).sort();
  }, [allProjects]);
  
  const filteredProjects = useMemo(() => {
    if (!allProjects) return [];
    
    return allProjects.filter(project => {
      if (companyFilter !== "all" && project.experience_id.toString() !== companyFilter) {
        return false;
      }
      
      if (techFilter !== "all" && !project.technologies_used?.includes(techFilter)) {
        return false;
      }
      
      return true;
    });
  }, [allProjects, companyFilter, techFilter]);
  
  const resetFilters = () => {
    setCompanyFilter("all");
    setTechFilter("all");
  };

  const getCompanyName = (experienceId: number) => {
    if (!experiences) return '';
    const experience = experiences.find(exp => exp.id === experienceId);
    return experience ? experience.company_name : '';
  };

  const showResetButton = companyFilter !== "all" || techFilter !== "all";

  return (
    <section id="projects" className="py-24 bg-secondary/20 dark:bg-secondary/5 relative">
      {/* Enhanced background with code/AI patterns */}
      <div className="absolute inset-0 -z-10 bg-grid-pattern opacity-[0.02]"></div>
      <div className="absolute inset-0 -z-10 circuit-pattern opacity-[0.03]"></div>
      
      {/* Animated node connections in background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div 
            key={i}
            className="absolute bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 h-0.5 w-[60%]"
            style={{
              top: `${25 + i * 25}%`,
              left: i % 2 === 0 ? "-10%" : "50%",
            }}
            animate={{
              x: i % 2 === 0 ? ["0%", "100%", "0%"] : ["0%", "-100%", "0%"],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>
      
      <div className="section-container">
        <div className="text-center mb-16">
          <motion.h2 
            className="heading-lg mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t("projects.title")}
          </motion.h2>
          <motion.p 
            className="paragraph max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t("projects.description") || (
              language === 'en' 
                ? 'A collection of projects I have worked on throughout my career.'
                : 'Eine Sammlung von Projekten, an denen ich im Laufe meiner Karriere gearbeitet habe.'
            )}
          </motion.p>
        </div>
        
        {isProjectsLoading || isExperienceLoading ? (
          <div className="space-y-8">
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <Skeleton className="h-10 w-40" />
              <Skeleton className="h-10 w-40" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-[360px] rounded-xl" />
              ))}
            </div>
          </div>
        ) : (
          <>
            <ProjectFilters 
              companyFilter={companyFilter}
              setCompanyFilter={setCompanyFilter}
              techFilter={techFilter}
              setTechFilter={setTechFilter}
              resetFilters={resetFilters}
              experiences={experiences}
              allTechnologies={allTechnologies}
              showResetButton={showResetButton}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.1 * (index % 3) // Stagger effect by column
                    }}
                  >
                    <ProjectCard 
                      project={project} 
                      companyName={getCompanyName(project.experience_id)}
                    />
                  </motion.div>
                ))
              ) : (
                <NoProjectsFound resetFilters={resetFilters} />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Projects;
