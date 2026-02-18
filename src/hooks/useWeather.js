import { useState, useCallback } from 'react';
import { weatherService } from '../services/weatherService';

export const useWeather = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchWeather = useCallback(async (query) => {
        if (!query) return;

        setLoading(true);
        setError(null);
        try {
            const result = await weatherService.getCurrentWeather(query);
            setData(result);

            // Save official location name to recent searches
            const locationName = `${result.location.name}, ${result.location.country}`;
            const history = JSON.parse(localStorage.getItem('weather_history') || '[]');
            const newHistory = [locationName, ...history.filter(h => h !== locationName)].slice(0, 5);
            localStorage.setItem('weather_history', JSON.stringify(newHistory));

        } catch (err) {
            setError(err.message);
            setData(null);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchHistorical = useCallback(async (query, date) => {
        setLoading(true);
        setError(null);
        try {
            const result = await weatherService.getHistoricalWeather(query, date);
            setData(result);
        } catch (err) {
            setError(err.message);
            setData(null);
        } finally {
            setLoading(false);
        }
    }, []);

    return { data, loading, error, fetchWeather, fetchHistorical };
};
