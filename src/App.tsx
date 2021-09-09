import React, { useState } from 'react';
import './App.css';
import AQIChart from './Components/AQIChart';
import AQITable from './Components/AQITable';
import AQICityChart from './Components/AQICityChart';
import useAQI from './Hooks/use-aqi';
import { CityAQI, RequestStatus } from './utils';

type ctxType = {
  status: RequestStatus;
  data: CityAQI;
  selectedCities: string[],
  showCities: boolean,
  showBarChart: boolean,
  selectCities: (cities: string[]) => void,
}

const defaultCTXVals = {
  status: RequestStatus.LOADING,
  data: {},
  selectedCities: [],
  selectCities: () => { },
  showCities: false,
  showBarChart: false
};

export const AQIContext = React.createContext<ctxType>(defaultCTXVals);

function App() {
  const apiData = useAQI();

  const [showBarChart, toggleBarChart] = useState(false);
  const [cities, selectCities] = useState<string[]>([]);
  const [showCities, toggleCities] = useState(false);

  const ctxData: ctxType = {
    ...apiData,
    selectedCities: cities,
    selectCities,
    showCities,
    showBarChart
  };

  return (
    <AQIContext.Provider value={ctxData}>
      <div className="App">

        {/* Table */}
        {!showBarChart && !showCities && <AQITable />}

        {/* Charts */}
        <div style={{ width: '100%' }}>
          {showBarChart && <AQIChart />}
          {showCities && <AQICityChart cities={cities} />}
        </div>

        {/* Buttons */}
        <div className="chart-buttons">
          {!showCities && <button onClick={() => toggleBarChart(!showBarChart)}>
            {showBarChart ? 'Hide Chart' : 'Show Chart'}
          </button>}
          {!showBarChart && <button onClick={() => toggleCities(!showCities)} disabled={cities.length === 0}>
            {showCities ? 'Hide Selected Cities' : 'Show Selected Cities'}
          </button>}
        </div>

      </div>
    </AQIContext.Provider>
  );
}

export default App;
