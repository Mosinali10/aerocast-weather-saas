import { useState, useCallback, useEffect } from 'react';
import { weatherService } from '../services/weatherService';

export const useWeather = () => {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // SaaS State
    const [units, setUnits] = useState(localStorage.getItem('weather_units') || 'metric');
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('weather_favorites') || '[]'));
    const [suggestions, setSuggestions] = useState([]);

    // Persistence
    useEffect(() => {
        localStorage.setItem('weather_units', units);
    }, [units]);

    useEffect(() => {
        localStorage.setItem('weather_favorites', JSON.stringify(favorites));
    }, [favorites]);

    const toggleUnits = () => setUnits(u => u === 'metric' ? 'imperial' : 'metric');

    const toggleFavorite = (cityName) => {
        setFavorites(prev =>
            prev.includes(cityName)
                ? prev.filter(c => c !== cityName)
                : [...prev, cityName]
        );
    };

    const fetchSuggestions = useCallback(async (query) => {
        if (query.length < 2) {
            setSuggestions([]);
            return;
        }
        const results = await weatherService.searchLocations(query);
        setSuggestions(results);
    }, []);

    const fetchAllData = useCallback(async (lat, lon, cityName) => {
        setLoading(true);
        setError(null);
        try {
            const [weather, forecastData] = await Promise.all([
                weatherService.getWeatherByCoords(lat, lon, units),
                weatherService.getForecast(lat, lon, units)
            ]);

            setCurrentWeather(weather);
            setForecast(forecastData);

            // History management
            const history = JSON.parse(localStorage.getItem('weather_history') || '[]');
            const newHistory = [cityName, ...history.filter(h => h !== cityName)].slice(0, 5);
            localStorage.setItem('weather_history', JSON.stringify(newHistory));

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [units]);

    return {
        currentWeather,
        forecast,
        loading,
        error,
        units,
        favorites,
        suggestions,
        toggleUnits,
        toggleFavorite,
        fetchSuggestions,
        fetchAllData
    };
};
