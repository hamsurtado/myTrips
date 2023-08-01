import React, {useState} from 'react';
import {API} from 'aws-amplify';
import "./CreateTrip.css"
import { createTrip } from '../../graphql/mutations';



function CreateTrip() {
  const INITIAL_TRIP_DATA = {
    name: "",
    description: "",
  };

  const[tripData, setTripData] = useState(INITIAL_TRIP_DATA);

  const handleChange = (event) => {
    const newTripData = {
      ...tripData,
      [event.target.name]: event.target.value
    };
    setTripData(newTripData);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();

    try {
      await API.graphql({
        query: createTrip,
        variables: {input: tripData},
        authMode: "AMAZON_COGNITO_USER_POOLS"
      });
      setTripData(INITIAL_TRIP_DATA);
    } catch (error) {
      console.error('Error creating trip:', error);
    }
  };
  

  return (
    <div>
      <div className='page-title'>Create Trip</div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='trip-name'>Trip Name</label>
          <input
            required
            type='text'
            value={tripData.name}
            id='trip-name'
            name='name'
            onChange={handleChange}
          />
        <label htmlFor='trip-description'>Trip Description</label>
          <input
              type='text'
              value={tripData.description}
              id='trip-description'
              name='description'
              onChange={handleChange}
            />
        <button className='create-trip' type='submit'>Create Trip</button>
      </form>
    </div>
  );
}

export default CreateTrip;