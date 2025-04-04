
import { motion } from "framer-motion";
import { ExternalLink, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/types/database";
import { useLanguage } from "@/context/LanguageContext";

interface ProjectCardProps {
  project: Project;
  companyName: string;
}

const ProjectCard = ({ project, companyName }: ProjectCardProps) => {
  const { language, t } = useLanguage();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="glass-card overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full"
    >
      {project.image_url && (
        <div className="w-full h-48 overflow-hidden">
          <img
            src={project.image_url}
            alt={project.project_name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
      )}
      
      <div className="p-6 flex-grow">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold">{project.project_name}</h3>
          <Badge variant="outline">{companyName}</Badge>
        </div>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {language === 'en' ? project.description_en : project.description_de}
        </p>
        
        {project.technologies_used && project.technologies_used.length > 0 && (
          <div className="mt-4">
            <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-2">
              {t("projects.technologies")}
            </h4>
            <div className="flex flex-wrap gap-1">
              {project.technologies_used.map((tech, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="px-6 py-4 border-t border-border/40">
        <div className="flex justify-end gap-3">
          {project.description_url && (
            <Button size="sm" variant="ghost" asChild>
              <a
                href={project.description_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center"
              >
                <ExternalLink className="mr-1 h-3 w-3" />
                {t("projects.viewDetails")}
              </a>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
