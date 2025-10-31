'use client'

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FamilyMemberCard } from './FamilyMemberCard';

interface FamilyMember {
  id: string;
  name: string;
  fullName: string;
  role: string;
  birth: string;
  death?: string;
  generation: number;
  parents?: string[];
  bio: string;
  photo?: string;
  position?: number; // Position within generation for layout
}

interface FamilyTreeProps {
  darkMode: boolean;
  searchQuery: string;
  selectedMember: string | null;
  onSelectMember: (id: string) => void;
}

const familyData: FamilyMember[] = [
  // Generation 0 - Grandparents
  {
    id: '1',
    name: 'Jagannatham Subhash Chandar',
    fullName: 'Jagannatham Subhash Chandar',
    role: 'Grandfather',
    birth: '?',
    death: '2008',
    generation: 0,
    position: 0,
    bio: 'A wise patriarch who laid the foundation for our family values.',
    photo: '/subhash.JPEG'
  },
  {
    id: '2',
    name: 'Jagannatham Soubagya Laxmi',
    fullName: 'Jagannatham Soubagya Laxmi',
    role: 'Grandmother',
    birth: '?',
    generation: 0,
    position: 1,
    bio: 'A loving matriarch known for her warmth and traditional wisdom.',
    photo: '/laxmi.JPEG'
  },
  {
    id: '3',
    name: 'Laxman Swamy Ekangi',
    fullName: 'Laxman Swamy Ekangi',
    role: 'Grandfather',
    birth: '?',
    death: '1978',
    generation: 0,
    position: 2,
    bio: 'A distinguished gentleman remembered for his integrity and dedication.',
    photo: '/laxman.JPEG'
  },
  {
    id: '4',
    name: 'Urmila Laxman',
    fullName: 'Urmila Laxman',
    role: 'Grandmother',
    birth: '?',
    generation: 0,
    position: 3,
    bio: 'A graceful woman who brought joy and stability to the family.',
    photo: '/urmila.JPEG'
  },
  // Generation 1 - Parents
  {
    id: '5',
    name: 'Jagannatham Ravi Chander',
    fullName: 'Jagannatham Ravi Chander',
    role: 'Father',
    birth: '1969',
    generation: 1,
    position: 0,
    parents: ['1', '2'],
    bio: 'An accomplished professional and devoted family man who bridges tradition with modernity.',
    photo: '/ravi.JPEG'
  },
  {
    id: '6',
    name: 'Jagannatham Bharati',
    fullName: 'Jagannatham Bharati',
    role: 'Mother',
    birth: '1976',
    generation: 1,
    position: 1,
    parents: ['3', '4'],
    bio: 'A nurturing presence who brings creativity and compassion to every aspect of life.',
    photo: '/bharathi.JPEG'
  },
  {
    id: '9',
    name: 'Jagannatham Raghu Chander',
    fullName: 'Jagannatham Raghu Chander',
    role: 'Uncle',
    birth: '1972',
    generation: 1,
    position: 2,
    parents: ['1', '2'],
    bio: 'A dedicated professional and loving brother who values family connections and heritage.',
    photo: '/raghu.jpg'
  },
  // Generation 2 - Children
  {
    id: '7',
    name: 'Jagannatham Shashank',
    fullName: 'Jagannatham Shashank',
    role: 'Son',
    birth: '2000',
    generation: 2,
    position: 0,
    parents: ['5', '6'],
    bio: 'A bright young individual pursuing dreams while honoring family heritage.',
    photo: '/shashank.jpg'
  },
  {
    id: '8',
    name: 'Jagannatham Shivani',
    fullName: 'Jagannatham Shivani',
    role: 'Daughter',
    birth: '2002',
    generation: 2,
    position: 1,
    parents: ['5', '6'],
    bio: 'A talented and creative individual with a passion for making a difference.',
    photo: '/shivani.jpg'
  }
];

export function FamilyTree({ darkMode, searchQuery, selectedMember, onSelectMember }: FamilyTreeProps) {
  const [visibleGenerations, setVisibleGenerations] = useState<number[]>([]);
  const [hoveredLineage, setHoveredLineage] = useState<string | null>(null);

  useEffect(() => {
    const timeouts = [0, 1, 2].map((gen, index) =>
      setTimeout(() => {
        setVisibleGenerations(prev => [...prev, gen]);
      }, index * 400)
    );
    return () => timeouts.forEach(clearTimeout);
  }, []);

  const getGenerationLabel = (gen: number) => {
    if (gen === 0) return 'Grandparents';
    if (gen === 1) return 'Parents';
    return 'Children';
  };

  const filteredData = searchQuery
    ? familyData.filter(member => 
        member.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.role.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : familyData;

  const getLineageIds = (memberId: string): string[] => {
    const member = familyData.find(m => m.id === memberId);
    if (!member) return [memberId];
    
    const lineage = [memberId];
    if (member.parents) {
      member.parents.forEach(parentId => {
        lineage.push(...getLineageIds(parentId));
      });
    }
    
    const children = familyData.filter(m => m.parents?.includes(memberId));
    children.forEach(child => {
      lineage.push(child.id);
    });
    
    return lineage;
  };

  const isInHoveredLineage = (memberId: string) => {
    if (!hoveredLineage) return false;
    return getLineageIds(hoveredLineage).includes(memberId);
  };

  // Calculate card positions - responsive sizing
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const CARD_WIDTH = isMobile ? 160 : 220;
  const CARD_HEIGHT = isMobile ? 220 : 280;
  const HORIZONTAL_GAP = isMobile ? 40 : 80;
  const VERTICAL_GAP = isMobile ? 100 : 160;

  const getCardPosition = (member: FamilyMember): { x: number; y: number } => {
    const gen = member.generation;
    const pos = member.position || 0;
    
    if (gen === 0) {
      // Grandparents: 2 couples side by side
      // Couple 1: positions 0,1 | Couple 2: positions 2,3
      const coupleOffset = Math.floor(pos / 2);
      const withinCouple = pos % 2;
      return {
        x: coupleOffset * (CARD_WIDTH * 2 + HORIZONTAL_GAP * 3) + withinCouple * (CARD_WIDTH + HORIZONTAL_GAP),
        y: 0
      };
    } else if (gen === 1) {
      // Generation 1: Position based on parents and siblings
      if (member.parents && member.parents.length >= 2) {
        const parent1 = familyData.find(m => m.id === member.parents![0]);
        const parent2 = familyData.find(m => m.id === member.parents![1]);
        
        if (parent1 && parent2) {
          const parent1Pos = getCardPosition(parent1);
          const parent2Pos = getCardPosition(parent2);
          const parentsMidX = (parent1Pos.x + parent2Pos.x + CARD_WIDTH) / 2;
          
          // Get siblings (same parents) and sort by birth year
          const siblings = familyData
            .filter(m => 
              m.generation === gen && 
              m.parents && 
              m.parents[0] === member.parents![0] && 
              m.parents[1] === member.parents![1]
            )
            .sort((a, b) => {
              // Sort by birth year if available
              const yearA = parseInt(a.birth) || 0;
              const yearB = parseInt(b.birth) || 0;
              return yearA - yearB;
            });
          
          const siblingIndex = siblings.findIndex(s => s.id === member.id);
          const siblingCount = siblings.length;
          
          if (siblingCount === 1) {
            // Single child, center under parents
            return {
              x: parentsMidX - CARD_WIDTH / 2,
              y: CARD_HEIGHT + VERTICAL_GAP
            };
          } else {
            // Multiple siblings, arrange horizontally
            const branchSpacing = CARD_WIDTH + HORIZONTAL_GAP;
            const totalWidth = (siblingCount - 1) * branchSpacing;
            const startX = parentsMidX - totalWidth / 2 - CARD_WIDTH / 2;
            return {
              x: startX + siblingIndex * branchSpacing,
              y: CARD_HEIGHT + VERTICAL_GAP
            };
          }
        }
      }
      // Fallback: use old positioning logic
      const parentCoupleX = pos * (CARD_WIDTH * 2 + HORIZONTAL_GAP * 3) + (CARD_WIDTH + HORIZONTAL_GAP) / 2;
      return {
        x: parentCoupleX,
        y: CARD_HEIGHT + VERTICAL_GAP
      };
    } else {
      // Children: arranged under parents with proper branch spacing
      const child = familyData.find(m => m.id === member.id);
      if (child?.parents) {
        const parent1 = familyData.find(m => m.id === child.parents![0]);
        const parent2 = familyData.find(m => m.id === child.parents![1]);
        if (parent1 && parent2) {
          const parent1Pos = getCardPosition(parent1);
          const parent2Pos = getCardPosition(parent2);
          const parentsMidX = (parent1Pos.x + parent2Pos.x + CARD_WIDTH) / 2;
          
          // Get siblings to arrange children with proper spacing
          const siblings = familyData.filter(m => 
            m.generation === gen && 
            m.parents && 
            m.parents[0] === child.parents![0] && 
            m.parents[1] === child.parents![1]
          );
          const siblingCount = siblings.length;
          const childIndex = siblings.findIndex(s => s.id === member.id);
          
          // Calculate spacing for multiple children - wider spread for clear branches
          if (siblingCount === 1) {
            return {
              x: parentsMidX - CARD_WIDTH / 2,
              y: (CARD_HEIGHT + VERTICAL_GAP) * 2
            };
          } else {
            // Increase spacing between children for clear branch visualization
            const branchSpacing = CARD_WIDTH + HORIZONTAL_GAP * 2;
            const totalWidth = (siblingCount - 1) * branchSpacing;
            const startX = parentsMidX - totalWidth / 2 - CARD_WIDTH / 2;
            return {
              x: startX + childIndex * branchSpacing,
              y: (CARD_HEIGHT + VERTICAL_GAP) * 2
            };
          }
        }
      }
      return { x: 0, y: (CARD_HEIGHT + VERTICAL_GAP) * 2 };
    }
  };

  const generations = [0, 1, 2];
  // Update container width to accommodate Raghu in generation 1
  const containerWidth = Math.max(CARD_WIDTH * 4 + HORIZONTAL_GAP * 5, CARD_WIDTH * 5 + HORIZONTAL_GAP * 6);
  const containerHeight = (CARD_HEIGHT + VERTICAL_GAP) * 3;

  return (
    <div className="w-full overflow-x-auto pb-12 px-4 md:px-0">
      <div className="relative mx-auto pt-16" style={{ width: `${containerWidth}px`, height: `${containerHeight}px`, minWidth: isMobile ? `${containerWidth}px` : '1200px' }}>
        {/* SVG for connection lines */}
        <svg 
          className="absolute inset-0 pointer-events-none z-0" 
          width={containerWidth} 
          height={containerHeight}
          style={{ overflow: 'visible' }}
        >
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Draw marriage connections (horizontal lines between couples) */}
          {generations.map(gen => {
            return filteredData
              .filter(m => m.generation === gen)
              .map((member, idx, arr) => {
                // Connect specific couples based on their IDs
                // Only draw for first member of each couple to avoid duplicates
                const couples = [
                  ['1', '2'], // Jagannatham Subhash Chandar & Soubagya Laxmi
                  ['3', '4'], // Laxman Swamy Ekangi & Urmila
                  ['5', '6']  // Jagannatham Ravi Chander & Bharati
                ];
                
                const coupleMatch = couples.find(couple => 
                  member.id === couple[0] && arr.find(m => m.id === couple[1])
                );
                
                if (coupleMatch) {
                  const spouse = arr.find(m => m.id === coupleMatch[1]);
                  if (!spouse) return null;
                  
                  const pos1 = getCardPosition(member);
                  const pos2 = getCardPosition(spouse);
                  const isHighlighted = isInHoveredLineage(member.id) || isInHoveredLineage(spouse.id);
                  
                  const y = pos1.y + CARD_HEIGHT / 2;
                  const x1 = pos1.x + CARD_WIDTH;
                  const x2 = pos2.x;
                  const midX = (x1 + x2) / 2;

                  return (
                    <g key={`marriage-${member.id}-${spouse.id}`}>
                      <motion.line
                        x1={x1}
                        y1={y}
                        x2={midX}
                        y2={y}
                        stroke={darkMode ? (isHighlighted ? '#a3b18a' : '#374151') : (isHighlighted ? '#a3b18a' : '#d0d5dd')}
                        strokeWidth={isHighlighted ? 3 : 2}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 0.8, delay: gen * 0.3 }}
                        filter={isHighlighted ? 'url(#glow)' : undefined}
                      />
                      <motion.line
                        x1={midX}
                        y1={y}
                        x2={x2}
                        y2={y}
                        stroke={darkMode ? (isHighlighted ? '#a3b18a' : '#374151') : (isHighlighted ? '#a3b18a' : '#d0d5dd')}
                        strokeWidth={isHighlighted ? 3 : 2}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 0.8, delay: gen * 0.3 + 0.1 }}
                        filter={isHighlighted ? 'url(#glow)' : undefined}
                      />
                      {/* Vertical line down from couple midpoint - only if they have children */}
                      {gen < 2 && (() => {
                        // Check if this couple has children
                        const hasChildren = filteredData.some(child => 
                          child.parents && 
                          child.parents.includes(member.id) && 
                          child.parents.includes(spouse.id)
                        );
                        
                        if (!hasChildren) return null;
                        
                        return (
                          <motion.line
                            x1={midX}
                            y1={y}
                            x2={midX}
                            y2={y + 80}
                            stroke={darkMode ? (isHighlighted ? '#a3b18a' : '#374151') : (isHighlighted ? '#a3b18a' : '#d0d5dd')}
                            strokeWidth={isHighlighted ? 3 : 2}
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 0.8, delay: gen * 0.3 + 0.2 }}
                            filter={isHighlighted ? 'url(#glow)' : undefined}
                          />
                        );
                      })()}
                    </g>
                  );
                }
                return null;
              });
          })}

          {/* Draw parent-child connections (for generation 1 and 2) */}
          {filteredData
            .filter(m => m.generation > 0 && m.parents)
            .map(member => {
              const childPos = getCardPosition(member);
              const childX = childPos.x + CARD_WIDTH / 2;
              const childY = childPos.y;

              if (member.parents && member.parents.length >= 2) {
                const parent1 = familyData.find(m => m.id === member.parents![0]);
                const parent2 = familyData.find(m => m.id === member.parents![1]);
                
                if (parent1 && parent2) {
                  const parent1Pos = getCardPosition(parent1);
                  const parent2Pos = getCardPosition(parent2);
                  const parentMidX = (parent1Pos.x + parent2Pos.x + CARD_WIDTH) / 2;
                  const parentY = parent1Pos.y + CARD_HEIGHT / 2 + 80;
                  
                  const isHighlighted = isInHoveredLineage(member.id);

                  // For generation 2 (children), create branching structure
                  if (member.generation === 2) {
                    // Get siblings to determine branch direction
                    const siblings = familyData.filter(m => 
                      m.generation === 2 && 
                      m.parents && 
                      m.parents[0] === member.parents![0] && 
                      m.parents[1] === member.parents![1]
                    );
                    const siblingIndex = siblings.findIndex(s => s.id === member.id);
                    
                    // Create a horizontal branching point
                    const branchY = parentY + 40;
                    
                    return (
                      <g key={`child-${member.id}`}>
                        {/* Main vertical line from parents down */}
                        {siblingIndex === 0 && (
                          <motion.line
                            x1={parentMidX}
                            y1={parentY}
                            x2={parentMidX}
                            y2={branchY}
                            stroke={darkMode ? (isHighlighted ? '#a3b18a' : '#374151') : (isHighlighted ? '#a3b18a' : '#d0d5dd')}
                            strokeWidth={isHighlighted ? 3 : 2}
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 1.2 }}
                            filter={isHighlighted ? 'url(#glow)' : undefined}
                          />
                        )}
                        
                        {/* Horizontal branch line */}
                        <motion.line
                          x1={parentMidX}
                          y1={branchY}
                          x2={childX}
                          y2={branchY}
                          stroke={darkMode ? (isHighlighted ? '#a3b18a' : '#374151') : (isHighlighted ? '#a3b18a' : '#d0d5dd')}
                          strokeWidth={isHighlighted ? 3 : 2}
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ duration: 0.6, delay: 1.2 + siblingIndex * 0.15 }}
                          filter={isHighlighted ? 'url(#glow)' : undefined}
                        />
                        
                        {/* Vertical line down to child */}
                        <motion.line
                          x1={childX}
                          y1={branchY}
                          x2={childX}
                          y2={childY}
                          stroke={darkMode ? (isHighlighted ? '#a3b18a' : '#374151') : (isHighlighted ? '#a3b18a' : '#d0d5dd')}
                          strokeWidth={isHighlighted ? 3 : 2}
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ duration: 0.6, delay: 1.2 + siblingIndex * 0.15 + 0.15 }}
                          filter={isHighlighted ? 'url(#glow)' : undefined}
                        />
                      </g>
                    );
                  } else {
                    // For generation 1, keep direct connection
                    return (
                      <g key={`child-${member.id}`}>
                        <motion.line
                          x1={parentMidX}
                          y1={parentY}
                          x2={childX}
                          y2={childY}
                          stroke={darkMode ? (isHighlighted ? '#a3b18a' : '#374151') : (isHighlighted ? '#a3b18a' : '#d0d5dd')}
                          strokeWidth={isHighlighted ? 3 : 2}
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ duration: 1, delay: member.generation * 0.3 + 0.3 }}
                          filter={isHighlighted ? 'url(#glow)' : undefined}
                        />
                      </g>
                    );
                  }
                }
              }
              return null;
            })}
        </svg>

        {/* Family member cards */}
        <AnimatePresence>
          {generations.map(gen => (
            <div key={gen}>
              {/* Generation Label */}
              {visibleGenerations.includes(gen) && (() => {
                // Calculate center position based on actual cards in this generation
                const genMembers = filteredData.filter(m => m.generation === gen);
                if (genMembers.length === 0) return null;
                
                const positions = genMembers.map(m => getCardPosition(m));
                const minX = Math.min(...positions.map(p => p.x));
                const maxX = Math.max(...positions.map(p => p.x));
                const centerX = (minX + maxX) / 2 + CARD_WIDTH / 2;
                
                return (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: gen * 0.4 }}
                    className={`absolute -translate-x-1/2 px-3 md:px-6 py-1 md:py-2 rounded-full backdrop-blur-sm transition-colors duration-300 ${
                      darkMode 
                        ? 'bg-[#a3b18a]/20 text-[#a3b18a] border border-[#a3b18a]/30' 
                        : 'bg-[#a3b18a]/10 text-[#a3b18a] border border-[#a3b18a]/20'
                    }`}
                    style={{ 
                      left: `${centerX}px`,
                      top: `${gen === 0 ? -50 : gen === 1 ? CARD_HEIGHT + VERTICAL_GAP - 50 : (CARD_HEIGHT + VERTICAL_GAP) * 2 - 50}px`,
                      zIndex: 20
                    }}
                  >
                    <span className="text-xs md:text-sm uppercase tracking-wider">{getGenerationLabel(gen)}</span>
                  </motion.div>
                );
              })()}

              {/* Members */}
              {visibleGenerations.includes(gen) &&
                filteredData
                  .filter(member => member.generation === gen)
                  .map((member, index) => {
                    const pos = getCardPosition(member);
                    return (
                      <motion.div
                        key={member.id}
                        initial={{ opacity: 0, scale: 0.8, y: -30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ 
                          delay: gen * 0.4 + index * 0.15,
                          type: 'spring',
                          stiffness: 200,
                          damping: 20
                        }}
                        className="absolute z-10"
                        style={{ 
                          left: `${pos.x}px`, 
                          top: `${pos.y}px`,
                          width: `${CARD_WIDTH}px`
                        }}
                      >
                        <FamilyMemberCard
                          member={member}
                          darkMode={darkMode}
                          isSelected={selectedMember === member.id}
                          isHighlighted={isInHoveredLineage(member.id)}
                          onClick={() => onSelectMember(member.id)}
                          onHover={(hovering) => setHoveredLineage(hovering ? member.id : null)}
                        />
                      </motion.div>
                    );
                  })}
            </div>
          ))}
        </AnimatePresence>

        {filteredData.length === 0 && (
          <div className={`absolute inset-0 flex items-center justify-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            No family members found matching "{searchQuery}"
          </div>
        )}
      </div>
    </div>
  );
}
