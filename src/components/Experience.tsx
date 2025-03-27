
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  Briefcase,
  Calendar,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Download,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useExperience } from "@/hooks/useExperience";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/utils";

const Experience = () => {
  const { t, language } = useLanguage();
  const { experience, isLoading } = useExperience();
  const [expandedCompany, setExpandedCompany] = useState<string | null>(null);

  const toggleCompany = (company: string) => {
    if (expandedCompany === company) {
      setExpandedCompany(null);
    } else {
      setExpandedCompany(company);
    }
  };

  return (
    <section id="experience" className="py-24">
      <div className="section-container">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="heading-lg mb-4">{t("experience.title")}</h2>
          <p className="paragraph">
            My professional journey in developing innovative applications.
          </p>
        </div>

        <div className="relative">
          {/* Fixed mobile timeline issue - Use a relative container and adjust the line positioning */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800 transform -translate-x-1/2 z-0"></div>
          
          <div className="space-y-12">
            {isLoading ? (
              // Loading skeletons
              Array(4).fill(0).map((_, index) => (
                <div key={index} className="relative mb-12 md:grid md:grid-cols-5 md:gap-8">
                  <div className="md:col-span-2 mb-4 md:mb-0 md:text-right px-4 relative">
                    <div className="hidden md:block absolute right-[-9px] top-3 w-4 h-4 rounded-full bg-primary z-10"></div>
                    <div className="md:hidden absolute left-0 top-3 w-3 h-3 rounded-full bg-primary z-10"></div>
                    <div className="md:hidden absolute left-1.5 top-6 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800 z-0"></div>
                    
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-2" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>

                  <div className="md:col-span-3 pl-8 md:pl-4">
                    <Skeleton className="h-48 w-full rounded-md" />
                  </div>
                </div>
              ))
            ) : (
              experience?.map((exp) => (
                <div
                  key={exp.id}
                  className="relative mb-12 md:grid md:grid-cols-5 md:gap-8"
                >
                  <div className="md:col-span-2 mb-4 md:mb-0 md:text-right px-4 relative">
                    {/* For mobile, we'll use a different timeline approach */}
                    <div className="hidden md:block absolute right-[-9px] top-3 w-4 h-4 rounded-full bg-primary z-10"></div>
                    
                    {/* Visible on mobile only */}
                    <div className="md:hidden absolute left-0 top-3 w-3 h-3 rounded-full bg-primary z-10"></div>
                    <div className="md:hidden absolute left-1.5 top-6 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800 z-0"></div>
                    
                    <h3 className="heading-sm pl-8 md:pl-0">{exp.company_name}</h3>
                    <div className="flex items-center gap-2 text-muted-foreground my-2 pl-8 md:pl-0 justify-start md:justify-end">
                      <Briefcase className="h-4 w-4" />
                      <span>{exp.position}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground pl-8 md:pl-0 justify-start md:justify-end">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {formatDate(exp.start_date, language)} - 
                        {exp.end_date ? formatDate(exp.end_date, language) : language === 'en' ? 'Present' : 'Heute'}
                      </span>
                    </div>
                  </div>

                  <div className="md:col-span-3 pl-8 md:pl-4">
                    <div className="glass-card overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                      <Accordion
                        type="single"
                        collapsible
                        defaultValue="overview"
                        className="w-full"
                      >
                        <AccordionItem value="overview" className="border-0">
                          <div className="px-6 pt-6 pb-3">
                            <h4 className="font-semibold mb-4">
                              {t("experience.responsibilities")}
                            </h4>
                            <div className="space-y-4 text-muted-foreground">
                              <p>{language === 'en' ? exp.description_en : exp.description_de}</p>
                            </div>
                          </div>
                          
                          {exp.projects && exp.projects.length > 0 && (
                            <>
                              <AccordionTrigger className="px-6 py-3 hover:no-underline">
                                <span className="flex items-center gap-2 text-sm font-medium">
                                  <span>{t("experience.projects")}</span>
                                </span>
                              </AccordionTrigger>
                              <AccordionContent className="px-6 pb-6">
                                <div className="space-y-4">
                                  {exp.projects.map((project) => (
                                    <div
                                      key={project.id}
                                      className="bg-secondary/50 dark:bg-secondary/30 rounded-lg p-4 hover:bg-secondary/70 dark:hover:bg-secondary/40 transition-colors duration-300"
                                    >
                                      <h5 className="font-semibold mb-2">{project.project_name}</h5>
                                      <p className="text-sm text-muted-foreground mb-3">
                                        {language === 'en' ? project.description_en : project.description_de}
                                      </p>
                                      
                                      {/* Technologies */}
                                      <div className="mb-3">
                                        <h6 className="text-xs font-medium text-muted-foreground mb-1">
                                          {t("projects.technologies")}
                                        </h6>
                                        <div className="flex flex-wrap gap-2">
                                          {project.technologies_used.map((tech, i) => (
                                            <span 
                                              key={i} 
                                              className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                                            >
                                              {tech}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                      
                                      {/* Achievements */}
                                      {project.achievements && project.achievements.length > 0 && (
                                        <div className="mb-3">
                                          <h6 className="text-xs font-medium text-muted-foreground mb-1">
                                            Achievements
                                          </h6>
                                          <ul className="space-y-1">
                                            {project.achievements.map((achievement, i) => (
                                              <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                                                <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5"></span>
                                                <span>{achievement}</span>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      )}
                                      
                                      {/* Project image */}
                                      {project.image_url && (
                                        <div className="mt-4">
                                          <img 
                                            src={project.image_url} 
                                            alt={project.project_name}
                                            className="w-full h-auto rounded-md object-cover max-h-48"
                                          />
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </AccordionContent>
                            </>
                          )}
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
