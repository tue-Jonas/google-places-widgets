export interface AuthorAttribution {
  displayName: string;
  photoUri: string;
}

export interface Review {
  name: string; // Resource name
  relativePublishTimeDescription: string;
  rating: number; // 1-5
  text: string; // The review content (originalText)
  authorAttribution: AuthorAttribution;
}
