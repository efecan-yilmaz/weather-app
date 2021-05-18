import React, { useEffect } from 'react';

import { useWeather } from '../providers/WeatherProvider';

const Board = () => {
    const weatherContext = useWeather();

    useEffect(() => {
        weatherContext.fetchWeatherData();        
    }, []);

    return (
        <div>
            
        </div>
    )
}

export default Board;
