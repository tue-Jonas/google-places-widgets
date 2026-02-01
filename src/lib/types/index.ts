export interface AuthorAttribution {
  displayName: string;
  photoUri: string;
}

export interface LocalizedText {
  text: string;
  languageCode: string;
}

export interface Review {
  name: string; // Resource name
  relativePublishTimeDescription: string;
  rating: number; // 1-5
  text: string | LocalizedText; // The review content
  originalText?: LocalizedText; // API sometimes returns this
  authorAttribution: AuthorAttribution;
  publishTime?: string; // ISO date string, needed for time range filtering
}

export interface GoogleReviewsConfig {
  apiKey?: string;
  placeId?: string;
  searchQuery?: string; // e.g. "MP Physio Langenlebarn" - Used to find Place ID if placeId is missing
  proxyUrl?: string; // Alternative to apiKey+placeId for "Clean Solution"
  language?: string; // e.g. 'de', 'en'
}

export interface ReviewFilterSettings {
  minRating?: number; // e.g., 4 or 5
  maxReviews?: number; // Limit the number of reviews displayed
  timeRange?: 'all' | 'last_month' | 'last_year';
  specificReviewNames?: string[]; // Allowlist of specific review resource names
  hideEmptyReviews?: boolean; // Hide reviews with no text
}

export interface ReviewUISettings {
  hideAvatar?: boolean;
  authorNameDisplay?: 'full' | 'initials' | 'hidden'; // Replaces hideAuthorName
  showDate?: boolean;
  showGoogleLogo?: boolean; // Show "Powered by Google" footer
  theme?: 'light' | 'dark'; // Dark mode support
  layout?: 'grid' | 'carousel' | 'list'; // Future proofing
  autoScroll?: boolean; // Enable automatic scrolling
  autoScrollSpeed?: number; // Pixels per frame (default: 0.5)
}

export interface GoogleReviewsProps {
  config: GoogleReviewsConfig;
  filters?: ReviewFilterSettings;
  ui?: ReviewUISettings;
  // Fallback/Loading/Error components could be added here
  className?: string;
}