import React from 'react';
import type { Review } from '../types';
import { ReviewCard } from './ReviewCard';

interface ReviewGridProps {
  reviews: Review[];
}

export const ReviewGrid: React.FC<ReviewGridProps> = ({ reviews }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">What our customers say</h2>
      
      {/* Responsive Grid: 1 col mobile, 3 cols desktop (lg) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((review) => (
          <ReviewCard key={review.name} review={review} />
        ))}
      </div>

      {/* Powered by Google Footer */}
      <div className="flex justify-end mt-6">
        <div className="flex items-center space-x-2 opacity-60 grayscale hover:grayscale-0 transition-all">
          <span className="text-xs text-gray-500 font-medium">Powered by</span>
          {/* Simple text representation or placeholder for the logo as requested */}
          <span className="text-sm font-bold text-gray-600">Google</span>
        </div>
      </div>
    </div>
  );
};
