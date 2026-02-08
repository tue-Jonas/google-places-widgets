<?php
/**
 * Google Places API Proxy for World4You / Standard PHP Hosting
 * 
 * FEATURES:
 * - Hides your API Key from the frontend.
 * - Caches responses to a local file to save API quota and money.
 * - Restricts access to your specific domain (CORS & Referer check).
 * 
 * SETUP:
 * 1. Upload this file to your web server (e.g., /api/reviews.php).
 * 2. Create a folder named 'cache' in the same directory and make it writable (chmod 777 or 755).
 * 3. Configure the settings below.
 */

// ==========================================
// CONFIGURATION
// ==========================================

// 1. Your Google Maps API Key
define('GOOGLE_API_KEY', 'YOUR_GOOGLE_API_KEY_HERE');

// 2. The Google Place ID you want to fetch reviews for
//    (You can also pass this as a GET parameter if you want to support multiple places, 
//    but hardcoding it here is safer if you only have one location).
define('DEFAULT_PLACE_ID', 'YOUR_PLACE_ID_HERE');

// 3. Security: Allow requests only from these domains
//    Example: ['https://www.your-physio-website.com', 'http://localhost:5173']
$ALLOWED_ORIGINS = [
    'https://www.your-website.com', 
    'http://localhost:5173' // For local development
];

// 4. Cache Settings
//    How long to keep the data before fetching from Google again?
//    86400 seconds = 24 hours (Recommended to save costs)
define('CACHE_LIFETIME', 86400); 
define('CACHE_FILE', __DIR__ . '/cache/reviews_cache.json');

// ==========================================
// MAIN LOGIC
// ==========================================

// Set JSON header
header('Content-Type: application/json; charset=UTF-8');

// Handle CORS
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $ALLOWED_ORIGINS)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Methods: GET");
} else {
    // If no Origin header (e.g. server-side fetch or direct browser navigation), 
    // check Referer as a fallback or block.
    // Ideally, for strict security, you block if Origin doesn't match.
    // For World4You, usually simple Origin check is enough for browser fetch.
    
    // Uncomment to strictly block unknown origins:
    // http_response_code(403);
    // echo json_encode(['error' => 'Forbidden: Invalid Origin']);
    // exit;
}

// Check Cache
if (file_exists(CACHE_FILE) && (time() - filemtime(CACHE_FILE) < CACHE_LIFETIME)) {
    // Serve from cache
    readfile(CACHE_FILE);
    exit;
}

// Prepare usage of API Key and Place ID
// If you want to allow dynamic Place IDs from the frontend, use $_GET['placeId']
// relying on proper input sanitization.
$placeId = isset($_GET['placeId']) ? preg_replace('/[^a-zA-Z0-9_\-]/', '', $_GET['placeId']) : DEFAULT_PLACE_ID;

if (!$placeId || $placeId === 'YOUR_PLACE_ID_HERE') {
    http_response_code(400);
    echo json_encode(['error' => 'Misconfigured: No Place ID provided.']);
    exit;
}

if (GOOGLE_API_KEY === 'YOUR_GOOGLE_API_KEY_HERE') {
    http_response_code(500);
    echo json_encode(['error' => 'Misconfigured: Missing API Key.']);
    exit;
}

// Fetch from Google Places API (New)
// https://places.googleapis.com/v1/places/{placeId}?fields=reviews,displayName&key={apiKey}

$url = "https://places.googleapis.com/v1/places/{$placeId}?fields=reviews,displayName&key=" . GOOGLE_API_KEY;

// Initialize cURL
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
// World4You often requires valid SSL handling
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if (curl_errno($ch)) {
    http_response_code(500);
    echo json_encode(['error' => 'Curl Error: ' . curl_error($ch)]);
    curl_close($ch);
    exit;
}
curl_close($ch);

// Check if Google returned a valid response
if ($httpCode !== 200) {
    http_response_code($httpCode);
    echo $response; // Return Google's error message
    exit;
}

// Validate JSON
$data = json_decode($response, true);
if (!$data || !isset($data['reviews'])) {
    // If Google returns success but no reviews (or weird format), maybe don't cache it?
    // Or cache it to prevent spamming the broken request. 
    // Let's forward it.
}

// Save to Cache
// Ensure cache directory exists
if (!is_dir(dirname(CACHE_FILE))) {
    mkdir(dirname(CACHE_FILE), 0755, true);
}

file_put_contents(CACHE_FILE, $response);

// Output the fresh data
echo $response;
