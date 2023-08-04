import React, { useState, useRef, useEffect } from 'react';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import "./AddDestination.css"
import SearchDestination from './SearchDestination';



function AddDestination(props) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);


  return (
      <div>
          <h1>Add Destination</h1>
          <div className='trip-info-container'>
            <div className='search-bar-container'>
              <h2>Where do you want to go?</h2>
              <SearchDestination/>
            </div>
            
            <div className='date-range-container'>
              <h2>When are you going?</h2>
              <DateRangePicker
                  startDate={startDate} // momentPropTypes.momentObj or null,
                  startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                  endDate={endDate} // momentPropTypes.momentObj or null,
                  endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                  onDatesChange={({ startDate, endDate }) => {
                      setStartDate(startDate);
                      setEndDate(endDate);
                  }} // PropTypes.func.isRequired,
                  focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                  onFocusChange={focusedInput => setFocusedInput(focusedInput)} // PropTypes.func.isRequired,
              />
            </div>
          </div>
      </div>
  );
}

    

export default AddDestination;