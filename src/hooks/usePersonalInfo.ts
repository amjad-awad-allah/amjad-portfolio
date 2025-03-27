
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPersonalInfo } from '@/services/supabaseService';
import { PersonalInfo } from '@/types/database.types';

export const usePersonalInfo = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['personalInfo'],
    queryFn: getPersonalInfo,
  });

  return {
    personalInfo: data,
    isLoading,
    error
  };
};
