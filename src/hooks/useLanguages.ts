
import { useQuery } from '@tanstack/react-query';
import { getPersonalInfo } from '@/services/supabaseService';

export const useLanguages = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['personalInfo', 'languages'],
    queryFn: getPersonalInfo,
    select: (data) => data?.languages || {}
  });

  return {
    languages: data as Record<string, string>,
    isLoading,
    error
  };
};
