import React, { useEffect } from 'react';

import { useWeather } from '../providers/WeatherProvider';

import DetailWeatherView from './DetailWeatherView';
import WeatherList from './WeatherList';

const Board = () => {
    const weatherContext = useWeather();

    useEffect(() => {
        weatherContext.fetchWeatherData();        
    }, []);

    return (
        <div>
            <DetailWeatherView />
            <WeatherList />
        </div>
    )
}

export default Board;
