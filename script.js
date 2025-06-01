
//// Part 4. Make Your Button Do Something

//When the user clicks the Get Weather button, 
// it will run the fetchWeather() function.

document.getElementById("getWeatherBtn").addEventListener("click", fetchWeather);
//Finds an HTML element with a specific id   //Waits for a user to do something, like a click.



///// Part 5: Start Your fetchWeather Function and Part 6: Get the User's City 

//This is the main function. It does all the work to get the weather.
//It's called when the button is clicked.

function fetchWeather() {    // block of code that does something when called. 
    const cityName = document.getElementById("cityInput").value; 
    //const:to store a value that doesn't change.
    ///reads the value from our input box. 
    // Example: if user types London, it stores that in cityName.


/// Part 7: Check if the Input is Empty    

    //If the input box is empty, show a warning and stop the function.
    if (cityName.trim() === "") {  
        //if - Checks if something is true.
        //trim- Removes extra spaces from start and end of text.
        //=== Used to check if user typed nothing.
        alert("Please enter a city name."); //alert-Shows a popup message.
        return; //Stops the function right now
    }

/// Part 8: Show Loading Feedback 

//Shows a “Please wait...” message and clears old weather info.
//lets the user know something is happening.
    document.getElementById("loading").style.display = "block";
    document.getElementById("weatherDisplay").textContent = "";


//// Part 9: Set Up API Access 

//the URL to get weather data from the OpenWeatherMap API.
//This is how we ask the weather server for info about the city
const apiKey ="e6d4447fa3eb566ea88af8b3ab47d2e4"

const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + apiKey + '&units=metric';

/// Part 10: Fetch the Data with .then

//Uses the URL to ask for data and then turns it into JSON.
fetch(url) //Gets data from a website or API.
        .then(function(response) { // Runs code after fetch is done.
            // Convert the response to JSON format
            return response.json();
        })

        //If the API returns a valid city, we pass the data to displayWeather().
        //If not, we show an error message.
        //So the user knows whether the city was found or not.
        .then(function(data) {
            // Check if the city was found
            if (data.cod === 200) {
                // Show the weather: description and temperature
                displayWeather(data);
            } else {
                // If city is not found, show error
                document.getElementById("weatherDisplay").textContent = "City not found.";
            }
        })

        //If there’s a problem (like no internet), show an error.
        .catch(function(error) {
            // If something goes wrong with the request
            document.getElementById("weatherDisplay").textContent = "Error fetching data.";
        })

        //Always hide the loading message when everything is done.
        //Clean look for the user.
        .finally(function() { //Runs after then or catch
            // Hide the loading message in all cases
            document.getElementById("loading").style.display = "none";
        });

}


///// Part 11: Display the Weather 

//his function shows the weather on the screen.
function displayWeather(data) {

    //Gets the icon for the weather from the API.
    //To show a little weather image (like a sun or cloud).
    const iconCode = data.weather[0].icon;
    const iconUrl = "https://openweathermap.org/img/wn/" + iconCode + "@2x.png";


    //Gets a short text like "light rain" or "clear sky".
    const description = data.weather[0].description.toLowerCase();  // Get description and make it lowercase for easier matching
    console.log("Weather Description:", description);  // Log the description to the console
    
    // Change background based on weather condition
    // if (description.includes('rain')) {
    //     document.body.style.backgroundColor = 'lightblue';  // Light blue for rain
    //     console.log("Background set to light blue for rain");
    // } else if (description.includes('clear')) {
    //     document.body.style.backgroundColor = 'lightyellow';  // Light yellow for clear skies
    //     console.log("Background set to light yellow for clear weather");
    // } else if (description.includes('cloud')) {
    //     document.body.style.backgroundColor = 'lightgrey';  // Light grey for cloudy
    //     console.log("Background set to light grey for cloudy weather");
    // } else {
    //     document.body.style.backgroundColor = 'white';  // Default to white for other weather
    //     console.log("Background set to white for other weather");
    // }



    //Sets a different background image based on weather.
    // if (description.includes('rain')) {
    //     document.body.style.backgroundImage = "url('images/rainy.jpg')";
    // } else if (description.includes('clear')) {
    //     document.body.style.backgroundImage = "url('images/clear-sky.jpg')";
    // } else if (description.includes('cloud')) {
    //     document.body.style.backgroundImage = "url('images/cloudy.jpg')";
    // } else {
    //     document.body.style.backgroundImage = "url('images/default.jpg')";
    // }

    if (description.includes('rain')) {
        document.body.style.backgroundImage = "url('rainy.jpg')";
     } else if (description.includes('clear')) {
         document.body.style.backgroundImage = "url('clear-sky.jpg')";
     } else if (description.includes('cloud')) {
        document.body.style.backgroundImage = "url('cloudy.jpg')";
     } else {
        document.body.style.backgroundImage = "url('default.jpg')";
     }




//Creates a string of HTML showing city name, icon, 
// temperature, and humidity.  information the user wants to see.
    const weatherHTML =
        "<h2>" + data.name + "</h2>" +
        "<img src='" + iconUrl + "' alt='Weather icon'>" +
        "<p>" + data.weather[0].main + " (" + data.weather[0].description + ")</p>" +
        "<p>Temperature: " + data.main.temp + "°C</p>" +
        "<p>Feels like: " + data.main.feels_like + "°C</p>" +
        "<p>Humidity: " + data.main.humidity + "%</p>";


        //Adds all that info to your web page.
    document.getElementById("weatherDisplay").innerHTML = weatherHTML;
}










 

