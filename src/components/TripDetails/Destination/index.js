import React from 'react';
import "./Destination.css"
import { useNavigate } from 'react-router-dom';


const Destination = ({destination, onDeleteDestination}) => {
    const navigate = useNavigate();
    
    return (
        <div className='destination-div'>
            <div className='destination-attributes'>
                <div className='destination-name'>{destination.destination}</div>
            </div>
            <div className='destination-buttons'>
                <button className='destination-button' onClick={() => onDeleteDestination(destination.id)}> Delete</button>
                <button className='destination-button' onClick={() => navigate(`/trip/${destination.tripId}/destination/${destination.id}`)}> View Itinerary</button>
            </div>
        </div>
    )
}

export default Destination;
