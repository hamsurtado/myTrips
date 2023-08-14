import React from 'react';
import "./Destination.css"
import { useNavigate } from 'react-router-dom';


const Destination = ({destination, onDeleteDestination, isExpanded}) => {
    const navigate = useNavigate();
 
    
    return (
        <div class={`nimbus-card destination-card ${isExpanded ? 'destination-card-small' : 'destination-card-wide'}`} onClick={() => navigate(`/trip/${destination.tripId}/destination/${destination.id}`)}>

            <div className='nimbus-card-img-container'>
                <div className='nimbus-card-img' style={{ 
                    backgroundImage:     `url(${JSON.parse(destination.itinerary)["header"]})` 
                    }}/>
            </div>

            <div className='nimbus-card-details'>
                
                <div className='destination-attributes'>
                    <div className='destination-name'>{destination.destination}</div>
                </div>
                <div className='destination-buttons'>
                    <button className='nimbus-button' onClick={(e) => { onDeleteDestination(destination.id); e.stopPropagation() }} >  Delete </button>
                    <button className='nimbus-button' onClick={(e) => { navigate(`/trip/${destination.tripId}/destination/${destination.id}`); e.stopPropagation() }}> View </button>
                </div>
            </div>
        </div>
    )
}

export default Destination;
