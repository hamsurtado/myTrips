import React, {useState, useEffect}  from 'react';
const Itinerary = ({ dayNumber, dayItinerary, isMobile }) => {
    
    return (
        <div>
            <div className='day-header'>
                <h1>Day {dayNumber}</h1>
            </div>

            <h2> Morning </h2>
            <div className='activity morning-activity'>
                <div className='activity-description'>
                    {dayItinerary["morning"]}
                </div>

                <div className='activity-image-container'>
                    <img className='activity-image' src={dayItinerary['morning-img']}/>
                </div>
            </div>



            <h2> Afternoon </h2>
            <div className='activity afternoon-activity'>

                {isMobile ? <React.Fragment> 


                    <div className='activity-description activity-description'>
                        {dayItinerary["afternoon"]}
                    </div>

                    <div className='afternoon-activity-image-container activity-image-container'>
                        <img className='activity-image' src={dayItinerary['afternoon-img']}/>
                    </div>
                
                </React.Fragment> : 
                
                
                <React.Fragment>

                    <div className='afternoon-activity-image-container activity-image-container'>
                        <img className='activity-image' src={dayItinerary['afternoon-img']}/>
                    </div>

                    <div className='activity-description activity-description'>
                        {dayItinerary["afternoon"]}
                    </div>
                    
                </React.Fragment>}
            </div>



            <h2> Evening </h2>
            <div className='activity evening-activity'>

                <div className='activity-description'>
                    {dayItinerary["evening"]}
                </div>


                <div className='activity-image-container'>
                    <img className='activity-image' src={dayItinerary['evening-img']}/>
                </div>
            </div>
            
        </div>
    )
}

export default Itinerary;
