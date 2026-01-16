import { useState, useMemo } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { useProjects, useProfessionalExperience } from "@/hooks/use-supabase-data";
import ProjectCard from "./projects/ProjectCard";
import ProjectFilters from "./projects/ProjectFilters";
import NoProjectsFound from "./projects/NoProjectsFound";
import { ChevronDown, ChevronUp, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
const PROJECTS_PER_PAGE = 6;
const Projects = () => {
  const {
    t,
    language
  } = useLanguage();
  const {
    data: allProjects,
    isLoading: isProjectsLoading
  } = useProjects();
  const {
    data: experiences,
    isLoading: isExperienceLoading
  } = useProfessionalExperience();
  const [companyFilter, setCompanyFilter] = useState<string>("all");
  const [techFilter, setTechFilter] = useState<string>("all");
  const [isOpen, setIsOpen] = useState(true); // Changed to true to be uncollapsed by default
  const [currentPage, setCurrentPage] = useState(1);
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

  // Calculate pagination
  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
    return filteredProjects.slice(startIndex, startIndex + PROJECTS_PER_PAGE);
  }, [filteredProjects, currentPage]);
  const resetFilters = () => {
    setCompanyFilter("all");
    setTechFilter("all");
    setCurrentPage(1);
  };
  const getCompanyName = (experienceId: number) => {
    if (!experiences) return '';
    const experience = experiences.find(exp => exp.id === experienceId);
    return experience ? experience.company_name : '';
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to the top of the projects section
    document.getElementById('projects')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };
  const showResetButton = companyFilter !== "all" || techFilter !== "all";
  return <section id="projects" className="relative">
      {/* Enhanced background with code/AI patterns */}
      <div className="absolute inset-0 -z-10 bg-grid-pattern opacity-[0.02]"></div>
      <div className="absolute inset-0 -z-10 circuit-pattern opacity-[0.03]"></div>
      
      {/* Animated node connections in background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {[...Array(3)].map((_, i) => <motion.div key={i} className="absolute bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 h-0.5 w-[60%]" style={{
        top: `${25 + i * 25}%`,
        left: i % 2 === 0 ? "-10%" : "50%"
      }} animate={{
        x: i % 2 === 0 ? ["0%", "100%", "0%"] : ["0%", "-100%", "0%"],
        opacity: [0.2, 0.5, 0.2]
      }} transition={{
        duration: 20 + i * 5,
        repeat: Infinity,
        ease: "linear"
      }} />)}
      </div>
      
      <div className="section-container">
        <div className="text-center mb-8">
          <motion.h2 className="heading-lg mb-3 text-foreground" initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5
        }}>
            {t("projects.title")}
          </motion.h2>
          <motion.p className="paragraph max-w-2xl mx-auto" initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5,
          delay: 0.1
        }}>
            {t("projects.description") || (language === 'en' ? 'A collection of projects I have worked on throughout my career.' : 'Eine Sammlung von Projekten, an denen ich im Laufe meiner Karriere gearbeitet habe.')}
          </motion.p>
        </div>

        {/* Toggle Button for Projects */}
        <div className="flex justify-center mb-8">
          <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 mx-auto">
                {isOpen ? <>
                    <ChevronUp className="h-4 w-4" />
                    <span>{language === 'en' ? 'Hide Projects' : 'Projekte ausblenden'}</span>
                  </> : <>
                    <ChevronDown className="h-4 w-4" />
                    <span>{language === 'en' ? 'Show Projects' : 'Projekte anzeigen'}</span>
                  </>}
              </Button>
            </CollapsibleTrigger>
            
            <CollapsibleContent className="mt-8">
              {isProjectsLoading || isExperienceLoading ? <div className="space-y-8">
                  <div className="flex flex-wrap gap-4 justify-center mb-8">
                    <Skeleton className="h-10 w-40" />
                    <Skeleton className="h-10 w-40" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map(i => <Skeleton key={i} className="h-[360px] rounded-xl" />)}
                  </div>
                </div> : <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedProjects.length > 0 ? paginatedProjects.map((project, index) => <motion.div key={project.id} initial={{
                  opacity: 0,
                  y: 20
                }} whileInView={{
                  opacity: 1,
                  y: 0
                }} viewport={{
                  once: true
                }} transition={{
                  duration: 0.5,
                  delay: 0.1 * (index % 3) // Stagger effect by column
                }}>
                          <ProjectCard project={project} companyName={getCompanyName(project.experience_id)} />
                        </motion.div>) : <NoProjectsFound resetFilters={resetFilters} />}
                  </div>
                  
                  {/* Pagination */}
                  {filteredProjects.length > PROJECTS_PER_PAGE && <div className="mt-8">
                      <Pagination>
                        <PaginationContent>
                          {currentPage > 1 && <PaginationItem>
                              <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
                            </PaginationItem>}
                          
                          {[...Array(totalPages)].map((_, i) => <PaginationItem key={i}>
                              <PaginationLink isActive={currentPage === i + 1} onClick={() => handlePageChange(i + 1)}>
                                {i + 1}
                              </PaginationLink>
                            </PaginationItem>)}
                          
                          {currentPage < totalPages && <PaginationItem>
                              <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
                            </PaginationItem>}
                        </PaginationContent>
                      </Pagination>
                    </div>}
                  
                  {/* CTA */}
                  {filteredProjects.length > 0}
                </>}
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </section>;
};
export default Projects;