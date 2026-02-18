import axios from 'axios';

const RAW_KEY = import.meta.env.VITE_WEATHER_API_KEY || '';
const API_KEY = RAW_KEY.trim();
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Debug check for Vercel (safe-masked)
if (!API_KEY) {
    console.error('CRITICAL: VITE_WEATHER_API_KEY is missing from environment.');
} else {
    console.log(`Telemetry Protocol: Initialized with key ending in "...${API_KEY.slice(-4)}"`);
}

const api = axios.create({
    baseURL: BASE_URL,
});

export const weatherService = {
    // Current weather by city name
    getCurrentWeather: async (city, units = 'metric') => {
        try {
            const response = await api.get('/weather', {
                params: {
                    q: city,
                    appid: API_KEY,
                    units
                },
            });
            return response.data;
        } catch (error) {
            handleError(error, 'Atmospheric telemetry failed');
        }
    },

    // Current weather by coordinates (for more precision from Geocoding)
    getWeatherByCoords: async (lat, lon, units = 'metric') => {
        try {
            const response = await api.get('/weather', {
                params: {
                    lat,
                    lon,
                    appid: API_KEY,
                    units
                }
            });
            return response.data;
        } catch (error) {
            handleError(error, 'Precision weather fetch failed');
        }
    },

    // 5-day / 3-hour forecast
    getForecast: async (lat, lon, units = 'metric') => {
        try {
            const response = await api.get('/forecast', {
                params: {
                    lat,
                    lon,
                    appid: API_KEY,
                    units
                },
            });
            return response.data;
        } catch (error) {
            handleError(error, 'Forecast projection failed');
        }
    },

    // Smart Autocomplete Geocoding
    searchLocations: async (query) => {
        if (!query || query.length < 2) return [];
        try {
            // Using the direct Geocoding API endpoint
            const response = await axios.get('https://api.openweathermap.org/geo/1.0/direct', {
                params: {
                    q: query,
                    limit: 5,
                    appid: API_KEY
                }
            });
            return response.data;
        } catch (error) {
            console.error('Geocoding failed:', error);
            return [];
        }
    }
};

const handleError = (error, defaultMessage) => {
    if (error.response?.status === 401) {
        throw new Error('Invalid OpenWeather API Key. Please verify in Vercel settings.');
    }
    if (error.response?.status === 404) {
        throw new Error('Location not found. Please clarify your search.');
    }
    throw new Error(error.response?.data?.message || defaultMessage);
};

export default api;
