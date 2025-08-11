import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import UploadSidebar from '@/components/UploadSidebar';
import FilterBar from '@/components/FilterBar';
import MaterialGrid from '@/components/MaterialGrid';

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    branch: '',
    semester: '',
    year: '',
    subject: ''
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      branch: '',
      semester: '',
      year: '',
      subject: ''
    });
  };

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="flex relative">
        {/* Contribute Button */}
        <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50">
          <Link to="/contribute">
            <Button 
              className="
                bg-tech-orange/90 hover:bg-tech-orange text-white 
                rounded-l-none rounded-r-lg px-4 py-6 
                transition-all duration-300 hover:scale-110 
                shadow-lg hover:shadow-tech-orange/50
                glow-orange group
              "
            >
              <div className="flex items-center gap-2">
                <Upload className="h-5 w-5 group-hover:animate-bounce" />
                <span className="font-medium">Contribute</span>
              </div>
            </Button>
          </Link>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 transition-smooth">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="text-center mb-8 relative z-10">
              <h1 className="text-4xl md:text-6xl font-extrabold mb-4 font-orbitron">
                <span className="text-white stroke-text-gradient animate-float relative">
                  Welcome to TechIT Resource Hub
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-inter">
                Your professional IT learning hub. Access, contribute, and excel with 
                <span className="text-tech-orange font-medium"> industry-leading technical resources</span> 
                tailored for your IT career advancement.
              </p>
            </div>

            {/* Filter Bar */}
            <FilterBar
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />

            {/* Materials Grid */}
            <MaterialGrid
              searchQuery={searchQuery}
              filters={filters}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
