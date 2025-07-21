import { useState } from 'react';
import { FileText, TrendingUp, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StudyMaterialCard from './StudyMaterialCard';
import { useToast } from '@/hooks/use-toast';

// Sample data - in a real app, this would come from an API
const sampleMaterials = [
  {
    id: '1',
    title: 'Complete Data Structures Notes with Examples',
    subject: 'Data Structures',
    subjectCode: 'CS201',
    branch: 'Computer Science',
    semester: '3',
    year: '2024',
    description: 'Comprehensive notes covering all data structures including arrays, linked lists, stacks, queues, trees, and graphs with practical examples.',
    fileType: 'pdf',
    uploadDate: '2024-01-15',
    downloads: 1247,
    rating: 4.8,
    uploader: 'Sarah Chen'
  },
  {
    id: '2',
    title: 'Algorithm Analysis and Design Presentation',
    subject: 'Algorithms',
    subjectCode: 'CS301',
    branch: 'Computer Science',
    semester: '4',
    year: '2024',
    description: 'PowerPoint slides covering sorting algorithms, searching techniques, dynamic programming, and complexity analysis.',
    fileType: 'pptx',
    uploadDate: '2024-01-12',
    downloads: 856,
    rating: 4.6,
    uploader: 'Alex Kumar'
  },
  {
    id: '3',
    title: 'Database Management System Lab Manual',
    subject: 'Database Management',
    subjectCode: 'CS202',
    branch: 'Computer Science',
    semester: '3',
    year: '2024',
    description: 'Complete lab manual with SQL queries, database design exercises, and practical examples for DBMS course.',
    fileType: 'pdf',
    uploadDate: '2024-01-10',
    downloads: 692,
    rating: 4.7,
    uploader: 'Priya Singh'
  },
  {
    id: '4',
    title: 'Computer Networks Protocol Stack',
    subject: 'Computer Networks',
    subjectCode: 'CS401',
    branch: 'Information Technology',
    semester: '5',
    year: '2024',
    description: 'Detailed explanation of OSI model, TCP/IP protocol suite, and network security fundamentals.',
    fileType: 'doc',
    uploadDate: '2024-01-08',
    downloads: 543,
    rating: 4.5,
    uploader: 'Michael Johnson'
  },
  {
    id: '5',
    title: 'Operating Systems Concepts and Implementation',
    subject: 'Operating Systems',
    subjectCode: 'CS302',
    branch: 'Computer Science',
    semester: '4',
    year: '2024',
    description: 'Process management, memory allocation, file systems, and synchronization with real-world examples.',
    fileType: 'pdf',
    uploadDate: '2024-01-05',
    downloads: 789,
    rating: 4.9,
    uploader: 'Emma Wilson'
  },
  {
    id: '6',
    title: 'Software Engineering Best Practices',
    subject: 'Software Engineering',
    subjectCode: 'CS402',
    branch: 'Computer Science',
    semester: '6',
    year: '2024',
    description: 'SDLC models, testing strategies, project management, and industry best practices for software development.',
    fileType: 'pptx',
    uploadDate: '2024-01-03',
    downloads: 634,
    rating: 4.4,
    uploader: 'David Lee'
  }
];

interface MaterialGridProps {
  searchQuery: string;
  filters: {
    branch: string;
    semester: string;
    year: string;
    subject: string;
  };
}

const MaterialGrid = ({ searchQuery, filters }: MaterialGridProps) => {
  const { toast } = useToast();
  const [sortBy, setSortBy] = useState('recent');

  // Filter materials based on search and filters
  const filteredMaterials = sampleMaterials.filter(material => {
    const matchesSearch = !searchQuery || 
      material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.subjectCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilters = 
      (!filters.branch || material.branch === filters.branch) &&
      (!filters.semester || material.semester === filters.semester) &&
      (!filters.year || material.year === filters.year) &&
      (!filters.subject || material.subject === filters.subject);

    return matchesSearch && matchesFilters;
  });

  // Sort materials
  const sortedMaterials = [...filteredMaterials].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.downloads - a.downloads;
      case 'rating':
        return b.rating - a.rating;
      case 'recent':
      default:
        return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
    }
  });

  const handleDownload = (id: string) => {
    const material = sampleMaterials.find(m => m.id === id);
    toast({
      title: "Download Started! 📥",
      description: `Downloading "${material?.title}" - ${material?.fileType.toUpperCase()} file`,
    });
  };

  const handlePreview = (id: string) => {
    const material = sampleMaterials.find(m => m.id === id);
    toast({
      title: "Opening Preview 👁️",
      description: `Loading preview for "${material?.title}"`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Stats Header */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="neon-border-gradient p-4 rounded-lg text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <FileText className="h-5 w-5 text-tech-orange" />
            <span className="text-2xl font-bold text-tech-orange">{filteredMaterials.length}</span>
          </div>
          <p className="text-sm text-muted-foreground">Materials Found</p>
        </div>
        
        <div className="neon-border-gradient p-4 rounded-lg text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-tech-red" />
            <span className="text-2xl font-bold text-tech-red">
              {filteredMaterials.reduce((sum, m) => sum + m.downloads, 0)}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">Total Downloads</p>
        </div>
        
        <div className="neon-border-gradient p-4 rounded-lg text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Star className="h-5 w-5 text-tech-white" />
            <span className="text-2xl font-bold text-tech-white">
              {filteredMaterials.length > 0 
                ? (filteredMaterials.reduce((sum, m) => sum + m.rating, 0) / filteredMaterials.length).toFixed(1)
                : '0.0'
              }
            </span>
          </div>
          <p className="text-sm text-muted-foreground">Average Rating</p>
        </div>
      </div>

      {/* Sort Tabs */}
      <Tabs value={sortBy} onValueChange={setSortBy} className="w-full">
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
                    material={material}
                    onDownload={handleDownload}
                    onPreview={handlePreview}
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