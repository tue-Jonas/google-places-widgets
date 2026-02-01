import React, { useState } from 'react';
import type { Review } from '../types';
import { StarRating } from './StarRating';

interface ReviewCardProps {
  review: Review;
  hideAvatar?: boolean;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review, hideAvatar = false }) => {
  const { authorAttribution, relativePublishTimeDescription, rating, text } = review;
  const [imgError, setImgError] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Requirement: Truncate if > 100 chars
  const isLongText = text.length > 100;
  const displayText = isLongText && !isExpanded ? `${text.slice(0, 100)}...` : text;

  // Fallback for missing photos
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .filter(n => n.length > 0)
      .map((n) => `${n[0].toUpperCase()}.`)
      .join(' ')
      .slice(0, 5); // Max 2 initials with dots and space (e.g. "J. D.")
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col h-full hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center mb-4">
        {!hideAvatar && !imgError && authorAttribution.photoUri ? (
          <img
            src={authorAttribution.photoUri}
            alt={authorAttribution.displayName}
            className="w-10 h-10 rounded-full mr-3 object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-10 h-10 rounded-full mr-3 bg-gray-600 text-white flex items-center justify-center text-xs font-bold">
            {getInitials(authorAttribution.displayName)}
          </div>
        )}
        <div>
          <h3 className="text-sm font-bold text-gray-900">{authorAttribution.displayName}</h3>
          <p className="text-xs text-gray-500">{relativePublishTimeDescription}</p>
        </div>
      </div>

      <div className="mb-3">
        <StarRating rating={rating} />
      </div>

      <div className="text-sm text-gray-700 leading-relaxed flex-grow">
        <span>{displayText}</span>
        {isLongText && (
          <span>
            {' '}
            <button
              className="text-blue-600 hover:underline font-medium bg-transparent border-none cursor-pointer p-0"
              onClick={(e) => {
                e.preventDefault();
                setIsExpanded(!isExpanded);
              }}
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </button>
          </span>
        )}
      </div>
    </div>
  );
};
