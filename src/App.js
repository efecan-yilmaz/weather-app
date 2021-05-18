import { WeatherProvider } from './providers/WeatherProvider';
import Board from './components/Board';

import './App.css';

function App() {
    return (
        <WeatherProvider>
            <div className="App">
                <Board />
            </div>
        </WeatherProvider>
    );
}

export default App;
