import React, { useState, useEffect } from 'react';

import { useWeather } from '../providers/WeatherProvider';

import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import CloudIcon from '../assets/weather-cloud.svg';
import SunnyIcon from '../assets/weather-sun.svg';

const DetailWeatherView = () => {
    const weatherContext = useWeather();
    const [selectedWeather, setSelectedWeather] = useState({});
    const [minTemp, setMinTemp] = useState(0);
    const [maxTemp, setMaxTemp] = useState(0);

    useEffect(() => {
        setSelectedWeather(prev => weatherContext.selected || {} );
        setMinTemp(weatherContext.minTemp);
        setMaxTemp(weatherContext.maxTemp);
    }, [weatherContext.selected]);

    return (
        <Container fluid>
            <Row>
                <Col><img src={selectedWeather.sky === 'Clouds' ? CloudIcon : SunnyIcon} /></Col>
                <Col>
                    <Container>
                        <Row>
                            <Col>{selectedWeather.sky === 'Clounds' ? 'Cloudy' : 'Clear'}</Col>
                            <Col>{`${maxTemp}° / ${minTemp}°`}</Col>
                        </Row>
                        <Row>
                            <Col>{`${selectedWeather.temp}°`}</Col>
                        </Row>
                    </Container>
                </Col>
                <Col>
                    <Container>
                        <Row>
                            <Col>Munich</Col>
                        </Row>
                        <Row>
                            <Col>{selectedWeather.date.toLocaleDateString(navigator.language, {weekday:'long'})}</Col>
                        </Row>
                        <Row>
                            <Col>{`${selectedWeather.date.getDate()}. ${selectedWeather.date.toLocaleString('default', { month: 'long' })}`}</Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}

export default DetailWeatherView;
