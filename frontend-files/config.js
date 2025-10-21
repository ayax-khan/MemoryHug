// Configuration file for Past + Present Studio
// Update these values according to your deployment

const CONFIG = {
    // Backend API URL
    // Development: http://localhost:8000
    // Production: https://your-api-domain.com
    API_BASE_URL: 'http://localhost:8000',
    
    // Upload constraints
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB in bytes
    ALLOWED_FORMATS: ['image/png', 'image/jpeg', 'image/jpg'],
    
    // UI Settings
    TOAST_DURATION: 4000, // milliseconds
    PROGRESS_UPDATE_INTERVAL: 500, // milliseconds
    
    // Feature flags
    ENABLE_CROP: false, // Set to true when crop feature is implemented
    ENABLE_SERVICE_WORKER: false, // PWA support
    ENABLE_ANALYTICS: false, // Analytics tracking
    
    // Default generation settings
    DEFAULT_STYLE: 'classic',
    DEFAULT_BLEND: 50,
    DEFAULT_OPACITY: 100,
    DEFAULT_BACKGROUND: 'original',
    DEFAULT_LIGHT_MATCH: true
};

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
