import { useState } from 'react';
import { Upload, FileText, BookOpen, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';

const branches = [
  'Computer Science', 'Information Technology', 'Electronics & Communication', 
  'Mechanical Engineering', 'Civil Engineering', 'Electrical Engineering'
];

const semesters = ['1', '2', '3', '4', '5', '6', '7', '8'];
const years = ['2024', '2023', '2022', '2021'];

const Contribute = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
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
        description: "Your IT resource has been uploaded to TechIT Resource Hub.",
      });
      setUploading(false);
      setUploadData({
        title: '', branch: '', semester: '', year: '', 
        subject: '', subjectCode: '', description: '', file: null
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header
        onMenuClick={() => {}}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" className="text-tech-orange hover:bg-tech-orange/10">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Resources
            </Button>
          </Link>
        </div>

        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 font-orbitron">
            <span className="text-white stroke-text-gradient animate-float relative">
              Contribute to TechIT
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-inter">
            Share your knowledge and help the IT community grow. Upload your resources to
            <span className="text-tech-orange font-medium"> make a difference</span> 
            in someone's learning journey.
          </p>
        </div>

        {/* Upload Form */}
        <div className="max-w-4xl mx-auto">
          <Card className="neon-border-gradient">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl text-tech-red flex items-center justify-center gap-3">
                <BookOpen className="h-6 w-6" />
                Upload IT Resource
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* File Upload Area */}
                <div
                  className={`
                    border-2 border-dashed rounded-lg p-12 text-center transition-colors cursor-pointer
                    ${dragActive 
                      ? 'border-tech-orange bg-tech-orange/5' 
                      : 'border-border hover:border-tech-orange/50 hover:bg-tech-orange/5'
                    }
                  `}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('fileInput')?.click()}
                >
                  <FileText className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                  {uploadData.file ? (
                    <div>
                      <p className="text-lg text-tech-orange font-medium mb-2">{uploadData.file.name}</p>
                      <p className="text-sm text-muted-foreground">Click to change file</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-xl font-medium mb-2">Drop files here or click to browse</p>
                      <p className="text-muted-foreground">PDF, DOC, PPT files up to 10MB</p>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <Label htmlFor="title" className="text-sm text-foreground font-medium">Resource Title *</Label>
                    <Input
                      id="title"
                      value={uploadData.title}
                      onChange={(e) => setUploadData({ ...uploadData, title: e.target.value })}
                      placeholder="e.g., Python Programming Complete Guide"
                      className="bg-input/50 mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-sm text-foreground font-medium">Branch *</Label>
                    <Select value={uploadData.branch} onValueChange={(value) => setUploadData({ ...uploadData, branch: value })}>
                      <SelectTrigger className="bg-input/50 mt-2">
                        <SelectValue placeholder="Select Branch" />
                      </SelectTrigger>
                      <SelectContent>
                        {branches.map(branch => (
                          <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm text-foreground font-medium">Semester *</Label>
                    <Select value={uploadData.semester} onValueChange={(value) => setUploadData({ ...uploadData, semester: value })}>
                      <SelectTrigger className="bg-input/50 mt-2">
                        <SelectValue placeholder="Select Semester" />
                      </SelectTrigger>
                      <SelectContent>
                        {semesters.map(sem => (
                          <SelectItem key={sem} value={sem}>Semester {sem}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm text-foreground font-medium">Subject</Label>
                    <Input
                      value={uploadData.subject}
                      onChange={(e) => setUploadData({ ...uploadData, subject: e.target.value })}
                      placeholder="e.g., Python Programming"
                      className="bg-input/50 mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-sm text-foreground font-medium">Subject Code</Label>
                    <Input
                      value={uploadData.subjectCode}
                      onChange={(e) => setUploadData({ ...uploadData, subjectCode: e.target.value })}
                      placeholder="e.g., IT101"
                      className="bg-input/50 mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-sm text-foreground font-medium">Academic Year</Label>
                    <Select value={uploadData.year} onValueChange={(value) => setUploadData({ ...uploadData, year: value })}>
                      <SelectTrigger className="bg-input/50 mt-2">
                        <SelectValue placeholder="Select Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map(year => (
                          <SelectItem key={year} value={year}>{year}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="md:col-span-2">
                    <Label className="text-sm text-foreground font-medium">Description</Label>
                    <Textarea
                      value={uploadData.description}
                      onChange={(e) => setUploadData({ ...uploadData, description: e.target.value })}
                      placeholder="Provide a detailed description of your IT resource, what topics it covers, and how it can help other students..."
                      className="bg-input/50 h-24 resize-none mt-2"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <Button 
                    type="submit" 
                    disabled={uploading}
                    className="w-full md:w-auto px-12 py-3 text-lg gradient-primary text-primary-foreground hover:scale-105 transition-bounce glow-orange"
                  >
                    {uploading ? (
                      <div className="flex items-center gap-3">
                        <div className="h-5 w-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Uploading Resource...
                      </div>
                    ) : (
                      <>
                        <Upload className="h-5 w-5 mr-3" />
                        Contribute Resource
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Contribute;