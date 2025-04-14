
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useLanguage } from '@/context/LanguageContext';

export type StaticContent = {
  id: number;
  section: string;
  content_key: string;
  en_text: string;
  de_text: string;
};

type ContentCache = {
  [key: string]: string;
};

export function useStaticContent(section: string) {
  const [content, setContent] = useState<StaticContent[]>([]);
  const [contentMap, setContentMap] = useState<ContentCache>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { language } = useLanguage();

  useEffect(() => {
    async function fetchContent() {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('static_content')
          .select('*')
          .eq('section', section);

        if (error) throw error;
        
        setContent(data || []);
        
        // Create a map of content_key to the appropriate language text
        const newContentMap: ContentCache = {};
        data?.forEach(item => {
          newContentMap[item.content_key] = language === 'en' ? item.en_text : item.de_text;
        });
        
        setContentMap(newContentMap);
      } catch (err) {
        console.error(`Error fetching static content for section ${section}:`, err);
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    }

    fetchContent();
  }, [section, language]);

  // Helper function to get content by key with fallback
  const getText = (key: string, fallback: string = ''): string => {
    const fullKey = `${section}-${key}`;
    return contentMap[fullKey] || fallback;
  };

  return { content, isLoading, error, getText };
}
