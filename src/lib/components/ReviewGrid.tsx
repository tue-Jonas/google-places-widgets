import React from 'react';
import type { Review } from '../types';
import { ReviewCard } from './ReviewCard';

interface ReviewGridProps {
  reviews: Review[];
  hideAvatar?: boolean;
  authorNameDisplay?: 'full' | 'initials' | 'hidden';
  showGoogleLogo?: boolean;
  theme?: 'light' | 'dark';
}

export const ReviewGrid: React.FC<ReviewGridProps> = ({ 
  reviews, 
  hideAvatar, 
  authorNameDisplay,
  showGoogleLogo = true,
  theme = 'light'
}) => {
  const isDark = theme === 'dark';
  
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Running Wall: Horizontal scroll with snap points */}
      <div className="flex overflow-x-auto pb-8 gap-6 snap-x snap-mandatory scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
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
      <div className="flex justify-end mt-6">
        <div className="flex items-center space-x-2 opacity-60 grayscale hover:grayscale-0 transition-all">
          <span className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Powered by</span>
          <span className={`text-sm font-bold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Google</span>
        </div>
      </div>
    </div>
  );
};