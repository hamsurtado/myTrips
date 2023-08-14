import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import { listDestinations } from '../../graphql/queries';
import { API } from 'aws-amplify';
import Trip from '../MyTrips/Trip';
import { getTrip } from '../../graphql/queries';

function Home() {


  const [user, setUser] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false)
  const [trip, setTrip] = useState(null);
  const [upcomingDestinations, setUpcomingDestinations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(user => {debugger;setUser(user)})
      .catch(err => console.log(err));

      Auth.currentSession()
      .then(data => {
        debugger;
        let idToken = data.getIdToken()});

      const getDestinations = async() => {
        try {
          const destinations = await API.graphql({
            query: listDestinations,
            variables: {},
            authMode: "AMAZON_COGNITO_USER_POOLS"
          });

          const currentDate = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          }).replace(/\//g, '-');

          const upcomingDestinations = destinations?.data.listDestinations.items
          .filter(destination => destination.startDate >= currentDate)
          .sort((a, b) => {
            if (a.startDate < b.startDate) {
              return -1;
            } else if (a.startDate > b.startDate) {
              return 1;
            } else {
              return 0;
            }
          });

          if (upcomingDestinations.length > 0) {
            const getTripResponse = await API.graphql({
              query: getTrip,
                  variables: { id: upcomingDestinations[0].tripId},
                  authMode: "AMAZON_COGNITO_USER_POOLS"
              });
            
            setTrip(getTripResponse.data.getTrip)
            setUpcomingDestinations(upcomingDestinations)
          }
          setHasLoaded(true)
          
        } catch (error) {
          console.error('Error creating trip:', error);
          setHasLoaded(true)
        }
      }
      getDestinations();
  }, []);

  return (
    <div>
      <h1>Welcome, {user && user.attributes.given_name.split(" ")[0]}!</h1>
      {hasLoaded ? <div>
      {
       upcomingDestinations.length > 0 ?
      <div className='home-destination-container'>
        <h2>Your Next Trip is Coming Up Soon 💙 !</h2>
        <Trip
              key={trip.id}
              trip={trip}
              onDeleteTrip={() => {}}
        />
      </div> : 
      <div>
        <h2> You don't have any upcoming trips planned 🥲</h2>
        <h2>Plan a trip!</h2>
        <button className='nimbus-button' onClick={() => navigate(`/create-trip`)}>Create Trip</button>
      </div>
      } </div> :
      " "
    }
      
    </div>
  );
}

export default Home;