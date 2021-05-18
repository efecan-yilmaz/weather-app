import { createContext, useContext, useState, useEffect } from 'react';

const WeatherContext = createContext();

export const useWeather = () => useContext(WeatherContext);

export const WeatherProvider = ({ children }) => {
    const[weather, setWeather] = useState([]);
    const[minTemp, setMinTemp] = useState(0);
    const[maxTemp, setMaxTemp] = useState(0);

    // set min max temp for the day
    useEffect(() => {
        let minTemp = 0, maxTemp = 0;

        weather.forEach((w) => {
            if (w.temp > maxTemp) maxTemp = w.temp;
            if (w.temp < minTemp) minTemp = w.temp;
        });

        setMaxTemp(maxTemp);
        setMinTemp(minTemp);
    }, [weather]);

    const fetchWeatherData = async () => {
        try {
            const res = await fetch('/data/2.5/forecast?q=M%C3%BCnchen,DE&appid=b6907d289e10d714a6e88b30761fae22');
    
            if (!res.ok) {
                const message = `An error has occured: ${res.status}`;
                throw new Error(message);
            }
    
            let data = await res.json();

            if (!data.list || !data.list.length) throw new Error('Invalid data from API!');
            
            // filter only 2017-02-20 and the fields that will be used
            data = data.list.filter((d) => {
                return d.dt_txt.indexOf('2017-02-20') > -1;
            });

            // note: temp_max, temp_min is wrong, will be calculated it in provider
            data = data.map((d) => {
                return {
                    date: new Date(d.dt * 1000),
                    temp: d.main.temp - 273.15,
                    sky: d.weather && d.weather.length > 0 ? d.weather[0].main : 'None',

                }
            })
            setWeather((prev) => data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <WeatherContext.Provider value={{fetchWeatherData, weather, maxTemp, minTemp}}>
            {children}
        </WeatherContext.Provider>
    )
}