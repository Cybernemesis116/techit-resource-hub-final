import { Download, Eye, Calendar, BookOpen, User, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface StudyMaterial {
  id: string;
  title: string;
  subject: string;
  subjectCode: string;
  branch: string;
  semester: string;
  year: string;
  description: string;
  fileType: string;
  uploadDate: string;
  downloads: number;
  rating: number;
  uploader: string;
}

interface StudyMaterialCardProps {
  material: StudyMaterial;
  onDownload: (id: string) => void;
  onPreview: (id: string) => void;
}

const StudyMaterialCard = ({ material, onDownload, onPreview }: StudyMaterialCardProps) => {
  const getGradientClass = (index: number) => {
    const gradients = [
      'gradient-primary',
      'gradient-secondary', 
      'gradient-accent',
      'from-neon-violet to-neon-blue',
      'from-neon-orange to-neon-red',
      'from-neon-olive to-neon-violet'
    ];
    return gradients[index % gradients.length];
  };

  const getFileTypeColor = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case 'pdf': return 'text-neon-red';
      case 'doc': case 'docx': return 'text-neon-blue';
      case 'ppt': case 'pptx': return 'text-neon-orange';
      default: return 'text-neon-violet';
    }
  };

  return (
    <Card className="group hover-lift neon-border-gradient bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-smooth overflow-hidden">
      {/* Header with gradient background */}
      <CardHeader className={`p-4 text-white relative overflow-hidden ${getGradientClass(parseInt(material.id))}`}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <BookOpen className="h-4 w-4" />
                <span className="text-sm font-medium opacity-90">{material.subjectCode}</span>
              </div>
              <h3 className="font-bold text-lg leading-tight mb-1">{material.subject}</h3>
              <p className="text-sm opacity-75 line-clamp-1">{material.title}</p>
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 ml-2">
              {material.fileType.toUpperCase()}
            </Badge>
          </div>
        </div>
        
        {/* Animated border effect */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
      </CardHeader>

      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">
            {material.description}
          </p>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Badge variant="outline" className="border-neon-violet/30 text-neon-violet">
              {material.branch}
            </Badge>
            <Badge variant="outline" className="border-neon-blue/30 text-neon-blue">
              Sem {material.semester}
            </Badge>
            <Badge variant="outline" className="border-neon-orange/30 text-neon-orange">
              {material.year}
            </Badge>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Download className="h-3 w-3" />
                {material.downloads}
              </span>
              <span className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-neon-orange text-neon-orange" />
                {material.rating}
              </span>
              <span className="flex items-center gap-1">
                <User className="h-3 w-3" />
                {material.uploader}
              </span>
            </div>
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {material.uploadDate}
            </span>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPreview(material.id)}
              className="flex-1 border-primary/30 text-primary hover:bg-primary/10 hover:border-primary transition-smooth"
            >
              <Eye className="h-3 w-3 mr-1" />
              Preview
            </Button>
            <Button
              size="sm"
              onClick={() => onDownload(material.id)}
              className="flex-1 gradient-primary text-primary-foreground hover:scale-105 transition-bounce neon-glow-blue"
            >
              <Download className="h-3 w-3 mr-1" />
              Download
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudyMaterialCard;