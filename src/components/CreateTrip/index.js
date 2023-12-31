import React, {useState} from 'react';
import {API} from 'aws-amplify';
import "./CreateTrip.css"
import { createTrip } from '../../graphql/mutations';
import { useNavigate } from 'react-router-dom';
import retrieveImage from '../../utils/retrieveImage';


function CreateTrip() {
  const INITIAL_TRIP_DATA = {
    name: "",
    description: "",
  };

  const[tripData, setTripData] = useState(INITIAL_TRIP_DATA);
  const navigate = useNavigate();

 
  const handleSubmit = async(event) => {
    event.preventDefault();
    

    try {

      let tripImageURL = await retrieveImage(tripData.name)
      
      const img = new Image();
      img.src = tripImageURL;



      let response = await API.graphql({
        query: createTrip,
        variables: {input: {
          name: tripData.name,
          description: tripData.description,
          imageURL: tripImageURL
        }},
        authMode: "AMAZON_COGNITO_USER_POOLS"
      });      


      if (img.complete) {
        navigate(`/trip/${response.data.createTrip.id}/add-destination`); 
      }

      img.onload = () => {
        navigate(`/trip/${response.data.createTrip.id}/add-destination`); 
      }

    } catch (error) {
      console.error('Error creating trip:', error);
    };


  }

  const handleChange = (event) => {
    const newTripData = {
      ...tripData,
      [event.target.name]: event.target.value
    };
    setTripData(newTripData);
  }

  
  return (


    <div className='nimbus-card-trip-detail'>

      <div className='nimbus-card-img-container'>
        <div className='nimbus-card-img' style={{ backgroundImage: `url(https://clipart-library.com/images/8czrjKeEi.jpg)` }}/>
      </div>

      <div className='nimbus-card-trip-detail-details'>
        
    <div>
      <h1>Create Trip</h1>
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
        <button className='nimbus-button' style={{width: 8 + 'em'}} type='submit'>Create Trip</button>
      </form>
    </div>
    </div>
    </div>
  );
}

export default CreateTrip;