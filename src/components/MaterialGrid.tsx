import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import StudyMaterialCard from './StudyMaterialCard';
import { useMaterials, MaterialFilters } from '@/hooks/useMaterials';
import { Skeleton } from '@/components/ui/skeleton';
import { FileText, TrendingUp, Star, Clock } from 'lucide-react';

interface MaterialGridProps {
  searchQuery: string;
  filters: MaterialFilters;
}

const MaterialGrid: React.FC<MaterialGridProps> = ({ searchQuery, filters }) => {
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'rating'>('recent');
  const { materials, loading, downloadMaterial, previewMaterial } = useMaterials(searchQuery, filters);

  // Sort materials based on selected sort option
  const sortedMaterials = React.useMemo(() => {
    const sorted = [...materials];
    
    switch (sortBy) {
      case 'popular':
        return sorted.sort((a, b) => b.downloads - a.downloads);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'recent':
      default:
        return sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }
  }, [materials, sortBy]);

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Stats Header Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-4">
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-4 w-24" />
            </Card>
          ))}
        </div>
        
        {/* Tabs Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="p-6">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-4" />
                <Skeleton className="h-20 w-full mb-4" />
                <div className="flex justify-between">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-8 w-20" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Header */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="neon-border-gradient p-4 rounded-lg text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <FileText className="h-5 w-5 text-tech-orange" />
            <span className="text-2xl font-bold text-tech-orange">{sortedMaterials.length}</span>
          </div>
          <p className="text-sm text-muted-foreground">Materials Found</p>
        </div>
        
        <div className="neon-border-gradient p-4 rounded-lg text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-tech-red" />
            <span className="text-2xl font-bold text-tech-red">
              {sortedMaterials.reduce((sum, material) => sum + material.downloads, 0)}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">Total Downloads</p>
        </div>
        
        <div className="neon-border-gradient p-4 rounded-lg text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Star className="h-5 w-5 text-tech-white" />
            <span className="text-2xl font-bold text-tech-white">
              {sortedMaterials.length > 0 
                ? (sortedMaterials.reduce((sum, material) => sum + material.rating, 0) / sortedMaterials.length).toFixed(1)
                : '0.0'
              }
            </span>
          </div>
          <p className="text-sm text-muted-foreground">Average Rating</p>
        </div>
      </div>

      {/* Sort Tabs */}
      <Tabs value={sortBy} onValueChange={(value) => setSortBy(value as 'recent' | 'popular' | 'rating')} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3 bg-card border border-border">
          <TabsTrigger 
            value="recent" 
            className="data-[state=active]:bg-tech-orange/20 data-[state=active]:text-tech-orange"
          >
            <Clock className="h-4 w-4 mr-1" />
            Recent
          </TabsTrigger>
          <TabsTrigger 
            value="popular" 
            className="data-[state=active]:bg-tech-red/20 data-[state=active]:text-tech-red"
          >
            <TrendingUp className="h-4 w-4 mr-1" />
            Popular
          </TabsTrigger>
          <TabsTrigger 
            value="rating" 
            className="data-[state=active]:bg-tech-white/20 data-[state=active]:text-tech-white"
          >
            <Star className="h-4 w-4 mr-1" />
            Top Rated
          </TabsTrigger>
        </TabsList>

        <TabsContent value={sortBy} className="mt-6">
          {sortedMaterials.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground mb-2">No resources found</h3>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search or filters to find IT resources.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
              {sortedMaterials.map((material, index) => (
                <div
                  key={material.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <StudyMaterialCard
                    material={{
                      id: material.id,
                      title: material.title,
                      subject: material.subject,
                      subjectCode: material.subject_code || '',
                      branch: material.branch,
                      semester: material.semester,
                      year: material.year,
                      description: material.description || '',
                      fileType: material.file_type,
                      uploadDate: material.created_at,
                      downloads: material.downloads,
                      rating: material.rating,
                      uploader: material.profiles?.full_name || 'Anonymous'
                    }}
                    onDownload={downloadMaterial}
                    onPreview={previewMaterial}
                  />
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MaterialGrid;