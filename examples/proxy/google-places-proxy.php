<?php
/**
 * Google Places API Proxy
 * 
 * FEATURES:
 * - Hides your API Key from the frontend.
 * - Caches responses to a local file to save API quota.
 * - Restricts access via CORS (optional but recommended).
 * 
 * SETUP:
 * 1. Upload this file to your web server (e.g., /api/reviews.php).
 * 2. Create a folder named 'cache' in the same directory and make it writable (chmod 777 or 755).
 * 3. Set your GOOGLE_API_KEY below.
 */

// ==========================================
// CONFIGURATION
// ==========================================

// 1. Your Google Maps API Key (KEEP SECRET!)
define('GOOGLE_API_KEY', 'YOUR_GOOGLE_API_KEY_HERE');

// 2. Security: Allowed Domains (CORS)
//    Leave empty [] to allow ALL domains (public API),
//    or list specific domains to restrict usage to your sites only.
$ALLOWED_ORIGINS = [
    // 'https://www.your-client-site.com',
    // 'https://another-client.com'
];

// 3. Cache Settings
//    How long to keep the data? 86400 seconds = 24 hours.
define('CACHE_LIFETIME', 86400); 
define('CACHE_DIR', __DIR__ . '/cache');

// ==========================================
// MAIN LOGIC
// ==========================================

// Set JSON header
header('Content-Type: application/json; charset=UTF-8');

// 1. Handle CORS
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (empty($ALLOWED_ORIGINS)) {
    // Public Proxy Mode: Allow everyone
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET");
} elseif (in_array($origin, $ALLOWED_ORIGINS)) {
    // Restricted Mode: Allow only whitelisted domains
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Methods: GET");
} else {
    // Block unauthorized origins if list is not empty
    // But allow non-browser requests (empty origin) if you want server-to-server usage
    if (!empty($origin)) {
        http_response_code(403);
        echo json_encode(['error' => 'Forbidden: Origin not allowed.']);
        exit;
    }
}

// 2. Validate Configuration
if (GOOGLE_API_KEY === 'YOUR_GOOGLE_API_KEY_HERE') {
    http_response_code(500);
    echo json_encode(['error' => 'Server Error: API Key not configured.']);
    exit;
}

// 3. Get and Validate Place ID
$placeId = $_GET['placeId'] ?? '';

// Sanitize: Google Place IDs are alphanumeric strings, sometimes with dashes/underscores.
// We strictly allow only secure characters to prevent injection.
if (empty($placeId) || !preg_match('/^[a-zA-Z0-9_\-]+$/', $placeId)) {
    http_response_code(400);
    echo json_encode(['error' => 'Bad Request: Missing or invalid placeId.']);
    exit;
}

// 4. Check Cache
// We create a unique cache file for each Place ID
$cacheFile = CACHE_DIR . '/reviews_' . md5($placeId) . '.json';

if (file_exists($cacheFile) && (time() - filemtime($cacheFile) < CACHE_LIFETIME)) {
    // Serve from cache
    readfile($cacheFile);
    exit;
}

// 5. Fetch from Google Places API (New)
// https://places.googleapis.com/v1/places/{placeId}?fields=reviews,displayName&key={apiKey}
$url = "https://places.googleapis.com/v1/places/{$placeId}?fields=reviews,displayName&key=" . GOOGLE_API_KEY;

// Initialize cURL
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
// Set timeout to prevent hanging script
curl_setopt($ch, CURLOPT_TIMEOUT, 10);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if (curl_errno($ch)) {
    http_response_code(502); // Bad Gateway
    echo json_encode(['error' => 'Upstream Error: ' . curl_error($ch)]);
    curl_close($ch);
    exit;
}
curl_close($ch);

// 6. Handle Upstream Response
if ($httpCode !== 200) {
    http_response_code($httpCode);
    echo $response; // Return Google's error (e.g. invalid key, invalid place ID)
    exit;
}

// Check for empty body
if (!$response) {
    http_response_code(502);
    echo json_encode(['error' => 'Upstream Error: Empty response from Google.']);
    exit;
}

// 7. Save to Cache
if (!is_dir(CACHE_DIR)) {
    if (!mkdir(CACHE_DIR, 0755, true)) {
        // If cache dir cannot be created, log error but still return data
        error_log("GooglePlacesProxy: Could not create cache directory: " . CACHE_DIR);
    }
}

if (is_dir(CACHE_DIR) && is_writable(CACHE_DIR)) {
    file_put_contents($cacheFile, $response);
}

// 8. Output Data
echo $response;
