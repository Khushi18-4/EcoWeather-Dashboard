// ==========================================================================
// 1. ASYNC INITIALIZATION & DOM CONNECTIONS
// ==========================================================================
const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const weatherResult = document.getElementById('weather-result');
const errorMessage = document.getElementById('error-message');
const loader = document.getElementById('loader');

// Global Interface Selectors
const locationName = document.getElementById('location-name');
const currentTemp = document.getElementById('current-temp');
const weatherCondition = document.getElementById('weather-condition');
const metricHumidity = document.getElementById('metric-humidity');
const metricWind = document.getElementById('metric-wind');
const metricApparent = document.getElementById('metric-apparent');

// Weather Code Interpretation Mapping (WMO Standards)
const weatherCodeMap = {
    0: "Clear Sky ☀️",
    1: "Mainly Clear 🌤️", 2: "Partly Cloudy ⛅", 3: "Overcast ☁️",
    45: "Foggy 🌫️", 48: "Depositing Rime Fog 🌫️",
    51: "Light Drizzle 🌧️", 53: "Moderate Drizzle 🌧️", 55: "Dense Drizzle 🌧️",
    61: "Slight Rain 🌦️", 63: "Moderate Rain 🌧️", 65: "Heavy Rain 🌧️",
    71: "Slight Snow ❄️", 73: "Moderate Snow ❄️", 75: "Heavy Snow ❄️",
    80: "Slight Rain Showers 🌦️", 81: "Moderate Rain Showers 🌧️", 82: "Violent Rain Showers ⛈️",
    95: "Thunderstorm 🌩️", 96: "Thunderstorm with Slight Hail ⛈️", 99: "Thunderstorm with Heavy Hail ⛈️"
};

// ==========================================================================
// 2. MAIN STREAM HANDLER (FETCH WITH ASYNC/AWAIT)
// ==========================================================================
searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const cityName = cityInput.value.trim();
    if (!cityName) return;

    // Reset View State Elements
    showLoader(true);
    showError(null);
    weatherResult.classList.add('hidden');

    try {
        // --- STEP A: Fetch Coordinates from Geocoding API ---
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`;
        const geoResponse = await fetch(geoUrl);
        
        // Error handling for broken server link
        if (!geoResponse.ok) throw new Error("Geocoding network stream compromised.");
        
        const geoData = await geoResponse.json();
        
        // Comprehensive check for invalid inputs
        if (!geoData.results || geoData.results.length === 0) {
            throw new Error(`Could not find "${cityName}". Try a different nature zone.`);
        }

        // Parse complex nested Geocoding objects
        const { latitude, longitude, name, country } = geoData.results[0];

        // --- STEP B: Fetch Live Weather using Coordinates ---
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m`;
        const weatherResponse = await fetch(weatherUrl);
        
        if (!weatherResponse.ok) throw new Error("Weather metrics fetch pipeline failed.");
        
        const weatherData = await weatherResponse.json();

        // --- STEP C: Render Dynamic Metrics Stream ---
        renderWeather(name, country, weatherData.current);

    } catch (err) {
        // Master Catch Engine handles all failures gracefully
        showError(err.message);
    } finally {
        showLoader(false);
    }
});

// ==========================================================================
// 3. UI RENDERING & INJECTION ENGINES
// ==========================================================================
function renderWeather(city, country, data) {
    // Dynamic text extraction and processing
    locationName.textContent = `${city}, ${country}`;
    currentTemp.textContent = Math.round(data.temperature_2m);
    
    // Map numerical codes to beautiful readable string conditions
    const conditionText = weatherCodeMap[data.weather_code] || "Variable Atmosphere 🍃";
    weatherCondition.textContent = conditionText;

    // Mapping deeper nested data layers directly into cards
    metricHumidity.textContent = `${data.relative_humidity_2m} %`;
    metricWind.textContent = `${data.wind_speed_10m} km/h`;
    metricApparent.textContent = `${Math.round(data.apparent_temperature)} °C`;

    // Unhide output wrapper seamlessly
    weatherResult.classList.remove('hidden');
}

function showLoader(status) {
    if (status) loader.classList.remove('hidden');
    else loader.classList.add('hidden');
}

function showError(msg) {
    if (msg) {
        errorMessage.textContent = msg;
        errorMessage.classList.remove('hidden');
    } else {
        errorMessage.classList.add('hidden');
        errorMessage.textContent = '';
    }
}