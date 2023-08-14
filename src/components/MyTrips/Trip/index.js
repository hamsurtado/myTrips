import React from 'react';
import "./Trip.css"
import { useNavigate } from 'react-router-dom';

const Trip = ({trip, onDeleteTrip}) => {
    const navigate = useNavigate();
    
    return (
        <div className='nimbus-card' onClick={() => navigate(`/trip/${trip.id}`)}>
            <div className='nimbus-card-img-container'>
                <div className='nimbus-card-img' style={{ backgroundImage: `url(${trip?.imageURL})` }}/>
            </div>



            <div className='nimbus-card-details'>
                <div className='trip-attributes'>
                    <div className='trip-name'>{trip.name}</div>
                    <div className='trip-description'>"{trip.description}"</div>
                </div>
                <div className='trip-buttons'>
                    <button className='nimbus-button' onClick={(e) => { onDeleteTrip(trip.id); e.stopPropagation()}}> Delete Trip</button>
                    <button className='nimbus-button' onClick={(e) => { navigate(`/trip/${trip.id}`); e.stopPropagation()} }> Edit Trip</button>
                </div>
            </div>
        </div>
    )
}

export default Trip;
