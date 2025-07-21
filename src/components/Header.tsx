import { useState } from 'react';
import { Search, Github, HardDrive, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import techitLogo from '/lovable-uploads/0cd58ef2-434f-4df8-b1ff-6459a3dea3e8.png';

interface HeaderProps {
  onMenuClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Header = ({ onMenuClick, searchQuery, onSearchChange }: HeaderProps) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = (platform: 'github' | 'drive') => {
    setIsConnecting(true);
    // Simulate connection process
    setTimeout(() => {
      setIsConnecting(false);
    }, 2000);
  };

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="md:hidden text-tech-orange hover:bg-tech-orange/10"
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <img 
              src={techitLogo} 
              alt="TechIT" 
              className="h-12 w-auto animate-float"
            />
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
                TechIT Resource Hub
              </h1>
              <p className="text-xs text-muted-foreground">Professional IT Learning Platform</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search materials, subjects, or topics..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 bg-input/50 border-primary/20 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-smooth glow-orange"
              />
            </div>
          </div>

          {/* Connection Icons */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleConnect('github')}
              className={`
                border-tech-red/30 text-tech-red hover:bg-tech-red/10 hover:border-tech-red
                transition-bounce hover:scale-110 relative overflow-hidden
                ${isConnecting ? 'animate-glow' : ''}
              `}
              title="Connect to GitHub"
            >
              <Github className="h-4 w-4" />
              {isConnecting && (
                <div className="absolute inset-0 bg-tech-red/20 animate-ping rounded-md" />
              )}
            </Button>
            
            <Button
              variant="outline" 
              size="icon"
              onClick={() => handleConnect('drive')}
              className={`
                border-tech-orange/30 text-tech-orange hover:bg-tech-orange/10 hover:border-tech-orange
                transition-bounce hover:scale-110 relative overflow-hidden
                ${isConnecting ? 'animate-glow' : ''}
              `}
              title="Connect to Google Drive"
            >
              <HardDrive className="h-4 w-4" />
              {isConnecting && (
                <div className="absolute inset-0 bg-tech-orange/20 animate-ping rounded-md" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;