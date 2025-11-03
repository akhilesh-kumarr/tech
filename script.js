const API_KEY = "2046844856e0c1874bebc767e1520baf";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherDetails = document.querySelector(".weather-details");
const errorMsg = document.querySelector(".error-msg");

const weatherIcon = document.querySelector(".weather-icon");
const temp = document.querySelector(".temp");
const city = document.querySelector(".city");
const description = document.querySelector(".description");
const humidity = document.querySelector(".humidity");
const windSpeed = document.querySelector(".wind-speed");

/**
 * Fetches weather data for a given city and updates the UI.
 * @param {string} cityName - The name of the city to search for.
 */
async function checkWeather(cityName) {

    const url = BASE_URL + cityName + `&appid=${API_KEY}`;
    
    try {
        const response = await fetch(url);

        if (response.status === 404) {
            errorMsg.style.display = "block";
            weatherDetails.style.display = "none";
            return;
        }

        const data = await response.json();
        
        errorMsg.style.display = "none";
        
        temp.innerHTML = Math.round(data.main.temp) + "°C";
        city.innerHTML = data.name;
        description.innerHTML = data.weather[0].description.toUpperCase();
        
        humidity.innerHTML = data.main.humidity + "%";
        windSpeed.innerHTML = Math.round(data.wind.speed * 3.6) + " km/h"; 
        const weatherCondition = data.weather[0].main.toLowerCase();

        if (weatherCondition === "clouds") {
            weatherIcon.src = "images/clouds.png";
        } else if (weatherCondition === "clear") {
            weatherIcon.src = "images/clear.png";
        } else if (weatherCondition === "rain") {
            weatherIcon.src = "images/rain.png";
        } else if (weatherCondition === "drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if (weatherCondition === "mist" || weatherCondition === "haze") {
            weatherIcon.src = "images/mist.png";
        } else if (weatherCondition === "snow") {
            weatherIcon.src = "images/snow.png";
        } else {
            weatherIcon.src = "images/sun.png"; 
        }

        weatherDetails.style.display = "block";

    } catch (error) {
        console.error("Error fetching weather data:", error);
        errorMsg.style.display = "block";
        weatherDetails.style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    const cityName = cityInput.value.trim(); 
    if (cityName) {
        checkWeather(cityName);
    } else {
        alert("Please enter a city name.");
    }
});

cityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); 
        searchBtn.click();
    }
});