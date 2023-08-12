import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API } from 'aws-amplify';
import { getTrip, listDestinations } from '../../graphql/queries';
import Destination from './Destination';
import "./TripDetails.css"
import { deleteDestination, updateTrip } from '../../graphql/mutations';
import retrieveImage from '../../utils/retrieveImage';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';


function TripDetails({ isExpanded }) {
    const { id } = useParams();
    const [trip, setTrip] = useState(null)
    const navigate = useNavigate();
    const [destinations, setDestinations] = useState([])
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingDescription, setIsEditingDescription] = useState(false);
   

    const regenerateImage = async() => {
        try {
            const newImage = await retrieveImage(trip.name);
            await API.graphql({
                query: updateTrip,
                variables: {
                    input: {
                    id: id,
                    imageURL: newImage
                  }
                },
                authMode: "AMAZON_COGNITO_USER_POOLS"
            });

            setTrip({
                ...trip,
                imageURL: newImage
            });
            
        } catch(error) {
            console.error('error retrieving image', error)

        }
    }


    const fetchTripDetails = async() => {
        try{
            const response = await API.graphql({
                query: getTrip,
                    variables: { id },
                    authMode: "AMAZON_COGNITO_USER_POOLS"
                });
                setTrip(response.data.getTrip);
                const destinationResponse = await API.graphql({
                    query: listDestinations,    
                    variables: { filter: {tripId: {eq: id}} },
                    authMode: "AMAZON_COGNITO_USER_POOLS"
                });
                setDestinations(destinationResponse.data.listDestinations.items);

            } catch (error) {
                console.error('Error getting trip details:', error);
            }
        }

    const updateTripDetails = async(updatedTrip) => {
        try {
            await API.graphql({
                query: updateTrip,
                variables: {
                    input: updatedTrip
                },
                authMode: "AMAZON_COGNITO_USER_POOLS"
            });
        } catch (error) {
            console.error('Error updating trip details:', error);
        }
    }
    
    

    useEffect(() => {

        fetchTripDetails();
        }, [id])

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
        
        <div className='nimbus-card-trip-detail'>
            <div className='nimbus-card-img-container'  style={{ backgroundImage: `url(${trip.imageURL})` }}/>
            <div className='edit-button'>
                <IconButton className='edit-button image-regenerate-button' onClick={regenerateImage}>
                    <EditIcon />
                </IconButton>
            </div>
            




            <div className='nimbus-card-trip-detail-details'>
            
            <div className='trip-name-container'>
                {isEditingName ? (
                    <TextField
                        value={trip.name}
                        onChange={(e) => setTrip(trip => ({ ...trip, name: e.target.value }))}
                        onBlur={() => {
                            setIsEditingName(false);
                            updateTripDetails(trip);
                        }}
                        autoFocus
                    />
                ) : (
                <div className='trip-name-container'> 
                <h1> Your {trip.name} Trip!</h1>
                <IconButton className='edit-button' onClick={() => setIsEditingName(true)}>
                    <EditIcon />
                </IconButton>
                </div>
                )} 
                
            </div>

            <div className='trip-description-container'>
            {isEditingDescription ? (
                    <TextField
                        value={trip.description}
                        onChange={(e) => setTrip(trip => ({ ...trip, description: e.target.value }))}
                        onBlur={() => {
                            setIsEditingDescription(false);
                            updateTripDetails(trip);
                        }}
                        autoFocus
                    />
                ) : (
                    <div className='trip-description-container'>
                        <div className='trip-detail-description'> "{trip.description}"</div>
                        <IconButton className='edit-button trip-description-edit-button' onClick={() => setIsEditingDescription(true)}>
                            <EditIcon />
                        </IconButton>
                    </div>
                )}
            </div>
                
               

            {destinations.length === 0 ? '' :
            <div>
               <h2>Destinations</h2>
                <div className='nimbus-card-container nimbus-card-container-destinations'>
                    { destinations?.map((destination) =>  
                        <Destination
                            key={destination.id}
                            destination={destination}
                            onDeleteDestination={deleteGivenDestination}
                            isExpanded={isExpanded}
                        /> 
                    )}
                </div>
            </div>}
                <div className='trip-buttons'>
                <button className='nimbus-button' onClick={() => navigate(`/my-trips`)}>Go Back</button>
                <button className='nimbus-button' onClick={() => navigate(`/trip/${trip.id}/add-destination`)}>Add Destination</button>
                </div>
            </div>
        </div>


        
        }
    </div>
     
);
}

export default TripDetails