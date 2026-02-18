import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'http://api.weatherstack.com'; // Removed trailing slash

const api = axios.create({
    baseURL: BASE_URL,
});

export const weatherService = {
    getCurrentWeather: async (query) => {
        try {
            const response = await api.get('/current', {
                params: {
                    access_key: API_KEY,
                    query: query
                },
            });

            if (response.data.error) {
                const errorInfo = response.data.error.info || 'Incompatible API Response';
                throw new Error(errorInfo);
            }

            return response.data;
        } catch (error) {
            if (error.response?.status === 401) {
                throw new Error('Invalid API Key. Please check your .env configuration.');
            }
            throw error;
        }
    },

    getHistoricalWeather: async (query, date) => {
        try {
            const response = await api.get('/historical', {
                params: {
                    query,
                    historical_date: date
                },
            });

            if (response.data.error) {
                throw new Error(response.data.error.info || 'Failed to fetch historical data');
            }

            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default api;
