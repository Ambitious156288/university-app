import React from 'react';
import { Card, CardContent, CardHeader, Divider, Typography, Grid } from '@material-ui/core';
import Forecast from './Forecast';
import WeatherCardSubheader from './WeatherCardSubheader';

export default function AppLayout(props) {
  const { currentWeather, forecast } = props;

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <WeatherCard currentWeather={currentWeather} forecast={forecast} />
        </Grid>
      </Grid>
    </div>
  );
}

const WeatherCard = props => {
  const { currentWeather, forecast } = props;

  return (
    <Card>
      <CardHeader
        title={`${currentWeather.city}, ${currentWeather.country}`}
        subheader={<WeatherCardSubheader currentWeather={currentWeather} />}
      />
      <CardContent style={{ textAlign: 'center' }}>
        <Typography variant="h2">{Math.round(currentWeather.temperature)}&deg;C</Typography>

        <Typography variant="subtitle2" color="textSecondary" style={{ padding: '20px' }}>
          {currentWeather.wind_speed} km/h Winds
          <br />
          {currentWeather.humidity}% Humidity
        </Typography>
        <Divider variant="fullWidth" />
        <Forecast forecast={forecast} />
      </CardContent>
    </Card>
  );
};
