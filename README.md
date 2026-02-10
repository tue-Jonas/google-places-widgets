# @tue-jonas/google-places-widgets

A reusable, GDPR-compliant React library for implementing Google Places review widgets on customer websites.

## 🚀 Key Features

*   **🛡️ Privacy Mode (Recommended):** One-click toggle to show initials instead of loading profile images from Google servers. This eliminates IP-leaks to Google and bypasses the need for a cookie banner in many regions (e.g., Austria). Initials are formatted with dots and spaces (e.g., "J. D.").
*   **Flexible Data Sources:** Fetch directly from Google Places API (New) or via a custom server-side proxy ("Clean Solution").
*   **Smart Filtering:** Filter by minimum rating (e.g., 4+ stars), limit total reviews, or show only specific hand-picked reviews.
*   **Responsive UI:** Beautifully crafted review cards with star ratings and an expandable "Read more" toggle for long text. Styled with Tailwind CSS, supporting a neutral **Dark Mode** (Zinc-based).
*   **GDPR Compliant:** The "Powered by Google" footer is always displayed to comply with Terms of Service, while avatars and full names can be hidden.

## 📦 Installation

Since this is an internal library, install it via the git repository:

```bash
npm install git+https://github.com/tue-Jonas/google-places-widgets.git
```

## 🛠️ Usage

### Basic Example (Privacy Mode)

This is the recommended setup for maximum GDPR compliance:

```tsx
import { GoogleReviews } from '@tue-jonas/google-places-widgets';

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
        hideAvatar: true // Shows initials like "J. D." instead of Google profile pics
      }}
    />
  );
}
```

### Advanced Filtering & Customization

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
    authorNameDisplay: 'initials', // 'full' | 'initials' | 'hidden'
    showGoogleLogo: true,          // Show extra Google verification badges
    theme: 'dark'                  // 'light' | 'dark'
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
| `hideAvatar` | `boolean` | **Privacy Mode:** Replaces user images with initials (e.g., "J. D."). |
| `authorNameDisplay` | `'full' \| 'initials' \| 'hidden'` | Controls how the author name is displayed. |
| `showGoogleLogo` | `boolean` | Show or hide extra Google verification badges (default: true). The mandatory footer is always visible. |
| `theme` | `'light' \| 'dark'` | Sets the color theme (default: 'light'). Dark mode uses neutral zinc tones. |

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

## 🔒 Security & Backend Proxy (Recommended for Production)
 
 **Do not use your API Key directly in the frontend (`apiKey` prop) on public websites.** This exposes your key, allowing potential abuse of your quota.
 
 ### The Secure "Clean" Solution
 
 Use the provided PHP proxy script to fetch and cache data server-side.
 
 #### 1. Deploy the Proxy Script
 1.  Copy `examples/proxy/google-places-proxy.php` to your web server (e.g., `https://your-website.com/api/reviews.php`).
 2.  **IMPORTANT:** Edit the file and set your `GOOGLE_API_KEY`.
 3.  **OPTIONAL:** Update `$ALLOWED_ORIGINS` in the PHP file to restrict access to your domain only.
 4.  Ensure the script can write to a `cache/` directory (chmod 755 or 777).
 
 #### 2. Configure the Widget
 
 Pass the `proxyUrl` prop. The widget will automatically append `?placeId=...` to your proxy URL.
 
 ```tsx
 <GoogleReviews
   config={{
     // No apiKey needed here!
     proxyUrl: "https://your-website.com/api/reviews.php",
     placeId: "ChIJ..." // Still required to know WHICH place to fetch
   }}
   // ... other props
 />
 ```
 
 ## ⚖️ GDPR Note
 
 Using `ui.hideAvatar: true` is highly recommended for Austrian/EU clients. By not loading profile images from Google servers, the visitor's IP address is not transmitted to Google, often allowing you to display reviews without a prior cookie consent banner (under "Legitimate Interest").

---
© 2026 TWB-Digital OG