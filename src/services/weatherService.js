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
    getCurrentWeather: async (city) => {
        try {
            const response = await api.get('/weather', {
                params: {
                    q: city,
                    appid: API_KEY,
                    units: 'metric'
                },
            });
            return response.data;
        } catch (error) {
            if (error.response?.status === 401) {
                throw new Error('Invalid OpenWeather API Key. Please verify in Vercel settings.');
            }
            if (error.response?.status === 404) {
                throw new Error('Location not found. Please clarify your search.');
            }
            throw new Error(error.response?.data?.message || 'Atmospheric telemetry failed');
        }
    },

    getForecast: async (city) => {
        try {
            const response = await api.get('/forecast', {
                params: {
                    q: city,
                    appid: API_KEY,
                    units: 'metric'
                },
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Archive retrieval failed');
        }
    },
};

export default api;
