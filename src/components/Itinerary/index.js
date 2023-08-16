import React, {useState, useEffect}  from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDestination } from '../../graphql/queries';
import { API } from 'aws-amplify';
import DayItinerary from './DayItinerary'
import { Configuration, OpenAIApi } from "openai";
import "./Itinerary.css"

const Itinerary = ({isMobile}) => {
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
    }, []
    )

    const regenerateActivity = async(day, timeOfDay) => {

        const configuration = new Configuration({
            apiKey: process.env.REACT_APP_CHATGPT_API_KEY
          });
        const openai = new OpenAIApi(configuration);
        const itinerary = destination.itinerary;
        const dayItinerary = destination.itinerary["content"][day][timeOfDay]
        const content = `I have the following trip itinerary: ${JSON.stringify(itinerary)}. I would like to take the following portion and generate a different activity for the user: ${dayItinerary}. 
        Please do not include any repeat activity suggestions. Output will be the following JSON format, but with appropriate content filled in:
        {
                "activity": "",
                "entity: "",
        }. 
        
        The entity corresponds to an entity we can use for an image search API, 
        to display an image relevant to the suggestion.`


        try {
            const newActivity = await openai.createChatCompletion({
            model: "gpt-3.5-turbo-16k",
            messages: [{ role: "user", content: content }],
            temperature: 0.2
            });

            const newItinerary = JSON.parse(JSON.stringify(itinerary))
            newItinerary["content"][day][timeOfDay] = newActivity.data.choices[0]["message"]["content"]
            const updatedDestination = { ...destination, itinerary: newItinerary }
            setDestination(updatedDestination)

        } catch (error) {
                console.log(error)
        }
        
    }


    
    return (

        <div className='nimbus-card-trip-detail'>

            <div className='nimbus-card-img-container'>
                <div className='nimbus-card-img' style={{ backgroundImage: `url(${destination?.itinerary?.header})` }}/>
            </div>

            <div className='nimbus-card-trip-detail-details'>
            <div className='itinerary-location-header'>{destination?.destination}</div>
            
                { destination?.itinerary?.content && Object.entries(destination.itinerary.content).map(([key, value]) => {
                    return <DayItinerary
                        dayNumber={key}
                        dayItinerary={value}
                        isMobile={isMobile}
                        regenerateActivity={regenerateActivity}
                /> 
                }) }
            </div>
        </div>

    )
}

export default Itinerary;
