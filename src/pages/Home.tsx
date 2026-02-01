import { useEffect, useState } from 'react';
import { ReviewGrid } from '../components/ReviewGrid';
import { mockReviews } from '../data/mockReviews';
import type { Review } from '../types';

export const Home = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call delay of 1 second
    const timer = setTimeout(() => {
      setReviews(mockReviews);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Trusted by our Clients
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            See what our customers have to say about their experience working with us.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-500 text-sm font-medium">Loading reviews...</p>
          </div>
        </div>
      ) : (
        <ReviewGrid reviews={reviews} />
      )}
    </>
  );
};
