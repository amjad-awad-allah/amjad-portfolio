import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/types/database";
import { useLanguage } from "@/context/LanguageContext";
interface ProjectCardProps {
  project: Project;
  companyName: string;
}
const ProjectCard = ({
  project,
  companyName
}: ProjectCardProps) => {
  const {
    language,
    t
  } = useLanguage();
  const handleCardClick = () => {
    if (project.description_url) {
      window.open(project.description_url, '_blank', 'noopener,noreferrer');
    }
  };
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} whileInView={{
    opacity: 1,
    y: 0
  }} viewport={{
    once: true,
    margin: "-100px"
  }} transition={{
    duration: 0.5
  }} onClick={handleCardClick} className={`glass-card overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full ${project.description_url ? 'cursor-pointer' : ''}`}>
      {project.image_url && <div className="w-full aspect-video overflow-hidden bg-muted">
          <img src={project.image_url} alt={project.project_name} className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-110" />
        </div>}
      
      <div className="p-6 flex-grow">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold">{project.project_name}</h3>
          <Badge variant="outline">{companyName}</Badge>
        </div>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {language === 'en' ? project.description_en : project.description_de}
        </p>
        
        {project.technologies_used && project.technologies_used.length > 0 && <div className="mt-4">
            <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-2">
              {t("projects.technologies")}
            </h4>
            <div className="flex flex-wrap gap-1">
              {project.technologies_used.map((tech, index) => <Badge key={index} variant="secondary" className="text-xs">
                  {tech}
                </Badge>)}
            </div>
          </div>}
      </div>
      
      {project.description_url}
    </motion.div>;
};
export default ProjectCard;