
import { useQuery } from '@tanstack/react-query';
import { getEducation, getCertifications } from '@/services/supabaseService';

export const useEducation = () => {
  const {
    data: education,
    isLoading: isEducationLoading,
    error: educationError
  } = useQuery({
    queryKey: ['education'],
    queryFn: getEducation,
  });

  const {
    data: certifications,
    isLoading: isCertificationsLoading,
    error: certificationsError
  } = useQuery({
    queryKey: ['certifications'],
    queryFn: getCertifications,
  });

  return {
    education,
    isEducationLoading,
    educationError,
    certifications,
    isCertificationsLoading,
    certificationsError,
    isLoading: isEducationLoading || isCertificationsLoading
  };
};
