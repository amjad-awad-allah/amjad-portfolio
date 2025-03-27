
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  PersonalInfo, 
  ProfessionalExperience, 
  Project, 
  TechnicalSkill, 
  Education, 
  Certification 
} from '@/types/database';

export function usePersonalInfo() {
  const [data, setData] = useState<PersonalInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('Personal_Info')
          .select('*')
          .single();

        if (error) throw error;
        setData(data);
      } catch (err) {
        console.error('Error fetching personal info:', err);
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, isLoading, error };
}

export function useProfessionalExperience() {
  const [data, setData] = useState<ProfessionalExperience[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('Professional_Experience')
          .select('*')
          .order('start_date', { ascending: false });

        if (error) throw error;
        setData(data || []);
      } catch (err) {
        console.error('Error fetching professional experience:', err);
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, isLoading, error };
}

export function useProjects() {
  const [data, setData] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('Projects')
          .select('*');

        if (error) throw error;
        setData(data || []);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, isLoading, error };
}

export function useTechnicalSkills() {
  const [data, setData] = useState<TechnicalSkill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('Technical_Skills')
          .select('*')
          .order('skill_category');

        if (error) throw error;
        setData(data || []);
      } catch (err) {
        console.error('Error fetching technical skills:', err);
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, isLoading, error };
}

export function useEducation() {
  const [data, setData] = useState<Education[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('Education')
          .select('*')
          .order('start_date', { ascending: false });

        if (error) throw error;
        setData(data || []);
      } catch (err) {
        console.error('Error fetching education:', err);
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, isLoading, error };
}

export function useCertifications() {
  const [data, setData] = useState<Certification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('Certifications')
          .select('*')
          .order('date_obtained', { ascending: false });

        if (error) throw error;
        setData(data || []);
      } catch (err) {
        console.error('Error fetching certifications:', err);
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, isLoading, error };
}
