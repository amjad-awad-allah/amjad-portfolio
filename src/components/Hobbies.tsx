
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { BookOpen, Gamepad2, Trophy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Hobbies = () => {
  const { t } = useLanguage();

  const hobbies = [
    {
      name: t("hobbies.chess"),
      icon: <Gamepad2 className="h-8 w-8" />,
      color: "bg-blue-100 dark:bg-blue-900/30",
      hover: "hover:bg-blue-200 dark:hover:bg-blue-800/40",
      border: "border-blue-300 dark:border-blue-700",
    },
    {
      name: t("hobbies.reading"),
      icon: <BookOpen className="h-8 w-8" />,
      color: "bg-green-100 dark:bg-green-900/30",
      hover: "hover:bg-green-200 dark:hover:bg-green-800/40",
      border: "border-green-300 dark:border-green-700",
    },
    {
      name: t("hobbies.tabletennis"),
      icon: <Trophy className="h-8 w-8" />,
      color: "bg-red-100 dark:bg-red-900/30",
      hover: "hover:bg-red-200 dark:hover:bg-red-800/40",
      border: "border-red-300 dark:border-red-700",
    },
  ];

  return (
    <section id="hobbies" className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">{t("hobbies.title")}</h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-6"></div>
          <p className="paragraph max-w-2xl mx-auto">
            {t("hobbies.description") || "When I'm not coding, I enjoy these activities that help me maintain a healthy work-life balance."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {hobbies.map((hobby, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ translateY: -8 }}
            >
              <Card className={`h-full border ${hobby.border} hover-card overflow-hidden relative group`}>
                <CardContent className={`p-6 flex flex-col items-center text-center ${hobby.color} ${hobby.hover} transition-colors duration-300 h-full`}>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="mb-4 p-4 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-sm"
                  >
                    {hobby.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-2">{hobby.name}</h3>
                  
                  {/* Matrix-inspired graphic element */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-5 pointer-events-none">
                    <div className="absolute top-0 left-0 right-0 h-full overflow-hidden">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div 
                          key={i} 
                          className="text-xs font-mono opacity-80"
                          style={{ 
                            position: 'absolute', 
                            top: `${Math.random() * 100}%`, 
                            left: `${Math.random() * 100}%`,
                            animation: `matrix-fall ${Math.random() * 3 + 2}s linear infinite`,
                            animationDelay: `${Math.random() * 2}s`
                          }}
                        >
                          {Math.random() > 0.5 ? '1' : '0'}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hobbies;
