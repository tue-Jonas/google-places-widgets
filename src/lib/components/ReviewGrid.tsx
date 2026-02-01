import React, { useRef, useState, useEffect } from 'react';
import type { Review } from '../types';
import { ReviewCard } from './ReviewCard';

interface ReviewGridProps {
  reviews: Review[];
  hideAvatar?: boolean;
  authorNameDisplay?: 'full' | 'initials' | 'hidden';
  showGoogleLogo?: boolean;
  theme?: 'light' | 'dark';
  autoScroll?: boolean;
  autoScrollSpeed?: number;
}

export const ReviewGrid: React.FC<ReviewGridProps> = ({ 
  reviews, 
  hideAvatar, 
  authorNameDisplay,
  showGoogleLogo = true,
  theme = 'light',
  autoScroll = true,
  autoScrollSpeed = 0.5
}) => {
  const isDark = theme === 'dark';
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Auto-scroll logic
  useEffect(() => {
    if (!autoScroll || isDragging || isHovered) return;

    let animationFrameId: number;
    const scrollContainer = scrollRef.current;

    const performScroll = () => {
      if (scrollContainer) {
        // Only scroll if content overflows
        if (scrollContainer.scrollWidth > scrollContainer.clientWidth) {
          scrollContainer.scrollLeft += autoScrollSpeed;

          // Reset to beginning if reached the end
          if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
            scrollContainer.scrollLeft = 0;
          }
        }
      }
      animationFrameId = requestAnimationFrame(performScroll);
    };

    animationFrameId = requestAnimationFrame(performScroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [autoScroll, autoScrollSpeed, isDragging, isHovered]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    e.preventDefault(); // Prevent text selection
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsHovered(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scrollRef.current) {
      e.preventDefault();
      const x = e.pageX - scrollRef.current.offsetLeft;
      const walk = (x - startX) * 2; // Scroll speed
      scrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };
  
  return (
    <div className="w-full py-8">
      {/* Running Wall: Horizontal scroll with snap points */}
      <div 
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`flex overflow-x-auto pb-8 gap-6 snap-x snap-mandatory no-scrollbar cursor-grab px-4 sm:px-8 ${isDragging ? 'cursor-grabbing select-none' : ''} ${autoScroll && !isDragging && !isHovered ? 'scroll-auto' : 'scroll-smooth'}`}
      >
        {reviews.map((review) => (
          <div 
            key={review.name} 
            className="flex-shrink-0 w-[85vw] sm:w-[400px] snap-start"
          >
            <ReviewCard 
              review={review} 
              hideAvatar={hideAvatar}
              authorNameDisplay={authorNameDisplay}
              theme={theme}
              showGoogleLogo={showGoogleLogo}
            />
          </div>
        ))}
      </div>

      {/* Powered by Google Footer - Always Visible */}
      <div className="flex justify-end mt-6 px-4 sm:px-8">
        <div className="flex items-center space-x-2 opacity-60 grayscale hover:grayscale-0 transition-all">
          <span className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Powered by</span>
          <span className={`text-sm font-bold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Google</span>
        </div>
      </div>
    </div>
  );
};