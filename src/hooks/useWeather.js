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

            // Map OpenWeather to internal app structure
            const mappedData = {
                location: {
                    name: result.name,
                    country: result.sys.country,
                    localtime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                },
                current: {
                    temperature: Math.round(result.main.temp),
                    feelslike: Math.round(result.main.feels_like),
                    humidity: result.main.humidity,
                    wind_speed: result.wind.speed,
                    pressure: result.main.pressure,
                    weather_descriptions: [result.weather[0].description],
                    weather_icons: [`https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`]
                }
            };

            setData(mappedData);

            // Save official location name to recent searches
            const locationName = `${mappedData.location.name}, ${mappedData.location.country}`;
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

    const fetchHistorical = useCallback(async (query) => {
        setLoading(true);
        setError(null);
        try {
            const result = await weatherService.getForecast(query);

            // Map OpenWeather 5-day forecast to a "historical" style view
            // result.list contains 3-hour chunks. We take daily highlights.
            const highlights = {};
            result.list.forEach(item => {
                const date = item.dt_txt.split(' ')[0];
                if (!highlights[date]) {
                    highlights[date] = {
                        avgtemp: Math.round(item.main.temp),
                        maxtemp: Math.round(item.main.temp_max),
                        mintemp: Math.round(item.main.temp_min),
                        summary: item.weather[0].description
                    };
                }
            });

            setData({ historical: highlights, location: result.city });
        } catch (err) {
            setError(err.message);
            setData(null);
        } finally {
            setLoading(false);
        }
    }, []);

    return { data, loading, error, fetchWeather, fetchHistorical };
};
