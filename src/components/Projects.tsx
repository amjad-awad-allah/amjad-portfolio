
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Download, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
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
        downloadLink: null
      }
    ]
  },
  {
    company: "PROTECH Group",
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
        downloadLink: "#download"
      }
    ]
  },
  {
    company: "Smart Angel",
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
        downloadLink: "#download"
      }
    ]
  },
  {
    company: "Supertech",
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
        downloadLink: null
      }
    ]
  }
];

const Projects = () => {
  const { t } = useLanguage();
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const toggleProject = (projectId: string) => {
    if (expandedProject === projectId) {
      setExpandedProject(null);
    } else {
      setExpandedProject(projectId);
    }
  };

  return (
    <section id="projects" className="py-24 bg-secondary/50 dark:bg-secondary/10">
      <div className="section-container">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="heading-lg mb-4">{t("projects.title")}</h2>
          <p className="paragraph">
            A showcase of my work across various companies and technologies.
          </p>
        </div>

        <div className="space-y-16">
          {projectsData.map((companyData) => (
            <div key={companyData.company} className="space-y-8">
              <h3 className="heading-md text-center">{companyData.company}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {companyData.projects.map((project) => (
                  <div key={project.id} className="glass-card overflow-hidden hover-scale">
                    <div className="aspect-[16/9] overflow-hidden bg-muted">
                      <img
                        src={project.screenshots[0]}
                        alt={project.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                    
                    <div className="p-6">
                      <h4 className="text-xl font-semibold mb-2">{project.name}</h4>
                      <p className="text-muted-foreground text-sm mb-4">
                        {project.description}
                      </p>
                      
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="details" className="border-0">
                          <AccordionTrigger className="py-2 px-0">
                            <span className="text-sm font-medium">Details</span>
                          </AccordionTrigger>
                          <AccordionContent>
                            <p className="text-sm text-muted-foreground mb-4">
                              {project.details}
                            </p>
                            
                            <div className="mb-4">
                              <h5 className="text-sm font-medium mb-2">
                                {t("projects.technologies")}
                              </h5>
                              <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech) => (
                                  <span key={tech} className="tag">
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2 mb-4">
                              {project.screenshots.slice(0, 2).map((screenshot, i) => (
                                <div key={i} className="rounded-md overflow-hidden bg-muted">
                                  <img
                                    src={screenshot}
                                    alt={`${project.name} screenshot ${i + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              ))}
                            </div>
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
