import type { Review } from '../types';

// Use the specific URL requested for testing
const MOCK_PHOTO_URI = "https://maps.app.goo.gl/pPMSwekRYD1dtczg9";

export const mockReviews: Review[] = [
  {
    name: "places/PLACE_ID/reviews/1",
    relativePublishTimeDescription: "2 days ago",
    rating: 5,
    text: "Absolutely fantastic service! The team went above and beyond to help me find exactly what I was looking for. I couldn't be happier with the results. Highly recommended!",
    authorAttribution: {
      displayName: "Sarah Jenkins",
      photoUri: MOCK_PHOTO_URI,
    },
  },
  {
    name: "places/PLACE_ID/reviews/2",
    relativePublishTimeDescription: "a week ago",
    rating: 4,
    text: "Great experience overall. The ambiance was lovely and the staff were friendly. One star deducted because the wait time was a bit longer than expected, but the quality made up for it.",
    authorAttribution: {
      displayName: "Michael Chen",
      photoUri: MOCK_PHOTO_URI,
    },
  },
  {
    name: "places/PLACE_ID/reviews/3",
    relativePublishTimeDescription: "3 weeks ago",
    rating: 5,
    text: "Best in town, hands down. I've been a regular customer for years and they never disappoint.",
    authorAttribution: {
      displayName: "Emily Rodriguez",
      photoUri: MOCK_PHOTO_URI,
    },
  },
  {
    name: "places/PLACE_ID/reviews/4",
    relativePublishTimeDescription: "a month ago",
    rating: 3,
    text: "It was okay. I expected a bit more given the hype. The product is decent but I had some issues with the initial setup. Customer support was helpful though, eventually resolving the problem after a few back-and-forth emails. I might give them another try in the future to see if things have improved. Overall, an average experience that could be better.",
    authorAttribution: {
      displayName: "David Smith",
      photoUri: MOCK_PHOTO_URI,
    },
  },
];
