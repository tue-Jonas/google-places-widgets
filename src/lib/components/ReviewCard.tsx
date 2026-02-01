import React, { useState } from 'react';
import type { Review } from '../types';
import { StarRating } from './StarRating';

interface ReviewCardProps {
  review: Review;
  hideAvatar?: boolean;
  authorNameDisplay?: 'full' | 'initials' | 'hidden';
  theme?: 'light' | 'dark';
  showGoogleLogo?: boolean;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ 
  review, 
  hideAvatar = false, 
  authorNameDisplay = 'full',
  theme = 'light',
  showGoogleLogo = true
}) => {
  const { authorAttribution, relativePublishTimeDescription, rating, text } = review;
  const [imgError, setImgError] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const isDark = theme === 'dark';

  // Styles based on theme (Zinc is more neutral/less blue than Gray)
  const bgClass = isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200';
  const textPrimaryClass = isDark ? 'text-zinc-100' : 'text-gray-900';
  const textSecondaryClass = isDark ? 'text-zinc-400' : 'text-gray-500';
  const textContentClass = isDark ? 'text-zinc-300' : 'text-gray-700';
  const linkClass = isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:underline';

  // Normalize text content (API returns object, mock returns string)
  const reviewContent = typeof text === 'object' && text !== null ? text.text : (text || '');

  // Requirement: Truncate if > 100 chars
  const isLongText = reviewContent.length > 100;
  const displayText = isLongText && !isExpanded ? `${reviewContent.slice(0, 100)}...` : reviewContent;

  // Helper for initials
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .filter(n => n.length > 0)
      .map((n) => `${n[0].toUpperCase()}.`)
      .join(' ')
      .slice(0, 5); // Max 2 initials with dots and space (e.g. "J. D.")
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
    <div className={`${bgClass} p-6 rounded-xl shadow-sm border flex flex-col h-full hover:shadow-md transition-shadow duration-200 relative`}>
      {showGoogleLogo && (
        <div className="absolute top-4 right-4 opacity-80">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.67-.35-1.39-.35-2.09s.13-1.42.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
        </div>
      )}
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
            <button
              className={`${linkClass} font-medium bg-transparent border-none cursor-pointer p-0`}
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
