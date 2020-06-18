import React from 'react';
import AppLayout from './AppLayout';
import WeatherSearch from './WeatherSearch';

export default function Weather(props) {
  const { city, currentWeather, forecast, onCityChange, error } = props;
  if (currentWeather && forecast) {
    return (
      <div>
        <WeatherSearch city={city} onCityChange={onCityChange} error={error} />
        <AppLayout currentWeather={currentWeather} forecast={forecast} />
      </div>
    );
  }
}
