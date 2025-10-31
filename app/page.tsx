'use client'

import { useState } from 'react';
import { FamilyTree } from '@/components/FamilyTree';
import { FamilyStoryPanel } from '@/components/FamilyStoryPanel';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-[#0e1116]' : 'bg-gradient-to-br from-[#f9fafb] to-[#e6eefc]'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 backdrop-blur-sm border-b transition-colors duration-300 ${darkMode ? 'bg-[#0e1116]/80 border-gray-800' : 'bg-white/80 border-gray-200'}`}>
        <div className="container mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-xl md:text-3xl ${darkMode ? 'text-white' : 'text-[#334155]'}`}>
                Jagannatham's Family Tree
              </h1>
              <p className={`text-xs md:text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Explore your ancestral lineage
              </p>
            </div>
            
            <Button
              variant="outline"
              size="icon"
              onClick={() => setDarkMode(!darkMode)}
              className={`${darkMode ? 'border-gray-700 hover:bg-gray-800' : ''} shrink-0`}
            >
              {darkMode ? <Sun className="h-4 w-4 md:h-5 md:w-5" /> : <Moon className="h-4 w-4 md:h-5 md:w-5" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full px-2 md:px-6 py-6 md:py-12">
        <FamilyTree 
          darkMode={darkMode} 
          searchQuery=""
          selectedMember={selectedMember}
          onSelectMember={setSelectedMember}
        />
      </main>

      {/* Family Story Panel */}
      <FamilyStoryPanel 
        darkMode={darkMode}
        selectedMember={selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </div>
  );
}

