// src/components/Filter.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Button, Box, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { setFilter } from '../store/slice';

const statuses = ['To Do', 'In Progress', 'Testing/QA', 'Done'];

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.swimlane.filter);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    dispatch(setFilter({ ...filter, [name]: value }));
  };

  const handleApplyFilter = () => {
    dispatch(setFilter(filter));
  };

  return (
    <Box display="flex" flexDirection="column" p={2} mb={2}>
      <FormControl fullWidth margin="normal">
        <InputLabel id="status-label">Status</InputLabel>
        <Select
          labelId="status-label"
          name="status"
          value={filter.status}
          onChange={handleFilterChange}
          label="Status"
        >
          <MenuItem value="">All</MenuItem>
          {statuses.map(status => (
            <MenuItem key={status} value={status}>{status}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        onClick={handleApplyFilter}
        sx={{ mt: 2 }}
      >
        Apply Filter
      </Button>
    </Box>
  );
};

export default Filter;
