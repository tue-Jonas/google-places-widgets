import React, { useState } from 'react';
import type { Review } from '../types';
import { StarRating } from './StarRating';

interface ReviewCardProps {
  review: Review;
  hideAvatar?: boolean;
  authorNameDisplay?: 'full' | 'initials' | 'hidden';
  theme?: 'light' | 'dark';
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ 
  review, 
  hideAvatar = false, 
  authorNameDisplay = 'full',
  theme = 'light'
}) => {
  const { authorAttribution, relativePublishTimeDescription, rating, text } = review;
  const [imgError, setImgError] = useState(false);

  const isDark = theme === 'dark';

  // Styles based on theme
  const bgClass = isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';
  const textPrimaryClass = isDark ? 'text-white' : 'text-gray-900';
  const textSecondaryClass = isDark ? 'text-gray-400' : 'text-gray-500';
  const textContentClass = isDark ? 'text-gray-300' : 'text-gray-700';
  const linkClass = isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:underline';

  // Normalize text content (API returns object, mock returns string)
  const reviewContent = typeof text === 'object' && text !== null ? text.text : (text || '');

  // Requirement: Truncate if > 100 chars
  const isLongText = reviewContent.length > 100;
  const displayText = isLongText ? `${reviewContent.slice(0, 100)}...` : reviewContent;

  // Helper for initials
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const renderAuthorName = () => {
    switch (authorNameDisplay) {
      case 'hidden':
        return null;
      case 'initials':
        return getInitials(authorAttribution.displayName);
      case 'full':
      default:
        return authorAttribution.displayName;
    }
  };

  return (
    <div className={`${bgClass} p-6 rounded-xl shadow-sm border flex flex-col h-full hover:shadow-md transition-shadow duration-200`}>
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
          {authorNameDisplay !== 'hidden' && (
            <h3 className={`text-sm font-bold ${textPrimaryClass}`}>{renderAuthorName()}</h3>
          )}
          <p className={`text-xs ${textSecondaryClass}`}>{relativePublishTimeDescription}</p>
        </div>
      </div>

      <div className="mb-3">
        <StarRating rating={rating} />
      </div>

      <div className={`text-sm ${textContentClass} leading-relaxed flex-grow`}>
        <span>{displayText}</span>
        {isLongText && (
          <span>
            {' '}
            <a
              href="#"
              className={`${linkClass} font-medium`}
              onClick={(e) => {
                e.preventDefault();
                // In a real app, this would open the review on Maps
              }}
            >
              Read more
            </a>
          </span>
        )}
      </div>
    </div>
  );
};
