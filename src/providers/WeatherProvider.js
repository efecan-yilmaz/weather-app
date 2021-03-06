import { createContext, useContext, useState, useEffect } from 'react';

import { useGadget } from './GadgetProvider';

const WeatherContext = createContext();

export const useWeather = () => useContext(WeatherContext);

export const WeatherProvider = ({ children }) => {
    const gadgetContext = useGadget();
    const[weather, setWeather] = useState([]);
    const[minTemp, setMinTemp] = useState(0);
    const[maxTemp, setMaxTemp] = useState(0);
    const[selected, setSelected] = useState();

    useEffect(() => {
        let newWeather = weather.map((w) => {
            w.selected = w.date === selected.date;
            return w;
        });
        setWeather(prev => newWeather);
        if (selected && selected.date) gadgetContext.setAlert(prev => ({show: true, message: `Here is the weather for ${selected.date.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit', hour12: false})}`, type: 'success'}));
    }, [selected]);

    const fetchWeatherData = async () => {
        try {
            gadgetContext.setShowSpinner(true);
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

            // note: temp_max, temp_min is wrong, will be calculated later
            data = data.map((d) => {
                return {
                    date: new Date(d.dt * 1000),
                    temp: (d.main.temp - 273.15).toFixed(0),
                    sky: d.weather && d.weather.length > 0 ? d.weather[0].main : 'None',
                    selected: false

                }
            });

            setWeather(prev => data);

            let minTemp = 0, maxTemp = 0;

            data.forEach((w) => {
                if (w.temp > maxTemp) maxTemp = w.temp;
                if (w.temp < minTemp) minTemp = w.temp;
            });

            // set min max temp for the day
            setMaxTemp(maxTemp);
            setMinTemp(minTemp);
    
            // set first data to selected
            if (data && data.length) {
                data[0].selected = true;
                setSelected(prev => data[0]);
            }
            
            gadgetContext.setShowSpinner(false);
        } catch (error) {
            console.log(error);
            gadgetContext.setAlert(prev => ({show: true, message: `An error occured! Run for the hills! ${error}`, type: 'danger'}));
            gadgetContext.setShowSpinner(false);
        }
    }

    return (
        <WeatherContext.Provider value={{fetchWeatherData, weather, maxTemp, minTemp, selected, setSelected}}>
            {children}
        </WeatherContext.Provider>
    )
}