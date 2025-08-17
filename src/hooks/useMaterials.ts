import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Material {
  id: string;
  title: string;
  description?: string;
  subject: string;
  branch: string;
  semester: string;
  year: string;
  subject_code?: string;
  file_type: string;
  file_url?: string;
  file_size?: number;
  downloads: number;
  rating: number;
  rating_count: number;
  uploader_id: string;
  created_at: string;
  updated_at: string;
  profiles?: {
    full_name?: string;
  };
}

export interface MaterialFilters {
  branch?: string;
  semester?: string;
  year?: string;
  subject?: string;
}

export const useMaterials = (searchQuery: string = '', filters: MaterialFilters = {}) => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchMaterials();
  }, [searchQuery, filters]);

  const fetchMaterials = async () => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('materials')
        .select(`
          *,
          profiles!materials_uploader_id_fkey (
            full_name
          )
        `);

      // Apply filters
      if (filters.branch) {
        query = query.eq('branch', filters.branch);
      }
      if (filters.semester) {
        query = query.eq('semester', filters.semester);
      }
      if (filters.year) {
        query = query.eq('year', filters.year);
      }
      if (filters.subject) {
        query = query.eq('subject', filters.subject);
      }

      // Apply search query
      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%, description.ilike.%${searchQuery}%, subject.ilike.%${searchQuery}%`);
      }

      // Order by created_at descending
      query = query.order('created_at', { ascending: false });

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      setMaterials(data || []);
    } catch (error) {
      console.error('Error fetching materials:', error);
      toast({
        title: "Error",
        description: "Failed to fetch materials. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadMaterial = async (materialId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to download materials.",
          variant: "destructive",
        });
        return;
      }

      // Record the download
      const { error } = await supabase
        .from('downloads')
        .insert({
          user_id: user.id,
          material_id: materialId,
        });

      if (error && error.code !== '23505') { // Ignore duplicate key error
        throw error;
      }

      toast({
        title: "Download Started",
        description: "Your download will begin shortly.",
      });

      // Refresh materials to update download count
      await fetchMaterials();
    } catch (error) {
      console.error('Error downloading material:', error);
      toast({
        title: "Error",
        description: "Failed to download material. Please try again.",
        variant: "destructive",
      });
    }
  };

  const previewMaterial = async (materialId: string) => {
    // For now, just show a toast. In a real app, you'd open the file
    toast({
      title: "Preview Opening",
      description: "Material preview will open shortly.",
    });
  };

  return {
    materials,
    loading,
    downloadMaterial,
    previewMaterial,
    refetch: fetchMaterials,
  };
};