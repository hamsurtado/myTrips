import React, {useState, useEffect}  from 'react';
import RefreshIcon from '@mui/icons-material/RefreshRounded';
import IconButton from '@mui/material/IconButton';


const Itinerary = ({ dayNumber, dayItinerary, isMobile, regenerateActivity }) => {
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
                <div>
                <IconButton className='edit-button image-regenerate-button'  onClick={() => {regenerateActivity(dayNumber, "morning")}}>
                    Change Activity &nbsp;
                    <RefreshIcon />
                </IconButton>
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

                    <div>
                        <IconButton className='edit-button image-regenerate-button' onClick={() => {regenerateActivity(dayNumber, "afternoon")}}>
                            Change Activity &nbsp;
                            <RefreshIcon />
                        </IconButton>
                    </div>
                
                </React.Fragment> : 
                
                
                <React.Fragment>

                    <div className='afternoon-activity-image-container activity-image-container'>
                        <img className='activity-image' src={dayItinerary['afternoon-img']}/>
                    </div>

                    <div className='activity-description activity-description'>
                        {dayItinerary["afternoon"]}
                    </div>

                    <div>
                    <IconButton className='edit-button image-regenerate-button' onClick={() => {regenerateActivity(dayNumber, "afternoon")}}>
                        Change Activity &nbsp;
                        <RefreshIcon />
                    </IconButton>
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

            <div>
                <IconButton className='edit-button image-regenerate-button' onClick={() => {regenerateActivity(dayNumber, "evening")}}>
                    Change Activity &nbsp;
                    <RefreshIcon />
                </IconButton>
            </div>
            
        </div>
    )
}

export default Itinerary;
