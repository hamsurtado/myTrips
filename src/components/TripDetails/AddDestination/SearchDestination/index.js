import React, { useRef, useState } from 'react';
import Script from 'react-load-script';
import SearchBar from 'material-ui-search-bar';

function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

const SearchDestination = (props) => {
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
searchbarRef.current.addListener('place_changed', debounce(handleCitySelect, 10));


const inputElem = document.getElementById('places-searchbar');
const debouncedHandleKeyup = debounce(handleKeyup, 10); 
inputElem.addEventListener('keyup', debouncedHandleKeyup);




};

const handleCitySelect = () => {
    const addressObject = searchbarRef.current.getPlace();
    const address = addressObject.address_components;

    if (address) {
        setCity(address[0].long_name);
        props.onDestinationChange(address[0].long_name)
        setQuery(addressObject.formatted_address);
      } 
};

const handleCancelSearch = () => {
    props.onDestinationChange(null);
};


const handleKeyup = (event) => {
    if (event.target.value === '') {
        props.onDestinationChange(null);
    }
    setQuery(event.target.value);
};



return (
    <div>
        <Script
         url='https://maps.googleapis.com/maps/api/js?key=AIzaSyDbh1CoBqydpHl6UM_Lko6C105QKaVUS1g&libraries=places'
         onLoad={handleScriptLoad}
        />

        <SearchBar
            id={'places-searchbar'}
            onCancelSearch={handleCancelSearch}
            placeholder='Search Destination'
            value={query}
            hintText="Search City"
            city={city}
            style={{
                margin: '0 auto',
                maxWidth: 800,
            }}
        />
    </div>
    );
 };

export default SearchDestination;