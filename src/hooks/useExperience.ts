
import { useQuery } from '@tanstack/react-query';
import { getProfessionalExperience, getProjectsByExperienceId } from '@/services/supabaseService';
import { useEffect, useState } from 'react';
import { Project, ProfessionalExperience } from '@/types/database.types';

export const useExperience = () => {
  const [experienceWithProjects, setExperienceWithProjects] = useState<
    (ProfessionalExperience & { projects: Project[] })[]
  >([]);
  
  const {
    data: experience,
    isLoading: isExperienceLoading,
    error: experienceError
  } = useQuery({
    queryKey: ['experience'],
    queryFn: getProfessionalExperience,
  });

  // Load projects for each experience
  useEffect(() => {
    const fetchProjects = async () => {
      if (!experience) return;
      
      const experienceWithProjects = await Promise.all(
        experience.map(async (exp) => {
          const projects = await getProjectsByExperienceId(exp.id);
          return { ...exp, projects };
        })
      );
      
      setExperienceWithProjects(experienceWithProjects);
    };
    
    fetchProjects();
  }, [experience]);

  return {
    experience: experienceWithProjects,
    isLoading: isExperienceLoading,
    error: experienceError
  };
};
