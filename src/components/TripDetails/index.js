import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API } from 'aws-amplify';
import { getTrip } from '../../graphql/queries';
import "./TripDetails.css"

function TripDetails() {
    const { id } = useParams();
    const [trip, setTrip] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTrip = async() => {
            try {
                const response = await API.graphql({
                    query: getTrip,
                    variables: { id },
                    authMode: "AMAZON_COGNITO_USER_POOLS"
                });
                setTrip(response.data.getTrip)

            } catch(error) {
                console.error('Error getting trip:', error);
            }
    };
    fetchTrip();
    }, [])

return(
    <div>
        {trip === null ? '': 
        <div> 
            <h1> Trip - {trip.name} </h1>
            <div className='trip-detail-description'> "{trip.description}"</div>
            <h2>Destinations</h2>
            <button className='trip-detail-button' onClick={() => navigate(`/trip/${trip.id}/add-destination`)}>Add Destination</button>
            <button className='trip-detail-button' onClick={() => navigate(`/my-trips`)}>Go Back</button>
        </div>
        }
        
    </div>
     
);
}

export default TripDetails