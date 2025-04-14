
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { Code, Database, Terminal, Layers, Award, GraduationCap } from "lucide-react";
import { useEducation, useCertifications } from "@/hooks/use-supabase-data";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { useStaticContent } from "@/hooks/use-static-content";

const About = () => {
  const { t, language } = useLanguage();
  const { data: educationData, isLoading: isEducationLoading } = useEducation();
  const { data: certificationsData, isLoading: isCertificationsLoading } = useCertifications();
  const { getText } = useStaticContent('about');

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
    { name: getText('software_dev', 'Software Development'), icon: Code },
    { name: getText('ai_ml', 'AI & Machine Learning'), icon: Terminal },
    { name: getText('db_management', 'Database Management'), icon: Database },
    { name: getText('full_stack', 'Full Stack Engineering'), icon: Layers },
  ];

  // Format date function
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Present';
    try {
      return format(new Date(dateString), 'MMM yyyy');
    } catch (error) {
      return dateString;
    }
  };

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
            
            {isEducationLoading ? (
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {educationData.map((education) => (
                  <div key={education.id} className="transition-all duration-300 group-hover:translate-x-1">
                    <h4 className="font-semibold text-lg">
                      {language === 'en' ? education.degree_en : education.degree_de}
                    </h4>
                    <p className="text-muted-foreground">
                      {education.institution_name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {language === 'en' ? education.field_of_study_en : education.field_of_study_de}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {formatDate(education.start_date)} - {formatDate(education.end_date)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Certifications */}
          <motion.div 
            variants={itemVariants}
            className="glass-card p-8 hover-scale relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-full"></div>
            <h3 className="heading-sm mb-6 flex items-center">
              <span className="mr-2 text-primary/80"><Award className="h-5 w-5" /></span>
              Certifications
            </h3>
            
            {isCertificationsLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : certificationsData.length > 0 ? (
              <div className="space-y-4">
                {certificationsData.map((cert) => (
                  <div key={cert.id} className="transition-all duration-300 group-hover:translate-x-1">
                    <h4 className="font-medium">
                      {language === 'en' ? cert.certification_name_en : cert.certification_name_de}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {cert.issuing_organization} · {formatDate(cert.date_obtained)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No certifications available yet.</p>
            )}
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
            {getText('technical_expertise', 'Technical Expertise')}
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
