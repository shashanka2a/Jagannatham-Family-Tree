'use client'

import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Users, Calendar, Phone, Mail, MapPin, GraduationCap, Briefcase, Sparkles, Droplet, Ruler, User } from 'lucide-react';
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
    photo: '/subhash.JPEG',
    story: 'He spent his life working in education, touching countless lives through his teaching. His evenings were dedicated to community gatherings where he would share stories and wisdom with younger generations.',
    legacy: 'Established a scholarship fund for underprivileged students'
  },
  '2': {
    name: 'Jagannatham Soubagya Laxmi',
    fullName: 'Jagannatham Soubagya Laxmi',
    role: 'Grandmother',
    birth: '?',
    bio: 'A loving matriarch known for her warmth and traditional wisdom.',
    photo: '/laxmi.JPEG',
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
    photo: '/laxman.JPEG',
    story: 'A man of principles who served his community with distinction. His commitment to honesty and hard work set an example for all who knew him.',
    legacy: 'Built the family home that still stands today'
  },
  '4': {
    name: 'Urmila Laxman',
    fullName: 'Urmila Laxman',
    role: 'Grandmother',
    birth: '?',
    bio: 'A graceful woman who brought joy and stability to the family.',
    photo: '/urmila.JPEG',
    story: 'Known for her artistic talents and gentle nature, she created a warm home filled with love and creativity. Her handcrafted items are still treasured family heirlooms.',
    legacy: 'Created beautiful textiles that remain family treasures'
  },
  '5': {
    name: 'Jagannatham Ravi Chander',
    fullName: 'Jagannatham Ravi Chander',
    role: 'Father',
    birth: '8 April 1969',
    death: null,
    bio: 'An accomplished professional and devoted family man who bridges tradition with modernity.',
    photo: '/ravi.JPEG',
    story: 'Born on 8 April 1969, Ravi Chander started his career in marketing at Atul Agency. He owned Savitha Photo Studio in 1994, one of the first photo studios in Nizamabad. Currently, he runs Vijetha Digital Studio, established in October 2009. Married on 22 May 1998.',
    legacy: 'Modernized family business while preserving core values',
    // Detailed information
    nakshatram: 'Moola Padam',
    rasi: 'Dhanushu',
    height: '5.2',
    color: 'White',
    bloodGroup: 'B+',
    education: [
      { level: '1 to 10th', institution: 'Pochampad', year: '1984' },
      { level: 'Intermediate M.P.C', institution: 'CSI College', year: '1986' },
      { level: 'B.Com', institution: 'Evening College', year: '1986-1988 (Discontinued)' }
    ],
    career: [
      { period: '1986-1988', role: 'Marketing', company: 'Atul Agency', details: 'Products: Maggie Noodles, Nescafe Coffee, Sunrise Coffee' },
      { period: '1988-1992', role: 'Job', company: 'Savitha Photo Studio', details: '1990: 1/3rd Share, 1992: 50/50 Partnership' },
      { period: '1994', role: 'Owner', company: 'Savitha Photo Studio', details: 'Investment: ₹2,00,000' },
      { period: '2009 - Present', role: 'Owner', company: 'Vijetha Digital Studio', details: 'Established October 2009' }
    ],
    marriage: '22 May 1998',
    contact: {
      phone: '9848765051',
      email: 'jrc8823@gmail.com',
      website: null
    },
    address: 'Vijetha Digital Studio, Shop No.14, Womens College Road, Kanteshwer, Nizamabad, 503002'
  },
  '6': {
    name: 'Jagannatham Bharati',
    fullName: 'Jagannatham Bharati',
    role: 'Mother',
    birth: '1976',
    bio: 'A nurturing presence who brings creativity and compassion to every aspect of life.',
    photo: '/bharathi.JPEG',
    story: 'With a passion for the arts and education, she has inspired many through her work and dedication. Her home is a gathering place where culture and learning flourish.',
    legacy: 'Advocates for education and women\'s empowerment'
  },
  '9': {
    name: 'Jagannatham Raghu Chander',
    fullName: 'Jagannatham Raghu Chander',
    role: 'Uncle',
    birth: '1972',
    bio: 'A dedicated professional and loving brother who values family connections and heritage.',
    photo: '/raghu.jpg',
    story: 'The younger brother of Ravi Chander, Raghu has always been a pillar of support for the family. His commitment to maintaining family traditions while embracing new opportunities has made him a beloved uncle and role model.',
    legacy: 'Strengthens family bonds across generations'
  },
  '7': {
    name: 'Jagannatham Shashank',
    fullName: 'Jagannatham Shashank',
    role: 'Son',
    birth: '2000',
    bio: 'A bright young individual pursuing dreams while honoring family heritage.',
    photo: '/shashank.jpg',
    story: 'The newest generation carries forward the family legacy with fresh perspectives and energy, while staying rooted in the values taught by previous generations.',
    legacy: 'Building the future while honoring the past'
  },
  '8': {
    name: 'Jagannatham Shivani',
    fullName: 'Jagannatham Shivani',
    role: 'Daughter',
    birth: '2002',
    bio: 'A talented and creative individual with a passion for making a difference.',
    photo: '/shivani.jpg',
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

              {/* Story Section - Converted from About */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className={`rounded-xl p-6 mb-6 ${
                  darkMode ? 'bg-[#0e1116]' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-[#a3b18a]" />
                  <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-[#334155]'}`}>
                    Story
                  </h4>
                </div>
                <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {story.story || story.bio}
                </p>
              </motion.div>

              {/* Personal Details Cards */}
              {(story.nakshatram || story.rasi || story.height || story.bloodGroup || story.birth) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mb-6"
                >
                  <h4 className={`text-sm font-semibold mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Personal Details
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {story.birth && (
                      <div className={`rounded-lg p-4 border transition-all hover:shadow-md ${
                        darkMode ? 'bg-[#0e1116] border-gray-800' : 'bg-white border-gray-200'
                      }`}>
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-4 h-4 text-[#a3b18a]" />
                          <span className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Date of Birth
                          </span>
                        </div>
                        <p className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-[#334155]'}`}>
                          {story.birth}
                        </p>
                      </div>
                    )}
                    {story.nakshatram && (
                      <div className={`rounded-lg p-4 border transition-all hover:shadow-md ${
                        darkMode ? 'bg-[#0e1116] border-gray-800' : 'bg-white border-gray-200'
                      }`}>
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="w-4 h-4 text-[#f6c177]" />
                          <span className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Nakshatram
                          </span>
                        </div>
                        <p className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-[#334155]'}`}>
                          {story.nakshatram}
                        </p>
                      </div>
                    )}
                    {story.rasi && (
                      <div className={`rounded-lg p-4 border transition-all hover:shadow-md ${
                        darkMode ? 'bg-[#0e1116] border-gray-800' : 'bg-white border-gray-200'
                      }`}>
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="w-4 h-4 text-[#f6c177]" />
                          <span className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Rasi
                          </span>
                        </div>
                        <p className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-[#334155]'}`}>
                          {story.rasi}
                        </p>
                      </div>
                    )}
                    {story.height && (
                      <div className={`rounded-lg p-4 border transition-all hover:shadow-md ${
                        darkMode ? 'bg-[#0e1116] border-gray-800' : 'bg-white border-gray-200'
                      }`}>
                        <div className="flex items-center gap-2 mb-2">
                          <Ruler className="w-4 h-4 text-[#a3b18a]" />
                          <span className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Height
                          </span>
                        </div>
                        <p className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-[#334155]'}`}>
                          {story.height} ft
                        </p>
                      </div>
                    )}
                    {story.bloodGroup && (
                      <div className={`rounded-lg p-4 border transition-all hover:shadow-md ${
                        darkMode ? 'bg-[#0e1116] border-gray-800' : 'bg-white border-gray-200'
                      }`}>
                        <div className="flex items-center gap-2 mb-2">
                          <Droplet className="w-4 h-4 text-red-500" />
                          <span className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Blood Group
                          </span>
                        </div>
                        <p className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-[#334155]'}`}>
                          {story.bloodGroup}
                        </p>
                      </div>
                    )}
                    {story.color && (
                      <div className={`rounded-lg p-4 border transition-all hover:shadow-md ${
                        darkMode ? 'bg-[#0e1116] border-gray-800' : 'bg-white border-gray-200'
                      }`}>
                        <div className="flex items-center gap-2 mb-2">
                          <User className="w-4 h-4 text-[#a3b18a]" />
                          <span className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Complexion
                          </span>
                        </div>
                        <p className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-[#334155]'}`}>
                          {story.color}
                        </p>
                      </div>
                    )}
                    {story.marriage && (
                      <div className={`rounded-lg p-4 border transition-all hover:shadow-md ${
                        darkMode ? 'bg-[#0e1116] border-gray-800' : 'bg-white border-gray-200'
                      }`}>
                        <div className="flex items-center gap-2 mb-2">
                          <Heart className="w-4 h-4 text-pink-500" />
                          <span className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Marriage
                          </span>
                        </div>
                        <p className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-[#334155]'}`}>
                          {story.marriage}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Education Cards */}
              {story.education && story.education.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mb-6"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <GraduationCap className="w-5 h-5 text-[#a3b18a]" />
                    <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-[#334155]'}`}>
                      Education
                    </h4>
                  </div>
                  <div className="space-y-3">
                    {story.education.map((edu: any, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className={`rounded-lg p-4 border transition-all hover:shadow-md ${
                          darkMode ? 'bg-[#0e1116] border-gray-800' : 'bg-white border-gray-200'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className={`text-sm font-semibold mb-1 ${darkMode ? 'text-white' : 'text-[#334155]'}`}>
                              {edu.level}
                            </p>
                            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {edu.institution}
                            </p>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            darkMode ? 'bg-[#a3b18a]/20 text-[#a3b18a]' : 'bg-[#a3b18a]/10 text-[#a3b18a]'
                          }`}>
                            {edu.year}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Career Timeline */}
              {story.career && story.career.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="mb-6"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Briefcase className="w-5 h-5 text-[#f6c177]" />
                    <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-[#334155]'}`}>
                      Career
                    </h4>
                  </div>
                  <div className="space-y-3">
                    {story.career.map((job: any, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                        className={`rounded-lg p-4 border-l-4 transition-all hover:shadow-md ${
                          darkMode 
                            ? 'bg-[#0e1116] border-[#a3b18a] border-gray-800' 
                            : 'bg-white border-[#a3b18a] border-gray-200'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-[#334155]'}`}>
                              {job.role}
                            </p>
                            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {job.company}
                            </p>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${
                            darkMode ? 'bg-[#f6c177]/20 text-[#f6c177]' : 'bg-[#f6c177]/10 text-[#f6c177]'
                          }`}>
                            {job.period}
                          </span>
                        </div>
                        {job.details && (
                          <p className={`text-xs mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {job.details}
                          </p>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Contact Information */}
              {(story.contact || story.address) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="mb-6"
                >
                  <h4 className={`text-sm font-semibold mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Contact & Address
                  </h4>
                  <div className={`rounded-lg border overflow-hidden ${
                    darkMode ? 'bg-[#0e1116] border-gray-800' : 'bg-white border-gray-200'
                  }`}>
                    {story.contact?.phone && (
                      <div className={`p-5 ${story.contact?.email || story.address ? `border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}` : ''}`}>
                        <div className="flex items-center gap-4">
                          <div className={`p-2.5 rounded-lg shrink-0 border ${
                            darkMode ? 'bg-[#a3b18a]/20 border-[#a3b18a]/30' : 'bg-[#a3b18a]/10 border-[#a3b18a]/20'
                          }`}>
                            <Phone className="w-4 h-4 text-[#a3b18a]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-xs mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              Phone
                            </p>
                            <a 
                              href={`tel:${story.contact.phone}`}
                              className={`text-sm font-semibold hover:text-[#a3b18a] transition-colors break-all ${
                                darkMode ? 'text-white' : 'text-[#334155]'
                              }`}
                            >
                              {story.contact.phone}
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                    {story.contact?.email && (
                      <div className={`p-5 ${story.address ? `border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}` : ''}`}>
                        <div className="flex items-center gap-4">
                          <div className={`p-2.5 rounded-lg shrink-0 border ${
                            darkMode ? 'bg-[#a3b18a]/20 border-[#a3b18a]/30' : 'bg-[#a3b18a]/10 border-[#a3b18a]/20'
                          }`}>
                            <Mail className="w-4 h-4 text-[#a3b18a]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-xs mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              Email
                            </p>
                            <a 
                              href={`mailto:${story.contact.email}`}
                              className={`text-sm font-semibold hover:text-[#a3b18a] transition-colors break-all ${
                                darkMode ? 'text-white' : 'text-[#334155]'
                              }`}
                            >
                              {story.contact.email}
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                    {story.address && (
                      <div className="p-5">
                        <div className="flex gap-4">
                          <div className={`p-2.5 rounded-lg shrink-0 border mt-0.5 ${
                            darkMode ? 'bg-[#a3b18a]/20 border-[#a3b18a]/30' : 'bg-[#a3b18a]/10 border-[#a3b18a]/20'
                          }`}>
                            <MapPin className="w-4 h-4 text-[#a3b18a]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-xs mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              Address
                            </p>
                            <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              {story.address}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

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
