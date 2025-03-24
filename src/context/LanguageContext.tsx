import React, { createContext, useState, useContext, ReactNode } from "react";

// Define available languages
export type Language = "en" | "de" | "ar" | "fr";

// Define translations structure
export type Translations = {
  [key: string]: {
    [key in Language]: string;
  };
};

// Create translations
export const translations: Translations = {
  // Navbar
  "nav.home": {
    en: "Home",
    de: "Startseite",
    ar: "الرئيسية",
    fr: "Accueil",
  },
  "nav.about": {
    en: "About",
    de: "Über mich",
    ar: "نبذة عني",
    fr: "À propos",
  },
  "nav.experience": {
    en: "Experience",
    de: "Berufserfahrung",
    ar: "الخبرة",
    fr: "Expérience",
  },
  "nav.projects": {
    en: "Projects",
    de: "Projekte",
    ar: "المشاريع",
    fr: "Projets",
  },
  "nav.contact": {
    en: "Contact",
    de: "Kontakt",
    ar: "اتصل بي",
    fr: "Contact",
  },
  "nav.languages": {
    en: "Languages",
    de: "Sprachen",
    ar: "اللغات",
    fr: "Langues",
  },
  
  // Hero
  "hero.title": {
    en: "Amjad Awad-Allah",
    de: "Amjad Awad-Allah",
    ar: "أمجد عوض الله",
    fr: "Amjad Awad-Allah",
  },
  "hero.subtitle": {
    en: "Android Developer",
    de: "Android-Entwickler",
    ar: "مطور تطبيقات أندرويد",
    fr: "Développeur Android",
  },
  "hero.cta": {
    en: "Get in touch",
    de: "Kontakt aufnehmen",
    ar: "تواصل معي",
    fr: "Contactez-moi",
  },
  
  // About
  "about.title": {
    en: "About Me",
    de: "Über mich",
    ar: "نبذة عني",
    fr: "À propos de moi",
  },
  "about.bio": {
    en: "I'm an experienced Android Developer with a passion for creating innovative mobile solutions. With a strong foundation in software engineering and a keen eye for detail, I specialize in developing efficient, user-friendly applications that solve real-world problems.",
    de: "Ich bin ein erfahrener Android-Entwickler mit einer Leidenschaft für die Entwicklung innovativer mobiler Lösungen. Mit einer soliden Grundlage in der Softwareentwicklung und einem Auge fürs Detail spezialisiere ich mich auf die Entwicklung effizienter, benutzerfreundlicher Anwendungen, die reale Probleme lösen.",
    ar: "أنا مطور أندرويد ذو خبرة ولدي شغف بإنشاء حلول مبتكرة للهواتف المحمولة. مع أساس قوي في هندسة البرمجيات وعين فاحصة للتفاصيل، أتخصص في تطوير تطبيقات فعالة وسهلة الاستخدام تحل مشكلات العالم الحقيقي.",
    fr: "Je suis un développeur Android expérimenté passionné par la création de solutions mobiles innovantes. Avec une solide formation en génie logiciel et un souci du détail, je me spécialise dans le développement d'applications efficaces et conviviales qui résolvent des problèmes concrets.",
  },
  "about.education.title": {
    en: "Education",
    de: "Ausbildung",
    ar: "التعليم",
    fr: "Éducation",
  },
  "about.education.degree": {
    en: "Bachelor's degree in Artificial Intelligence and Informatics Engineering",
    de: "Bachelor in Künstlicher Intelligenz und Informatik",
    ar: "بكالوريوس في الذكاء الاصطناعي وهندسة المعلوماتية",
    fr: "Licence en Intelligence Artificielle et Ingénierie Informatique",
  },
  "about.education.university": {
    en: "AIU, Damascus",
    de: "AIU, Damaskus",
    ar: "الجامعة الدولية الخاصة للعلوم والتكنولوجيا، دمشق",
    fr: "AIU, Damas",
  },
  "about.education.years": {
    en: "2012-2017",
    de: "2012-2017",
    ar: "2012-2017",
    fr: "2012-2017",
  },
  "about.experience.title": {
    en: "Work Experience",
    de: "Berufserfahrung",
    ar: "الخبرة العملية",
    fr: "Expérience professionnelle",
  },
  "about.experience.overview": {
    en: "With over 6 years of professional experience, I've worked across various domains in mobile development, delivering high-quality solutions for clients worldwide.",
    de: "Mit über 6 Jahren Berufserfahrung habe ich in verschiedenen Bereichen der mobilen Entwicklung gearbeitet und hochwertige Lösungen für Kunden weltweit geliefert.",
    ar: "مع أكثر من 6 سنوات من الخبرة المهنية، عملت في مختلف مجالات تطوير تطبيقات الهواتف المحمولة، وقدمت حلولاً عالية الجودة لعملاء في جميع أنحاء العالم.",
    fr: "Avec plus de 6 ans d'expérience professionnelle, j'ai travaillé dans divers domaines du développement mobile, fournissant des solutions de haute qualité à des clients du monde entier.",
  },
  
  // Experience
  "experience.title": {
    en: "Work Experience",
    de: "Berufserfahrung",
    ar: "الخبرة العملية",
    fr: "Expérience professionnelle",
  },
  "experience.company.nvssoft": {
    en: "NVS-SOFT (Dubai, Solutions - Syrian Branch)",
    de: "NVS-SOFT (Dubai, Solutions - Syrische Niederlassung)",
    ar: "NVS-SOFT (دبي، حلول - الفرع السوري)",
    fr: "NVS-SOFT (Dubaï, Solutions - Branche syrienne)",
  },
  "experience.company.protech": {
    en: "PROTECH Group (Damascus, Syria)",
    de: "PROTECH Group (Damaskus, Syrien)",
    ar: "مجموعة PROTECH (دمشق، سوريا)",
    fr: "PROTECH Group (Damas, Syrie)",
  },
  "experience.company.smartangel": {
    en: "Smart Angel (Erbil, Iraq)",
    de: "Smart Angel (Erbil, Irak)",
    ar: "Smart Angel (أربيل، العراق)",
    fr: "Smart Angel (Erbil, Irak)",
  },
  "experience.company.supertech": {
    en: "Supertech (Syria)",
    de: "Supertech (Syrien)",
    ar: "Supertech (سوريا)",
    fr: "Supertech (Syrie)",
  },
  "experience.position": {
    en: "Android Developer",
    de: "Android-Entwickler",
    ar: "مطور أندرويد",
    fr: "Développeur Android",
  },
  "experience.responsibilities": {
    en: "Key Responsibilities",
    de: "Hauptverantwortlichkeiten",
    ar: "المسؤوليات الرئيسية",
    fr: "Responsabilités clés",
  },
  "experience.projects": {
    en: "Projects",
    de: "Projekte",
    ar: "المشاريع",
    fr: "Projets",
  },
  
  // Projects
  "projects.title": {
    en: "Projects",
    de: "Projekte",
    ar: "المشاريع",
    fr: "Projets",
  },
  "projects.technologies": {
    en: "Technologies",
    de: "Technologien",
    ar: "التقنيات",
    fr: "Technologies",
  },
  "projects.live": {
    en: "Live Preview",
    de: "Live-Vorschau",
    ar: "معاينة مباشرة",
    fr: "Aperçu en direct",
  },
  "projects.download": {
    en: "Download",
    de: "Herunterladen",
    ar: "تحميل",
    fr: "Télécharger",
  },
  "projects.filterBy": {
    en: "Filter by",
    de: "Filtern nach",
    ar: "فلترة بواسطة",
    fr: "Filtrer par",
  },
  "projects.allProjects": {
    en: "All Projects",
    de: "Alle Projekte",
    ar: "جميع المشاريع",
    fr: "Tous les projets",
  },
  "projects.company": {
    en: "Company",
    de: "Unternehmen",
    ar: "الشركة",
    fr: "Entreprise",
  },
  "projects.technology": {
    en: "Technology",
    de: "Technologie",
    ar: "التقنية",
    fr: "Technologie",
  },
  "projects.year": {
    en: "Year",
    de: "Jahr",
    ar: "السنة",
    fr: "Année",
  },
  "projects.selectCompany": {
    en: "Select company",
    de: "Unternehmen auswählen",
    ar: "اختر الشركة",
    fr: "Sélectionner l'entreprise",
  },
  "projects.selectTechnology": {
    en: "Select technology",
    de: "Technologie auswählen",
    ar: "اختر التقنية",
    fr: "Sélectionner la technologie",
  },
  "projects.selectYear": {
    en: "Select year",
    de: "Jahr auswählen",
    ar: "اختر السنة",
    fr: "Sélectionner l'année",
  },
  "projects.noResults": {
    en: "No projects match your filter criteria.",
    de: "Keine Projekte entsprechen Ihren Filterkriterien.",
    ar: "لا توجد مشاريع تطابق معايير التصفية الخاصة بك.",
    fr: "Aucun projet ne correspond à vos critères de filtrage.",
  },
  "projects.resetFilters": {
    en: "Reset Filters",
    de: "Filter zurücksetzen",
    ar: "إعادة تعيين عوامل التصفية",
    fr: "Réinitialiser les filtres",
  },
  "projects.viewDetails": {
    en: "View Details",
    de: "Details anzeigen",
    ar: "عرض التفاصيل",
    fr: "Voir les détails",
  },
  
  // Contact
  "contact.title": {
    en: "Contact",
    de: "Kontakt",
    ar: "اتصل",
    fr: "Contact",
  },
  "contact.subtitle": {
    en: "Get in touch",
    de: "Kontakt aufnehmen",
    ar: "تواصل معي",
    fr: "Entrer en contact",
  },
  "contact.name": {
    en: "Name",
    de: "Name",
    ar: "اسم",
    fr: "Nom",
  },
  "contact.email": {
    en: "Email",
    de: "E-Mail",
    ar: "بريد إلكتروني",
    fr: "Email",
  },
  "contact.message": {
    en: "Message",
    de: "Nachricht",
    ar: "رسالة",
    fr: "Message",
  },
  "contact.send": {
    en: "Send Message",
    de: "Nachricht senden",
    ar: "أرسل رسالة",
    fr: "Envoyer le message",
  },
  "contact.phone": {
    en: "Phone",
    de: "Telefon",
    ar: "هاتف",
    fr: "Téléphone",
  },
  "contact.location": {
    en: "Location",
    de: "Standort",
    ar: "موقع",
    fr: "Emplacement",
  },
  "contact.connect": {
    en: "Let's connect!",
    de: "Lass uns verbinden!",
    ar: "هيا نتواصل!",
    fr: "Connectons-nous!",
  },
  "contact.openTo": {
    en: "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.",
    de: "Ich bin immer offen für die Diskussion neuer Projekte, kreativer Ideen oder Möglichkeiten, Teil Ihrer Vision zu sein.",
    ar: "أنا دائمًا منفتح لمناقشة مشاريع جديدة أو أفكار إبداعية أو فرص لأكون جزءًا من رؤيتك.",
    fr: "Je suis toujours ouvert à discuter de nouveaux projets, d'idées créatives ou d'opportunités de faire partie de votre vision.",
  },
  "contact.reachOut": {
    en: "Feel free to reach out through any of the channels above or by filling out the contact form.",
    de: "Zögere nicht, über einen der oben genannten Kanäle oder über das Kontaktformular mit mir in Verbindung zu treten.",
    ar: "لا تتردد في التواصل من خلال أي من القنوات المذكورة أعلاه أو عن طريق ملء نموذج الاتصال.",
    fr: "N'hésitez pas à me contacter via l'un des canaux ci-dessus ou en remplissant le formulaire de contact.",
  },
  
  // Theme
  "theme.light": {
    en: "Light",
    de: "Hell",
    ar: "فاتح",
    fr: "Clair",
  },
  "theme.dark": {
    en: "Dark",
    de: "Dunkel",
    ar: "داكن",
    fr: "Sombre",
  },
  "theme.system": {
    en: "System",
    de: "System",
    ar: "النظام",
    fr: "Système",
  },
  
  // Languages section
  "languages.title": {
    en: "Languages",
    de: "Sprachen",
    ar: "اللغات",
    fr: "Langues",
  },
  "languages.subtitle": {
    en: "My language proficiency",
    de: "Meine Sprachkenntnisse",
    ar: "إتقاني للغات",
    fr: "Ma maîtrise des langues",
  },
  "languages.english": {
    en: "English",
    de: "Englisch",
    ar: "الإنجليزية",
    fr: "Anglais",
  },
  "languages.german": {
    en: "German",
    de: "Deutsch",
    ar: "الألمانية",
    fr: "Allemand",
  },
  "languages.arabic": {
    en: "Arabic",
    de: "Arabisch",
    ar: "العربية",
    fr: "Arabe",
  },
  "languages.french": {
    en: "French",
    de: "Französisch",
    ar: "الفرنسية",
    fr: "Français",
  },
  "languages.native": {
    en: "Native",
    de: "Muttersprache",
    ar: "اللغة الأم",
    fr: "Langue maternelle",
  },
  "languages.fluent": {
    en: "Fluent",
    de: "Fließend",
    ar: "طلاقة",
    fr: "Courant",
  },
  "languages.intermediate": {
    en: "Intermediate",
    de: "Mittelstufe",
    ar: "متوسط",
    fr: "Intermédiaire",
  },
  "languages.beginner": {
    en: "Beginner",
    de: "Anfänger",
    ar: "مبتدئ",
    fr: "Débutant",
  },
};

// Define context type
type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: () => "",
});

// Create provider component
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Check if there's a stored language preference
    const storedLanguage = localStorage.getItem("language") as Language | null;
    
    if (storedLanguage && (storedLanguage === "en" || storedLanguage === "de" || storedLanguage === "ar" || storedLanguage === "fr")) {
      return storedLanguage;
    }
    
    // Check browser language
    const browserLanguage = navigator.language.split('-')[0];
    if (browserLanguage === "de") return "de";
    if (browserLanguage === "ar") return "ar";
    if (browserLanguage === "fr") return "fr";
    return "en";
  });
  
  // Save language preference to localStorage when it changes
  React.useEffect(() => {
    localStorage.setItem("language", language);
    console.log("Language set to:", language);
    
    // Update HTML lang attribute
    document.documentElement.lang = language;
    
    // Update document direction for Arabic
    if (language === "ar") {
      document.documentElement.dir = "rtl";
    } else {
      document.documentElement.dir = "ltr";
    }
  }, [language]);

  // Translate function
  const t = (key: string): string => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language];
    }
    console.warn(`Translation '${key}' for language '${language}' not found.`);
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Create custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);
