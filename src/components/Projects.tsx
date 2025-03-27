
import { useState, useMemo } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { ExternalLink, FilterX, Github, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useProjects, useProfessionalExperience } from "@/hooks/use-supabase-data";

const Projects = () => {
  const { t, language } = useLanguage();
  const { data: allProjects, isLoading: isProjectsLoading } = useProjects();
  const { data: experiences, isLoading: isExperienceLoading } = useProfessionalExperience();
  
  const [companyFilter, setCompanyFilter] = useState<string>("");
  const [techFilter, setTechFilter] = useState<string>("");
  
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
      if (companyFilter && project.experience_id.toString() !== companyFilter) {
        return false;
      }
      
      // Filter by technology
      if (techFilter && !project.technologies_used?.includes(techFilter)) {
        return false;
      }
      
      return true;
    });
  }, [allProjects, companyFilter, techFilter]);
  
  // Reset all filters
  const resetFilters = () => {
    setCompanyFilter("");
    setTechFilter("");
  };

  // Find company name by experience id
  const getCompanyName = (experienceId: number) => {
    if (!experiences) return '';
    const experience = experiences.find(exp => exp.id === experienceId);
    return experience ? experience.company_name : '';
  };

  return (
    <section id="projects" className="py-24 bg-secondary/20 dark:bg-secondary/5 relative">
      <div className="absolute inset-0 -z-10 bg-grid-pattern opacity-[0.02]"></div>
      
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-3">{t("projects.title")}</h2>
          <p className="paragraph max-w-2xl mx-auto">
            {language === 'en' 
              ? 'A collection of projects I have worked on throughout my career.'
              : 'Eine Sammlung von Projekten, an denen ich im Laufe meiner Karriere gearbeitet habe.'}
          </p>
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
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <div className="w-full max-w-xs">
                <Select value={companyFilter} onValueChange={setCompanyFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("projects.selectCompany")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">
                      {t("projects.allProjects")}
                    </SelectItem>
                    {experiences && experiences.map((experience) => (
                      <SelectItem 
                        key={experience.id} 
                        value={experience.id.toString()}
                      >
                        {experience.company_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-full max-w-xs">
                <Select value={techFilter} onValueChange={setTechFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("projects.selectTechnology")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">
                      {t("projects.allProjects")}
                    </SelectItem>
                    {allTechnologies.map((tech) => (
                      <SelectItem key={tech} value={tech}>
                        {tech}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {(companyFilter || techFilter) && (
                <Button
                  variant="outline"
                  onClick={resetFilters}
                  className="flex items-center gap-2"
                >
                  <FilterX className="h-4 w-4" />
                  {t("projects.resetFilters")}
                </Button>
              )}
            </div>
            
            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className="glass-card overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full"
                  >
                    {project.image_url && (
                      <div className="w-full h-48 overflow-hidden">
                        <img
                          src={project.image_url}
                          alt={project.project_name}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                      </div>
                    )}
                    
                    <div className="p-6 flex-grow">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold">{project.project_name}</h3>
                        <Badge variant="outline">{getCompanyName(project.experience_id)}</Badge>
                      </div>
                      
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                        {language === 'en' ? project.description_en : project.description_de}
                      </p>
                      
                      {project.technologies_used && project.technologies_used.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-2">
                            {t("projects.technologies")}
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {project.technologies_used.map((tech, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="px-6 py-4 border-t border-border/40">
                      <div className="flex justify-end gap-3">
                        {project.image_url && (
                          <Button size="sm" variant="ghost" asChild>
                            <a
                              href={project.image_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center"
                            >
                              <ExternalLink className="mr-1 h-3 w-3" />
                              {t("projects.viewDetails")}
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <Layers className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">
                    {t("projects.noResults")}
                  </p>
                  <Button
                    variant="outline"
                    onClick={resetFilters}
                    className="mt-4"
                  >
                    {t("projects.resetFilters")}
                  </Button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Projects;
