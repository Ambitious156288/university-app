import React, { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
import Background from 'theme/Background';
import Weather from './Weather';

function getWeather(city) {
  return fetch(
    `${process.env.REACT_APP_API_URL}/weather/?q=${city}&units=metric&APPID=${
      process.env.REACT_APP_API_KEY
    }`,
  )
    .then(res => handleResponse(res))
    .then(weather => {
      if (Object.entries(weather).length) {
        const mappedData = mapDataToWeatherInterface(weather);
        return mappedData;
      }
    });
}

function getForecast(city) {
  return fetch(
    `${process.env.REACT_APP_API_URL}/forecast/?q=${city}&units=metric&APPID=${
      process.env.REACT_APP_API_KEY
    }`,
  )
    .then(res => handleResponse(res))
    .then(result => {
      if (Object.entries(result).length) {
        const forecast = [];
        for (let i = 0; i < result.list.length; i += 8) {
          forecast.push(mapDataToWeatherInterface(result.list[i + 4]));
        }
        return forecast;
      }
    });
}

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  }
  throw new Error(`Error: Location ${response.statusText}`);
}

function mapDataToWeatherInterface(data) {
  const mapped = {
    city: data.name,
    country: data.sys.country,
    date: data.dt * 1000,
    humidity: data.main.humidity,
    temperature: data.main.temp,
    description: data.weather[0].description,
    wind_speed: Math.round(data.wind.speed * 3.6),
    condition: data.cod,
  };

  if (data.dt_txt) {
    mapped.dt_txt = data.dt_txt;
  }

  if (data.main.temp_min && data.main.temp_max) {
    mapped.max = data.main.temp_max;
    mapped.min = data.main.temp_min;
  }

  Object.keys(mapped).forEach(key => mapped[key] === undefined && delete data[key]);

  return mapped;
}

export default function App() {
  const [city, setCity] = useState('Rzeszow');
  const [error, setError] = useState(null);
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    getWeather(city)
      .then(weather => {
        setCurrentWeather(weather);
        setError(null);
      })
      .catch(err => {
        setError(err.message);
      });
  }, [city, error]);

  useEffect(() => {
    getForecast(city)
      .then(data => {
        setForecast(data);
        setError(null);
      })
      .catch(err => {
        setError(err.message);
      });
  }, [city, error]);

  const handleCityChange = city => {
    setCity(city);
  };

  if (
    (currentWeather && Object.keys(currentWeather).length) ||
    (forecast && Object.keys(forecast).length)
  ) {
    return (
      <>
        <CssBaseline />
        <Background />
        <Container maxWidth="sm">
          <Weather
            city={city}
            currentWeather={currentWeather}
            forecast={forecast}
            onCityChange={handleCityChange}
            error={error}
          />
        </Container>
      </>
    );
  }
  return (
    <div>
      <CircularProgress color={error ? 'secondary' : 'primary'} />
      {error ? <p>{error}</p> : ''}
    </div>
  );
}
