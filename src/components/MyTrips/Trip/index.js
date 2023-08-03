import React from 'react';
import "./Trip.css"
import { useNavigate } from 'react-router-dom';

const Trip = ({trip, onDeleteTrip}) => {
    const navigate = useNavigate();
    
    return (
        <div className='trip-div'>
            <div className='trip-attributes'>
                <div className='trip-name'>{trip.name}</div>
                <div className='trip-description'>{trip.description}</div>
            </div>
            <div className='trip-buttons'>
                <button className='trip-button' onClick={() => onDeleteTrip(trip.id)}> Delete Trip</button>
                <button className='trip-button' onClick={() => navigate(`/trip/${trip.id}`)}> Edit Trip</button>
            </div>
        </div>
    )
}

export default Trip;
