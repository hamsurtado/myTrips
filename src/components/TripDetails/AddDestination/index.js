import React, { useState, useRef, useEffect } from 'react';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import "./AddDestination.css"
import SearchDestination from './SearchDestination';
import { useNavigate, useParams } from 'react-router-dom';
import { Configuration, OpenAIApi } from "openai";
import { createDestination } from '../../../graphql/mutations';
import { API } from 'aws-amplify';


function AddDestination() {
  const [isLoading, setIsLoading] = useState(false)
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [destination, setDestination] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const navigate = useNavigate();
  const {id} = useParams()
  

  const generateItinerary = async () => {
    setIsLoading(true)
    const configuration = new Configuration({
        apiKey: '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',
      });
    const openai = new OpenAIApi(configuration);
    const differenceInDays = endDate.diff(startDate, 'days');
    const content = `Only respond with the output json and don’t include any other response, 
                      output will be this JSON structure.
                    { 
                        "1": {
                            "morning": "",
                            "morning-entity: "",
                            "afternoon": "",
                            "afternoon-entity": "",
                            "evening": "",
                            "evening-entity":"
                      }
                      "2": { 
                      .....
                    }
                    }
    
                    The output should include itinerary for what to do for ${differenceInDays} days, 
                    from  ${startDate} to ${endDate}, in ${destination}, where for each time of the day, 
                    there's a descriptive paragraph containing an itinerary (more than 3-4 sentences). 
                    The entity corresponds to an entity we can use for an image search API, 
                    to display an image relevant to the suggestion.`
   
    try {
      const result = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: content }],
      });
      const response = await API.graphql({
          query: createDestination,
          variables: {input:{
            tripId: id,
            startDate: startDate.format('YYYY-MM-DD'),
            endDate: endDate.format('YYYY-MM-DD'),
            duration: differenceInDays,       
            destination: destination,
            itinerary: result.data.choices[0].message.content
          } },
          authMode: "AMAZON_COGNITO_USER_POOLS"
      });
      setIsLoading(false)

      const tripId = response.data.createDestination.tripId
      const destinationId = response.data.createDestination.id

      navigate(`/trip/${tripId}/destination/${destinationId}`)
    } catch (e) {
     
    }

  }




  return (
    <div className={`${isLoading ? 'grayed-out' : ''}`}>
          <h1>Add Destination</h1>
          <div className='trip-info-container'>
            <div className='search-bar-container'>
              <h2>Where do you want to go?</h2>
              <SearchDestination
                onDestinationChange={(destination) => {
                  setDestination(destination);
                }}
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
                <button className='destination-button' onClick={() => generateItinerary()}>Generate Itinerary </button>
              </div>
            </div>
          </div>
          {isLoading && (
            <div className="loading-spinner" />
          )}
      </div>
  );
}

    

export default AddDestination;