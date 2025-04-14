
import { motion } from "framer-motion";
import { Linkedin, Github } from "lucide-react";
import { XingIcon, IndeedIcon } from "./HeroIcons";

type SocialLink = {
  url?: string;
  icon: React.ReactNode;
  label: string;
};

type SocialLinksProps = {
  linkedinUrl?: string;
  githubUrl?: string;
  xingUrl?: string;
  indeedUrl?: string;
};

export const SocialLinks = ({ linkedinUrl, githubUrl, xingUrl, indeedUrl }: SocialLinksProps) => {
  const handleExternalLink = (url: string | undefined) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };
  
  const socialLinks: SocialLink[] = [
    linkedinUrl && { url: linkedinUrl, icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn Profile" },
    githubUrl && { url: githubUrl, icon: <Github className="h-5 w-5" />, label: "GitHub Profile" },
    xingUrl && { url: xingUrl, icon: <XingIcon className="h-5 w-5" />, label: "Xing Profile" },
    indeedUrl && { url: indeedUrl, icon: <IndeedIcon className="h-5 w-5" />, label: "Indeed Profile" }
  ].filter(Boolean) as SocialLink[];
  
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.35 }}
      className="flex items-center justify-center md:justify-start gap-4 mb-8"
    >
      {socialLinks.map((link, index) => (
        <motion.button 
          key={index}
          onClick={() => handleExternalLink(link.url)}
          className="flex items-center justify-center text-muted-foreground hover:text-primary transition-colors p-3 rounded-full hover:bg-primary/10 border border-primary/20"
          aria-label={link.label}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {link.icon}
        </motion.button>
      ))}
    </motion.div>
  );
};
