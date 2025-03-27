
import supabase from '@/lib/supabase';
import { 
  PersonalInfo, 
  ProfessionalExperience, 
  Project, 
  TechnicalSkill, 
  Education, 
  Certification 
} from '@/types/database.types';

// Personal Info
export const getPersonalInfo = async (): Promise<PersonalInfo | null> => {
  const { data, error } = await supabase
    .from('Personal_Info')
    .select('*')
    .single();
  
  if (error) {
    console.error('Error fetching personal info:', error);
    return null;
  }
  
  return data;
};

// Professional Experience
export const getProfessionalExperience = async (): Promise<ProfessionalExperience[]> => {
  const { data, error } = await supabase
    .from('Professional_Experience')
    .select('*')
    .order('start_date', { ascending: false });
  
  if (error) {
    console.error('Error fetching professional experience:', error);
    return [];
  }
  
  return data;
};

// Projects
export const getProjects = async (): Promise<Project[]> => {
  const { data, error } = await supabase
    .from('Projects')
    .select('*');
  
  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
  
  return data;
};

// Get projects by experience ID
export const getProjectsByExperienceId = async (experienceId: number): Promise<Project[]> => {
  const { data, error } = await supabase
    .from('Projects')
    .select('*')
    .eq('experience_id', experienceId);
  
  if (error) {
    console.error(`Error fetching projects for experience ${experienceId}:`, error);
    return [];
  }
  
  return data;
};

// Technical Skills
export const getTechnicalSkills = async (): Promise<TechnicalSkill[]> => {
  const { data, error } = await supabase
    .from('Technical_Skills')
    .select('*');
  
  if (error) {
    console.error('Error fetching technical skills:', error);
    return [];
  }
  
  return data;
};

// Education
export const getEducation = async (): Promise<Education[]> => {
  const { data, error } = await supabase
    .from('Education')
    .select('*')
    .order('start_date', { ascending: false });
  
  if (error) {
    console.error('Error fetching education:', error);
    return [];
  }
  
  return data;
};

// Certifications
export const getCertifications = async (): Promise<Certification[]> => {
  const { data, error } = await supabase
    .from('Certifications')
    .select('*')
    .order('date_obtained', { ascending: false });
  
  if (error) {
    console.error('Error fetching certifications:', error);
    return [];
  }
  
  return data;
};
