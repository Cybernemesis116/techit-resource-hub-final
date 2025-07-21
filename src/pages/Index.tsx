import { useState, useEffect } from 'react';
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
        {/* Upload Sidebar */}
        <UploadSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 transition-smooth">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                <span className="gradient-primary bg-clip-text text-transparent animate-float">
                  Welcome to TechIT Resource Hub
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
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
