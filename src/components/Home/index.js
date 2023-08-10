import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import { listDestinations } from '../../graphql/queries';
import { API } from 'aws-amplify';
import Destination from '../TripDetails/Destination';

function Home() {


  const [user, setUser] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false)
  const [destinations, setDestinations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(user => setUser(user))
      .catch(err => console.log(err));

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

          debugger;

          setDestinations(upcomingDestinations)
          setHasLoaded(true)
          
        } catch (error) {
          console.error('Error creating trip:', error);
        }
      }
      getDestinations();
  }, []);

  return (
    <div>
      <h1>Welcome, {user && user.attributes.given_name}!</h1>
      {hasLoaded ? <div>
      {
       destinations.length > 0 ?
      <div className='home-destination-container'>
      <h2>Your Next Trip is Coming Up Soon 💙 !</h2>
      <Destination
        key={destinations[0]?.id}
        destination={destinations[0]}
        isExpanded={true}
        onDeleteDestination={() => {}}
      /></div> : 
      <div>
      <h2> You don't have any upcoming trips planned 🥲</h2>
      <h2>Plan a trip!</h2>
      <button className='nimbus-button' onClick={() => navigate(`/create-trip`)}>Create Trip</button>
      </div>
      }</div> :
      " "
    }
      
    </div>
  );
}

export default Home;