-- Add foreign key relationship between materials and profiles
ALTER TABLE public.materials 
ADD CONSTRAINT materials_uploader_id_fkey 
FOREIGN KEY (uploader_id) REFERENCES public.profiles(user_id) ON DELETE CASCADE;