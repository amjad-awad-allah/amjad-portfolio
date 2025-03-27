
import { useQuery } from '@tanstack/react-query';
import { getProjects, getProfessionalExperience } from '@/services/supabaseService';
import { useState, useEffect } from 'react';
import { Project, ProfessionalExperience } from '@/types/database.types';

interface CompanyWithProjects {
  company: string;
  year: string;
  projects: Project[];
}

export const useProjects = () => {
  const [companiesWithProjects, setCompaniesWithProjects] = useState<CompanyWithProjects[]>([]);
  
  const {
    data: projects,
    isLoading: isProjectsLoading,
    error: projectsError
  } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects
  });
  
  const {
    data: experience,
    isLoading: isExperienceLoading,
    error: experienceError
  } = useQuery({
    queryKey: ['experience'],
    queryFn: getProfessionalExperience
  });
  
  useEffect(() => {
    if (projects && experience) {
      // Create a map of experience IDs to experience details
      const experienceMap = new Map<number, ProfessionalExperience>();
      experience.forEach(exp => {
        experienceMap.set(exp.id, exp);
      });
      
      // Group projects by company
      const projectsByCompany = new Map<string, Project[]>();
      
      projects.forEach(project => {
        const exp = experienceMap.get(project.experience_id);
        
        if (exp) {
          const companyKey = `${exp.company_name}_${exp.id}`;
          
          if (!projectsByCompany.has(companyKey)) {
            projectsByCompany.set(companyKey, []);
          }
          
          projectsByCompany.get(companyKey)?.push(project);
        }
      });
      
      // Convert to array structure
      const result: CompanyWithProjects[] = [];
      
      projectsByCompany.forEach((projects, companyKey) => {
        const [companyName, expIdStr] = companyKey.split('_');
        const expId = parseInt(expIdStr);
        const exp = experienceMap.get(expId);
        
        if (exp) {
          // Extract year from start date
          const startDate = new Date(exp.start_date);
          const endDate = exp.end_date ? new Date(exp.end_date) : new Date();
          const year = `${startDate.getFullYear()}-${endDate.getFullYear() === new Date().getFullYear() ? 'Present' : endDate.getFullYear()}`;
          
          result.push({
            company: exp.company_name,
            year,
            projects
          });
        }
      });
      
      // Sort by most recent experience
      result.sort((a, b) => {
        // Extract the start year from "YYYY-YYYY" or "YYYY-Present"
        const aYear = parseInt(a.year.split('-')[0]);
        const bYear = parseInt(b.year.split('-')[0]);
        return bYear - aYear;
      });
      
      setCompaniesWithProjects(result);
    }
  }, [projects, experience]);
  
  return {
    companies: companiesWithProjects,
    isLoading: isProjectsLoading || isExperienceLoading,
    error: projectsError || experienceError
  };
};
