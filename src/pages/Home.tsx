import { useState } from 'react';
import { GoogleReviews } from '../lib';

export const Home = () => {
  // Config State
  const [apiKey, setApiKey] = useState('');
  const [placeId, setPlaceId] = useState('');
  const [proxyUrl, setProxyUrl] = useState('');

  // Filter State
  const [minRating, setMinRating] = useState(4);
  const [maxReviews, setMaxReviews] = useState(5);
  const [hideEmptyReviews, setHideEmptyReviews] = useState(false);

  // UI State
  const [hideAvatar, setHideAvatar] = useState(false);
  const [hideAuthorName, setHideAuthorName] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Widget Playground</h1>
        <p className="mt-2 text-gray-600">
          Configure the widget settings below to test the library. 
          Leave API fields blank to use mock data.
        </p>
      </div>

      {/* Configuration Controls */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8 space-y-6">
        
        {/* Row 1: Connection Settings */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">1. Connection</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">Google API Key</label>
              <input
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Place ID</label>
              <input
                type="text"
                value={placeId}
                onChange={(e) => setPlaceId(e.target.value)}
                placeholder="ChIJ..."
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Proxy URL (Optional)</label>
              <input
                type="text"
                value={proxyUrl}
                onChange={(e) => setProxyUrl(e.target.value)}
                placeholder="https://api.example.com/reviews"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              />
            </div>
          </div>

          {/* Row 2: Filters */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">2. Filters</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Min Rating: {minRating} Stars
              </label>
              <input
                type="range"
                min="1"
                max="5"
                step="0.5"
                value={minRating}
                onChange={(e) => setMinRating(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Max Reviews</label>
              <input
                type="number"
                min="1"
                max="20"
                value={maxReviews}
                onChange={(e) => setMaxReviews(parseInt(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              />
            </div>
            <div className="flex items-center">
              <input
                id="hide-empty"
                type="checkbox"
                checked={hideEmptyReviews}
                onChange={(e) => setHideEmptyReviews(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="hide-empty" className="ml-2 block text-sm text-gray-900">
                Hide Empty Reviews (Text only)
              </label>
            </div>
          </div>

          {/* Row 3: UI Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">3. UI & Privacy</h3>
            
            <div className="flex items-center justify-between">
              <span className="flex-grow flex flex-col">
                <span className="text-sm font-medium text-gray-900">Privacy Mode</span>
                <span className="text-xs text-gray-500">Hide Avatars (Initials Only)</span>
              </span>
              <button
                role="switch"
                aria-checked={hideAvatar}
                onClick={() => setHideAvatar(!hideAvatar)}
                className={`${
                  hideAvatar ? 'bg-blue-600' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
              >
                <span
                  aria-hidden="true"
                  className={`${
                    hideAvatar ? 'translate-x-5' : 'translate-x-0'
                  } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex-grow flex flex-col">
                <span className="text-sm font-medium text-gray-900">Anonymize Name</span>
                <span className="text-xs text-gray-500">Hide Author Name</span>
              </span>
              <button
                role="switch"
                aria-checked={hideAuthorName}
                onClick={() => setHideAuthorName(!hideAuthorName)}
                className={`${
                  hideAuthorName ? 'bg-blue-600' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
              >
                <span
                  aria-hidden="true"
                  className={`${
                    hideAuthorName ? 'translate-x-5' : 'translate-x-0'
                  } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                />
              </button>
            </div>

          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Live Preview</h2>
        <GoogleReviews 
          config={{
            apiKey: apiKey || undefined,
            placeId: placeId || undefined,
            proxyUrl: proxyUrl || undefined
          }}
          filters={{
            minRating,
            maxReviews,
            hideEmptyReviews
          }}
          ui={{
            hideAvatar,
            hideAuthorName
          }}
        />
      </div>
    </div>
  );
};