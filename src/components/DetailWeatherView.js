import React, { useState, useEffect } from 'react';

import { useWeather } from '../providers/WeatherProvider';

import 'bootstrap/dist/css/bootstrap.css';
import './DetailWeatherView.css';
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
        <Container fluid className="main-container">
            <Row>
                <Col><img width="328px" height="328px" src={selectedWeather.sky === 'Clouds' ? CloudIcon : SunnyIcon} /></Col>
                <Col l={6}>
                    <Container>
                        <Row>
                            <Col className="detail-font-regular text-left">{selectedWeather.sky === 'Clouds' ? 'Cloudy' : 'Clear'}</Col>
                            <Col className="detail-font-regular text-right">{`${maxTemp}° / ${minTemp}°`}</Col>
                        </Row>
                        <Row>
                            <Col className="detail-font-big">{`${selectedWeather.temp ? selectedWeather.temp : '0'}°`}</Col>
                        </Row>
                    </Container>
                </Col>
                <Col>
                    <Container>
                        <Row>
                            <Col className="detail-font-regular text-left">Munich</Col>
                        </Row>
                        <Row>
                            <Col className="font-date text-left">{selectedWeather.date ? selectedWeather.date.toLocaleDateString(navigator.language, {weekday:'long'}) : ''}</Col>
                        </Row>
                        <Row>
                            <Col className="font-date text-left">{selectedWeather.date ? `${selectedWeather.date.getDate()}. ${selectedWeather.date.toLocaleString('default', { month: 'long' })}` : ''}</Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}

export default DetailWeatherView;
