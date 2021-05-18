import React from 'react';

import { useWeather } from '../providers/WeatherProvider';

import 'bootstrap/dist/css/bootstrap.css';
import './WeatherCard.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import CloudIcon from '../assets/weather-cloud.svg';
import SunnyIcon from '../assets/weather-sun.svg';

const WeatherCard = ({weather}) => {
    const weatherContext = useWeather();

    const selectWeatherCardHandler = () => {
        weatherContext.setSelected(prev => weather);
    }

    return (
        <Container className={`card-container ${weather.selected ? 'card-selected' : ''}`} onClick={selectWeatherCardHandler}>
            <Row>
                <Col className="font-regular">{weather.date.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit', hour12: false})}</Col>
            </Row>
            <Row>
                <Col><img width="120px" height="120px" src={weather.sky === 'Clouds' ? CloudIcon : SunnyIcon} /></Col>
            </Row>
            <Row>
                <Col className="font-big">{weather.temp}</Col>
            </Row>
        </Container>
    )
}

export default WeatherCard;
