import React from 'react';
import { listTrips } from '../../graphql/queries';
import { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import * as mutations from '../../graphql/mutations';
import Trip from './Trip/index.js'
import TripHome from '../TripDetails/index.js'
import "./MyTrips.css"

function MyTrips() {

  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const getTrips = async() => {
      try {
        const trips = await API.graphql({
          query: listTrips,
          variables: {},
          authMode: "AMAZON_COGNITO_USER_POOLS"
        });
        setTrips(trips.data.listTrips.items                                                                     )
      } catch (error) {
        console.error('Error creating trip:', error);
      }
    };

    getTrips(); 
  }, []);

  const deleteGivenTrip = async(tripId) => {
    try {
      await API.graphql({ 
        query: mutations.deleteTrip, 
        variables: { 
          input: {
            id: tripId
          }
        },
        authMode: "AMAZON_COGNITO_USER_POOLS"
      })

      setTrips(trips.filter(trip => trip.id != tripId));
      
    } catch (error) {
      console.error('Error creating trip:', error);
    }

  };

  
  return (
    <div>
      <h1>My Trips</h1>
      <div className='nimbus-card-container'>
        { trips?.map((trip) =>  
          <Trip
            key={trip.id}
            trip={trip}
            onDeleteTrip={deleteGivenTrip}
          /> 
      )}
      </div>
    </div>
  );
}

export default MyTrips;