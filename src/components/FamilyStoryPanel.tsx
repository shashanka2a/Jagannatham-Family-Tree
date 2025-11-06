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
    bio: 'Had a rough childhood, raised by his uncle (who owed money to his father). Worked and studied hard, traveling 30 km by walk and cycle to school. Completed degree with excellence. Joined as Jr. Officer in Irrigation Department and retired as Gazetted Officer after 35 years of service.',
    photo: '/subhash.JPEG',
    story: 'Despite a challenging childhood being raised by his uncle, Subhash Chandar demonstrated extraordinary determination. He traveled 30 km daily by walk and cycle to attend school, showing incredible dedication to his education. His hard work paid off as he excelled in his studies and completed his degree. He began his career as a Junior Officer in the Irrigation Department and through his commitment and excellence, rose to the rank of Gazetted Officer, serving for 35 years before retirement.',
    legacy: 'Overcame adversity through education and dedicated 35 years of service to the nation',
    education: [
      { level: 'School', institution: 'Zilla Parishad School, Killa', year: '' },
      { level: 'Degree', institution: 'Government College, Nizamabad', year: '' }
    ],
    career: [
      { period: '35 years', role: 'Junior Officer to Gazetted Officer', company: 'Irrigation Department', details: 'Started as Jr. Officer and retired as Gazetted Officer' }
    ]
  },
  '2': {
    name: 'Jagannatham Soubagya Laxmi',
    fullName: 'Jagannatham Soubagya Laxmi',
    role: 'Grandmother',
    birth: '?',
    bio: 'Studied until 10th standard. Was a princess to her father who was a principal at school. Got married at 12 after schooling. Faced hardships at maternal house and raised two children with strength and resilience.',
    photo: '/laxmi.JPEG',
    story: 'Soubhagya Laxmi was cherished as a princess by her father, who served as a principal at school. She completed her education until 10th standard. After completing her schooling, she got married at the age of 12. Despite facing significant hardships at her maternal house, she demonstrated remarkable strength and resilience in raising two children, becoming the pillar of the family.',
    legacy: 'Overcame hardships with grace and raised a loving family',
    education: [
      { level: 'Until 10th Standard', institution: '', year: '' }
    ],
    marriage: 'At age 12 (after schooling)'
  },
  '3': {
    name: 'Laxman Swamy Ekangi',
    fullName: 'Laxman Swamy Ekangi',
    role: 'Grandfather',
    birth: '1930',
    death: '1978',
    bio: "Brownish complexion; native of Pune; height 5'3\"; studied till 4th standard. Worked as an auto driver, then a motor mechanic, and later joined RJC as a foreman. Married in 1967.",
    photo: '/laxman.JPEG',
    story: 'Born in 1930 and native to Pune, Laxman Swamy worked first as an auto driver, later as a motor mechanic, and after a few years joined RJC as a foreman. His honesty, hard work, and dedication made him a respected figure among peers and family. He married in 1967.',
    legacy: 'Built the family home that still stands today',
    color: 'Brownish',
    height: '5.3',
    marriage: '1967',
    education: [
      { level: '4th Standard', institution: '', year: '' }
    ],
    career: [
      { period: '', role: 'Auto Driver', company: '', details: '' },
      { period: '', role: 'Motor Mechanic', company: '', details: '' },
      { period: '', role: 'Foreman', company: 'RJC', details: '' }
    ]
  },
  '4': {
    name: 'Urmila Laxman',
    fullName: 'Urmila Laxman',
    role: 'Grandmother',
    birth: '2-5-1945',
    bio: "Fair complexion; height 4'6\". Studied at Fatima High School (Warangal) for 1st–2nd and St. John High School (Solapur) for 2nd–10th. Worked as a teacher for 30 years at Dwarkanagar Primary School (private). Zodiac: Aries. Married in 1967.",
    photo: '/urmila.JPEG',
    story: 'Born on 2 May 1945, she studied at Fatima High School (Warangal) for 1st–2nd and St. John High School (Solapur) for 2nd–10th. She served as a teacher for 30 years at Dwarkanagar Primary School (private). Known for her kindness and dedication to children. Married in 1967.',
    legacy: 'Dedicated 30 years to educating children with care and patience',
    color: 'Fair',
    height: '4.5',
    rasi: 'Aries',
    marriage: '1967',
    education: [
      { level: '1 to 2', institution: 'Fatima High School (Warangal)', year: '' },
      { level: '2 to 10th', institution: 'St. John High School (Solapur)', year: '' }
    ],
    career: [
      { period: '30 years', role: 'Teacher', company: 'Dwarkanagar Primary School (Private)', details: '' }
    ]
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
    birth: '21 August 1976',
    bio: 'A nurturing presence who brings creativity and compassion to every aspect of life.',
    photo: '/bharathi.JPEG',
    story: 'A dedicated educator with 16 years of experience as a Primary Teacher at Presidency High School. Her commitment to education extends beyond the classroom, with qualifications in B.Ed and M.Com. Known for her warmth and dedication to nurturing young minds.',
    legacy: 'Advocates for education and women\'s empowerment',
    // Detailed information
    nakshatram: 'ముగసినిర్',
    teluguName: 'ముగసినిర్',
    rasi: 'Mithuna (Gemini)',
    height: null,
    color: 'Brownish',
    bloodGroup: 'A+',
    birthTime: '4:08',
    education: [
      { level: '1 to 7', institution: 'Dwaraka School', year: '' },
      { level: '7 to 10', institution: 'Tagore\'s Home', year: '' },
      { level: 'Intermediate to Degree', institution: 'Gujrathi College', year: 'Stream: CEC → B.Com' },
      { level: 'B.Ed', institution: 'Indira Gandhi National Open University', year: '05-07-2010' },
      { level: 'M.Com', institution: 'Osmania University', year: '23-10-2004' }
    ],
    career: [
      { period: '1 June 2005 – 30 September 2021', role: 'Primary Teacher', company: 'Presidency High School', details: '16 years of experience' }
    ]
  },
  '9': {
    name: 'Jagannatham Raghu Chander',
    fullName: 'Jagannatham Raghu Chander',
    role: 'Uncle',
    birth: '1972',
    bio: 'A photographer inspired by his brother Ravi, with 15 years of experience. Despite facing challenges in his marriage life, he is currently living happily in Pune.',
    photo: '/raghu.jpg',
    story: 'Inspired by his elder brother Ravi Chander, Raghu pursued photography and has built a successful career with 15 years of experience in the field. His journey has not been without challenges - he faced difficulties in his marriage life, but through resilience and determination, he has found happiness and is currently living a fulfilling life in Pune.',
    legacy: 'Overcame personal challenges and built a successful photography career',
    career: [
      { period: '15 years', role: 'Photographer', company: '', details: 'Inspired by his brother Ravi Chander' }
    ],
    address: 'Pune'
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
              {(story.nakshatram || story.rasi || story.height || story.bloodGroup || story.birth || story.teluguName || story.birthTime || story.color) && (
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
                    {story.teluguName && (
                      <div className={`rounded-lg p-4 border transition-all hover:shadow-md ${
                        darkMode ? 'bg-[#0e1116] border-gray-800' : 'bg-white border-gray-200'
                      }`}>
                        <div className="flex items-center gap-2 mb-2">
                          <User className="w-4 h-4 text-[#a3b18a]" />
                          <span className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Name (Telugu)
                          </span>
                        </div>
                        <p className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-[#334155]'}`}>
                          {story.teluguName}
                        </p>
                      </div>
                    )}
                    {story.birthTime && (
                      <div className={`rounded-lg p-4 border transition-all hover:shadow-md ${
                        darkMode ? 'bg-[#0e1116] border-gray-800' : 'bg-white border-gray-200'
                      }`}>
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-4 h-4 text-[#a3b18a]" />
                          <span className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Birth Time
                          </span>
                        </div>
                        <p className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-[#334155]'}`}>
                          {story.birthTime}
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
                          <div className="flex-1">
                            <p className={`text-sm font-semibold mb-1 ${darkMode ? 'text-white' : 'text-[#334155]'}`}>
                              {edu.level}
                            </p>
                            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {edu.institution}
                            </p>
                            {edu.year && (edu.year.includes(':') || edu.year.includes('→')) && (
                              <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                                {edu.year}
                              </p>
                            )}
                          </div>
                          {edu.year && !edu.year.includes(':') && !edu.year.includes('→') && (
                            <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ml-2 shrink-0 ${
                              darkMode ? 'bg-[#a3b18a]/20 text-[#a3b18a]' : 'bg-[#a3b18a]/10 text-[#a3b18a]'
                            }`}>
                              {edu.year}
                            </span>
                          )}
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
                        <div className="flex items-start gap-3">
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
                        <div className="flex items-start gap-3">
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
                        <div className="flex items-start gap-3">
                          <div className={`p-2.5 rounded-lg shrink-0 border ${
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
