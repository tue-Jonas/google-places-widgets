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
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  
  return (
    <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ${isDark ? 'bg-zinc-950' : ''}`}>
      {/* Responsive Grid: 1 col mobile, 3 cols desktop (lg) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((review) => (
          <ReviewCard 
            key={review.name} 
            review={review} 
            hideAvatar={hideAvatar}
            authorNameDisplay={authorNameDisplay}
            theme={theme}
            showGoogleLogo={showGoogleLogo}
          />
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