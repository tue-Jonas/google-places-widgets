import { useState } from 'react';
import { GoogleReviews } from '../lib';

export const Home = () => {
  // Config State
  const [apiKey, setApiKey] = useState('');
  const [placeId, setPlaceId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [proxyUrl, setProxyUrl] = useState('');

  // Filter State
  const [minRating, setMinRating] = useState(4);
  const [maxReviews, setMaxReviews] = useState(5);
  const [hideEmptyReviews, setHideEmptyReviews] = useState(false);

  // UI State
  const [hideAvatar, setHideAvatar] = useState(false);
  const [authorNameDisplay, setAuthorNameDisplay] = useState<'full' | 'initials' | 'hidden'>('full');
  const [showGoogleLogo, setShowGoogleLogo] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-zinc-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Widget Playground</h1>
          <p className={`mt-2 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
            Configure the widget settings below to test the library. 
            Leave API fields blank to use mock data.
          </p>
        </div>

        {/* Configuration Controls */}
        <div className={`p-6 rounded-lg shadow-sm border mb-8 space-y-6 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-gray-200'}`}>
          
          {/* Row 1: Connection Settings */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className={`space-y-4 col-span-1 md:col-span-4 border-b pb-4 mb-4 ${theme === 'dark' ? 'border-zinc-700' : 'border-gray-200'}`}>
              <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>1. Connection</h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'}`}>
                Provide your API Key. Then, enter EITHER a <strong>Place ID</strong> OR a <strong>Search Query</strong> (Name/Address).
              </p>
            </div>

            <div>
              <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>Google API Key</label>
              <input
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm p-2 border ${theme === 'dark' ? 'bg-zinc-700 border-zinc-600 text-white placeholder-gray-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'}`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>Place ID</label>
              <input
                type="text"
                value={placeId}
                onChange={(e) => setPlaceId(e.target.value)}
                placeholder="ChIJ..."
                className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm p-2 border ${theme === 'dark' ? 'bg-zinc-700 border-zinc-600 text-white placeholder-gray-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'}`}
              />
            </div>
             <div>
              <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>OR Search (Name/Address)</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. MP Physio Langenlebarn"
                className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm p-2 border ${theme === 'dark' ? 'bg-zinc-700 border-zinc-600 text-white placeholder-gray-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'}`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>Proxy URL (Optional)</label>
              <input
                type="text"
                value={proxyUrl}
                onChange={(e) => setProxyUrl(e.target.value)}
                placeholder="https://api.example.com/reviews"
                className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm p-2 border ${theme === 'dark' ? 'bg-zinc-700 border-zinc-600 text-white placeholder-gray-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'}`}
              />
            </div>
          </div>

          {/* Row 2: Filters */}
          <div className="space-y-4">
            <h3 className={`text-lg font-medium border-b pb-2 ${theme === 'dark' ? 'text-white border-zinc-700' : 'text-gray-900 border-gray-200'}`}>2. Filters</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
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
                <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
                  Max Reviews: {maxReviews}
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={maxReviews}
                  onChange={(e) => setMaxReviews(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Note: Standard Google Places API returns max 5 reviews.
                </p>
              </div>
              <div className="flex items-center">
                <input
                  id="hide-empty"
                  type="checkbox"
                  checked={hideEmptyReviews}
                  onChange={(e) => setHideEmptyReviews(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="hide-empty" className={`ml-2 block text-sm ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-900'}`}>
                  Hide Empty Reviews
                </label>
              </div>
            </div>
          </div>

          {/* Row 3: UI Settings */}
          <div className="space-y-4">
            <h3 className={`text-lg font-medium border-b pb-2 ${theme === 'dark' ? 'text-white border-zinc-700' : 'text-gray-900 border-gray-200'}`}>3. UI & Privacy</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Privacy Mode */}
              <div className="flex items-center justify-between">
                <span className="flex-grow flex flex-col">
                  <span className={`text-sm font-medium ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-900'}`}>Privacy Mode</span>
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

              {/* Author Name */}
              <div>
                <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>Author Name Display</label>
                <select
                  value={authorNameDisplay}
                  onChange={(e) => setAuthorNameDisplay(e.target.value as any)}
                  className={`block w-full rounded-md shadow-sm sm:text-sm p-2 border ${theme === 'dark' ? 'bg-zinc-700 border-zinc-600 text-white' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'}`}
                >
                  <option value="full">Full Name</option>
                  <option value="initials">Initials Only</option>
                  <option value="hidden">Hidden</option>
                </select>
              </div>

              {/* Show Google Logo */}
              <div className="flex items-center justify-between">
                <span className="flex-grow flex flex-col">
                  <span className={`text-sm font-medium ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-900'}`}>Extra Verification</span>
                  <span className="text-xs text-gray-500">Show Google Badges</span>
                </span>
                <button
                  role="switch"
                  aria-checked={showGoogleLogo}
                  onClick={() => setShowGoogleLogo(!showGoogleLogo)}
                  className={`${
                    showGoogleLogo ? 'bg-blue-600' : 'bg-gray-200'
                  } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                >
                  <span
                    aria-hidden="true"
                    className={`${
                      showGoogleLogo ? 'translate-x-5' : 'translate-x-0'
                    } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                  />
                </button>
              </div>

              {/* Theme Toggle */}
              <div className="flex items-center justify-between">
                <span className="flex-grow flex flex-col">
                  <span className={`text-sm font-medium ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-900'}`}>Theme</span>
                  <span className="text-xs text-gray-500">Light / Dark</span>
                </span>
                <button
                  role="switch"
                  aria-checked={theme === 'dark'}
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                  className={`${
                    theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-200'
                  } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                >
                  <span
                    aria-hidden="true"
                    className={`${
                      theme === 'dark' ? 'translate-x-5 bg-zinc-800' : 'translate-x-0 bg-white'
                    } pointer-events-none inline-block h-5 w-5 transform rounded-full shadow ring-0 transition duration-200 ease-in-out`}
                  />
                </button>
              </div>

            </div>
          </div>
        </div>

        <div className={`border-t pt-8 ${theme === 'dark' ? 'border-zinc-700' : 'border-gray-200'}`}>
          <h2 className={`text-2xl font-bold mb-6 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Live Preview</h2>
          <GoogleReviews 
            config={{
              apiKey: apiKey || undefined,
              placeId: placeId || undefined,
              searchQuery: searchQuery || undefined,
              proxyUrl: proxyUrl || undefined
            }}
            filters={{
              minRating,
              maxReviews,
              hideEmptyReviews
            }}
            ui={{
              hideAvatar,
              authorNameDisplay,
              showGoogleLogo,
              theme
            }}
          />
        </div>
      </div>
    </div>
  );
};
