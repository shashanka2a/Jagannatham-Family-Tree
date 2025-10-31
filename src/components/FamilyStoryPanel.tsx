'use client'

import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Users, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface FamilyStoryPanelProps {
  darkMode: boolean;
  selectedMember: string | null;
  onClose: () => void;
}

const familyStories: { [key: string]: any } = {
  '1': {
    name: 'Jagannatham Subhash Chandar',
    fullName: 'Jagannatham Subhash Chandar',
    role: 'Grandfather',
    birth: '?',
    death: '2008',
    bio: 'A wise patriarch who laid the foundation for our family values. Known for his dedication to education and community service, he believed in the power of knowledge to transform lives.',
    photo: 'https://images.unsplash.com/photo-1602138038255-fd72c20ab750?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400&fit=crop',
    story: 'He spent his life working in education, touching countless lives through his teaching. His evenings were dedicated to community gatherings where he would share stories and wisdom with younger generations.',
    legacy: 'Established a scholarship fund for underprivileged students'
  },
  '2': {
    name: 'Jagannatham Soubagya Laxmi',
    fullName: 'Jagannatham Soubagya Laxmi',
    role: 'Grandmother',
    birth: '?',
    bio: 'A loving matriarch known for her warmth and traditional wisdom.',
    photo: 'https://images.unsplash.com/photo-1622461828050-c47d16bd89ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400&fit=crop',
    story: 'She was the heart of the family, known for bringing everyone together during festivals and celebrations. Her recipes and stories have been passed down through generations.',
    legacy: 'Keeper of family traditions and cultural heritage'
  },
  '3': {
    name: 'Laxman Swamy Ekangi',
    fullName: 'Laxman Swamy Ekangi',
    role: 'Grandfather',
    birth: '?',
    death: '1978',
    bio: 'A distinguished gentleman remembered for his integrity and dedication.',
    photo: 'https://images.unsplash.com/photo-1602138038255-fd72c20ab750?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400&fit=crop',
    story: 'A man of principles who served his community with distinction. His commitment to honesty and hard work set an example for all who knew him.',
    legacy: 'Built the family home that still stands today'
  },
  '4': {
    name: 'Urmila Laxman',
    fullName: 'Urmila Laxman',
    role: 'Grandmother',
    birth: '?',
    bio: 'A graceful woman who brought joy and stability to the family.',
    photo: 'https://images.unsplash.com/photo-1622461828050-c47d16bd89ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400&fit=crop',
    story: 'Known for her artistic talents and gentle nature, she created a warm home filled with love and creativity. Her handcrafted items are still treasured family heirlooms.',
    legacy: 'Created beautiful textiles that remain family treasures'
  },
  '5': {
    name: 'Jagannatham Ravi Chander',
    fullName: 'Jagannatham Ravi Chander',
    role: 'Father',
    birth: '1969',
    bio: 'An accomplished professional and devoted family man who bridges tradition with modernity.',
    photo: 'https://images.unsplash.com/photo-1664101606938-e664f5852fac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400&fit=crop',
    story: 'He has successfully blended traditional values with modern thinking, creating a nurturing environment for the next generation while honoring the wisdom of ancestors.',
    legacy: 'Modernized family business while preserving core values'
  },
  '6': {
    name: 'Jagannatham Bharati',
    fullName: 'Jagannatham Bharati',
    role: 'Mother',
    birth: '1976',
    bio: 'A nurturing presence who brings creativity and compassion to every aspect of life.',
    photo: 'https://images.unsplash.com/photo-1749189516333-168cfd97de0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400&fit=crop',
    story: 'With a passion for the arts and education, she has inspired many through her work and dedication. Her home is a gathering place where culture and learning flourish.',
    legacy: 'Advocates for education and women\'s empowerment'
  },
  '7': {
    name: 'Jagannatham Shashank',
    fullName: 'Jagannatham Shashank',
    role: 'Son',
    birth: '2000',
    bio: 'A bright young individual pursuing dreams while honoring family heritage.',
    photo: 'https://images.unsplash.com/photo-1648577739099-f1e18f8563f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400&fit=crop',
    story: 'The newest generation carries forward the family legacy with fresh perspectives and energy, while staying rooted in the values taught by previous generations.',
    legacy: 'Building the future while honoring the past'
  },
  '8': {
    name: 'Jagannatham Shivani',
    fullName: 'Jagannatham Shivani',
    role: 'Daughter',
    birth: '2002',
    bio: 'A talented and creative individual with a passion for making a difference.',
    photo: 'https://images.unsplash.com/photo-1761125050322-bbfc155571bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400&fit=crop',
    story: 'Bringing innovation and compassion to everything she does, she represents the bright future of the family. Her artistic talents and drive for positive change inspire those around her.',
    legacy: 'Pioneering new paths while cherishing family roots'
  }
};

export function FamilyStoryPanel({ darkMode, selectedMember, onClose }: FamilyStoryPanelProps) {
  const story = selectedMember ? familyStories[selectedMember] : null;

  return (
    <AnimatePresence>
      {story && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={`fixed right-0 top-0 bottom-0 w-full md:w-[500px] z-50 overflow-y-auto ${
              darkMode ? 'bg-[#1a1f2e]' : 'bg-white'
            } shadow-2xl`}
          >
            {/* Header */}
            <div className={`sticky top-0 z-10 backdrop-blur-md border-b transition-colors ${
              darkMode 
                ? 'bg-[#1a1f2e]/95 border-gray-800' 
                : 'bg-white/95 border-gray-200'
            }`}>
              <div className="p-4 md:p-6 flex items-center justify-between">
                <h2 className={`transition-colors ${darkMode ? 'text-white' : 'text-[#334155]'}`}>
                  Family Story
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className={`rounded-full transition-colors ${
                    darkMode ? 'hover:bg-gray-800 hover:text-[#a3b18a]' : 'hover:bg-gray-100 hover:text-[#a3b18a]'
                  }`}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 md:p-6">
              {/* Hero Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="relative w-40 h-40 md:w-48 md:h-48 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-[#a3b18a]/30 shadow-xl"
              >
                {story.photo && (
                  <div className="relative w-full h-full">
                    <ImageWithFallback
                      src={story.photo}
                      alt={story.fullName}
                      className="object-cover"
                    />
                  </div>
                )}
              </motion.div>

              {/* Name & Role */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center mb-8"
              >
                <h3 className={`text-2xl mb-2 ${darkMode ? 'text-white' : 'text-[#334155]'}`}>
                  {story.fullName}
                </h3>
                <p className="text-[#a3b18a] mb-2">
                  {story.role}
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {story.death ? `${story.birth} - ${story.death}` : story.birth}
                </p>
              </motion.div>

              {/* Bio Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className={`rounded-xl p-6 mb-6 ${
                  darkMode ? 'bg-[#0e1116]' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="w-5 h-5 text-[#a3b18a]" />
                  <h4 className={darkMode ? 'text-white' : 'text-[#334155]'}>
                    About
                  </h4>
                </div>
                <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {story.bio}
                </p>
              </motion.div>

              {/* Story Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className={`rounded-xl p-6 mb-6 ${
                  darkMode ? 'bg-[#0e1116]' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-5 h-5 text-[#f6c177]" />
                  <h4 className={darkMode ? 'text-white' : 'text-[#334155]'}>
                    Their Story
                  </h4>
                </div>
                <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {story.story}
                </p>
              </motion.div>

              {/* Legacy Section */}
              {story.legacy && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className={`rounded-xl p-6 border-2 ${
                    darkMode 
                      ? 'bg-[#a3b18a]/5 border-[#a3b18a]/30' 
                      : 'bg-[#a3b18a]/5 border-[#a3b18a]/20'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-5 h-5 text-[#a3b18a]" />
                    <h4 className={darkMode ? 'text-white' : 'text-[#334155]'}>
                      Legacy
                    </h4>
                  </div>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {story.legacy}
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
