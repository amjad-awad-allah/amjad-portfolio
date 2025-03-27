
import { useState, useMemo } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { useProjects, useProfessionalExperience } from "@/hooks/use-supabase-data";
import ProjectCard from "./projects/ProjectCard";
import ProjectFilters from "./projects/ProjectFilters";
import NoProjectsFound from "./projects/NoProjectsFound";

const Projects = () => {
  const { t } = useLanguage();
  const { data: allProjects, isLoading: isProjectsLoading } = useProjects();
  const { data: experiences, isLoading: isExperienceLoading } = useProfessionalExperience();
  
  const [companyFilter, setCompanyFilter] = useState<string>("all");
  const [techFilter, setTechFilter] = useState<string>("all");
  
  // Extract all unique technologies from projects
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
  
  // Filter projects based on selected criteria
  const filteredProjects = useMemo(() => {
    if (!allProjects) return [];
    
    return allProjects.filter(project => {
      // Filter by company
      if (companyFilter !== "all" && project.experience_id.toString() !== companyFilter) {
        return false;
      }
      
      // Filter by technology
      if (techFilter !== "all" && !project.technologies_used?.includes(techFilter)) {
        return false;
      }
      
      return true;
    });
  }, [allProjects, companyFilter, techFilter]);
  
  // Reset all filters
  const resetFilters = () => {
    setCompanyFilter("all");
    setTechFilter("all");
  };

  // Find company name by experience id
  const getCompanyName = (experienceId: number) => {
    if (!experiences) return '';
    const experience = experiences.find(exp => exp.id === experienceId);
    return experience ? experience.company_name : '';
  };

  // Determine if reset button should be shown
  const showResetButton = companyFilter !== "all" || techFilter !== "all";

  return (
    <section id="projects" className="py-24 bg-secondary/20 dark:bg-secondary/5 relative">
      <div className="absolute inset-0 -z-10 bg-grid-pattern opacity-[0.02]"></div>
      
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
            {/* Filters */}
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
            
            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    companyName={getCompanyName(project.experience_id)}
                  />
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
