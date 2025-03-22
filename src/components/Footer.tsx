
import { useLanguage } from "@/context/LanguageContext";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

const Footer = () => {
  const { t } = useLanguage();
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
            <a
              href="mailto:amjad.awadallah93@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-primary/10 transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-primary/10 transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-primary/10 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} Amjad Awad-Allah. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
