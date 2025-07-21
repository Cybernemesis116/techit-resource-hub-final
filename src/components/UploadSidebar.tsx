import { useState } from 'react';
import { Upload, X, FileText, BookOpen, Calendar, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface UploadSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const branches = [
  'Computer Science', 'Information Technology', 'Electronics & Communication', 
  'Mechanical Engineering', 'Civil Engineering', 'Electrical Engineering'
];

const semesters = ['1', '2', '3', '4', '5', '6', '7', '8'];
const years = ['2024', '2023', '2022', '2021'];

const UploadSidebar = ({ isOpen, onClose }: UploadSidebarProps) => {
  const { toast } = useToast();
  const [uploadData, setUploadData] = useState({
    title: '',
    branch: '',
    semester: '',
    year: '',
    subject: '',
    subjectCode: '',
    description: '',
    file: null as File | null
  });

  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadData({ ...uploadData, file: e.dataTransfer.files[0] });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadData({ ...uploadData, file: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadData.file || !uploadData.title || !uploadData.branch || !uploadData.semester) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields and select a file.",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      toast({
        title: "Upload Successful! ✨",
        description: "Your study material has been uploaded to NeuroHub.",
      });
      setUploading(false);
      setUploadData({
        title: '', branch: '', semester: '', year: '', 
        subject: '', subjectCode: '', description: '', file: null
      });
      onClose();
    }, 2000);
  };

  return (
    <div className={`
      fixed inset-y-0 left-0 z-50 w-80 bg-card border-r border-border transform transition-transform duration-300 
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      md:relative md:translate-x-0 ${!isOpen && 'md:-translate-x-full'}
    `}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-neon-violet" />
            <h2 className="text-lg font-semibold text-neon-violet">Contribute</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Upload Form */}
        <div className="flex-1 overflow-y-auto p-4">
          <Card className="neon-border-gradient">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-neon-orange flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Upload Study Material
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* File Upload Area */}
                <div
                  className={`
                    border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer
                    ${dragActive 
                      ? 'border-neon-blue bg-neon-blue/5' 
                      : 'border-border hover:border-neon-blue/50 hover:bg-neon-blue/5'
                    }
                  `}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('fileInput')?.click()}
                >
                  <FileText className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                  {uploadData.file ? (
                    <p className="text-sm text-neon-blue font-medium">{uploadData.file.name}</p>
                  ) : (
                    <div>
                      <p className="text-sm font-medium">Drop files here or click to browse</p>
                      <p className="text-xs text-muted-foreground mt-1">PDF, DOC, PPT up to 10MB</p>
                    </div>
                  )}
                  <input
                    id="fileInput"
                    type="file"
                    className="hidden"
                    onChange={handleFileSelect}
                    accept=".pdf,.doc,.docx,.ppt,.pptx"
                  />
                </div>

                {/* Form Fields */}
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="title" className="text-xs text-foreground font-medium">Title *</Label>
                    <Input
                      id="title"
                      value={uploadData.title}
                      onChange={(e) => setUploadData({ ...uploadData, title: e.target.value })}
                      placeholder="e.g., Data Structures Notes"
                      className="bg-input/50"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs text-foreground font-medium">Branch *</Label>
                      <Select value={uploadData.branch} onValueChange={(value) => setUploadData({ ...uploadData, branch: value })}>
                        <SelectTrigger className="bg-input/50">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {branches.map(branch => (
                            <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-xs text-foreground font-medium">Semester *</Label>
                      <Select value={uploadData.semester} onValueChange={(value) => setUploadData({ ...uploadData, semester: value })}>
                        <SelectTrigger className="bg-input/50">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {semesters.map(sem => (
                            <SelectItem key={sem} value={sem}>Semester {sem}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs text-foreground font-medium">Subject</Label>
                      <Input
                        value={uploadData.subject}
                        onChange={(e) => setUploadData({ ...uploadData, subject: e.target.value })}
                        placeholder="Data Structures"
                        className="bg-input/50"
                      />
                    </div>

                    <div>
                      <Label className="text-xs text-foreground font-medium">Subject Code</Label>
                      <Input
                        value={uploadData.subjectCode}
                        onChange={(e) => setUploadData({ ...uploadData, subjectCode: e.target.value })}
                        placeholder="CS201"
                        className="bg-input/50"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs text-foreground font-medium">Year</Label>
                    <Select value={uploadData.year} onValueChange={(value) => setUploadData({ ...uploadData, year: value })}>
                      <SelectTrigger className="bg-input/50">
                        <SelectValue placeholder="Academic Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map(year => (
                          <SelectItem key={year} value={year}>{year}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-xs text-foreground font-medium">Description</Label>
                    <Textarea
                      value={uploadData.description}
                      onChange={(e) => setUploadData({ ...uploadData, description: e.target.value })}
                      placeholder="Brief description of the material..."
                      className="bg-input/50 h-16 resize-none"
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={uploading}
                  className="w-full gradient-primary text-primary-foreground hover:scale-105 transition-bounce neon-glow-blue"
                >
                  {uploading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Uploading...
                    </div>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Contribute Material
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UploadSidebar;