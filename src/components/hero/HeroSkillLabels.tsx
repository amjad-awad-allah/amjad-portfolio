
import { motion } from "framer-motion";
import { Cpu, BrainCircuit, Code, Globe } from "lucide-react";
import { useStaticContent } from "@/hooks/use-static-content";

type SkillLabelProps = {
  icon: React.ReactNode;
  text: string;
  rotate: number;
  delay: number;
};

export const SkillLabel = ({ icon, text, rotate, delay }: SkillLabelProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="absolute bg-white/90 dark:bg-secondary/90 py-1.5 px-3 text-xs font-medium flex items-center shadow-lg rounded-md border border-primary/30 md:block hidden"
      style={{
        transform: `rotate(${rotate}deg) translateX(${rotate === 0 ? '-50%' : '0'})`,
        ...(rotate === -45 && { top: '5%', left: '-15%' }),
        ...(rotate === 0 && { bottom: '-8%', left: '50%' }),
        ...(rotate === 45 && { top: '5%', right: '-15%' }),
        ...(rotate === 90 && { top: '50%', right: '-20%' }),
      }}
    >
      {icon}
      <span className="text-foreground">{text}</span>
    </motion.div>
  );
};

export const useSkillLabels = () => {
  const { getText } = useStaticContent('hero');
  
  return [
    { icon: <Cpu className="h-3.5 w-3.5 mr-1" />, text: getText('engineer_label', 'AI Engineer'), rotate: -45, delay: 0.1 },
    { icon: <BrainCircuit className="h-3.5 w-3.5 mr-1" />, text: getText('machine_learning_label', 'Machine Learning'), rotate: 0, delay: 0.2 },
    { icon: <Code className="h-3.5 w-3.5 mr-1" />, text: getText('developer_label', 'Full Stack Developer'), rotate: 45, delay: 0.3 },
    { icon: <Globe className="h-3.5 w-3.5 mr-1" />, text: getText('architect_label', 'Software Architect'), rotate: 90, delay: 0.4 },
  ];
};
