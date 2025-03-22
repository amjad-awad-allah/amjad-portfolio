
import React, { createContext, useState, useContext, ReactNode } from "react";

// Define available languages
export type Language = "en" | "de";

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
  },
  "nav.about": {
    en: "About",
    de: "Über mich",
  },
  "nav.experience": {
    en: "Experience",
    de: "Berufserfahrung",
  },
  "nav.projects": {
    en: "Projects",
    de: "Projekte",
  },
  "nav.contact": {
    en: "Contact",
    de: "Kontakt",
  },
  
  // Hero
  "hero.title": {
    en: "Amjad Awad-Allah",
    de: "Amjad Awad-Allah",
  },
  "hero.subtitle": {
    en: "Android Developer",
    de: "Android-Entwickler",
  },
  "hero.cta": {
    en: "Get in touch",
    de: "Kontakt aufnehmen",
  },
  
  // About
  "about.title": {
    en: "About Me",
    de: "Über mich",
  },
  "about.bio": {
    en: "I'm an experienced Android Developer with a passion for creating innovative mobile solutions. With a strong foundation in software engineering and a keen eye for detail, I specialize in developing efficient, user-friendly applications that solve real-world problems.",
    de: "Ich bin ein erfahrener Android-Entwickler mit einer Leidenschaft für die Entwicklung innovativer mobiler Lösungen. Mit einer soliden Grundlage in der Softwareentwicklung und einem Auge fürs Detail spezialisiere ich mich auf die Entwicklung effizienter, benutzerfreundlicher Anwendungen, die reale Probleme lösen.",
  },
  "about.education.title": {
    en: "Education",
    de: "Ausbildung",
  },
  "about.education.degree": {
    en: "Bachelor's degree in Artificial Intelligence and Informatics Engineering",
    de: "Bachelor in Künstlicher Intelligenz und Informatik",
  },
  "about.education.university": {
    en: "AIU, Damascus",
    de: "AIU, Damaskus",
  },
  "about.education.years": {
    en: "2012-2017",
    de: "2012-2017",
  },
  "about.experience.title": {
    en: "Work Experience",
    de: "Berufserfahrung",
  },
  "about.experience.overview": {
    en: "With over 6 years of professional experience, I've worked across various domains in mobile development, delivering high-quality solutions for clients worldwide.",
    de: "Mit über 6 Jahren Berufserfahrung habe ich in verschiedenen Bereichen der mobilen Entwicklung gearbeitet und hochwertige Lösungen für Kunden weltweit geliefert.",
  },
  
  // Experience
  "experience.title": {
    en: "Work Experience",
    de: "Berufserfahrung",
  },
  "experience.company.nvssoft": {
    en: "NVS-SOFT (Dubai, Solutions - Syrian Branch)",
    de: "NVS-SOFT (Dubai, Solutions - Syrische Niederlassung)",
  },
  "experience.company.protech": {
    en: "PROTECH Group (Damascus, Syria)",
    de: "PROTECH Group (Damaskus, Syrien)",
  },
  "experience.company.smartangel": {
    en: "Smart Angel (Erbil, Iraq)",
    de: "Smart Angel (Erbil, Irak)",
  },
  "experience.company.supertech": {
    en: "Supertech (Syria)",
    de: "Supertech (Syrien)",
  },
  "experience.position": {
    en: "Android Developer",
    de: "Android-Entwickler",
  },
  "experience.responsibilities": {
    en: "Key Responsibilities",
    de: "Hauptverantwortlichkeiten",
  },
  "experience.projects": {
    en: "Projects",
    de: "Projekte",
  },
  
  // Projects
  "projects.title": {
    en: "Projects",
    de: "Projekte",
  },
  "projects.technologies": {
    en: "Technologies",
    de: "Technologien",
  },
  "projects.live": {
    en: "Live Preview",
    de: "Live-Vorschau",
  },
  "projects.download": {
    en: "Download",
    de: "Herunterladen",
  },
  "projects.filterBy": {
    en: "Filter by",
    de: "Filtern nach",
  },
  "projects.allProjects": {
    en: "All Projects",
    de: "Alle Projekte",
  },
  "projects.company": {
    en: "Company",
    de: "Unternehmen",
  },
  "projects.technology": {
    en: "Technology",
    de: "Technologie",
  },
  "projects.year": {
    en: "Year",
    de: "Jahr",
  },
  "projects.selectCompany": {
    en: "Select company",
    de: "Unternehmen auswählen",
  },
  "projects.selectTechnology": {
    en: "Select technology",
    de: "Technologie auswählen",
  },
  "projects.selectYear": {
    en: "Select year",
    de: "Jahr auswählen",
  },
  "projects.noResults": {
    en: "No projects match your filter criteria.",
    de: "Keine Projekte entsprechen Ihren Filterkriterien.",
  },
  "projects.resetFilters": {
    en: "Reset Filters",
    de: "Filter zurücksetzen",
  },
  "projects.viewDetails": {
    en: "View Details",
    de: "Details anzeigen",
  },
  
  // Contact
  "contact.title": {
    en: "Contact",
    de: "Kontakt",
  },
  "contact.subtitle": {
    en: "Get in touch",
    de: "Kontakt aufnehmen",
  },
  "contact.name": {
    en: "Name",
    de: "Name",
  },
  "contact.email": {
    en: "Email",
    de: "E-Mail",
  },
  "contact.message": {
    en: "Message",
    de: "Nachricht",
  },
  "contact.send": {
    en: "Send Message",
    de: "Nachricht senden",
  },
  "contact.phone": {
    en: "Phone",
    de: "Telefon",
  },
  "contact.location": {
    en: "Location",
    de: "Standort",
  },
  "contact.connect": {
    en: "Let's connect!",
    de: "Lass uns verbinden!",
  },
  "contact.openTo": {
    en: "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.",
    de: "Ich bin immer offen für die Diskussion neuer Projekte, kreativer Ideen oder Möglichkeiten, Teil Ihrer Vision zu sein.",
  },
  "contact.reachOut": {
    en: "Feel free to reach out through any of the channels above or by filling out the contact form.",
    de: "Zögere nicht, über einen der oben genannten Kanäle oder über das Kontaktformular mit mir in Verbindung zu treten.",
  },
  
  // Theme
  "theme.light": {
    en: "Light",
    de: "Hell",
  },
  "theme.dark": {
    en: "Dark",
    de: "Dunkel",
  },
  "theme.system": {
    en: "System",
    de: "System",
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
    
    if (storedLanguage && (storedLanguage === "en" || storedLanguage === "de")) {
      return storedLanguage;
    }
    
    // Check browser language
    const browserLanguage = navigator.language.split('-')[0];
    return browserLanguage === "de" ? "de" : "en";
  });
  
  // Save language preference to localStorage when it changes
  React.useEffect(() => {
    localStorage.setItem("language", language);
    console.log("Language set to:", language);
    
    // Update HTML lang attribute
    document.documentElement.lang = language;
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
