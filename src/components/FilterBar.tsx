import { Filter, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface FilterBarProps {
  filters: {
    branch: string;
    semester: string;
    year: string;
    subject: string;
  };
  onFilterChange: (key: string, value: string) => void;
  onClearFilters: () => void;
}

const branches = [
  'Computer Science', 'Information Technology', 'Electronics & Communication', 
  'Mechanical Engineering', 'Civil Engineering', 'Electrical Engineering'
];

const semesters = ['1', '2', '3', '4', '5', '6', '7', '8'];
const years = ['2024', '2023', '2022', '2021'];

const FilterBar = ({ filters, onFilterChange, onClearFilters }: FilterBarProps) => {
  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="bg-card/30 backdrop-blur-sm border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5 text-tech-orange" />
          <h3 className="font-medium text-tech-orange">Filters</h3>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="bg-tech-orange/20 text-tech-orange border-tech-orange/30">
              {activeFiltersCount} active
            </Badge>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear All
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Branch</label>
          <Select value={filters.branch} onValueChange={(value) => onFilterChange('branch', value)}>
            <SelectTrigger className="bg-input/50 border-primary/20">
              <SelectValue placeholder="All Branches" />
            </SelectTrigger>
            <SelectContent>
              {branches.map(branch => (
                <SelectItem key={branch} value={branch}>{branch}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Semester</label>
          <Select value={filters.semester} onValueChange={(value) => onFilterChange('semester', value)}>
            <SelectTrigger className="bg-input/50 border-primary/20">
              <SelectValue placeholder="All Semesters" />
            </SelectTrigger>
            <SelectContent>
              {semesters.map(sem => (
                <SelectItem key={sem} value={sem}>Semester {sem}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Year</label>
          <Select value={filters.year} onValueChange={(value) => onFilterChange('year', value)}>
            <SelectTrigger className="bg-input/50 border-primary/20">
              <SelectValue placeholder="All Years" />
            </SelectTrigger>
            <SelectContent>
              {years.map(year => (
                <SelectItem key={year} value={year}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Subject</label>
          <Select value={filters.subject} onValueChange={(value) => onFilterChange('subject', value)}>
            <SelectTrigger className="bg-input/50 border-primary/20">
              <SelectValue placeholder="All Subjects" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Data Structures">Data Structures</SelectItem>
              <SelectItem value="Algorithms">Algorithms</SelectItem>
              <SelectItem value="Database Management">Database Management</SelectItem>
              <SelectItem value="Computer Networks">Computer Networks</SelectItem>
              <SelectItem value="Operating Systems">Operating Systems</SelectItem>
              <SelectItem value="Software Engineering">Software Engineering</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;