

document.getElementById("getWeatherBtn").addEventListener("click", fetchWeather);



function fetchWeather() {    
    const cityName = document.getElementById("cityInput").value; 
  

   
    if (cityName.trim() === "") {  
    
        alert("Please enter a city name."); 
        return; 
    }


    document.getElementById("loading").style.display = "block";
    document.getElementById("weatherDisplay").textContent = "";



const apiKey ="e6d4447fa3eb566ea88af8b3ab47d2e4"

const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + apiKey + '&units=metric';


fetch(url) 
        .then(function(response) { 
           
            return response.json();
        })

      
        .then(function(data) {
           
            if (data.cod === 200) {
               
                displayWeather(data);
            } else {
               
                document.getElementById("weatherDisplay").textContent = "City not found.";
            }
        })

        
        .catch(function(error) {
           
            document.getElementById("weatherDisplay").textContent = "Error fetching data.";
        })

        
        .finally(function() { 
            
            document.getElementById("loading").style.display = "none";
        });

}


function displayWeather(data) {

  
    const iconCode = data.weather[0].icon;
    const iconUrl = "https://openweathermap.org/img/wn/" + iconCode + "@2x.png";


   
    const description = data.weather[0].description.toLowerCase(); 
    console.log("Weather Description:", description);  
    
      
    if (description.includes('rain')) {
        document.body.style.backgroundImage = "url('rainy.jpg')";
     } else if (description.includes('clear')) {
         document.body.style.backgroundImage = "url('clear-sky.jpg')";
     } else if (description.includes('cloud')) {
        document.body.style.backgroundImage = "url('cloudy.jpg')";
     } else {
        document.body.style.backgroundImage = "url('default.jpg')";
     }



    const weatherHTML =
        "<h2>" + data.name + "</h2>" +
        "<img src='" + iconUrl + "' alt='Weather icon'>" +
        "<p>" + data.weather[0].main + " (" + data.weather[0].description + ")</p>" +
        "<p>Temperature: " + data.main.temp + "°C</p>" +
        "<p>Feels like: " + data.main.feels_like + "°C</p>" +
        "<p>Humidity: " + data.main.humidity + "%</p>";


   
    document.getElementById("weatherDisplay").innerHTML = weatherHTML;
}










 

