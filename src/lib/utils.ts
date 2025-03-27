
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Language } from "@/context/LanguageContext";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (dateString: string, language: Language = 'en') => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  
  if (language === 'de') {
    // German date format: TT.MM.YYYY
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  } else {
    // English date format: MMM YYYY
    return date.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    });
  }
};

// Get all technologies from projects
export function getAllTechnologies(projects: any[]): string[] {
  const technologies = new Set<string>();
  
  projects.forEach(project => {
    if (project.technologies_used && Array.isArray(project.technologies_used)) {
      project.technologies_used.forEach((tech: string) => {
        technologies.add(tech);
      });
    }
  });
  
  return Array.from(technologies).sort();
}

// Get all companies
export function getAllCompanies(companies: { company: string }[]): string[] {
  return [...new Set(companies.map(company => company.company))];
}

// Get all years
export function getAllYears(companies: { year: string }[]): string[] {
  return [...new Set(companies.map(company => company.year))];
}
