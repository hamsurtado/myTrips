import React, {useState, useEffect}  from 'react';
const Itinerary = ({ dayNumber, dayItinerary }) => {
    
    return (
        <div>
            <h1>Day {dayNumber}</h1>

            <h2> Morning </h2>
            {dayItinerary["morning"]}
            <h2> Afternoon </h2>
            {dayItinerary["afternoon"]}
            <h2> Evening </h2>
            {dayItinerary["evening"]}
        </div>
    )
}

export default Itinerary;
