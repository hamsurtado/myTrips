import React, { useState, useRef, useEffect } from 'react';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import "./AddDestination.css"
import SearchDestination from './SearchDestination';
import { useNavigate, useParams } from 'react-router-dom';
const { Configuration, OpenAIApi } = require("openai");


function AddDestination(props) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const navigate = useNavigate();
  const {id} = useParams()

  function generateItinerary () {
    const configuration = new Configuration({
        apiKey: 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,
      });
    const openai = new OpenAIApi(configuration);
    const [prompt, setPrompt] = useState("");
    const [apiResponse, setApiResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const onClick = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        const result = await openai.createCompletion({
          model: "gpt-3 .5-turbo",
          messages: [{role: "user", content: prompt}],
          temperature: 0.5,
          max_tokens: 4000,
        });
        //console.log("response", result.data.choices[0].text);
        setApiResponse(result.data.choices[0].content);
      } catch (e) { 
        //console.log(e);
        setApiResponse("Something is going wrong, Please try again.");
      }
      setLoading(false);
    };
  
}



  return (
      <div>
          <h1>Add Destination</h1>
          <div className='trip-info-container'>
            <div className='search-bar-container'>
              <h2>Where do you want to go?</h2>
              <SearchDestination

              />
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
              <div className='add-destination-buttons'>
                <button className='destination-button' onClick={() => navigate(`/trip/${id}`)}>Go Back </button>
                <button className='destination-button'>Generate Itinerary </button>
              </div>
            </div>
          </div>
      </div>
  );
}

    

export default AddDestination;