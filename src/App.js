import { WeatherProvider } from './providers/WeatherProvider';
import { GadgetProvider } from './providers/GadgetProvider';

import Board from './components/Board';
import Spinner from './components/Spinner';
import Alert from './components/Alert';

import './App.css';

function App() {
    return (
        <GadgetProvider>
            <WeatherProvider>
                <div className="App">
                    <Spinner />
                    <Alert />
                    <Board /> 
                </div>
            </WeatherProvider>
        </GadgetProvider>
    );
}

export default App;
