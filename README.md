# Google Reviews Widget Demo

This project is a React-based component library demonstration for displaying Google Places reviews. It implements a clean, professional, and responsive "Reviews Grid" widget that complies with Google's display requirements.

## 🚀 Features

*   **Responsive Grid Layout:** Adapts from a single column on mobile to a three-column layout on desktop.
*   **Google Compliance:** Includes the required "Powered by Google" attribution and "Read more" links for truncated text.
*   **Smart Truncation:** Automatically truncates reviews longer than 100 characters to maintain card height consistency.
*   **Accessibility:** Includes accessible Star Rating components and semantic HTML.
*   **Modern Tech Stack:** Built with React, TypeScript, Vite, and Tailwind CSS (v4).

## 🛠️ Technology Stack

*   **Framework:** [React](https://reactjs.org/) (with Hooks)
*   **Build Tool:** [Vite](https://vitejs.dev/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)

## 📂 Project Structure

```
src/
├── components/
│   ├── ReviewCard.tsx   # Individual review card component
│   ├── ReviewGrid.tsx   # Responsive grid container
│   └── StarRating.tsx   # Reusable SVG star rating component
├── data/
│   └── mockReviews.ts   # Mock data simulating Google Places API response
├── types/
│   └── index.ts         # TypeScript definitions for Review objects
└── App.tsx              # Main entry point with loading state simulation
```

## 🏁 Getting Started

Follow these steps to run the project locally.

### Prerequisites

*   Node.js (v18 or higher recommended)
*   npm (v9 or higher)

### Installation

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Start the development server:**
    ```bash
    npm run dev
    ```

3.  **Open in your browser:**
    Navigate to the URL shown in your terminal (usually `http://localhost:5173`).

### Building for Production

To create a production-ready build:

```bash
npm run build
```

The output will be in the `dist/` directory.

## 🧪 Testing

The project uses mock data located in `src/data/mockReviews.ts` to simulate API responses. You can modify this file to test different review lengths, ratings, or user scenarios.

---

**Note:** This is a demo application using static mock data. In a real-world scenario, you would replace the mock data fetch in `App.tsx` with a call to your backend service that proxies the Google Places API.