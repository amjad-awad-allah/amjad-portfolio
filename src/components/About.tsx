
import { useLanguage } from "@/context/LanguageContext";

const About = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 bg-secondary/50 dark:bg-secondary/10">
      <div className="section-container">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="heading-lg mb-4">{t("about.title")}</h2>
          <p className="paragraph">{t("about.bio")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Education */}
          <div className="glass-card p-8 hover-scale">
            <h3 className="heading-sm mb-6">{t("about.education.title")}</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-lg">{t("about.education.degree")}</h4>
                <p className="text-muted-foreground">
                  {t("about.education.university")} | {t("about.education.years")}
                </p>
              </div>
            </div>
          </div>

          {/* Work Experience Overview */}
          <div className="glass-card p-8 hover-scale">
            <h3 className="heading-sm mb-6">{t("about.experience.title")}</h3>
            <p className="paragraph mb-6">{t("about.experience.overview")}</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                <span>NVS-SOFT (Dubai, Solutions)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                <span>PROTECH Group (Damascus, Syria)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                <span>Smart Angel (Erbil, Iraq)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                <span>Supertech (Syria)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
