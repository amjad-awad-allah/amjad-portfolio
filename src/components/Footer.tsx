
import { useLanguage } from "@/context/LanguageContext";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { usePersonalInfo } from "@/hooks/use-supabase-data";

// Custom icon components for services that aren't in lucide-react
const XingIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18.188 2.675c-.23 0-.43.16-.525.4l-3.175 5.55c0 .005 0 .005 0 .01l5 8.875c.1.235.295.4.525.4h3.8c.305 0 .535-.28.425-.575L19.02 8.455l3.23-5.375c.105-.28-.13-.56-.435-.56h-3.62l-.005.005zM8 5.675c-.3 0-.53.275-.425.57l2.475 4.27-3.905 6.85c-.11.29.12.57.425.57h3.8c.235 0 .44-.165.525-.4l3.95-6.935c0-.01 0-.01 0-.016l-2.475-4.27c-.09-.24-.3-.4-.525-.4H8z" />
  </svg>
);

const IndeedIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M10 3v18M15 11.495l3 3.005-3 3" />
  </svg>
);

const Footer = () => {
  const { t } = useLanguage();
  const { data: personalInfo } = usePersonalInfo();
  const currentYear = new Date().getFullYear();

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
                onClick={(e) => {
                  e.stopPropagation();
                  window.location.href = `mailto:${personalInfo.email}`;
                }}
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
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(personalInfo.github_url, '_blank', 'noopener,noreferrer');
                }}
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
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(personalInfo.linkedin_url, '_blank', 'noopener,noreferrer');
                }}
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
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(personalInfo.xing_url, '_blank', 'noopener,noreferrer');
                }}
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
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(personalInfo.indeed_url, '_blank', 'noopener,noreferrer');
                }}
              >
                <IndeedIcon className="h-5 w-5" />
              </a>
            )}
          </div>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} {personalInfo?.name || "Amjad Awad-Allah"}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
