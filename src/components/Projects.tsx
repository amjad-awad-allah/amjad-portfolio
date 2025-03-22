
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Download, ExternalLink, Filter, Github, Code, FileCode, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Import project data from JSON file
import projectData from "../data/projects.json";

// Define types for our project data
interface Project {
  id: string;
  name: string;
  description: string;
  details: string;
  technologies: string[];
  screenshots: string[];
  liveLink: string | null;
  githubLink: string | null;
  downloadLink: string | null;
}

interface CompanyData {
  company: string;
  year: string;
  projects: Project[];
}

// Get all technologies
const getAllTechnologies = () => {
  const technologies = new Set<string>();
  
  projectData.companies.forEach(company => {
    company.projects.forEach(project => {
      project.technologies.forEach(tech => {
        technologies.add(tech);
      });
    });
  });
  
  return Array.from(technologies).sort();
};

// Get all companies
const getAllCompanies = () => {
  return projectData.companies.map(company => company.company);
};

// Get all years
const getAllYears = () => {
  return [...new Set(projectData.companies.map(company => company.year))];
};

const Projects = () => {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<"all" | "company" | "technology" | "year">("all");
  const [filterValue, setFilterValue] = useState<string>("");
  const [filteredProjects, setFilteredProjects] = useState<CompanyData[]>(projectData.companies);
  const [activeFilters, setActiveFilters] = useState<{type: string, value: string}[]>([]);
  
  // Filter projects based on selection
  useEffect(() => {
    if (filterType === "all") {
      setFilteredProjects(projectData.companies);
      return;
    }
    
    if (filterType === "company") {
      const filtered = projectData.companies.filter(company => 
        company.company === filterValue
      );
      setFilteredProjects(filtered);
      return;
    }
    
    if (filterType === "year") {
      const filtered = projectData.companies.filter(company => 
        company.year === filterValue
      );
      setFilteredProjects(filtered);
      return;
    }
    
    if (filterType === "technology") {
      const filtered = projectData.companies.filter(company => {
        return company.projects.some(project => 
          project.technologies.includes(filterValue)
        );
      });
      
      // Filter out projects that don't include the technology
      const withFilteredProjects = filtered.map(company => ({
        ...company,
        projects: company.projects.filter(project => 
          project.technologies.includes(filterValue)
        )
      }));
      
      setFilteredProjects(withFilteredProjects);
    }
  }, [filterType, filterValue]);
  
  const handleFilterTypeChange = (value: string) => {
    setFilterType(value as "all" | "company" | "technology" | "year");
    setFilterValue("");
  };
  
  const handleFilterValueChange = (value: string) => {
    setFilterValue(value);
    
    // Add to active filters if not "all"
    if (filterType !== "all" && value) {
      const newFilter = {type: filterType, value};
      if (!activeFilters.some(f => f.type === filterType && f.value === value)) {
        setActiveFilters([...activeFilters, newFilter]);
      }
    }
  };
  
  const removeFilter = (type: string, value: string) => {
    setActiveFilters(activeFilters.filter(f => !(f.type === type && f.value === value)));
    setFilterType("all");
    setFilterValue("");
    setFilteredProjects(projectData.companies);
  };
  
  const clearAllFilters = () => {
    setActiveFilters([]);
    setFilterType("all");
    setFilterValue("");
    setFilteredProjects(projectData.companies);
  };

  // Debug mode
  useEffect(() => {
    console.log("Projects component mounted");
    console.log("Filter type:", filterType);
    console.log("Filter value:", filterValue);
    return () => {
      console.log("Projects component unmounted");
    };
  }, [filterType, filterValue]);

  return (
    <section id="projects" className="py-24 bg-secondary/50 dark:bg-secondary/10">
      <div className="section-container">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="heading-lg mb-4">{t("projects.title")}</h2>
          <p className="paragraph mb-8">
            A showcase of my work across various companies and technologies.
          </p>
          
          {/* Filter controls */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span className="text-sm font-medium">Filter by:</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Select onValueChange={handleFilterTypeChange} value={filterType}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  <SelectItem value="company">Company</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="year">Year</SelectItem>
                </SelectContent>
              </Select>
              
              {filterType !== "all" && (
                <Select onValueChange={handleFilterValueChange} value={filterValue}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={`Select ${filterType}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {filterType === "company" && getAllCompanies().map(company => (
                      <SelectItem key={company} value={company}>{company}</SelectItem>
                    ))}
                    
                    {filterType === "technology" && getAllTechnologies().map(tech => (
                      <SelectItem key={tech} value={tech}>{tech}</SelectItem>
                    ))}
                    
                    {filterType === "year" && getAllYears().map(year => (
                      <SelectItem key={year} value={year}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
          
          {/* Active filters */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap justify-center items-center gap-2 mb-8">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {activeFilters.map((filter, index) => (
                <Badge 
                  key={index} 
                  variant="secondary"
                  className="flex items-center gap-1 px-3 py-1"
                >
                  <span className="capitalize">{filter.type}:</span> {filter.value}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 ml-1"
                    onClick={() => removeFilter(filter.type, filter.value)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs"
                onClick={clearAllFilters}
              >
                Clear all
              </Button>
            </div>
          )}
        </div>

        <div className="space-y-16">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <FileCode className="mx-auto h-16 w-16 text-muted-foreground mb-4 opacity-40" />
              <p className="text-lg text-muted-foreground">No projects match your filter criteria.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={clearAllFilters}
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            filteredProjects.map((companyData) => (
              <div key={companyData.company} className="space-y-8">
                <Card className="overflow-hidden border-none shadow-sm bg-background/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        {companyData.company}
                        <span className="text-sm font-normal text-muted-foreground ml-2">
                          ({companyData.year})
                        </span>
                      </CardTitle>
                      <Badge variant="outline">{companyData.projects.length} projects</Badge>
                    </div>
                  </CardHeader>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {companyData.projects.map((project) => (
                    <Card 
                      key={project.id} 
                      className="overflow-hidden hover-scale shadow-sm hover:shadow-md transition-all duration-300 border-none"
                    >
                      <div className="aspect-[16/9] overflow-hidden bg-muted relative group">
                        <img
                          src={project.screenshots[0]}
                          alt={project.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="secondary" size="sm" className="mr-2">
                                <Code className="mr-1 h-3 w-3" />
                                Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl">
                              <DialogHeader>
                                <DialogTitle>{project.name}</DialogTitle>
                                <DialogDescription>{project.description}</DialogDescription>
                              </DialogHeader>
                              <div className="mt-4 space-y-4">
                                <div>
                                  <h4 className="text-sm font-semibold mb-2">Project Details</h4>
                                  <p className="text-sm text-muted-foreground">{project.details}</p>
                                </div>
                                
                                <div>
                                  <h4 className="text-sm font-semibold mb-2">Technologies</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech) => (
                                      <Badge key={tech} variant="secondary">
                                        {tech}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                
                                <div>
                                  <h4 className="text-sm font-semibold mb-2">Screenshots</h4>
                                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {project.screenshots.map((screenshot, i) => (
                                      <div key={i} className="rounded-md overflow-hidden bg-muted">
                                        <img
                                          src={screenshot}
                                          alt={`${project.name} screenshot ${i + 1}`}
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                      
                      <CardHeader className="pb-2">
                        <CardTitle className="text-xl">{project.name}</CardTitle>
                        <CardDescription className="line-clamp-2">
                          {project.description}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="space-y-4 pb-2">
                        <div>
                          <h5 className="text-sm font-medium mb-2">
                            {t("projects.technologies")}
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.slice(0, 3).map((tech) => (
                              <Badge key={tech} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                            {project.technologies.length > 3 && (
                              <Badge variant="outline" className="text-xs">+{project.technologies.length - 3}</Badge>
                            )}
                          </div>
                        </div>
                        
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="details" className="border-0">
                            <AccordionTrigger className="py-2 px-0">
                              <span className="text-sm font-medium">Details</span>
                            </AccordionTrigger>
                            <AccordionContent>
                              <p className="text-sm text-muted-foreground mb-4">
                                {project.details}
                              </p>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </CardContent>
                      
                      <CardFooter className="flex items-center gap-3 pt-2">
                        {project.liveLink && (
                          <Button
                            asChild
                            variant="default"
                            size="sm"
                            className="flex-1"
                          >
                            <a
                              href={project.liveLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center"
                            >
                              <ExternalLink className="mr-2 h-4 w-4" />
                              {t("projects.live")}
                            </a>
                          </Button>
                        )}
                        
                        {project.githubLink && (
                          <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="flex-1"
                          >
                            <a
                              href={project.githubLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center"
                            >
                              <Github className="mr-2 h-4 w-4" />
                              GitHub
                            </a>
                          </Button>
                        )}
                        
                        {project.downloadLink && (
                          <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="flex-1"
                          >
                            <a
                              href={project.downloadLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center"
                            >
                              <Download className="mr-2 h-4 w-4" />
                              {t("projects.download")}
                            </a>
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
