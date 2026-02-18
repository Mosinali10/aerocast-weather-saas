import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import CurrentWeather from './pages/CurrentWeather';
import HistoricalWeather from './pages/HistoricalWeather';
import MarineWeather from './pages/MarineWeather';

import ErrorBoundary from './components/common/ErrorBoundary';

const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<CurrentWeather />} />
            <Route path="/historical" element={<HistoricalWeather />} />
            <Route path="/marine" element={<MarineWeather />} />
          </Routes>
        </MainLayout>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
