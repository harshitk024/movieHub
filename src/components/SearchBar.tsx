
import { Search } from 'lucide-react';
import { SearchBarProps } from '../types/movie';

const SearchBar = ({ searchTerm, onSearchChange }: SearchBarProps) => {
  return (
    <div className="relative max-w-2xl mx-auto mb-8">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700 rounded-2xl 
                   text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                   focus:ring-purple-500 focus:border-transparent backdrop-blur-sm
                   transition-all duration-300 text-lg"
        />
      </div>
    </div>
  );
};

export default SearchBar;
