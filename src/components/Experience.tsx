
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

const Experience = () => {
  const { t } = useLanguage();
  const [expandedCompany, setExpandedCompany] = useState<string | null>(null);

  const toggleCompany = (company: string) => {
    if (expandedCompany === company) {
      setExpandedCompany(null);
    } else {
      setExpandedCompany(company);
    }
  };

  const companies = [
    {
      id: "nvssoft",
      name: t("experience.company.nvssoft"),
      position: t("experience.position"),
      period: "2018-2021",
      logo: "https://placehold.co/150",
      responsibilities: [
        "Led the development of enterprise mobile applications",
        "Implemented secure data storage and transmission protocols",
        "Optimized database operations, improving performance by 40%",
        "Integrated hardware peripherals including ID scanners and fingerprint readers"
      ],
      projects: [
        {
          name: "Tarasol Suite",
          description: "Optimized database, reducing data retrieval time by 40%. Developed a secure PDF reader with digital signature integration. Integrated modern hardware (ID scanners & fingerprint recognition).",
          link: "https://play.google.com/store"
        },
        {
          name: "Retention Department RD",
          description: "Implemented fingerprint authentication, reducing data entry errors by 60%.",
          link: "https://play.google.com/store"
        },
        {
          name: "ArcMate 9 Enterprise Mobile",
          description: "Built a document management app using C# & Xamarin.",
          link: "https://play.google.com/store"
        }
      ]
    },
    {
      id: "protech",
      name: t("experience.company.protech"),
      position: t("experience.position"),
      period: "2017-2018",
      logo: "https://placehold.co/150",
      responsibilities: [
        "Designed and developed Android applications for router management and security",
        "Created custom network monitoring tools",
        "Implemented real-time data synchronization",
        "Automated testing procedures improving quality assurance"
      ],
      projects: [
        {
          name: "ProNet (APK Mirroring)",
          description: "Developed web & Android apps for router management.",
          link: "#download"
        },
        {
          name: "Proguard (APK Mirroring)",
          description: "Security and monitoring application for guard shifts.",
          link: "#download"
        }
      ]
    },
    {
      id: "smartangel",
      name: t("experience.company.smartangel"),
      position: t("experience.position"),
      period: "2016-2017",
      logo: "https://placehold.co/150",
      responsibilities: [
        "Developed e-commerce application with real-time tracking",
        "Implemented payment gateway integrations",
        "Created offline-first architecture for reliable functionality",
        "Optimized UI/UX for improved customer engagement"
      ],
      projects: [
        {
          name: "Bobazzar (APK Mirroring)",
          description: "Built a scalable E-commerce app with real-time order tracking.",
          link: "#download"
        }
      ]
    },
    {
      id: "supertech",
      name: t("experience.company.supertech"),
      position: t("experience.position"),
      period: "2015-2016",
      logo: "https://placehold.co/150",
      responsibilities: [
        "Built multimedia streaming applications",
        "Developed background playback functionality for media apps",
        "Created custom media conversion tools",
        "Implemented efficient caching mechanisms for improved performance"
      ],
      projects: [
        {
          name: "Publitools (APK Mirroring)",
          description: "YouTube background playback & MP3 conversion.",
          link: "#download"
        },
        {
          name: "Al Madina FM (Radio Streaming)",
          description: "Live streaming app for Al Madina FM radio.",
          link: "https://play.google.com/store"
        }
      ]
    }
  ];

  return (
    <section id="experience" className="py-24">
      <div className="section-container">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="heading-lg mb-4">{t("experience.title")}</h2>
          <p className="paragraph">
            My professional journey in developing innovative Android applications.
          </p>
        </div>

        <div className="timeline-container">
          <div className="space-y-12">
            {companies.map((company, index) => (
              <div
                key={company.id}
                className="timeline-item mb-12 md:grid md:grid-cols-5 md:gap-8"
              >
                <div className="md:col-span-2 mb-4 md:mb-0 md:text-right px-4">
                  <div className="timeline-dot" />
                  <h3 className="heading-sm">{company.name}</h3>
                  <div className="flex items-center gap-2 text-muted-foreground my-2 justify-start md:justify-end">
                    <Briefcase className="h-4 w-4" />
                    <span>{company.position}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground justify-start md:justify-end">
                    <Calendar className="h-4 w-4" />
                    <span>{company.period}</span>
                  </div>
                </div>

                <div className="md:col-span-3">
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
                          <ul className="space-y-2 text-muted-foreground">
                            {company.responsibilities.map((responsibility, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2"></span>
                                <span>{responsibility}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <AccordionTrigger className="px-6 py-3 hover:no-underline">
                          <span className="flex items-center gap-2 text-sm font-medium">
                            <span>{t("experience.projects")}</span>
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6">
                          <div className="space-y-4">
                            {company.projects.map((project, i) => (
                              <div
                                key={i}
                                className="bg-secondary/50 dark:bg-secondary/30 rounded-lg p-4 hover:bg-secondary/70 dark:hover:bg-secondary/40 transition-colors duration-300"
                              >
                                <h5 className="font-semibold mb-2">{project.name}</h5>
                                <p className="text-sm text-muted-foreground mb-3">
                                  {project.description}
                                </p>
                                <a
                                  href={project.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                                >
                                  {project.link.includes("play.google.com") ? (
                                    <>
                                      <ExternalLink className="mr-1 h-3 w-3" />
                                      View on Play Store
                                    </>
                                  ) : (
                                    <>
                                      <Download className="mr-1 h-3 w-3" />
                                      Download APK
                                    </>
                                  )}
                                </a>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
