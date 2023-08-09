const BING_ENDPOINT = "https://api.bing.microsoft.com/v7.0/images/search";
const BING_API_KEY = process.env.REACT_APP_BING_API_KEY;

async function retrieveImage(query, size = "Large") {
  
  try{
    const response = await fetch(`${BING_ENDPOINT}?q=${encodeURIComponent(query)}&size=${size}`,
    {
      headers:{
        "Ocp-Apim-Subscription-Key": BING_API_KEY
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.value[0].contentUrl;

  } catch (error) {
    console.error("Error fetching image", error.message);
    throw error; 
  }
};

export default retrieveImage;