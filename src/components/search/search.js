
// Import necessary modules and components
import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from '../../api';


// Define a functional component called "Search"
const Search = ({ onSearchChange }) => {
    // Initialize a (state variable) "search" and a (function) "setSearch"
 const [search, setSearch]  = useState("");


 // fetch data from a remote API based on user input 
 const loadOptions = (inputValue) => {
    return fetch(`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
    geoApiOptions
    )
    .then((response) => response.json())
    .then((response) => {
    return {
        options: response.data.map((city) => {
            return {
                value:  `${city.latitude} ${city.longitude} `,
                label: `${city.name}, ${city.countryCode}`
            }
        })
    }
    })
    .catch((err )=> console.error(err));
};


 // Define a function "handleOnChange" that takes "searchData" as a parameter
 const handleOnChange = (searchData) => {
    // Update the "search" state with the new "searchData"
    setSearch(searchData);
     // Call the "onSearchChange" function passed as a prop with "searchData" as an argument // Call the "onSearchChange" function passed as a prop with "searchData" as an argument
    onSearchChange(searchData); 

 }

  // Render the AsyncPaginate component
    return (
        <AsyncPaginate 
         // Set a placeholder text for the input field
        placeholder="Search for city"
        // Set a debounce timeout of 600 milliseconds for input changes
        debounceTimeout={600}
         // Set the value of the AsyncPaginate component to the "search" state
        value={search}
        // Specify the "handleOnChange" function as the onChange callback
        onChange={handleOnChange}
        // Specify the method for loading option 'done through async request' 
        loadOptions={loadOptions}
        //Above are the parameter of the 'AsyncPaginate'
        />
    )
}

// Export the "Search" component as the default export of this module
export default Search;