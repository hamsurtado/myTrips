import React, {useState, useEffect}  from 'react';
const Itinerary = ({ dayNumber, dayItinerary }) => {
    
    return (
        <div>
            <h1>Day {dayNumber}</h1>

            <h2> Morning </h2>
            {dayItinerary["morning"]}


            {dayItinerary["morning-entity"]}
            <h2> Afternoon </h2>
            {dayItinerary["afternoon"]}

            {dayItinerary["afternoon-entity"]}
            <h2> Evening </h2>
            {dayItinerary["evening"]}

            {dayItinerary["evening-entity"]}
        </div>
    )
}

export default Itinerary;
