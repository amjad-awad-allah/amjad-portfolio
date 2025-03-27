
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { Code, Database, Terminal, Layers, GraduationCap, Award } from "lucide-react";
import { useEducation } from "@/hooks/useEducation";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/utils";

const About = () => {
  const { t, language } = useLanguage();
  const { education, certifications, isLoading } = useEducation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  // Tech skills with icons
  const techSkills = [
    { name: "Software Development", icon: Code },
    { name: "AI & Machine Learning", icon: Terminal },
    { name: "Database Management", icon: Database },
    { name: "Full Stack Engineering", icon: Layers },
  ];

  return (
    <section id="about" className="py-24 bg-secondary/50 dark:bg-secondary/10 relative overflow-hidden">
      {/* Tech pattern background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      </div>
      
      <div className="section-container">
        <motion.div 
          className="max-w-3xl mx-auto mb-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h2 variants={itemVariants} className="heading-lg mb-4 relative inline-block">
            {t("about.title")}
            <span className="absolute -bottom-2 left-1/2 w-1/2 h-1 bg-gradient-to-r from-primary/40 to-primary/10 transform -translate-x-1/2 rounded-full"></span>
          </motion.h2>
          <motion.p variants={itemVariants} className="paragraph">{t("about.bio")}</motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Education */}
          <motion.div 
            variants={itemVariants}
            className="glass-card p-8 hover-scale relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-full"></div>
            <h3 className="heading-sm mb-6 flex items-center">
              <span className="mr-2 text-primary/80">🎓</span> 
              {t("about.education.title")}
            </h3>
            
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ) : (
              <div className="space-y-6">
                {education?.map((edu) => (
                  <div key={edu.id} className="transition-all duration-300 group-hover:translate-x-1">
                    <h4 className="font-semibold text-lg">
                      {language === 'en' ? edu.degree_en : edu.degree_de}
                    </h4>
                    <p className="text-muted-foreground mb-1">
                      {language === 'en' ? edu.field_of_study_en : edu.field_of_study_de}
                    </p>
                    <p className="text-muted-foreground">
                      {edu.institution_name} | {formatDate(edu.start_date, language)} - {formatDate(edu.end_date, language)}
                    </p>
                  </div>
                ))}
              </div>
            )}
            
            {/* Certifications */}
            {!isLoading && certifications && certifications.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Award className="mr-2 h-5 w-5 text-primary/80" />
                  Certifications
                </h3>
                <div className="space-y-4">
                  {certifications.map((cert) => (
                    <div key={cert.id} className="transition-all duration-300 group-hover:translate-x-1">
                      <h4 className="font-medium">
                        {language === 'en' ? cert.certification_name_en : cert.certification_name_de}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {cert.issuing_organization} | {formatDate(cert.date_obtained, language)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Work Experience Overview */}
          <motion.div 
            variants={itemVariants}
            className="glass-card p-8 hover-scale relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-full"></div>
            <h3 className="heading-sm mb-6 flex items-center">
              <span className="mr-2 text-primary/80">💼</span>
              {t("about.experience.title")}
            </h3>
            <p className="paragraph mb-6">{t("about.experience.overview")}</p>
            <ul className="space-y-3">
              {["NVS-SOFT (Dubai, Solutions)", "PROTECH Group (Damascus, Syria)", "Smart Angel (Erbil, Iraq)", "Supertech (Syria)"].map((company, index) => (
                <li key={index} className="flex items-center gap-2 transition-all duration-300 group-hover:translate-x-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                  <span className="transition-all hover:text-primary">{company}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Tech skills */}
        <motion.div 
          className="mt-12 max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h3 variants={itemVariants} className="heading-sm text-center mb-8">
            Technical Expertise
          </motion.h3>
          
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {techSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                className="glass-card p-4 flex flex-col items-center text-center hover:shadow-md hover:bg-primary/5 transition-all duration-300"
              >
                <skill.icon className="h-8 w-8 mb-3 text-primary/70" />
                <span className="font-medium">{skill.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
