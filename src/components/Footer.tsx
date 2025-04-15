
import { useLanguage } from "@/context/LanguageContext";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { usePersonalInfo } from "@/hooks/use-supabase-data";
import { useStaticContent } from "@/hooks/use-static-content";
import { XingIcon, IndeedIcon } from "./hero/HeroIcons";

const Footer = () => {
  const { language } = useLanguage();
  const { data: personalInfo } = usePersonalInfo();
  const { getText } = useStaticContent('footer');
  const currentYear = new Date().getFullYear();

  // Helper function to handle external links with proper security
  const handleExternalLink = (url: string | undefined, e: React.MouseEvent) => {
    e.preventDefault();
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <footer className="py-12 bg-secondary/50 dark:bg-secondary/10">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center">
          <a
            href="#home"
            className="mb-8 p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </a>
          
          <div className="flex items-center gap-6 mb-8">
            {personalInfo?.email && (
              <a
                href={`mailto:${personalInfo.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-primary/10 transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            )}
            
            {personalInfo?.github_url && (
              <a
                href={personalInfo.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-primary/10 transition-colors"
                aria-label="GitHub"
                onClick={(e) => handleExternalLink(personalInfo.github_url, e)}
              >
                <Github className="h-5 w-5" />
              </a>
            )}
            
            {personalInfo?.linkedin_url && (
              <a
                href={personalInfo.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-primary/10 transition-colors"
                aria-label="LinkedIn"
                onClick={(e) => handleExternalLink(personalInfo.linkedin_url, e)}
              >
                <Linkedin className="h-5 w-5" />
              </a>
            )}

            {personalInfo?.xing_url && (
              <a
                href={personalInfo.xing_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-primary/10 transition-colors"
                aria-label="Xing"
                onClick={(e) => handleExternalLink(personalInfo.xing_url, e)}
              >
                <XingIcon className="h-5 w-5" />
              </a>
            )}
            
            {personalInfo?.indeed_url && (
              <a
                href={personalInfo.indeed_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-primary/10 transition-colors"
                aria-label="Indeed"
                onClick={(e) => handleExternalLink(personalInfo.indeed_url, e)}
              >
                <IndeedIcon className="h-5 w-5" />
              </a>
            )}
          </div>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} {personalInfo?.name || "Amjad Awad-Allah"}. {getText('rights', 'All rights reserved.')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
