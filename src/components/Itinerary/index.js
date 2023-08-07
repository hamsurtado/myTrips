import React, {useState, useEffect}  from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDestination } from '../../graphql/queries';
import { API } from 'aws-amplify';
import DayItinerary from './DayItinerary'
import "./Itinerary.css"

const Itinerary = () => {
    const { tripId, destinationId } = useParams();
    const [destination, setDestination] = useState(null)

    useEffect(() => {
        const fetchDestination = async() => {
            try {
                const response = await API.graphql({
                    query: getDestination,
                    variables: { id: destinationId },
                    authMode: "AMAZON_COGNITO_USER_POOLS"
                });

                response.data.getDestination.itinerary = JSON.parse(
                    response.data.getDestination.itinerary
                )
                
                setDestination(response.data.getDestination)
               

            } catch(error) {
                console.error('Error getting destination:', error);
            }
    };
    fetchDestination();
    }, [])

    
    return (
        <div className='itinerary-container'>
            <div className='itinerary-header-img-container'>
                <img className='itinerary-header-img' src={destination?.itinerary?.header}/>
            </div>

            
            { destination?.itinerary?.content && Object.entries(destination.itinerary.content).map(([key, value]) => {
                return <DayItinerary
                    dayNumber={key}
                    dayItinerary={value}
            /> 
            }) }
        </div>
    )
}

export default Itinerary;
