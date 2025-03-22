
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
  const [language, setLanguage] = useState<Language>("en");

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
