import React, { useEffect, useState } from 'react';
import { ReviewGrid } from './components/ReviewGrid';
import type { GoogleReviewsProps, Review } from './types';
// In a real library, you wouldn't import from the parent 'data' folder, 
// but for this refactor step we'll use it as the default mock if no API key is present.
import { mockReviews } from '../data/mockReviews'; 

export const GoogleReviews: React.FC<GoogleReviewsProps> = ({
  config,
  filters = {},
  ui = {},
  className = '',
}) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      setError(null);

      try {
        let fetchedReviews: Review[] = [];

        if (config.proxyUrl) {
          // Mode 1: Fetch from internal proxy (Clean Solution)
          const response = await fetch(config.proxyUrl);
          if (!response.ok) throw new Error('Failed to fetch from proxy');
          const data = await response.json();
          fetchedReviews = data.reviews || [];
        } else if (config.apiKey && config.placeId) {
          // Mode 2: Direct Google API call (Standard Solution)
          // Note: In a real production lib, you'd likely use the Places API (New) endpoint
          // https://places.googleapis.com/v1/places/{placeId}?fields=reviews&key={apiKey}
          const baseUrl = 'https://places.googleapis.com/v1/places';
          const fields = 'reviews,displayName'; 
          const url = `${baseUrl}/${config.placeId}?fields=${fields}&key=${config.apiKey}`;
          
          const response = await fetch(url);
          if (!response.ok) throw new Error('Failed to fetch from Google Places API');
          const data = await response.json();
          fetchedReviews = data.reviews || [];
        } else {
          // Mode 3: Fallback / Demo Mode (Mock Data)
          // console.warn('GoogleReviews: No API config provided, using mock data.');
          // Simulate network delay
          await new Promise(resolve => setTimeout(resolve, 800));
          fetchedReviews = mockReviews as Review[];
        }

        // --- Filtering Logic ---
        let processedReviews = [...fetchedReviews];

        // 1. Filter by Rating
        if (filters.minRating) {
          processedReviews = processedReviews.filter(r => r.rating >= filters.minRating!);
        }

        // 2. Filter Empty Reviews (Text only)
        if (filters.hideEmptyReviews) {
          processedReviews = processedReviews.filter(r => r.text && r.text.trim().length > 0);
        }

        // 3. Filter Specific Reviews (Allowlist)
        if (filters.specificReviewNames && filters.specificReviewNames.length > 0) {
          processedReviews = processedReviews.filter(r => 
            filters.specificReviewNames!.includes(r.name)
          );
        }

        // 4. Time Range Filter (Basic implementation based on 'relativePublishTimeDescription' is hard, 
        // ideally we need 'publishTime' in ISO format from the API)
        // For now, we skip this as mock data doesn't have ISO dates.

        // 5. Limit Count
        if (filters.maxReviews) {
          processedReviews = processedReviews.slice(0, filters.maxReviews);
        }

        setReviews(processedReviews);

      } catch (err) {
        console.error('Error loading reviews:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [config.apiKey, config.placeId, config.proxyUrl, JSON.stringify(filters)]);

  if (loading) {
    return (
      <div className={`flex items-center justify-center p-8 ${className}`}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`text-center p-8 text-red-500 ${className}`}>
        <p>Could not load reviews.</p>
        <p className="text-xs mt-1 text-gray-400">{error}</p>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className={`text-center p-8 text-gray-500 ${className}`}>
        <p>No reviews found matching criteria.</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <ReviewGrid 
        reviews={reviews} 
        hideAvatar={ui.hideAvatar} 
        hideAuthorName={ui.hideAuthorName}
      />
    </div>
  );
};
