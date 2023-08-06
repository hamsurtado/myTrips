import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API } from 'aws-amplify';
import { getTrip, listDestinations } from '../../graphql/queries';
import Destination from './Destination';
import "./TripDetails.css"
import { deleteDestination } from '../../graphql/mutations';

function TripDetails() {
    const { id } = useParams();
    const [trip, setTrip] = useState(null)
    const navigate = useNavigate();
    const [destinations, setDestinations] = useState([])

    useEffect(() => {
        const fetchTrip = async() => {
            try {
                const response = await API.graphql({
                    query: getTrip,
                    variables: { id },
                    authMode: "AMAZON_COGNITO_USER_POOLS"
                });
                setTrip(response.data.getTrip)
                const destinationResponse = await API.graphql({
                    query: listDestinations,    
                    variables: { filter: {tripId: {eq: id}} },
                    authMode: "AMAZON_COGNITO_USER_POOLS"
                });
                setDestinations(destinationResponse.data.listDestinations.items)
                debugger;

            } catch(error) {
                console.error('Error getting trip:', error);
            }
    };
    fetchTrip();
    }, [])

    const deleteGivenDestination = async(destinationId) => {
        try {
          await API.graphql({ 
            query: deleteDestination, 
            variables: { 
              input: {
                id: destinationId
              }
            },
            authMode: "AMAZON_COGNITO_USER_POOLS"
          })
    
          setDestinations(destinations.filter(destination => destination.id !== destinationId));
        } catch (error) {
          console.error('Error deleting destination:', error);
        }
    
      };
    

return(
    <div>
        {trip === null ? '': 
        <div> 
            <h1> Trip - {trip.name} </h1>
            <div className='trip-detail-description'> "{trip.description}"</div>
            {destinations.length === 0 ? '' :
            <div className='destinations-container'>
                <h2>Destinations</h2>
                { destinations?.map((destination) =>  
                    <Destination
                        key={destination.id}
                        destination={destination}
                        onDeleteDestination={deleteGivenDestination}
                    /> 
                )}
            </div>
            }
            
            <div className='buttons'>
                <button className='trip-detail-button' onClick={() => navigate(`/my-trips`)}>Go Back</button>
                <button className='trip-detail-button' onClick={() => navigate(`/trip/${trip.id}/add-destination`)}>Add Destination</button>
            </div>
        </div>
        }
        
    </div>
     
);
}

export default TripDetails