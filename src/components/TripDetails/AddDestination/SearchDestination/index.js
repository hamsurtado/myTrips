import React, { useRef, useState } from 'react';
import Script from 'react-load-script';
import SearchBar from 'material-ui-search-bar';

const SearchDestination = () => {
 const [query, setQuery] = useState('');
 const [city, setCity] = useState('');

 const searchbarRef = useRef(null);

 const handleScriptLoad = () => {
    const options =  {
        types: ['(cities)']
    };

/* global google */
searchbarRef.current = new google.maps.places.Autocomplete(
    document.getElementById('places-searchbar'),
    options
);

searchbarRef.current.setFields(['address_components', 'formatted_address']);
searchbarRef.current.addListener('place_changed', handleCitySelect);
};

const handleCitySelect = () => {
    const addressObject = searchbarRef.current.getPlace();
    const address = addressObject.address_components;

    if (address) {
        setCity(address[0].long_name);
        setQuery(addressObject.formatted_address);
      }
};

return (
    <div>
        <Script
         url='https://maps.googleapis.com/maps/api/js?key=AIzaSyDbh1CoBqydpHl6UM_Lko6C105QKaVUS1g&libraries=places'
         onLoad={handleScriptLoad}
        />

        <SearchBar
            id={'places-searchbar'}
            placeholder='Search Destination'
            value={query}
            hintText="Search City"
            style={{
                margin: '0 auto',
                maxWidth: 800,
            }}
        />
    </div>
    );
 };

export default SearchDestination;