import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface UploadData {
  title: string;
  branch: string;
  semester: string;
  subject: string;
  subjectCode: string;
  year: string;
  description: string;
  file: File | null;
}

export const useUpload = () => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const uploadMaterial = async (uploadData: UploadData) => {
    if (!uploadData.file) {
      toast({
        title: "Error",
        description: "Please select a file to upload.",
        variant: "destructive",
      });
      return { success: false };
    }

    try {
      setUploading(true);

      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to upload materials.",
          variant: "destructive",
        });
        return { success: false };
      }

      // Upload file to storage
      const fileExt = uploadData.file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('study-materials')
        .upload(fileName, uploadData.file);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('study-materials')
        .getPublicUrl(fileName);

      // Insert material record
      const { error: insertError } = await supabase
        .from('materials')
        .insert({
          title: uploadData.title,
          description: uploadData.description,
          subject: uploadData.subject,
          branch: uploadData.branch,
          semester: uploadData.semester,
          year: uploadData.year,
          subject_code: uploadData.subjectCode,
          file_type: fileExt || 'unknown',
          file_url: publicUrl,
          file_size: uploadData.file.size,
          uploader_id: user.id,
        });

      if (insertError) {
        throw insertError;
      }

      toast({
        title: "Success!",
        description: "Material uploaded successfully!",
      });

      return { success: true };
    } catch (error) {
      console.error('Error uploading material:', error);
      toast({
        title: "Error",
        description: "Failed to upload material. Please try again.",
        variant: "destructive",
      });
      return { success: false };
    } finally {
      setUploading(false);
    }
  };

  return {
    uploadMaterial,
    uploading,
  };
};