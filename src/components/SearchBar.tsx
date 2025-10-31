'use client'

import { Search, X } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface SearchBarProps {
  darkMode: boolean;
  onSearch: (query: string) => void;
  searchQuery: string;
}

export function SearchBar({ darkMode, onSearch, searchQuery }: SearchBarProps) {
  return (
    <div className="relative w-full md:w-64">
      <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors ${
        searchQuery ? 'text-[#a3b18a]' : darkMode ? 'text-gray-400' : 'text-gray-500'
      }`} />
      <Input
        type="text"
        placeholder="Find your ancestor..."
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
        className={`pl-10 pr-10 text-sm transition-all duration-300 ${
          darkMode 
            ? 'bg-[#1a1f2e] border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-[#a3b18a] focus-visible:border-[#a3b18a]/50'
            : 'bg-white border-gray-300 focus-visible:ring-[#a3b18a] focus-visible:border-[#a3b18a]/50'
        } ${searchQuery ? 'ring-1 ring-[#a3b18a]/30' : ''}`}
      />
      {searchQuery && (
        <Button
          variant="ghost"
          size="icon"
          className={`absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 transition-colors ${
            darkMode ? 'hover:bg-gray-800 hover:text-[#a3b18a]' : 'hover:bg-gray-100 hover:text-[#a3b18a]'
          }`}
          onClick={() => onSearch('')}
        >
          <X className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}
