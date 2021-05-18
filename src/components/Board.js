import React, { useEffect } from 'react';

import { useWeather } from '../providers/WeatherProvider';

import DetailWeatherView from './DetailWeatherView';

const Board = () => {
    const weatherContext = useWeather();

    useEffect(() => {
        weatherContext.fetchWeatherData();        
    }, []);

    return (
        <div>
            <DetailWeatherView />
        </div>
    )
}

export default Board;
