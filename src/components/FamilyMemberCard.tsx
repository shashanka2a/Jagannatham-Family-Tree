'use client'

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Heart } from 'lucide-react';

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
  position?: number;
}

interface FamilyMemberCardProps {
  member: FamilyMember;
  darkMode: boolean;
  isSelected: boolean;
  isHighlighted: boolean;
  onClick: () => void;
  onHover: (hovering: boolean) => void;
}

export function FamilyMemberCard({ 
  member, 
  darkMode, 
  isSelected, 
  isHighlighted,
  onClick,
  onHover 
}: FamilyMemberCardProps) {
  const lifespan = member.death 
    ? `${member.birth} - ${member.death}`
    : member.birth;

  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.div
      whileHover={{ y: -12, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => onHover(true)}
      onHoverEnd={() => onHover(false)}
      onClick={onClick}
      className={`relative cursor-pointer rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-500 ${
        darkMode
          ? 'bg-gradient-to-br from-[#1a1f2e] to-[#151a27] shadow-xl shadow-black/30'
          : 'bg-gradient-to-br from-white to-gray-50 shadow-xl shadow-black/10'
      } ${
        isSelected || isHighlighted
          ? darkMode
            ? 'ring-2 md:ring-4 ring-[#a3b18a] shadow-[#a3b18a]/30 shadow-2xl'
            : 'ring-2 md:ring-4 ring-[#a3b18a] shadow-[#a3b18a]/20 shadow-2xl'
          : 'hover:shadow-2xl'
      }`}
      style={{ height: isMobile ? '220px' : '280px' }}
    >
      {/* Decorative gradient border */}
      <div className={`absolute inset-0 rounded-2xl md:rounded-3xl p-[2px] transition-all duration-500 ${
        isSelected || isHighlighted
          ? 'bg-gradient-to-br from-[#a3b18a] via-[#f6c177] to-[#a3b18a]'
          : 'bg-gradient-to-br from-transparent to-transparent'
      }`}>
        <div className={`w-full h-full rounded-2xl md:rounded-3xl ${
          darkMode ? 'bg-gradient-to-br from-[#1a1f2e] to-[#151a27]' : 'bg-gradient-to-br from-white to-gray-50'
        }`} />
      </div>

      {/* Content */}
      <div className="relative z-10 p-3 md:p-5 flex flex-col items-center h-full">
        {/* Avatar */}
        <motion.div
          whileHover={{ rotate: [0, -5, 5, -5, 0] }}
          transition={{ duration: 0.5 }}
          className={`relative w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden mb-2 md:mb-3 transition-all duration-300 ${
            isSelected || isHighlighted 
              ? 'ring-2 md:ring-4 ring-[#a3b18a]/50 shadow-lg shadow-[#a3b18a]/20' 
              : 'ring-2 ring-gray-200/50 dark:ring-gray-700/50'
          }`}
        >
          {member.photo ? (
            <div className="relative w-full h-full">
            <ImageWithFallback
              src={member.photo}
              alt={member.fullName}
                className="object-cover"
            />
            </div>
          ) : (
            <div className={`w-full h-full flex items-center justify-center text-3xl ${
              darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-400'
            }`}>
              {member.name.charAt(0)}
            </div>
          )}
          
          {/* Status indicator */}
          <motion.div
            className="absolute -top-1 -right-1 w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-[#f6c177] to-[#e0a960] flex items-center justify-center shadow-lg"
            whileHover={{ scale: 1.2, rotate: 180 }}
            transition={{ duration: 0.3 }}
          >
            <Heart className="w-3 h-3 md:w-4 md:h-4 text-white" fill="white" />
          </motion.div>
        </motion.div>

        {/* Info */}
        <div className="text-center flex-1 flex flex-col justify-center items-center w-full px-2">
          <h3 className={`mb-1.5 md:mb-2 line-clamp-2 text-sm md:text-base transition-colors ${darkMode ? 'text-white' : 'text-[#334155]'}`}>
            {member.name}
          </h3>
          <div className={`inline-flex items-center justify-center px-2.5 md:px-3 py-1 rounded-full text-xs mb-1.5 md:mb-2 whitespace-nowrap transition-all duration-300 ${
            darkMode 
              ? 'bg-[#a3b18a]/20 text-[#a3b18a] border border-[#a3b18a]/30 shadow-sm'
              : 'bg-[#a3b18a]/10 text-[#a3b18a] border border-[#a3b18a]/20 shadow-sm'
          }`}>
            {member.role}
          </div>
          <p className={`text-xs transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {lifespan}
          </p>
        </div>

        {/* Bottom accent */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#a3b18a]/30 to-transparent"
          animate={{
            opacity: isSelected || isHighlighted ? 1 : 0.5
          }}
        />
      </div>

      {/* Hover glow effect */}
      <motion.div
        className={`absolute inset-0 rounded-2xl md:rounded-3xl opacity-0 transition-opacity duration-300 pointer-events-none ${
          darkMode ? 'bg-[#a3b18a]/5' : 'bg-[#a3b18a]/5'
        }`}
        animate={{
          opacity: isSelected || isHighlighted ? 0.3 : 0
        }}
      />
      
      {/* Particle effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none bg-gradient-to-br from-[#a3b18a]/0 via-[#f6c177]/0 to-[#a3b18a]/0"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.15 }}
        transition={{ duration: 0.4 }}
      />

      {/* Particle effects on hover */}
      {(isSelected || isHighlighted) && (
        <>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-[#f6c177]"
              initial={{ 
                x: '50%', 
                y: '50%',
                opacity: 0,
                scale: 0
              }}
              animate={{ 
                x: `${50 + Math.cos(i * 60 * Math.PI / 180) * 100}%`,
                y: `${50 + Math.sin(i * 60 * Math.PI / 180) * 100}%`,
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </>
      )}
    </motion.div>
  );
}
