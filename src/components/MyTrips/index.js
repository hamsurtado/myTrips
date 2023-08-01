import React from 'react';
import { listTrips } from '../../graphql/queries';
import { useEffect, useState } from 'react';
import { API } from 'aws-amplify';


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
        setTrips(trips.data.listTrips.items                                                                      )
      } catch (error) {
        console.error('Error creating trip:', error);
      }
    };

    getTrips(); // run it, run it
  }, []);


  return (
    <div>
      <div className='page-title'>My Trips</div>
      { trips && trips.map((trip) =>  
        <li>{trip.name}</li>  
      )}
    </div>
  );
}

export default MyTrips;