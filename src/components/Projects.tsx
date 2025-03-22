
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Download, ExternalLink, Filter, Github, Code } from "lucide-react";
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

// Define our projects data
const projectsData = [
  {
    company: "NVS-SOFT",
    year: "2018-2021",
    projects: [
      {
        id: "tarasol",
        name: "Tarasol Suite",
        description: "Comprehensive enterprise suite with security features and hardware integration.",
        details: "Optimized database, reducing data retrieval time by 40%. Developed a secure PDF reader with digital signature integration. Integrated modern hardware (ID scanners & fingerprint recognition).",
        technologies: ["Java", "Android SDK", "SQLite", "Fingerprint API", "PDF Rendering"],
        screenshots: [
          "https://via.placeholder.com/400x800",
          "https://via.placeholder.com/400x800",
          "https://via.placeholder.com/400x800"
        ],
        liveLink: "https://play.google.com/store",
        githubLink: "https://github.com/example/tarasol",
        downloadLink: null
      },
      {
        id: "retention",
        name: "Retention Department RD",
        description: "Secure data management application with biometric authentication.",
        details: "Implemented fingerprint authentication, reducing data entry errors by 60%.",
        technologies: ["Java", "Android SDK", "Biometric API", "SQLite", "Encryption"],
        screenshots: [
          "https://via.placeholder.com/400x800",
          "https://via.placeholder.com/400x800"
        ],
        liveLink: "https://play.google.com/store",
        githubLink: "https://github.com/example/retention",
        downloadLink: null
      },
      {
        id: "arcmate",
        name: "ArcMate 9 Enterprise Mobile",
        description: "Document management system for enterprise environments.",
        details: "Built a document management app using C# & Xamarin.",
        technologies: ["C#", "Xamarin", "Azure Storage", "PDF Processing"],
        screenshots: [
          "https://via.placeholder.com/400x800",
          "https://via.placeholder.com/400x800"
        ],
        liveLink: "https://play.google.com/store",
        githubLink: "https://github.com/example/arcmate",
        downloadLink: null
      }
    ]
  },
  {
    company: "PROTECH Group",
    year: "2017-2018",
    projects: [
      {
        id: "pronet",
        name: "ProNet",
        description: "Router management system with web and mobile interfaces.",
        details: "Developed web & Android apps for router management.",
        technologies: ["Java", "REST API", "WebSockets", "Network Protocols"],
        screenshots: [
          "https://via.placeholder.com/400x800",
          "https://via.placeholder.com/400x800"
        ],
        liveLink: null,
        githubLink: "https://github.com/example/pronet",
        downloadLink: "#download"
      },
      {
        id: "proguard",
        name: "Proguard",
        description: "Security monitoring application for guard personnel.",
        details: "Security and monitoring application for guard shifts.",
        technologies: ["Java", "Firebase", "Real-time Database", "Maps API"],
        screenshots: [
          "https://via.placeholder.com/400x800",
          "https://via.placeholder.com/400x800"
        ],
        liveLink: null,
        githubLink: "https://github.com/example/proguard",
        downloadLink: "#download"
      }
    ]
  },
  {
    company: "Smart Angel",
    year: "2016-2017",
    projects: [
      {
        id: "bobazzar",
        name: "Bobazzar",
        description: "E-commerce platform with real-time order tracking.",
        details: "Built a scalable E-commerce app with real-time order tracking.",
        technologies: ["Java", "Firebase", "Payment Gateways", "Real-time Database"],
        screenshots: [
          "https://via.placeholder.com/400x800",
          "https://via.placeholder.com/400x800",
          "https://via.placeholder.com/400x800"
        ],
        liveLink: null,
        githubLink: "https://github.com/example/bobazzar",
        downloadLink: "#download"
      }
    ]
  },
  {
    company: "Supertech",
    year: "2015-2016",
    projects: [
      {
        id: "publitools",
        name: "Publitools",
        description: "Media streaming application with background playback functionality.",
        details: "YouTube background playback & MP3 conversion.",
        technologies: ["Java", "ExoPlayer", "Media Codecs", "Background Services"],
        screenshots: [
          "https://via.placeholder.com/400x800",
          "https://via.placeholder.com/400x800"
        ],
        liveLink: null,
        githubLink: "https://github.com/example/publitools",
        downloadLink: "#download"
      },
      {
        id: "almadina",
        name: "Al Madina FM",
        description: "Radio streaming application with schedule and notifications.",
        details: "Live streaming app for Al Madina FM radio.",
        technologies: ["Java", "Media Streaming", "Notifications API", "ExoPlayer"],
        screenshots: [
          "https://via.placeholder.com/400x800",
          "https://via.placeholder.com/400x800"
        ],
        liveLink: "https://play.google.com/store",
        githubLink: "https://github.com/example/almadina",
        downloadLink: null
      }
    ]
  }
];

// Get all technologies
const getAllTechnologies = () => {
  const technologies = new Set<string>();
  
  projectsData.forEach(company => {
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
  return projectsData.map(company => company.company);
};

// Get all years
const getAllYears = () => {
  return [...new Set(projectsData.map(company => company.year))];
};

const Projects = () => {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<"all" | "company" | "technology" | "year">("all");
  const [filterValue, setFilterValue] = useState<string>("");
  const [filteredProjects, setFilteredProjects] = useState(projectsData);
  
  // Filter projects based on selection
  useEffect(() => {
    if (filterType === "all") {
      setFilteredProjects(projectsData);
      return;
    }
    
    if (filterType === "company") {
      const filtered = projectsData.filter(company => 
        company.company === filterValue
      );
      setFilteredProjects(filtered);
      return;
    }
    
    if (filterType === "year") {
      const filtered = projectsData.filter(company => 
        company.year === filterValue
      );
      setFilteredProjects(filtered);
      return;
    }
    
    if (filterType === "technology") {
      const filtered = projectsData.filter(company => {
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
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
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
        </div>

        <div className="space-y-16">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">No projects match your filter criteria.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setFilterType("all");
                  setFilterValue("");
                }}
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            filteredProjects.map((companyData) => (
              <div key={companyData.company} className="space-y-8">
                <h3 className="heading-md text-center flex items-center justify-center gap-2">
                  {companyData.company}
                  <span className="text-sm font-normal text-muted-foreground ml-2">
                    ({companyData.year})
                  </span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {companyData.projects.map((project) => (
                    <div 
                      key={project.id} 
                      className="glass-card overflow-hidden hover-scale shadow-sm hover:shadow-md transition-all duration-300"
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
                                      <span key={tech} className="tag">
                                        {tech}
                                      </span>
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
                      
                      <div className="p-6">
                        <h4 className="text-xl font-semibold mb-2">{project.name}</h4>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {project.description}
                        </p>
                        
                        <div className="mb-4">
                          <h5 className="text-sm font-medium mb-2">
                            {t("projects.technologies")}
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.slice(0, 3).map((tech) => (
                              <span key={tech} className="tag">
                                {tech}
                              </span>
                            ))}
                            {project.technologies.length > 3 && (
                              <span className="tag">+{project.technologies.length - 3}</span>
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
                        
                        <div className="flex items-center gap-3 mt-4">
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
                        </div>
                      </div>
                    </div>
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
