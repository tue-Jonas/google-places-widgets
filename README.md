# @twb-digital/google-places-widgets

A reusable, GDPR-compliant React library for implementing Google Places review widgets on customer websites.

## 🚀 Key Features

*   **🛡️ Privacy Mode (Recommended):** One-click toggle to show initials instead of loading profile images from Google servers. This eliminates IP-leaks to Google and bypasses the need for a cookie banner in many regions (e.g., Austria).
*   **Flexible Data Sources:** Fetch directly from Google Places API (New) or via a custom server-side proxy ("Clean Solution").
*   **Smart Filtering:** Filter by minimum rating (e.g., 4+ stars), limit total reviews, or show only specific hand-picked reviews.
*   **Responsive UI:** Beautifully crafted review cards with automatic truncation and star ratings, styled with Tailwind CSS.
*   **TypeScript Support:** Fully typed props and API responses for a great developer experience.

## 📦 Installation

Since this is an internal library, install it via the git repository:

```bash
npm install git+https://github.com/twb-digital/twb-google-places-widgets.git
```

## 🛠️ Usage

### Basic Example (Privacy Mode)

This is the recommended setup for maximum GDPR compliance:

```tsx
import { GoogleReviews } from '@twb-digital/google-places-widgets';

function MyComponent() {
  return (
    <GoogleReviews
      config={{
        apiKey: "YOUR_GOOGLE_API_KEY",
        // Option A: Use Place ID (Fastest)
        placeId: "ChIJU35emUCdbUcRE016eJEZhzc",
        // Option B: OR use a Search Query (Easiest)
        // searchQuery: "MP Physio Langenlebarn" 
      }}
      ui={{
        hideAvatar: true // Shows initials like "SJ" instead of Google profile pics
      }}
    />
  );
}
```

### Advanced Filtering

```tsx
<GoogleReviews
  config={{
    apiKey: "YOUR_API_KEY",
    searchQuery: "MP Physio Langenlebarn" // Auto-finds the Place ID
  }}
  filters={{
    minRating: 4.5,           // Only show 4.5 stars and above
    maxReviews: 3,            // Limit to 3 reviews
    hideEmptyReviews: true,   // Only show reviews with text
    specificReviewNames: [    // Hand-pick specific reviews by ID
      "places/PLACE_ID/reviews/REVIEW_ID_1",
      "places/PLACE_ID/reviews/REVIEW_ID_2"
    ]
  }}
  ui={{
    hideAvatar: false,
    hideAuthorName: false
  }}
/>
```

## ⚙️ Configuration (Props)

### `config`
| Property | Type | Description |
| :--- | :--- | :--- |
| `apiKey` | `string` | Your Google Maps API Key (Places API New must be enabled). |
| `placeId` | `string` | The Google Place ID. **Required** unless `searchQuery` or `proxyUrl` is used. |
| `searchQuery`| `string` | **New:** Search for a place by name/address (e.g. "MP Physio"). The widget will resolve the ID automatically. |
| `proxyUrl` | `string` | (Optional) URL to your own backend proxy to avoid direct client-side calls. |

### `filters`
| Property | Type | Description |
| :--- | :--- | :--- |
| `minRating` | `number` | Minimum rating to display (1-5). |
| `maxReviews` | `number` | Maximum number of reviews to show. |
| `hideEmptyReviews`| `boolean`| If true, reviews without text content are hidden. |
| `specificReviewNames`| `string[]`| Array of specific review resource names to display. |

### `ui`
| Property | Type | Description |
| :--- | :--- | :--- |
| `hideAvatar` | `boolean` | **Privacy Mode:** Replaces user images with initials. |
| `hideAuthorName` | `boolean` | Hides the author's name. |

## 📂 Project Structure

*   `src/lib/`: The core library source code.
*   `src/lib/GoogleReviews.tsx`: The main entry component.
*   `src/pages/Home.tsx`: Demo page for testing the library locally.
*   `dist/`: Build artifacts (ESM, UMD, and Type definitions).

## 🛠️ Development & Build

```bash
# Start the demo app locally
npm run dev

# Build the library for distribution
npm run build

# Lint the codebase
npm run lint
```

## ⚖️ GDPR Note

Using `ui.hideAvatar: true` is highly recommended for Austrian/EU clients. By not loading profile images from Google servers, the visitor's IP address is not transmitted to Google, often allowing you to display reviews without a prior cookie consent banner (under "Legitimate Interest").

---
© 2026 TWB-Digital OG
