import React, { useState, useEffect } from 'react';

import { useWeather } from '../providers/WeatherProvider';

import WeatherCard from './WeatherCard';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const WeatherList = () => {
    const weatherContext = useWeather();
    const [weatherList, setWeatherList] = useState([]);

    useEffect(() => {
        setWeatherList(prev => weatherContext.weather);
    }, [weatherContext.weather]);

    return (
        <Container fluid>
            <Row className="scrolling-wrapper flex-row flex-nowrap mt-4 pb-4 pt-2">
                {weatherList.map((weather) => ( <Col key={weather.date}><WeatherCard weather={weather} /></Col>))}
            </Row>
        </Container>
    )
}

export default WeatherList;
