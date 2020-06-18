import React, { useEffect, useState } from 'react';
import { FormControl, Grid, Input, InputLabel, Typography } from '@material-ui/core';
import useDebounce from '../use-debounce';

export default function WeatherSearch(props) {
  const { onCityChange, error } = props;
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const hasError = !!error;

  const handleSearch = event => {
    setSearching(true);
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      onCityChange(debouncedSearchTerm);
      setSearching(false);
    }
  }, [onCityChange, debouncedSearchTerm, isSearching]);

  return (
    <div>
      <Grid container alignItems="flex-end">
        <Grid item xs={12} style={{ textAlign: 'center', margin: '30px' }}>
          <FormControl>
            <InputLabel htmlFor="search-city">Write city name</InputLabel>
            <Input
              id="search-city"
              role="search"
              type="text"
              color="secondary"
              error={hasError}
              onChange={handleSearch}
            />
            {error && <Typography>{error}</Typography>}
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
}
