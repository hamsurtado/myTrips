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
import retrieveImage from '../../../utils/retrieveImage';


function AddDestination() {
  const [isLoading, setIsLoading] = useState(false)
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [destination, setDestination] = useState(null);

  const isDisabled = !destination || !startDate || !endDate;

  const [focusedInput, setFocusedInput] = useState(null);
  const navigate = useNavigate();
  const {id} = useParams()


  const generateItinerary = async () => {
    setIsLoading(true)
    const configuration = new Configuration({
        apiKey: process.env.REACT_APP_CHATGPT_API_KEY
      });
    const openai = new OpenAIApi(configuration);
    const differenceInDays = endDate.diff(startDate, 'days');
    const content = `The output should include itinerary for what to do for ${differenceInDays} days, 
                    from  ${startDate.format('YYYY-MM-DD')} to ${endDate.format('YYYY-MM-DD')}, in ${destination}, where for each time of the day, 
                    there's a descriptive paragraph containing an itinerary (more than 3-4 sentences). 
                    The entity corresponds to an entity we can use for an image search API, 
                    to display an image relevant to the suggestion.

                    Only respond with the output json and don’t include any other response. 
                      Output will be the following JSON format, but with appropriate content filled in:
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
    
                    PLEASE INCLUDE ALL DAYS IN YOUR OUTPUT. MAKE SURE NO FIELDS ARE EMPTY.`
   
    try {
      const result = await openai.createChatCompletion({
        model: "gpt-3.5-turbo-16k",
        messages: [{ role: "user", content: content }],
        temperature: 0.2
      });

      const headerImage = await retrieveImage(destination, "All");

      const contentData = JSON.parse(result.data.choices[0].message.content);  // Parsing the stringified content

      const itineraryObj = {
        header: headerImage,
        content: contentData
      };

      for (let day in contentData) {
        if (contentData.hasOwnProperty(day)) { 
          contentData[day]['morning-img'] = await retrieveImage(destination + " " + contentData[day]['morning-entity'])
          contentData[day]['afternoon-img'] = await retrieveImage(destination + " " + contentData[day]['afternoon-entity'])
          contentData[day]['evening-img'] = await retrieveImage(destination + " " + contentData[day]['evening-entity'])
        } 
      }


      const response = await API.graphql({
          query: createDestination,
          variables: {input:{
            tripId: id,
            startDate: startDate.format('YYYY-MM-DD'),
            endDate: endDate.format('YYYY-MM-DD'),
            duration: differenceInDays,       
            destination: destination,
            itinerary: JSON.stringify(itineraryObj)
          } },
          authMode: "AMAZON_COGNITO_USER_POOLS"
      });
      setIsLoading(false)

      const tripId = response.data.createDestination.tripId
      const destinationId = response.data.createDestination.id

      navigate(`/trip/${tripId}/destination/${destinationId}`)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }

  }




  return (
    !isLoading 
    ? (
      <div>
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
                  <button className='nimbus-button' onClick={() => navigate(`/trip/${id}`)}>Go Back </button>                  
                  <button className='nimbus-button' disabled={isDisabled}  onClick={() => generateItinerary()}>Generate Itinerary </button>
                </div>
              </div>
            </div>
        </div>
    ): <div>

      <h1>Generating Itinerary...</h1>
        <div className="loading-spinner">
              <img src={process.env.PUBLIC_URL + '/nimbus.png'} alt="Loading" />
            </div>

            </div>
  );
}

    

export default AddDestination;