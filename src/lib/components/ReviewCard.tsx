import React, { useState } from 'react';
import type { Review } from '../types';
import { StarRating } from './StarRating';

interface ReviewCardProps {
  review: Review;
  hideAvatar?: boolean;
  hideAuthorName?: boolean;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review, hideAvatar = false, hideAuthorName = false }) => {
  const { authorAttribution, relativePublishTimeDescription, rating, text } = review;
  const [imgError, setImgError] = useState(false);

  // Normalize text content (API returns object, mock returns string)
  const reviewContent = typeof text === 'object' && text !== null ? text.text : (text || '');

  // Requirement: Truncate if > 100 chars
  const isLongText = reviewContent.length > 100;
  const displayText = isLongText ? `${reviewContent.slice(0, 100)}...` : reviewContent;

  // Fallback for missing photos
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
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
          {!hideAuthorName && (
            <h3 className="text-sm font-bold text-gray-900">{authorAttribution.displayName}</h3>
          )}
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
            <a
              href="#"
              className="text-blue-600 hover:underline font-medium"
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
