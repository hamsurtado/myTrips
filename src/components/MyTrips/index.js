import React from 'react';
import { listTrips } from '../../graphql/queries';
import { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import * as mutations from '../../graphql/mutations';
import { listDestinations } from '../../graphql/queries';
import { deleteDestination } from '../../graphql/mutations';
import Trip from './Trip/index.js'
import TripHome from '../TripDetails/index.js'
import "./MyTrips.css"

function MyTrips() {

  const [trips, setTrips] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false)

  useEffect(() => {
    const getTrips = async() => {
      try {
        const trips = await API.graphql({
          query: listTrips,
          variables: {},
          authMode: "AMAZON_COGNITO_USER_POOLS"
        });
        setTrips(trips.data.listTrips.items)
        setHasLoaded(true)
      } catch (error) {
        console.error('Error creating trip:', error);
      }
    };

    getTrips(); 
  }, []);

  const deleteGivenTrip = async(tripId) => {
    const choice = window.confirm(
      "Are you sure you want to delete this trip?"
    )
    if (choice) {
      try {

        // delete destinations for trip
        const destinationResponse = await API.graphql({
          query: listDestinations,
          variables: { filter: {tripId: {eq: tripId}} },
          authMode: "AMAZON_COGNITO_USER_POOLS"
        });


        for (const destination of destinationResponse.data.listDestinations.items) {
          await API.graphql({
            query: deleteDestination,
            variables: {
              input: {
                id: destination.id
              }
            },
            authMode: "AMAZON_COGNITO_USER_POOLS"
          })
        }


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
  }
    

  };

  
  return (
    <div>
      <h1>My Trips</h1>

      { hasLoaded && trips.length === 0 ? 
        <h2> You don't have any upcoming trips planned 🥲</h2> : "" 
      }

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